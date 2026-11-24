"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

const CALENDAR_URL = "https://calendly.com/singhkulmeet3/30min";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-paper/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none" id="booking">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl h-[85vh] bg-card border border-line rounded-card overflow-hidden pointer-events-auto flex flex-col relative"
            >
              {/* Window Header */}
              <div className="h-12 bg-card border-b border-line flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-bad hover:bg-bad transition-colors"
                    />
                    <div className="w-3 h-3 rounded-full bg-signal" />
                    <div className="w-3 h-3 rounded-full bg-ok" />
                  </div>
                  <div className="h-4 w-px bg-ink/10 mx-1" />
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <ShieldCheck size={12} className="text-accent" />
                    <span className="uppercase tracking-wider">
                      Secure Uplink :: Scheduling Protocol
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-ink/5 rounded-md text-faint hover:text-ink transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 relative bg-card">
                {/* Loading Spinner overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10 text-accent gap-4">
                    <Loader2 size={40} className="animate-spin" />
                    <span className="font-mono text-sm tracking-widest animate-pulse">
                      ESTABLISHING CONNECTION...
                    </span>
                  </div>
                )}

                <iframe
                  src={CALENDAR_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  onLoad={() => setIsLoading(false)}
                  title="Schedule Interview"
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
