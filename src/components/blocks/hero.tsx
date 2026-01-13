import Link from "next/link";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export const Hero = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center pb-20 md:min-h-screen md:pb-32">
      <div className="container mx-auto flex flex-col gap-7 px-6">
        <div className="flex flex-col items-start gap-2">
          <h3 className="mb-2 font-serif text-3xl leading-tight font-medium md:text-5xl lg:text-7xl">
            {profile.name}
            <br className="inline" />
            {profile.role}
          </h3>

          <p className="text-base font-light text-zinc-700 md:text-lg dark:text-zinc-400">
            {profile.bio}
          </p>

          <p className="text-base font-light text-zinc-700 md:text-lg dark:text-zinc-400">
            {profile.detailedBio}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-5 lg:gap-7">
          <Button asChild>
            <a href={`mailto:${profile.email}`}>
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
              href={profile.social.github}
              target="_blank"
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
            href={profile.social.github}
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
