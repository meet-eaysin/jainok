import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container flex flex-col gap-8 md:gap-14">
      <div className="mb-16">
        <TextSection
          paragraphs={[
            "I'm Eaysin Mia, a self-taught Full Stack Engineer with over 2 years of professional experience working with JavaScript and TypeScript across both frontend and backend development. I focus on understanding why things work, not just how—which drives me to build deeper technical knowledge through continuous learning and experimentation.",
            "I specialize in building scalable web applications and backend solutions, working with modern technology stacks involving both relational and NoSQL databases. My experience spans ERP systems, healthcare platforms, and AI-powered reporting with end-to-end deployment and system integration.",
          ]}
        />
      </div>

      <div className="mb-16">
        <TextSection
          title="Skills & Technologies"
          paragraphs={[
            "Frontend: React.js (19+), Next.js, TypeScript, State Management (Redux/Zustand), Testing (Jest, Vitest, React Testing Library)",
            "Backend: Node.js, Express.js, NestJS, RESTful APIs, Socket.io, JWT Authentication",
            "Database: PostgreSQL, MongoDB, Prisma ORM, Redis",
            "DevOps & Tools: Docker, Kong API Gateway, RabbitMQ, CI/CD, GitHub Actions, Git/GitHub",
            "I'm currently studying DevOps, cloud technologies, microservices architecture, and data structures to continuously grow both technically and professionally.",
          ]}
        />
      </div>

      <div className="mb-16">
        <TextSection
          title="Professional Experience"
          paragraphs={[
            "Full Stack Engineer at Next Level Media (April 2025–Present) - Leading development on MyManager, a large-scale ERP solution built with the MERN stack. Managing Google Ads API integration, Twilio A2P 10DLC SMS automation, and employee scheduling systems. Designed the complete database schema and API architecture for the Seating and Ticketing module. Implementing dynamic reporting with AI-powered insights, workflow automation, and door-to-door campaign management features.",
            "Software Engineer at Blackrock IT Solutions (March 2024–December 2024) - Worked remotely on Hybrid Chart Evolve, leading the report module for a real-time healthcare staff scheduling system managing provider schedules, patient flow, and location-based reporting across multiple facilities. Implemented employee timesheet, records, and request management for TechConnect.",
            "Frontend Developer at Excel Technologies Ltd. (January 2023–February 2024) - Contributed to SmartCare Pro, a healthcare platform for the Zambian government. Primarily responsible for ANC, Vitals, PEP, PrEP, Family Planning, HTS, and Medical Encounters modules (both Inpatient and Outpatient). Also implemented user authentication and ticket management for the TUSO system.",
          ]}
        />
      </div>

      <div className="mb-16">
        <TextSection
          title="Featured Projects"
          paragraphs={[
            "PFMS - Personal Finance Management System - Built a scalable microservices-based financial platform using NestJS, Express, and Next.js. Designed and maintained 14+ microservices containerized with Docker Compose, routing all traffic through Kong API Gateway. Implemented event-based communication with RabbitMQ, secure authentication with Better-Auth (JWT/JWKS), and managed data with PostgreSQL (Prisma) and MongoDB. Set up CI/CD pipelines with GitHub Actions for automated testing and deployment.",
            "Through this personal project, I actively experiment with backend architecture, system design, and distributed systems—constantly pushing my understanding of scalable application development.",
          ]}
        />
      </div>

      <div className="mb-16">
        <TextSection
          title="Education & Learning Philosophy"
          paragraphs={[
            "M.Sc. in Geography & Environment - Ananda Mohan College, Mymensingh (GPA: 2.81/4.0)",
            "As a self-taught developer, I follow my own learning philosophy focused on deep understanding rather than surface-level implementation. I regularly revisit documentation to build stronger mental models of how systems work. I consider debugging one of my strengths and enjoy the process of solving complex problems.",
            "I actively share knowledge through technical articles and case studies published on platforms like daily.dev, contributing to the developer community while reinforcing my own learning.",
          ]}
        />
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl font-bold">{title}</h2>}
      <div className="text-muted-foreground space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
