import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
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

const projects: Project[] = [
  {
    id: "second-brain",
    title: "Second Brain",
    description:
      "A powerful note-taking and knowledge management application with multiple view types.",
    longDescription:
      "Database System: Multiple view types (table, board, calendar, gallery) with custom properties (text, number, select, multi-select, checkbox, date-range, url etc.), PARA Methodology Implementation, Calendars with event management. multiple workspaces.",
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
      "Developed a reusable React library (react-form-interactions) to simplify form state management and validation in React applications. Define comprehensive validation rules for form fields including required fields, minimum/maximum lengths, patterns, and more. Easily extend with custom validation rules and behaviors tailored to specific application requirements.",
    techStack: ["React", "TypeScript", "JavaScript"],
    githubUrl: "https://github.com/meet-eaysin/react-form-interactions",
    image: "",
  },
  {
    id: "techconnect",
    title: "TechConnect - Employee Management",
    description:
      "Employee management platform for tracking performance and internal communication.",
    longDescription:
      "TechConnect is an employee management platform that helps organizations track employee performance, generate reports, and manage internal communication efficiently. It provides a detailed dashboard for managers to monitor team productivity.",
    techStack: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/meet-eaysin/techconnect",
    image: "",
  },
];

export const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <h2 className="mb-3 font-serif text-4xl leading-tight font-medium md:text-7xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            A showcase of my recent work, featuring full-stack applications,
            libraries, and tools I've built using modern technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="mb-8 overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-8 lg:w-1/2">
                  <CardHeader className="mb-4 p-0">
                    <CardTitle className="text-2xl font-bold">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <p className="text-muted-foreground mb-4">
                    {project.longDescription}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:gap-8">
          {regularProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48">
                {project?.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <CardContent className="p-6">
                <CardHeader className="mb-3 p-0">
                  <CardTitle className="text-xl font-semibold">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-3 w-3" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-12 text-center">
          <Link
            href="https://github.com/eaysinmia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium"
          >
            View More on GitHub
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
