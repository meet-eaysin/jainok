import React from "react";

import { Timeline } from "@/components/ui/timeline";

export const Experience = () => {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Full Stack Developer at Next Level Media (Bangladesh Branch)
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-2">
              <span className="font-semibold">Location:</span> Rajshahi, Bangladesh (On Site)
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-4">
              <span className="font-semibold">Duration:</span> April 2025 – Present
            </div>
            <div className="space-y-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <p>• My Manager - A Large Scale ERP solution built with MERN Stack. I've contributed to all modules here.</p>
              <p>• Mostly responsible for Google Ads manager using Google REST APIs, Twilio A2P 10DLC SMS automation, and optimized employee schedule management.</p>
              <p>• Implement dynamic reporting and analytics with AI-powered insights and multiple chart visualizations.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Software Engineer at Blackrock IT Solutions
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-2">
              <span className="font-semibold">Location:</span> Mesa, Arizona, US (Remote, Contract)
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-4">
              <span className="font-semibold">Duration:</span> March 2024 – December 2024
            </div>
            <div className="space-y-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <p>• Hybrid Chart Evolve - Worked on most modules and led the report module, including a real-time healthcare staff scheduling system.</p>
              <p>• TechConnect - Implement employee timesheets management records, request and file management module.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Frontend Developer at Excel Technologies Ltd.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-2">
              <span className="font-semibold">Location:</span> Banani, Dhaka-1213 (On site)
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-4">
              <span className="font-semibold">Duration:</span> Jan 2023 – Feb 2024
            </div>
            <div className="space-y-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <p>• SmartCare Pro - I contributed to most of the modules, including Beds, Birth Records, COVAX, COVID, Death Records, Diagnosis, Investigations, Medical Encounters.</p>
              <p>• I was mainly responsible for the ANC, Vitals, PEP, PrEP, Family Planning, HTS, Medical Encounters (IPD & OPD), TB Constitutional Symptoms, Treatment Plans, and Wards modules.</p>
              <p>• Tuso - Implement User Authentication, User Management, Ticket management with multiple rule based access, Remote Desktop Protocol (RDP) modules.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="pt-28">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in software development and technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full overflow-clip">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
};
