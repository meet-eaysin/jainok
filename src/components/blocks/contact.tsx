import React from "react";

import Link from "next/link";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";

export const contactInfo = [
  {
    title: "Location",
    content: (
      <p className="text-muted-foreground mt-3">Rajshahi, Dhaka, Bangladesh</p>
    ),
  },
  {
    title: "Contact",
    content: (
      <div className="mt-3">
        <div>
          <p className="font-medium">Email</p>
          <Link
            href="mailto:meet.eaysin@gmail.com"
            className="text-muted-foreground hover:text-foreground"
          >
            meet.eaysin@gmail.com
          </Link>
        </div>
        <div className="mt-2">
          <p className="font-medium">Phone</p>
          <Link
            href="tel:+8801643226078"
            className="text-muted-foreground hover:text-foreground"
          >
            (+880) 1643-226078
          </Link>
        </div>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container">
        <h2 className="font-display mb-4 text-4xl leading-tight font-bold md:text-7xl">
          Let's work together
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg font-light md:text-xl">
          I'm always interested in new opportunities and exciting projects.
          Let's discuss how we can collaborate.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Contact Form */}
        <div className="mx-auto">
          <h2 className="mb-4 text-lg font-semibold">Send me a message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
