"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import SpotlightCard from "./SpotlightCard";

// Certifications from the evidence bank (v1.9j). Professional Cloud Architect is primary and always first.
const cert = {
    issuer: "Google Cloud",
    title: "Google Cloud Certified Professional Cloud Architect",
    credentialId: "5f09da7209a24931a67cbc3881df84c4",
    verifyUrl: "https://www.credly.com/badges/498cdb19-b30a-45d1-9221-7d44ff636c66/public_url",
};

// No credential ID, link or date is recorded for this one, so none is shown.
const secondary = { title: "Wipro Java Full Stack Certification", issuer: "Wipro" };

export default function CertificationsCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-1 md:col-span-12"
        >
            <SpotlightCard className="p-6">
                <div
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                    id="certifications"
                >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/95">
                        <Image src="/google-cloud.png" alt="Google Cloud" fill className="object-contain p-2" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-1">
                            <Award size={14} className="text-blue-400" />
                            Certifications
                        </div>
                        <p className="text-slate-100 font-display font-bold text-lg md:text-xl leading-snug">
                            {cert.title}
                        </p>
                        <p className="text-slate-500 text-xs mt-1 font-mono break-all">
                            Credential ID: <span className="text-slate-400">{cert.credentialId}</span>
                        </p>
                    </div>

                    <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-400/30 px-4 py-2 text-xs font-mono text-blue-300 hover:bg-blue-500/10 transition-colors shrink-0"
                    >
                        Verify on Credly <ExternalLink size={12} />
                    </a>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 text-sm text-slate-400">
                    <BadgeCheck size={16} className="text-slate-500 shrink-0" />
                    <span>
                        {secondary.title}{" "}
                        <span className="text-slate-600 font-mono text-xs uppercase">· {secondary.issuer}</span>
                    </span>
                </div>
            </SpotlightCard>
        </motion.div>
    );
}
