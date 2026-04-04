import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yagnesh Patel",
  alternateName: "Yagneshkumar Patel",
  url: "https://www.yagneshpateldev.com",
  email: "yagnesh6202patel@gmail.com",
  telephone: "+919328406174",
  image: "https://www.yagneshpateldev.com/images/profile.jpg",
  jobTitle: "Frontend & Full-Stack Developer",
  description:
    "Frontend & Full-Stack Developer with 3.5+ years building production web apps in React, Next.js, and Node.js. Open to global remote, hybrid, and onsite roles.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Visnagar",
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
    "Full-Stack Development",
    "Frontend Development",
  ],
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
      <main className="relative">
        <ParticlesBackground />
        <div className="relative z-10" style={{ isolation: "isolate" }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
