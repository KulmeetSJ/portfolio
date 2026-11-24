"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { EMAIL_ADDRESS } from "@/constants/consts";

import Toaster from "@/components/Toaster";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SpotlightCard from "@/components/SpotlightCard";
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

function PageContent() {
  useEffect(() => {
    console.log(
      "%c HELLO RECRUITER %c",
      "background: #2dd4bf; color: #020617; font-weight: bold; padding: 4px; border-radius: 4px;",
      "color: #2dd4bf; font-family: monospace;",
    );
    console.table({
      Name: "Kulmeet Singh",
      Role: "Software Engineer · GCP data & platform engineering",
      Status: "Open to new opportunities",
      Contact: EMAIL_ADDRESS,
    });
  }, []);

  return (
    <main className="min-h-screen selection:bg-blue-500/30 selection:text-blue-200 relative">
      <Toaster />

      <div className="relative z-10">
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-4 md:px-12 max-w-7xl mx-auto pt-32 md:pt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full">
            {/* INTRO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-8"
            >
              <SpotlightCard className="p-6 sm:p-8 md:p-12 h-full flex flex-col justify-center">
                <span className="text-blue-400 font-mono text-xs sm:text-sm tracking-wider uppercase mb-4 block">
                  Software Engineer · GCP Data &amp; Platform · Reliability
                </span>

                <h1 className="text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-slate-50 mb-4 tracking-tighter drop-shadow-sm leading-none">
                  Kulmeet Singh.
                </h1>

                <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-300 mb-6 drop-shadow-sm">
                  I build payment-data pipelines and the cloud platform around them on Google Cloud.
                </h2>

                <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed mb-6">
                  Software Engineer on HSBC&apos;s Payments Data Platform team in Pune (2+ years).
                  I build Apache Beam/Dataflow pipelines handling 10M+ daily payment transactions,
                  manage GCP infrastructure with Terraform, and configure Cloud Monitoring alerting.
                  In personal projects I go deeper into reliability: SLOs with burn-rate alerts,
                  metric-driven canary rollbacks, and Terraform drift detection.
                </p>

                <a
                  href="https://www.credly.com/badges/498cdb19-b30a-45d1-9221-7d44ff636c66/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-10 inline-flex w-fit max-w-full items-center gap-3 rounded-xl border border-blue-400/25 bg-blue-500/10 px-3 py-2 hover:border-blue-400/50 transition-colors"
                >
                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md bg-white/95">
                    <Image src="/google-cloud.png" alt="Google Cloud" fill className="object-contain p-1" />
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                    Google Cloud Certified{" "}
                    <span className="font-semibold text-white">Professional Cloud Architect</span>
                  </span>
                </a>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.a
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    href="#projects"
                    className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors font-mono text-sm backdrop-blur-sm shadow-xl"
                  >
                    Explore Projects
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    href="/Kulmeet_Singh_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-500 text-slate-950 font-bold rounded-lg hover:bg-blue-400 transition-colors font-mono flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                  >
                    <FileText size={18} /> View Resume
                  </motion.a>
                </div>

                <div className="flex items-center gap-6 text-slate-500">
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href="https://github.com/KulmeetSJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href="https://www.linkedin.com/in/kulmeet-singh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href={`mailto:${EMAIL_ADDRESS}`}
                    aria-label="Email"
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Mail size={24} />
                  </motion.a>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* PROFILE IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 md:col-span-4 min-h-[300px] md:min-h-full"
            >
              <SpotlightCard className="w-full h-full p-0 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none" />
                <Image
                  src="/kulmeet.jpeg"
                  alt="Kulmeet Singh"
                  fill
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 scale-100 group-hover:scale-105"
                  priority
                />
              </SpotlightCard>
            </motion.div>

            <EngineeringSnapshot />
            <CertificationsCard />

          </div>
        </section>

        <div className="flex flex-col gap-28 pb-32 mt-32">
          <Experience />
          <Impact />
          <Projects />
          <Architecture />
          <EngineeringDecisions />
          <CICDVisualizer />
          <TerraformPlayground />
          <MessageConsole />
          <AiChatbot />
        </div>
      </div>

      <CommandPalette />
    </main>
  );
}

export default function Home() {
  return <PageContent />;
}
