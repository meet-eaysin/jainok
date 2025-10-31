import React from "react";

import Image from "next/image";

interface ExperienceItem {
  title: string;
  details: string;
  period: string;
  company: string;
  logo: string;
  description: string;
}

interface Experience5Props {
  title?: string;
  experience?: ExperienceItem[];
}

const Experience = ({
  title = "Work Experience",
  experience = [
    {
      title: "Full Stack Developer",
      details: "Full-Time • Onsite • Rajshahi, Bangladesh",
      period: "April 2025 - Present",
      company: "Next Level Media (Bangladesh Branch)",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/claude-icon.svg",
      description:
        "My Manager - A Large Scale ERP solution built with MERN Stack. I've contributed to all modules here. Mostly responsible for Google Ads manager using Google REST APIs, Twilio A2P 10DLC SMS automation, and optimized employee schedule management. Implement dynamic reporting and analytics with AI-powered insights and multiple chart visualizations.",
    },
    {
      title: "Software Engineer",
      details: "Contract • Remote • Mesa, Arizona, US",
      period: "March 2024 - December 2024",
      company: "Blackrock IT Solutions",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
      description:
        "Hybrid Chart Evolve - Worked on most modules and led the report module, including a real-time healthcare staff scheduling system. TechConnect - Implement employee timesheets management records, request and file management module.",
    },
    {
      title: "Frontend Developer",
      details: "Full-Time • Onsite • Banani, Dhaka-1213",
      period: "Jan 2023 - Feb 2024",
      company: "Excel Technologies Ltd.",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      description:
        "SmartCare Pro - I contributed to most of the modules, including Beds, Birth Records, COVAX, COVID, Death Records, Diagnosis, Investigations, Medical Encounters. I was mainly responsible for the ANC, Vitals, PEP, PrEP, Family Planning, HTS, Medical Encounters (IPD & OPD), TB Constitutional Symptoms, Treatment Plans, and Wards modules. Tuso - Implement User Authentication, User Management, Ticket management with multiple rule based access, Remote Desktop Protocol (RDP) modules.",
    },
  ],
}: Experience5Props) => {
  return (
    <section id="experience" className="py-16 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-serif text-4xl font-medium leading-tight md:text-7xl">
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
                      <div className="mb-2 flex items-center gap-3">
                        <Image
                          src={logo}
                          alt={`${company} logo`}
                          width={20}
                          height={20}
                          className="h-5 object-contain"
                        />
                        <h3 className="text-xl">{title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {details}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className="text-right md:w-1/3 md:text-right">
                      <p className="mb-1 text-sm font-medium">{period}</p>
                      <p className="text-muted-foreground text-sm">{company}</p>
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
