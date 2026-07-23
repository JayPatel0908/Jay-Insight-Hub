import type {
  Profile,
  TimelineEntry,
  Stat,
  SkillCategory,
  Project,
  Experience,
  Education,
  Certification,
  ContactChannel,
  LearningTopic,
} from "../types";

/**
 * Mock content. Will be replaced by Lovable Cloud queries in a later batch.
 * Keep shapes stable — components import these via `@/content` re-exports.
 */

export const profile: Profile = {
  name: "Jaykumar Patel",
  titles: [
    "Aspiring Data Analyst",
    "AI Enthusiast",
    "Software Developer",
    "Problem Solver",
  ],
  tagline: "Turning data into insights and ideas into solutions.",
  description:
    "B.E. Information Technology student focused on data analytics, AI, and building software that helps people make better decisions.",
  location: "India",
  available: true,
  resumeUrl: "/resume.pdf",
};

export const timeline: TimelineEntry[] = [
  {
    id: "programming",
    year: "Step 1",
    title: "Started Learning Programming",
    description: "Learned C and built my programming fundamentals.",
    tone: "cyan",
  },
  {
    id: "java-sql",
    year: "Step 2",
    title: "Explored Java and SQL",
    description: "Developed logical thinking and database fundamentals.",
    tone: "orange",
  },
  {
    id: "web",
    year: "Step 3",
    title: "Started Web Development",
    description: "Learned HTML, CSS, JavaScript and React.",
    tone: "cyan",
  },
  {
    id: "data-projects",
    year: "Step 4",
    title: "Built Data Analytics Projects",
    description:
      "Worked on AI and analytics-based projects including NGO AI Insights, AI in Education for Social Impact and Volunteer India 2025.",
    tone: "orange",
  },
  {
    id: "internship",
    year: "Step 5",
    title: "AI & Data Analytics Internship",
    organization: "InAmigos Foundation",
    description:
      "Completed an internship where I worked on research, data collection, AI-assisted analysis and reporting.",
    tone: "cyan",
  },
  {
    id: "now",
    year: "Step 6",
    title: "Current Goal",
    description:
      "Preparing for Data Analyst internships and continuously improving my skills in Python, SQL, AI and modern analytics tools.",
    tone: "orange",
  },
];

export const stats: Stat[] = [
  { id: "projects", label: "Projects", value: 3, suffix: "+" },
  { id: "tech", label: "Technologies", value: 10, suffix: "+" },
  { id: "internship", label: "Internship", value: 1 },
  { id: "graduation", label: "Graduation", value: 2027 },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    description: "Languages I reach for daily.",
    icon: "Code2",
    tone: "orange",
    skills: ["Java", "Python", "JavaScript", "SQL", "C", "C++"],
  },
  {
    id: "analytics",
    title: "Data Analytics",
    description: "From messy CSVs to clean insights.",
    icon: "BarChart3",
    tone: "cyan",
    skills: ["Python", "SQL", "Microsoft Excel"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel effortless.",
    icon: "Layout",
    tone: "orange",
    skills: ["HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs and services that scale.",
    icon: "Server",
    tone: "cyan",
    skills: ["Node.js", "Express.js"],
  },
  {
    id: "database",
    title: "Database",
    description: "Where the data lives.",
    icon: "Database",
    tone: "orange",
    skills: ["MongoDB"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "My daily driver stack.",
    icon: "Wrench",
    tone: "cyan",
    skills: ["Git", "GitHub", "VS Code"],
  },
];

export const projects: Project[] = [
  {
    id: "ngo-ai-insights",
    slug: "ngo-ai-insights",
    title: "NGO AI Insights",
    category: "Data Analytics",
    description:
      "An AI-powered platform that helps organize and analyze NGO information for research and social impact.",
    overview:
      "NGO AI Insights is a research tool that turns scattered NGO information into a structured, searchable knowledge base with AI-assisted summaries — designed for students, researchers, and social impact teams.",
    problem:
      "NGO information is often scattered across different sources, making research difficult.",
    solution:
      "Developed a platform that organizes NGO data into structured insights using modern web technologies and AI-assisted workflows.",
    technologies: ["React", "TypeScript", "AI", "Data Analytics"],
    features: [
      "Organized NGO database",
      "AI-assisted insights",
      "Search and filtering",
      "Responsive interface",
    ],
    learnings: [
      "Structuring unorganized real-world data",
      "Designing analyst-friendly UIs",
      "Working with AI-assisted research workflows",
    ],
    challenges: [
      "Normalizing inconsistent NGO data from multiple sources",
      "Balancing information density with a clean, scannable UI",
      "Prompt-designing AI summaries that stay factual",
    ],
    futureImprovements: [
      "Full-text search with filters by cause and region",
      "Verified data pipeline backed by Lovable Cloud",
      "Public-facing analytics dashboard for social impact metrics",
    ],
    githubUrl: "https://github.com",
    liveUrl: "#",
    tone: "orange",
    featured: true,
    year: "2025",
  },
  {
    id: "ai-education",
    slug: "ai-in-education",
    title: "AI in Education for Social Impact",
    category: "AI",
    description:
      "A platform demonstrating how Artificial Intelligence can improve education accessibility and social impact.",
    overview:
      "A concept platform that showcases how AI can make learning more accessible — from adaptive study aids to inclusive content — with a strong social-impact lens.",
    problem:
      "Students and educators often lack awareness of practical AI applications in education.",
    solution:
      "Created a platform showcasing AI-driven educational solutions and their potential impact.",
    technologies: ["React", "AI", "Education", "Analytics"],
    features: [
      "Educational content",
      "AI use cases",
      "Interactive UI",
      "Modern responsive design",
    ],
    learnings: [
      "Translating AI concepts into approachable content",
      "Storytelling around social impact",
      "Building accessible, responsive interfaces",
    ],
    challenges: [
      "Explaining AI without oversimplifying or overselling it",
      "Designing content for a wide range of readers",
      "Keeping the UI approachable while still feeling modern",
    ],
    futureImprovements: [
      "Interactive AI demos embedded in the page",
      "Multilingual content for wider accessibility",
      "Case studies backed by real classroom data",
    ],
    githubUrl: "https://github.com",
    liveUrl: "#",
    tone: "cyan",
    featured: true,
    year: "2025",
  },
  {
    id: "volunteer-india-2025",
    slug: "volunteer-india-2025",
    title: "Volunteer India 2025",
    category: "Web Development",
    description:
      "A volunteer opportunity platform helping students discover internships, fellowships and volunteer programs across India.",
    overview:
      "Volunteer India 2025 centralizes verified volunteer, fellowship, and internship opportunities into a single, easy-to-browse platform for students looking to create real-world impact.",
    problem:
      "Students struggle to find verified volunteer opportunities in one place.",
    solution: "Built a centralized platform to explore social impact opportunities.",
    technologies: ["React", "TypeScript", "JavaScript"],
    features: [
      "Opportunity listings",
      "Modern UI",
      "Responsive design",
      "Easy navigation",
    ],
    learnings: [
      "Content-first information architecture",
      "Component-driven React patterns",
      "Delivering polished UX on a tight scope",
    ],
    challenges: [
      "Curating credible opportunities from many sources",
      "Designing a browsing experience that scales to hundreds of listings",
      "Keeping listings fresh with minimal manual effort",
    ],
    futureImprovements: [
      "User accounts to bookmark opportunities",
      "Admin panel powered by Lovable Cloud",
      "Email alerts for new matching opportunities",
    ],
    githubUrl: "https://github.com",
    liveUrl: "#",
    tone: "orange",
    featured: true,
    year: "2025",
  },
];

export const experiences: Experience[] = [
  {
    id: "inamigos-2025",
    role: "AI & Data Analytics Intern",
    organization: "InAmigos Foundation",
    type: "Remote Internship",
    period: "2025",
    location: "Remote",
    responsibilities: [
      "NGO research and data collection",
      "AI-assisted data analysis",
      "Social impact reporting",
      "Documentation",
      "Team collaboration",
      "Research presentation",
    ],
    skills: [
      "Data Analysis",
      "Research",
      "AI Tools",
      "Communication",
      "Problem Solving",
    ],
    tone: "cyan",
  },
];

export const education: Education[] = [
  {
    id: "be-it",
    degree: "Bachelor of Engineering",
    branch: "Information Technology",
    institution:
      "Yadavrao Tasgaonkar Institute of Technology and Engineering",
    university: "Mumbai University",
    period: "2023 — 2027",
    status: "Expected 2027",
    description:
      "Focused on data structures, databases, AI fundamentals, and software engineering — with self-directed depth in data analytics.",
    tone: "orange",
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-placeholder-1",
    name: "Data Analytics Foundations",
    organization: "Coming Soon",
    issueDate: "TBA",
    credentialUrl: "#",
    tone: "orange",
  },
  {
    id: "cert-placeholder-2",
    name: "AI & Machine Learning Essentials",
    organization: "Coming Soon",
    issueDate: "TBA",
    credentialUrl: "#",
    tone: "cyan",
  },
  {
    id: "cert-placeholder-3",
    name: "SQL for Data Analysis",
    organization: "Coming Soon",
    issueDate: "TBA",
    credentialUrl: "#",
    tone: "orange",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: "jaykumar.patel@example.com",
    href: "mailto:jaykumar.patel@example.com",
    icon: "Mail",
    tone: "orange",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/jaykumar-patel",
    href: "https://linkedin.com/in/jaykumar-patel",
    icon: "Linkedin",
    tone: "cyan",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/jaykumar-patel",
    href: "https://github.com/jaykumar-patel",
    icon: "Github",
    tone: "orange",
  },
  {
    id: "location",
    label: "Location",
    value: "India",
    href: "#",
    icon: "MapPin",
    tone: "cyan",
  },
];

export const currentlyLearning: LearningTopic[] = [
  {
    id: "python",
    name: "Python",
    description: "Data wrangling with pandas, numpy and scripting.",
    icon: "Code2",
    progress: 70,
    level: "Building",
    tone: "orange",
  },
  {
    id: "sql",
    name: "SQL",
    description: "Complex joins, window functions, and query tuning.",
    icon: "Database",
    progress: 65,
    level: "Building",
    tone: "cyan",
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "Supervised learning, model evaluation and pitfalls.",
    icon: "Brain",
    progress: 45,
    level: "Exploring",
    tone: "orange",
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    description: "Statistical thinking, dashboards, and storytelling.",
    icon: "BarChart3",
    progress: 60,
    level: "Building",
    tone: "cyan",
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Prompt design, LLM tooling, and AI-assisted workflows.",
    icon: "Sparkles",
    progress: 55,
    level: "Exploring",
    tone: "orange",
  },
  {
    id: "react",
    name: "React",
    description: "Advanced patterns, TanStack Router, and performance.",
    icon: "Atom",
    progress: 75,
    level: "Refining",
    tone: "cyan",
  },
];
