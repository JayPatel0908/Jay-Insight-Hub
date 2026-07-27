import { motion } from "motion/react";
import {
  Download,
  Eye,
  FileText,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { resumeMeta } from "@/content";

export function Resume() {
  const formattedDate = new Date(resumeMeta.lastUpdated).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title={
        <>
          The one-pager — <span className="text-gradient-brand">always current</span>.
        </>
      }
      description="Preview or download the latest version of my resume. Versioned so recruiters always see the freshest cut."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55 }}
        >
          <GlassCard tone="orange" interactive className="p-0">
            <div
  className="relative aspect-[8.5/11] w-full overflow-hidden rounded-3xl"
  aria-label="Resume preview"
>
  <iframe
    src={resumeMeta.fileUrl}
    title="Resume Preview"
    className="absolute inset-0 h-full w-full rounded-3xl"
    loading="lazy"
  />

  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"
  />
</div>
          </GlassCard>
        </motion.div>

        {/* Meta + actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <GlassCard tone="cyan" className="flex h-full flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan" aria-hidden>
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Resume
                </p>
                <h3 className="font-display text-xl font-semibold">
                  Jaykumar Patel — {resumeMeta.version}
                </h3>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <MetaTile
                icon={<CalendarClock className="h-3.5 w-3.5" aria-hidden />}
                label="Last updated"
                value={formattedDate}
              />
              <MetaTile
                icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />}
                label="Version"
                value={resumeMeta.version}
              />
              {resumeMeta.sizeKb && (
                <MetaTile
                  icon={<FileText className="h-3.5 w-3.5" aria-hidden />}
                  label="File size"
                  value={`${resumeMeta.sizeKb} KB`}
                />
              )}
              <MetaTile
                icon={<Download className="h-3.5 w-3.5" aria-hidden />}
                label="Format"
                value="PDF"
              />
            </dl>

            {resumeMeta.highlights && resumeMeta.highlights.length > 0 && (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Highlights
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  {resumeMeta.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              <a
                href={resumeMeta.fileUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button
                  variant="outline"
                  leftIcon={<Eye className="h-4 w-4" aria-hidden />}
                >
                  Preview
                </Button>
              </a>
              <a
                href={resumeMeta.fileUrl}
                download
                aria-label="Download resume PDF"
              >
                <Button
                  variant="gradient"
                  leftIcon={<Download className="h-4 w-4" aria-hidden />}
                >
                  Download PDF
                </Button>
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
}

function MetaTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-2/70 p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <dt className="text-[10px] font-medium uppercase tracking-[0.14em]">
          {label}
        </dt>
      </div>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ResumePlaceholder() {
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "radial-gradient(60% 60% at 30% 20%, var(--brand-orange-soft), transparent 70%), radial-gradient(60% 60% at 80% 80%, var(--brand-cyan-soft), transparent 70%), var(--surface-1)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div className="space-y-3">
          <div className="h-3 w-40 rounded-full bg-foreground/20" />
          <div className="h-2 w-24 rounded-full bg-foreground/10" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-foreground/10"
              style={{ width: `${90 - i * 8}%` }}
            />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-foreground/10"
              style={{ width: `${70 + (i % 3) * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
