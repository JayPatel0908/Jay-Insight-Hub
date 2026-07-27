import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { CurrentlyLearning } from "@/components/sections/CurrentlyLearning";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Achievements } from "@/components/sections/Achievements";
import { GitHub } from "@/components/sections/GitHub";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";
import { profile, githubProfile, contactChannels } from "@/content";

const SITE_URL = "https://insight-aura-space.lovable.app";
const SITE_TITLE = "Jaykumar Patel | Aspiring Data Analyst & AI Enthusiast";
const SITE_DESCRIPTION =
  "Portfolio of Jaykumar Patel — B.E. Information Technology student building data analytics, AI, and software projects. Case studies, skills, and contact.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.titles[0],
  description: profile.description,
  url: SITE_URL,
  address: profile.location
    ? { "@type": "PostalAddress", addressCountry: profile.location }
    : undefined,
  sameAs: [
    githubProfile.url,
    ...contactChannels
      .filter((c) => c.href.startsWith("http"))
      .map((c) => c.href),
  ],
  knowsAbout: [
    "Data Analytics",
    "Artificial Intelligence",
    "Python",
    "SQL",
    "React",
    "TypeScript",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "Jaykumar Patel, Data Analyst, AI, Data Analytics, Python, SQL, React, Portfolio, Information Technology",
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Jaykumar Patel" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <CurrentlyLearning />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <GitHub />
      <Resume />
      <Contact />
      <CTA />
    </>
  );
}
