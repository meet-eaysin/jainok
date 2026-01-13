const About = () => {
  return (
    <div className="section-padding container">
      {/* Intro Section */}
      <div className="mb-24 flex flex-col gap-12 lg:flex-row">
        <div className="lg:w-2/3">
          <h2 className="font-display mb-8 text-4xl font-bold md:text-5xl lg:text-6xl">
            My Journey &<br />
            <span className="text-muted-foreground">Philosophy</span>
          </h2>
          <div className="text-muted-foreground space-y-6 text-lg leading-relaxed md:text-xl">
            <p>
              I'm{" "}
              <span className="text-foreground font-semibold">Eaysin Mia</span>,
              a self-taught Full Stack Engineer with over 2 years of
              professional experience working with JavaScript and TypeScript. I
              focus on understanding <span className="italic">why</span> things
              work, not just how—which drives me to build deeper technical
              knowledge through continuous experimentation.
            </p>
            <p>
              I specialize in building scalable web applications and backend
              solutions, working with modern technology stacks involving both
              relational and NoSQL databases. My experience spans ERP systems,
              healthcare platforms, and AI-powered reporting with end-to-end
              deployment.
            </p>
          </div>
        </div>
      </div>

      {/* Skills & Technologies Ledger */}
      <div className="mb-32">
        <h3 className="font-display mb-12 text-3xl font-bold">Expertise</h3>
        <div className="space-y-0">
          <SkillLedger
            category="Frontend"
            skills={[
              "React.js (19+)",
              "Next.js (App Router)",
              "TypeScript",
              "State Management (Redux/Zustand)",
              "Tailwind CSS & Design Systems",
            ]}
          />
          <SkillLedger
            category="Backend"
            skills={[
              "Node.js & Express",
              "NestJS (Microservices)",
              "RESTful API Design",
              "Socket.io & WebSockets",
              "Messaging (RabbitMQ)",
            ]}
          />
          <SkillLedger
            category="Data"
            skills={["PostgreSQL & Prisma", "MongoDB", "Redis Caching"]}
          />
          <SkillLedger
            category="System"
            skills={[
              "Docker & Containerization",
              "CI/CD (GitHub Actions)",
              "API Gateways (Kong)",
              "Linux Administration",
            ]}
          />
        </div>
      </div>

      {/* Education */}
      <div className="mb-24">
        <h3 className="font-display mb-8 text-3xl font-bold">Education</h3>
        <p className="text-muted-foreground text-lg">
          <span className="text-foreground font-semibold">
            M.Sc. in Geography & Environment
          </span>
          <br />
          Ananda Mohan College, Mymensingh
        </p>
      </div>
    </div>
  );
};

const SkillLedger = ({
  category,
  skills,
}: {
  category: string;
  skills: string[];
}) => (
  <div className="grid gap-4 border-t py-10 md:grid-cols-4 lg:gap-12">
    <div className="md:col-span-1">
      <h4 className="text-muted-foreground font-display text-xs font-bold tracking-widest uppercase">
        {category}
      </h4>
    </div>
    <div className="md:col-span-3">
      <p className="text-foreground text-lg leading-relaxed md:text-xl">
        {skills.join(", ")}
      </p>
    </div>
  </div>
);

export default About;
