"use client";

import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  Handle,
  Position,
  NodeProps,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Server,
  Layers,
  Cpu,
  Database,
  RotateCcw,
  AlertOctagon,
  Activity,
  Sparkles,
  Github,
  LucideIcon,
} from "lucide-react";

// Source: public README of github.com/KulmeetSJ/payflow-sim (personal project,
// synthetic data). Nothing here describes HSBC systems.
interface NodeDetail {
  title: string;
  desc: string;
  key: string;
  icon: LucideIcon;
  accent: string;
}

const nodeDetails: Record<string, NodeDetail> = {
  client: {
    title: "Client / load generator",
    desc: "Sends POST /payments with an Idempotency-Key. A generator script produces synthetic payments, about 2% of them deliberately invalid.",
    key: "Synthetic data only",
    icon: Send,
    accent: "text-cyan-400",
  },
  gateway: {
    title: "payment-gateway (Spring Boot)",
    desc: "Validates the request and publishes the event to Kafka with an idempotent producer. It answers 202 Accepted only after acks=all, with min.insync.replicas=2.",
    key: "202 means durably stored",
    icon: Server,
    accent: "text-blue-400",
  },
  kafka: {
    title: "Kafka: payments.initiated",
    desc: "3-broker KRaft cluster; 6 partitions, replication factor 3. Events are keyed by the sending account, so one account always maps to one partition.",
    key: "Per-account ordering",
    icon: Layers,
    accent: "text-violet-400",
  },
  processor: {
    title: "payment-processor (consumer group)",
    desc: "Writes dedupe record, payment, double-entry ledger and balances in one DB transaction, then commits the offset. Uses the cooperative-sticky assignor; parallelism is capped by partition count.",
    key: "At-least-once delivery, idempotent effect",
    icon: Cpu,
    accent: "text-emerald-400",
  },
  postgres: {
    title: "PostgreSQL",
    desc: "processed_events primary key turns retries and redeliveries into no-ops. Account rows are locked in a fixed order to avoid deadlocks; balance >= 0 is a DB constraint.",
    key: "Ledger always balances",
    icon: Database,
    accent: "text-sky-400",
  },
  retry: {
    title: "Retry topics",
    desc: "Transient errors: 2 blocking retries in place, then non-blocking retry topics at 1 s, 2 s and 4 s. Trade-off: a retried payment may be applied after later payments from the same account.",
    key: "The partition keeps flowing",
    icon: RotateCcw,
    accent: "text-amber-400",
  },
  dlt: {
    title: "Dead-letter topic + replay",
    desc: "Poison messages go straight to the DLT; exhausted retries follow. Each dead letter is indexed in a table with an inspector and an idempotent replay endpoint.",
    key: "Failures are visible, not lost silently",
    icon: AlertOctagon,
    accent: "text-rose-400",
  },
  observability: {
    title: "Observability & SLOs",
    desc: "OpenTelemetry Java agent traces across HTTP, Kafka and JDBC into Tempo; logs to Loki; Prometheus metrics and consumer lag; Grafana. Two SLOs with multi-window burn-rate alerts via Alertmanager, tested with promtool in CI.",
    key: "SLOs + burn-rate alerts",
    icon: Activity,
    accent: "text-pink-400",
  },
};

function PipelineNode({ id, selected }: NodeProps) {
  const detail = nodeDetails[id];
  const Icon = detail.icon;

  return (
    <div
      className={`relative w-[210px] rounded-2xl border transition-all duration-300 ${selected
        ? "border-blue-400/50 bg-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.18)]"
        : "border-white/10 bg-slate-900/90 hover:border-white/20"
        }`}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-slate-500" />
      <div className="p-3.5">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="rounded-lg border border-white/10 bg-slate-800/80 p-2">
            <Icon size={16} className={detail.accent} />
          </div>
          <h3 className="text-[13px] font-semibold text-slate-100 leading-snug">{detail.title}</h3>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">{detail.key}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-slate-500" />
    </div>
  );
}

const nodeTypes = { pipelineNode: PipelineNode };

const n = (id: string, x: number, y: number): Node => ({
  id,
  type: "pipelineNode",
  position: { x, y },
  data: {},
});

const nodes: Node[] = [
  n("client", 260, 0),
  n("gateway", 260, 130),
  n("kafka", 260, 260),
  n("processor", 260, 390),
  n("postgres", 0, 540),
  n("retry", 250, 540),
  n("dlt", 500, 540),
  n("observability", 0, 260),
];

const edge = (
  id: string,
  source: string,
  target: string,
  label?: string,
  color = "#475569",
  dashed = false,
): Edge => ({
  id,
  source,
  target,
  label,
  animated: !dashed,
  labelStyle: { fill: "#94a3b8", fontSize: 10 },
  labelBgStyle: { fill: "#0f172a" },
  style: { stroke: color, strokeWidth: 1.5, strokeDasharray: dashed ? "5 4" : undefined },
  markerEnd: { type: MarkerType.ArrowClosed, color },
});

const edges: Edge[] = [
  edge("c-g", "client", "gateway", "POST /payments"),
  edge("g-k", "gateway", "kafka", "acks=all, key = fromAccount"),
  edge("k-p", "kafka", "processor"),
  edge("p-db", "processor", "postgres", "one transaction", "#38bdf8"),
  edge("p-r", "processor", "retry", "transient error", "#f59e0b"),
  edge("r-p", "retry", "processor", "1 s / 2 s / 4 s", "#f59e0b", true),
  edge("p-d", "processor", "dlt", "poison / exhausted", "#f43f5e"),
  edge("d-k", "dlt", "kafka", "replay", "#f43f5e", true),
  edge("g-o", "gateway", "observability", "traces, metrics", "#ec4899", true),
];

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const details = selectedNode ? nodeDetails[selectedNode] : null;

  const summaryCards = [
    { label: "Flow", value: "Gateway → Kafka → consumer group → PostgreSQL" },
    { label: "Failure handling", value: "Retry topics → dead-letter topic → replay" },
    { label: "Scope", value: "Personal project · synthetic data · laptop" },
  ];

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative scroll-mt-32" id="architecture">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 tracking-tight">
          <span className="text-blue-400 font-display font-black text-2xl">05.</span> Architecture:
          PayFlow Sim
        </h2>
        <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
          How my event-driven payments simulator accepts, orders, retries and dead-letters payments,
          and how it is observed.{" "}
          <span className="text-blue-400">Click a node</span> for the design detail. Personal
          project on synthetic data; it is not a production payment system.
        </p>
        <a
          href="https://github.com/KulmeetSJ/payflow-sim#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-mono text-blue-400 hover:text-blue-300"
        >
          <Github size={16} /> Read the full design on GitHub
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/5 bg-slate-900/60 p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-2">{item.label}</p>
            <p className="text-sm md:text-base text-slate-200">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="relative h-[560px] md:h-[680px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[radial-gradient(circle_at_top,#0f172a,rgba(2,6,23,0.96)_55%,#020617_100%)]">
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 backdrop-blur-md">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-300 font-mono">
            Payment flow
          </span>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.08, minZoom: 0.2 }}
          minZoom={0.2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={28} />
          <Controls showInteractive={false} />
        </ReactFlow>

        <AnimatePresence>
          {details && (
            <motion.div
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ duration: 0.28 }}
              className="absolute top-0 right-0 z-30 h-full w-full md:w-[380px] border-l border-white/10 bg-slate-950/95 backdrop-blur-xl p-6 md:p-8 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedNode(null)}
                aria-label="Close details"
                className="absolute top-4 right-4 rounded-full border border-white/10 bg-slate-900 p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mt-10">
                <div className="flex items-start gap-3 mb-6">
                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-3">
                    <details.icon size={20} className={details.accent} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight">{details.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">{details.desc}</p>
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <p className="text-[10px] text-blue-300 uppercase tracking-[0.18em] font-mono mb-2">
                    Guarantee / role
                  </p>
                  <p className="text-white leading-relaxed">{details.key}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
