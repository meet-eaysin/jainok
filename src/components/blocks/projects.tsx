import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";

import { ProjectPlaceholder } from "@/components/blocks/project-placeholder";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost as Project } from "@/lib/blog-types";

interface ProjectsProps {
  projects?: Project[];
}

export const Projects = ({ projects: propProjects }: ProjectsProps) => {
  const projects = propProjects || [];
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="container">
        <div className="mb-16 md:mb-24">
          <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-light md:text-xl">
            A showcase of my recent work, featuring full-stack applications,
            libraries, and tools built with modern technologies.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-12">
          {featuredProjects[0] && (
            <Card className="group bg-muted/5 overflow-hidden border transition-all duration-300 hover:shadow-md">
              <div className="grid md:grid-cols-2">
                <div className="bg-muted/10 relative aspect-video min-h-[300px] overflow-hidden border-b md:aspect-auto md:h-full md:border-b-0">
                  <Link
                    href={`/projects/${featuredProjects[0].id}`}
                    className="block h-full"
                  >
                    {featuredProjects[0].image ? (
                      <Image
                        src={featuredProjects[0].image}
                        alt={featuredProjects[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ProjectPlaceholder title={featuredProjects[0].title} />
                    )}
                  </Link>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="group-hover:text-primary font-display mb-3 text-2xl font-bold transition-colors md:text-3xl">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                    {featuredProjects[0].excerpt}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProjects[0].tags.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-2.5 py-1 text-[11px] font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-4">
                    {featuredProjects[0].slug && (
                      <Link
                        href={`https://github.com/meet-eaysin/${featuredProjects[0].slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium transition-colors"
                      >
                        <Github className="mr-2 size-4" />
                        Code
                      </Link>
                    )}
                    {featuredProjects[0].externalUrl && (
                      <Link
                        href={featuredProjects[0].externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="mr-2 size-4" />
                        Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {featuredProjects.length > 1 && (
            <div className="grid gap-8 sm:grid-cols-2">
              {featuredProjects.slice(1).map((project) => (
                <Card
                  key={project.id}
                  className="group bg-muted/5 flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-md"
                >
                  <div className="bg-muted/10 relative aspect-video overflow-hidden border-b">
                    <Link
                      href={`/projects/${project.id}`}
                      className="block h-full"
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <ProjectPlaceholder title={project.title} />
                      )}
                    </Link>
                  </div>

                  <CardContent className="flex grow flex-col p-6">
                    <h3 className="group-hover:text-primary font-display mb-3 line-clamp-1 text-xl font-bold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                      {project.excerpt}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2 py-0.5 text-[10px] font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="px-2 py-0.5 text-[10px] font-medium"
                        >
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-6 flex items-center gap-4 border-t pt-4">
                      {project.slug && (
                        <Link
                          href={`https://github.com/meet-eaysin/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
                        >
                          <Github className="mr-1.5 size-3.5" />
                          Code
                        </Link>
                      )}
                      {project.externalUrl && (
                        <Link
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
                        >
                          <ExternalLink className="mr-1.5 size-3.5" />
                          Demo
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {featuredProjects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="https://github.com/eaysinmia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium"
            >
              View More Projects on GitHub
              <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
