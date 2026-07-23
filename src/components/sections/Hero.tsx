import { motion } from "motion/react";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/action-button";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile } from "@/content";
import { AnalyticsVisual } from "./AnalyticsVisual";

export function Hero() {
  const typed = useTypewriter({ words: profile.titles });

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden pt-6"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="min-w-0">
            {profile.available && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
                </span>
                Available for internships & analyst roles
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="block text-muted-foreground/80 text-lg font-medium uppercase tracking-[0.24em] sm:text-sm">
                Hi, I'm
              </span>
              <span className="mt-2 block">{profile.name}</span>
              <span className="mt-3 flex items-baseline gap-2 text-3xl sm:text-4xl lg:text-5xl">
                <span
                  className="text-gradient-brand"
                  aria-live="polite"
                  aria-label={typed}
                >
                  {typed}
                </span>
                <span
                  aria-hidden
                  className="inline-block h-8 w-[3px] translate-y-1 animate-pulse bg-brand-orange sm:h-10 lg:h-12"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-foreground/80"
            >
              {profile.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 max-w-xl text-pretty text-base text-muted-foreground"
            >
              {profile.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects">
                <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  View Projects
                </Button>
              </a>
              <a href={profile.resumeUrl} download>
                <Button variant="glass" size="lg" leftIcon={<Download className="h-4 w-4" />}>
                  Download Resume
                </Button>
              </a>
              <a href="#contact">
                <Button variant="ghost" size="lg" leftIcon={<Mail className="h-4 w-4" />}>
                  Contact Me
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <AnalyticsVisual />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          aria-label="Scroll to About"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 1 },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mx-auto mt-16 hidden h-10 w-10 place-items-center rounded-full border border-border bg-surface-1 text-muted-foreground transition-colors hover:text-foreground md:grid"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </Container>
    </section>
  );
}
