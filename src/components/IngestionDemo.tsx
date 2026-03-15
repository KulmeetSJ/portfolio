"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    ArrowRight,
    Activity,
    Play,
    RotateCcw,
    CircleAlert,
    CheckCircle2,
    Workflow,
    Radio,
    Blocks,
    Cpu,
    Table2,
} from "lucide-react";

type Mode = "healthy" | "degraded";

type StageId =
    | "source"
    | "cdc"
    | "kafka"
    | "processor"
    | "pubsub"
    | "subscriptions"
    | "dataflow"
    | "warehouse";

type Packet = {
    id: number;
    lane: number;
    mode: Mode;
};

type StageStat = {
    id: StageId;
    label: string;
    short: string;
    count: number;
    status: "idle" | "active" | "warning" | "success";
};

const INITIAL_STAGES: StageStat[] = [
    { id: "source", label: "Source DB", short: "DB", count: 0, status: "idle" },
    { id: "cdc", label: "CDC Stream", short: "CDC", count: 0, status: "idle" },
    { id: "kafka", label: "Event bus", short: "KAFKA", count: 0, status: "idle" },
    {
        id: "processor",
        label: "Processing Layer",
        short: "PROC",
        count: 0,
        status: "idle",
    },
    {
        id: "pubsub",
        label: "Message Topics",
        short: "PUBSUB",
        count: 0,
        status: "idle",
    },
    {
        id: "subscriptions",
        label: "Subscriptions",
        short: "SUBS",
        count: 0,
        status: "idle",
    },
    {
        id: "dataflow",
        label: "Dataflow",
        short: "FLOW",
        count: 0,
        status: "idle",
    },
    {
        id: "warehouse",
        label: "Analytics Warehouse",
        short: "BQ",
        count: 0,
        status: "idle",
    },
];

const STAGE_ORDER: StageId[] = [
    "source",
    "cdc",
    "kafka",
    "processor",
    "pubsub",
    "subscriptions",
    "dataflow",
    "warehouse",
];

const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export default function RealtimeIngestionVisualizer() {
    const [mode, setMode] = useState<Mode>("healthy");
    const [isRunning, setIsRunning] = useState(false);
    const [packets, setPackets] = useState<Packet[]>([]);
    const [stages, setStages] = useState<StageStat[]>(INITIAL_STAGES);
    const [logs, setLogs] = useState<string[]>([
        "[SYSTEM] Real-time ingestion pipeline ready.",
    ]);
    const [sourceRate, setSourceRate] = useState(0);
    const [consumerLag, setConsumerLag] = useState(0);
    const [errorRate, setErrorRate] = useState(0);
    const [warehouseRows, setWarehouseRows] = useState(12840);
    const [subscriptionBacklog, setSubscriptionBacklog] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const packetRef = useRef(0);

    const appendLog = (line: string) => {
        setLogs((prev) => {
            const next = [...prev, line];
            return next.slice(-10);
        });
    };

    const resetAll = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;

        setIsRunning(false);
        setPackets([]);
        setStages(INITIAL_STAGES);
        setLogs(["[SYSTEM] Real-time ingestion pipeline ready."]);
        setSourceRate(0);
        setConsumerLag(0);
        setErrorRate(0);
        setWarehouseRows(12840);
        setSubscriptionBacklog(0);
    };

    const updateStage = (
        id: StageId,
        updater: (prev: StageStat) => StageStat,
    ) => {
        setStages((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
    };

    const activateStage = (id: StageId, status: StageStat["status"]) => {
        updateStage(id, (prev) => ({ ...prev, status }));
    };

    const incrementStage = (id: StageId, by = 1) => {
        updateStage(id, (prev) => ({
            ...prev,
            count: prev.count + by,
            status: mode === "degraded" && (id === "kafka" || id === "subscriptions")
                ? prev.status
                : "active",
        }));
    };

    const markSettled = () => {
        setStages((prev) =>
            prev.map((stage) => ({
                ...stage,
                status:
                    mode === "degraded" &&
                        (stage.id === "kafka" || stage.id === "subscriptions")
                        ? "warning"
                        : stage.count > 0
                            ? "success"
                            : "idle",
            })),
        );
    };

    const emitPacket = () => {
        const id = Date.now() + packetRef.current++;
        const lane = randomInt(0, 2);

        const newPacket: Packet = {
            id,
            lane,
            mode,
        };

        setPackets((prev) => [...prev, newPacket]);

        incrementStage("source", 1);
        activateStage("source", "active");

        setTimeout(() => incrementStage("cdc", 1), 220);
        setTimeout(() => incrementStage("kafka", 1), 520);
        setTimeout(() => incrementStage("processor", 1), 900);
        setTimeout(() => incrementStage("pubsub", 1), 1240);
        setTimeout(() => incrementStage("subscriptions", 1), 1540);
        setTimeout(() => incrementStage("dataflow", 1), 1880);

        setTimeout(() => {
            const shouldDrop =
                mode === "degraded" && Math.random() < 0.18;

            if (!shouldDrop) {
                incrementStage("warehouse", 1);
                setWarehouseRows((prev) => prev + 1);
            } else {
                setErrorRate((prev) => Number((prev + 0.4).toFixed(1)));
            }
        }, 2280);

        setTimeout(() => {
            setPackets((prev) => prev.filter((p) => p.id !== id));
        }, 2600);
    };

    const startSimulation = () => {
        if (isRunning) return;

        setIsRunning(true);
        setLogs((prev) => [...prev, "[PIPELINE] Starting event ingestion..."]);
        appendLog(
            mode === "healthy"
                ? "[MODE] Healthy stream mode enabled."
                : "[MODE] Degraded mode enabled. Backpressure simulation active.",
        );

        intervalRef.current = setInterval(() => {
            const burst = mode === "healthy" ? randomInt(1, 2) : randomInt(2, 4);

            setSourceRate(mode === "healthy" ? randomInt(420, 760) : randomInt(880, 1450));
            setConsumerLag((prev) => {
                const next =
                    mode === "healthy"
                        ? Math.max(8, prev + randomInt(-20, 14))
                        : Math.min(950, prev + randomInt(28, 95));
                return next;
            });

            setSubscriptionBacklog((prev) => {
                const next =
                    mode === "healthy"
                        ? Math.max(0, prev + randomInt(-18, 10))
                        : Math.min(1400, prev + randomInt(40, 110));
                return next;
            });

            setErrorRate((prev) => {
                if (mode === "healthy") {
                    return Math.max(0, Number((prev - 0.2).toFixed(1)));
                }
                return Math.min(4.9, Number((prev + Math.random() * 0.18).toFixed(1)));
            });

            for (let i = 0; i < burst; i++) {
                emitPacket();
            }

            if (mode === "healthy") {
                appendLog(
                    `[INGEST] ${burst} event batch replicated through stream successfully.`,
                );
            } else {
                appendLog(
                    `[INGEST] Elevated stream pressure detected. Backlog rising across subscriptions.`,
                );
                activateStage("kafka", "warning");
                activateStage("subscriptions", "warning");
            }

            markSettled();
        }, 1300);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const metrics = useMemo(
        () => [
            {
                label: "Source Throughput",
                value: `${sourceRate}`,
                suffix: "evt/s",
                tone: "blue",
            },
            {
                label: "Consumer Lag",
                value: `${consumerLag}`,
                suffix: "msgs",
                tone: mode === "healthy" ? "blue" : "amber",
            },
            {
                label: "Backlog",
                value: `${subscriptionBacklog}`,
                suffix: "queued",
                tone: mode === "healthy" ? "emerald" : "amber",
            },
            {
                label: "Error Rate",
                value: `${errorRate.toFixed(1)}`,
                suffix: "%",
                tone: errorRate < 1 ? "emerald" : "red",
            },
        ],
        [sourceRate, consumerLag, subscriptionBacklog, errorRate, mode],
    );

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-32" id="ingestion-visualizer">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
                    <span className="text-blue-400 font-display font-black text-2xl">
                        10.
                    </span>
                    Real-Time Ingestion Visualizer
                </h2>

                <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
                    A generalized event-driven ingestion workflow showing how data moves
                    from a source system through change capture, streaming, processing,
                    messaging, transformation, and warehouse delivery.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b0f15] p-5 md:p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.06),transparent_35%)]" />

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={startSimulation}
                                disabled={isRunning}
                                className="px-5 py-3 rounded-lg bg-blue-500 text-slate-950 font-bold hover:bg-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Play size={18} />
                                {isRunning ? "Streaming..." : "Start Ingestion"}
                            </button>

                            <button
                                onClick={resetAll}
                                className="px-5 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all flex items-center gap-2"
                            >
                                <RotateCcw size={18} />
                                Reset
                            </button>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-xl p-1 w-fit">
                            <button
                                onClick={() => !isRunning && setMode("healthy")}
                                className={`px-4 py-2 rounded-lg text-sm font-mono transition ${mode === "healthy"
                                    ? "bg-slate-800 text-blue-400"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                Healthy Mode
                            </button>
                            <button
                                onClick={() => !isRunning && setMode("degraded")}
                                className={`px-4 py-2 rounded-lg text-sm font-mono transition ${mode === "degraded"
                                    ? "bg-slate-800 text-amber-400"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                Backpressure Mode
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {metrics.map((metric) => (
                            <MetricCard
                                key={metric.label}
                                label={metric.label}
                                value={metric.value}
                                suffix={metric.suffix}
                                tone={metric.tone as "blue" | "blue" | "emerald" | "amber" | "red"}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-6">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 md:p-5 overflow-hidden">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                                    <Workflow size={16} className="text-blue-400" />
                                    Event Flow Topology
                                </div>
                                <div className="text-[11px] uppercase tracking-widest font-mono text-slate-500">
                                    Near Real-Time Stream
                                </div>
                            </div>

                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                    {stages.map((stage, index) => (
                                        <div key={stage.id} className="relative">
                                            <StageNode stage={stage} mode={mode} />

                                            {index < stages.length - 1 && (
                                                <div className="hidden xl:flex absolute top-1/2 -right-3 translate-x-1/2 -translate-y-1/2 items-center justify-center text-slate-700 z-20">
                                                    <ArrowRight size={18} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence>
                                    {packets.map((packet) => (
                                        <PacketTrail
                                            key={packet.id}
                                            lane={packet.lane}
                                            mode={packet.mode}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <MiniStat
                                    label="Captured Changes"
                                    value={stages.find((s) => s.id === "cdc")?.count ?? 0}
                                    icon={<Radio size={14} />}
                                />
                                <MiniStat
                                    label="Processed Events"
                                    value={stages.find((s) => s.id === "dataflow")?.count ?? 0}
                                    icon={<Cpu size={14} />}
                                />
                                <MiniStat
                                    label="Warehouse Rows"
                                    value={warehouseRows}
                                    icon={<Table2 size={14} />}
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-black min-h-[520px] overflow-hidden flex flex-col">
                            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                                    <Activity size={16} className="text-blue-400" />
                                    Stream Console
                                </div>
                                <div className="text-[11px] uppercase tracking-widest font-mono text-slate-500">
                                    Live Telemetry
                                </div>
                            </div>

                            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 text-green-400">
                                {logs.map((log, index) => (
                                    <motion.div
                                        key={`${log}-${index}`}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="leading-relaxed break-words"
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="border-t border-slate-800 bg-slate-950/80 p-4">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-slate-500">Current Mode</span>
                                    <span
                                        className={
                                            mode === "healthy" ? "text-blue-400" : "text-amber-400"
                                        }
                                    >
                                        {mode === "healthy" ? "HEALTHY" : "DEGRADED"}
                                    </span>
                                </div>

                                <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                                    <motion.div
                                        className={mode === "healthy" ? "h-full bg-blue-500" : "h-full bg-amber-500"}
                                        animate={{
                                            width:
                                                mode === "healthy"
                                                    ? `${Math.min(100, 18 + consumerLag / 8)}%`
                                                    : `${Math.min(100, 35 + consumerLag / 10)}%`,
                                        }}
                                    />
                                </div>

                                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                                    <span>Pipeline Pressure</span>
                                    <span>{mode === "healthy" ? "NORMAL" : "ELEVATED"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatusCard
                            title="Event bus"
                            value={
                                mode === "healthy"
                                    ? "Balanced partition consumption"
                                    : "Partition lag increasing"
                            }
                            state={mode === "healthy" ? "ok" : "warn"}
                        />
                        <StatusCard
                            title="Subscriptions"
                            value={
                                mode === "healthy"
                                    ? "Consumers keeping pace"
                                    : "Backlog building under burst load"
                            }
                            state={mode === "healthy" ? "ok" : "warn"}
                        />
                        <StatusCard
                            title="Warehouse Delivery"
                            value={
                                errorRate < 1
                                    ? "Rows landing successfully"
                                    : "Partial drops simulated"
                            }
                            state={errorRate < 1 ? "ok" : "warn"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StageNode({
    stage,
    mode,
}: {
    stage: StageStat;
    mode: Mode;
}) {
    const iconMap: Record<StageId, React.ReactNode> = {
        source: <Database size={18} />,
        cdc: <Radio size={18} />,
        kafka: <Blocks size={18} />,
        processor: <Cpu size={18} />,
        pubsub: <Workflow size={18} />,
        subscriptions: <Activity size={18} />,
        dataflow: <ArrowRight size={18} />,
        warehouse: <Table2 size={18} />,
    };

    const statusMap = {
        idle: "border-slate-800 bg-slate-900/60 text-slate-400",
        active: "border-blue-500/30 bg-blue-500/10 text-blue-300",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    };

    return (
        <motion.div
            layout
            animate={
                stage.status === "active"
                    ? {
                        y: [0, -2, 0],
                        boxShadow: [
                            "0 0 0 rgba(0,0,0,0)",
                            "0 0 24px rgba(45,212,191,0.10)",
                            "0 0 0 rgba(0,0,0,0)",
                        ],
                    }
                    : {}
            }
            transition={{ duration: 1.1, repeat: stage.status === "active" ? Infinity : 0 }}
            className={`rounded-xl border p-4 min-h-[122px] transition-all ${statusMap[stage.status]}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">{iconMap[stage.id]}</div>
                    <div>
                        <div className="text-sm font-semibold text-slate-100">
                            {stage.label}
                        </div>
                        <div className="text-[11px] mt-1 uppercase tracking-widest font-mono text-slate-500">
                            {stage.short}
                        </div>
                    </div>
                </div>

                <span
                    className={`h-2.5 w-2.5 rounded-full ${stage.status === "warning"
                        ? "bg-amber-400"
                        : stage.status === "success"
                            ? "bg-emerald-400"
                            : stage.status === "active"
                                ? "bg-blue-400"
                                : "bg-slate-600"
                        }`}
                />
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <div className="text-[11px] uppercase tracking-widest font-mono text-slate-500">
                        Processed
                    </div>
                    <div className="text-2xl font-display font-bold text-slate-100">
                        {stage.count}
                    </div>
                </div>

                <div className="text-[11px] font-mono uppercase">
                    {stage.status === "warning" && mode === "degraded"
                        ? "Backpressure"
                        : stage.status === "active"
                            ? "Flowing"
                            : stage.status === "success"
                                ? "Stable"
                                : "Idle"}
                </div>
            </div>
        </motion.div>
    );
}

function PacketTrail({
    lane,
    mode,
}: {
    lane: number;
    mode: Mode;
}) {
    const top = 50 + lane * 38;

    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: top, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], x: [0, 820], y: [top, top], scale: [0.8, 1, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: "linear" }}
            className={`pointer-events-none absolute left-2 z-30 h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor] ${mode === "healthy"
                ? "bg-blue-400 text-blue-400"
                : "bg-amber-400 text-amber-400"
                }`}
        />
    );
}

function MetricCard({
    label,
    value,
    suffix,
    tone,
}: {
    label: string;
    value: string;
    suffix: string;
    tone: "blue" | "blue" | "emerald" | "amber" | "red";
}) {
    const toneMap = {
        blue: "border-blue-500/20 bg-blue-500/10 text-blue-400",
        emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
        red: "border-red-500/20 bg-red-500/10 text-red-400",
    };

    return (
        <div className={`rounded-xl border p-4 ${toneMap[tone]}`}>
            <div className="text-[11px] uppercase tracking-widest font-mono mb-2">
                {label}
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl md:text-3xl font-display font-bold">
                    {value}
                </span>
                <span className="text-xs font-mono opacity-80 mb-1">{suffix}</span>
            </div>
        </div>
    );
}

function MiniStat({
    label,
    value,
    icon,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center gap-2 text-slate-500 text-[11px] uppercase tracking-widest font-mono mb-2">
                {icon}
                {label}
            </div>
            <div className="text-xl font-display font-bold text-slate-100">
                {value}
            </div>
        </div>
    );
}

function StatusCard({
    title,
    value,
    state,
}: {
    title: string;
    value: string;
    state: "ok" | "warn";
}) {
    return (
        <div
            className={`rounded-xl border p-4 ${state === "ok"
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-amber-500/20 bg-amber-500/10"
                }`}
        >
            <div className="flex items-center gap-2 mb-2">
                {state === "ok" ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                    <CircleAlert size={16} className="text-amber-400" />
                )}
                <span className="text-sm font-semibold text-slate-100">{title}</span>
            </div>
            <p
                className={`text-sm leading-relaxed ${state === "ok" ? "text-emerald-300" : "text-amber-300"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}