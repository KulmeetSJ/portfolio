"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    CheckCircle2,
    Loader2,
    Mail,
    Briefcase,
    Clock3,
} from "lucide-react";
import { toast } from "./Toaster";

export default function ContactMinimal() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const sendMessage = async () => {
        const trimmedEmail = email.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
            toast.error("Please enter a valid email.");
            return;
        }

        if (!trimmedSubject) {
            toast.error("Please add a subject.");
            return;
        }

        if (!trimmedMessage) {
            toast.error("Please enter a message.");
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: trimmedEmail,
                    subject: trimmedSubject,
                    message: trimmedMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to send message.");
            }

            setStatus("success");
            toast.success("Message sent successfully.");

            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to send message.";

            toast.error(errorMessage);
            setStatus("idle");
        }
    };

    return (
        <section
            id="contact"
            className="py-24 px-4 md:px-12 max-w-6xl mx-auto scroll-mt-32"
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14"
            >
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-100 mb-6 flex items-center gap-4 tracking-tight">
                    <span className="text-blue-400 font-display font-black text-2xl">
                        11.
                    </span>
                    Get in Touch
                </h2>

                <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
                    I work across backend engineering, cloud infrastructure, and full-stack development. If you'd like to discuss a project, collaboration, or engineering ideas, feel free to reach out.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start"
            >
                {/* Left Content */}
                <div className="space-y-5">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-300 mb-5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Open to connecting
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-100 tracking-tight mb-3">
                            Let's build something solid.
                        </h3>

                        <p className="text-slate-400 leading-relaxed">
                            Whether it's a project, collaboration, or an interesting engineering conversation, I'd be glad to connect.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-slate-200 font-semibold mb-1">
                                        Preferred conversations
                                    </p>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Backend engineering, cloud infrastructure, DevOps, full-stack
                                        systems, and technical collaborations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    <Clock3 size={18} />
                                </div>
                                <div>
                                    <p className="text-slate-200 font-semibold mb-1">
                                        Response time
                                    </p>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Usually within 24-48 hours, depending on message context and current
                                        schedule.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-slate-200 font-semibold mb-1">
                                        Best way to reach out
                                    </p>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Share a short intro, project or discussion context, and any helpful
                                        links so I can respond clearly and quickly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
                    <div className="mb-8">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 font-mono mb-3">
                            Contact Form
                        </p>
                        <h3 className="text-2xl font-display font-bold text-slate-100 tracking-tight">
                            Start a conversation
                        </h3>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-blue-400/50 focus:bg-white/[0.05]"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Project, collaboration, or discussion"
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-blue-400/50 focus:bg-white/[0.05]"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={7}
                                placeholder="Tell me a bit about the project, context, or topic you'd like to discuss..."
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-slate-100 placeholder:text-slate-600 outline-none transition-all focus:border-blue-400/50 focus:bg-white/[0.05] resize-none"
                            />
                        </div>

                        <button
                            onClick={sendMessage}
                            disabled={status === "sending"}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3.5 font-semibold text-slate-950 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {status === "sending" ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle2 size={18} />
                                    Message Sent
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <ArrowUpRight size={18} />
                                </>
                            )}
                        </button>

                        <AnimatePresence>
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2
                                            size={18}
                                            className="text-emerald-400 mt-0.5 shrink-0"
                                        />
                                        <div>
                                            <p className="text-emerald-300 font-semibold">
                                                Message sent successfully.
                                            </p>
                                            <p className="text-sm text-emerald-200/70 mt-1">
                                                Thanks for reaching out. I'll get back to you soon.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}