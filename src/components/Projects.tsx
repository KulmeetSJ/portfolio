"use client";

import { motion } from "framer-motion";
import {
  Github,
  Folder,
  FileText,
  Terminal,
  Sparkles,
  ShieldCheck,
  Clock3,
  BadgeCheck
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const heroProject = {
  title: "Terraform Log Summarizer and Compliance Checker",
  eyebrow: "Flagship Internal Build",
  description:
    "Built a CI/CD enhancement for GCP deployments with a Python-based shift-left compliance checker that blocks unauthorized IAM role assignments before release. Also developed a Terraform plan summarizer that highlights critical infrastructure changes—such as schema updates, service account bindings, and resource modifications—directly inside Jenkins logs for faster review.",
  tech: ["Python", "Groovy", "Terraform", "Jenkins", "GCP"],
  github: "",
  highlights: [
    "Shift-left IAM policy validation",
    "Terraform plan change summarization",
    "Faster deployment review in Jenkins",
  ],
};

const otherProjects = [
  {
    title: "CI/CD Pipeline for Cloud Composer",
    category: "Internal Platform",
    description:
      "Built a secure CI/CD pipeline for Cloud Composer DAG deployments, replacing VM-based scheduling workflows with managed orchestration. Integrated Sonar, Nexus, and Checkmarx to improve release safety and standardize deployment quality.",
    tech: [
      "Python",
      "Jenkins",
      "Cloud Composer",
      "GCP",
      "Sonar",
      "Nexus",
      "Checkmarx",
    ],
    github: "",
  },
  {
    title: "Data Storage Cost Optimization",
    category: "Internal Optimization",
    description:
      "Built a proof-of-concept storage optimization workflow across BigQuery and GCS, including Parquet conversion for large datasets and automated storage-class transitions based on access patterns.",
    tech: ["Python", "Google Cloud", "BigQuery", "Cloud Functions"],
    github: "",
  },
  {
    title: "AI-Powered RFP Management System",
    category: "AI Product",
    description:
      "Built an end-to-end AI platform that transforms unstructured procurement text into structured RFPs, reducing manual drafting time by 80%. Designed scalable APIs for proposal parsing, scoring, and vendor workflow automation.",
    tech: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Ollama LLM",
    ],
    github: "https://github.com/KulmeetSJ/rfp-management-system",
  },
  {
    title: "E-Commerce Platform",
    category: "Full Stack Product",
    description:
      "Developed a full-stack e-commerce application with product discovery, wishlist, cart, authentication, Razorpay payments, automated order confirmation emails, and an admin dashboard for inventory and user management.",
    tech: ["React.js", "Node.js", "MongoDB", "Razorpay", "Nodemailer"],
    github: "",
  },
  {
    title: "Conversational Fashion Recommendation System",
    category: "Applied AI",
    description:
      "Engineered an AI recommendation system supporting intent classification, dialog routing, and dynamic image generation. Integrated LLM-backed APIs, fine-tuned models for personalized outfit suggestions, and built natural conversational flows.",
    tech: ["React.js", "Python", "Falcon-7b", "Diffusion AI", "DialoGPT", "RASA"],
    github: "https://github.com/yodhaDevelopers/flipfashion",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
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
            03.
          </span>
          Featured Work
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          A mix of{" "}
          <span className="text-blue-400">
            internal platform engineering, cloud automation, and product builds
          </span>{" "}
          focused on developer productivity, reliability, and scale.
        </p>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* HERO PROJECT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SpotlightCard className="p-0 overflow-hidden group border border-white/5">
            <div className="grid grid-cols-1 xl:grid-cols-12">
              {/* LEFT */}
              <div className="xl:col-span-7 p-8 md:p-10 xl:p-12 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                      <FileText size={26} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                      {heroProject.eyebrow}
                    </span>
                  </div>

                  {heroProject.github && (
                    <a
                      href={heroProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Github size={22} />
                    </a>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold text-slate-100 mb-5 tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                  {heroProject.title}
                </h3>

                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                  {heroProject.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {heroProject.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3"
                    >
                      <div className="flex items-start gap-2">
                        <BadgeCheck size={16} className="text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-300 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {heroProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-400/20 uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="xl:col-span-5 bg-[#080b11] border-t xl:border-t-0 xl:border-l border-slate-800 relative p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-md mx-auto space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      <Terminal size={14} className="text-blue-400" />
                      <span>Terraform Analysis Pipeline</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                      </span>
                      <span className="text-[10px] text-blue-400 font-mono uppercase">
                        Running
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#020408] border border-slate-800 rounded-2xl p-4 shadow-inner">
                    <div className="space-y-3">
                      {[
                        {
                          label: "terraform plan",
                          status: "done",
                          icon: <FileText size={14} />,
                        },
                        {
                          label: "policy validation",
                          status: "done",
                          icon: <ShieldCheck size={14} />,
                        },
                        {
                          label: "change summarization",
                          status: "active",
                          icon: <Sparkles size={14} />,
                        },
                        {
                          label: "deployment review",
                          status: "pending",
                          icon: <Clock3 size={14} />,
                        },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.4, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 * i, duration: 0.35 }}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`p-1.5 rounded-md border ${step.status === "done"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : step.status === "active"
                                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                                  : "bg-slate-800 border-slate-700 text-slate-500"
                                }`}
                            >
                              {step.icon}
                            </div>

                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2.5 w-2.5 rounded-full ${step.status === "done"
                                  ? "bg-emerald-400"
                                  : step.status === "active"
                                    ? "bg-yellow-400 animate-pulse"
                                    : "bg-slate-600"
                                  }`}
                              />
                              <span className="text-sm font-mono text-slate-300">
                                {step.label}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider ${step.status === "done"
                              ? "text-emerald-400"
                              : step.status === "active"
                                ? "text-yellow-400"
                                : "text-slate-500"
                              }`}
                          >
                            {step.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
                    >
                      <div className="text-[10px] uppercase tracking-widest font-mono text-emerald-400/80 mb-1">
                        Added
                      </div>
                      <div className="text-2xl font-bold font-display text-emerald-400">
                        +3
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4"
                    >
                      <div className="text-[10px] uppercase tracking-widest font-mono text-amber-400/80 mb-1">
                        Changed
                      </div>
                      <div className="text-2xl font-bold font-display text-amber-400">
                        ~2
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-4"
                    >
                      <div className="text-[10px] uppercase tracking-widest font-mono text-red-400/80 mb-1">
                        Destroyed
                      </div>
                      <div className="text-2xl font-bold font-display text-red-400">
                        0
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 }}
                      className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4"
                    >
                      <div className="text-[10px] uppercase tracking-widest font-mono text-blue-400/80 mb-1">
                        Compliance
                      </div>
                      <div className="text-lg font-bold font-display text-blue-400">
                        PASS
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* OTHER PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
              className="h-full"
            >
              <SpotlightCard className="p-7 h-full flex flex-col group border border-white/5">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-4">
                    <div className="p-3 w-fit bg-slate-800/60 rounded-xl text-blue-400 group-hover:text-white group-hover:bg-slate-700 transition-colors border border-white/5">
                      <Folder size={22} />
                    </div>

                    <span className="inline-flex w-fit text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-white/5">
                      {project.category}
                    </span>
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors z-20"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>

                <h3 className="text-2xl font-display font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors tracking-tight leading-snug">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="mt-auto pt-5 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-full border border-white/5 uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
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