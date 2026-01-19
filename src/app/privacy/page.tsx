"use client";

import Privacy from "./privacy.mdx";

import { Background } from "@/components/background";

const Page = () => {
  return (
    <Background>
      <div className="container pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="mb-12">
          <h1 className="font-display mb-3 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base font-light sm:text-lg">
            We value your privacy. This policy outlines how we handle your data
            and protect your information.
          </p>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <Privacy />
        </article>
      </div>
    </Background>
  );
};

export default Page;
