"use client";

import { useState } from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { CaseStudy } from "@/lib/case-studies-utils";

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

const CaseStudies = ({ caseStudies }: CaseStudiesProps) => {
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  const toggleExpanded = (studyId: string) => {
    setExpandedStudy(expandedStudy === studyId ? null : studyId);
  };

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
      <div className="mb-20 grid gap-8">
        {caseStudies.map((study) => (
          <Card
            key={study.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Card Content */}
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {study.company}
                </Badge>
                <span className="text-muted-foreground text-xs">
                  {study.duration}
                </span>
              </div>

              <CardTitle className="group-hover:text-primary mb-3 text-xl transition-colors">
                {study.title}
              </CardTitle>

              <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                {study.description}
              </p>

              {/* Key Results Preview */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold">Key Results:</h4>
                <ul className="space-y-1">
                  {study.results.slice(0, 2).map((result, idx) => (
                    <li
                      key={idx}
                      className="text-muted-foreground flex items-start gap-2 text-xs"
                    >
                      <svg
                        className="text-primary mt-0.5 h-3 w-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="line-clamp-1">{result}</span>
                    </li>
                  ))}
                  {study.results.length > 2 && (
                    <li className="text-muted-foreground ml-5 text-xs">
                      +{study.results.length - 2} more results
                    </li>
                  )}
                </ul>
              </div>

              {/* Technologies Preview */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1">
                  {study.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {study.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{study.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <Button
                className="group-hover:bg-primary/90 w-full transition-colors"
                size="sm"
                onClick={() => toggleExpanded(study.id)}
              >
                {expandedStudy === study.id
                  ? "Hide Details"
                  : "View Case Study"}
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${expandedStudy === study.id ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>

              {/* Expanded Details */}
              {expandedStudy === study.id && (
                <div className="slide-in-from-top-2 mt-6 space-y-6 border-t pt-6">
                  {/* Challenge */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <svg
                        className="text-primary h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      Challenge
                    </h4>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <svg
                        className="text-primary h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Solution
                    </h4>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>

                  {/* Full Technologies */}
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Full Results */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <svg
                        className="text-primary h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Key Results
                    </h4>
                    <ul className="space-y-3">
                      {study.results.map((result, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground flex items-start gap-3"
                        >
                          <svg
                            className="text-primary mt-0.5 h-5 w-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
