"use client";

import { motion } from "framer-motion";
import Panel from "./Panel";
import SectionHeader from "./SectionHeader";

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
    <section id="experience" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <SectionHeader index="02" kicker="Experience" title="Where I've worked">
        2+ years full-time as a{" "}
        <span className="text-ink">Software Engineer on GCP data and platform engineering</span> at
        HSBC (2.5+ years including internships).
      </SectionHeader>

      <ol className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.li
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8"
          >
            {/* Dates column */}
            <div className="md:col-span-3 md:pt-6">
              <p className="font-mono text-sm text-ink">{exp.period}</p>
              <p className="font-mono text-xs text-faint mt-1">{exp.location}</p>
              <span
                className={`mt-3 inline-block rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border ${exp.currentRole
                  ? "border-accent/40 text-accent bg-accent/10"
                  : "border-line text-faint"
                  }`}
              >
                {exp.currentRole ? "Current" : exp.type}
              </span>
            </div>

            {/* Role */}
            <Panel className="md:col-span-9 p-5 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight">
                  {exp.company}
                </h3>
                {exp.currentRole && (
                  <span className="font-mono text-xs text-muted">{exp.type}</span>
                )}
              </div>
              <p className="text-ink/80 font-medium">{exp.role}</p>

              {exp.progression.length > 0 && (
                <ol className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2 text-xs font-mono text-muted">
                  {exp.progression.map((step, i) => (
                    <li key={step.title} className="flex items-center gap-2">
                      {i > 0 && <span className="hidden sm:inline text-accent">→</span>}
                      <span className="rounded border border-line bg-card2 px-2 py-1">
                        <span className="text-ink">{step.title}</span> · {step.period}
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              <p className="text-muted leading-relaxed mt-4">{exp.description}</p>

              <ul className="mt-5 space-y-2.5">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-[15px] text-ink/85 leading-relaxed">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {exp.impact.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.impact.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-signal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-line flex flex-wrap gap-x-3 gap-y-1.5">
                {exp.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-faint">
                    {t}
                  </span>
                ))}
              </div>
            </Panel>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
