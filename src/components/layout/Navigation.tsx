import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/action-button";
import { Container } from "./Container";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleAnchor = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <Container>
        <nav
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full border border-transparent px-4 py-2 transition-all duration-300 sm:px-5",
            scrolled && "glass-strong border-border shadow-[var(--shadow-soft)]",
          )}
          aria-label="Primary"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow-orange)]"
              style={{ backgroundImage: "var(--gradient-brand)" }}
              aria-hidden
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">
              <span className="text-gradient-brand">Jaykumar</span>
              <span className="text-muted-foreground">.dev</span>
            </span>
          </Link>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleAnchor(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href="#contact"
              onClick={handleAnchor("contact")}
              className="hidden lg:inline-flex"
              aria-label="Get in touch"
            >
              <Button variant="gradient" size="sm">
                Let's talk
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-1 text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden"
          >
            <Container>
              <div className="glass-strong mt-3 rounded-3xl border border-border p-4 shadow-[var(--shadow-elevated)]">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={`#${link.id}`}
                          onClick={handleAnchor(link.id)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors",
                            isActive
                              ? "bg-surface-2 text-foreground"
                              : "text-foreground/90 hover:bg-surface-2",
                          )}
                        >
                          {link.label}
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#contact"
                  onClick={handleAnchor("contact")}
                  className="mt-3 block"
                >
                  <Button variant="gradient" size="md" className="w-full">
                    Let's talk
                  </Button>
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
