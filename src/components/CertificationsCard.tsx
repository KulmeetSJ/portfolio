"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import SpotlightCard from "./SpotlightCard";

const certifications = [
    {
        issuer: "Google Cloud",
        title: "Professional Cloud Architect",
        credentialId: "5f09da7209a24931a67cbc3881df84c4",
        verifyUrl: "https://www.credly.com/badges/498cdb19-b30a-45d1-9221-7d44ff636c66/public_url",
        logo: "/google-cloud.png",
        logoAlt: "Google Cloud",
    },
    {
        issuer: "Wipro",
        title: "Java Full Stack Certification",
        credentialId: "",
        verifyUrl: "",
    }
];

export default function CertificationsCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="col-span-1 md:col-span-6 lg:col-span-4 h-full"
        >
            <SpotlightCard className="p-6 h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase mb-4" id="certifications">
                    <Award size={14} className="text-teal-400" />
                    Certifications
                </div>

                <div className="space-y-4">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-teal-400 shrink-0">
                                    {cert.logo ? (
                                        <div className="relative h-8 w-8 overflow-hidden rounded-md bg-white/95 p-1">
                                            <Image
                                                src={cert.logo}
                                                alt={cert.logoAlt}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    ) : (
                                        <BadgeCheck size={18} />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-slate-100 font-semibold text-sm md:text-base leading-snug">
                                        {cert.title}
                                    </p>

                                    <p className="text-slate-500 text-xs md:text-sm mt-1 font-mono uppercase tracking-wide">
                                        {cert.issuer}
                                    </p>

                                    {cert.credentialId && (
                                        <p className="text-slate-400 text-xs mt-3 font-mono break-all">
                                            Credential ID:{" "}
                                            <span className="text-slate-300">{cert.credentialId}</span>
                                        </p>
                                    )}

                                    {cert.verifyUrl && (
                                        <a
                                            href={cert.verifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors"
                                        >
                                            Verify Credential <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SpotlightCard>
        </motion.div>
    );
}