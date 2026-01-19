import Link from "next/link";

import { Background } from "@/components/background";
import { Blog } from "@/components/blocks/blog";
import { Experience } from "@/components/blocks/experience";
import { Hero } from "@/components/blocks/hero";
import { Projects } from "@/components/blocks/projects";
import { Button } from "@/components/ui/button";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const [blogsRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/blog/posts?status=published&contentType=blog`, {
        cache: "no-store",
      }),
      fetch(
        `${baseUrl}/api/blog/posts?status=published&contentType=case-study`,
        {
          cache: "no-store",
        },
      ),
    ]);

    const blogs = blogsRes.ok ? await blogsRes.json() : { posts: [] };
    const projects = projectsRes.ok ? await projectsRes.json() : { posts: [] };

    return {
      blogs: blogs.posts || [],
      projects: projects.posts || [],
    };
  } catch {
    return { blogs: [], projects: [] };
  }
}

export default async function Home() {
  const { blogs, projects } = await getData();

  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <Experience />
      </Background>

      <Background variant="bottom">
        <Projects projects={projects} />
        <Blog blogPosts={blogs} />

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
