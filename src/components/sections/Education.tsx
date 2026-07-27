import { motion } from "motion/react";
import {
  GraduationCap,
  Calendar,
  BadgeCheck,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
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
  const isCyan = tone === "cyan";
  return (
    <GlassCard tone={tone} interactive className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border",
              isCyan
                ? "bg-brand-cyan-soft text-brand-cyan"
                : "bg-brand-orange-soft text-brand-orange",
            )}
            aria-hidden
          >
            {edu.institutionLogo ? (
              <img
                src={edu.institutionLogo}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <GraduationCap className="h-5 w-5" />
            )}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight">
              {edu.degree}
            </h3>
            {edu.branch && (
              <p
                className={cn(
                  "mt-1 text-sm font-medium",
                  isCyan ? "text-brand-cyan" : "text-brand-orange",
                )}
              >
                {edu.branch}
              </p>
            )}
          </div>
        </div>
        {edu.status && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <BadgeCheck className="h-3 w-3" aria-hidden />
            {edu.status}
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <MetaRow label="Institution" value={edu.institution} />
        {edu.university && <MetaRow label="University" value={edu.university} />}
        <MetaRow
          label="Period"
          value={
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              {edu.period}
            </span>
          }
        />
        {edu.gpa && <MetaRow label="GPA" value={edu.gpa} />}
      </dl>

      {edu.description && (
        <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
          {edu.description}
        </p>
      )}

      {edu.coursework && edu.coursework.length > 0 && (
        <SubSection
          icon={<BookOpen className="h-3.5 w-3.5" aria-hidden />}
          label="Key coursework"
        >
          <ul className="flex flex-wrap gap-2">
            {edu.coursework.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-foreground/90"
              >
                {c}
              </li>
            ))}
          </ul>
        </SubSection>
      )}

      {edu.activities && edu.activities.length > 0 && (
        <SubSection
          icon={<Users className="h-3.5 w-3.5" aria-hidden />}
          label="Activities"
        >
          <ul className="space-y-1.5">
            {edu.activities.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 text-sm text-foreground/90"
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    isCyan ? "bg-brand-cyan" : "bg-brand-orange",
                  )}
                  aria-hidden
                />
                {a}
              </li>
            ))}
          </ul>
        </SubSection>
      )}

      {edu.certifications && edu.certifications.length > 0 && (
        <SubSection
          icon={<Award className="h-3.5 w-3.5" aria-hidden />}
          label="Academic certifications"
        >
          <ul className="flex flex-wrap gap-2">
            {edu.certifications.map((c) => (
              <li
                key={c}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  isCyan
                    ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                    : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
                )}
              >
                <BadgeCheck className="h-3 w-3" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </SubSection>
      )}
    </GlassCard>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground/90">{value}</dd>
    </div>
  );
}

function SubSection({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
