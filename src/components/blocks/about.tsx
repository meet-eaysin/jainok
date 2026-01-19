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

        <div className="prose prose-neutral dark:prose-invert lg:prose-xl prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-bold prose-ul:list-disc prose-li:mt-2 max-w-none">
          <p>
            Hi there, I'm <strong className="font-semibold">Eaysin Mia</strong>.
            I have a little over{" "}
            <strong>two years of professional experience</strong> working with{" "}
            <strong>JavaScript</strong> and <strong>TypeScript</strong> across
            both frontend and backend development.
          </p>

          <p>
            Currently, I work at <strong>Next Level Media</strong>, where I
            contribute to our in-house ERP product <strong>MyManager</strong>,
            built on the <strong>MERN stack</strong>. My primary
            responsibilities include:
          </p>

          <ul>
            <li>
              <strong>Google Ads Manager</strong> integration
            </li>
            <li>
              <strong>Twilio A2P 10DLC SMS</strong> automation
            </li>
            <li>
              Developing the <strong>employee scheduling system</strong>
            </li>
            <li>
              Supporting <strong>workflow automation</strong> and{" "}
              <strong>AI-powered dynamic reporting</strong> modules
            </li>
          </ul>

          <p>
            Recently, I designed the entire <strong>database schema</strong> and{" "}
            <strong>API architecture</strong> for the{" "}
            <strong>Seating and Ticketing module</strong>, which is now in the{" "}
            <em>staging phase</em>.
          </p>

          <p>
            Previously, I worked remotely with{" "}
            <strong>Blackrock IT Solutions</strong>, where I contributed to{" "}
            <strong>HybridChart</strong>, a healthcare application. There, I
            worked on the <strong>reporting module</strong> of the scheduling
            system, including:
          </p>

          <ul>
            <li>Real-time staff scheduling</li>
            <li>Permission management</li>
            <li>Location-based reporting</li>
          </ul>

          <p>
            Earlier in my career, I worked as a{" "}
            <strong>Frontend Developer</strong> in the healthcare domain,
            contributing to projects like <strong>Health CarePro</strong> (a
            Zambian government healthcare system) and the{" "}
            <strong>TUSO ticket management system</strong>.
          </p>

          <p>
            In addition to my professional work, I have built a personal
            project—a{" "}
            <strong>microservices-based financial management system</strong>. In
            this project, I use:
          </p>

          <ul>
            <li>
              <strong>NestJS</strong>
            </li>
            <li>
              <strong>Docker</strong>
            </li>
            <li>
              <strong>RabbitMQ</strong>
            </li>
            <li>
              <strong>Kong API Gateway</strong>
            </li>
            <li>
              <strong>Redis</strong>
            </li>
          </ul>

          <p>
            The system consists of <strong>14+ services</strong>. Through this
            project, I actively experiment with{" "}
            <strong>backend architecture</strong>,{" "}
            <strong>system design</strong>, and{" "}
            <strong>distributed systems</strong>.
          </p>

          <p>
            I am a <strong>self-taught developer</strong> and have not taken any
            formal programming courses. I follow my own learning philosophy and
            approach to understanding technology. I focus on <em>why</em> things
            work, not just <em>how</em>. Because of this, I often revisit
            documentation, which helps me build deeper understanding.
          </p>

          <p>
            I enjoy <strong>debugging</strong> and consider it one of my
            strengths. I also enjoy <strong>writing</strong>—I have written and
            published several technical articles and case studies, which I
            regularly share on platforms like <strong>daily.dev</strong>.
          </p>

          <p>
            Currently, I am consistently studying <strong>DevOps</strong>,{" "}
            <strong>cloud technologies</strong>, <strong>microservices</strong>,
            and <strong>data structures</strong>, and I'm always looking to grow
            both technically and professionally.
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
            M.Sc. in Geography & Environment
          </strong>
          <br />
          <span className="text-muted-foreground">
            Ananda Mohan College, Mymensingh
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
