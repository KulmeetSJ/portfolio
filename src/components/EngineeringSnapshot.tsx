"use client";

import { motion } from "framer-motion";
import { Database, Cloud, GitBranch, Cpu } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

const focusAreas = [
    {
        title: "Backend Systems",
        value: "Java · Spring Boot",
        description:
            "Building reliable backend services and scalable application workflows.",
        icon: Cpu,
    },
    {
        title: "Cloud Infrastructure",
        value: "GCP · Terraform",
        description:
            "Designing and automating cloud-native infrastructure and deployments.",
        icon: Cloud,
    },
    {
        title: "CI/CD Automation",
        value: "Jenkins · Pipelines",
        description:
            "Improving delivery workflows with secure and repeatable automation.",
        icon: GitBranch,
    },
    {
        title: "Data Engineering",
        value: "Apache Beam · Batch/Realtime",
        description:
            "Working on ingestion systems handling high-volume data flows at scale.",
        icon: Database,
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
                        className="col-span-1 md:col-span-3"
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