import { Code2 } from "lucide-react";

export const ProjectPlaceholder = ({ title }: { title: string }) => {
  const patternId = `grid-pattern-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="bg-muted/30 relative flex h-full w-full items-center justify-center overflow-hidden border">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={patternId}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <path
          d="M0 0 L100 100 M100 0 L0 100"
          stroke="currentColor"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative flex flex-col items-center gap-3 p-6 text-center">
        <div className="bg-background rounded-xl border p-3 shadow-xs">
          <Code2 className="text-muted-foreground size-8" />
        </div>
        <div>
          <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};
