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
    <section id="experience" className="py-16 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-serif text-4xl leading-tight font-medium md:text-7xl">
            {title}
          </h2>

          <div className="space-y-8">
            {experience.map(
              ({ title, details, period, company, logo, description }, idx) => (
                <div
                  key={idx}
                  className="border-border border-b pb-6 last:border-b-0"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="md:w-2/3">
                      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={logo}
                            alt={`${company} logo`}
                            width={20}
                            height={20}
                            className="h-5 w-5 flex-shrink-0 object-contain"
                          />
                          <h3 className="text-lg md:text-xl">{title}</h3>
                        </div>
                        {/* Mobile: Show company name below title */}
                        <p className="text-muted-foreground text-sm sm:hidden">
                          {company}
                        </p>
                      </div>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {details}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className="text-left md:w-1/3 md:text-right">
                      <p className="md:text-foreground mb-1 text-sm font-medium">
                        {period}
                      </p>
                      {/* Desktop: Show company name in right column */}
                      <p className="text-muted-foreground hidden text-sm md:block">
                        {company}
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
