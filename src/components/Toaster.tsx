"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";
type ToastEvent = { message: string; type: ToastType; id: number };

export const toast = {
  success: (msg: string) => dispatch(msg, "success"),
  error: (msg: string) => dispatch(msg, "error"),
  info: (msg: string) => dispatch(msg, "info"),
};

const dispatch = (message: string, type: ToastType) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent<ToastEvent>("toast", {
      detail: { message, type, id: Date.now() },
    });
    window.dispatchEvent(event);
  }
};

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastEvent[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEvent>;
      setToasts((prev) => [...prev, customEvent.detail]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== customEvent.detail.id));
      }, 3000);
    };
    window.addEventListener("toast", handleToast);
    return () => window.removeEventListener("toast", handleToast);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pointer-events-auto bg-card border border-line p-4 rounded-lg flex items-center gap-3 min-w-[300px]"
          >
            {t.type === "success" && (
              <CheckCircle size={18} className="text-accent" />
            )}
            {t.type === "error" && (
              <AlertCircle size={18} className="text-bad" />
            )}
            <span className="text-sm font-mono text-ink">
              {t.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
