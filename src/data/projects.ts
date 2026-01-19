export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "pfms",
    title: "PFMS - Personal Finance Management System",
    description:
      "A scalable financial management platform built with microservices architecture and event-driven communication.",
    longDescription:
      "Designed and maintained 14+ microservices, containerized with Docker Compose, and routed all traffic through Kong API Gateway. Used RabbitMQ to enable reliable, event-based communication between services. Implemented secure authentication with Better-Auth (JWT/JWKS) and managed data with PostgreSQL (Prisma) and MongoDB.",
    techStack: [
      "NestJS",
      "Express",
      "Next.js",
      "Docker",
      "RabbitMQ",
      "Kong",
      "PostgreSQL",
      "MongoDB",
    ],
    githubUrl: "https://github.com/meet-eaysin/pfms", // placeholder or real if found
    image: "/projects/pfms-dashboard.png", // placeholder
    featured: true,
  },
  {
    id: "second-brain",
    title: "Second Brain",
    description:
      "A powerful note-taking and knowledge management application with multiple view types.",
    longDescription:
      "Database System with multiple view types (table, board, calendar, gallery), PARA Methodology Implementation, and event management. Supports multiple workspaces with custom properties (text, number, select, date-range, etc.).",
    techStack: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    githubUrl: "https://github.com/meet-eaysin/second-brain",
    liveUrl: "https://second-brain-demo.vercel.app",
    image: "/projects/second-brain-property-create.png",
    featured: true,
  },
  {
    id: "react-form-interactions",
    title: "React Form Interactions",
    description:
      "A reusable React library for form state management and validation.",
    longDescription:
      "Developed a reusable React library to simplify form state management and validation. Define comprehensive validation rules including required fields, patterns, and custom rules.",
    techStack: ["React", "TypeScript", "JavaScript"],
    githubUrl: "https://github.com/meet-eaysin/react-form-interactions",
    image: "",
    featured: true,
  },
  {
    id: "ecommerce-optimization",
    title: "E-commerce Platform Optimization",
    description:
      "Revolutionized a high-traffic e-commerce platform by optimizing performance and search.",
    longDescription:
      "Rebuilt the frontend using Next.js for SSR, implemented Elasticsearch for lightning-fast search capabilities, and streamlined the multi-step checkout into a seamless single-page experience.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Elasticsearch",
      "Node.js",
      "Redis",
      "AWS",
    ],
    githubUrl: "https://github.com/meet-eaysin/ecommerce-optimization",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2000",
    featured: true,
  },
  {
    id: "security-monitoring",
    title: "Cybersecurity Monitoring Solution",
    description:
      "Developed a comprehensive cybersecurity dashboard that provides real-time threat detection.",
    longDescription:
      "Built a centralized monitoring hub that aggregates logs from multiple sources, uses rule-based engines for threat detection, and provides instant visualizations of security postures.",
    techStack: [
      "Go",
      "React",
      "Grafana",
      "TimescaleDB",
      "Docker",
      "Prometheus",
    ],
    githubUrl: "https://github.com/meet-eaysin/security-monitoring",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    featured: true,
  },
];
