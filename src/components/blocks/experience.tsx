import React from "react";

import Image from "next/image";

import { experiences as defaultExperiences } from "@/data/experience";
import type { ExperienceItem } from "@/data/experience";

interface Experience5Props {
  title?: string;
  experience?: ExperienceItem[];
}

const Experience = ({
  title = "Work Experience",
  experience = defaultExperiences,
}: Experience5Props) => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-20 text-4xl font-bold md:text-6xl">
            {title}
          </h2>

          <div className="flex flex-col gap-12">
            {experience.map(
              ({ title, details, period, company, logo, description }, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col gap-4 md:flex-row md:gap-12"
                >
                  <div className="flex flex-col md:w-1/4 md:text-right">
                    <p className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                      {period}
                    </p>
                    <div className="mt-2 hidden items-center justify-end gap-2 md:flex">
                      <span className="text-foreground text-sm font-medium">
                        {company}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex-grow pb-12 last:pb-0 md:w-3/4">
                    <div className="bg-border absolute top-1.5 -left-6 hidden h-full w-px md:block">
                      <div className="border-primary bg-background absolute top-0 -left-1 h-2 w-2 rounded-full border-2 transition-transform group-hover:scale-125" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 md:hidden">
                        <Image
                          src={logo}
                          alt={`${company} logo`}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                        <span className="text-muted-foreground text-sm font-medium">
                          {company}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                        {title}
                      </h3>
                      <p className="text-primary group-hover:text-primary/80 text-sm font-semibold transition-colors">
                        {details}
                      </p>
                      <p className="text-muted-foreground mt-2 max-w-2xl text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Experience };
