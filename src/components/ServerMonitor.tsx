"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, FolderKanban, Award } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function ServerMonitor() {
  const [location, setLocation] = useState("Detecting...");
  const [status, setStatus] = useState("Initializing");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();

        setLocation(data.location);
        setStatus(data.status);
      } catch (e) {
        setStatus("Offline");
      }
    };

    checkHealth();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Metric 1: System Status */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        className="col-span-1 md:col-span-6 lg:col-span-3 h-full"
      >
        <SpotlightCard className="p-6 h-full flex flex-col justify-center">
          <div
            className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-3"
            id="server-monitor"
          >
            <Activity size={14} className="text-blue-400" />
            System Status
          </div>
          <div className="text-blue-400 font-display font-bold text-xl md:text-2xl flex items-center gap-2 tracking-tight">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "operational" ? "bg-blue-400" : "bg-amber-400"
                  }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${status === "operational" ? "bg-blue-500" : "bg-amber-500"
                  }`}
              ></span>
            </span>
            {status === "operational" ? "Operational" : status}
          </div>
        </SpotlightCard>
      </motion.div>

      {/* Metric 2: Connected From */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        className="col-span-1 md:col-span-6 lg:col-span-3 h-full"
      >
        <SpotlightCard className="p-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-3">
            <Globe size={14} className="text-purple-400" />
            Connected From
          </div>
          <div className="text-slate-200 font-display font-bold text-xl md:text-2xl tracking-tight truncate">
            {location}
          </div>
        </SpotlightCard>
      </motion.div>

      {/* Metric 3: Projects Shipped */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="col-span-1 md:col-span-6 lg:col-span-3 h-full"
      >
        <SpotlightCard className="p-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-3">
            <FolderKanban size={14} className="text-cyan-400" />
            Projects Shipped
          </div>
          <div className="text-slate-200 font-display font-bold text-2xl md:text-3xl tracking-tighter">
            8+
          </div>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Across full-stack apps, cloud automation, and data engineering work.
          </p>
        </SpotlightCard>
      </motion.div>

      {/* Metric 4: Certifications Earned */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
        className="col-span-1 md:col-span-6 lg:col-span-3 h-full"
      >
        <SpotlightCard className="p-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-3">
            <Award size={14} className="text-amber-400" />
            Certifications
          </div>
          <div className="text-slate-200 font-display font-bold text-2xl md:text-3xl tracking-tighter">
            10+
          </div>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Covering cloud, development, problem solving, and technical learning.
          </p>
        </SpotlightCard>
      </motion.div>
    </>
  );
}