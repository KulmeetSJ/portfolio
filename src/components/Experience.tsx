"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

// Source: master_resume_evidence_bank.yaml v1.9j (HSBC, ANYASOFTEK, KODERS).
// Each metric stays attached to its own HSBC workstream.
const experiences = [
  {
    company: "HSBC",
    role: "Software Engineer",
    location: "Pune, India",
    period: "Jul 2024 – Present",
    // Joined as Trainee (probation); confirmed as Software Engineer in Jan 2025.
    progression: [
      { title: "Trainee Software Engineer", period: "Jul 2024 – Jan 2025" },
      { title: "Software Engineer", period: "Jan 2025 – Present" },
    ],
    type: "Payments Data Platform",
    description:
      "Ingestion work on the Payments Data Platform team: receiving payment data from upstream sources, then processing, transforming and delivering it to downstream consumers on Google Cloud.",
    achievements: [
      "Build and maintain Java Apache Beam pipelines on GCP Dataflow for payment-data ingestion and processing, handling 10M+ daily payment transactions at 99.9% uptime. The pipelines process XML and JSON payloads, including SWIFT MT/MX formats.",
      "Reduced Dataflow compute cost by ~30% through automation and optimization (an estimated $150K+ annually).",
      "Authored and used reusable Terraform to provision Pub/Sub, BigQuery, GCS and IAM across 2,000+ GCP resources, including a migration covering ~600 topics and 1,200 subscriptions.",
      "Built MCP (Model Context Protocol) diagnostic servers in Python that connect AI clients to GCP, platform and payment-data diagnostics, reducing manual troubleshooting effort by ~70%.",
      "Configured GCP Cloud Monitoring alerting policies, improving incident detection and MTTR by ~40% in the monitoring and incident-response workflow.",
      "Worked on CI/CD for Cloud Composer (Airflow) DAG deployments, replacing a VM-scheduler-based workflow and supporting 100+ DAG deployments; integrated SonarQube, Checkmarx and Nexus scans into the pipeline.",
      "Contribute to the internal Payments AI Platform: React/TypeScript frontend features, Kubernetes (GKE) manifests and Helm-based deployment, and SSO integration working with OAuth and SAML flows.",
      "Investigate production issues in my own workstreams end to end with Cloud Logging, the gcloud CLI and SSH, from logs through RCA to the fix.",
    ],
    tech: [
      "Java",
      "Apache Beam",
      "Dataflow",
      "Pub/Sub",
      "BigQuery",
      "GCS",
      "Terraform",
      "Cloud Composer / Airflow",
      "Cloud Monitoring",
      "Cloud Logging",
      "Python",
      "MCP",
      "GKE",
      "Helm",
      "Jenkins",
      "Ansible",
    ],
    impact: [
      "10M+ daily transactions",
      "99.9% uptime",
      "2,000+ GCP resources",
      "~30% Dataflow cost",
    ],
    currentRole: true,
  },
  {
    company: "AnyaSoftek",
    role: "Full Stack Developer Intern",
    location: "Remote",
    period: "May 2024 – Jun 2024",
    type: "Internship",
    description: "Short internship building websites.",
    achievements: [
      "Built a portfolio website for one of the company's clients.",
      "Rebuilt the AnyaSoftek company website.",
      "Worked on one further website.",
    ],
    tech: ["Next.js", "TailwindCSS", "MongoDB"],
    impact: [] as string[],
    progression: [] as { title: string; period: string }[],
    currentRole: false,
  },
  {
    company: "Koders",
    role: "Software Development Engineer Intern",
    location: "Dehradun, India",
    period: "Jan 2024 – Apr 2024",
    type: "Internship",
    description:
      "Internship building JavaScript applications and backend features.",
    achievements: [
      "Built Discord applications and bots, including keyword monitoring, and an Electron-based Keyword Pinger app.",
      "Worked on backend routes and database operations with Node.js, Express and MongoDB.",
      "Did debugging, testing and deployment work.",
    ],
    tech: ["JavaScript", "Node.js", "Express", "React", "MongoDB", "Docker", "Electron", "Discord bots", "Git"],
    impact: [] as string[],
    progression: [] as { title: string; period: string }[],
    currentRole: false,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 tracking-tight">
          <span className="text-blue-400 font-display font-black text-2xl md:text-3xl mr-3">
            02.
          </span>
          Professional Path
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          2+ years as a full-time{" "}
          <span className="text-blue-400">
            Software Engineer on GCP data and platform engineering
          </span>
          {" "}at HSBC (2.5+ years including internships).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* LEFT RAIL */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-white/10 to-transparent" />

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="absolute -left-[29px] top-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${exp.currentRole
                            ? "bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                            : "bg-slate-950 border-slate-700"
                          }`}
                      />
                    </div>

                    <div
                      className={`rounded-2xl border px-5 py-4 transition-all ${exp.currentRole
                          ? "border-blue-400/20 bg-blue-500/10"
                          : "border-white/5 bg-slate-900/40"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-lg font-display font-bold text-slate-100">
                          {exp.company}
                        </h3>

                        {exp.currentRole && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-400/20">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="text-slate-300 text-sm font-medium mb-1">
                        {exp.role}
                      </p>

                      <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-3">
                        {exp.period} · {exp.location}
                      </p>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {exp.type}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT DETAIL PANELS */}
        <div className="lg:col-span-8 space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <SpotlightCard
                className={`p-6 md:p-8 border ${exp.currentRole
                    ? "border-blue-400/15"
                    : "border-white/5"
                  }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-800/70 border border-white/5 text-blue-400">
                        <Briefcase size={18} />
                      </div>

                      <span className="inline-block px-3 py-1 bg-slate-800/60 text-slate-300 text-[10px] font-mono rounded-full border border-white/5 uppercase tracking-widest">
                        {exp.type}
                      </span>

                      {exp.currentRole && (
                        <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 text-[10px] font-mono rounded-full border border-blue-400/20 uppercase tracking-widest">
                          Current Role
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-100 tracking-tight mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg">
                      {exp.company} · {exp.location}
                    </p>
                    {exp.progression.length > 0 && (
                      <ol className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-400">
                        {exp.progression.map((step, i) => (
                          <li key={step.title} className="flex items-center gap-2">
                            {i > 0 && <span className="hidden sm:inline text-blue-400">→</span>}
                            <span className="rounded-md border border-white/10 bg-slate-900/70 px-2 py-1">
                              <span className="text-slate-200">{step.title}</span> · {step.period}
                            </span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  <div className="text-blue-400 font-mono text-sm md:text-base shrink-0">
                    {exp.period}
                  </div>
                </div>

                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  <div className="xl:col-span-8">
                    <h4 className="text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wider">
                      Key Contributions
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((ach, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-400 text-sm md:text-base leading-relaxed"
                        >
                          <ChevronRight
                            size={18}
                            className="text-blue-500 mt-0.5 shrink-0"
                          />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="xl:col-span-4 space-y-6">
                    {exp.impact.length > 0 && (<div>
                      <h4 className="text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wider">
                        Impact
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.impact.map((item, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-400/20 uppercase tracking-wider"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>)}

                    <div>
                      <h4 className="text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wider">
                        Stack Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}