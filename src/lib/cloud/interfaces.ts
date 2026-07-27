/**
 * Lovable Cloud collection contracts.
 *
 * Batch 5 preps the data-access seams so a later batch can swap the mock
 * source in `src/content/*` for Cloud-backed queries WITHOUT touching any
 * component. Every section already imports from `@/content` — we just need to
 * point that barrel at a Cloud adapter that satisfies `ContentSource` below.
 *
 * TODO(cloud): implement `createCloudSource()` returning `ContentSource`
 * once Lovable Cloud is enabled and the schemas below are provisioned.
 */

import type {
  Achievement,
  Certification,
  ContactMessage,
  ContactMessageInput,
  Education,
  Experience,
  GitHubProfile,
  LearningTopic,
  Profile,
  Project,
  ResumeMeta,
  SkillCategory,
  Stat,
  TimelineEntry,
} from "@/content/types";

/** Names must match future Cloud collection ids 1:1. */
export const COLLECTIONS = {
  profile: "profile",
  projects: "projects",
  experiences: "experiences",
  education: "education",
  certifications: "certifications",
  achievements: "achievements",
  resume: "resume",
  github: "github",
  contactMessages: "contact_messages",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/**
 * Read model exposed to components. The mock source and the future Cloud
 * source both implement this. Return promises so the Cloud swap is drop-in.
 */
export interface ContentSource {
  getProfile(): Promise<Profile>;
  getTimeline(): Promise<TimelineEntry[]>;
  getStats(): Promise<Stat[]>;
  getSkills(): Promise<SkillCategory[]>;
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  getAchievements(): Promise<Achievement[]>;
  getLearningTopics(): Promise<LearningTopic[]>;
  getResumeMeta(): Promise<ResumeMeta>;
  getGitHubProfile(): Promise<GitHubProfile>;
}

/* ────────────────────  Contact submission service seam  ─────────────────── */

/**
 * TODO(cloud): back this with a Lovable Cloud server function that:
 *   1. re-validates payload with Zod (server-side authority),
 *   2. inserts into `contact_messages`,
 *   3. enqueues an email via the AI Gateway / mail provider,
 *   4. returns the persisted row id.
 *
 * The current implementation is a mock that resolves after a short delay so
 * the Contact UI can render loading → success → error states end-to-end.
 */
export interface ContactService {
  submit(input: ContactMessageInput): Promise<ContactMessage>;
}

export const mockContactService: ContactService = {
  async submit(input) {
    await new Promise((r) => setTimeout(r, 900));
    return {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "queued",
      attempts: 0,
    };
  },
};
