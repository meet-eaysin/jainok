import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Background } from "@/components/background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/case-studies-utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <Background className="via-muted to-muted/80">
      <div className="container py-28 lg:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/case-studies">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {study.company}
              </Badge>
              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4" />
                {study.duration}
              </div>
            </div>
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold md:text-6xl">
              {study.title}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-96">
              {study.image ? (
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted/50 text-muted-foreground flex h-full w-full items-center justify-center">
                  <span className="text-6xl font-bold opacity-20">
                    {study.title.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <div className="border-primary/20 border-l-4 pl-4">
              <h3 className="mb-2 text-lg font-semibold">Challenge</h3>
              <p className="text-muted-foreground">{study.challenge}</p>
            </div>
            <div className="border-primary/20 border-l-4 pl-4">
              <h3 className="mb-2 text-lg font-semibold">Solution</h3>
              <p className="text-muted-foreground">{study.solution}</p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Key Results</h3>
            <ul className="space-y-2">
              {study.results.map((result, idx) => (
                <li key={idx} className="text-muted-foreground flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none border-t pt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {study.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Background>
  );
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}
