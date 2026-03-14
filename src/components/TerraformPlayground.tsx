"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Loader2,
  Terminal,
  CheckCircle,
  Circle,
} from "lucide-react";

const pipelineSteps = [
  {
    title: "Terraform Plan",
    log: "[INFO] Generating Terraform execution plan...\n[INFO] Parsing plan JSON...",
  },
  {
    title: "Compliance Check",
    log: "[CHECK] Validating IAM policies...\n✔ No restricted roles detected",
  },
  {
    title: "Plan Summarization",
    log:
      "[SUMMARY]\nResources Added: 3\nResources Modified: 2\nResources Destroyed: 0",
  },
  {
    title: "Deployment Validation",
    log: "[SUCCESS] Infrastructure validation completed\nDeployment ready.",
  },
];

export default function PipelinePlayground() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const streamLog = async (text: string) => {
    for (let char of text) {
      setLogs((prev) => prev + char);
      await sleep(8);
    }
  };

  const runPipeline = async () => {
    setIsRunning(true);
    setCompleted(false);
    setLogs("");
    setStepIndex(-1);

    for (let i = 0; i < pipelineSteps.length; i++) {
      setStepIndex(i);
      await sleep(500);
      await streamLog("\n\n" + pipelineSteps[i].log);
      await sleep(600);
    }

    setCompleted(true);
    setIsRunning(false);
  };

  // auto scroll terminal logs
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section
      className="py-24 px-4 md:px-12 max-w-7xl mx-auto"
      id="playground"
    >
      {/* HEADER */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
          <span className="text-teal-400 font-black text-2xl">06.</span>
          Terraform Pipeline Playground
        </h2>

        <p className="text-slate-400 max-w-2xl text-lg">
          Simulate how the CI/CD pipeline validates Terraform infrastructure
          changes and prevents compliance violations.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* PIPELINE STAGES */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-300 font-semibold mb-6">
            Pipeline Stages
          </h3>

          <div className="space-y-4">
            {pipelineSteps.map((step, index) => {
              const isActive = index === stepIndex && isRunning;
              const isCompleted = completed || index < stepIndex;

              return (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition flex-wrap ${isActive
                    ? "border-teal-400 bg-teal-500/10"
                    : isCompleted
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-slate-700"
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={18} className="text-green-400" />
                  ) : isActive ? (
                    <Loader2
                      size={18}
                      className="text-teal-400 animate-spin"
                    />
                  ) : (
                    <Circle size={18} className="text-slate-500" />
                  )}

                  <span className="text-slate-300 text-sm md:text-base">
                    {step.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RUN BUTTON */}
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="mt-8 px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Play size={18} />
            )}
            Run Pipeline
          </button>
        </div>

        {/* TERMINAL */}
        <div className="bg-[#010409] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Terminal size={16} />
            Pipeline Logs
          </div>

          <div
            ref={terminalRef}
            className="bg-black rounded-lg p-4 min-h-[220px] md:min-h-[300px] text-green-400 font-mono text-sm whitespace-pre-wrap overflow-y-auto"
          >
            {logs || (
              <div className="text-slate-500">
                Run the pipeline to see CI/CD logs appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}