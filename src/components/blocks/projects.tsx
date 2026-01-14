import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects as defaultProjects } from "@/data/projects";

export const Projects = () => {
  const projects = defaultProjects;
  const featuredProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-20">
          <h2 className="font-display mb-4 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg font-light md:text-xl">
            A showcase of my recent work, featuring full-stack applications,
            libraries, and tools I've built using modern technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group relative">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="bg-muted/20 relative aspect-video overflow-hidden rounded-xl border transition-all group-hover:shadow-md">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="from-muted/50 to-muted/20 flex h-full w-full items-center justify-center bg-linear-to-br">
                        <span className="text-foreground/5 text-6xl font-black tracking-tighter">
                          {project.title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.longDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-full px-3 py-0.5 text-xs font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-6">
                      {project.githubUrl && (
                        <Button variant="outline" size="lg" asChild>
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Source Code
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="lg" asChild>
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
              </div>
            </div>
          ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:mt-32">
          {regularProjects.map((project) => (
            <Card
              key={project.id}
              className="group flex flex-col border-none bg-transparent shadow-none"
            >
              <div className="bg-muted/20 relative mb-6 aspect-video overflow-hidden rounded-xl border transition-all group-hover:shadow-sm">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="from-muted/50 to-muted/20 flex h-full w-full items-center justify-center bg-linear-to-br">
                    <span className="text-foreground/5 text-3xl font-black tracking-tighter">
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-0">
                <p className="text-muted-foreground mb-6 line-clamp-2 text-base">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.id}`}
                    className="decoration-primary ml-auto inline-flex items-center text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-20 border-t pt-10 text-center">
          <Link
            href="https://github.com/eaysinmia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            Explore more projects on GitHub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
