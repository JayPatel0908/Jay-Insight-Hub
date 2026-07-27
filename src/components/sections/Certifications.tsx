import { motion } from "motion/react";
import {
  Award,
  ExternalLink,
  Calendar,
  FileText,
  BadgeCheck,
  Hash,
} from "lucide-react";
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
  const isCyan = tone === "cyan";
  const verifyHref = cert.verificationUrl ?? cert.credentialUrl;
  return (
    <GlassCard tone={tone} interactive className="flex h-full flex-col p-0">
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden rounded-t-3xl border-b border-border"
        style={{
          background: isCyan
            ? "radial-gradient(60% 80% at 30% 30%, var(--brand-cyan-soft), transparent 70%)"
            : "radial-gradient(60% 80% at 30% 30%, var(--brand-orange-soft), transparent 70%)",
        }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.name} certificate`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className={cn(
                "relative z-10 grid h-14 w-14 place-items-center rounded-2xl border",
                isCyan
                  ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                  : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
              )}
              aria-hidden
            >
              <Award className="h-6 w-6" />
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.18em]",
              isCyan ? "text-brand-cyan" : "text-brand-orange",
            )}
          >
            {cert.organization}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-tight">
            {cert.name}
          </h3>
        </div>

        <dl className="grid grid-cols-2 gap-2 text-xs">
          <MetaTile
            icon={<Calendar className="h-3 w-3" aria-hidden />}
            label="Issued"
            value={cert.issueDate}
          />
          {cert.expiryDate && (
            <MetaTile
              icon={<Calendar className="h-3 w-3" aria-hidden />}
              label="Expires"
              value={cert.expiryDate}
            />
          )}
          {cert.credentialId && (
            <MetaTile
              icon={<Hash className="h-3 w-3" aria-hidden />}
              label="Credential"
              value={cert.credentialId}
              mono
            />
          )}
        </dl>

        {cert.skills && cert.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-surface-2/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground/90"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4">
          {cert.pdfUrl && (
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Preview ${cert.name} certificate PDF`}
            >
              <Button
                variant="glass"
                size="sm"
                leftIcon={<FileText className="h-3.5 w-3.5" aria-hidden />}
              >
                PDF
              </Button>
            </a>
          )}
          {verifyHref && (
            <a
              href={verifyHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Verify ${cert.name} credential`}
              className="ml-auto"
            >
              <Button
                variant="outline"
                size="sm"
                leftIcon={<BadgeCheck className="h-3.5 w-3.5" aria-hidden />}
                rightIcon={<ExternalLink className="h-3 w-3" aria-hidden />}
              >
                Verify
              </Button>
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function MetaTile({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/70 p-2">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "mt-0.5 truncate text-[11px] font-medium text-foreground/90",
          mono && "font-mono",
        )}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
