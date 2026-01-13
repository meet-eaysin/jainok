import Link from "next/link";

import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";
import { Experience } from "@/components/blocks/experience";
import { Hero } from "@/components/blocks/hero";
import { Projects } from "@/components/blocks/projects";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <Experience />
      </Background>

      <Background variant="bottom">
        <Projects />
        <Blog />

        <section className="py-28 lg:py-32 lg:pt-10">
          <div className="container">
            <h2 className="mb-4 font-sans text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
              Let's work together
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl text-lg font-light md:text-xl">
              I'm always interested in new opportunities and exciting projects.
            </p>

            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </section>
      </Background>
    </>
  );
}
