import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/action-button";
import { profile } from "@/content";

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/JayPatel0908", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jaykumar-patel-03982b379/", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { label: "Email", href: "jaykumar08patel@gmail.com", Icon: Mail },
];

const LINKS = [
  {
    title: "Explore",
    items: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Contact", href: "#contact" },
      { label: "Resume", href: "/resume.pdf" },
      { label: "GitHub", href: "https://github.com/jaykumar-patel" },
      { label: "LinkedIn", href: "https://linkedin.com/in/jaykumar-patel" },
    ],
  },
];

function scrollToTop(e: React.MouseEvent) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundImage: "var(--gradient-brand)", opacity: 0.5 }}
      />
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 lg:py-20">
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Building thoughtful{" "}
              <span className="text-gradient-brand">data & AI</span> experiences.
            </h3>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              {profile.name} — {profile.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-1 text-muted-foreground transition-colors hover:border-brand-orange/40 hover:bg-surface-2 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {LINKS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {group.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="group inline-flex items-center gap-1.5 text-sm text-foreground/90 transition-colors hover:text-foreground"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with intent.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan" />
              Currently open to new opportunities
            </p>
            <a href="#home" onClick={scrollToTop}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowUp className="h-3.5 w-3.5" />}
              >
                Back to top
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
