import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    value: "3+",
    label: "Years Experience",
  },
  {
    value: "15+",
    label: "Projects Shipped",
  },
  {
    value: "3",
    label: "Companies",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Full Stack Engineer
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            I build things for the web — and lately, with AI.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            I came into software from a Geography & Environment background,
            which gave me a habit of thinking in systems. I taught myself to
            code, and over the past three years I've worked on ERP platforms,
            healthcare applications, and microservice architectures.
            <br />
            <br />
            I care about writing code that's easy to read, easy to change, and
            built to last. Right now I'm deep into AI/ML — building with local
            LLMs, vector databases, and intelligent document processing
            pipelines. I enjoy debugging hard problems and understanding how
            things work under the surface.
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="font-display text-4xl tracking-wide md:text-5xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
