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
import SpotlightCard from "./SpotlightCard";

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
    <section id="impact" className="py-24 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-5 tracking-tight">
          <span className="text-blue-400 font-display font-black text-2xl">03.</span> Impact at HSBC
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
          Outcomes from my production work on the{" "}
          <span className="text-blue-400">Payments Data Platform</span> team. Each number belongs
          to the workstream shown on its card.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="h-full"
            >
              <SpotlightCard className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-slate-100 font-semibold">{m.title}</h3>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 mb-3">
                  <span className="text-4xl md:text-5xl font-display font-black text-slate-50 tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-sm font-mono text-blue-300">{m.unit}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-auto">{m.detail}</p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-slate-900/50 px-5 py-4 flex items-start gap-3">
        <Info size={18} className="text-blue-400 mt-0.5 shrink-0" />
        <p className="text-sm text-slate-400 leading-relaxed">
          Personal-project results (PayFlow Sim, GitOps Delivery Platform, Terraform Drift Detector)
          are benchmarks, not HSBC or production results. They appear separately under Projects.
        </p>
      </div>
    </section>
  );
}
