import { Inter } from "next/font/google";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { StyleGlideProvider } from "@/components/styleglide-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { profile } from "@/data/profile";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} - ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.metadata.description,
  keywords: profile.metadata.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  robots: {
    index: true,
    follow: true,
  },
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
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StyleGlideProvider />
          <Navbar />
          <main className="">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
