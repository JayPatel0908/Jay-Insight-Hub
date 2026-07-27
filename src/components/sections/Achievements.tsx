import { motion } from "motion/react";
import {
  Trophy,
  Award,
  FlaskConical,
  Users,
  GitBranch,
  Rocket,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { achievements } from "@/content";
import type { Achievement, AchievementCategory } from "@/content/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<AchievementCategory, typeof Trophy> = {
  Hackathon: Rocket,
  Competition: Trophy,
  Award: Award,
  Research: FlaskConical,
  Leadership: Users,
  "Open Source": GitBranch,
};

export function Achievements() {
  if (!achievements?.length) return null;

  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={
        <>
          Milestones on the road to becoming a{" "}
          <span className="text-gradient-brand">data-driven engineer</span>.
        </>
      }
      description="Hackathons, internships, and self-directed work that shaped how I build and think."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <AchievementCard achievement={a} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const tone = achievement.tone ?? "orange";
  const isCyan = tone === "cyan";
  const Icon = CATEGORY_ICON[achievement.category] ?? Trophy;

  return (
    <GlassCard tone={tone} interactive className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
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
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
            isCyan
              ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
              : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
          )}
        >
          {achievement.category}
        </span>
      </div>

      {achievement.image && (
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
          <img
            src={achievement.image}
            alt={`${achievement.title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      <div>
        <h3 className="font-display text-lg font-semibold leading-tight">
          {achievement.title}
        </h3>
        {achievement.organization && (
          <p className="mt-1 text-sm text-muted-foreground">
            {achievement.organization}
          </p>
        )}
      </div>

      <p className="text-sm text-foreground/85">{achievement.description}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          {achievement.date}
        </span>
        {achievement.link && (
          <a
            href={achievement.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-orange hover:underline focus:outline-none focus-visible:ring-focus"
          >
            View
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </GlassCard>
  );
}
