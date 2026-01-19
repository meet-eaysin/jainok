import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { BlogPost as Project } from "@/lib/blog-types";

interface ProjectsProps {
  projects?: Project[];
}

export const Projects = ({ projects: propProjects }: ProjectsProps) => {
  const projects = propProjects || [];

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container">
        {/* Header - Subtle and Sophisticated */}
        <div className="mb-20">
          <h2 className="font-display mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
            Selected{" "}
            <span className="text-muted-foreground/40 italic">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-light">
            A curated selection of my professional projects, full-stack
            applications, and technical case studies.
          </p>
        </div>

        {/* Project List - Compact Alternating Layout */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image Area */}
              <div className="w-full md:w-1/2 lg:w-3/5">
                <Link
                  href={`/projects/${project.id}`}
                  className="bg-muted/5 block aspect-[16/9] w-full overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={675}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                      <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                        {project.title}
                      </span>
                    </div>
                  )}
                </Link>
              </div>

              {/* Project Content Area */}
              <div className="flex w-full flex-col md:w-1/2 lg:w-2/5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                    {project.category || "Project"}
                  </span>
                  <div className="bg-primary/10 h-px flex-grow" />
                </div>

                <h3 className="font-display group-hover:text-primary mb-4 text-2xl font-bold transition-colors md:text-3xl lg:text-4xl">
                  <Link href={`/projects/${project.id}`}>{project.title}</Link>
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-3 text-base leading-relaxed font-light">
                  {project.excerpt}
                </p>

                <div className="mb-8 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 5).map((tech: string) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/10 text-[10px] font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-foreground hover:text-primary flex items-center gap-2 text-sm font-bold tracking-tight uppercase transition-colors"
                  >
                    Case Study
                    <span>→</span>
                  </Link>

                  <div className="flex items-center gap-4">
                    {project.externalUrl && (
                      <Link
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        Live Demo
                      </Link>
                    )}
                    {project.slug && (
                      <Link
                        href={`https://github.com/meet-eaysin/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                      >
                        <Github className="size-3.5" />
                        Source
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Archive Link */}
        <div className="mt-24 border-t pt-16 text-center">
          <Link
            href="https://github.com/eaysinmia"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground text-[10px] font-bold tracking-[0.3em] uppercase">
              Curious for more?
            </span>
            <div className="group-hover:text-primary flex items-center gap-2 text-xl font-bold transition-colors">
              View full archive on GitHub
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
