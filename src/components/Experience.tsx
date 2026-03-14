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
      "Designed CI/CD pipelines with Sonar, Nexus, and Checkmarx for Cloud Composer DAG deployments, replacing VM-based schedulers with managed orchestration."
    ],
    tech: ["Terraform", "Jenkins", "Apache Beam", "Cloud Composer", "GCP", "Sonar", "Nexus", "Checkmarx"],
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
      "Developed a responsive and user-friendly interface for the consultancy's website using Next.js and TailwindCSS.",
      "Implemented a MongoDB backend to store and manage client data and project information.",
      "Built a portfolio website for a client showcasing their projects and services.",
    ],
    tech: ["Next.js", "MongoDB", "TailwindCSS"],
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
    currentRole: false,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative scroll-mt-32"
    >
      {/* Huge background number using font-display (Hidden on mobile to save space) */}
      <div className="absolute top-10 right-10 text-[15rem] font-black font-display text-slate-800/20 select-none pointer-events-none tracking-tighter hidden md:block">
        02
      </div>

      {/* Header Container - Aligned to match the new text column offset */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20 md:ml-24"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
          <span className="text-teal-400 font-display font-black text-2xl">
            02.
          </span>{" "}
          Professional Path
        </h2>
        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
          I've worked across <span className="text-teal-400">application engineering, cloud infrastructure, and data platforms</span>, building systems focused on reliability, automation, and scale.
        </p>
      </motion.div>

      <div className="relative">
        {/* THE MASTER TIMELINE LINE */}
        {/* Fades in at the top and out at the bottom for elegance */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 flex justify-center z-0">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <div className="space-y-16 md:space-y-24">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* TIMELINE NODE / DOT */}
              {/* Perfectly centered on the master line */}
              <div className="absolute left-0 w-12 md:w-24 flex justify-center top-2 z-20">
                <div className="w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-teal-400 group-hover:bg-teal-500/20 transition-all duration-500">
                  {/* Bouncing ping effect triggers when the user hovers anywhere over this experience block */}
                  <div className="absolute inset-0 rounded-full bg-teal-400 opacity-0 group-hover:animate-ping group-hover:opacity-40" />
                </div>
              </div>

              <div className="ml-12 md:ml-24 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                {/* LEFT COLUMN: Sticky Header */}
                <div className="md:col-span-5 lg:col-span-4 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    // STICKY MAGIC HAPPENS HERE
                    // The text stays locked while the tall right-side card scrolls past
                    className="md:sticky md:top-32 pt-1"
                  >
                    <span className="text-teal-400 font-mono text-xs md:text-sm block mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-100 mb-2 tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400 font-mono text-sm mb-6 flex items-center gap-2">
                      <Briefcase size={14} className="text-slate-500" />
                      {exp.company}
                    </p>
                    <div className="flex flex-col items-start gap-3">
                      <span className="inline-block px-3 py-1 bg-slate-800/50 text-slate-300 text-[10px] font-mono rounded-full border border-white/5 uppercase tracking-widest">
                        {exp.type}
                      </span>

                      {exp.currentRole && (
                        <span className="inline-block px-3 py-1 bg-teal-500/10 text-teal-300 text-[10px] font-mono rounded-full border border-teal-400/20 uppercase tracking-widest">
                          Current Role
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT COLUMN: Scrolling Body */}
                <div className="md:col-span-7 lg:col-span-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <SpotlightCard className="p-6 md:p-8">
                      <p className="text-slate-300 text-base leading-relaxed mb-6">
                        {exp.description}
                      </p>
                      <ul className="space-y-4 mb-8">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-slate-400 text-sm md:text-base leading-relaxed"
                          >
                            <ChevronRight
                              size={18}
                              className="text-teal-500 mt-0.5 shrink-0"
                            />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                        {exp.tech.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-teal-400/80 bg-teal-400/10 px-2 py-1 rounded border border-teal-400/20 uppercase tracking-tighter"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
