"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
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
  GitBranch,
  Server,
  Cpu,
  ShieldCheck,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface NodeDetail {
  title: string;
  desc: string;
  metrics: string;
  icon: any;
  accent: string;
}

const nodeDetails: Record<string, NodeDetail> = {
  "1": {
    title: "Developer Commit",
    desc: "Infrastructure changes begin in Git. Engineers update Terraform modules, deployment logic, or platform configuration, which then triggers the CI workflow automatically.",
    metrics: "Version controlled infrastructure changes",
    icon: GitBranch,
    accent: "text-cyan-400",
  },
  "2": {
    title: "Jenkins CI Pipeline",
    desc: "Jenkins coordinates validation stages, executes the Terraform workflow, and acts as the control plane for policy and deployment review.",
    metrics: "Centralized CI orchestration",
    icon: Server,
    accent: "text-blue-400",
  },
  "3": {
    title: "Terraform Plan Stage",
    desc: "Terraform generates an execution plan that previews upcoming changes across IAM bindings, cloud resources, datasets, and infrastructure dependencies.",
    metrics: "Preview before infrastructure apply",
    icon: Cpu,
    accent: "text-emerald-400",
  },
  "4": {
    title: "Compliance Checker",
    desc: "A Python-based shift-left validation layer scans the Terraform plan for restricted IAM roles, unsafe permissions, or policy violations before release approval.",
    metrics: "Prevents risky changes before deployment",
    icon: ShieldCheck,
    accent: "text-violet-400",
  },
  "5": {
    title: "Plan JSON Summarizer",
    desc: "Custom parsing logic extracts critical resource changes from plan JSON and produces human-readable summaries directly inside Jenkins logs for faster engineering review.",
    metrics: "Faster review with actionable summaries",
    icon: Database,
    accent: "text-rose-400",
  },
};

function PipelineNode({ id, data, selected }: NodeProps) {
  const detail = nodeDetails[id];
  const Icon = detail.icon;

  return (
    <div
      className={`relative min-w-[220px] rounded-2xl border transition-all duration-300 backdrop-blur-xl ${selected
          ? "border-blue-400/50 bg-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.18)]"
          : "border-white/8 bg-slate-900/90 hover:border-white/15"
        }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-0 !bg-slate-500"
      />

      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="rounded-xl border border-white/10 bg-slate-800/80 p-2.5">
            <Icon size={18} className={detail.accent} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono mb-1">
              Pipeline Node
            </p>
            <h3 className="text-sm font-semibold text-slate-100 leading-snug">
              {data.label}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {detail.metrics}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-0 !bg-slate-500"
      />
    </div>
  );
}

const nodeTypes = {
  pipelineNode: PipelineNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "pipelineNode",
    position: { x: 280, y: 40 },
    data: { label: "Developer Commit" },
  },
  {
    id: "2",
    type: "pipelineNode",
    position: { x: 280, y: 180 },
    data: { label: "Jenkins CI Pipeline" },
  },
  {
    id: "3",
    type: "pipelineNode",
    position: { x: 280, y: 320 },
    data: { label: "Terraform Plan Stage" },
  },
  {
    id: "4",
    type: "pipelineNode",
    position: { x: 60, y: 470 },
    data: { label: "Compliance Checker" },
  },
  {
    id: "5",
    type: "pipelineNode",
    position: { x: 500, y: 470 },
    data: { label: "Plan JSON Summarizer" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#334155", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#475569" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#334155", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#475569" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "Policy Check",
    labelStyle: { fill: "#94a3b8", fontSize: 11 },
    style: { stroke: "#6366f1", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
    label: "Plan Parsing",
    labelStyle: { fill: "#94a3b8", fontSize: 11 },
    style: { stroke: "#f43f5e", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f43f5e" },
  },
];

export default function Architecture() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, color: "#475569" },
            style: { stroke: "#475569", strokeWidth: 1.5 },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  };

  const details = selectedNode ? nodeDetails[selectedNode] : null;

  const summaryCards = useMemo(
    () => [
      { label: "Primary Flow", value: "Git → Jenkins → Terraform" },
      { label: "Validation Layer", value: "Policy + Plan Analysis" },
      { label: "Outcome", value: "Safer infra releases" },
    ],
    [],
  );

  return (
    <section
      className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative scroll-mt-32"
      id="architecture"
    >
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 tracking-tight">
          <span className="text-blue-400 font-display font-black text-2xl">
            04.
          </span>{" "}
          System Architecture
        </h2>

        <p className="text-slate-400 max-w-3xl text-lg leading-relaxed">
          An interactive view of the{" "}
          <span className="text-slate-200 font-medium">
            Terraform Compliance and Plan Analysis Pipeline
          </span>
          , showing how infrastructure changes move through validation,
          summarization, and release review before deployment.
          <span className="text-blue-400"> Click a node</span> to inspect its role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-xl p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-2">
              {item.label}
            </p>
            <p className="text-sm md:text-base text-slate-200">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative h-[680px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[radial-gradient(circle_at_top,#0f172a,rgba(2,6,23,0.96)_55%,#020617_100%)] shadow-[0_0_60px_rgba(2,6,23,0.45)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 backdrop-blur-md">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-300 font-mono">
            Deployment Review Flow
          </span>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={28} />
          <Controls />
        </ReactFlow>

        <AnimatePresence>
          {selectedNode && details && (
            <motion.div
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ duration: 0.28 }}
              className="absolute top-0 right-0 z-30 h-full w-full md:w-[380px] border-l border-white/10 bg-slate-950/95 backdrop-blur-xl p-6 md:p-8"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 rounded-full border border-white/10 bg-slate-900 p-2 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mt-10">
                <div className="flex items-start gap-3 mb-6">
                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-3">
                    <details.icon size={20} className={details.accent} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono mb-2">
                      Selected Node
                    </p>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      {details.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {details.desc}
                </p>

                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 mb-6">
                  <p className="text-[10px] text-blue-300 uppercase tracking-[0.18em] font-mono mb-2">
                    Key Impact
                  </p>
                  <p className="text-white text-lg leading-relaxed">
                    {details.metrics}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-slate-900/80 p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-mono mb-3">
                    Flow Context
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span>Pipeline step</span>
                    <ArrowRight size={14} className="text-slate-500" />
                    <span>Validation-aware release flow</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}