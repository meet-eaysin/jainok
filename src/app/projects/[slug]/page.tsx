import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Github,
  Calendar,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectData, getAllProjects } from "@/lib/project-utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = getProjectData(slug);
    return {
      title: `${project.title} | Eaysin Mia`,
      description: project.description,
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  let project;

  try {
    project = getProjectData(slug);
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-24 lg:py-32">
      <Link
        href="/#projects"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <div className="flex shrink-0 gap-2">
              {project.githubUrl && (
                <Button size="icon" variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source Code"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">View Source Code</span>
                  </a>
                </Button>
              )}
              {/* Future: Live URL Button */}
              {project.liveUrl && (
                <Button size="icon" variant="outline" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Live Demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">View Live Demo</span>
                  </a>
                </Button>
              )}
              {/* Future: API Docs Button */}
              {project.docsUrl && (
                <Button size="icon" variant="outline" asChild>
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View API Docs"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">View API Docs</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>{project.date}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md px-2 py-0.5 text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Image - Only render if image exists */}
      {project.image && (
        <div className="bg-muted/30 mb-12 overflow-hidden rounded-xl border shadow-sm">
          <div className="relative aspect-video w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </article>

      {/* Footer Navigation */}
      <div className="mt-16 border-t pt-8">
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          View All Projects
        </Link>
      </div>
    </div>
  );
}
