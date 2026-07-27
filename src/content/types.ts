/**
 * Shared content types. These mirror the shape we'll expose from Lovable Cloud
 * collections in a later batch. Every section component reads from these types
 * (not from mock files directly), so swapping the source is a one-line change.
 */

export interface Profile {
  name: string;
  titles: string[];
  tagline: string;
  description: string;
  location?: string;
  available: boolean;
  resumeUrl: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  organization?: string;
  description: string;
  tone?: "orange" | "cyan" | "neutral";
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: "orange" | "cyan" | "neutral";
  skills: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export type ProjectCategory = "AI" | "Data Analytics" | "Web Development";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  overview?: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  learnings: string[];
  challenges?: string[];
  futureImprovements?: string[];
  screenshots?: { src: string; alt: string }[];
  architecture?: {
    title?: string;
    description?: string;
    diagramUrl?: string; // optional; placeholder rendered when empty
    nodes?: string[];    // ordered flow labels for placeholder diagram
  };
  cover?: string;
  logo?: string;
  timeline?: string;
  githubUrl?: string;
  liveUrl?: string;
  detailsUrl?: string;
  relatedSlugs?: string[];
  tone?: "orange" | "cyan";
  featured?: boolean;
  year?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  organizationLogo?: string;
  organizationUrl?: string;
  type: string;
  period: string;
  location?: string;
  responsibilities: string[];
  skills: string[];
  technologies?: string[];
  tone?: "orange" | "cyan";
}

export interface Education {
  id: string;
  degree: string;
  branch?: string;
  institution: string;
  institutionLogo?: string;
  university?: string;
  period: string;
  status?: string;
  description?: string;
  gpa?: string;
  coursework?: string[];
  activities?: string[];
  certifications?: string[];
  tone?: "orange" | "cyan";
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  image?: string;
  pdfUrl?: string;
  skills?: string[];
  tone?: "orange" | "cyan";
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
  tone?: "orange" | "cyan";
}

export interface LearningTopic {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  level: "Exploring" | "Building" | "Refining" | "Advanced";
  tone: "orange" | "cyan";
}

/* ─────────────────────────────  New in Batch 5  ───────────────────────────── */

export type AchievementCategory =
  | "Hackathon"
  | "Competition"
  | "Award"
  | "Research"
  | "Leadership"
  | "Open Source";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  date: string;
  organization?: string;
  image?: string;
  link?: string;
  tone?: "orange" | "cyan";
}

export interface ResumeMeta {
  version: string;
  lastUpdated: string; // ISO date
  fileUrl: string;
  previewUrl?: string; // image or first-page preview
  sizeKb?: number;
  highlights?: string[];
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  language?: string;
  stars: number;
  forks: number;
  featured?: boolean;
  topics?: string[];
}

export interface GitHubLanguage {
  name: string;
  percent: number; // 0 - 100
  color?: string;
}

export interface GitHubProfile {
  username: string;
  url: string;
  followers: number;
  following: number;
  totalStars: number;
  publicRepos: number;
  contributionsLastYear: number;
  topLanguages: GitHubLanguage[];
  repos: GitHubRepo[];
  featuredRepoId?: string;
}

/* Contact / messaging interfaces (backend prep — no Cloud yet) */

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessage extends ContactMessageInput {
  id: string;
  createdAt: string; // ISO
  status: "queued" | "sent" | "failed";
  attempts: number;
  errorMessage?: string;
}

export type ContactSubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; id: string }
  | { status: "error"; message: string };
