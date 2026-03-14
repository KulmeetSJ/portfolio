"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GitBranch,
    Play,
    RotateCcw,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    Package,
    Rocket,
    Activity,
    TerminalSquare,
    CircleDot,
    AlertTriangle,
    Undo2,
    ServerCog,
} from "lucide-react";
import SpotlightCard from "./SpotlightCard";

type StepStatus = "idle" | "running" | "done" | "failed";
type EnvType = "dev" | "qa" | "prod";

interface PipelineStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

const baseSteps: PipelineStep[] = [
    {
        id: "trigger",
        title: "Trigger Release",
        description: "Pipeline starts from release branch commit",
        icon: GitBranch,
    },
    {
        id: "deps",
        title: "Resolve Dependencies",
        description: "Validate package graph and lock versions",
        icon: Package,
    },
    {
        id: "checks",
        title: "Validation Checks",
        description: "Run lint, policy, and quality gates",
        icon: ShieldCheck,
    },
    {
        id: "artifact",
        title: "Build Artifact",
        description: "Prepare deployment package for rollout",
        icon: Package,
    },
    {
        id: "deploy",
        title: "Deploy to Composer",
        description: "Release package to target environment",
        icon: Rocket,
    },
    {
        id: "verify",
        title: "Smoke Verification",
        description: "Confirm deployment health and readiness",
        icon: Activity,
    },
];

const rollbackStep: PipelineStep = {
    id: "rollback",
    title: "Rollback Release",
    description: "Restore previous healthy deployment revision",
    icon: Undo2,
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ComposerPipelineVisualizer() {
    const [environment, setEnvironment] = useState<EnvType>("prod");
    const [stepIndex, setStepIndex] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
    const [rolledBack, setRolledBack] = useState(false);
    const [activeRollback, setActiveRollback] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [forceFailure, setForceFailure] = useState(false);

    const [metrics, setMetrics] = useState({
        checks: 0,
        artifact: "pending",
        env: "composer-prod",
        status: "idle",
        duration: "--",
        release: "#2419",
    });

    const appendLogs = async (lines: string[], delay = 260) => {
        for (const line of lines) {
            setLogs((prev) => [...prev, line]);
            await wait(delay);
        }
    };

    const resetPipeline = () => {
        setStepIndex(-1);
        setIsRunning(false);
        setCompleted(false);
        setFailed(false);
        setRolledBack(false);
        setActiveRollback(false);
        setLogs([]);
        setMetrics({
            checks: 0,
            artifact: "pending",
            env: `composer-${environment}`,
            status: "idle",
            duration: "--",
            release: "#2419",
        });
    };

    const runPipeline = async () => {
        if (isRunning) return;

        const releaseId = `#${Math.floor(2000 + Math.random() * 900)}`;
        const startTime = performance.now();
        const shouldFail =
            forceFailure || (environment === "prod" && Math.random() < 0.35);

        setIsRunning(true);
        setCompleted(false);
        setFailed(false);
        setRolledBack(false);
        setActiveRollback(false);
        setStepIndex(-1);
        setLogs([]);
        setMetrics({
            checks: 0,
            artifact: "pending",
            env: `composer-${environment}`,
            status: "initializing",
            duration: "--",
            release: releaseId,
        });

        await appendLogs(
            [
                `[git] release/composer-v2 detected`,
                `[pipeline] ${releaseId} queued for composer-${environment}`,
            ],
            280,
        );

        for (let i = 0; i < baseSteps.length; i++) {
            const step = baseSteps[i];
            setStepIndex(i);

            if (step.id === "trigger") {
                setMetrics((prev) => ({ ...prev, status: "triggered" }));
                await appendLogs(
                    [
                        `[trigger] release workflow started`,
                        `[trigger] target environment: composer-${environment}`,
                    ],
                    260,
                );
            }

            if (step.id === "deps") {
                setMetrics((prev) => ({ ...prev, status: "resolving dependencies" }));
                await appendLogs(
                    [
                        `[composer] validating dependency tree`,
                        `[composer] lockfile integrity verified`,
                    ],
                    260,
                );
            }

            if (step.id === "checks") {
                setMetrics((prev) => ({ ...prev, checks: 3, status: "validating" }));
                await appendLogs(
                    [
                        `[lint] code style checks passed`,
                        `[policy] deployment guardrails satisfied`,
                        `[quality] static validation completed`,
                    ],
                    260,
                );
            }

            if (step.id === "artifact") {
                setMetrics((prev) => ({ ...prev, artifact: "building", status: "building artifact" }));
                await appendLogs(
                    [
                        `[build] packaging deployment artifact`,
                        `[build] artifact composer-release-${releaseId.replace("#", "")} generated`,
                    ],
                    280,
                );
                setMetrics((prev) => ({ ...prev, artifact: "ready" }));
            }

            if (step.id === "deploy") {
                setMetrics((prev) => ({ ...prev, status: "deploying" }));
                await appendLogs(
                    [
                        `[deploy] pushing artifact to composer-${environment}`,
                        `[deploy] rollout started acro  fss target services`,
                    ],
                    280,
                );
            }

            if (step.id === "verify") {
                setMetrics((prev) => ({ ...prev, status: "verifying" }));
                await appendLogs(
                    [`[smoke] probing composer-${environment} health endpoints`],
                    300,
                );

                if (shouldFail) {
                    setFailed(true);
                    setIsRunning(false);
                    setMetrics((prev) => ({ ...prev, status: "failed" }));
                    await appendLogs(
                        [
                            `[verify] elevated error rate detected`,
                            `[alert] smoke verification failed on composer-${environment}`,
                        ],
                        320,
                    );

                    if (environment === "prod") {
                        setActiveRollback(true);
                        await wait(400);
                        await appendLogs(
                            [
                                `[rollback] initiating automatic rollback`,
                                `[rollback] restoring previous healthy revision`,
                                `[rollback] traffic shifted back successfully`,
                            ],
                            320,
                        );
                        setRolledBack(true);
                        setMetrics((prev) => ({ ...prev, status: "rolled back" }));
                        setActiveRollback(false);
                    }

                    const totalDuration = `${((performance.now() - startTime) / 1000).toFixed(1)}s`;
                    setMetrics((prev) => ({ ...prev, duration: totalDuration }));
                    return;
                }

                await appendLogs(
                    [
                        `[smoke] health probes responding`,
                        `[verify] deployment marked healthy`,
                    ],
                    280,
                );
            }
        }

        const totalDuration = `${((performance.now() - startTime) / 1000).toFixed(1)}s`;
        setMetrics((prev) => ({
            ...prev,
            status: "healthy",
            duration: totalDuration,
            artifact: "ready",
        }));
        setCompleted(true);
        setIsRunning(false);
    };

    const stepsWithState = useMemo(() => {
        const items = [...baseSteps];

        if (failed && rolledBack) {
            items.push(rollbackStep);
        }

        return items.map((step, index) => {
            let status: StepStatus = "idle";

            if (index < stepIndex) status = "done";
            if (index === stepIndex && isRunning) status = "running";
            if (completed && index <= stepIndex) status = "done";

            if (failed && step.id === "verify") status = "failed";
            if (failed && rolledBack && step.id === "rollback") status = "done";
            if (activeRollback && step.id === "rollback") status = "running";

            return { ...step, status };
        });
    }, [stepIndex, isRunning, completed, failed, rolledBack, activeRollback]);

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="cicd">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
                    <span className="text-teal-400 font-black text-2xl">09.</span>
                    Composer CI/CD Visualizer
                </h2>

                <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
                    I built CI/CD automation for Composer deployments with validation gates,
                    staged execution, environment-aware rollouts, and safer recovery flows.
                    This visualizer simulates how a release moves from build to verification,
                    including failure handling and rollback.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <SpotlightCard className="xl:col-span-7 p-6 md:p-8">
                    <div className="flex flex-col gap-5 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-[0.2em] mb-2">
                                    <TerminalSquare size={14} className="text-teal-400" />
                                    Pipeline Stages
                                </div>
                                <h3 className="text-slate-100 text-xl md:text-2xl font-bold">
                                    Release Orchestration Flow
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={runPipeline}
                                    disabled={isRunning}
                                    className="px-4 py-2 rounded-lg bg-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                >
                                    {isRunning ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Play size={16} />
                                    )}
                                    {isRunning ? "Running" : "Run Pipeline"}
                                </button>

                                <button
                                    onClick={resetPipeline}
                                    disabled={isRunning}
                                    className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 font-bold text-sm flex items-center gap-2 hover:border-slate-500 disabled:opacity-50 transition-all"
                                >
                                    <RotateCcw size={16} />
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                            <div className="flex gap-2 flex-wrap">
                                {(["dev", "qa", "prod"] as EnvType[]).map((env) => (
                                    <button
                                        key={env}
                                        onClick={() => {
                                            if (isRunning) return;
                                            setEnvironment(env);
                                            setMetrics((prev) => ({ ...prev, env: `composer-${env}` }));
                                        }}
                                        disabled={isRunning}
                                        className={`px-3 py-2 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all ${environment === env
                                            ? "bg-teal-500 text-slate-950 border-teal-400"
                                            : "border-slate-700 text-slate-300 hover:border-teal-400"
                                            } disabled:opacity-50`}
                                    >
                                        {env}
                                    </button>
                                ))}
                            </div>

                            <label className="flex items-center gap-3 text-sm text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={forceFailure}
                                    onChange={(e) => setForceFailure(e.target.checked)}
                                    disabled={isRunning}
                                    className="accent-teal-500"
                                />
                                Force failure simulation
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {stepsWithState.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    layout
                                    key={step.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`rounded-2xl border p-4 md:p-5 transition-all ${step.status === "running"
                                        ? "border-teal-500/40 bg-teal-500/10 shadow-[0_0_25px_rgba(45,212,191,0.08)]"
                                        : step.status === "done"
                                            ? "border-emerald-500/20 bg-emerald-500/5"
                                            : step.status === "failed"
                                                ? "border-red-500/30 bg-red-500/10"
                                                : "border-slate-800 bg-slate-900/50"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`mt-0.5 p-2.5 rounded-xl border ${step.status === "running"
                                                ? "border-teal-500/30 bg-teal-500/10 text-teal-400"
                                                : step.status === "done"
                                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                    : step.status === "failed"
                                                        ? "border-red-500/20 bg-red-500/10 text-red-400"
                                                        : "border-slate-700 bg-slate-800 text-slate-500"
                                                }`}
                                        >
                                            {step.status === "running" ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : step.status === "done" ? (
                                                <CheckCircle2 size={18} />
                                            ) : step.status === "failed" ? (
                                                <AlertTriangle size={18} />
                                            ) : (
                                                <Icon size={18} />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <h4 className="text-slate-100 font-semibold text-base md:text-lg">
                                                    {step.title}
                                                </h4>

                                                <span
                                                    className={`text-[10px] px-2.5 py-1 rounded-full font-mono uppercase tracking-wider w-fit ${step.status === "running"
                                                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                                                        : step.status === "done"
                                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                            : step.status === "failed"
                                                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                                                : "bg-slate-800 text-slate-500 border border-slate-700"
                                                        }`}
                                                >
                                                    {step.status === "idle"
                                                        ? "Pending"
                                                        : step.status === "running"
                                                            ? "Running"
                                                            : step.status === "failed"
                                                                ? "Failed"
                                                                : "Complete"}
                                                </span>
                                            </div>

                                            <p className="text-slate-400 text-sm md:text-[15px] mt-2 leading-relaxed">
                                                {step.description}
                                            </p>

                                            {index < stepsWithState.length - 1 && (
                                                <div className="h-6 flex items-center pl-1 mt-2">
                                                    <div className="w-px h-full bg-slate-800" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </SpotlightCard>

                <div className="xl:col-span-5 space-y-6">
                    <SpotlightCard className="p-6">
                        <div className="flex items-center justify-between mb-6 gap-4">
                            <div>
                                <div className="text-slate-400 text-xs font-mono uppercase tracking-[0.2em] mb-2">
                                    Deployment Summary
                                </div>
                                <h3 className="text-slate-100 text-xl font-bold">
                                    Release Snapshot
                                </h3>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono uppercase">
                                <CircleDot
                                    size={12}
                                    className={
                                        completed
                                            ? "text-emerald-400"
                                            : failed
                                                ? "text-red-400"
                                                : isRunning
                                                    ? "text-teal-400 animate-pulse"
                                                    : rolledBack
                                                        ? "text-amber-400"
                                                        : "text-slate-500"
                                    }
                                />
                                <span
                                    className={
                                        completed
                                            ? "text-emerald-400"
                                            : failed
                                                ? "text-red-400"
                                                : isRunning
                                                    ? "text-teal-400"
                                                    : rolledBack
                                                        ? "text-amber-400"
                                                        : "text-slate-500"
                                    }
                                >
                                    {completed
                                        ? "Healthy"
                                        : failed
                                            ? "Failed"
                                            : isRunning
                                                ? "In Progress"
                                                : rolledBack
                                                    ? "Rolled Back"
                                                    : "Idle"}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Branch
                                </div>
                                <div className="text-slate-200 font-semibold text-sm md:text-base">
                                    release/composer-v2
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Build ID
                                </div>
                                <div className="text-slate-200 font-semibold text-sm md:text-base">
                                    {metrics.release}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Checks Passed
                                </div>
                                <div className="text-emerald-400 font-semibold text-sm md:text-base">
                                    {metrics.checks}/3
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Artifact
                                </div>
                                <div className="text-slate-200 font-semibold text-sm md:text-base capitalize">
                                    {metrics.artifact}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Environment
                                </div>
                                <div className="text-teal-400 font-semibold text-sm md:text-base">
                                    {metrics.env}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Duration
                                </div>
                                <div className="text-slate-200 font-semibold text-sm md:text-base">
                                    {metrics.duration}
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 col-span-2">
                                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-2">
                                    Pipeline Status
                                </div>
                                <div
                                    className={`font-semibold text-sm md:text-base capitalize ${metrics.status === "healthy"
                                        ? "text-emerald-400"
                                        : metrics.status === "failed"
                                            ? "text-red-400"
                                            : metrics.status === "rolled back"
                                                ? "text-amber-400"
                                                : metrics.status === "idle"
                                                    ? "text-slate-400"
                                                    : "text-yellow-400"
                                        }`}
                                >
                                    {metrics.status}
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard
                        className="p-6"
                        spotlightColor="rgba(45, 212, 191, 0.12)"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <TerminalSquare size={16} className="text-teal-400" />
                            <h3 className="text-slate-100 font-bold text-lg">Execution Log</h3>
                        </div>

                        <div className="bg-black rounded-xl border border-slate-800 p-4 min-h-[320px] max-h-[320px] overflow-y-auto font-mono text-xs md:text-sm space-y-2">
                            <AnimatePresence initial={false}>
                                {logs.length > 0 ? (
                                    logs.map((line, idx) => (
                                        <motion.div
                                            key={`${idx}-${line}`}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={
                                                line.includes("[alert]") || line.includes("failed")
                                                    ? "text-red-400"
                                                    : line.includes("[rollback]")
                                                        ? "text-amber-400"
                                                        : "text-green-400"
                                            }
                                        >
                                            {line}
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 1 }}
                                        className="text-slate-500"
                                    >
                                        Run the pipeline to simulate release logs...
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <ServerCog size={16} className="text-purple-400" />
                            <h3 className="text-slate-100 font-bold text-lg">
                                Recovery Behavior
                            </h3>
                        </div>

                        <div className="space-y-3 text-sm leading-relaxed text-slate-400">
                            <p>
                                <span className="text-slate-200 font-semibold">dev</span> is ideal for
                                safe validation runs and smoke checks.
                            </p>
                            <p>
                                <span className="text-slate-200 font-semibold">qa</span> simulates a
                                pre-production verification path.
                            </p>
                            <p>
                                <span className="text-slate-200 font-semibold">prod</span> can trigger
                                automatic rollback when health verification fails.
                            </p>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}