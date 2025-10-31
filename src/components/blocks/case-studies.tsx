"use client";

import { useState } from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  image?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "real-time-collaboration",
    title: "Real-Time Collaboration Platform",
    company: "Tech Innovation Challenge",
    duration: "6 months",
    description: "Built a real-time collaboration platform that enables distributed teams to work together seamlessly with live editing, instant messaging, and project management features.",
    challenge: "Remote teams were struggling with communication delays, version control issues, and lack of real-time visibility into project progress, leading to decreased productivity and frequent misunderstandings.",
    solution: "Developed a comprehensive platform using WebSocket technology for real-time communication, implemented operational transformation for conflict-free collaborative editing, and created a unified dashboard combining task management, file sharing, and team communication in a single interface.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis", "Docker", "AWS"],
    results: [
      "Reduced communication delays by 95% through instant messaging and notifications",
      "Eliminated version conflicts with operational transformation algorithms",
      "Increased team productivity by 40% with unified project visibility",
      "Scaled to support 10,000+ concurrent users with sub-100ms latency"
    ]
  },
  {
    id: "ai-powered-analytics",
    title: "AI-Powered Analytics Dashboard",
    company: "Data-Driven Solutions",
    duration: "4 months",
    description: "Created an intelligent analytics platform that automatically identifies trends, generates insights, and provides predictive recommendations using machine learning algorithms.",
    challenge: "Businesses were overwhelmed by raw data without actionable insights, spending excessive time on manual analysis and missing critical trends that could impact decision-making.",
    solution: "Implemented a machine learning pipeline that processes large datasets in real-time, developed custom algorithms for trend detection and anomaly identification, and created an intuitive dashboard with automated report generation and predictive modeling capabilities.",
    technologies: ["Python", "TensorFlow", "React", "D3.js", "PostgreSQL", "Apache Kafka", "Kubernetes"],
    results: [
      "Automated data analysis reducing manual reporting time by 85%",
      "Identified revenue-impacting trends 3 weeks earlier than traditional methods",
      "Achieved 92% accuracy in predictive recommendations",
      "Processed 1M+ data points per minute with 99.9% uptime"
    ]
  },
  {
    id: "microservices-migration",
    title: "Legacy System Modernization",
    company: "Enterprise Digital Transformation",
    duration: "8 months",
    description: "Led the complete modernization of a monolithic legacy system into a scalable microservices architecture while maintaining 100% uptime during the transition.",
    challenge: "A critical business application built on outdated technology was experiencing performance degradation, scalability issues, and increasing maintenance costs, with high risk of system failure.",
    solution: "Designed and implemented a microservices architecture with domain-driven design principles, established CI/CD pipelines for automated deployment, implemented comprehensive monitoring and logging, and created migration strategies that ensured zero downtime during the transition.",
    technologies: ["Node.js", "Express", "Docker", "Kubernetes", "RabbitMQ", "Elasticsearch", "Jenkins"],
    results: [
      "Improved system performance by 300% with reduced response times",
      "Achieved 99.99% uptime during and after migration",
      "Reduced infrastructure costs by 60% through optimized resource utilization",
      "Enabled 10x faster feature deployment with independent service scaling"
    ]
  }
];

const CaseStudies = () => {
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  const toggleExpanded = (studyId: string) => {
    setExpandedStudy(expandedStudy === studyId ? null : studyId);
  };

  return (
    <section className="container">
      {/* Header */}
      <div className="mb-16">
        <h1 className="mb-6 font-serif text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
          Case Studies
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Detailed insights into complex projects I've led and contributed to,
          showcasing technical expertise and problem-solving capabilities.
        </p>

      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-8 mb-20">
        {caseStudies.map((study) => (
          <Card key={study.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            

            {/* Card Content */}
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">{study.company}</Badge>
                <span className="text-xs text-muted-foreground">{study.duration}</span>
              </div>

              <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                {study.title}
              </CardTitle>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {study.description}
              </p>

              {/* Key Results Preview */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Key Results:</h4>
                <ul className="space-y-1">
                  {study.results.slice(0, 2).map((result, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground text-xs">
                      <svg className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-1">{result}</span>
                    </li>
                  ))}
                  {study.results.length > 2 && (
                    <li className="text-xs text-muted-foreground ml-5">
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
                className="w-full group-hover:bg-primary/90 transition-colors"
                size="sm"
                onClick={() => toggleExpanded(study.id)}
              >
                {expandedStudy === study.id ? 'Hide Details' : 'View Case Study'}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${expandedStudy === study.id ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>

              {/* Expanded Details */}
              {expandedStudy === study.id && (
                <div className="mt-6 pt-6 border-t space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Challenge */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Challenge
                    </h4>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Solution
                    </h4>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>

                  {/* Full Technologies */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Technologies Used</h4>
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
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Results
                    </h4>
                    <ul className="space-y-3">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
        <h2 className="text-2xl font-semibold mb-4">Interested in working together?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities and challenging projects.
          Let's create something amazing together.
        </p>
        <div className="flex gap-4 justify-center">
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
