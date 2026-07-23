import { motion } from "motion/react";
import { TrendingUp, Sparkles, Activity, Database } from "lucide-react";

/**
 * Analytics-inspired hero visual. No profile photo — instead we stack
 * floating dashboard cards, a mini chart, and gradient blobs.
 */
export function AnalyticsVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* gradient blobs */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 40% at 30% 30%, var(--brand-orange-soft), transparent 70%), radial-gradient(40% 40% at 70% 70%, var(--brand-cyan-soft), transparent 70%)",
        }}
      />

      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2rem] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-strong absolute inset-x-6 top-10 rounded-3xl p-5 shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Insights
            </p>
            <p className="mt-1 font-display text-xl font-semibold">
              +48.2%
            </p>
          </div>
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            <TrendingUp className="h-4 w-4" />
          </span>
        </div>
        <MiniChart />
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          {["Mon", "Wed", "Fri"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </motion.div>

      {/* Floating pill: model */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.3 },
          x: { duration: 0.6, delay: 0.3 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="glass absolute left-0 top-1/2 flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="text-xs">
          <p className="font-medium">AI Model</p>
          <p className="text-muted-foreground">Confidence 96%</p>
        </div>
      </motion.div>

      {/* Floating pill: query */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          x: { duration: 0.6, delay: 0.5 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="glass absolute -right-2 top-4 flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-cyan-soft text-brand-cyan">
          <Database className="h-4 w-4" />
        </span>
        <div className="text-xs font-mono">
          <p className="text-muted-foreground">SELECT count(*)</p>
          <p>FROM insights;</p>
        </div>
      </motion.div>

      {/* Floating pill: live */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.7 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="glass absolute -bottom-2 left-6 flex items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-orange-soft text-brand-orange">
          <Activity className="h-4 w-4" />
        </span>
        <div className="text-xs">
          <p className="font-medium">Live pipeline</p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan" />
            2.4M rows / min
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function MiniChart() {
  const points = [8, 22, 14, 32, 24, 44, 36, 58, 48, 66, 60, 82];
  const max = Math.max(...points);
  const w = 240;
  const h = 90;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-4 h-24 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-orange)" />
          <stop offset="100%" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#hero-chart-fill)" />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#hero-chart-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
      />
    </svg>
  );
}
