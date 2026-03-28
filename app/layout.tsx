import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yagneshpatel.dev"),
  title: "Yagnesh Patel | Full-Stack Developer | React & Next.js",
  description:
    "Full-Stack Developer with 3+ years building production web apps in React, Next.js, Node.js. Open to remote frontend and full-stack roles globally.",
  keywords: [
    "React developer",
    "Next.js developer",
    "Full-Stack developer",
    "remote developer India",
    "hire React developer",
  ],
  openGraph: {
    title: "Yagnesh Patel | Full-Stack Developer | React & Next.js",
    description:
      "Full-Stack Developer with 3+ years building production web apps in React, Next.js, Node.js. Open to remote frontend and full-stack roles globally.",
    url: "https://yagneshpatel.dev",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yagnesh Patel - Full-Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yagnesh Patel | Full-Stack Developer | React & Next.js",
    description:
      "Full-Stack Developer with 3+ years building production web apps in React, Next.js, Node.js. Open to remote frontend and full-stack roles globally.",
  },
  alternates: {
    canonical: "https://yagneshpatel.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
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
