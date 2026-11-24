"use client";

import { Search, Sun, Moon, FileText } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

const navItems = [
  { name: "Experience", href: "#experience" },
  { name: "Impact", href: "#impact" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// --- theme: explicit choice in <html data-theme>, otherwise the OS setting ---
const themeListeners = new Set<() => void>();
const subscribeTheme = (cb: () => void) => {
  themeListeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    themeListeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
};
const getIsDark = () => {
  const t = document.documentElement.dataset.theme;
  if (t) return t === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const noopSubscribe = () => () => {};

export default function Navbar() {
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => navigator.userAgent.toUpperCase().includes("MAC"),
    () => true,
  );
  const isDark = useSyncExternalStore(subscribeTheme, getIsDark, () => false);

  const toggleTheme = useCallback(() => {
    const next = getIsDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: choice lasts for this page view */
    }
    themeListeners.forEach((l) => l());
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      id="navbar"
      className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a href="#home" className="flex items-center gap-2.5 min-w-0" aria-label="Kulmeet Singh, home">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink font-display text-sm font-bold text-paper">
            KS
          </span>
          <span className="truncate font-display text-base font-semibold tracking-tight text-ink">
            Kulmeet Singh
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted hover:text-ink hover:bg-card2 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="/Kulmeet_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted hover:text-ink hover:bg-card2 transition-colors"
          >
            <FileText size={15} /> Résumé
          </a>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted hover:text-ink hover:bg-card2 transition-colors"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="inline-flex h-8 items-center gap-2 rounded-md border border-line px-2.5 text-muted hover:text-ink hover:bg-card2 transition-colors"
          >
            <Search size={14} />
            <span className="hidden sm:block font-mono text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
