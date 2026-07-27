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
  Achievement,
  ResumeMeta,
  GitHubProfile,
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
  ],
  tagline: "Aspiring Data Analyst | AI Enthusiast | Software Developer",
  description:
    "I am a B.E. Information Technology student at Yadavrao Tasgaonkar Institute of Technology and Engineering, Mumbai University. I am passionate about Data Analytics, Artificial Intelligence and Software Development. I enjoy building real-world projects and continuously learning modern technologies.",
  location: "Kalyan, Maharashtra, India",
  available: true,
  resumeUrl: "/Jay_Patel_Resume_Styled.pdf",
};

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: "jaykumar08patel@gmail.com",
    href: "mailto:jaykumar08patel@gmail.com",
    icon: "Mail",
    tone: "orange",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+91 8262098179",
    href: "tel:+918262098179",
    icon: "Phone",
    tone: "cyan",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/jaykumar-patel-03982b379",
    href: "https://www.linkedin.com/in/jaykumar-patel-03982b379",
    icon: "Linkedin",
    tone: "orange",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/JayPatel0908",
    href: "https://github.com/JayPatel0908",
    icon: "Github",
    tone: "cyan",
  },
  {
    id: "location",
    label: "Location",
    value: "Kalyan, Maharashtra, India",
    href: "#",
    icon: "MapPin",
    tone: "orange",
  },
];

export const stats: Stat[] = [
  { id: "projects", label: "Projects", value: 3, suffix: "+" },
  { id: "tech", label: "Technologies", value: 10, suffix: "+" },
  { id: "internship", label: "Internship", value: 1 },
  { id: "graduation", label: "Graduation", value: 2027 },
];

export const timeline: TimelineEntry[] = [
  {
    id: "college",
    year: "2023",
    title: "Started B.E. Information Technology",
    organization:
      "Yadavrao Tasgaonkar Institute of Technology and Engineering",
    description:
      "Started my engineering journey with a focus on programming, databases, and software engineering.",
    tone: "orange",
  },
  {
    id: "internship",
    year: "2026",
    title: "AI & Data Analytics Intern",
    organization: "InAmigos Foundation",
    description:
      "Worked on NGO research, AI-assisted data analysis, report preparation, and social impact projects.",
    tone: "cyan",
  },
  {
    id: "projects",
    year: "2026",
    title: "Built Portfolio Projects",
    organization: "Personal Projects",
    description:
      "Developed NGO AI Insights, AI in Education for Social Impact, NGO Research Webpage, and IMPACT INDIA.",
    tone: "orange",
  },
];

export const skillCategories: SkillCategory[] = [
  { id: "programming", title: "Programming", description: "Languages I reach for daily.", icon: "Code2", tone: "orange", skills: ["Java", "Python", "JavaScript", "SQL", "C", "C++"] },
  { id: "analytics", title: "Data Analytics", description: "From messy CSVs to clean insights.", icon: "BarChart3", tone: "cyan", skills: ["Python", "SQL", "Microsoft Excel"] },
  { id: "frontend", title: "Frontend", description: "Interfaces that feel effortless.", icon: "Layout", tone: "orange", skills: ["HTML", "CSS", "React", "Tailwind CSS"] },
  { id: "backend", title: "Backend", description: "APIs and services that scale.", icon: "Server", tone: "cyan", skills: ["Node.js", "Express.js"] },
  { id: "database", title: "Database", description: "Where the data lives.", icon: "Database", tone: "orange", skills: ["MongoDB"] },
  { id: "tools", title: "Tools", description: "My daily driver stack.", icon: "Wrench", tone: "cyan", skills: ["Git", "GitHub", "VS Code"] },
];

export const projects: Project[] = [
  {
    id: "ngo-ai-insights",
    slug: "ngo-ai-insights",
    title: "NGO AI Insights",
    category: "Data Analytics",
    description:
      "An AI-powered platform for organizing, analyzing, and visualizing NGO information to support research and social impact initiatives.",

    overview:
      "NGO AI Insights is a modern data analytics platform built to simplify NGO research. It organizes scattered NGO information into a searchable knowledge base and provides AI-assisted insights for researchers, students, and nonprofit organizations.",

    problem:
      "NGO information is spread across multiple websites, making research slow and inefficient.",

    solution:
      "Developed an AI-powered research platform that centralizes NGO data, enables intelligent searching, and generates structured insights.",

  technologies: [
  "HTML",
  "CSS",
  "AI",
  "Data Analytics",
],

    features: [
      "AI-assisted NGO summaries",
      "Advanced search & filtering",
      "Responsive dashboard",
      "Modern analytics UI",
      "Structured NGO database",
    ],

    learnings: [
      "AI-assisted research workflows",
      "Large-scale data organization",
      "React application architecture",
      "UI/UX for analytical platforms",
    ],

    challenges: [
      "Cleaning inconsistent NGO datasets",
      "Maintaining fast search performance",
      "Designing a dashboard for large datasets",
    ],

    futureImprovements: [
      "Real-time NGO database updates",
      "Advanced analytics dashboard",
      "User authentication",
      "Cloud database integration",
    ],

    architecture: {
      title: "AI Research Pipeline",
      description:
        "Collect NGO information, normalize datasets, process using AI-assisted workflows, and present through a modern React dashboard.",
      nodes: [
        "NGO Sources",
        "Data Cleaning",
        "Structured Database",
        "AI Processing",
        "React Dashboard",
      ],
    },

    timeline: "2025",

    screenshots: [
      {
        src: "https://picsum.photos/seed/ngo-ai-1/1600/900",
        alt: "NGO AI Insights Dashboard",
      },
      {
        src: "https://picsum.photos/seed/ngo-ai-2/1600/900",
        alt: "NGO Search",
      },
      {
        src: "https://picsum.photos/seed/ngo-ai-3/1600/900",
        alt: "AI Summary",
      },
    ],

    relatedSlugs: [
      "ai-in-education",
      "ngo-research-webpage",
    ],

    githubUrl:
      "https://github.com/JayPatel0908/AI-INSIGHT-FOR-NGO-GROWTH",

    liveUrl:
      "https://ngo-ai-insights.oneapp.dev/",

    tone: "orange",
    featured: true,
    year: "2025",
  },

  {
    id: "ai-education",
    slug: "ai-in-education",

    title: "AI in Education for Social Impact",

    category: "Artificial Intelligence",

    description:
      "A modern educational platform demonstrating how Artificial Intelligence can improve learning accessibility and social impact.",

    overview:
      "This project showcases practical AI applications in education through interactive content, responsive design, and real-world examples that promote accessible learning.",

    problem:
      "Many students and educators are unaware of how AI can improve education.",

    solution:
      "Designed a responsive educational website highlighting AI applications, benefits, and future possibilities.",

  technologies: [
  "HTML",
  "CSS",
  "AI",
  "Data Analytics",
],

    features: [
      "Interactive educational sections",
      "Responsive interface",
      "Modern UI",
      "AI use-case demonstrations",
    ],

    learnings: [
      "Educational UI design",
      "Content presentation",
      "Responsive layouts",
      "AI storytelling",
    ],

    challenges: [
      "Presenting AI concepts simply",
      "Balancing visuals with educational content",
    ],

    futureImprovements: [
      "Interactive AI demonstrations",
      "Multilingual support",
      "Real classroom case studies",
    ],

    architecture: {
      title: "Education Platform",
      description:
        "Educational content combined with AI modules delivered through a responsive React application.",
      nodes: [
        "Educational Content",
        "AI Modules",
        "React UI",
        "Users",
      ],
    },

    timeline: "2025",

    screenshots: [
      {
        src: "https://picsum.photos/seed/ai-edu-1/1600/900",
        alt: "Hero",
      },
      {
        src: "https://picsum.photos/seed/ai-edu-2/1600/900",
        alt: "Content",
      },
      {
        src: "https://picsum.photos/seed/ai-edu-3/1600/900",
        alt: "Impact",
      },
    ],

    relatedSlugs: [
      "ngo-ai-insights",
      "ngo-research-webpage",
    ],

    githubUrl:
      "https://github.com/JayPatel0908/AI-IN-EDUCATION",

    liveUrl:
      "https://ai-edu-social-impact.oneapp.dev/",

    tone: "cyan",
    featured: true,
    year: "2025",
  },

  {
    id: "ngo-research-webpage",

    slug: "ngo-research-webpage",

    title: "NGO Research Webpage",

    category: "Research Platform",

    description:
      "A responsive website presenting NGO research, analytics, and social impact information in an easy-to-understand format.",

    overview:
      "Developed during an AI & Data Analytics Internship to present structured NGO research, educational resources, and analytics through a modern web experience.",

    problem:
      "Reliable NGO research is scattered and difficult to browse.",

    solution:
      "Created a centralized responsive website showcasing NGO information and research findings.",

    technologies: [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "AI",
  "Data Analytics",
],
    features: [
      "Responsive design",
      "Research presentation",
      "Clean information layout",
      "Social impact content",
    ],

    learnings: [
      "Responsive web development",
      "Information architecture",
      "Content organization",
    ],

    challenges: [
      "Presenting large research content clearly",
      "Maintaining readability",
    ],

    futureImprovements: [
      "Search functionality",
      "Database integration",
      "Admin dashboard",
    ],

    architecture: {
      title: "Research Website",
      description:
        "Static research content delivered through a responsive frontend architecture.",
      nodes: [
        "Research",
        "Content",
        "Frontend",
        "Users",
      ],
    },

    timeline: "2025",

    screenshots: [
      {
        src: "https://picsum.photos/seed/research-1/1600/900",
        alt: "Home",
      },
      {
        src: "https://picsum.photos/seed/research-2/1600/900",
        alt: "Research",
      },
      {
        src: "https://picsum.photos/seed/research-3/1600/900",
        alt: "Content",
      },
    ],

    relatedSlugs: [
      "ngo-ai-insights",
      "ai-in-education",
    ],

    githubUrl:
      "https://github.com/JayPatel0908/ngo-research-webpage",

    liveUrl:
      "https://ngoresearch-hnxdcgfn.manus.space/",

    tone: "orange",
    featured: true,
    year: "2025",
  },
];

export const experiences: Experience[] = [
  {
    id: "inamigos",
    role: "AI & Data Analytics Intern (Project-Based)",
    organization: "InAmigos Foundation",
    organizationUrl: "https://inamigosfoundation.org",
    type: "Remote Internship",
    period: "Jul 2026",
    location: "Remote",

    responsibilities: [
      "NGO Research",
      "AI-assisted Analysis",
      "Data Collection",
      "Report Preparation",
      "Website Development using AI",
    ],

    technologies: [
      "Python",
      "Excel",
      "AI Tools",
      "Google Workspace",
      "ChatGPT",
      "Gemini",
    ],

    skills: [
      "Data Analysis",
      "Research",
      "Communication",
      "Problem Solving",
      "Documentation",
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
    period: "2023 – 2027",
    status: "Expected Graduation • 2027",

    coursework: [
      "Data Structures",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence",
      "Software Engineering",
    ],

    activities: [
      "AI Projects",
      "Data Analytics Projects",
      "Open Source Learning",
    ],

    tone: "orange",
  },
];

export const certifications: Certification[] = [
  {
    id: "tcs-ion-career-edge",
    name: "TCS iON Career Edge – Young Professional",
    organization: "TCS iON",
    issueDate: "Aug 2025",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "#",
    verificationUrl: "#",
    skills: [
      "Communication",
      "Business Etiquette",
      "Presentation",
      "Career Readiness",
    ],
    tone: "orange",
  },
  {
    id: "deloitte-data-analytics",
    name: "Data Analytics Job Simulation",
    organization: "Deloitte",
    issueDate: "Jul 2025",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "#",
    verificationUrl: "#",
    skills: [
      "Data Analytics",
      "Excel",
      "Data Visualization",
      "Business Analysis",
    ],
    tone: "cyan",
  },
  {
    id: "simplilearn-data-analytics",
    name: "Introduction to Data Analytics",
    organization: "Simplilearn",
    issueDate: "Jul 2025",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "#",
    verificationUrl: "#",
    skills: [
      "Analytics",
      "Data Cleaning",
      "Excel",
      "Statistics",
    ],
    tone: "orange",
  },
  {
    id: "cisco-cybersecurity",
    name: "Introduction to Cybersecurity",
    organization: "Cisco",
    issueDate: "Jul 2025",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "#",
    verificationUrl: "#",
    skills: [
      "Cybersecurity",
      "Networking",
      "Security Fundamentals",
    ],
    tone: "cyan",
  },
  {
    id: "google-analytics",
    name: "Google Analytics Certification",
    organization: "Google",
    issueDate: "2025",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "#",
    verificationUrl: "#",
    skills: [
      "Google Analytics",
      "Website Analytics",
      "Reporting",
    ],
    tone: "orange",
  },
];


export const currentlyLearning: LearningTopic[] = [
  {
    id: "python",
    name: "Python",
    description: "Advanced Python for Data Analytics and automation.",
    icon: "Code2",
    progress: 80,
    level: "Building",
    tone: "orange",
  },
  {
    id: "sql",
    name: "SQL",
    description: "Advanced joins, window functions and query optimization.",
    icon: "Database",
    progress: 80,
    level: "Building",
    tone: "cyan",
  },
  {
    id: "powerbi",
    name: "Power BI",
    description: "Interactive dashboards and business intelligence.",
    icon: "BarChart3",
    progress: 65,
    level: "Learning",
    tone: "orange",
  },
  {
    id: "tableau",
    name: "Tableau",
    description: "Data visualization and storytelling.",
    icon: "PieChart",
    progress: 60,
    level: "Learning",
    tone: "cyan",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Regression, classification and model evaluation.",
    icon: "Brain",
    progress: 50,
    level: "Learning",
    tone: "orange",
  },
  {
    id: "pandas",
    name: "Pandas",
    description: "Data cleaning, transformation and analysis.",
    icon: "Table",
    progress: 75,
    level: "Building",
    tone: "cyan",
  },
  {
    id: "numpy",
    name: "NumPy",
    description: "Numerical computing with Python.",
    icon: "Calculator",
    progress: 65,
    level: "Learning",
    tone: "orange",
  },
  {
    id: "excel-advanced",
    name: "Advanced Excel",
    description: "Pivot Tables, Power Query and dashboard creation.",
    icon: "FileSpreadsheet",
    progress: 80,
    level: "Building",
    tone: "cyan",
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    description: "Creating insightful dashboards and reports.",
    icon: "LineChart",
    progress: 70,
    level: "Building",
    tone: "orange",
  },
];

/* ─────────────────────────  New in Batch 5  ───────────────────────── */

export const achievements: Achievement[] = [
  {
    id: "inamigos-internship",
    title: "AI & Data Analytics Internship",
    description:
      "Completed a project-based internship focused on NGO research, AI-assisted data analysis, report preparation, and website development.",
    category: "Internship",
    date: "Jul 2026",
    organization: "InAmigos Foundation",
    tone: "cyan",
  },

  {
    id: "portfolio-projects",
    title: "Developed 4 Portfolio Projects",
    description:
      "Built NGO AI Insights, AI in Education for Social Impact, NGO Research Webpage, and IMPACT INDIA.",
    category: "Projects",
    date: "Jul 2026",
    tone: "orange",
  },

  {
    id: "certifications",
    title: "Professional Certifications",
    description:
      "Completed certifications in Data Analytics, Cybersecurity, Google Analytics, and TCS iON Career Edge.",
    category: "Certification",
    date: "Jul 2025",
    tone: "orange",
  },
];

export const resumeMeta: ResumeMeta = {
  version: "v2.0",
  lastUpdated: "July 2026",
  fileUrl: "/Jay_Patel_Resume_Styled.pdf",
  sizeKb: 250,
  highlights: [
    "B.E. Information Technology — Mumbai University (2023–2027)",
    "AI & Data Analytics Internship at InAmigos Foundation",
    "3 portfolio projects in Data Analytics, AI, and Web",
    "Working stack: Python, SQL, React, TypeScript",
  ],
};

export const githubProfile: GitHubProfile = {
  username: "JayPatel0908",
  url: "https://github.com/JayPatel0908",

  // Placeholder values until GitHub API integration
  followers: 0,
  following: 0,
  totalStars: 0,
  publicRepos: 10,
  contributionsLastYear: 0,

  topLanguages: [
    {
      name: "TypeScript",
      percent: 35,
      color: "#3178C6",
    },
    {
      name: "JavaScript",
      percent: 25,
      color: "#F7DF1E",
    },
    {
      name: "Python",
      percent: 20,
      color: "#3776AB",
    },
    {
      name: "Java",
      percent: 12,
      color: "#EA2D2E",
    },
    {
      name: "HTML/CSS",
      percent: 8,
      color: "#E34F26",
    },
  ],

  repos: [
    {
      id: "ai-insight-for-ngo-growth",
      name: "AI-INSIGHT-FOR-NGO-GROWTH",
      description:
        "AI-powered platform for NGO research, analytics and social impact insights.",
      url: "https://github.com/JayPatel0908/AI-INSIGHT-FOR-NGO-GROWTH",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      featured: true,
      topics: [
        "react",
        "typescript",
        "ai",
        "analytics",
        "ngo",
      ],
    },

    {
      id: "ai-in-education",
      name: "AI-IN-EDUCATION",
      description:
        "Educational platform showcasing AI applications for social impact and learning.",
      url: "https://github.com/JayPatel0908/AI-IN-EDUCATION",
      language: "HTML",
      stars: 0,
      forks: 0,
      topics: [
        "education",
        "ai",
        "html",
        "css",
        "javascript",
      ],
    },

    {
      id: "ngo-research-webpage",
      name: "ngo-research-webpage",
      description:
        "Research portal for NGOs with modern responsive UI and organized information.",
      url: "https://github.com/JayPatel0908/ngo-research-webpage",
      language: "HTML",
      stars: 0,
      forks: 0,
      topics: [
        "ngo",
        "research",
        "html",
        "css",
      ],
    },

    {
      id: "impact-india",
      name: "IMPACT-INDIA",
      description:
        "Platform highlighting NGOs, volunteering opportunities and social initiatives across India.",
      url: "https://github.com/JayPatel0908/IMPACT-INDIA",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      topics: [
        "react",
        "typescript",
        "social-impact",
      ],
    },
  ],

  featuredRepoId: "ai-insight-for-ngo-growth",
};