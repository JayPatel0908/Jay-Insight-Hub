import { motion } from "motion/react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { currentlyLearning } from "@/content";
import { cn } from "@/lib/utils";

export function CurrentlyLearning() {
  return (
    <Section
      id="learning"
      eyebrow="Currently Learning"
      title={
        <>
          Skills I'm actively{" "}
          <span className="text-gradient-brand">leveling up</span>.
        </>
      }
      description="A dashboard view of what's on my desk right now — the tools, languages, and ideas I'm putting reps into."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {currentlyLearning.map((topic, i) => {
          const Icon =
            (Icons[topic.icon as keyof typeof Icons] as LucideIcon) ??
            Icons.Sparkles;
          const isCyan = topic.tone === "cyan";
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <GlassCard
                tone={topic.tone}
                interactive
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-2xl border",
                        isCyan
                          ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                          : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
                      )}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-tight">
                        {topic.name}
                      </h3>
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {topic.level}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums",
                      isCyan
                        ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                        : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
                    )}
                  >
                    {topic.progress}%
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>

                <div className="mt-auto">
                  <div
                    role="progressbar"
                    aria-valuenow={topic.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${topic.name} progress`}
                    className="relative h-2 w-full overflow-hidden rounded-full bg-surface-2"
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${topic.progress}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        isCyan
                          ? "bg-gradient-to-r from-brand-cyan/70 to-brand-cyan"
                          : "bg-gradient-to-r from-brand-orange/70 to-brand-orange",
                      )}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
