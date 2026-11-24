"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { EMAIL_ADDRESS } from "@/constants/consts";

import Toaster from "@/components/Toaster";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CertificationsCard from "@/components/CertificationsCard";
import EngineeringSnapshot from "@/components/EngineeringSnapshot";
import Impact from "@/components/Impact";
import MessageConsole from "@/components/MessageConsole";

// Client-only, interactive sections
const Architecture = dynamic(() => import("@/components/Architecture"), { ssr: false });
const EngineeringDecisions = dynamic(() => import("@/components/EngineeringDecisions"), { ssr: false });
const CICDVisualizer = dynamic(() => import("@/components/CICDVisualizer"), { ssr: false });
const TerraformPlayground = dynamic(() => import("@/components/TerraformPlayground"), { ssr: false });
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const AiChatbot = dynamic(() => import("@/components/AiChatbot"), { ssr: false });

const facts: [string, string][] = [
  ["Role", "Software Engineer"],
  ["Team", "Payments Data Platform, HSBC"],
  ["Location", "Pune, India"],
  ["Experience", "2+ years (2.5+ incl. internships)"],
  ["Focus", "GCP data · platform · reliability"],
];

function PageContent() {
  useEffect(() => {
    console.log(
      "%c hello, recruiter %c",
      "background:#146c5b;color:#f5f2ea;font-weight:600;padding:3px 6px;border-radius:4px;",
      "",
    );
    console.table({
      Name: "Kulmeet Singh",
      Role: "Software Engineer · GCP data & platform engineering",
      Status: "Open to new opportunities",
      Contact: EMAIL_ADDRESS,
    });
  }, []);

  return (
    <main className="min-h-screen relative">
      <Toaster />

      <section id="home" className="mx-auto max-w-6xl px-4 md:px-8 pt-10 md:pt-16 pb-16 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="md:col-span-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent mb-6">
              Software Engineer · GCP data &amp; platform · Reliability
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink leading-[0.98] mb-6">
              Kulmeet Singh
            </h1>

            <p className="font-display text-2xl md:text-3xl text-ink/80 leading-snug mb-6 max-w-xl">
              I build payment-data pipelines and the cloud platform around them on{" "}
              <span className="italic text-accent">Google Cloud</span>.
            </p>

            <p className="max-w-2xl text-muted text-base md:text-lg leading-relaxed mb-8">
              Software Engineer on HSBC&apos;s Payments Data Platform team in Pune (2+ years).
              I build Apache Beam/Dataflow pipelines handling 10M+ daily payment transactions,
              manage GCP infrastructure with Terraform, and configure Cloud Monitoring alerting.
              In personal projects I go deeper into reliability: SLOs with burn-rate alerts,
              metric-driven canary rollbacks, and Terraform drift detection.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink/85 transition-colors"
              >
                See projects <ArrowDown size={16} />
              </a>
              <a
                href="/Kulmeet_Singh_Jaggi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink hover:bg-card2 transition-colors"
              >
                <FileText size={16} /> View résumé
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <li>
                <a href="https://github.com/KulmeetSJ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors">
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kulmeet-singh/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors">
                  <Mail size={16} /> Email
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Photo + spec sheet */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-5"
          >
            <figure className="rounded-card border border-line bg-card p-2.5">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] overflow-hidden rounded-md bg-card2">
                <Image
                  src="/kulmeet.jpeg"
                  alt="Kulmeet Singh"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <dl className="mt-3 divide-y divide-line border-t border-line text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 px-1.5 py-2">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-faint shrink-0">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-1.5 pt-2.5 pb-1">
                  <span className="h-2 w-2 rounded-full bg-ok" aria-hidden />
                  <span className="text-xs text-muted">Open to GCP data, platform and reliability roles in India</span>
                </div>
              </dl>
            </figure>
          </motion.aside>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4">
          <CertificationsCard />
          <EngineeringSnapshot />
        </div>
      </section>

      <div className="[&>section]:border-t [&>section]:border-line">
        <Experience />
        <Impact />
        <Projects />
        <Architecture />
        <EngineeringDecisions />
        <CICDVisualizer />
        <TerraformPlayground />
        <MessageConsole />
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 md:px-8 py-8 flex flex-col sm:flex-row gap-2 justify-between text-xs text-faint font-mono">
          <span>© {new Date().getFullYear()} Kulmeet Singh · Pune, India</span>
          <span>Personal-project numbers are benchmarks, not production results.</span>
        </div>
      </footer>

      <AiChatbot />
      <CommandPalette />
    </main>
  );
}

export default function Home() {
  return <PageContent />;
}
