import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";
import { experienceLabel } from "@/lib/experience";

const GA_ID = "G-M281BMHP3C";

const BASE_URL = "https://www.yagneshpateldev.com";

const TITLE = "Yagnesh Patel | Full-Stack Developer & Web Product Partner";

const DESCRIPTION = `I design, build, deploy and hand over complete web products. ${
  experienceLabel().phrase
} shipping React, Next.js and Node apps. Freelance, contract or full-time.`;

export const viewport: Viewport = {
  themeColor: "#F7F5EF",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: "%s | Yagnesh Patel",
  },

  description: DESCRIPTION,

  keywords: [
    "Yagnesh Patel",
    "full stack developer",
    "freelance full stack developer",
    "freelance web developer India",
    "hire full stack developer India",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "end to end web development",
    "MVP development",
    "build a web app",
    "remote developer India",
    "AI integration developer",
    "OpenAI API developer",
    "Claude API developer",
  ],

  authors: [{ name: "Yagnesh Patel", url: BASE_URL }],
  creator: "Yagnesh Patel",
  publisher: "Yagnesh Patel",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Yagnesh Patel",
    title: TITLE,
    description: DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
      <body className="min-h-full bg-bone font-sans">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
