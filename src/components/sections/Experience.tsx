import { motion } from "motion/react";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { experiences } from "@/content";
import type { Experience as ExperienceType } from "@/content/types";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I've been{" "}
          <span className="text-gradient-brand">learning by doing</span>.
        </>
      }
      description="Real-world work that sharpened my analytical, research and communication skills."
    >
      <ol className="relative mx-auto max-w-3xl border-l border-border/80 pl-6 sm:pl-8">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} index={i} />
        ))}
      </ol>
    </Section>
  );
}

function ExperienceItem({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const tone = exp.tone ?? "cyan";
  const isCyan = tone === "cyan";
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative mb-8 last:mb-0"
    >
      <span
        className={cn(
          "absolute -left-[35px] top-3 grid h-4 w-4 place-items-center rounded-full ring-4 ring-background sm:-left-[43px]",
          isCyan
            ? "bg-brand-cyan shadow-[var(--shadow-glow-cyan)]"
            : "bg-brand-orange shadow-[var(--shadow-glow-orange)]",
        )}
        aria-hidden
      />
      <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/40 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
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
              {exp.organizationLogo ? (
                <img
                  src={exp.organizationLogo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Briefcase className="h-5 w-5" />
              )}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold leading-tight">
                {exp.role}
              </h3>
              <p
                className={cn(
                  "mt-0.5 flex items-center gap-1.5 text-sm font-medium",
                  isCyan ? "text-brand-cyan" : "text-brand-orange",
                )}
              >
                {exp.organizationUrl ? (
                  <a
                    href={exp.organizationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 rounded-sm hover:underline focus:outline-none focus-visible:ring-focus"
                    aria-label={`${exp.organization} website`}
                  >
                    {exp.organization}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ) : (
                  exp.organization
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {exp.period}
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 font-medium uppercase tracking-[0.14em]">
              {exp.type}
            </span>
            {exp.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {exp.location}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Responsibilities
            </p>
            <ul className="mt-3 space-y-2">
              {exp.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      isCyan ? "bg-brand-cyan" : "bg-brand-orange",
                    )}
                    aria-hidden
                  />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Skills Gained
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {exp.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-foreground/90"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {exp.technologies && exp.technologies.length > 0 && (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Technologies
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <li
                      key={t}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                        isCyan
                          ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                          : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isCyan ? "bg-brand-cyan" : "bg-brand-orange",
                        )}
                        aria-hidden
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
