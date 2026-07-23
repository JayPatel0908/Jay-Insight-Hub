import { motion } from "motion/react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { skillCategories } from "@/content";
import type { SkillCategory } from "@/content/types";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          A stack that spans <span className="text-gradient-brand">data, code, and ship-day</span>.
        </>
      }
      description="Grouped by how I actually use them — not by resume keywords."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <SkillCard category={cat} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = (Icons[category.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Sparkles;
  const iconWrapClass =
    category.tone === "cyan"
      ? "bg-brand-cyan-soft text-brand-cyan"
      : "bg-brand-orange-soft text-brand-orange";

  return (
    <GlassCard
      tone={category.tone === "neutral" ? "default" : category.tone}
      interactive
      className="h-full"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{category.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
        </div>
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", iconWrapClass)}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-brand-orange/40 hover:text-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
