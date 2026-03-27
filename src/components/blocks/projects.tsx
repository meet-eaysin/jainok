import Image from "next/image";
import Link from "next/link";

import { ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { FeaturedProject } from "@/data/projects";
import { featuredProjects } from "@/data/projects";
import type { BlogPost as BlogProject } from "@/lib/blog-types";

interface NormalizedProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  isStatic: boolean;
}

function normalizeBlogProject(project: BlogProject): NormalizedProject {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.excerpt,
    tags: project.tags,
    category: project.category || "Project",
    image: project.image,
    githubUrl: `https://github.com/meet-eaysin/${project.slug}`,
    liveUrl: project.externalUrl,
    isStatic: false,
  };
}

function normalizeStaticProject(project: FeaturedProject): NormalizedProject {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    tags: project.tags,
    category: project.category,
    image: project.image,
    githubUrl: project.github,
    liveUrl: project.liveUrl,
    isStatic: true,
  };
}

interface ProjectsProps {
  projects?: BlogProject[];
}

export const Projects = ({ projects: blogProjects }: ProjectsProps) => {
  const normalizedBlog = (blogProjects ?? []).map(normalizeBlogProject);
  const normalizedStatic = featuredProjects.map(normalizeStaticProject);

  // Merge: blog projects first, then static projects not already present
  const blogSlugs = new Set(normalizedBlog.map((p) => p.slug));
  const deduplicatedStatic = normalizedStatic.filter(
    (p) => !blogSlugs.has(p.slug),
  );
  const allProjects = [...normalizedBlog, ...deduplicatedStatic];

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-20">
          <h2 className="font-display mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
            Selected Works
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-light">
            A curated selection of my professional projects, full-stack
            applications, and technical case studies.
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {allProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group flex flex-col gap-10 md:flex-row md:items-center md:justify-between ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image Area */}
              <div className="w-full md:w-[48%]">
                {project.isStatic ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted/5 block w-full overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                        <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </a>
                ) : (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="bg-muted/5 block w-full overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                        <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </Link>
                )}
              </div>

              {/* Project Content Area */}
              <div className="flex w-full flex-col md:w-[48%]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                    {project.category}
                  </span>
                  <div className="bg-primary/10 h-px grow" />
                </div>

                <h3 className="font-display group-hover:text-primary mb-4 text-2xl font-bold transition-colors md:text-3xl lg:text-4xl">
                  {project.isStatic ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  )}
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-3 text-base leading-relaxed font-light">
                  {project.description}
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
                  {!project.isStatic && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-foreground hover:text-primary flex items-center gap-2 text-sm font-bold tracking-tight uppercase transition-colors"
                    >
                      Case Study
                      <span>→</span>
                    </Link>
                  )}

                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-medium transition-colors"
                      >
                        <Github className="size-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Archive Link */}
        <div className="mt-24 border-t pt-16 text-center">
          <a
            href="https://github.com/meet-eaysin"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground text-[10px] font-bold tracking-[0.3em] uppercase">
              Curious for more?
            </span>
            <div className="group-hover:text-primary text-primary hover:text-primary/80 flex items-center gap-2 text-xl font-bold transition-colors">
              View full archive on GitHub
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
