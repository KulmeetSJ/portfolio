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
  ShieldCheck,
  Sparkles,
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
  reviewTime: "45–60 min",
  confidence: "Low",
  outcome: "Manual review bottlenecks",
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
  reviewTime: "2–5 min",
  confidence: "High",
  outcome: "Faster and safer approvals",
  strokeColor: "#38bdf8",
  gradientId: "colorOptimized",
};

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
      <div className="rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-md p-3 shadow-xl">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono mb-1">
          {label}
        </p>
        <p className="text-slate-100 font-display font-bold text-lg">
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
      className="py-24 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-5 tracking-tight">
              <span className="text-blue-400 font-display font-black text-2xl">
                05.
              </span>{" "}
              Measuring Impact
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              A comparison between{" "}
              <span className="text-red-400">raw Terraform plan review</span> and
              the{" "}
              <span className="text-blue-400">
                summarized CI/CD change intelligence workflow
              </span>{" "}
              I built to reduce review time, improve deployment confidence, and
              catch compliance issues earlier.
            </p>
          </div>

          {/* Toggle */}
          <div className="inline-flex items-center rounded-2xl border border-white/5 bg-slate-900/80 p-1.5 shadow-inner">
            <button
              onClick={() => setMode("standard")}
              className={`relative px-5 md:px-6 py-3 rounded-xl text-sm font-mono font-bold transition-colors ${isStandard
                  ? "text-red-50"
                  : "text-slate-500 hover:text-slate-300"
                }`}
            >
              {isStandard && (
                <motion.div
                  layoutId="impact-toggle"
                  className="absolute inset-0 rounded-xl bg-red-500 shadow-[0_0_24px_rgba(239,68,68,0.35)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <AlertTriangle size={14} />
                Standard Review
              </span>
            </button>

            <button
              onClick={() => setMode("optimized")}
              className={`relative px-5 md:px-6 py-3 rounded-xl text-sm font-mono font-bold transition-colors ${!isStandard
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-300"
                }`}
            >
              {!isStandard && (
                <motion.div
                  layoutId="impact-toggle"
                  className="absolute inset-0 rounded-xl bg-blue-400 shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={14} />
                Optimized Review
              </span>
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SpotlightCard className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${isStandard
                    ? "bg-red-500/10 text-red-400"
                    : "bg-blue-500/10 text-blue-400"
                  }`}
              >
                <Activity size={18} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono">
                Review Time
              </p>
            </div>
            <div className="text-2xl font-display font-bold text-slate-100 tracking-tight">
              {currentData.reviewTime}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${isStandard
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-violet-500/10 text-violet-400"
                  }`}
              >
                <TrendingUp size={18} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono">
                Deployment Confidence
              </p>
            </div>
            <div className="text-2xl font-display font-bold text-slate-100 tracking-tight">
              {currentData.confidence}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-lg ${isStandard
                    ? "bg-slate-700/70 text-slate-300"
                    : "bg-emerald-500/10 text-emerald-400"
                  }`}
              >
                <Sparkles size={18} />
              </div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono">
                Outcome
              </p>
            </div>
            <div className="text-2xl font-display font-bold text-slate-100 tracking-tight">
              {currentData.outcome}
            </div>
          </SpotlightCard>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Debugging Time */}
          <SpotlightCard
            className="xl:col-span-4 p-6 md:p-7 flex flex-col"
            spotlightColor={
              isStandard ? "rgba(239,68,68,0.10)" : "rgba(59,130,246,0.10)"
            }
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl ${isStandard
                      ? "bg-red-500/10 text-red-400"
                      : "bg-blue-500/10 text-blue-400"
                    }`}
                >
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-100 tracking-tight">
                    Debugging Time
                  </h3>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                    Change visibility
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] px-2.5 py-1 rounded-full border font-mono uppercase tracking-widest ${isStandard
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  }`}
              >
                {isStandard ? "Manual" : "Summarized"}
              </span>
            </div>

            <div className="h-[220px] w-full">
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
                    unit="m"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="minutes"
                    fill={isStandard ? "#ef4444" : "#38bdf8"}
                    radius={[6, 6, 0, 0]}
                    barSize={42}
                    animationDuration={900}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              {isStandard
                ? "Engineers had to manually inspect large Terraform plans to find meaningful infrastructure changes, which slowed down review and increased cognitive load."
                : "The summarizer highlights meaningful changes directly inside pipeline logs, cutting review effort from nearly an hour to just a few minutes."}
            </p>
          </SpotlightCard>

          {/* Efficiency */}
          <SpotlightCard
            className="xl:col-span-5 p-6 md:p-7 flex flex-col"
            spotlightColor={
              isStandard ? "rgba(239,68,68,0.10)" : "rgba(168,85,247,0.10)"
            }
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`p-3 rounded-xl ${isStandard
                    ? "bg-red-500/10 text-red-400"
                    : "bg-violet-500/10 text-violet-400"
                  }`}
              >
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-100 tracking-tight">
                  Deployment Efficiency
                </h3>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  Workflow acceleration
                </p>
              </div>
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.efficiency}>
                  <defs>
                    <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
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
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke={isStandard ? "#ef4444" : "#a78bfa"}
                    fill={`url(#${currentData.gradientId})`}
                    strokeWidth={3}
                    animationDuration={1300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              {isStandard
                ? "Without structured change summaries, deployment reviews depended heavily on manual inspection, making approvals slower and more error-prone."
                : "Automated validation and summarized outputs improved review clarity across each stage, helping engineers move faster with better confidence."}
            </p>
          </SpotlightCard>

          {/* Compliance Ring */}
          <SpotlightCard
            className="xl:col-span-3 p-6 md:p-7 flex flex-col"
            spotlightColor={
              isStandard ? "rgba(239,68,68,0.10)" : "rgba(34,197,94,0.10)"
            }
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`p-3 rounded-xl ${isStandard
                    ? "bg-red-500/10 text-red-400"
                    : "bg-emerald-500/10 text-emerald-400"
                  }`}
              >
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-slate-100 tracking-tight">
                  Compliance Safety
                </h3>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  IAM guardrails
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center h-[220px]">
              <div className="relative">
                <svg className="w-44 h-44 -rotate-90">
                  <circle
                    strokeWidth="8"
                    stroke="rgba(51,65,85,0.55)"
                    fill="transparent"
                    r="80"
                    cx="88"
                    cy="88"
                  />
                  <motion.circle
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke={isStandard ? "#ef4444" : "#22c55e"}
                    fill="transparent"
                    r="80"
                    cx="88"
                    cy="88"
                    initial={{ strokeDasharray: 503, strokeDashoffset: 503 }}
                    animate={{
                      strokeDashoffset:
                        503 - (503 * currentData.compliance) / 100,
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-4xl font-display font-black tracking-tighter ${isStandard ? "text-red-400" : "text-white"
                      }`}
                  >
                    {currentData.compliance}%
                  </span>
                  <span
                    className={`mt-2 text-[10px] uppercase tracking-[0.2em] font-mono ${isStandard ? "text-red-400" : "text-emerald-400"
                      }`}
                  >
                    {isStandard ? "Manual" : "Automated"}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              {isStandard
                ? "Manual plan review could miss risky IAM changes, leaving room for unauthorized role assignments or policy mistakes."
                : "The compliance checker shifts validation earlier in the pipeline and blocks unsafe IAM assignments before deployment approval."}
            </p>
          </SpotlightCard>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-slate-900/50 px-5 py-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={18} className="text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-400 leading-relaxed">
              This section demonstrates not just implementation, but measurable
              engineering value: faster review cycles, improved deployment
              confidence, and safer infrastructure changes through earlier policy
              enforcement.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}