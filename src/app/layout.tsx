import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { profile } from "@/data/profile"; // Ensure this import path is correct based on usage

export const metadata: Metadata = {
  title: {
    default: `${profile.name} - ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  metadataBase: new URL(profile.metadata.url),
  description: profile.metadata.description,
  keywords: profile.metadata.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description: profile.metadata.description,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} - ${profile.role} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.role}`,
    description: profile.metadata.description,
    images: ["/og-image.jpg"],
    creator: profile.social.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.metadata.description,
    url: profile.metadata.url,
    sameAs: [profile.social.github, profile.social.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.locationDetails.city,
      addressRegion: profile.locationDetails.region,
      addressCountry: profile.locationDetails.country,
    },
    email: profile.email,
    telephone: profile.phone,
    knowsAbout: profile.metadata.keywords,
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
      occupationLocation: {
        "@type": "City",
        name: profile.locationDetails.city,
        addressCountry: profile.locationDetails.country,
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href={profile.metadata.url} />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <StyleGlideProvider /> removed as it seems unused or managed elsewhere */}
          <Navbar />
          <main className="">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
