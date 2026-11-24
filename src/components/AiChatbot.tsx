"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { EMAIL_ADDRESS } from "@/constants/consts";

// Keyword-matching assistant. It does NOT call any AI model or API, and it only
// answers from facts in master_resume_evidence_bank.yaml (v1.9j). Anything not
// covered falls through to an explicit "I don't know" with the contact email.
interface KnowledgeEntry {
  keywords: string[]; // single words match whole words; phrases match as substrings
  text: string;
}

const PERSONAL =
  "This is a **personal project**; every number is a benchmark, not an HSBC or production result.";

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["about", "summary", "who", "introduce", "background", "profile", "overview"],
    text: "Kulmeet Singh is a **Software Engineer on HSBC's Payments Data Platform team** in Pune (Jul 2024 to present, 2+ years). He focuses on **GCP data and platform engineering** and reliability. He is a **Google Cloud Certified Professional Cloud Architect**.",
  },
  {
    keywords: ["hsbc", "job", "current", "role", "employer", "title"],
    text: "At **HSBC** (Payments Data Platform, Pune) he joined as **Trainee Software Engineer** in Jul 2024 and has been a **Software Engineer** since Jan 2025. He:\n• builds and maintains Java Apache Beam pipelines on Dataflow handling **10M+ daily payment transactions at 99.9% uptime**\n• authored reusable Terraform across **2,000+ GCP resources**\n• reduced Dataflow compute cost by **~30% (an estimated $150K+ annually)**\n• built MCP diagnostic servers that cut manual troubleshooting by **~70%**\n• configured Cloud Monitoring alerting (**~40%** better incident detection/MTTR in that workflow)\n• worked on Cloud Composer CI/CD supporting **100+ DAG deployments**",
  },
  {
    keywords: ["experience", "years", "how long", "tenure"],
    text: "**2+ years** full-time at HSBC (since Jul 2024), or **2.5+ years including internships** at Koders (Jan–Apr 2024) and AnyaSoftek (May–Jun 2024).",
  },
  {
    keywords: ["dataflow", "beam", "pipeline", "pipelines", "streaming", "ingestion", "bigquery", "data"],
    text: "At HSBC he builds and maintains **Java Apache Beam pipelines on GCP Dataflow** for payment-data ingestion and processing: **10M+ daily payment transactions at 99.9% uptime**. They handle XML and JSON payloads (including SWIFT MT/MX formats), and XML is flattened into BigQuery columns. He also reduced Dataflow compute cost by **~30% (an estimated $150K+ annually)**.",
  },
  {
    keywords: ["terraform", "iac", "infrastructure"],
    text: "At HSBC he authored and used reusable **Terraform** for Pub/Sub, BigQuery, GCS and IAM across **2,000+ GCP resources**, including a migration of ~600 topics and 1,200 subscriptions. He also built a **Terraform Log Summarizer + Compliance Checker** at HSBC (~60% faster provisioning, 12+ critical misconfigurations caught). Separately, his personal **Terraform Drift Detector** detected 7/7 console-style changes in a sandbox GCP project.",
  },
  {
    keywords: ["mcp", "ai", "llm", "claude", "diagnostic", "diagnostics"],
    text: "At HSBC he built **MCP (Model Context Protocol) diagnostic servers in Python** that connect AI clients to GCP, platform and payment-data diagnostics, reducing manual troubleshooting by **~70%**. He also contributes to the internal Payments AI Platform (React/TypeScript frontend, GKE manifests, SSO). This is integration work, not model training.",
  },
  {
    keywords: ["monitoring", "alerting", "alerts", "reliability", "sre", "slo", "slos", "observability", "incident", "oncall", "on-call", "postmortem"],
    text: "**At HSBC:** he configured GCP Cloud Monitoring alerting policies (~40% better incident detection/MTTR in the monitoring and incident-response workflow) and investigates production issues in his own workstreams. He does **not** claim on-call, postmortems or SLOs at HSBC.\n**In personal projects:** PayFlow Sim defines two SLOs with multi-window burn-rate alerts (tested with promtool), and the GitOps Delivery Platform rolls canaries back on failed metric analysis.",
  },
  {
    keywords: ["composer", "airflow", "cicd", "ci/cd", "jenkins", "sonarqube", "checkmarx", "nexus", "deployments"],
    text: "At HSBC he worked on **CI/CD for Cloud Composer (Airflow) DAG deployments**, replacing a VM-scheduler-based workflow and supporting **100+ DAG deployments**, and integrated **SonarQube, Checkmarx and Nexus** scans into that pipeline.",
  },
  {
    keywords: ["payflow", "payments simulator", "simulator", "kafka", "idempotency", "idempotent", "dlt", "dead-letter", "opentelemetry"],
    text: "**PayFlow Sim** (in progress) is an event-driven payments simulator: Java 21, Spring Boot, Kafka and PostgreSQL, with idempotent processing, per-account ordering, retry topics and a dead-letter topic with replay, plus OpenTelemetry tracing and SLO burn-rate alerts. In a consumer-scaling run, **6,000/6,000 payments reached a final state with a balanced ledger**. Laptop benchmark on synthetic data. " + PERSONAL + "\nAt HSBC, his Kafka work is limited to configuring CDC feed topics and mapping them to Pub/Sub.",
  },
  {
    keywords: ["gitops", "argo", "argocd", "canary", "rollouts", "kyverno", "kubernetes", "delivery"],
    text: "**GitOps Delivery Platform** (Argo CD, Argo Rollouts, Kyverno, GitHub Actions): commit to prod in a median of **~17 min, excluding the human approval wait**; automatic canary rollback **30 s after the first failed metric-analysis check** (5/5 drills); **7/7 non-compliant manifests blocked**. Benchmarks on a local kind cluster. " + PERSONAL,
  },
  {
    keywords: ["drift", "conftest", "rego", "workload identity"],
    text: "**Terraform Drift Detector**: scheduled drift detection for GCP in GitHub Actions, with keyless Workload Identity Federation and Conftest/Rego policies. It detected **7/7 console-style changes** (median **26 s** from change to issue **on a manual run**) and blocked a PR that would have made a BigQuery dataset public. Sandbox GCP project. " + PERSONAL,
  },
  {
    keywords: ["gurugranthi", "marketplace", "sikh", "supabase"],
    text: "**GuruGranthi** is a full-stack services marketplace and booking platform for Sikh service providers such as Ragi, Pathi and Granthi. Built with Next.js, React, TypeScript, Tailwind CSS and Supabase, it has Supabase auth, role-based access control, PostgreSQL Row Level Security and an admin portal. It is **live** at gurugranthisewa.com (personal project).",
  },
  {
    keywords: ["rfp", "procurement"],
    text: "The **AI-Powered RFP Management System** is a personal project. It turns unstructured procurement text into structured RFPs using LLM APIs (Ollama) and includes vendor-management and proposal-parsing APIs, reducing RFP drafting time by **~80%**.",
  },
  {
    keywords: ["parquet", "coldline", "storage"],
    text: "**Parquet Converter** (HSBC work, Sept 2024) is a Python script that converts BigQuery tables to Parquet and stores them in GCS: 1TB+ converted, a 55% query-performance improvement, and 50K+ files tiered to Coldline.",
  },
  {
    keywords: ["projects", "project", "built", "portfolio"],
    text: "Featured projects:\n• **PayFlow Sim** (in progress): event-driven payments simulator with SLOs\n• **GitOps Delivery Platform**: Argo CD and metric-driven canary rollbacks\n• **Terraform Drift Detector**: drift detection and policy-as-code for GCP\n• **GuruGranthi**: live marketplace\n• **AI-Powered RFP Management System**\n• HSBC work: **Parquet Converter** and **Terraform Log Summarizer + Compliance Checker**",
  },
  {
    keywords: ["skills", "tech", "stack", "technologies", "languages"],
    text: "**At HSBC:** Java, Apache Beam, Dataflow, Pub/Sub, BigQuery, GCS, Terraform, Cloud Composer/Airflow, Cloud Monitoring and Logging, Python, MCP, GKE, Helm, Jenkins, Ansible.\n**Personal projects:** Spring Boot, Kafka, PostgreSQL, OpenTelemetry, Prometheus, Grafana, Argo CD, Argo Rollouts, Kyverno, GitHub Actions, Conftest/Rego.",
  },
  {
    keywords: ["certification", "certifications", "certificate", "certified", "architect", "wipro", "pca"],
    text: "**Google Cloud Certified Professional Cloud Architect** (primary). He also holds the **Wipro Java Full Stack Certification**.",
  },
  {
    keywords: ["education", "degree", "university", "college", "cgpa", "btech"],
    text: "**B.Tech in Computer Science and Engineering**, Graphic Era Deemed to be University, Dehradun (2020–2024), CGPA **8.87/10**.",
  },
  {
    keywords: ["awards", "award", "achievements", "flipkart", "grid"],
    text: "**HSBC Pat on the Back** awards (Q1 2026 and Q2 2026), and **Flipkart GRiD 5.0 National Semi-Finalist**.",
  },
  {
    keywords: ["internship", "intern", "koders", "anyasoftek"],
    text: "Internships:\n• **Koders**, Software Development Engineer Intern (Jan–Apr 2024, Dehradun): Discord bots, keyword monitoring, an Electron app, backend routes with Node.js and MongoDB\n• **AnyaSoftek**, Full Stack Developer Intern (May–Jun 2024, remote): a client portfolio website and a rebuild of the company website (Next.js, TailwindCSS, MongoDB)",
  },
  {
    keywords: ["aws", "azure", "redis", "rag", "fine-tune", "fine-tuning", "finetuning", "training", "settlement", "clearing", "authorization", "card"],
    text: "That isn't in Kulmeet's verified profile, so I can't say anything about it. Please ask him directly at **" + EMAIL_ADDRESS + "**.",
  },
  {
    keywords: ["contact", "email", "hire", "reach", "interview", "available", "open"],
    text: `You can reach Kulmeet at **${EMAIL_ADDRESS}**. He is open to **GCP data engineering, platform engineering and reliability** roles in India.`,
  },
  {
    keywords: ["hello", "hi", "hey"],
    text: "Hello! I'm **KuliBot**. I answer only from Kulmeet's verified profile. Ask about his **HSBC work**, **projects**, **skills** or **certification**.",
  },
];

const FALLBACK = `I only answer from Kulmeet's verified profile, and I don't have that detail. Rather than guess, I'd suggest asking him at **${EMAIL_ADDRESS}**. You can also ask about his HSBC work, projects, skills or certification.`;

const findBestMatch = (query: string): string => {
  const lower = query.toLowerCase();
  const words = new Set(lower.split(/[^a-z0-9/+-]+/).filter(Boolean));

  let best: KnowledgeEntry | null = null;
  let maxScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      const hit = kw.includes(" ") ? lower.includes(kw) : words.has(kw);
      if (hit) score++;
    }
    if (score > maxScore) {
      maxScore = score;
      best = entry;
    }
  }

  return best && maxScore > 0 ? best.text : FALLBACK;
};

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi! I'm KuliBot. I answer only from Kulmeet's verified profile, with no guessing. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Small delay to allow animation to finish before focusing
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = findBestMatch(userMessage.text);
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: answer,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON - Increased Z-Index */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open portfolio assistant"
        className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9999] p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen
          ? "scale-0 opacity-0"
          : "bg-blue-500 hover:bg-blue-400 text-slate-900"
          }`}
      >
        <Sparkles size={28} fill="currentColor" />
      </motion.button>

      {/* CHAT WINDOW - Increased Z-Index */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] w-[calc(100vw-2rem)] md:w-[400px] h-[min(500px,80vh)] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bot size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    KuliBot
                  </h3>
                  <span className="text-xs text-slate-400">
                    Answers from verified facts only
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${msg.role === "user"
                      ? "bg-slate-700 text-slate-300"
                      : "bg-blue-500/20 text-blue-400"
                      }`}
                  >
                    {msg.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[80%] ${msg.role === "user"
                      ? "bg-slate-700 text-slate-200 rounded-tr-none"
                      : "bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none"
                      }`}
                  >
                    {msg.text.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-blue-400 font-normal">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                    <Bot size={16} />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "What does he do at HSBC?",
                    "Tell me about PayFlow Sim",
                    "What reliability work has he done?",
                    "How can I contact him?",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:border-blue-400 hover:text-blue-400 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-700">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about his work..."
                  // Added pointer-events-auto to ensure it catches clicks
                  className="w-full bg-slate-950 border border-slate-700 rounded-full py-3 px-5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 pointer-events-auto"
                />
                <button
                  onClick={handleSend}
                  aria-label="Send"
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-slate-950 rounded-full hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
