"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoveHorizontal,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Database,
  Clock,
  Terminal,
  Zap,
} from "lucide-react";

const optimizationCases = [
  {
    id: "algorithm",
    title: "Algorithm Optimization",
    legacy: `// ❌ O(n²) Duplicate Detection
public List<Integer> findDuplicates(List<Integer> users) {

    List<Integer> duplicates = new ArrayList<>();

    for (int i = 0; i < users.size(); i++) {
        for (int j = i + 1; j < users.size(); j++) {

            if (users.get(i).equals(users.get(j))) {
                duplicates.add(users.get(i));
            }
        }
    }

    return duplicates;
}`,
    optimized: `// ✅ O(n) using HashSet
public List<Integer> findDuplicates(List<Integer> users) {

    Set<Integer> seen = new HashSet<>();
    List<Integer> duplicates = new ArrayList<>();

    for (Integer user : users) {

        if (!seen.add(user)) {
            duplicates.add(user);
        }
    }

    return duplicates;
}`,
    before: "O(n²)",
    after: "O(n)",
    beforeTime: "1200ms",
    afterTime: "40ms",
    beforeQuery: "Nested loops",
    afterQuery: "HashSet lookup",
  },

  {
    id: "database",
    title: "Database Query Optimization",
    legacy: `// ❌ Multiple database calls
List<Order> orders = new ArrayList<>();

for(Long userId : userIds){
    orders.add(orderRepository.findByUserId(userId));
}`,
    optimized: `// ✅ Batch database query
List<Order> orders =
    orderRepository.findByUserIdIn(userIds);`,
    before: "N queries",
    after: "1 query",
    beforeTime: "800ms",
    afterTime: "120ms",
    beforeQuery: "100 DB calls",
    afterQuery: "1 batch query",
  },

  {
    id: "memory",
    title: "Memory Optimization",
    legacy: `// ❌ Inefficient string concatenation
String result = "";

for(String item : items){
    result += item;
}`,
    optimized: `// ✅ Using StringBuilder
StringBuilder result = new StringBuilder();

for(String item : items){
    result.append(item);
}`,
    before: "High allocations",
    after: "Efficient memory",
    beforeTime: "200ms",
    afterTime: "40ms",
    beforeQuery: "Repeated String creation",
    afterQuery: "StringBuilder buffer",
  },
];

// Reusable Syntax Highlighter
const HighlightedCode = ({
  code,
  type,
}: {
  code: string;
  type: "bad" | "good";
}) => {
  return (
    <pre className="font-mono text-xs md:text-sm leading-6 overflow-x-auto custom-scrollbar pt-4 px-4 bg-[#1e1e1e] h-full text-slate-300">
      {code.split("\n").map((line, i) => (
        <div key={i} className="table-row">
          {/* Line Numbers */}
          <span className="table-cell select-none text-[#858585] text-right pr-4 w-8 border-r border-[#404040]/30">
            {i + 1}
          </span>
          <span className="table-cell pl-4">
            {line.split(" ").map((token, j) => {
              let color = "text-[#d4d4d4]"; // Default VS Code text

              if (token.startsWith("//"))
                return (
                  <span
                    key={j}
                    className={
                      type === "bad" ? "text-red-400/70" : "text-emerald-400/70"
                    }
                  >
                    {line}
                  </span>
                );

              // VS Code-ish Syntax Highlighting
              if (
                [
                  "const",
                  "async",
                  "function",
                  "await",
                  "for",
                  "if",
                  "return",
                  "let",
                  "var",
                ].includes(token)
              )
                color = "text-[#569cd6]"; // Blue keywords
              if (
                [
                  "User",
                  "Post",
                  "console",
                  "results",
                  "users",
                  "posts",
                ].includes(token.replace(/\./g, ""))
              )
                color = "text-[#4ec9b0]"; // Teal classes/vars
              if (
                token.includes("findAll") ||
                token.includes("push") ||
                token.includes("where") ||
                token.includes("include")
              )
                color = "text-[#dcdcaa]"; // Yellow functions
              if (
                token.includes("{") ||
                token.includes("}") ||
                token.includes("(") ||
                token.includes(")")
              )
                color = "text-[#ffd700]"; // Gold brackets
              if (token.startsWith("'") || token.startsWith('"'))
                color = "text-[#ce9178]"; // Orange strings

              return (
                <span key={j} className={`${color} mr-1.5`}>
                  {token}
                </span>
              );
            })}
          </span>
        </div>
      ))}
    </pre>
  );
};

export default function CodeComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedCase, setSelectedCase] = useState(optimizationCases[0]);

  const legacyCode = selectedCase.legacy;
  const optimizedCode = selectedCase.optimized;

  const handleMouseMove = (
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
  ) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));

    setSliderPosition((x / rect.width) * 100);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove as EventListener);
      window.addEventListener("touchmove", handleMouseMove as EventListener);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("touchmove", handleMouseMove as EventListener);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("touchmove", handleMouseMove as EventListener);
    };
  }, [isDragging]);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-32">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
          <span className="text-teal-400 font-display font-black text-2xl">
            08.
          </span>{" "}
          Performance Engineering
        </h2>
        <p className="text-slate-400 max-w-2xl text-lg">
          I do not just write code; I{" "}
          <span className="text-teal-400">profile and refactor</span> it. Drag
          the slider to compare the performance footprint.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        {optimizationCases.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className={`px-4 py-2 rounded-lg border text-sm font-mono ${selectedCase.id === c.id
              ? "bg-teal-500 text-black border-teal-400"
              : "border-slate-700 text-slate-400 hover:border-teal-400"
              }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* --- DESKTOP VIEW: VS Code Interactive Slider --- */}
      {/* We hide this on mobile and show a stacked view instead (code below) */}
      <div
        className="hidden md:block relative w-full max-w-5xl mx-auto h-[500px] select-none rounded-xl overflow-hidden shadow-2xl border border-[#333]"
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* VS Code Header - Static Background */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#252526] flex items-center px-4 border-b border-[#1e1e1e] z-30">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] text-slate-300 text-xs font-mono rounded-t-md border-t border-l border-r border-transparent">
            <FileCode size={14} className="text-blue-400" />
            <span>user-controller.ts</span>
            <span className="ml-2 text-xs opacity-50">×</span>
          </div>
        </div>

        {/* === RIGHT SIDE (OPTIMIZED CODE) === */}
        <div className="absolute inset-0 bg-[#1e1e1e] pt-10 overflow-hidden z-0">
          {/* Green Metrics Badge */}
          <div className="absolute top-14 right-6 bg-gradient-to-b z-10 flex flex-col items-end gap-2 pointer-events-none">
            <div className="bg-emerald-500/5 backdrop-blur-md bg-opacity-30 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
              <Zap size={18} className="fill-current" />
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                  Execution Time
                </div>
                <div className="font-bold font-mono text-lg leading-none">
                  {selectedCase.afterTime}
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-2">
              <Database size={12} />
              <span>{selectedCase.afterQuery}</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md bg-opacity-30 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-2">
              <Clock size={12} />
              <span>{selectedCase.after}</span>
            </div>
          </div>

          <HighlightedCode code={optimizedCode} type="good" />
        </div>

        {/* === LEFT SIDE (LEGACY CODE) === */}
        <div
          className="absolute inset-0 bg-[#1e1e1e] pt-10 overflow-hidden border-r border-[#404040] z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Red Metrics Badge */}
          <div className="absolute top-14 left-6 z-10 flex flex-col items-start gap-2 pointer-events-none">
            <div className="bg-red-500/5 backdrop-blur-md bg-opacity-30 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
              <AlertTriangle size={18} className="fill-current" />
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                  Execution Time
                </div>
                <div className="font-bold font-mono text-lg leading-none">
                  {selectedCase.beforeTime}
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 text-red-300 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-2">
              <Database size={12} />
              <span>{selectedCase.beforeQuery}</span>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md bg-opacity-30 border border-slate-700 text-red-300 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-2">
              <Clock size={12} />
              <span>{selectedCase.before}</span>
            </div>
          </div>

          <div className="w-[1024px] h-full">
            {" "}
            {/* Force width to prevent wrapping */}
            <HighlightedCode code={legacyCode} type="bad" />
          </div>
        </div>

        {/* SLIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-teal-400 cursor-ew-resize z-40 flex items-center justify-center hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] transition-shadow"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center shadow-lg transform -translate-x-0.5 border-2 border-[#1e1e1e]">
            <MoveHorizontal size={16} className="text-[#1e1e1e]" />
          </div>
        </div>

        {/* VS Code Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#007acc] flex items-center justify-between px-3 text-[10px] text-white font-mono z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Terminal size={10} />
              <span>MASTER*</span>
            </div>
            <div className="flex items-center gap-1 opacity-80">
              <AlertTriangle size={10} />
              <span>0 Errors</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln 12, Col 42</span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW: Stacked for Usability --- */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="bg-[#1e1e1e] border border-red-500/30 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#252526] p-3 flex items-center justify-between border-b border-red-500/10">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle size={14} /> Legacy Implementation
            </div>
            <span className="text-red-400 font-mono text-xs">{selectedCase.beforeTime}</span>
          </div>
          <HighlightedCode code={legacyCode} type="bad" />
        </div>

        <div className="bg-[#1e1e1e] border border-emerald-500/30 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#252526] p-3 flex items-center justify-between border-b border-emerald-500/10">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} /> Optimized Solution
            </div>
            <span className="text-emerald-400 font-mono text-xs">{selectedCase.afterTime}</span>
          </div>
          <HighlightedCode code={optimizedCode} type="good" />
        </div>
      </div>
    </section>
  );
}
