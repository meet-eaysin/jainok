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
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-muted/30 flex h-full w-full items-center justify-center">
                        <span className="text-4xl font-bold opacity-10">
                          {project.title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
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
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/projects/${project.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-muted/30 flex h-full w-full items-center justify-center">
                    <span className="text-3xl font-bold opacity-10">
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
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
                  <Button variant="ghost" size="sm" className="ml-auto" asChild>
                    <Link href={`/projects/${project.id}`}>
                      Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
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
