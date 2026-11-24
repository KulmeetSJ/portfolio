"use client";

import React, { useState } from "react";
import ReactFlow, {
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
  Workflow,
  Github,
  LucideIcon,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

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
    accent: "text-accent",
  },
  gateway: {
    title: "payment-gateway (Spring Boot)",
    desc: "Validates the request and publishes the event to Kafka with an idempotent producer. It answers 202 Accepted only after acks=all, with min.insync.replicas=2.",
    key: "202 means durably stored",
    icon: Server,
    accent: "text-accent",
  },
  kafka: {
    title: "Kafka: payments.initiated",
    desc: "3-broker KRaft cluster; 6 partitions, replication factor 3. Events are keyed by the sending account, so one account always maps to one partition.",
    key: "Per-account ordering",
    icon: Layers,
    accent: "text-accent",
  },
  processor: {
    title: "payment-processor (consumer group)",
    desc: "Writes dedupe record, payment, double-entry ledger and balances in one DB transaction, then commits the offset. Uses the cooperative-sticky assignor; parallelism is capped by partition count.",
    key: "At-least-once delivery, idempotent effect",
    icon: Cpu,
    accent: "text-ok",
  },
  postgres: {
    title: "PostgreSQL",
    desc: "processed_events primary key turns retries and redeliveries into no-ops. Account rows are locked in a fixed order to avoid deadlocks; balance >= 0 is a DB constraint.",
    key: "Ledger always balances",
    icon: Database,
    accent: "text-accent",
  },
  retry: {
    title: "Retry topics",
    desc: "Transient errors: 2 blocking retries in place, then non-blocking retry topics at 1 s, 2 s and 4 s. Trade-off: a retried payment may be applied after later payments from the same account.",
    key: "The partition keeps flowing",
    icon: RotateCcw,
    accent: "text-signal",
  },
  dlt: {
    title: "Dead-letter topic + replay",
    desc: "Poison messages go straight to the DLT; exhausted retries follow. Each dead letter is indexed in a table with an inspector and an idempotent replay endpoint.",
    key: "Failures are visible, not lost silently",
    icon: AlertOctagon,
    accent: "text-bad",
  },
  observability: {
    title: "Observability & SLOs",
    desc: "OpenTelemetry Java agent traces across HTTP, Kafka and JDBC into Tempo; logs to Loki; Prometheus metrics and consumer lag; Grafana. Two SLOs with multi-window burn-rate alerts via Alertmanager, tested with promtool in CI.",
    key: "SLOs + burn-rate alerts",
    icon: Activity,
    accent: "text-signal",
  },
};

function PipelineNode({ id, selected }: NodeProps) {
  const detail = nodeDetails[id];
  const Icon = detail.icon;

  return (
    <div
      className={`relative w-[210px] rounded-card border transition-all duration-300 ${selected
        ? "border-accent/50 bg-card"
        : "border-line bg-card/90 hover:border-line"
        }`}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-line" />
      <div className="p-3.5">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="rounded-md border border-line bg-card2/80 p-2">
            <Icon size={16} className={detail.accent} />
          </div>
          <h3 className="text-[13px] font-semibold text-ink leading-snug">{detail.title}</h3>
        </div>
        <p className="text-[11px] text-muted leading-relaxed">{detail.key}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-line" />
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

// Mid-tone edge colours that read on both the light and dark theme.
// (React Flow sets these as SVG attributes, where CSS variables are unreliable.)
const EDGE = { neutral: "#8a857a", accent: "#2f9a80", signal: "#c97a1e", bad: "#c4523f" };

const edge = (
  id: string,
  source: string,
  target: string,
  label?: string,
  color = EDGE.neutral,
  dashed = false,
): Edge => ({
  id,
  source,
  target,
  label,
  animated: !dashed,
  labelStyle: { fontSize: 10 },
  style: { stroke: color, strokeWidth: 1.5, strokeDasharray: dashed ? "5 4" : undefined },
  markerEnd: { type: MarkerType.ArrowClosed, color },
});

const edges: Edge[] = [
  edge("c-g", "client", "gateway", "POST /payments"),
  edge("g-k", "gateway", "kafka", "acks=all, key = fromAccount"),
  edge("k-p", "kafka", "processor"),
  edge("p-db", "processor", "postgres", "one transaction", EDGE.accent),
  edge("p-r", "processor", "retry", "transient error", EDGE.signal),
  edge("r-p", "retry", "processor", "1 s / 2 s / 4 s", EDGE.signal, true),
  edge("p-d", "processor", "dlt", "poison / exhausted", EDGE.bad),
  edge("d-k", "dlt", "kafka", "replay", EDGE.bad, true),
  edge("g-o", "gateway", "observability", "traces, metrics", EDGE.neutral, true),
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
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto relative scroll-mt-20" id="architecture">
      <SectionHeader index="05" kicker="Architecture" title="Inside PayFlow Sim">
        <p>
          How my event-driven payments simulator accepts, orders, retries and dead-letters payments,
          and how it is observed. <span className="text-ink">Click a node</span> for the design
          detail. Personal project on synthetic data; it is not a production payment system.
        </p>
        <a
          href="https://github.com/KulmeetSJ/payflow-sim#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
        >
          <Github size={16} /> Read the full design on GitHub
        </a>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((item) => (
          <div
            key={item.label}
            className="rounded-card border border-line bg-card p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-faint mb-2">{item.label}</p>
            <p className="text-sm md:text-base text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="relative h-[560px] md:h-[680px] w-full overflow-hidden rounded-card border border-line bg-card">
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-md border border-line bg-card/80 px-3 py-1.5 backdrop-blur-md">
          <Workflow size={14} className="text-accent" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-mono">
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
          <Controls showInteractive={false} />
        </ReactFlow>

        <AnimatePresence>
          {details && (
            <motion.div
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ duration: 0.28 }}
              className="absolute top-0 right-0 z-30 h-full w-full md:w-[380px] border-l border-line bg-card p-6 md:p-8 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedNode(null)}
                aria-label="Close details"
                className="absolute top-4 right-4 rounded-md border border-line bg-card p-2 text-muted hover:text-ink transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mt-10">
                <div className="flex items-start gap-3 mb-6">
                  <div className="rounded-card border border-line bg-card p-3">
                    <details.icon size={20} className={details.accent} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink tracking-tight">{details.title}</h3>
                </div>
                <p className="text-muted leading-relaxed mb-6">{details.desc}</p>
                <div className="rounded-card border border-accent/20 bg-accent/10 p-4">
                  <p className="text-[10px] text-accent uppercase tracking-[0.18em] font-mono mb-2">
                    Guarantee / role
                  </p>
                  <p className="text-ink leading-relaxed">{details.key}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
