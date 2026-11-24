import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";

// Setup Inter for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Setup Space Grotesk for headings and impact numbers
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const description =
  "Kulmeet Singh, Software Engineer (Payments Data Platform, HSBC, Pune) focused on GCP data and platform engineering and reliability: Apache Beam/Dataflow pipelines, Terraform on Google Cloud, Cloud Monitoring alerting. Google Cloud Certified Professional Cloud Architect.";

export const metadata: Metadata = {
  title: "Kulmeet Singh | Software Engineer · GCP Data & Platform Engineering",
  description,
  keywords: [
    "Software Engineer",
    "GCP",
    "Google Cloud Professional Cloud Architect",
    "Data Engineering",
    "Platform Engineering",
    "Reliability",
    "Dataflow",
    "Apache Beam",
    "BigQuery",
    "Terraform",
    "Pune",
  ],
  openGraph: {
    title: "Kulmeet Singh | Software Engineer · GCP Data & Platform Engineering",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth theme-blue">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans relative bg-slate-950 text-slate-200 antialiased`}
      >
        <div className="bg-noise" />

        <Navbar />
        <BackgroundGrid />

        {children}
      </body>
    </html>
  );
}