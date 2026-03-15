"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { EMAIL_ADDRESS } from "@/constants/consts";

// Infrastructure
import { SystemProvider } from "@/components/SystemContext";
import Toaster from "@/components/Toaster";

// Standard Imports
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ServerMonitor from "@/components/ServerMonitor";
import SpotlightCard from "@/components/SpotlightCard";
import CertificationsCard from "@/components/CertificationsCard";
// import EngineeringDecisions from "@/components/EngineeringDecisions";
import Impact from "@/components/Impact";
import Architecture from "@/components/Architecture";

// --- CHANGED: Import TerminalContact instead of Contact ---
import TerminalContact from "@/components/TerminalContact";

// Dynamic Imports
const CICDVisualizer = dynamic(
  () => import("@/components/CICDVisualizer"),
  { ssr: false },
);
const TerraformPlayground = dynamic(() => import("@/components/TerraformPlayground"), {
  ssr: false
});
const PerformanceEngineering = dynamic(() => import("@/components/PerformanceEngineering"), {
  ssr: false
});
const IngestionDemo = dynamic(() => import("@/components/IngestionDemo"), {
  ssr: false
});
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false
});
const AiChatbot = dynamic(() => import("@/components/AiChatbot"), {
  ssr: false
});
const EngineeringDecisions = dynamic(() => import("@/components/EngineeringDecisions"), {
  ssr: false
});

function PageContent() {
  useEffect(() => {
    console.log(
      "%c HELLO RECRUITER %c",
      "background: #2dd4bf; color: #020617; font-weight: bold; padding: 4px; border-radius: 4px;",
      "color: #2dd4bf; font-family: monospace;",
    );
    console.table({
      Name: "Kulmeet Singh",
      Specialty: "Cloud & Data Engineer",
      Status: "Open to new opportunities",
      Contact: EMAIL_ADDRESS,
    });
  }, []);

  return (
    <main className="min-h-screen selection:bg-teal-500/30 selection:text-teal-200 relative">
      <Toaster />

      <div className="relative z-10">
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-4 md:px-12 max-w-7xl mx-auto pt-32 md:pt-20 "
        >
          {/* THE BENTO BOX GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full">
            {/* BLOCK 1: INTRO (Spans 8 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-8 lg:col-span-8"
            >
              <SpotlightCard className="p-8 md:p-12 h-full flex flex-col justify-center">
                <span className="text-teal-400 font-mono text-sm tracking-wider uppercase mb-4 block">
                  System Status: Online
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-slate-50 mb-4 tracking-tighter drop-shadow-sm leading-none">
                  Kulmeet Singh.
                </h1>
                <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-300 mb-6 drop-shadow-sm">
                  I build safe, scalable platform systems and infrastructure automation.
                </h2>
                <p className="max-w-xl text-slate-400 text-lg leading-relaxed mb-10">
                  Software Engineer focused on cloud infrastructure, deployment automation, and high-performance data systems.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.a
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    href="#projects"
                    className="px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors font-mono text-sm backdrop-blur-sm shadow-xl"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    href="/Kulmeet_Singh_Resume.pdf"
                    target="_blank"
                    className="px-6 py-3 bg-teal-500 text-slate-950 font-bold rounded-lg hover:bg-teal-400 transition-colors font-mono flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)]"
                  >
                    <FileText size={18} /> Initialize Resume
                  </motion.a>
                </div>

                <div className="flex items-center gap-6 text-slate-500">
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href="https://github.com/KulmeetSJ"
                    target="_blank"
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href="https://www.linkedin.com/in/kulmeet-singh/"
                    target="_blank"
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -3, scale: 1.1 }}
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="hover:text-slate-300 transition-colors"
                  >
                    <Mail size={24} />
                  </motion.a>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* BLOCK 2: PROFILE PICTURE (Spans 4 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 md:col-span-4 lg:col-span-4 min-h-[300px] md:min-h-full"
            >
              <SpotlightCard className="w-full h-full p-0 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <Image
                  src="/kulmeet.jpeg"
                  alt="Kulmeet Singh"
                  fill
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 scale-100 group-hover:scale-105"
                  priority
                />
              </SpotlightCard>
            </motion.div>

            {/* BLOCK 3: SERVER METRICS (4 Mini Cards integrated into grid) */}
            <ServerMonitor />
            {/* BLOCK 4: CERTIFICATIONS (4 Mini Cards integrated into grid) */}
            <CertificationsCard />
          </div>
        </section>

        <div className="flex flex-col gap-28 pb-32 mt-32">
          <Experience />
          <Projects />
          <Architecture />
          <Impact />
          <TerraformPlayground />
          <EngineeringDecisions />
          <PerformanceEngineering />
          <CICDVisualizer />
          <IngestionDemo />
          <TerminalContact />
          <AiChatbot />
        </div>
      </div>

      <CommandPalette />
    </main>
  );
}

export default function Home() {
  return (
    <SystemProvider>
      <PageContent />
    </SystemProvider>
  );
}
