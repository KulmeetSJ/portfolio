"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Loader2, Terminal, CheckCircle, Circle, XCircle, Info, ExternalLink } from "lucide-react";

// Illustrative simulation of my personal Terraform Drift Detector project
// (github.com/KulmeetSJ/tf-drift-detector). Resource names are made up; nothing is live.
type ScenarioId = "clean" | "console" | "iam" | "pr";

const scenarios: Record<
  ScenarioId,
  { label: string; steps: { title: string; log: string; fail?: boolean }[]; result: string }
> = {
  clean: {
    label: "No drift",
    steps: [
      { title: "Auth: GitHub OIDC → Workload Identity Federation", log: "[auth] keyless token exchanged (no service account key)" },
      { title: "terraform plan -refresh-only", log: "[drift] real world matches state: no drift" },
      { title: "terraform plan", log: "[plan] no code changes pending" },
      { title: "Diff live IAM policy", log: "[iam] no grants outside Terraform" },
      { title: "Conftest / Rego policies", log: "[policy] 0 violations" },
      { title: "Report", log: "[report] clean run; any open drift issue is closed" },
    ],
    result: "Clean: nothing to report",
  },
  console: {
    label: "Console change",
    steps: [
      { title: "Auth: GitHub OIDC → Workload Identity Federation", log: "[auth] keyless token exchanged (no service account key)" },
      { title: "terraform plan -refresh-only", log: "[drift] google_storage_bucket.demo: labels changed outside Terraform", fail: true },
      { title: "terraform plan", log: "[plan] 1 action labelled 'reverts drift'" },
      { title: "Diff live IAM policy", log: "[iam] no grants outside Terraform" },
      { title: "Conftest / Rego policies", log: "[policy] 0 violations" },
      { title: "Report", log: "[report] GitHub issue (label: drift) opened with the exact change\n[report] closes itself after the change is reverted" },
    ],
    result: "Drift issue opened",
  },
  iam: {
    label: "Unmanaged IAM grant",
    steps: [
      { title: "Auth: GitHub OIDC → Workload Identity Federation", log: "[auth] keyless token exchanged (no service account key)" },
      { title: "terraform plan -refresh-only", log: "[drift] no managed resources drifted" },
      { title: "terraform plan", log: "[plan] no code changes pending" },
      { title: "Diff live IAM policy", log: "[iam] roles/editor granted to user:someone@example.com, not managed by Terraform", fail: true },
      { title: "Conftest / Rego policies", log: "[policy] DENY: roles/editor is not allowed", fail: true },
      { title: "Report", log: "[report] drift issue updated: 1 unmanaged grant, 1 policy violation" },
    ],
    result: "Unmanaged grant reported (a plain terraform plan would not see it)",
  },
  pr: {
    label: "PR: make a dataset public",
    steps: [
      { title: "Auth: GitHub OIDC → Workload Identity Federation", log: "[auth] PR plan job: keyless, read-only" },
      { title: "terraform plan (pull request)", log: "[plan] google_bigquery_dataset.demo: access += allAuthenticatedUsers READER" },
      { title: "Conftest / Rego policies", log: "[policy] DENY: no public or domain-wide dataset access", fail: true },
      { title: "PR comment + failed check", log: "[pr] report posted as a PR comment; check failed, so it can't merge\n[pr] the change never reaches GCP" },
    ],
    result: "Blocked before merge",
  },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function TerraformPlayground() {
  const [scenario, setScenario] = useState<ScenarioId>("console");
  const [stepIndex, setStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [logs, setLogs] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const current = scenarios[scenario];

  const run = async () => {
    setIsRunning(true);
    setDone(false);
    setLogs("");
    for (let i = 0; i < current.steps.length; i++) {
      setStepIndex(i);
      await sleep(450);
      setLogs((prev) => prev + (prev ? "\n" : "") + current.steps[i].log);
      await sleep(450);
    }
    setStepIndex(current.steps.length);
    setDone(true);
    setIsRunning(false);
  };

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [logs]);

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-32" id="drift-demo">
      <div className="mb-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 tracking-tight">
          <span className="text-blue-400 font-black text-2xl">08.</span>
          Drift Detection Simulation
        </h2>
        <p className="text-slate-400 max-w-3xl text-lg">
          How my Terraform Drift Detector handles four situations: no drift, a console change, an
          IAM grant Terraform doesn&apos;t manage, and a pull request that would make a dataset
          public.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-500/5 px-5 py-4 flex items-start gap-3">
        <Info size={18} className="text-amber-300 mt-0.5 shrink-0" />
        <div className="text-sm text-slate-300 leading-relaxed">
          <span className="font-semibold text-amber-200">Illustrative simulation.</span> Resource
          names are made up and nothing is live. Measured results (personal benchmark, sandbox GCP
          project): 7/7 console-style changes detected, with a median of 26 s from change to issue
          on a manual run.{" "}
          <a
            href="https://github.com/KulmeetSJ/tf-drift-detector/blob/main/RESULTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
          >
            RESULTS.md <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 md:p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
              <button
                key={id}
                disabled={isRunning}
                onClick={() => {
                  setScenario(id);
                  setStepIndex(-1);
                  setDone(false);
                  setLogs("");
                }}
                className={`px-3 py-2 rounded-lg border text-xs font-mono transition disabled:opacity-50 ${scenario === id
                  ? "bg-blue-500 text-slate-950 border-blue-400"
                  : "border-slate-700 text-slate-300 hover:border-blue-400"
                  }`}
              >
                {scenarios[id].label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {current.steps.map((step, index) => {
              const active = index === stepIndex && isRunning;
              const completed = index < stepIndex;
              const failed = completed && step.fail;
              return (
                <div
                  key={step.title}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition ${active
                    ? "border-blue-400 bg-blue-500/10"
                    : failed
                      ? "border-red-500/30 bg-red-500/10"
                      : completed
                        ? "border-green-500/30 bg-green-500/10"
                        : "border-slate-700"
                    }`}
                >
                  {active ? (
                    <Loader2 size={18} className="text-blue-400 animate-spin shrink-0" />
                  ) : failed ? (
                    <XCircle size={18} className="text-red-400 shrink-0" />
                  ) : completed ? (
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-500 shrink-0" />
                  )}
                  <span className="text-slate-300 text-sm md:text-base min-w-0 break-words">{step.title}</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={run}
            disabled={isRunning}
            className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            Run detection
          </button>

          {done && <p className="mt-4 text-sm font-mono text-blue-300">Result: {current.result}</p>}
        </div>

        <div className="bg-[#010409] border border-slate-800 rounded-xl p-5 md:p-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Terminal size={16} />
            Simulated run log
          </div>
          <div
            ref={terminalRef}
            className="bg-black rounded-lg p-4 min-h-[220px] md:min-h-[300px] max-h-[360px] text-green-400 font-mono text-xs md:text-sm whitespace-pre-wrap break-words overflow-y-auto"
          >
            {logs || <div className="text-slate-500">Pick a scenario and run detection.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
