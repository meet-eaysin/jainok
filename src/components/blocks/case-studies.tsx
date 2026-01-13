"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CaseStudy } from "@/lib/case-studies-utils";

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

const CaseStudies = ({ caseStudies }: CaseStudiesProps) => {
  return (
    <section className="container">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-6 font-serif text-4xl leading-tight font-medium md:text-6xl lg:text-7xl">
          Case Studies
        </h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Detailed insights into complex projects I've led and contributed to,
          showcasing technical expertise and problem-solving capabilities.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Card
            key={study.id}
            className="from-background to-muted/5 group flex h-full flex-col overflow-hidden border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-48 shrink-0 overflow-hidden">
              {study.image ? (
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted/50 text-muted-foreground flex h-full w-full items-center justify-center">
                  <span className="text-4xl font-bold opacity-20">
                    {study.title.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="border-0 bg-white/90 text-gray-800 backdrop-blur-sm hover:bg-white/90"
                >
                  {study.company}
                </Badge>
              </div>
            </div>

            <CardContent className="flex flex-1 flex-col p-6">
              <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {study.duration}
                </div>
              </div>

              <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold transition-colors">
                {study.title}
              </h3>

              <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
                {study.description}
              </p>

              <Link
                href={`/case-studies/${study.slug}`}
                className="text-primary hover:text-primary/80 mt-auto inline-flex items-center gap-2 text-sm font-medium transition-colors"
              >
                Read Case Study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Interested in working together?
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
          I'm always open to discussing new opportunities and challenging
          projects. Let's create something amazing together.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/about">Learn More About Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
