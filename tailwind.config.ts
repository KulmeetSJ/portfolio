import type { Config } from "tailwindcss";

// "Field Notes" theme. Colors are CSS variables (RGB triplets) defined in
// globals.css, so light and dark mode share the same class names.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: v("paper"),
        card: v("card"),
        card2: v("card2"),
        ink: v("ink"),
        muted: v("muted"),
        faint: v("faint"),
        line: v("line"),
        accent: v("accent"),
        signal: v("signal"),
        ok: v("ok"),
        bad: v("bad"),
        term: {
          DEFAULT: v("term"),
          ink: v("term-ink"),
          ok: v("term-ok"),
          warn: v("term-warn"),
          bad: v("term-bad"),
          dim: v("term-dim"),
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
