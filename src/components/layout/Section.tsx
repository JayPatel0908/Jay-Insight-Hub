import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  contained?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  contained = true,
  size = "xl",
  align = "left",
  className,
  children,
  ...props
}: SectionProps) {
  const header = (eyebrow || title || description) && (
    <header
      className={cn(
        "mb-12 flex flex-col gap-4 sm:mb-16",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-orange-soft px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );

  const body = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28 lg:py-32",
        className,
      )}
      {...props}
    >
      {contained ? <Container size={size}>{body}</Container> : body}
    </section>
  );
}
