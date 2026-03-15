"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const experiences = [
  {
    company: "HSBC",
    role: "Software Engineer",
    period: "Jan 2025 - Present",
    type: "Data Engineering and DevOps",
    description:
      "Building cloud-native data pipelines and deployment automation for payment platforms, with a focus on infrastructure reliability, operational efficiency, and scalable orchestration.",
    achievements: [
      "Built reusable Terraform modules to provision and manage large-scale GCP infrastructure across ~2000 resources.",
      "Developed Jenkins automation for weekend shutdown and restart cycles of Dataflow jobs, reducing compute costs by 30%.",
      "Optimized Apache Beam pipelines in Java and Spring Boot for streaming Pub/Sub events into BigQuery.",
      "Designed CI/CD pipelines with Sonar, Nexus, and Checkmarx for Cloud Composer DAG deployments, replacing VM-based schedulers with managed orchestration.",
    ],
    tech: [
      "Terraform",
      "Jenkins",
      "Apache Beam",
      "Spring Boot",
      "Cloud Composer",
      "GCP",
      "BigQuery",
      "Sonar",
      "Nexus",
      "Checkmarx",
    ],
    impact: ["2000+ resources", "30% cost reduction", "Managed orchestration"],
    currentRole: true,
  },
  {
    company: "AnyaSoftek",
    role: "Full Stack Developer Intern",
    period: "May 2024 - Jun 2024",
    type: "Full Stack Development",
    description:
      "Contributed to internal web platforms and client-facing portfolio builds, focusing on responsive frontend development and backend integration.",
    achievements: [
      "Developed a responsive and user-friendly interface for the consultancy website using Next.js and TailwindCSS.",
      "Implemented a MongoDB backend to store and manage client data and project information.",
      "Built a portfolio website for a client showcasing their projects and services.",
    ],
    tech: ["Next.js", "MongoDB", "TailwindCSS"],
    impact: ["Responsive UI", "Client delivery", "Backend integration"],
    currentRole: false,
  },
  {
    company: "Koders",
    role: "Full Stack Developer Intern",
    period: "Jan 2024 - Apr 2024",
    type: "Full Stack Development",
    description:
      "Worked on fast-moving client projects across web development and automation, delivering full-stack features for real-world use cases.",
    achievements: [
      "Built Discord bot integrations that improved automated responses for a 300+ member developer community.",
      "Developed an e-commerce platform with Razorpay checkout and automated email notifications, supporting 1000+ SKUs while improving page load performance by 30%.",
    ],
    tech: ["React", "Node.js", "MongoDB", "REST API", "Python", "TailwindCSS"],
    impact: ["300+ community", "1000+ SKUs", "30% faster load time"],
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
          A progression across{" "}
          <span className="text-blue-400">
            full-stack engineering, cloud infrastructure, and data platforms
          </span>
          , focused on building reliable systems and better developer workflows.
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
                        {exp.period}
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
                      {exp.company}
                    </p>
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
                    <div>
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
                    </div>

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