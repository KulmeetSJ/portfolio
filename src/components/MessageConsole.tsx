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
import SectionHeader from "./SectionHeader";

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
            className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20"
        >
            <SectionHeader index="09" kicker="Contact" title="Get in touch">
                Hiring for GCP data engineering, platform engineering or reliability roles in
                India? Send me a note and I&apos;ll reply by email.
            </SectionHeader>

            <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start"
            >
                {/* Left Content */}
                <div className="space-y-5">
                    <div className="rounded-card border border-line bg-card p-6 md:p-7">
                        <div className="inline-flex items-center gap-2 rounded border border-ok/40 bg-ok/10 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-ok mb-5">
                            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden />
                            Open to connecting
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-bold text-ink tracking-tight mb-3">
                            Open to GCP data, platform and reliability roles.
                        </h3>

                        <p className="text-muted leading-relaxed">
                            Based in Pune, India. Happy to talk about roles, my HSBC work at the level I can share publicly, or any of my projects.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-card border border-line bg-paper/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-ink font-semibold mb-1">
                                        Preferred conversations
                                    </p>
                                    <p className="text-sm text-faint leading-relaxed">
                                        GCP data engineering, platform engineering and reliability
                                        roles, plus technical discussions about my projects.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-card border border-line bg-paper/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent">
                                    <Clock3 size={18} />
                                </div>
                                <div>
                                    <p className="text-ink font-semibold mb-1">
                                        Response time
                                    </p>
                                    <p className="text-sm text-faint leading-relaxed">
                                        Usually within 24-48 hours, depending on message context and current
                                        schedule.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-card border border-line bg-paper/50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-md bg-ok/10 border border-ok/20 text-ok">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-ink font-semibold mb-1">
                                        Best way to reach out
                                    </p>
                                    <p className="text-sm text-faint leading-relaxed">
                                        Share a short intro, project or discussion context, and any helpful
                                        links so I can respond clearly and quickly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="rounded-card border border-line bg-card p-6 md:p-8">
                    <div className="mb-8">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-faint font-mono mb-3">
                            Contact Form
                        </p>
                        <h3 className="text-2xl font-display font-bold text-ink tracking-tight">
                            Start a conversation
                        </h3>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label htmlFor="contact-email" className="block mb-2 text-sm text-muted">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-card border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-faint outline-none transition-all focus:border-accent/50 focus:bg-card"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-subject" className="block mb-2 text-sm text-muted">
                                Subject
                            </label>
                            <input
                                id="contact-subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Role, team, or discussion"
                                className="w-full rounded-card border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-faint outline-none transition-all focus:border-accent/50 focus:bg-card"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-message" className="block mb-2 text-sm text-muted">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={7}
                                placeholder="Tell me about the role or topic you'd like to discuss..."
                                className="w-full rounded-card border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-faint outline-none transition-all focus:border-accent/50 focus:bg-card resize-none"
                            />
                        </div>

                        <button
                            onClick={sendMessage}
                            disabled={status === "sending"}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-card bg-line px-5 py-3.5 font-semibold text-paper transition-all hover:bg-card disabled:cursor-not-allowed disabled:opacity-70"
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
                                    className="rounded-card border border-ok/20 bg-ok/10 p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2
                                            size={18}
                                            className="text-ok mt-0.5 shrink-0"
                                        />
                                        <div>
                                            <p className="text-ok font-semibold">
                                                Message sent successfully.
                                            </p>
                                            <p className="text-sm text-ok/70 mt-1">
                                                Thanks for reaching out. I&apos;ll get back to you soon.
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