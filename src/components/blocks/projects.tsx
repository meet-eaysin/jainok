import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";

import { ProjectPlaceholder } from "@/components/blocks/project-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects as defaultProjects } from "@/data/projects";

export const Projects = () => {
  const projects = defaultProjects;
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-light md:text-xl">
            A showcase of my recent work, featuring full-stack applications,
            libraries, and tools built with modern technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="group">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Image Section - Alternating Order on Large Screens */}
                <div
                  className={`lg:col-span-7 ${
                    index % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <div className="bg-muted/10 relative aspect-[16/10] overflow-hidden rounded-lg border shadow-sm transition-all duration-300 group-hover:shadow-md">
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
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                        {project.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="px-2.5 py-1 text-[11px] font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.longDescription}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 size-4" />
                            Source
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
                            <ExternalLink className="mr-2 size-4" />
                            Visit Site
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {featuredProjects.length && (
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
