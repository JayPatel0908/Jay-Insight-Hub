import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Send,
  Download,
  CheckCircle2,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { profile, contactChannels } from "@/content";
import { mockContactService } from "@/lib/cloud/interfaces";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Please enter your name (2+ characters).";
  else if (name.length > 100) errors.name = "Name must be under 100 characters.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > 255) errors.email = "Email is too long.";

  if (subject.length < 3)
    errors.subject = "Subject should be at least 3 characters.";
  else if (subject.length > 150)
    errors.subject = "Subject must be under 150 characters.";

  if (message.length < 10)
    errors.message = "Message should be at least 10 characters.";
  else if (message.length > 1000)
    errors.message = "Message must be under 1000 characters.";

  return errors;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update =
    (field: keyof FormValues) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (touched[field]) setErrors(validate(next));
    };

  const blur = (field: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const submit = async (payload: FormValues) => {
    setStatus("sending");
    setSubmitError(null);
    try {
      // TODO(cloud): swap `mockContactService` for a Lovable Cloud–backed
      // ContactService implementation. UI states stay identical.
      await mockContactService.submit({
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim() || undefined,
        message: payload.message.trim(),
      });
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch (err) {
      console.error(err);
      setStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;
    await submit(values);
  };

  const retry = () => {
    if (status === "sending") return;
    void submit(values);
  };

  const reset = () => {
    setStatus("idle");
    setSubmitError(null);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build something <span className="text-gradient-brand">meaningful</span>.
        </>
      }
      description="Open to internships, analyst roles, and thoughtful collaborations. I usually reply within a day."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4"
        >
          <GlassCard tone="orange" className="flex flex-col gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold">Say hello</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The fastest ways to reach me.
              </p>
            </div>
            <ul className="grid gap-3">
              {contactChannels.map((c) => {
                const Icon =
                  (Icons[c.icon as keyof typeof Icons] as LucideIcon) ??
                  Icons.Link;
                const tone = c.tone ?? "orange";
                return (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      aria-label={`${c.label}: ${c.value}`}
                      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-1 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:bg-surface-2 focus:outline-none focus-visible:ring-focus"
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                          tone === "cyan"
                            ? "bg-brand-cyan-soft text-brand-cyan"
                            : "bg-brand-orange-soft text-brand-orange",
                        )}
                        aria-hidden
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {c.label}
                        </p>
                        <p className="truncate text-sm font-medium text-foreground/90">
                          {c.value}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            <a href={profile.resumeUrl} download className="mt-1">
              <Button
                variant="gradient"
                size="md"
                className="w-full"
                leftIcon={<Download className="h-4 w-4" aria-hidden />}
              >
                Download Resume
              </Button>
            </a>
          </GlassCard>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <GlassCard tone="cyan" className="h-full">
            {status === "sent" ? (
              <SuccessState onReset={reset} />
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                aria-busy={status === "sending"}
                className="flex h-full flex-col gap-4"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    Send a message
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share a project, role, or idea. I'll get back to you shortly.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    htmlFor="name"
                    error={touched.name ? errors.name : undefined}
                  >
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={100}
                      value={values.name}
                      onChange={update("name")}
                      onBlur={blur("name")}
                      placeholder="Jane Doe"
                      aria-invalid={Boolean(touched.name && errors.name)}
                      aria-describedby={
                        touched.name && errors.name ? "name-error" : undefined
                      }
                      className={cn(
                        "input-base",
                        touched.name && errors.name && "border-destructive/60",
                      )}
                    />
                  </Field>
                  <Field
                    label="Email"
                    htmlFor="email"
                    error={touched.email ? errors.email : undefined}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={255}
                      value={values.email}
                      onChange={update("email")}
                      onBlur={blur("email")}
                      placeholder="jane@company.com"
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={
                        touched.email && errors.email
                          ? "email-error"
                          : undefined
                      }
                      className={cn(
                        "input-base",
                        touched.email && errors.email && "border-destructive/60",
                      )}
                    />
                  </Field>
                </div>
                <Field
                  label="Subject"
                  htmlFor="subject"
                  error={touched.subject ? errors.subject : undefined}
                >
                  <input
                    id="subject"
                    name="subject"
                    required
                    maxLength={150}
                    value={values.subject}
                    onChange={update("subject")}
                    onBlur={blur("subject")}
                    placeholder="Internship opportunity, project inquiry…"
                    aria-invalid={Boolean(touched.subject && errors.subject)}
                    aria-describedby={
                      touched.subject && errors.subject
                        ? "subject-error"
                        : undefined
                    }
                    className={cn(
                      "input-base",
                      touched.subject &&
                        errors.subject &&
                        "border-destructive/60",
                    )}
                  />
                </Field>
                <Field
                  label="Message"
                  htmlFor="message"
                  error={touched.message ? errors.message : undefined}
                  hint={`${values.message.length}/1000`}
                >
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    value={values.message}
                    onChange={update("message")}
                    onBlur={blur("message")}
                    placeholder="Tell me a bit about what you're working on."
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={
                      touched.message && errors.message
                        ? "message-error"
                        : undefined
                    }
                    className={cn(
                      "input-base resize-none",
                      touched.message &&
                        errors.message &&
                        "border-destructive/60",
                    )}
                  />
                </Field>

                {status === "error" && submitError && (
                  <div
                    role="alert"
                    className="flex flex-wrap items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <span className="flex-1 min-w-0">{submitError}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={retry}
                      leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden />}
                    >
                      Retry
                    </Button>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-muted-foreground">
                    Delivered via mock service — swap-in ready for Lovable Cloud.
                  </p>
                  <Button
                    type="submit"
                    variant="gradient"
                    size="md"
                    disabled={status === "sending"}
                    leftIcon={
                      status === "sending" ? (
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden
                        />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden />
                      )
                    }
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-col items-center justify-center gap-4 py-8 text-center"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan">
        <CheckCircle2 className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold">Message sent</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you within a day.
        </p>
      </div>
      <Button variant="glass" size="sm" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  error,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal">{hint}</span>}
      </span>
      {children}
      {error && (
        <span
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-destructive"
        >
          <AlertCircle className="h-3 w-3" aria-hidden />
          {error}
        </span>
      )}
    </label>
  );
}
