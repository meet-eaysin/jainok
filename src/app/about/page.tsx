import { Background } from "@/components/background";
import About from "@/components/blocks/about";

export default function AboutPage() {
  return (
    <Background>
      <div className="container py-28 lg:py-32">
        <h1 className="font-display mb-3 text-5xl leading-tight font-bold md:text-7xl lg:text-8xl">
          About Me
        </h1>
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
