import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container mt-10 flex flex-col gap-8 md:mt-14 md:gap-14 lg:mt-20">
      {/* Skills & Technologies */}
      <div className="mb-16">
        <TextSection
          title="Skills & Technologies"
          paragraphs={[
            "JavaScript (ES6+), TypeScript, React.js (19+), Next.js, Node.js, Express, MongoDB, PostgreSQL, Prisma, RESTful APIs, State Management (Redux/Zustand), Testing & Debugging, JWT, Socket.io, Docker, Git/GitHub",
            "I specialize in full-stack development with expertise in modern JavaScript frameworks and scalable database solutions. My experience includes building ERP systems, healthcare platforms, and AI-driven applications.",
          ]}
        />
      </div>

      {/* Experience */}
      <div className="mb-16">
        <TextSection
          title="Professional Experience"
          paragraphs={[
            "Full Stack Developer at Next Level Media (Bangladesh Branch) - Currently leading development of a large-scale ERP solution with MERN Stack, implementing Google Ads API integration, Twilio SMS automation, and dynamic reporting with AI-powered insights.",
            "Software Engineer at BlackRock IT Solutions - Led the report module for a healthcare staff scheduling system, managing real-time provider schedules, patient flow, and location-based reports across multiple facilities.",
            "Frontend Developer at Excel Technologies Ltd. - Contributed to SmartCare Pro healthcare platform, implementing ANC, Vitals, PEP, PrEP, Family Planning, HTS, and Medical Encounters modules.",
          ]}
        />
      </div>

      {/* Projects */}
      <div className="mb-16">
        <TextSection
          title="Featured Projects"
          paragraphs={[
            "Second Brain - A powerful note-taking application with multiple view types (table, board, calendar, gallery), custom properties, PARA methodology, and workspace management.",
            "React Form Interactions - A reusable React library for form state management and validation with comprehensive validation rules and custom behaviors.",
            "TechConnect - Employee management platform with timesheets, request management, and secure authentication systems.",
          ]}
        />
      </div>

      {/* Education */}
      <div className="mb-16">
        <TextSection
          title="Education"
          paragraphs={[
            "M.Sc in Geography & Environment - Ananda Mohan College, Mymensingh (GPA: 2.88/4.0)",
            "Continuous learning through online platforms, staying updated with the latest technologies and best practices in software development.",
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
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
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
