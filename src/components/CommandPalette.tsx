"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  X,
  Cpu,
  LayoutTemplate,
  Calendar, // <-- Import Calendar Icon
} from "lucide-react";

// Import the new Modal
import BookingModal from "./BookingModal";
import { EMAIL_ADDRESS } from "@/constants/consts";

type Action = {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  perform: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // NEW STATE: Control the booking modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Close handler to reuse logic
  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    document.body.style.overflow = "auto";
  }, []);

  const actions: Action[] = useMemo(
    () => [
      // --- NEW COMMAND: SCHEDULE INTERVIEW ---
      {
        id: "schedule",
        title: "Schedule Interview",
        category: "Connect",
        icon: <Calendar size={16} />,
        perform: () => setIsBookingOpen(true), // Opens the modal
      },
      // ---------------------------------------
      {
        id: "resume",
        title: "Download Resume",
        category: "Documents",
        icon: <FileText size={16} />,
        perform: () =>
          window.open("/Kulmeet_Singh_Jaggi_Resume.pdf", "_blank", "noopener,noreferrer"),
      },
      {
        id: "contact",
        title: "Contact Kulmeet (Email)",
        category: "Connect",
        icon: <Mail size={16} />,
        perform: () => {
          window.location.href = `mailto:${EMAIL_ADDRESS}`;
        },
      },
      {
        id: "github",
        title: "Open GitHub Profile",
        category: "Connect",
        icon: <Github size={16} />,
        perform: () =>
          window.open("https://github.com/KulmeetSJ", "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        title: "Open LinkedIn Profile",
        category: "Connect",
        icon: <Linkedin size={16} />,
        perform: () => window.open("https://www.linkedin.com/in/kulmeet-singh/", "_blank", "noopener,noreferrer"),
      },
      {
        id: "nav-experience",
        title: "Go to Experience",
        category: "Navigation",
        icon: <Briefcase size={16} />,
        perform: () =>
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "nav-impact",
        title: "Go to Impact at HSBC",
        category: "Navigation",
        icon: <Briefcase size={16} />,
        perform: () =>
          document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "nav-projects",
        title: "Go to Projects",
        category: "Navigation",
        icon: <LayoutTemplate size={16} />,
        perform: () =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "nav-architecture",
        title: "Go to PayFlow Sim Architecture",
        category: "Navigation",
        icon: <Cpu size={16} />,
        perform: () =>
          document
            .getElementById("architecture")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
    ],
    [],
  );

  const filteredActions =
    query === ""
      ? actions
      : actions.filter((action) =>
        action.title.toLowerCase().includes(query.toLowerCase()),
      );

  // Setup keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            document.body.style.overflow = "hidden";
            return true;
          }
          document.body.style.overflow = "auto";
          return false;
        });
      }
      // Close palette on escape, but ONLY if booking modal isn't open
      if (e.key === "Escape" && !isBookingOpen) closePalette();
    };

    const handleCustomEvent = () => {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, [closePalette, isBookingOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredActions.length) % filteredActions.length,
      );
    } else if (e.key === "Enter" && filteredActions.length > 0) {
      e.preventDefault();
      filteredActions[selectedIndex].perform();
      // Only close palette if NOT opening the booking modal (so we don't flash)
      if (filteredActions[selectedIndex].id !== "schedule") {
        closePalette();
      } else {
        // If scheduling, we keep palette technically open or close it?
        // Better to close palette visuals but keep state clean.
        // Actually, let's close the palette logic but open the booking logic.
        setIsOpen(false);
        setQuery("");
        // Don't reset overflow yet because BookingModal needs it hidden
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePalette}
              className="fixed inset-0 z-[100] bg-paper/60 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none" id="command-palette">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-card border border-line rounded-card overflow-hidden pointer-events-auto"
              >
                <div className="flex items-center px-4 py-4 border-b border-line">
                  <Search size={20} className="text-accent mr-3 shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent border-none outline-none text-ink text-lg placeholder:text-faint font-sans"
                  />
                  <button
                    onClick={closePalette}
                    className="p-1 rounded-md bg-ink/5 text-muted hover:text-ink hover:bg-ink/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                  {filteredActions.length === 0 ? (
                    <div className="py-12 text-center text-faint font-mono text-sm">
                      No results found for &quot;{query}&quot;
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {filteredActions.map((action, index) => {
                        const isSelected = index === selectedIndex;
                        return (
                          <div
                            key={action.id}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => {
                              action.perform();
                              if (action.id !== "schedule") {
                                closePalette();
                              } else {
                                setIsOpen(false);
                                setQuery("");
                              }
                            }}
                            className={`flex items-center justify-between px-4 py-3 rounded-md cursor-pointer transition-all duration-200 ${isSelected
                              ? "bg-accent/10 border border-accent/20"
                              : "bg-transparent border border-transparent hover:bg-ink/5"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-md ${isSelected ? "bg-accent/20 text-accent" : "bg-card2 text-muted"}`}
                              >
                                {action.icon}
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className={`text-sm font-bold ${isSelected ? "text-ink" : "text-muted"}`}
                                >
                                  {action.title}
                                </span>
                                <span className="text-[10px] font-mono text-faint uppercase tracking-widest mt-0.5">
                                  {action.category}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="text-accent text-xs font-mono hidden md:flex items-center gap-1">
                                Return <ChevronRight size={14} />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-paper/50 p-3 border-t border-line flex items-center justify-center gap-6 text-[10px] font-mono text-faint uppercase">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-ink/10 text-muted">
                      ↑
                    </kbd>{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-ink/10 text-muted">
                      ↓
                    </kbd>{" "}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-ink/10 text-muted">
                      Enter
                    </kbd>{" "}
                    to select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-ink/10 text-muted">
                      Esc
                    </kbd>{" "}
                    to close
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* RENDER THE BOOKING MODAL INDEPENDENTLY */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          document.body.style.overflow = "auto"; // Re-enable scroll when booking closes
        }}
      />
    </>
  );
}
