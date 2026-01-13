import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    value: "2+",
    label: "Years Experience",
  },
  {
    value: "15+",
    label: "Projects Completed",
  },
  {
    value: "3",
    label: "Companies Worked",
  },
  {
    value: "10+",
    label: "Technologies Mastered",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Full Stack Developer
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            Building scalable web applications with modern technologies
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            I am a Full Stack Engineer with a unique background in Geography &
            Environment. This interdisciplinary path has shaped my approach to
            problem-solving—viewing technical challenges as complex,
            interconnected systems rather than isolated issues.
            <br />
            <br />
            Transitioning from environmental science to software engineering was
            driven by a passion for building tangible solutions. I leverage my
            analytical skills to architect scalable web applications, focusing
            on clean code, performance, and user-centric design. From optimizing
            ERP systems to orchestrating microservices, I bring a holistic
            perspective to every project.
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
