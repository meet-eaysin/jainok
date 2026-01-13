import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
};

export const Background = ({
  children,
  variant = "top",
  className,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "relative mx-2.5 mt-2.5 lg:mx-4",
        variant === "top" &&
          "from-muted/30 via-background to-background bg-linear-to-b via-20%",
        variant === "bottom" &&
          "from-background via-background to-muted/20 bg-linear-to-b",
        className,
      )}
    >
      {children}
    </div>
  );
};
