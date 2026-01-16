import Link from "next/link";

import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items = [], className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-muted-foreground flex items-center text-sm",
        className,
      )}
    >
      <Link
        href="/"
        className="hover:text-foreground flex items-center transition-colors"
        title="Home"
      >
        <Home className="size-4" />
      </Link>

      {items.length > 0 && (
        <ChevronRight className="text-muted-foreground/50 mx-2 size-4" />
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Icon = item.icon;

        return (
          <div key={index} className="flex items-center">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                {Icon && <Icon className="size-4" />}
                <span className="hidden font-medium sm:inline-block">
                  {item.label}
                </span>
                <span className="line-clamp-1 max-w-[100px] font-medium sm:hidden">
                  {item.label}
                </span>
              </Link>
            ) : (
              <div
                className={cn(
                  "flex items-center gap-1.5",
                  isLast ? "text-foreground font-medium" : "",
                )}
              >
                {Icon && <Icon className="size-4" />}
                <span
                  className={cn(
                    "line-clamp-1",
                    isLast ? "max-w-[200px] sm:max-w-[300px]" : "",
                  )}
                >
                  {item.label}
                </span>
              </div>
            )}

            {!isLast && (
              <ChevronRight className="text-muted-foreground/50 mx-2 size-4" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
