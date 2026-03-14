"use client";

import { motion } from "framer-motion";
import {
  Github,
  Folder,
  FileText,
  Terminal,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock3
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const heroProject = {
  title: "Terraform Log Summarizer and Compliance Checker",
  description:
    "(Internal HSBC) Built a CI/CD pipeline enhancement for GCP deployments with a Python-based shift-left compliance checker that blocks unauthorized IAM role assignments before release. Also developed a Terraform plan summarizer that highlights critical infrastructure changes—such as schema updates, service account bindings, and resource modifications—directly inside Jenkins logs for faster review.",
  tech: ["Python", "Groovy", "Terraform", "Jenkins", "GCP"],
  github: ""
};

const otherProjects = [
  {
    title: "CI/CD Pipeline for Cloud Composer",
    description:
      "(Internal HSBC) Built a secure CI/CD pipeline for Cloud Composer DAG deployments, replacing VM-based scheduling workflows with managed orchestration. Integrated Sonar, Nexus, and Checkmarx to improve release safety and standardize deployment quality.",
    tech: ["Python", "Jenkins", "Cloud Composer", "GCP", "Sonar", "Nexus", "Checkmarx"]
  },
  {
    title: "Data Storage Cost Optimization",
    description:
      "(Internal HSBC) Built a proof-of-concept storage optimization workflows across BigQuery and GCS, including Parquet conversion for large datasets and automated storage-class transitions based on access patterns. Reduced storage costs and improved lifecycle efficiency.",
    tech: ["Python", "Google Cloud", "BigQuery", "Cloud Functions"],
  },
  {
    title: "AI-Powered RFP Management System",
    description:
      "An end-to-end AI platform that leverages LLMs to transform unstructured procurement text into structured RFPs, reducing manual drafting time by 80%. Engineered scalable APIs for automated proposal parsing, AI-based scoring, and systemized email workflows to seamlessly handle vendor invitations.",
    tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Ollama LLM"],
    github: "https://github.com/KulmeetSJ/rfp-management-system",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Developed a full-stack e-commerce web application with features such as product browsing, category-based search, wishlist, cart management, and secure checkout. Implemented user authentication, Razorpay payment integration, and automated order confirmation emails using Nodemailer. Also built an admin dashboard for managing users, books, and inventory through a centralized interface.",
    tech: ["React.js", "Node.js", "MongoDB", "Razorpay", "Nodemailer"]
  },
  {
    title: "Conversational Fashion Recommendation System",
    description:
      "Engineered a production-ready AI recommendation system supporting intent classification, dialog routing, and dynamic image generation. Integrated an LLM backend with a scalable API to achieve 95% intent accuracy. Fine-tuned Falcon-7b for personalized outfit suggestions, utilized Diffusion AI for generating outfit images, and implemented DialoGPT for natural conversational flow alongside a RASA model for precise intent classification.",
    tech: ["React.js", "Python", "Falcon-7b", "Diffusion AI", "DialoGPT", "RASA"],
    github: "https://github.com/yodhaDevelopers/flipfashion"
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
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
          <span className="text-teal-400 font-display font-black text-2xl">
            03.
          </span>{" "}
          Featured Work
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* SpotlightCard now handles its own internal physics */}
          <SpotlightCard className="p-0 overflow-hidden group">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-20">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20">
                    <FileText size={28} />
                  </div>
                  <div className="flex gap-4 text-slate-400">
                    {heroProject.github && (
                      <a
                        href={heroProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-teal-400 transition-colors"
                      >
                        <Github size={22} />
                      </a>
                    )}
                    {/* <a
                      href={heroProject.link}
                      className="hover:text-teal-400 transition-colors"
                    >
                      <ExternalLink size={22} />
                    </a> */}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-100 mb-4 tracking-tight group-hover:text-teal-400 transition-colors">
                  {heroProject.title}
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                  {heroProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {heroProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-teal-400/90 bg-teal-400/10 px-3 py-1.5 rounded-md border border-teal-400/20 uppercase tracking-tighter"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[45%] bg-[#080b11] border-t lg:border-t-0 lg:border-l border-slate-800 relative flex flex-col justify-center p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-md mx-auto space-y-4">
                  {/* TOP BAR */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      <Terminal size={14} className="text-teal-400" />
                      <span>Terraform Analysis Pipeline</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                      </span>
                      <span className="text-[10px] text-teal-400 font-mono uppercase">
                        Running
                      </span>
                    </div>
                  </div>

                  {/* PIPELINE STEPS */}
                  <div className="bg-[#020408] border border-slate-800 rounded-xl p-4 shadow-inner">
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
                          className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2.5"
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

                  {/* METRICS */}
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
                      className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-4"
                    >
                      <div className="text-[10px] uppercase tracking-widest font-mono text-teal-400/80 mb-1">
                        Compliance
                      </div>
                      <div className="text-lg font-bold font-display text-teal-400">
                        PASS
                      </div>
                    </motion.div>
                  </div>

                  {/* AI SUMMARY */}
                  {/* <motion.div
                    initial={{ opacity: 0.4, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-purple-400" />
                      <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">
                        AI Summary
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-300">
                      This plan provisions{" "}
                      <span className="text-emerald-400">3 new resources</span>,
                      updates{" "}
                      <span className="text-amber-400">2 existing resources</span>,
                      and introduces{" "}
                      <span className="text-teal-400">no destructive changes</span>.
                      Policy checks passed, and the deployment is ready for review.
                    </p>
                  </motion.div> */}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="p-8 h-full flex flex-col group">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-slate-800/50 rounded-xl text-teal-400 group-hover:text-white group-hover:bg-slate-700 transition-colors border border-white/5">
                    <Folder size={24} />
                  </div>
                  <div className="flex gap-4 text-slate-400 z-20">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-teal-400 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {/* <a
                      href={project.link}
                      className="hover:text-teal-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a> */}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-100 mb-3 group-hover:text-teal-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-white/5 uppercase tracking-tighter"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
