import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

// Apply a saved light/dark choice before first paint (no flash).
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#141412" },
  ],
};

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} font-sans antialiased bg-paper text-ink`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
