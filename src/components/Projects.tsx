"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Gauge } from "lucide-react";
import Panel from "./Panel";
import SectionHeader from "./SectionHeader";

type Link = { label: string; href: string; kind: "github" | "results" | "live" };

type Project = {
  title: string;
  kind: string; // e.g. "Personal project", "HSBC work"
  status?: string; // e.g. "In progress", "Live"
  problem: string;
  built: string[];
  results: string[];
  resultsLabel: string; // honest scope label for the numbers
  tech: string[];
  links: Link[];
  featured?: boolean;
};

// Every fact below comes from master_resume_evidence_bank.yaml (v1.9j).
// Personal-project numbers are benchmarks and are labelled as such.
const projects: Project[] = [
  {
    title: "PayFlow Sim",
    kind: "Personal project",
    featured: true,
    problem:
      "A payment must be accepted once, applied once and in order per account, and failures must be visible, even when clients retry, consumers crash or rebalance, and dependencies slow down.",
    built: [
      "Event-driven payments simulator: a Spring Boot gateway (POST /payments with an Idempotency-Key, 202 only after acks=all) publishes to Kafka; a consumer group writes the payment, a double-entry ledger and balances to PostgreSQL in one transaction.",
      "Idempotent processing (dedupe key derived from the Idempotency-Key; offsets committed only after the DB commit) and per-account ordering by keying events on the sending account.",
      "Two-layer retries: blocking retries, then retry topics (1 s / 2 s / 4 s), then a dead-letter topic with an inspector and idempotent replay.",
      "OpenTelemetry tracing across HTTP, Kafka and JDBC into Tempo, logs in Loki, Prometheus metrics and Grafana; two SLOs with multi-window burn-rate alerts routed by Alertmanager, tested with promtool in CI.",
      "k6 load test to find the knee, and chaos experiments (kill a broker, kill a consumer, +500 ms PostgreSQL latency via Toxiproxy), each followed by an automated reconcile of every accepted payment against the ledger.",
      "Blameless postmortem of the induced DB-latency fault: the latency SLI counted completed payments, which hid the stall. I switched it to accepted payments, cut DB round trips per payment from 8 to 4, added the stall case as a promtool test, and re-measured.",
    ],
    results: [
      "6,000 / 6,000 payments reached a final state with a balanced ledger (net 0.00) during a 1 → 3 → 6 → 7 → 3 consumer-scaling run.",
      "0 accepted payments lost in all three chaos runs: broker kill (0 of 11,631; 72 requests were refused with 503, never acknowledged), consumer kill (0 of 12,000), +500 ms DB latency (0 of 92,097).",
      "Postmortem fixes, re-measured: time to page ~51 min → 11.3 min; committed throughput under the fault 0.74 → 1.50 payments/s.",
      "Load knee 750–1,000 payments/s with 3 processors. The laptop's CPU is the limit, so this is a relative number, not capacity.",
    ],
    resultsLabel: "Personal benchmark · laptop (Docker Compose) · synthetic data",
    tech: [
      "Java 21",
      "Spring Boot",
      "Apache Kafka",
      "PostgreSQL",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Tempo",
      "Loki",
      "Alertmanager",
      "Testcontainers",
      "k6",
      "Toxiproxy",
      "Docker Compose",
      "GitHub Actions",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/KulmeetSJ/payflow-sim", kind: "github" },
      {
        label: "RESULTS.md",
        href: "https://github.com/KulmeetSJ/payflow-sim/blob/main/RESULTS.md",
        kind: "results",
      },
      {
        label: "Postmortem",
        href: "https://github.com/KulmeetSJ/payflow-sim/blob/main/postmortems/2026-11-20-db-latency.md",
        kind: "results",
      },
    ],
  },
  {
    title: "GitOps Delivery Platform",
    kind: "Personal project",
    featured: true,
    problem:
      "Releases should reach production only through Git, be judged on live metrics rather than health probes, and roll back without a human. Non-compliant workloads should never be admitted.",
    built: [
      "GitHub Actions CI for a Spring Boot service: tests (including Testcontainers), a Trivy gate on fixable HIGH/CRITICAL findings, an SPDX SBOM, and images pushed to GHCR tagged by commit SHA.",
      "Pull-based delivery with Argo CD across dev, staging and prod; CI holds no cluster credentials, and prod promotion needs a required reviewer.",
      "Argo Rollouts canary (10% → 25% → 50% → 100%) judged by the canary pods' own Prometheus success rate and p95 latency.",
      "Kyverno admission policies in Enforce mode, tested in CI; per-environment secrets with Sealed Secrets.",
    ],
    results: [
      "Commit to prod in a median of ~17 min, excluding the human approval wait.",
      "Automatic canary rollback 30 s after the first failed metric-analysis check (5/5 drills).",
      "7/7 non-compliant manifests blocked at admission.",
    ],
    resultsLabel: "Personal benchmark · local kind cluster",
    tech: [
      "Argo CD",
      "Argo Rollouts",
      "Kyverno",
      "GitHub Actions",
      "Helm",
      "Prometheus",
      "Trivy",
      "Sealed Secrets",
      "Kubernetes (kind)",
      "Java",
      "Spring Boot",
      "PostgreSQL",
    ],
    links: [
      { label: "App repo", href: "https://github.com/KulmeetSJ/gitops-demo-app", kind: "github" },
      { label: "Platform repo", href: "https://github.com/KulmeetSJ/gitops-demo-platform", kind: "github" },
      {
        label: "RESULTS.md",
        href: "https://github.com/KulmeetSJ/gitops-demo-platform/blob/main/RESULTS.md",
        kind: "results",
      },
    ],
  },
  {
    title: "Terraform Drift Detector",
    kind: "Personal project",
    featured: true,
    problem:
      "Console changes and IAM grants that Terraform doesn't manage silently pull a GCP project away from its code, and a plain terraform plan can't see all of it.",
    built: [
      "Scheduled drift detection for GCP in GitHub Actions, using keyless Workload Identity Federation (a policy forbids service account keys).",
      "Separates real drift (plan -refresh-only) from code not yet applied (normal plan), and diffs the live IAM policy to catch grants Terraform doesn't manage.",
      "Conftest/Rego policy-as-code on plan JSON; the same policies run on pull requests before merge.",
      "Keeps one GitHub issue that opens, updates, and closes itself once drift is restored.",
    ],
    results: [
      "Detected 7/7 console-style changes, with a median of 26 s from change to issue on a manual run (the schedule runs every 6 h).",
      "Blocked a PR making a BigQuery dataset public before merge.",
    ],
    resultsLabel: "Personal benchmark · sandbox GCP project",
    tech: [
      "Terraform",
      "GCP",
      "GitHub Actions",
      "Conftest",
      "Rego",
      "Workload Identity Federation",
      "Python",
      "BigQuery",
      "IAM",
      "Bash",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/KulmeetSJ/tf-drift-detector", kind: "github" },
      {
        label: "RESULTS.md",
        href: "https://github.com/KulmeetSJ/tf-drift-detector/blob/main/RESULTS.md",
        kind: "results",
      },
    ],
  },
  {
    title: "GuruGranthi",
    kind: "Personal project",
    status: "Live",
    problem:
      "Families looking for Sikh service providers such as Ragi, Pathi and Granthi need one place to find them and request a booking.",
    built: [
      "Full-stack services marketplace and booking platform with Next.js, React, TypeScript, Tailwind CSS and Supabase.",
      "Provider application flow, provider listings, booking requests and an admin portal.",
      "Supabase authentication, role-based access control and PostgreSQL Row Level Security policies.",
    ],
    results: ["Built and launched publicly."],
    resultsLabel: "Personal project",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    links: [{ label: "Live site", href: "https://gurugranthisewa.com/", kind: "live" }],
  },
  {
    title: "AI-Powered RFP Management System",
    kind: "Personal project",
    problem: "Turning unstructured procurement text into a structured RFP is slow, manual work.",
    built: [
      "Platform that transforms unstructured procurement text into structured RFPs using LLM APIs (Ollama).",
      "Vendor-management and proposal-parsing APIs.",
    ],
    results: ["~80% reduction in RFP drafting time."],
    resultsLabel: "Personal project",
    tech: ["Next.js", "Node.js", "PostgreSQL", "LLM APIs", "Ollama"],
    links: [
      { label: "GitHub", href: "https://github.com/KulmeetSJ/rfp-management-system", kind: "github" },
    ],
  },
  {
    title: "Parquet Converter / Smart Data Storage",
    kind: "HSBC work",
    problem: "Keep large BigQuery datasets in an open, columnar format in Cloud Storage.",
    built: [
      "Python script (Sept 2024, one of my first tasks on the team) that converts BigQuery tables to Parquet and stores the output in GCS.",
    ],
    results: [
      "1TB+ of BigQuery data converted to Parquet.",
      "55% query-performance improvement.",
      "50K+ files tiered to Coldline.",
    ],
    resultsLabel: "HSBC work",
    tech: ["Python", "BigQuery", "GCS", "Parquet"],
    links: [],
  },
  {
    title: "Terraform Log Summarizer + Compliance Checker",
    kind: "HSBC work",
    problem: "Large Terraform plans make risky changes, especially IAM grants, easy to miss in review.",
    built: [
      "Python tool that parses Terraform plan JSON and summarizes the planned infrastructure changes.",
      "Compliance checks, including non-privileged AD groups receiving OWNER/WRITER-level roles.",
    ],
    results: [
      "~60% faster infrastructure provisioning.",
      "12+ critical misconfigurations caught.",
    ],
    resultsLabel: "HSBC work",
    tech: ["Python", "Terraform plan JSON", "GCP", "IAM"],
    links: [],
  },
];

function LinkButton({ link }: { link: Link }) {
  const Icon = link.kind === "github" ? Github : link.kind === "results" ? Gauge : ExternalLink;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-sm text-ink hover:border-accent hover:text-accent transition-colors"
    >
      <Icon size={14} />
      {link.label}
    </a>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "neutral" | "hsbc" | "live" | "progress" }) {
  const tones = {
    neutral: "border-line text-muted",
    hsbc: "border-signal/40 text-signal bg-signal/10",
    live: "border-ok/40 text-ok bg-ok/10",
    progress: "border-signal/40 text-signal bg-signal/10",
  };
  return (
    <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ProjectCard({ project, index, number }: { project: Project; index: number; number: string }) {
  const featured = project.featured;
  const isHsbc = project.kind === "HSBC work";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
      className="h-full"
    >
      <Panel className="h-full flex flex-col p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs text-faint mr-1">{number}</span>
          <Tag tone={isHsbc ? "hsbc" : "neutral"}>{project.kind}</Tag>
          {project.status && (
            <Tag tone={project.status === "Live" ? "live" : "progress"}>{project.status}</Tag>
          )}
        </div>

        <h3
          className={`font-display font-semibold text-ink tracking-tight leading-tight mb-4 ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
        >
          {project.title}
        </h3>

        <div className={featured ? "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 flex-grow" : "flex flex-col gap-5 flex-grow"}>
          <div className={featured ? "lg:col-span-7" : ""}>
            <p className="text-ink/85 leading-relaxed mb-5 border-l-2 border-accent pl-3">
              {project.problem}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-faint mb-2">What I built</p>
            <ul className="space-y-2">
              {project.built.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                  <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden />
                  <span className="break-words min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`flex flex-col gap-5 ${featured ? "lg:col-span-5" : "mt-auto"}`}>
            <div className="rounded-md bg-card2 border border-line p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Results</p>
                <span className="font-mono text-[10px] text-faint">{project.resultsLabel}</span>
              </div>
              <ul className="space-y-1.5">
                {project.results.map((r, i) => (
                  <li key={i} className="text-sm text-ink leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-xs text-faint">
                  {t}
                </span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <LinkButton key={l.href} link={l} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Panel>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeader index="04" kicker="Projects" title="Things I've built">
        Personal projects in <span className="text-ink">reliability, delivery and infrastructure</span>,
        plus selected builds. Numbers from personal projects are benchmarks on a laptop, a local
        cluster or a sandbox GCP project, never production results.
      </SectionHeader>

      <div className="flex flex-col gap-6">
        {featured.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} number={num(i)} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} number={num(featured.length + i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
