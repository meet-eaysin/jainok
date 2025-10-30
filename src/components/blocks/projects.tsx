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
    description: "A powerful note-taking and knowledge management application with multiple view types.",
    longDescription: "Database System: Multiple view types (table, board, calendar, gallery) with custom properties (text, number, select, multi-select, checkbox, date-range, url etc.), PARA Methodology Implementation, Calendars with event management. multiple workspaces.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    githubUrl: "https://github.com/eaysinmia/second-brain",
    liveUrl: "https://second-brain-demo.vercel.app",
    image: "/projects/second-brain.webp",
    featured: true,
  },
  {
    id: "react-form-interactions",
    title: "React Form Interactions",
    description: "A reusable React library for form state management and validation.",
    longDescription: "Developed a reusable React library (react-form-interactions) to simplify form state management and validation in React applications. Define comprehensive validation rules for form fields including required fields, minimum/maximum lengths, patterns, and more.",
    techStack: ["React", "TypeScript", "JavaScript"],
    githubUrl: "https://github.com/eaysinmia/react-form-interactions",
    image: "/projects/react-form-interactions.webp",
  },
  {
    id: "techconnect",
    title: "TechConnect - Employee Management",
    description: "Employee management platform for tracking performance and internal communication.",
    longDescription: "TechConnect is an employee management platform that helps organizations track employee performance, generate reports, and manage internal communication efficiently. It provides a detailed dashboard for managers to monitor team productivity.",
    techStack: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/eaysinmia/techconnect",
    image: "/projects/techconnect.webp",
  },
];

export const Projects = () => {
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work, featuring full-stack applications,
            libraries, and tools I've built using modern technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden mb-8">
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
                <div className="lg:w-1/2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                  </CardHeader>
                  <p className="text-muted-foreground mb-4">{project.longDescription}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
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
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
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
        <div className="grid md:grid-cols-2 gap-8">
          {regularProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                </CardHeader>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-4">
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
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
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
        <div className="text-center mt-12">
          <Link
            href="https://github.com/eaysinmia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            View More on GitHub
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};