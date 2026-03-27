export interface FeaturedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  github: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  image?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "recall",
    title: "Recall",
    slug: "recall",
    description:
      "A monorepo for document processing and AI-driven knowledge extraction. NestJS backend pipeline, Next.js frontend, local LLMs via Ollama, and vector search with Qdrant — all wired together with Turborepo.",
    tags: [
      "Next.js 16",
      "NestJS",
      "Ollama",
      "Qdrant",
      "Redis",
      "MongoDB",
      "Turborepo",
      "TypeScript",
    ],
    github: "https://github.com/meet-eaysin/recall",
    featured: true,
    category: "AI / Full Stack",
    image: "/projects/image.png",
  },
  {
    id: "pfms-microservice",
    title: "PFMS — Personal Financial Management System",
    slug: "pfms-microservice",
    description:
      "A microservices platform I built to learn distributed systems. 14+ services communicating via RabbitMQ, exposed through Kong API Gateway, each with its own PostgreSQL database and Redis caching.",
    tags: [
      "NestJS",
      "Docker",
      "RabbitMQ",
      "Kong",
      "PostgreSQL",
      "Redis",
      "GitHub Actions",
      "TypeScript",
    ],
    github: "https://github.com/meet-eaysin/pfms-microservice",
    featured: true,
    category: "Microservices / Backend",
  },
];
