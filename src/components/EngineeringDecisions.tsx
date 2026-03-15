"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, ShieldCheck, FileText } from "lucide-react";

const decisions = [
    {
        id: "terraform",
        title: "Why Terraform for Infrastructure Management?",
        icon: Cpu,
        problem:
            "Managing hundreds of cloud resources manually or through ad-hoc scripts leads to configuration drift and difficult-to-reproduce deployments.",
        options: [
            "Shell scripts for infrastructure provisioning",
            "Jenkins automation with manual configuration",
            "Infrastructure as Code using Terraform",
        ],
        decision:
            "Adopt Terraform to declaratively manage GCP infrastructure and enable consistent, repeatable deployments across environments.",
        impact: [
            "Infrastructure reproducibility",
            "Reduced configuration drift",
            "Improved auditability of infrastructure changes",
        ],
    },

    {
        id: "compliance",
        title: "Why Shift-Left Compliance Validation?",
        icon: ShieldCheck,
        problem:
            "IAM misconfigurations were sometimes detected only after deployment, increasing security risk and remediation effort.",
        options: [
            "Manual review of Terraform plan output",
            "Post-deployment monitoring and remediation",
            "Pre-deployment compliance validation inside CI/CD pipeline",
        ],
        decision:
            "Implement a shift-left compliance checker in the CI pipeline to validate IAM roles before infrastructure changes are applied.",
        impact: [
            "Prevented unauthorized IAM role assignments",
            "Reduced security risks before deployment",
            "Faster developer feedback during CI pipeline execution",
        ],
    },

    {
        id: "logs",
        title: "Why Terraform Log Summarization?",
        icon: FileText,
        problem:
            "Terraform plans often generate large logs that engineers must manually inspect to identify critical infrastructure changes.",
        options: [
            "Manual inspection of Terraform plan logs",
            "Filtering logs using Jenkins output",
            "Automated log summarization highlighting key infrastructure changes",
        ],
        decision:
            "Develop a Python-based summarizer that parses Terraform plan JSON and extracts important changes such as IAM updates and resource modifications.",
        impact: [
            "Reduced log analysis time from ~1 hour to a few minutes",
            "Improved visibility of infrastructure changes",
            "Faster debugging during CI/CD pipeline runs",
        ],
    },
];

export default function EngineeringDecisions() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-32" id="engineering-decisions">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
                    <span className="text-blue-400 font-black text-2xl">07.</span>
                    Engineering Decisions
                </h2>

                <p className="text-slate-400 text-lg max-w-2xl">
                    Building reliable systems requires thoughtful design decisions.
                    Below are some key architectural decisions made while developing my
                    cloud automation and infrastructure tooling.
                </p>
            </div>

            <div className="space-y-4">
                {decisions.map((d) => {
                    const Icon = d.icon;
                    const isOpen = active === d.id;

                    return (
                        <div
                            key={d.id}
                            className="border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur"
                        >
                            <button
                                onClick={() => setActive(isOpen ? null : d.id)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-slate-200 font-semibold">
                                        {d.title}
                                    </span>
                                </div>

                                <ChevronDown
                                    className={`transition-transform ${isOpen ? "rotate-180 text-blue-400" : "text-slate-500"
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
                                        className="px-6 pb-6 text-slate-400 text-sm space-y-6"
                                    >
                                        <div>
                                            <p className="text-slate-300 font-medium mb-1">
                                                Problem
                                            </p>
                                            <p>{d.problem}</p>
                                        </div>

                                        <div>
                                            <p className="text-slate-300 font-medium mb-1">
                                                Options Considered
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {d.options.map((o, i) => (
                                                    <li key={i}>{o}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="text-slate-300 font-medium mb-1">
                                                Decision
                                            </p>
                                            <p>{d.decision}</p>
                                        </div>

                                        <div>
                                            <p className="text-slate-300 font-medium mb-1">
                                                Impact
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {d.impact.map((i, idx) => (
                                                    <li key={idx}>{i}</li>
                                                ))}
                                            </ul>
                                        </div>
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