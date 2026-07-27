import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookMarked,
  Activity,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/action-button";
import { githubProfile } from "@/content";
import type { GitHubRepo } from "@/content/types";
import { cn } from "@/lib/utils";

export function GitHub() {
  const gh = githubProfile;
  const featured = useMemo(
    () => gh.repos.find((r) => r.id === gh.featuredRepoId) ?? gh.repos[0],
    [gh],
  );
  const otherRepos = gh.repos.filter((r) => r.id !== featured?.id).slice(0, 4);

  const stats = [
    { label: "Followers", value: gh.followers, icon: Users },
    { label: "Public repos", value: gh.publicRepos, icon: BookMarked },
    { label: "Total stars", value: gh.totalStars, icon: Star },
    { label: "Contributions / yr", value: gh.contributionsLastYear, icon: Activity },
  ];

  return (
    <Section
      id="github"
      eyebrow="Open Source"
      title={
        <>
          Building in public on{" "}
          <span className="text-gradient-brand">GitHub</span>.
        </>
      }
      description="A snapshot of repositories, languages and activity — real projects behind the case studies."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Profile + contribution placeholder */}
        <GlassCard tone="cyan" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                GitHub
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold">
                @{gh.username}
              </h3>
            </div>
            <a href={gh.url} target="_blank" rel="noreferrer noopener">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Github className="h-4 w-4" aria-hidden />}
                rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden />}
              >
                Visit profile
              </Button>
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border border-border bg-surface-2/70 p-3"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <s.icon className="h-3.5 w-3.5" aria-hidden />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
                    {s.label}
                  </span>
                </div>
                <p className="mt-1 font-display text-xl font-semibold text-foreground">
                  {s.value.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          <ContributionGraph seed={gh.contributionsLastYear} />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Top languages
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {gh.topLanguages.map((l) => (
                <span
                  key={l.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-medium"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: l.color ?? "var(--brand-orange)" }}
                    aria-hidden
                  />
                  {l.name}
                  <span className="text-muted-foreground">{l.percent}%</span>
                </span>
              ))}
            </div>
            <div
              className="mt-3 flex h-2 w-full overflow-hidden rounded-full border border-border bg-surface-2/70"
              role="img"
              aria-label="Top language distribution"
            >
              {gh.topLanguages.map((l) => (
                <span
                  key={l.name}
                  style={{
                    width: `${l.percent}%`,
                    background: l.color ?? "var(--brand-orange)",
                  }}
                />
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Featured + repo list */}
        <div className="flex flex-col gap-6">
          {featured && (
            <FeaturedRepo repo={featured} />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {otherRepos.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <RepoCard repo={r} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeaturedRepo({ repo }: { repo: GitHubRepo }) {
  return (
    <GlassCard tone="orange" interactive>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-brand-orange" aria-hidden />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-orange">
          Featured repository
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold">{repo.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{repo.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden />
          {repo.forks}
        </span>
      </div>
      <div className="mt-5">
        <a href={repo.url} target="_blank" rel="noreferrer noopener">
          <Button
            variant="gradient"
            size="sm"
            rightIcon={<ExternalLink className="h-4 w-4" aria-hidden />}
          >
            View repository
          </Button>
        </a>
      </div>
    </GlassCard>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer noopener"
      className="block h-full focus:outline-none focus-visible:ring-focus"
    >
      <GlassCard interactive className="h-full">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-base font-semibold">{repo.name}</h4>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {repo.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" aria-hidden />
              {repo.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3" aria-hidden />
            {repo.stars}
          </span>
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3 w-3" aria-hidden />
            {repo.forks}
          </span>
        </div>
      </GlassCard>
    </a>
  );
}

/**
 * Deterministic mock contribution grid. Replace with real GitHub API data
 * (or a Lovable Cloud cached snapshot) later.
 */
function ContributionGraph({ seed }: { seed: number }) {
  const weeks = 26;
  const days = 7;
  const cells = useMemo(() => {
    const out: number[] = [];
    let s = seed || 1;
    for (let i = 0; i < weeks * days; i++) {
      s = (s * 9301 + 49297) % 233280;
      out.push(Math.floor((s / 233280) * 5)); // 0..4 intensity
    }
    return out;
  }, [seed]);

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Contribution activity
      </p>
      <div
        className="mt-3 grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
        role="img"
        aria-label="Recent GitHub contribution activity"
      >
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const v = cells[w * days + d] ?? 0;
              return (
                <span
                  key={d}
                  className={cn(
                    "aspect-square w-full rounded-[3px] border border-border/60",
                    v === 0 && "bg-surface-2/60",
                    v === 1 && "bg-brand-cyan/20",
                    v === 2 && "bg-brand-cyan/40",
                    v === 3 && "bg-brand-orange/50",
                    v === 4 && "bg-brand-orange/80",
                  )}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
