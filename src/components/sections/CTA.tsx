import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/action-button";
import { profile } from "@/content";

export function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-[2rem] p-10 text-center shadow-[var(--shadow-elevated)] sm:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-20 -z-10 opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(35% 40% at 25% 20%, var(--brand-orange-soft), transparent 70%), radial-gradient(35% 40% at 75% 80%, var(--brand-cyan-soft), transparent 70%)",
            }}
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
            Let's build something
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Have a role, a project, or a dataset that needs a{" "}
            <span className="text-gradient-brand">second pair of eyes</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            I'm actively looking for internships and analyst roles where I can pair
            data thinking with product intuition. Let's talk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              <Button variant="outline" size="lg" leftIcon={<Mail className="h-4 w-4" />}>
                Contact Me
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
