"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ShieldCheck,
    Database,
    Layers,
    RotateCcw,
    GitBranch,
    Activity,
    FileSearch,
    Gauge,
    ExternalLink,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

// Sourced from the public READMEs and ADRs of my personal projects.
// Each card links to the document it summarizes.
const PF = "https://github.com/KulmeetSJ/payflow-sim#readme";
const PM = "https://github.com/KulmeetSJ/payflow-sim/blob/main/postmortems/2026-11-20-db-latency.md";
const ADR = "https://github.com/KulmeetSJ/gitops-demo-platform/tree/main/docs/adr";
const TF = "https://github.com/KulmeetSJ/tf-drift-detector#readme";

const decisions = [
    {
        id: "offsets",
        project: "PayFlow Sim",
        source: PF,
        title: "Commit Kafka offsets only after the database commit",
        icon: Database,
        problem:
            "A consumer can crash between writing a payment and committing its offset. Committing first loses the payment; committing after can apply it twice.",
        options: [
            "Auto-commit offsets on an interval",
            "Commit the offset before processing",
            "Commit after the DB transaction, and make processing idempotent",
        ],
        decision:
            "Commit the offset only after the DB transaction. A processed_events primary key, derived from the client's Idempotency-Key, turns client retries and redeliveries into no-ops.",
        impact: [
            "At-least-once delivery with an idempotent effect",
            "Trade-off: redeliveries do happen (one was absorbed during a rebalance in the scaling run)",
        ],
    },
    {
        id: "ordering",
        project: "PayFlow Sim",
        source: PF,
        title: "Key events by the sending account",
        icon: Layers,
        problem:
            "Balance checks depend on order: \"deposit then spend\" and \"spend then deposit\" can give different answers.",
        options: ["Round-robin partitioning (no key)", "Key every event by fromAccount"],
        decision:
            "Key by fromAccount so an account always maps to one partition, owned by one consumer at a time.",
        impact: [
            "Payments from one account are applied in the order they were accepted (covered by an integration test)",
            "Trade-off: parallelism is capped by partition count (with 6 partitions, a 7th consumer sat idle)",
        ],
    },
    {
        id: "retries",
        project: "PayFlow Sim",
        source: PF,
        title: "Two-layer retries before the dead-letter topic",
        icon: RotateCcw,
        problem:
            "A single failing payment must not block every payment behind it on the same partition, and poison messages must not be retried forever.",
        options: [
            "Blocking retries only",
            "Send to the DLT on the first error",
            "Short blocking retries, then retry topics, then the DLT",
        ],
        decision:
            "2 blocking retries in place, then retry topics at 1 s / 2 s / 4 s, then the DLT. Poison messages skip straight to the DLT, which has an inspector and an idempotent replay endpoint.",
        impact: [
            "Short blips keep per-account order; longer failures don't stall the partition",
            "Trade-off: a payment on the retry topics may be applied after later payments from the same account",
        ],
    },
    {
        id: "sli",
        project: "PayFlow Sim · postmortem",
        source: PM,
        title: "Count the SLI against accepted payments, not completed ones",
        icon: Gauge,
        problem:
            "In an induced +500 ms database-latency fault, the latency SLI used completed payments as its denominator. Stalled payments never completed, so the error ratio barely moved until the backlog drained. With a normal hour of history, the page would have taken ~51 minutes.",
        options: [
            "Keep the completions-based SLI (correct only in steady state, where accepted = completed)",
            "Add a lag-based page on the age of the oldest unprocessed payment (recorded as a follow-up, not done yet)",
            "Change the SLI denominator to accepted payments, and reduce how often each payment pays the DB latency",
        ],
        decision:
            "Measure the SLI against accepted payments (payments_accepted_total) so a stall counts as bad, cut DB round trips per payment from 8 to 4 with data-modifying CTEs, and add the stall case as a promtool test in CI.",
        impact: [
            "Benchmark, re-measured: time to page ~51 min → 11.3 min; committed throughput under the fault 0.74 → 1.50/s",
            "Trade-off: the round-trip fix did not move the load knee, because the laptop's CPU, not PostgreSQL, is the limit",
        ],
    },
    {
        id: "gitops",
        project: "GitOps Delivery Platform",
        source: ADR,
        title: "Pull-based GitOps: CI never holds cluster credentials",
        icon: GitBranch,
        problem:
            "Push-based deploys (kubectl/helm from CI) need powerful cluster credentials in CI, and the cluster drifts from what anyone reviewed.",
        options: ["Push from CI with cluster credentials", "Pull-based delivery with Argo CD"],
        decision:
            "CI's only outputs are an image and a commit. Argo CD pulls from Git, self-heals manual changes, and prod promotion needs a required reviewer.",
        impact: [
            "Approval sits on the change to Git; the audit trail is commit history",
            "Trade-off: deploy latency includes Argo CD's poll interval",
        ],
    },
    {
        id: "canary",
        project: "GitOps Delivery Platform",
        source: ADR,
        title: "Judge canaries on their own metrics, not on health probes",
        icon: Activity,
        problem:
            "A release can pass every health probe and still fail real requests. A rolling update would ship it.",
        options: ["Rolling update gated on probes", "Blue-green", "Canary with metric analysis"],
        decision:
            "Argo Rollouts canary (10% → 25% → 50% → 100%). Prometheus analysis queries only the canary pods' success rate and p95 latency, and aborts automatically on failure. Blue-green was ruled out because it needs double capacity.",
        impact: [
            "Benchmark: rollback 30 s after the first failed analysis check in 5/5 drills (local kind cluster)",
            "Trade-off: replica-based weights are approximate, and analysis needs steady traffic",
        ],
    },
    {
        id: "kyverno",
        project: "GitOps Delivery Platform",
        source: ADR,
        title: "Admission policies, tested like code",
        icon: ShieldCheck,
        problem:
            "CI scanning only covers images our pipeline builds; a hand-applied manifest bypasses it.",
        options: ["Rely on CI checks only", "Admission control in the cluster"],
        decision:
            "Kyverno policies in Enforce mode: no :latest images, required requests/limits, no privileged or hostPath, runAsNonRoot. Policy tests run in CI.",
        impact: [
            "Benchmark: 7/7 non-compliant manifests blocked, 1/1 compliant admitted",
            "Trade-off: platform namespaces are out of scope for now",
        ],
    },
    {
        id: "drift",
        project: "Terraform Drift Detector",
        source: TF,
        title: "Separate real drift from code that isn't applied yet",
        icon: FileSearch,
        problem:
            "A plain terraform plan mixes console changes with unapplied code, and can't see IAM grants Terraform doesn't manage.",
        options: ["One terraform plan", "plan -refresh-only plus a normal plan plus a live IAM diff"],
        decision:
            "Run both plans, label each action as \"reverts drift\" or \"code change not yet applied\", and diff the live IAM policy. Auth is keyless via Workload Identity Federation.",
        impact: [
            "Benchmark: 7/7 console-style changes detected (sandbox GCP project)",
            "Trade-off: on the 6-hour schedule, detection can take up to 6 h; the 26 s median is for manual runs",
        ],
    },
];

export default function EngineeringDecisions() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20" id="engineering-decisions">
            <SectionHeader index="06" kicker="Engineering decisions" title="Trade-offs, written down">
                Design decisions from my personal projects, summarized from each project&apos;s
                public README and architecture decision records.
            </SectionHeader>

            <div className="space-y-3">
                {decisions.map((d) => {
                    const Icon = d.icon;
                    const isOpen = active === d.id;

                    return (
                        <div
                            key={d.id}
                            className="border border-line rounded-card bg-card"
                        >
                            <button
                                onClick={() => setActive(isOpen ? null : d.id)}
                                className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="bg-accent/10 p-2 rounded-lg text-accent shrink-0">
                                        <Icon size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-[10px] font-mono uppercase tracking-widest text-faint mb-1">
                                            {d.project}
                                        </span>
                                        <span className="text-ink font-semibold">
                                            {d.title}
                                        </span>
                                    </div>
                                </div>

                                <ChevronDown
                                    className={`shrink-0 ml-3 transition-transform ${isOpen ? "rotate-180 text-accent" : "text-faint"
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-4 sm:px-6 pb-6 text-muted text-sm space-y-6"
                                    >
                                        <div>
                                            <p className="text-muted font-medium mb-1">
                                                Problem
                                            </p>
                                            <p>{d.problem}</p>
                                        </div>

                                        <div>
                                            <p className="text-muted font-medium mb-1">
                                                Options Considered
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {d.options.map((o, i) => (
                                                    <li key={i}>{o}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="text-muted font-medium mb-1">
                                                Decision
                                            </p>
                                            <p>{d.decision}</p>
                                        </div>

                                        <div>
                                            <p className="text-muted font-medium mb-1">
                                                Outcome and trade-offs
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {d.impact.map((i, idx) => (
                                                    <li key={idx}>{i}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a
                                            href={d.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:text-accent"
                                        >
                                            Source <ExternalLink size={12} />
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}