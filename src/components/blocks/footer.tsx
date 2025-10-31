"use client";

import Link from "next/link";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const social = [
  { name: "GitHub", href: "https://github.com/eaysinmia", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/eaysinmia", icon: Linkedin },
  { name: "Email", href: "mailto:meet.eaysin@gmail.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container py-12">
        <div className="flex justify-between">
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Eaysin Mia</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer specializing in modern web technologies.
              Building scalable applications with 2+ years of experience.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="size-4" />
              <span>Rajshahi, Bangladesh</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex gap-3">
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
      </div>
    </footer>
  );
}
