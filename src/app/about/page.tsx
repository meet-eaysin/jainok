import { Background } from "@/components/background";
import About from "@/components/blocks/about";

export default function AboutPage() {
  return (
    <Background>
      <div className="container py-28 lg:py-32">
        <h2 className="mb-3 font-serif text-4xl leading-tight font-medium md:text-7xl">
          About Me
        </h2>
        <p className="text-muted-foreground text-lg font-light">
          My personal philosophy and professional journey.
        </p>
      </div>
      <div className="">
        <About />
      </div>
    </Background>
  );
}
