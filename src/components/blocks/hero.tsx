import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export const Hero = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center pb-20 md:min-h-screen md:pb-32">
      <div className="container mx-auto flex flex-col gap-10 px-6">
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-display mb-2 text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl lg:text-8xl">
            {profile.name}
            <br className="inline" />
            <span className="text-muted-foreground">{profile.role}</span>
          </h1>

          <p className="max-w-2xl text-lg font-normal text-zinc-700 md:text-xl dark:text-zinc-300">
            {profile.bio}
          </p>

          <p className="max-w-2xl text-base font-light text-zinc-600 md:text-lg dark:text-zinc-400">
            {profile.detailedBio}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <a href={`mailto:${profile.email}`}>
              <span className="text-base">Get In Touch</span>
              <ArrowUpRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={profile.social.github}
              target="_blank"
              className="flex items-center gap-2"
            >
              GitHub Profile
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
