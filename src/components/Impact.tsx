"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const STANDARD_LOGS = {
  debugTime: [
    { name: "Log Analysis", minutes: 60 },
    { name: "Critical Changes", minutes: 30 },
  ],
  efficiency: [
    { stage: "Plan Review", efficiency: 30 },
    { stage: "IAM Validation", efficiency: 40 },
    { stage: "Change Detection", efficiency: 35 },
    { stage: "Deployment Prep", efficiency: 45 },
  ],
  compliance: 70,
  labelColor: "text-red-500",
  strokeColor: "#ef4444",
  gradientId: "colorStandard",
};

const OPTIMIZED_LOGS = {
  debugTime: [
    { name: "Log Analysis", minutes: 5 },
    { name: "Critical Changes", minutes: 2 },
  ],
  efficiency: [
    { stage: "Plan Review", efficiency: 80 },
    { stage: "IAM Validation", efficiency: 90 },
    { stage: "Change Detection", efficiency: 92 },
    { stage: "Deployment Prep", efficiency: 95 },
  ],
  compliance: 100,
  labelColor: "text-teal-400",
  strokeColor: "#2dd4bf",
  gradientId: "colorOptimized",
};

// Tooltip Helpers
interface PayloadItem {
  value: number | string;
  [key: string]: unknown;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-slate-100 font-mono font-bold text-lg">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Impact() {
  const [mode, setMode] = useState<"standard" | "optimized">("optimized");
  const isStandard = mode === "standard";
  const currentData = isStandard ? STANDARD_LOGS : OPTIMIZED_LOGS;

  return (
    <section
      id="impact"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* SECTION HEADER & TOGGLE */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-4 flex items-center gap-4 tracking-tight">
              <span className="text-teal-400 font-display font-black text-2xl">
                05.
              </span>
              Measuring Impact
            </h2>
            <p className="text-slate-400 max-w-xl text-lg">
              Compare the review experience of
              <span className="text-red-400"> raw Terraform plan output</span> versus my
              <span className="text-teal-400">summarized CI/CD change intelligence pipeline</span>.
            </p>
          </div>

          {/* THE TOGGLE SWITCH */}
          <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex items-center shadow-inner">
            <button
              onClick={() => setMode("standard")}
              className={`relative px-6 py-2.5 rounded-lg text-sm font-bold font-mono transition-colors z-10 ${isStandard
                ? "text-red-100"
                : "text-slate-500 hover:text-slate-300"
                }`}
            >
              {isStandard && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-600 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <AlertTriangle size={14} /> Standard Logs
              </span>
            </button>

            <button
              onClick={() => setMode("optimized")}
              className={`relative px-6 py-2.5 rounded-lg text-sm font-bold font-mono transition-colors z-10 ${!isStandard
                ? "text-teal-950"
                : "text-slate-500 hover:text-slate-300"
                }`}
            >
              {!isStandard && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-teal-400 rounded-lg shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Zap size={14} /> Optimized Logs
              </span>
            </button>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CARD 1: LATENCY */}
          <SpotlightCard
            className="p-8 group flex flex-col h-full"
            spotlightColor={
              isStandard ? "rgba(239, 68, 68, 0.1)" : "rgba(45, 212, 191, 0.1)"
            }
          >
            <div className="flex items-center justify-between mb-6 relative z-20">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg transition-colors duration-500 ${isStandard ? "bg-red-500/10 text-red-500" : "bg-teal-400/10 text-teal-400"}`}
                >
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-display font-bold tracking-tight text-slate-100">
                  Debugging Time
                </h3>
              </div>
              <span
                className={`text-xs font-mono px-2 py-1 rounded border ${isStandard ? "border-red-500/30 text-red-400 bg-red-500/10" : "border-teal-500/30 text-teal-400 bg-teal-500/10"}`}
              >
                {isStandard ? "CRITICAL" : "HEALTHY"}
              </span>
            </div>

            <div className="h-[220px] w-full relative z-20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.debugTime}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    unit="min"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="minutes"
                    fill={isStandard ? "#ef4444" : "#2dd4bf"}
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-slate-400 text-sm relative z-20 flex-grow leading-relaxed">
              {isStandard
                ? "Terraform plan outputs were large and difficult to interpret, requiring engineers to manually scan logs to identify critical infrastructure changes."
                : "The log summarizer extracts key infrastructure changes such as IAM roles, Pub/Sub resources, and BigQuery updates, reducing debugging time from nearly an hour to just a few minutes."}
            </p>
          </SpotlightCard>

          {/* CARD 2: EFFICIENCY */}
          <SpotlightCard
            className="p-8 group flex flex-col h-full"
            spotlightColor={
              isStandard ? "rgba(239, 68, 68, 0.1)" : "rgba(168, 85, 247, 0.1)"
            }
          >
            <div className="flex items-center justify-between mb-6 relative z-20">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg transition-colors duration-500 ${isStandard ? "bg-red-500/10 text-red-500" : "bg-purple-500/10 text-purple-400"}`}
                >
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-display font-bold tracking-tight text-slate-100">
                  Deployment Efficiency
                </h3>
              </div>
            </div>

            <div className="h-[220px] w-full relative z-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.efficiency}>
                  <defs>
                    <linearGradient
                      id="colorStandard"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorOptimized"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#c084fc" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="stage"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    hide
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke={isStandard ? "#ef4444" : "#c084fc"}
                    fillOpacity={1}
                    fill={`url(#${currentData.gradientId})`}
                    strokeWidth={3}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-slate-400 text-sm relative z-20 flex-grow leading-relaxed">
              {isStandard
                ? "Engineers had to manually analyze Terraform plan outputs before deployments, slowing down the CI/CD workflow."
                : "Automated log summarization and validation allow engineers to quickly understand infrastructure changes, enabling faster and more confident deployments."}
            </p>
          </SpotlightCard>

          {/* CARD 3: CONSISTENCY RING */}
          <SpotlightCard
            className="p-8 flex flex-col h-full group"
            spotlightColor={
              isStandard ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"
            }
          >
            <div className="flex items-center justify-between mb-6 relative z-20">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-lg transition-colors duration-500 ${isStandard ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-400"}`}
                >
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-display font-bold tracking-tight text-slate-100">
                  Compliance Safety
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center h-[220px] relative z-20">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    className="text-slate-800/50"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="88"
                    cx="96"
                    cy="96"
                  />
                  <motion.circle
                    className={isStandard ? "text-red-500" : "text-blue-500"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="88"
                    cx="96"
                    cy="96"
                    initial={{ strokeDasharray: 553, strokeDashoffset: 553 }} // 2 * PI * 88 ~= 553
                    animate={{
                      strokeDashoffset:
                        553 - (553 * currentData.compliance) / 100,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                  <span
                    className={`text-5xl font-display font-black tracking-tighter drop-shadow-md transition-colors duration-500 ${isStandard ? "text-red-500" : "text-white"}`}
                  >
                    {currentData.compliance}%
                  </span>
                  <span
                    className={`text-[10px] font-bold font-mono uppercase tracking-widest mt-2 ${isStandard ? "text-red-400" : "text-blue-400"}`}
                  >
                    {isStandard ? "Manual Review" : "Automated"}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-slate-400 text-sm relative z-20 flex-grow leading-relaxed">
              {isStandard
                ? "Manual review of Terraform plans could miss IAM misconfigurations, potentially allowing restricted roles to be assigned incorrectly."
                : "The shift-left compliance checker validates IAM roles during the pipeline stage, preventing unauthorized role assignments before deployment."}
            </p>
          </SpotlightCard>
        </div>
      </motion.div>
    </section>
  );
}
