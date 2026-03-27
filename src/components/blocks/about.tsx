import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="container">
      {/* Intro Section */}
      <div className="mb-24">
        <h2 className="font-display mb-12 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          My Journey & <span className="text-muted-foreground">Philosophy</span>
        </h2>

        <div className="prose prose-neutral dark:prose-invert lg:prose-xl prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-bold max-w-none">
          <p>
            I'm <strong>Eaysin Mia</strong>, a Full Stack Engineer with over
            three years of professional experience working with{" "}
            <strong>JavaScript</strong> and <strong>TypeScript</strong>.
          </p>

          <p>
            Currently I work at <strong>Next Level Media</strong>, where I'm
            part of the team building <strong>MyManager</strong>, a large-scale
            ERP product on the MERN stack. I've worked on Google Ads integration,
            Twilio SMS automation, the employee scheduling system, and recently
            designed the database schema and API architecture for a new Seating
            & Ticketing module.
          </p>

          <p>
            Before that, I worked remotely with{" "}
            <strong>Blackrock IT Solutions</strong> on{" "}
            <strong>HybridChart</strong> — a healthcare scheduling application
            where I led the reporting module, including real-time staff
            scheduling, permissions, and location-based reporting. I also built
            timesheet and file management features for their TechConnect
            platform.
          </p>

          <p>
            Earlier in my career at <strong>Excel Technologies</strong>, I
            worked on <strong>SmartCare Pro</strong> (a Zambian government
            healthcare system) and <strong>TUSO</strong>, a ticket management
            system with rule-based access control.
          </p>

          <p>
            Outside of work, I build things to learn. My main side projects are{" "}
            <strong>PFMS</strong>, a microservices-based financial management
            system with 14+ services (NestJS, Docker, RabbitMQ, Kong,
            PostgreSQL), and <strong>Recall</strong>, an AI-powered document
            processing platform where I work with local LLMs (Ollama), vector
            embeddings, and retrieval-augmented generation using Qdrant and
            Next.js.
          </p>

          <p>
            AI and machine learning are where most of my learning energy goes
            right now. I'm actively exploring embeddings, document chunking
            strategies, LLM orchestration, and how to build useful AI-powered
            features into real applications — not just demos.
          </p>

          <p>
            I'm self-taught — no formal CS degree. I came from a Geography &
            Environment background, which taught me to think in systems. I
            believe in understanding <em>why</em> things work, not just{" "}
            <em>how</em>. I revisit documentation often, enjoy debugging, and
            write about what I learn on{" "}
            <a
              href="https://eaysin-dev.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Hashnode
            </a>
            .
          </p>
        </div>

        <div className="mt-16">
          <Button size="lg" asChild>
            <a href="/cv.pdf" download>
              <FileDown className="mr-2 h-5 w-5" />
              Download my CV
            </a>
          </Button>
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="font-display mb-8 border-b pb-4 text-3xl font-bold">
          Education
        </h2>
        <p className="text-lg leading-relaxed">
          <strong className="text-foreground font-semibold">
            B.Sc. (Honours) in Geography & Environment
          </strong>
          <br />
          <span className="text-muted-foreground">
            Ananda Mohan College, Mymensingh • 2018–2021
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
