
import {
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
            Hi, I'm Eaysin Mia
          </h1>

          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            Full Stack Developer specializing in React, Node.js, and modern web technologies.
            Building scalable applications with 2+ years of experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <a href="#projects">
                View My Work
              </a>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <a
                href="https://github.com/eaysinmia"
                className="max-w-56 truncate text-start md:max-w-none"
              >
                GitHub Profile
                <ArrowRight className="stroke-3" />
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
