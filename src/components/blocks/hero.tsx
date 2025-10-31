
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="flex items-center justify-center py-32 min-h-screen">
      <div className="container flex flex-col gap-7 mx-auto px-6">
        <div className="flex flex-col items-start gap-2">
          <h3 className="mb-2 font-serif text-4xl font-medium leading-tight md:text-7xl">
            Eaysin Mia
            <br className="inline" />
            Full Stack Engineer
          </h3>

          <p className=" text-lg text-zinc-700 sm:text-xl dark:text-zinc-400 font-light">
            2+ years of experience in building scalable, user-facing web applications and backend systems. Experienced with the latest frontend technologies and state management, and backend development using relational and NoSQL databases.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-5 lg:gap-7">
            <Button asChild>
              <a href="mailto:meet.eaysin@gmail.com">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="size-4" />
                </div>
                <span className="whitespace-nowrap pl-4 pr-6 text-sm lg:pl-6 lg:pr-8 lg:text-base">
                  Get In Touch
                </span>
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
          
        <p className="text-sm text-zinc-700 dark:text-zinc-400">
          Connect with me on{" "}
          <Link
            href="https://github.com/eaysinmia"
            className="font-bold underline underline-offset-4"
          >
            GitHub
          </Link>{" "}
          for my latest projects
        </p>
      </div>
    </section>
  );
};
