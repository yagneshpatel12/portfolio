import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import Activity from "@/components/Activity";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { experienceLabel } from "@/lib/experience";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yagnesh Patel",
  alternateName: "Yagneshkumar Patel",
  url: "https://www.yagneshpateldev.com",
  email: "yagnesh6202patel@gmail.com",
  telephone: "+919328406174",
  image: "https://www.yagneshpateldev.com/images/profile-v2.jpg",
  jobTitle: "Full-Stack Developer",
  description: `Full-stack developer who designs, builds, deploys and hands over complete web products. ${experienceLabel().phrase} shipping production apps in React, Next.js and Node.js. Available for freelance projects, contracts and full-time roles, worldwide.`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/yagneshpatel12",
    "https://www.linkedin.com/in/yagneshpatel05/",
  ],
  knowsAbout: [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "OpenAI API",
    "Claude API",
    "Model Context Protocol",
    "Full-Stack Development",
    "Frontend Development",
    "Web Application Deployment",
  ],

  // Mirrors the Certifications section, so the structured data matches what a
  // visitor can actually see and verify.
  hasCredential: [
    ["Building with the Claude API", "nqamtohvne9c"],
    ["Introduction to Model Context Protocol", "w5fxuqiaqnsz"],
    ["Introduction to Agent Skills", "vautracw58vy"],
    ["Claude Code in Action", "qaht2jxzfooj"],
    ["AI Fluency: Framework & Foundations", "cg95ggoj265e"],
    ["Claude 101", "usm6j76preqz"],
  ].map(([name, code]) => ({
    "@type": "EducationalOccupationalCredential",
    name,
    credentialCategory: "certificate",
    url: `https://verify.skilljar.com/c/${code}`,
    recognizedBy: { "@type": "Organization", name: "Anthropic" },
  })),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sankalchand Patel University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Visnagar",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "SolGuruz",
    url: "https://solguruz.com",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Navbar />
        <Hero />
        {/* Promise, then proof, then capability: a founder wants something
            clickable long before a skills list. */}
        <About />
        <Projects />
        <Experience />
        <Activity />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
