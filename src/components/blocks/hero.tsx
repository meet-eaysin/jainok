import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center pb-20 md:min-h-screen md:pb-32">
      <div className="container mx-auto flex flex-col gap-7 px-6">
        <div className="flex flex-col items-start gap-2">
          <h3 className="mb-2 font-serif text-3xl leading-tight font-medium md:text-5xl lg:text-7xl">
            Eaysin Mia
            <br className="inline" />
            Full Stack Engineer
          </h3>

          <p className="text-base font-light text-zinc-700 md:text-lg dark:text-zinc-400">
            2+ years of experience in building scalable, user-facing web
            applications and backend systems.
          </p>

          <p className="text-base font-light text-zinc-700 md:text-lg dark:text-zinc-400">
            Experienced with containerization, CI/CD practices, and
            service-oriented architectures, with hands-on experience through
            projects and ongoing learning of best practices.
          </p>

          <p className="text-base font-light text-zinc-700 md:text-lg dark:text-zinc-400">
            Work on the project entails ERP systems, healthcare platforms, and
            AI-based dashboards, including end-to-end deployment, and system
            integration.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-5 lg:gap-7">
          <Button asChild>
            <a href="mailto:meet.eaysin@gmail.com">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="size-4" />
              </div>
              <span className="pr-6 pl-4 text-sm whitespace-nowrap lg:pr-8 lg:pl-6 lg:text-base">
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
              href="https://github.com/meet-eaysin"
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
            href="https://github.com/meet-eaysin"
            target="_blank"
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
