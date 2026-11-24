import { ReactNode } from "react";

// Left-aligned section header: mono kicker, serif title, optional intro.
export default function SectionHeader({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 md:mb-12 max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent mb-4">
        <span>{index}</span>
        <span className="h-px w-8 bg-accent/50" aria-hidden />
        <span>{kicker}</span>
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.08]">
        {title}
      </h2>
      {children && <div className="mt-5 text-base md:text-lg text-muted leading-relaxed">{children}</div>}
    </header>
  );
}
