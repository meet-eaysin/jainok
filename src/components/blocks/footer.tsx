"use client";

import Link from "next/link";

import { Github, Linkedin, Mail, MapPin, Facebook, Code } from "lucide-react";

const social = [
  { name: "GitHub", href: "https://github.com/meet-eaysin", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/meet-eaysin/", icon: Linkedin },
  { name: "Facebook", href: "https://web.facebook.com/meet.eaysin/", icon: Facebook },
  { name: "Twitter", href: "https://x.com/meet_eaysin", icon: Code },
  { name: "LeetCode", href: "https://leetcode.com/u/meet-eaysin/", icon: Code },
  { name: "Email", href: "mailto:meet.eaysin@gmail.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container py-8 md:py-12 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          {/* Brand Info */}
          <div className="space-y-3 flex-1">
            <h3 className="text-lg font-semibold">Eaysin Mia</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Full Stack Developer specializing in modern web technologies.
              Building scalable applications with 2+ years of experience.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="size-4 flex-shrink-0" />
              <span>Rajshahi, Bangladesh</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50"
                  aria-label={item.name}
                >
                  <item.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 pt-5 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Eaysin Mia. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
