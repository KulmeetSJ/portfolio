"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { EMAIL_ADDRESS } from "@/constants/consts";

// 1. Define the Interface
interface KnowledgeEntry {
  keywords: string[];
  text: string;
}

// 2. Type the Data
const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["skills", "tech", "stack", "technologies"],
    text: "Kulmeet works primarily on **Backend and Platform Engineering**. His core stack includes **Java, Python, Node.js, React, Terraform, Docker, and CI/CD systems**. He focuses on building scalable backend services and infrastructure automation.",
  },
  {
    keywords: ["hsbc", "work", "experience", "job"],
    text: "At **HSBC**, Kulmeet worked on internal engineering platforms. One key project was an **LLM-powered procurement system** that converts unstructured text into structured RFP documents, reducing manual drafting time by **80%**.",
  },
  {
    keywords: ["terraform", "pipeline", "ci", "cicd", "infrastructure"],
    text: "Kulmeet built a **Terraform CI/CD pipeline** that analyzes Terraform plan logs, summarizes infrastructure changes, and validates IAM policies before deployment. This helps engineers quickly understand infrastructure changes and ensures compliance.",
  },
  {
    keywords: ["composer", "security", "devops", "scans"],
    text: "Kulmeet also implemented a **secure CI/CD pipeline** integrating **SonarQube, Nexus IQ, and Checkmarx scans**, ensuring code quality and security before deployments.",
  },
  {
    keywords: ["projects", "portfolio", "built"],
    text: "Some of Kulmeet's featured projects include:\n\n• **Terraform Log Analyzer** for infrastructure change summaries\n• **LLM-powered RFP automation platform**\n• **Secure CI/CD pipelines with automated security scans**\n• **E-commerce platform built with React and MongoDB**",
  },
  {
    keywords: ["contact", "email", "hire", "reach"],
    text: `You can reach Kulmeet directly at **${EMAIL_ADDRESS}**. He is currently open to opportunities in **Backend Engineering, Platform Engineering, and Infrastructure Automation**.`,
  },
  {
    keywords: ["hello", "hi", "hey"],
    text: "Hello! I'm **KuliBot**, Kulmeet's portfolio assistant. I can tell you about his **projects, experience at HSBC, Terraform pipelines, CI/CD systems, and backend skills**.",
  },
  {
    keywords: [
      "certification", "certifications", "certificate", "google cloud", "gcp", "cloud architect", "wipro", "java certification",
      "java fullstack"
    ],
    text: "Kulmeet holds the **Google Cloud Professional Cloud Architect Certification**, which validates expertise in designing scalable cloud architectures on **Google Cloud Platform**. He also completed the **Wipro Java Full Stack Certification**, covering backend development with **Java, Spring Boot, databases, and modern web technologies**."
  },
];

// --- LOGIC ---
const findBestMatch = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  let bestMatch: KnowledgeEntry | null = null;
  let maxScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (lowerQuery.includes(keyword)) score++;
    });
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  if (maxScore > 0 && bestMatch) {
    return bestMatch.text;
  }

  return "I'm not sure about that specific detail, but I can tell you about Kulmeet's **skills**, **work experience**, or **projects**. Try asking 'What are his skills?'";
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
      text: "Hi! I'm KuliBot. Ask me anything about Kulmeet's work!",
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
        className={`fixed bottom-8 right-8 z-[9999] p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen
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
            className="fixed bottom-8 right-4 md:right-8 z-[9999] w-[90vw] md:w-[400px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Bot size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    KuliBot AI
                  </h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
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
                    "What projects has Kulmeet built?",
                    "Tell me about the Terraform pipeline",
                    "What technologies does he use?",
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
                  placeholder="Ask about skills..."
                  // Added pointer-events-auto to ensure it catches clicks
                  className="w-full bg-slate-950 border border-slate-700 rounded-full py-3 px-5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 pointer-events-auto"
                />
                <button
                  onClick={handleSend}
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
