"use client";

import { motion } from "framer-motion";
import { Database, Cloud, GitBranch, Cpu } from "lucide-react";

// Wording follows master_resume_evidence_bank.yaml v1.9h.
const focusAreas = [
    {
        title: "Data Engineering",
        value: "Apache Beam · Dataflow · BigQuery",
        description:
            "Java Beam pipelines for payment-data ingestion at HSBC: 10M+ daily transactions at 99.9% uptime.",
        icon: Database,
    },
    {
        title: "Platform & IaC",
        value: "GCP · Terraform · GKE",
        description:
            "Reusable Terraform across 2,000+ GCP resources; Composer CI/CD supporting 100+ DAG deployments.",
        icon: Cloud,
    },
    {
        title: "Reliability",
        value: "Monitoring · Alerting · SLOs",
        description:
            "Cloud Monitoring alerting at HSBC; SLOs, chaos tests, a postmortem and canary rollbacks in personal projects.",
        icon: GitBranch,
    },
    {
        title: "Backend & AI Tooling",
        value: "Java · Python · MCP",
        description:
            "Spring Boot services and Python MCP diagnostic servers that cut manual troubleshooting by ~70%.",
        icon: Cpu,
    },
];

export default function EngineeringSnapshot() {
    return (
        <>
            {focusAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                    <motion.div
                        key={area.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * index }}
                        className="md:col-span-6 lg:col-span-3 rounded-card border border-line bg-card p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <Icon size={18} className="text-accent" />
                            <span className="font-mono text-[11px] text-faint">0{index + 1}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-ink mb-1">{area.title}</h3>
                        <p className="font-mono text-xs text-accent mb-3">{area.value}</p>
                        <p className="text-sm text-muted leading-relaxed">{area.description}</p>
                    </motion.div>
                );
            })}
        </>
    );
}
