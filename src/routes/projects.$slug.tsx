import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Sparkles,
  Target,
  Lightbulb,
  ListChecks,
  Wrench,
  Rocket,
  GraduationCap,
  LineChart,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { projects } from "@/content";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Jaykumar Patel" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case Study | Jaykumar Patel`;
    const description = project.overview ?? project.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
  errorComponent: ({ error }) => (
    <Section>
      <p className="text-sm text-muted-foreground">
        Couldn't load this project: {error.message}
      </p>
    </Section>
  ),
  notFoundComponent: () => (
    <Section
      eyebrow="Not found"
      title="This project doesn't exist"
      description="It may have been renamed or removed. Head back to the project list."
    >
      <Link to="/">
        <Button variant="gradient" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Home
        </Button>
      </Link>
    </Section>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const tone = project.tone ?? "orange";
  const isCyan = tone === "cyan";

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-6 sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: isCyan
              ? "radial-gradient(50% 40% at 20% 10%, var(--brand-cyan-soft), transparent 60%), radial-gradient(40% 40% at 90% 20%, var(--brand-orange-soft), transparent 60%)"
              : "radial-gradient(50% 40% at 20% 10%, var(--brand-orange-soft), transparent 60%), radial-gradient(40% 40% at 90% 20%, var(--brand-cyan-soft), transparent 60%)",
          }}
        />
        <Container size="xl">
          <div className="mb-6">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus:outline-none focus-visible:ring-focus"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to Projects
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
                  isCyan
                    ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                    : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
                )}
              >
                <Sparkles className="h-3 w-3" aria-hidden />
                {project.category}
              </span>
              {project.year && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  <Calendar className="h-3 w-3" aria-hidden />
                  {project.year}
                </span>
              )}
            </div>

            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
              {project.overview ?? project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} on GitHub`}
                >
                  <Button
                    variant="outline"
                    leftIcon={<Github className="h-4 w-4" aria-hidden />}
                  >
                    View on GitHub
                  </Button>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} live demo`}
                >
                  <Button
                    variant="gradient"
                    rightIcon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
                  >
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Cover */}
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border"
        >
          <CoverImage project={project} tone={tone} />
        </motion.div>
      </Container>

      {/* Body */}
      <Section size="xl" className="pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* Left: narrative */}
          <div className="flex flex-col gap-6">
            <NarrativeCard
              icon={<Target className="h-4 w-4" aria-hidden />}
              label="Problem"
              tone="orange"
            >
              {project.problem}
            </NarrativeCard>

            <NarrativeCard
              icon={<Lightbulb className="h-4 w-4" aria-hidden />}
              label="My Solution"
              tone="cyan"
            >
              {project.solution}
            </NarrativeCard>

            <GlassCard tone={tone}>
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-muted-foreground" aria-hidden />
                <h2 className="font-display text-lg font-semibold">Features</h2>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-foreground/90"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        isCyan ? "bg-brand-cyan" : "bg-brand-orange",
                      )}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {project.screenshots && project.screenshots.length > 0 && (
              <GlassCard>
                <h2 className="font-display text-lg font-semibold">
                  Screenshots
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((s) => (
                    <div
                      key={s.src}
                      className="relative aspect-video overflow-hidden rounded-2xl border border-border"
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <GlassCard tone="orange">
                <div className="flex items-center gap-2">
                  <Wrench
                    className="h-4 w-4 text-brand-orange"
                    aria-hidden
                  />
                  <h2 className="font-display text-lg font-semibold">
                    Challenges Faced
                  </h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            <GlassCard tone="cyan">
              <div className="flex items-center gap-2">
                <GraduationCap
                  className="h-4 w-4 text-brand-cyan"
                  aria-hidden
                />
                <h2 className="font-display text-lg font-semibold">
                  Key Learnings
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                {project.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan"
                      aria-hidden
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {project.futureImprovements &&
              project.futureImprovements.length > 0 && (
                <GlassCard tone="orange">
                  <div className="flex items-center gap-2">
                    <Rocket
                      className="h-4 w-4 text-brand-orange"
                      aria-hidden
                    />
                    <h2 className="font-display text-lg font-semibold">
                      Future Improvements
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {project.futureImprovements.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}
          </div>

          {/* Right: meta rail */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:h-fit">
            <GlassCard>
              <h2 className="font-display text-lg font-semibold">Overview</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <MetaRow label="Category" value={project.category} />
                {project.year && (
                  <MetaRow label="Year" value={project.year} />
                )}
                <MetaRow
                  label="Status"
                  value={project.featured ? "Featured" : "In Portfolio"}
                />
              </dl>
            </GlassCard>

            <GlassCard tone={tone}>
              <h2 className="font-display text-lg font-semibold">
                Technologies
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-foreground/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="font-display text-lg font-semibold">Explore</h2>
              <div className="mt-4 flex flex-col gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      leftIcon={<Github className="h-4 w-4" aria-hidden />}
                    >
                      GitHub
                    </Button>
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button
                      variant="glass"
                      className="w-full justify-center"
                      leftIcon={
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      }
                    >
                      Live Demo
                    </Button>
                  </a>
                )}
                <Link to="/" hash="projects">
                  <Button
                    variant="gradient"
                    className="w-full justify-center"
                    leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden />}
                  >
                    Back to Projects
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </aside>
        </div>
      </Section>
    </article>
  );
}

function NarrativeCard({
  icon,
  label,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "orange" | "cyan";
  children: React.ReactNode;
}) {
  const isCyan = tone === "cyan";
  return (
    <GlassCard tone={tone}>
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
          isCyan
            ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
            : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
        )}
      >
        {icon}
        {label}
      </div>
      <p className="mt-4 text-base text-foreground/90">{children}</p>
    </GlassCard>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm font-medium text-foreground/90">{value}</dd>
    </div>
  );
}

function CoverImage({
  project,
  tone,
}: {
  project: Project;
  tone: "orange" | "cyan";
}) {
  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt={`${project.title} cover`}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  const isCyan = tone === "cyan";
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: isCyan
          ? "radial-gradient(60% 60% at 30% 30%, var(--brand-cyan-soft), transparent 70%), radial-gradient(60% 60% at 80% 80%, var(--brand-orange-soft), transparent 70%), var(--surface-1)"
          : "radial-gradient(60% 60% at 30% 30%, var(--brand-orange-soft), transparent 70%), radial-gradient(60% 60% at 80% 80%, var(--brand-cyan-soft), transparent 70%), var(--surface-1)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            className={cn(
              "grid h-16 w-16 place-items-center rounded-2xl border",
              isCyan
                ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
            )}
            aria-hidden
          >
            <LineChart className="h-7 w-7" />
          </span>
          <p className="max-w-[20ch] font-display text-2xl font-semibold text-foreground/90">
            {project.title}
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Cover image coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
