"use client";

import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitBranch, Server, Cpu, ShieldCheck, Database } from "lucide-react";

interface NodeDetail {
  title: string;
  desc: string;
  metrics: string;
  icon: any;
}

const nodeDetails: Record<string, NodeDetail> = {
  "1": {
    title: "Developer Commit",
    desc: "Engineers push infrastructure changes and Terraform modules to the Git repository, triggering the CI/CD workflow.",
    metrics: "Version Controlled Infrastructure",
    icon: GitBranch,
  },
  "2": {
    title: "Jenkins CI Pipeline",
    desc: "Jenkins orchestrates the CI pipeline, executing validation stages, Terraform plan generation, and automated policy checks.",
    metrics: "Automated Infrastructure Validation",
    icon: Server,
  },
  "3": {
    title: "Terraform Plan Stage",
    desc: "Terraform generates a plan outlining infrastructure changes including IAM roles, Pub/Sub resources, and BigQuery configurations.",
    metrics: "Preview of Infrastructure Changes",
    icon: Cpu,
  },
  "4": {
    title: "Compliance Checker",
    desc: "A Python-based shift-left compliance checker analyzes Terraform plans to prevent unauthorized IAM role assignments or policy violations before deployment.",
    metrics: "Prevents Misconfigurations Early",
    icon: ShieldCheck,
  },
  "5": {
    title: "Plan JSON Summarizer",
    desc: "Custom logic parses the Terraform plan JSON and extracts critical infrastructure changes, presenting actionable summaries directly in Jenkins logs.",
    metrics: "Improved Deployment Visibility",
    icon: Database,
  },
};

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 0 },
    data: { label: "Developer Commit" },
    style: {
      background: "#0f172a",
      color: "#fff",
      border: "1px solid #2dd4bf",
      width: 170,
    },
  },
  {
    id: "2",
    position: { x: 250, y: 130 },
    data: { label: "Jenkins CI Pipeline" },
    style: {
      background: "#0f172a",
      color: "#fff",
      border: "1px solid #94a3b8",
      width: 180,
    },
  },
  {
    id: "3",
    position: { x: 250, y: 260 },
    data: { label: "Terraform Plan" },
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #38bdf8",
      width: 160,
    },
  },
  {
    id: "4",
    position: { x: 60, y: 390 },
    data: { label: "Compliance Checker" },
    style: {
      background: "#1e1b4b",
      color: "#c7d2fe",
      border: "1px dashed #6366f1",
      width: 180,
    },
  },
  {
    id: "5",
    position: { x: 420, y: 390 },
    data: { label: "Plan JSON Analyzer" },
    style: {
      background: "#3f1c1c",
      color: "#fca5a5",
      border: "1px solid #ef4444",
      width: 180,
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true, label: "Policy Check" },
  { id: "e3-5", source: "3", target: "5", animated: true, label: "Plan Parsing" },
];

export default function Architecture() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  };

  const details = selectedNode ? nodeDetails[selectedNode] : null;

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative" id="architecture">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6">
          <span className="text-teal-400 font-display font-black text-2xl">
            04.
          </span>{" "}
          System Architecture
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Conceptual architecture of the{" "}
          <strong>Terraform Compliance & Plan Analysis Pipeline</strong>{" "}
          demonstrating how infrastructure changes are validated and summarized
          before deployment.<span className="text-teal-400"> Click a node</span> to see the
          engineering challenge.
        </p>
      </div>

      <div className="h-[600px] w-full border border-slate-800 rounded-xl bg-slate-950/50 overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background color="#1e293b" gap={16} />
          <Controls />
        </ReactFlow>

        <AnimatePresence>
          {selectedNode && details && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute top-0 right-0 h-full w-full md:w-96 bg-slate-900 p-8 border-l border-slate-700"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-slate-400"
              >
                <X size={24} />
              </button>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {details.title}
                </h3>

                <p className="text-slate-300 mb-6">{details.desc}</p>

                <div className="bg-slate-800 rounded-lg p-4 border border-teal-400/30">
                  <p className="text-xs text-teal-400 uppercase mb-1">
                    Key Impact
                  </p>
                  <p className="text-lg text-white">{details.metrics}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}