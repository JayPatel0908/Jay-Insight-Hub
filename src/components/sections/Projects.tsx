import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  LineChart,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { projects } from "@/content";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | ProjectCategory;
type SortOption = "featured" | "newest" | "az";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "AI",
  "Data Analytics",
  "Web Development",
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A → Z" },
];

export function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });

    const sorted = [...list];
    if (sort === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "newest") {
      sorted.sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));
    } else {
      sorted.sort(
        (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
      );
    }
    return sorted;
  }, [query, category, sort]);

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={
        <>
          Selected work at the intersection of{" "}
          <span className="text-gradient-brand">data, AI and product</span>.
        </>
      }
      description="Projects that shaped how I think about analytics, AI-assisted workflows, and shipping software with intent."
    >
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 lg:mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex-1 sm:max-w-sm" htmlFor="project-search">
            <span className="sr-only">Search projects</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="project-search"
              type="search"
              placeholder="Search projects, tech, keywords…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-base pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus:outline-none focus-visible:ring-focus"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </label>

          <div className="flex items-center gap-2">
            <label
              htmlFor="project-sort"
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              Sort
            </label>
            <select
              id="project-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-base h-10 w-auto py-0 pr-8 text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Project categories"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-all focus:outline-none focus-visible:ring-focus",
                  active
                    ? "border-brand-orange/40 bg-brand-orange-soft text-brand-orange"
                    : "border-border bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No projects match your filters yet.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-3 text-sm font-medium text-brand-orange hover:underline focus:outline-none focus-visible:ring-focus"
          >
            Reset filters
          </button>
        </GlassCard>
      ) : (
        <div className="grid gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = project.tone ?? (index % 2 === 0 ? "orange" : "cyan");
  const reverse = index % 2 === 1;

  return (
    <GlassCard tone={tone} interactive className="group p-0">
      <div
        className={cn(
          "grid gap-0 md:grid-cols-[1.05fr_1fr]",
          reverse && "md:grid-cols-[1fr_1.05fr]",
        )}
      >
        <ProjectCover project={project} tone={tone} reverse={reverse} />

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
                tone === "cyan"
                  ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
                  : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
              )}
            >
              <Sparkles className="h-3 w-3" aria-hidden />
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Featured
              </span>
            )}
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {project.description}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Technologies
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium text-foreground/90"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

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
                  size="sm"
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
                aria-label={`${project.title} live demo`}
              >
                <Button
                  variant="glass"
                  size="sm"
                  leftIcon={<ExternalLink className="h-4 w-4" aria-hidden />}
                >
                  Live Demo
                </Button>
              </a>
            )}
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              aria-label={`View case study for ${project.title}`}
            >
              <Button
                variant="gradient"
                size="sm"
                rightIcon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                View Case Study
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function ProjectCover({
  project,
  tone,
  reverse,
}: {
  project: Project;
  tone: "orange" | "cyan";
  reverse: boolean;
}) {
  return (
    <div
      className={cn(
        "relative min-h-56 overflow-hidden md:min-h-full",
        reverse && "md:order-2",
      )}
    >
      {project.cover ? (
        <img
          src={project.cover}
          alt={`${project.title} preview`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <PlaceholderCover title={project.title} tone={tone} />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
      />
    </div>
  );
}

function PlaceholderCover({
  title,
  tone,
}: {
  title: string;
  tone: "orange" | "cyan";
}) {
  return (
    <div
      className="relative flex h-full min-h-56 items-center justify-center overflow-hidden"
      style={{
        background:
          tone === "cyan"
            ? "radial-gradient(60% 60% at 30% 30%, var(--brand-cyan-soft), transparent 70%), radial-gradient(60% 60% at 80% 80%, var(--brand-orange-soft), transparent 70%)"
            : "radial-gradient(60% 60% at 30% 30%, var(--brand-orange-soft), transparent 70%), radial-gradient(60% 60% at 80% 80%, var(--brand-cyan-soft), transparent 70%)",
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
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={cn(
            "grid h-14 w-14 place-items-center rounded-2xl border",
            tone === "cyan"
              ? "border-brand-cyan/30 bg-brand-cyan-soft text-brand-cyan"
              : "border-brand-orange/30 bg-brand-orange-soft text-brand-orange",
          )}
          aria-hidden
        >
          <LineChart className="h-6 w-6" />
        </span>
        <p className="max-w-[16ch] font-display text-lg font-semibold leading-tight text-foreground/90">
          {title}
        </p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Preview coming soon
        </p>
      </div>
    </div>
  );
}
