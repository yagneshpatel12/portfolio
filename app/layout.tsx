import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const BASE_URL = "https://yagneshpatel.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Yagnesh Patel | Frontend & Full-Stack Developer | React · Next.js · Node.js",
    template: "%s | Yagnesh Patel",
  },

  description:
    "Frontend & Full-Stack Developer with 3+ years shipping real products — nurse platforms, real estate portals, AI healthcare tools, hotel systems. Strong on React & Next.js, capable across the full stack. Open to global remote, India remote, hybrid, and onsite roles.",

  keywords: [
    "Yagnesh Patel",
    "Frontend Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "hire React developer",
    "hire frontend developer India",
    "remote React developer",
    "remote frontend developer",
    "React developer India",
    "Next.js developer India",
    "full stack developer India",
    "software engineer India",
    "SolGuruz",
    "AI integration developer",
    "OpenAI API developer",
  ],

  authors: [{ name: "Yagnesh Patel", url: BASE_URL }],
  creator: "Yagnesh Patel",
  publisher: "Yagnesh Patel",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Yagnesh Patel — Portfolio",
    title: "Yagnesh Patel | Frontend & Full-Stack Developer",
    description:
      "3+ years shipping production apps in React, Next.js, Node.js. Built nurse platforms, real estate portals, AI healthcare tools & more. Open to global remote roles.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Yagnesh Patel | Frontend & Full-Stack Developer",
    description:
      "3+ years shipping production apps in React, Next.js, Node.js. Built nurse platforms, real estate portals, AI healthcare tools & more. Open to global remote roles.",
    creator: "@yagneshpatel",
  },

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#FAFAFA] font-sans">{children}</body>
    </html>
  );
}
