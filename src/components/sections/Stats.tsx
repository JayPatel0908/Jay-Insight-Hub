import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { GlassCard } from "@/components/ui/glass-card";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/content";
import type { Stat } from "@/content/types";

export function Stats() {
  return (
    <section id="stats" aria-label="Highlights" className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);
  const isYear = stat.id === "graduation";
  return (
    <GlassCard
      tone={stat.id === "tech" || stat.id === "graduation" ? "cyan" : "orange"}
      className="text-center"
    >
      <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {stat.prefix}
        <span ref={ref}>{isYear ? value : value.toLocaleString()}</span>
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {stat.label}
      </p>
    </GlassCard>
  );
}
