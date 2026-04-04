import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-M281BMHP3C";

const BASE_URL = "https://www.yagneshpateldev.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Yagnesh Patel | Frontend & Full-Stack Developer | React · Next.js · Node.js",
    template: "%s | Yagnesh Patel",
  },

  description:
    "Frontend & Full-Stack Developer with 3.5+ years shipping real products. Strong on React & Next.js, capable across the full stack. Open to remote roles globally.",

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
      "Frontend & Full-Stack Developer with 3.5+ years shipping real products. Strong on React & Next.js, capable across the full stack. Open to remote roles globally.",
    images: [
      {
        url: `${BASE_URL}/images/profile.jpg`,
        width: 800,
        height: 800,
        alt: "Yagnesh Patel — Frontend & Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Yagnesh Patel | Frontend & Full-Stack Developer",
    description:
      "Frontend & Full-Stack Developer with 3.5+ years shipping real products. Strong on React & Next.js, capable across the full stack. Open to remote roles globally.",
    creator: "@yagneshpatel",
    images: [`${BASE_URL}/images/profile.jpg`],
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
      <body className="min-h-full bg-[#FAFAFA] font-sans">
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
