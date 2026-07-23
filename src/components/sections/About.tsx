import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { timeline } from "@/content";
import { cn } from "@/lib/utils";

const PARAGRAPHS = [
  "I'm a Bachelor of Engineering (Information Technology) student at Yadavrao Tasgaonkar Institute of Technology and Engineering, affiliated with Mumbai University. I'm passionate about Data Analytics, Artificial Intelligence, and Software Development.",
  "I enjoy transforming raw data into meaningful insights and building applications that solve real-world problems. Through academic projects, self-learning, and internships, I keep sharpening my analytical thinking, programming skills, and problem-solving abilities.",
  "My long-term goal is to become a Data Analyst and contribute to AI-powered solutions that help organizations make better decisions.",
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Curious by default. <span className="text-gradient-brand">Data-driven</span> by choice.
        </>
      }
      description="A short story of how I got here — and where I'm heading next."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="space-y-6">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-lg leading-relaxed text-foreground/85"
            >
              {p}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid gap-3 pt-2 sm:grid-cols-2"
          >
            {[
              { k: "Focus", v: "Data Analytics & Artificial Intelligence" },
              { k: "Studying", v: "Information Technology (B.E.)" },
              { k: "Loves", v: "SQL, dashboards, LLMs" },
              { k: "Open to", v: "Internships & Entry-Level Data Analyst Roles" },
            ].map((item) => (
              <div
                key={item.k}
                className="glass rounded-2xl px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {item.k}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{item.v}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <ol className="relative border-l border-border/80 pl-6">
          {timeline.map((entry, i) => {
            const dotClass =
              entry.tone === "cyan"
                ? "bg-brand-cyan shadow-[var(--shadow-glow-cyan)]"
                : entry.tone === "neutral"
                  ? "bg-muted-foreground"
                  : "bg-brand-orange shadow-[var(--shadow-glow-orange)]";
            return (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-6 last:mb-0"
              >
                <span
                  className={cn(
                    "absolute -left-[33px] top-2 h-3 w-3 rounded-full ring-4 ring-background",
                    dotClass,
                  )}
                />
                <div className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {entry.title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {entry.year}
                    </span>
                  </div>
                  {entry.organization && (
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-cyan">
                      {entry.organization}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
