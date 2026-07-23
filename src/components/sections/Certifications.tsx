import { motion } from "motion/react";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { certifications } from "@/content";
import type { Certification } from "@/content/types";
import { cn } from "@/lib/utils";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title={
        <>
          Learning that keeps{" "}
          <span className="text-gradient-brand">compounding</span>.
        </>
      }
      description="Focused programs I'm completing to deepen my analytics and AI toolkit. More on the way."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <CertificationCard cert={cert} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const tone = cert.tone ?? "orange";
  return (
    <GlassCard tone={tone} interactive className="flex h-full flex-col p-0">
      <div
        className="relative flex h-36 items-center justify-center overflow-hidden rounded-t-3xl"
        style={{
          background:
            tone === "cyan"
              ? "radial-gradient(60% 80% at 30% 30%, var(--brand-cyan-soft), transparent 70%)"
              : "radial-gradient(60% 80% at 30% 30%, var(--brand-orange-soft), transparent 70%)",
        }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.name} certificate`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}
        {!cert.image && (
          <span
            className={cn(
              "relative z-10 grid h-14 w-14 place-items-center rounded-2xl border",
              tone === "cyan"
                ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
            )}
          >
            <Award className="h-6 w-6" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.18em]",
              tone === "cyan" ? "text-brand-cyan" : "text-brand-orange",
            )}
          >
            {cert.organization}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-tight">
            {cert.name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {cert.issueDate}
          </span>
          <a
            href={cert.credentialUrl ?? "#"}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              Verify
            </Button>
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
