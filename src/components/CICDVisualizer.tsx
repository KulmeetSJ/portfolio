"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Package,
  UserCheck,
  RefreshCw,
  Activity,
  TerminalSquare,
  AlertTriangle,
  Undo2,
  Info,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import Panel from "./Panel";
import SectionHeader from "./SectionHeader";

// Illustrative simulation of the release flow in my personal GitOps Delivery
// Platform project. Nothing here is live. Real measurements are linked below.
type Mode = "healthy" | "bad";
type StepStatus = "idle" | "running" | "done" | "failed" | "skipped";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  { id: "ci", title: "CI: test, Trivy gate, SBOM", description: "GitHub Actions; fails on fixable HIGH/CRITICAL findings", icon: ShieldCheck },
  { id: "push", title: "Push image to GHCR", description: "Tagged with the commit SHA, never :latest", icon: Package },
  { id: "commit", title: "Commit image tag to the platform repo", description: "CI holds no cluster credentials", icon: GitBranch },
  { id: "approve", title: "Required reviewer approves prod", description: "GitHub Environments protection rule", icon: UserCheck },
  { id: "sync", title: "Argo CD syncs from Git", description: "Pull-based; Kyverno admission policies apply", icon: RefreshCw },
  { id: "c10", title: "Canary 10%", description: "Background analysis: success rate ≥ 99%, p95 ≤ 500 ms", icon: Activity },
  { id: "c25", title: "Canary 25%", description: "Analysis keeps running", icon: Activity },
  { id: "c50", title: "Canary 50%", description: "Analysis keeps running", icon: Activity },
  { id: "c100", title: "Promote to 100%", description: "Canary becomes the stable version", icon: CheckCircle2 },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function CICDVisualizer() {
  const [mode, setMode] = useState<Mode>("bad");
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [outcome, setOutcome] = useState<"none" | "promoted" | "rolledback">("none");
  const runId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const log = (line: string) => setLogs((prev) => [...prev, line]);
  const set = (id: string, s: StepStatus) => setStatuses((prev) => ({ ...prev, [id]: s }));

  const reset = () => {
    runId.current++;
    setStatuses({});
    setLogs([]);
    setIsRunning(false);
    setOutcome("none");
  };

  const run = async () => {
    if (isRunning) return;
    const id = ++runId.current;
    const alive = () => runId.current === id;
    setStatuses({});
    setLogs([]);
    setOutcome("none");
    setIsRunning(true);

    const simple: Record<string, string[]> = {
      ci: ["[ci] unit + integration tests passed", "[ci] trivy: 0 fixable HIGH/CRITICAL", "[ci] SBOM (SPDX) generated"],
      push: ["[ci] pushed ghcr.io/…/app:<commit-sha>"],
      commit: ["[ci] committed new tag to envs/prod (platform repo)"],
      approve: ["[gh] production environment: approved by reviewer"],
      sync: ["[argocd] OutOfSync → syncing", "[kyverno] pod admitted (policies pass)"],
    };

    for (const step of steps) {
      if (!alive()) return;
      set(step.id, "running");
      await wait(450);

      if (simple[step.id]) {
        for (const l of simple[step.id]) {
          if (!alive()) return;
          log(l);
          await wait(220);
        }
        set(step.id, "done");
        continue;
      }

      if (step.id === "c10" && mode === "bad") {
        log("[rollouts] setWeight 10, canary pods Ready (health probes green)");
        await wait(500);
        log("[analysis] measurement 1: success rate below 99%, FAILED (1 failure tolerated)");
        await wait(700);
        log("[analysis] measurement 2: success rate below 99%, FAILED");
        await wait(400);
        if (!alive()) return;
        set(step.id, "failed");
        log("[rollouts] analysis failed → rollout ABORTED, no human action");
        await wait(400);
        log("[rollouts] canary scaled down; stable version serves 100% of traffic");
        for (const s of ["c25", "c50", "c100"]) set(s, "skipped");
        setOutcome("rolledback");
        setIsRunning(false);
        return;
      }

      const weight = step.id === "c100" ? 100 : Number(step.id.slice(1));
      log(`[rollouts] setWeight ${weight}`);
      if (weight < 100) {
        await wait(300);
        log("[analysis] success rate ≥ 99%, p95 ≤ 500 ms: PASSED");
      } else {
        log("[rollouts] promotion complete; rollout Healthy");
      }
      await wait(300);
      set(step.id, "done");
    }

    if (!alive()) return;
    setOutcome("promoted");
    setIsRunning(false);
  };

  const badge = (s: StepStatus | undefined) => {
    switch (s) {
      case "running":
        return { text: "Running", cls: "bg-accent/10 text-accent border-accent/20" };
      case "done":
        return { text: "Done", cls: "bg-ok/10 text-ok border-ok/20" };
      case "failed":
        return { text: "Aborted", cls: "bg-bad/10 text-bad border-bad/20" };
      case "skipped":
        return { text: "Skipped", cls: "bg-card2 text-faint border-line" };
      default:
        return { text: "Pending", cls: "bg-card2 text-faint border-line" };
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20" id="canary-demo">
      <SectionHeader index="07" kicker="Simulation" title="Canary rollout, step by step">
        A step-through of the release flow in my GitOps Delivery Platform project. Run a bad
        release to see the canary abort when its own metrics fail while its health probes stay
        green.
      </SectionHeader>

      <div className="mb-8 rounded-card border border-signal/40 bg-signal/10 px-5 py-4 flex items-start gap-3">
        <Info size={18} className="text-signal mt-0.5 shrink-0" />
        <div className="text-sm text-muted leading-relaxed">
          <span className="font-semibold text-signal">Illustrative simulation.</span> Steps and
          timing are compressed and nothing here is live. Measured results (personal benchmark,
          local kind cluster): automatic rollback 30 s after the first failed metric-analysis
          check in 5/5 drills, and a median of ~17 min from commit to prod, excluding the human
          approval wait.{" "}
          <a
            href="https://github.com/KulmeetSJ/gitops-demo-platform/blob/main/RESULTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent underline underline-offset-4"
          >
            RESULTS.md <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Panel className="xl:col-span-7 p-5 md:p-8">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {(["healthy", "bad"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => !isRunning && setMode(m)}
                  disabled={isRunning}
                  className={`px-3 py-2 rounded-md border text-xs font-mono transition-all disabled:opacity-50 ${mode === m
                    ? "bg-accent text-paper border-accent"
                    : "border-line text-muted hover:border-accent"
                    }`}
                >
                  {m === "healthy" ? "Healthy release" : "Bad release: 20% of requests fail"}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={run}
                disabled={isRunning}
                className="px-4 py-2 rounded-md bg-accent text-paper font-semibold text-sm flex items-center gap-2 hover:bg-accent/90 disabled:opacity-60"
              >
                {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                {isRunning ? "Running" : "Run release"}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-md border border-line text-muted font-semibold text-sm flex items-center gap-2 hover:border-line"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {steps.map((step) => {
              const s = statuses[step.id];
              const b = badge(s);
              const Icon = s === "failed" ? AlertTriangle : s === "done" ? CheckCircle2 : step.icon;
              return (
                <motion.div
                  key={step.id}
                  layout
                  className={`rounded-md border p-3 md:p-4 flex items-start gap-3 ${s === "running"
                    ? "border-accent/40 bg-accent/10"
                    : s === "done"
                      ? "border-ok/20 bg-ok/5"
                      : s === "failed"
                        ? "border-bad/30 bg-bad/10"
                        : "border-line bg-card/50"
                    }`}
                >
                  <div className="mt-0.5 text-muted shrink-0">
                    {s === "running" ? <Loader2 size={18} className="animate-spin text-accent" /> : <Icon size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-ink font-semibold text-sm md:text-base">{step.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase border ${b.cls}`}>
                        {b.text}
                      </span>
                    </div>
                    <p className="text-muted text-xs md:text-sm mt-1">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Panel>

        <div className="xl:col-span-5 space-y-6">
          <Panel className="p-6">
            <div className="text-muted text-xs font-mono uppercase tracking-[0.2em] mb-2">Outcome</div>
            {outcome === "none" && <p className="text-muted">Run a release to see the result.</p>}
            {outcome === "promoted" && (
              <p className="text-ok font-semibold flex items-center gap-2">
                <CheckCircle2 size={18} /> Canary promoted to 100%
              </p>
            )}
            {outcome === "rolledback" && (
              <p className="text-signal font-semibold flex items-center gap-2">
                <Undo2 size={18} /> Rolled back automatically: analysis failed while probes were green
              </p>
            )}
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TerminalSquare size={16} className="text-accent" />
              <h3 className="text-ink font-semibold text-lg">Simulated log</h3>
            </div>
            <div ref={logRef} className="bg-term rounded-md p-4 h-[320px] overflow-y-auto font-mono text-xs space-y-1.5 text-term-ink">
              {logs.length === 0 ? (
                <div className="text-term-dim">$ waiting for a release…</div>
              ) : (
                logs.map((line, i) => (
                  <div
                    key={i}
                    className={`break-words ${line.includes("FAILED") || line.includes("ABORTED")
                      ? "text-term-bad"
                      : line.includes("scaled down")
                        ? "text-term-warn"
                        : "text-term-ok"
                      }`}
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
