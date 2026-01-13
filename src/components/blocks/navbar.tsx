"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Github, Linkedin, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as Element).closest(".mobile-menu-container")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="mx-auto w-[min(90%,1160px)] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="flex shrink-0 items-center gap-2 text-xl font-medium"
          >
            {profile.name.split(" ")[0]}
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {ITEMS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href.startsWith("/#") &&
                    pathname === "/" &&
                    link.href.includes("#experience"));
                return (
                  <NavigationMenuItem key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group hover:text-muted-foreground relative px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive && "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Social Links - Hidden on very small screens */}
            <div className="hidden items-center gap-1 sm:flex">
              <a
                href={profile.social.github}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href={profile.social.linkedin}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Positioned as sibling to avoid sticky positioning issues */}
      </div>

      {/* Mobile Menu - Outside header to prevent sticky positioning conflicts */}
      {isMenuOpen && (
        <div className="mobile-menu-container bg-background/95 supports-[backdrop-filter]:bg-background/90 fixed inset-x-0 top-16 z-40 border-b backdrop-blur lg:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {ITEMS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href.startsWith("/#") &&
                  pathname === "/" &&
                  link.href.includes("#experience"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Social Links */}
            <div className="mt-4 flex items-center justify-center gap-4 border-t pt-4">
              <a
                href={profile.social.github}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="bg-background/80 fixed inset-0 top-16 z-30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};
