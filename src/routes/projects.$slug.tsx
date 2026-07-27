import { useState } from "react";
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
  Network,
  ChevronRight,
  Expand,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { Lightbox } from "@/components/ui/lightbox";
import { projects } from "@/content";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
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
    const url = `https://insight-aura-space.lovable.app/projects/${params.slug}`;
    const image = project.cover;

    const creativeWork = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.title,
      description,
      url,
      ...(image ? { image } : {}),
      ...(project.year ? { datePublished: project.year } : {}),
      author: { "@type": "Person", name: "Jaykumar Patel" },
      keywords: project.technologies.join(", "),
      genre: project.category,
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://insight-aura-space.lovable.app/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://insight-aura-space.lovable.app/#projects" },
        { "@type": "ListItem", position: 3, name: project.title, item: url },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(creativeWork) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
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
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">
                    Screenshots
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Click to expand
                  </span>
                </div>
                <ScreenshotGallery
                  images={project.screenshots}
                  title={project.title}
                />
              </GlassCard>
            )}

            {project.architecture && (
              <GlassCard tone={tone}>
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <h2 className="font-display text-lg font-semibold">
                    {project.architecture.title ?? "Architecture"}
                  </h2>
                </div>
                {project.architecture.description && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.architecture.description}
                  </p>
                )}
                {project.architecture.diagramUrl ? (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={project.architecture.diagramUrl}
                      alt={`${project.title} architecture diagram`}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </div>
                ) : (
                  <ArchitectureDiagramPlaceholder
                    nodes={project.architecture.nodes ?? []}
                    tone={tone}
                  />
                )}
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

      <RelatedProjects current={project} />
    </article>
  );
}

function RelatedProjects({ current }: { current: Project }) {
  const slugs = current.relatedSlugs ?? [];
  const related = (
    slugs.length
      ? slugs
          .map((s) => projects.find((p) => p.slug === s))
          .filter((p): p is Project => Boolean(p))
      : projects.filter((p) => p.slug !== current.slug).slice(0, 2)
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Section
      size="xl"
      eyebrow="Keep exploring"
      title="Related case studies"
      description="Other projects that share tools, themes, or intent."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => {
          const tone = p.tone ?? "orange";
          const isCyan = tone === "cyan";
          const preview = p.screenshots?.[0]?.src ?? p.cover;
          return (
            <Link
              key={p.id}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              preload="intent"
              aria-label={`${p.title} — ${p.category} case study`}
              className="group block focus:outline-none focus-visible:ring-focus"
            >
              <GlassCard tone={tone} interactive className="flex h-full flex-col gap-4 p-0">
                <div
                  className="relative aspect-[16/9] overflow-hidden rounded-t-3xl border-b border-border"
                  style={{
                    background: isCyan
                      ? "radial-gradient(60% 60% at 30% 30%, var(--brand-cyan-soft), transparent 70%), var(--surface-1)"
                      : "radial-gradient(60% 60% at 30% 30%, var(--brand-orange-soft), transparent 70%), var(--surface-1)",
                  }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <LineChart
                        className={cn(
                          "h-8 w-8",
                          isCyan ? "text-brand-cyan" : "text-brand-orange",
                        )}
                        aria-hidden
                      />
                    </div>
                  )}
                  <span
                    className={cn(
                      "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] backdrop-blur",
                      isCyan
                        ? "border-brand-cyan/30 bg-brand-cyan-soft/80 text-brand-cyan"
                        : "border-brand-orange/30 bg-brand-orange-soft/80 text-brand-orange",
                    )}
                  >
                    <Sparkles className="h-3 w-3" aria-hidden />
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border bg-surface-2/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground/90"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={cn(
                      "mt-auto inline-flex items-center gap-1 text-sm font-medium",
                      isCyan ? "text-brand-cyan" : "text-brand-orange",
                    )}
                  >
                    Read case study
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

function ScreenshotGallery({
  images,
  title,
}: {
  images: { src: string; alt: string }[];
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <ul
        className="mt-4 grid gap-4 sm:grid-cols-2"
        aria-label={`${title} screenshots`}
      >
        {images.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open screenshot: ${s.alt}`}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-border focus:outline-none focus-visible:ring-focus"
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface-1/80 text-foreground/90 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
              >
                <Expand className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}

function ArchitectureDiagramPlaceholder({
  nodes,
  tone,
}: {
  nodes: string[];
  tone: "orange" | "cyan";
}) {
  const isCyan = tone === "cyan";
  const list = nodes.length ? nodes : ["Input", "Process", "Output"];
  return (
    <div
      className="mt-4 relative overflow-hidden rounded-2xl border border-border p-5"
      style={{
        background: isCyan
          ? "radial-gradient(60% 60% at 20% 20%, var(--brand-cyan-soft), transparent 70%), var(--surface-1)"
          : "radial-gradient(60% 60% at 20% 20%, var(--brand-orange-soft), transparent 70%), var(--surface-1)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex flex-wrap items-center gap-2">
        {list.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-xl border bg-surface-2/80 px-3 py-2 text-xs font-medium",
                isCyan
                  ? "border-brand-cyan/30 text-brand-cyan"
                  : "border-brand-orange/30 text-brand-orange",
              )}
            >
              {n}
            </span>
            {i < list.length - 1 && (
              <ChevronRight
                className="h-4 w-4 text-muted-foreground"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
      <p className="relative mt-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Architecture diagram placeholder
      </p>
    </div>
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
