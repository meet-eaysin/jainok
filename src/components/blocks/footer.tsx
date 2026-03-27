"use client";

import Link from "next/link";

import { Github, Linkedin, Mail, MapPin, Facebook, Code } from "lucide-react";

import { profile } from "@/data/profile";

const social = [
  { name: "GitHub", href: profile.social.github, icon: Github },
  { name: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  { name: "Facebook", href: profile.social.facebook, icon: Facebook },
  { name: "Twitter", href: profile.social.twitter, icon: Code },
  { name: "LeetCode", href: profile.social.leetcode, icon: Code },
  { name: "Hashnode", href: profile.social.hashnode, icon: Code },
  { name: "StackOverflow", href: profile.social.stackoverflow, icon: Code },
  { name: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container px-4 py-8 sm:px-6 md:py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-4">
          {/* Brand Info */}
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold tracking-tight">{profile.name}</h3>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              {profile.role} building web applications with modern technologies.
            </p>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="size-4 shrink-0" />
              <span>{profile.location}</span>
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
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md p-2 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-border/50 mt-5 border-t pt-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Eaysin Mia. All rights reserved.
            </p>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
