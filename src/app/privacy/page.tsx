"use client";

import Privacy from "./privacy.mdx";

import { Background } from "@/components/background";

const Page = () => {
  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
      <article className="prose prose-lg dark:prose-invert container px-4">
        <Privacy />
      </article>
    </section>
    </Background>
  );
};

export default Page;
