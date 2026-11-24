"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  FlaskConical,
  Folder,
  ChevronRight,
  Gauge,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

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

// Every fact below comes from master_resume_evidence_bank.yaml (v1.9h).
// Personal-project numbers are benchmarks and are labelled as such.
const projects: Project[] = [
  {
    title: "PayFlow Sim",
    kind: "Personal project",
    status: "In progress",
    featured: true,
    problem:
      "A payment must be accepted once, applied once and in order per account, and failures must be visible, even when clients retry and consumers crash or rebalance.",
    built: [
      "Event-driven payments simulator: a Spring Boot gateway (POST /payments with an Idempotency-Key, 202 only after acks=all) publishes to Kafka; a consumer group writes the payment, a double-entry ledger and balances to PostgreSQL in one transaction.",
      "Idempotent processing (dedupe key derived from the Idempotency-Key; offsets committed only after the DB commit) and per-account ordering by keying events on the sending account.",
      "Two-layer retries: blocking retries, then retry topics (1 s / 2 s / 4 s), then a dead-letter topic with an inspector and idempotent replay.",
      "OpenTelemetry tracing across HTTP, Kafka and JDBC into Tempo, logs in Loki, Prometheus metrics and Grafana; two SLOs with multi-window burn-rate alerts routed by Alertmanager, tested with promtool in CI.",
    ],
    results: [
      "6,000 / 6,000 payments reached a final state with a balanced ledger (net 0.00) during a 1 → 3 → 6 → 7 → 3 consumer-scaling run.",
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
      "Docker Compose",
      "GitHub Actions",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/KulmeetSJ/payflow-sim", kind: "github" },
      { label: "Results", href: "https://github.com/KulmeetSJ/payflow-sim#readme", kind: "results" },
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
    links: [],
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
    kind: "Engineering project",
    problem: "Keep large BigQuery datasets in an open, columnar format in Cloud Storage.",
    built: [
      "Converted BigQuery tables to Parquet with Python and stored the output in GCS.",
      "Tiered files to the Coldline storage class.",
    ],
    results: [
      "1TB+ of BigQuery data converted to Parquet.",
      "55% query-performance improvement.",
      "50K+ files tiered to Coldline.",
    ],
    resultsLabel: "Engineering project",
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
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-mono text-slate-300 hover:border-blue-400/40 hover:text-blue-300 transition-colors"
    >
      <Icon size={14} />
      {link.label}
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured;
  const isHsbc = project.kind === "HSBC work";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.05 * index }}
      className={featured ? "" : "h-full"}
    >
      <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border border-white/5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            {featured ? <FlaskConical size={18} /> : <Folder size={18} />}
          </div>
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${isHsbc
              ? "text-amber-300 bg-amber-500/10 border-amber-400/20"
              : "text-slate-300 bg-slate-900 border-white/10"
              }`}
          >
            {project.kind}
          </span>
          {project.status && (
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${project.status === "Live"
                ? "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
                : "text-yellow-300 bg-yellow-500/10 border-yellow-400/20"
                }`}
            >
              {project.status}
            </span>
          )}
        </div>

        <h3
          className={`font-display font-bold text-slate-100 tracking-tight leading-tight mb-3 ${featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
        >
          {project.title}
        </h3>

        <div className={featured ? "grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10" : "flex flex-col gap-5 flex-grow"}>
          {/* Problem + built */}
          <div className={featured ? "xl:col-span-7" : ""}>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-1">Problem</p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">{project.problem}</p>

            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-2">
              What I built
            </p>
            <ul className="space-y-2">
              {project.built.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                  <ChevronRight size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span className="break-words min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results + tech + links */}
          <div className={`flex flex-col gap-5 ${featured ? "xl:col-span-5" : "mt-auto"}`}>
            <div className="rounded-xl border border-blue-400/15 bg-blue-500/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-300">Results</p>
                <span className="text-[10px] font-mono text-slate-400">{project.resultsLabel}</span>
              </div>
              <ul className="space-y-1.5">
                {project.results.map((r, i) => (
                  <li key={i} className="text-slate-200 text-sm leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-full border border-white/5 uppercase tracking-wider"
                >
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
      </SpotlightCard>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 tracking-tight">
          <span className="text-blue-400 font-display font-black text-2xl md:text-3xl mr-3">04.</span>
          Projects
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Personal projects in{" "}
          <span className="text-blue-400">reliability, delivery and infrastructure</span>, plus
          selected builds. Numbers from personal projects are benchmarks on a laptop, a local
          cluster or a sandbox GCP project, never production results.
        </p>
      </motion.div>

      <div className="flex flex-col gap-8">
        {featured.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
