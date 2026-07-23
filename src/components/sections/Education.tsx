import { motion } from "motion/react";
import { GraduationCap, Calendar, BadgeCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { education } from "@/content";
import type { Education as EducationType } from "@/content/types";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={
        <>
          The academic <span className="text-gradient-brand">foundation</span>.
        </>
      }
      description="Formal study that anchors my curiosity in engineering fundamentals."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <EducationCard edu={edu} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function EducationCard({ edu }: { edu: EducationType }) {
  const tone = edu.tone ?? "orange";
  return (
    <GlassCard tone={tone} interactive className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
              tone === "cyan"
                ? "bg-brand-cyan-soft text-brand-cyan"
                : "bg-brand-orange-soft text-brand-orange",
            )}
          >
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight">
              {edu.degree}
            </h3>
            {edu.branch && (
              <p
                className={cn(
                  "mt-1 text-sm font-medium",
                  tone === "cyan" ? "text-brand-cyan" : "text-brand-orange",
                )}
              >
                {edu.branch}
              </p>
            )}
          </div>
        </div>
        {edu.status && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <BadgeCheck className="h-3 w-3" />
            {edu.status}
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-muted-foreground">Institution</dt>
          <dd className="text-right font-medium text-foreground/90">
            {edu.institution}
          </dd>
        </div>
        {edu.university && (
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="text-muted-foreground">University</dt>
            <dd className="text-right font-medium text-foreground/90">
              {edu.university}
            </dd>
          </div>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-muted-foreground">Period</dt>
          <dd className="inline-flex items-center gap-1.5 text-right font-medium text-foreground/90">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            {edu.period}
          </dd>
        </div>
      </dl>

      {edu.description && (
        <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
          {edu.description}
        </p>
      )}
    </GlassCard>
  );
}
