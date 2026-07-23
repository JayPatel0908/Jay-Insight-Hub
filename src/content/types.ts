/**
 * Shared content types. These mirror the shape we'll expose from Lovable Cloud
 * collections in a later batch. Every section component reads from these types
 * (not from mock files directly), so swapping the source is a one-line change.
 */

export interface Profile {
  name: string;
  titles: string[]; // typed animation
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
  icon: string; // lucide icon name
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
  cover?: string; // image url; placeholder rendered when empty
  githubUrl?: string;
  liveUrl?: string;
  detailsUrl?: string;
  tone?: "orange" | "cyan";
  featured?: boolean;
  year?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: string; // e.g. "Remote Internship"
  period: string;
  location?: string;
  responsibilities: string[];
  skills: string[];
  tone?: "orange" | "cyan";
}

export interface Education {
  id: string;
  degree: string;
  branch?: string;
  institution: string;
  university?: string;
  period: string;
  status?: string;
  description?: string;
  tone?: "orange" | "cyan";
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
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
  icon: string; // lucide icon name
  progress: number; // 0 - 100
  level: "Exploring" | "Building" | "Refining" | "Advanced";
  tone: "orange" | "cyan";
}
