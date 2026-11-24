"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Wrench,
  BellRing,
  Layers,
  PiggyBank,
  Rocket,
  Info,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

// HSBC production work only. Each metric is attached to its own workstream
// exactly as recorded in master_resume_evidence_bank.yaml (verified_metrics_master).
const metrics = [
  {
    value: "10M+",
    unit: "daily transactions · 99.9% uptime",
    title: "Payment-data pipelines",
    detail: "Java Apache Beam pipelines on GCP Dataflow for payment-data ingestion and processing.",
    icon: Activity,
  },
  {
    value: "~70%",
    unit: "less manual troubleshooting",
    title: "MCP diagnostic servers",
    detail: "Python MCP servers that give AI clients structured tools for GCP, platform and payment-data diagnostics.",
    icon: Wrench,
  },
  {
    value: "~40%",
    unit: "better incident detection / MTTR",
    title: "Cloud Monitoring alerting",
    detail: "Alerting policies in GCP Cloud Monitoring; the improvement applies to the monitoring and incident-response workflow.",
    icon: BellRing,
  },
  {
    value: "2,000+",
    unit: "GCP resources",
    title: "Terraform infrastructure as code",
    detail: "Reusable Terraform for Pub/Sub, BigQuery, GCS and IAM.",
    icon: Layers,
  },
  {
    value: "~30%",
    unit: "Dataflow compute-cost reduction",
    title: "Dataflow cost optimization",
    detail: "Through automation and optimization, an estimated $150K+ annually.",
    icon: PiggyBank,
  },
  {
    value: "100+",
    unit: "DAG deployments",
    title: "Cloud Composer CI/CD",
    detail: "CI/CD for Composer (Airflow) DAG deployments, with SonarQube, Checkmarx and Nexus scans integrated.",
    icon: Rocket,
  },
];

export default function Impact() {
  return (
    <section id="impact" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeader index="03" kicker="Impact at HSBC" title="Production outcomes">
        From my work on the <span className="text-ink">Payments Data Platform</span> team. Each
        number belongs to the workstream named next to it.
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-card border border-line bg-line overflow-hidden">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card p-6 md:p-7 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-5 text-muted">
                <Icon size={15} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-wider">{m.title}</h3>
              </div>
              <p className="font-display text-5xl md:text-6xl font-semibold text-ink tracking-tight leading-none">
                {m.value}
              </p>
              <p className="mt-2 text-sm font-medium text-accent">{m.unit}</p>
              <p className="mt-4 text-sm text-muted leading-relaxed">{m.detail}</p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 flex items-start gap-2 text-sm text-muted">
        <Info size={16} className="text-signal mt-0.5 shrink-0" />
        Personal-project results (PayFlow Sim, GitOps Delivery Platform, Terraform Drift Detector)
        are benchmarks, not HSBC or production results. They appear separately under Projects.
      </p>
    </section>
  );
}
