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
            <h2 className="mb-3 font-serif text-4xl leading-tight font-medium md:text-7xl">
              Let's work together
            </h2>
            <p className="text-muted-foreground mb-8 text-lg font-light">
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
