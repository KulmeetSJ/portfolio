"use client";

import { motion } from "framer-motion";
import { Database, Cloud, GitBranch, Cpu } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

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
            "Cloud Monitoring alerting at HSBC; SLOs, burn-rate alerts and canary rollbacks in personal projects.",
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="col-span-1 md:col-span-6 lg:col-span-3"
                    >
                        <SpotlightCard className="p-6 h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <Icon size={20} className="text-blue-400" />
                                </div>
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                    Focus
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-100 mb-2">
                                {area.title}
                            </h3>

                            <p className="text-blue-400 font-mono text-sm mb-4">
                                {area.value}
                            </p>

                            <p className="text-slate-400 text-sm leading-relaxed">
                                {area.description}
                            </p>
                        </SpotlightCard>
                    </motion.div>
                );
            })}
        </>
    );
}