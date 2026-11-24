import { ReactNode } from "react";

// Flat bordered surface used across the site.
export default function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-card border border-line bg-card shadow-[0_1px_0_rgb(var(--line)/0.6)] ${className}`}
    >
      {children}
    </div>
  );
}
