"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

// Certifications from the evidence bank (v1.9j). Professional Cloud Architect is primary and always first.
const cert = {
    title: "Professional Cloud Architect",
    issuer: "Google Cloud Certified",
    credentialId: "5f09da7209a24931a67cbc3881df84c4",
    verifyUrl: "https://www.credly.com/badges/498cdb19-b30a-45d1-9221-7d44ff636c66/public_url",
};

// No credential ID, link or date is recorded for this one, so none is shown.
const secondary = { title: "Wipro Java Full Stack Certification", issuer: "Wipro" };

export default function CertificationsCard() {
    return (
        <div className="md:col-span-12 rounded-card border border-line bg-card" id="certifications">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-white">
                    <Image src="/google-cloud.png" alt="Google Cloud" fill className="object-contain p-2" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-faint mb-1">{cert.issuer}</p>
                    <p className="font-display text-xl md:text-2xl font-semibold text-ink leading-snug">{cert.title}</p>
                    <p className="text-faint text-xs mt-1 font-mono break-all">Credential ID {cert.credentialId}</p>
                </div>
                <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10 transition-colors shrink-0"
                >
                    Verify on Credly <ExternalLink size={13} />
                </a>
            </div>
            <div className="border-t border-line px-5 py-3 text-sm text-muted">
                Also: {secondary.title} <span className="text-faint">({secondary.issuer})</span>
            </div>
        </div>
    );
}
