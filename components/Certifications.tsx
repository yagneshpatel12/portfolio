"use client";

import { motion, type Variants } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { BadgeCheck, ExternalLink, Award, Sparkles } from "lucide-react";

import claudeApiImg from "@/public/certifications/building-with-claude-api.jpg";
import mcpImg from "@/public/certifications/introduction-to-model-context-protocol.jpg";
import agentSkillsImg from "@/public/certifications/introduction-to-agent-skill.jpg";
import claudeCodeImg from "@/public/certifications/claude-code-in-action.jpg";
import aiFluencyImg from "@/public/certifications/ai-fluency-framework-foundation.jpg";
import claude101Img from "@/public/certifications/claude-101.jpg";

interface Certification {
  title: string;
  description: string;
  link: string;
  image: StaticImageData | null; // static import, or null for branded fallback
  featured?: boolean;
}

// Ordered for recruiter/CTO impact: hands-on, build-focused credentials first,
// foundational courses last.
const CERTIFICATIONS: Certification[] = [
  {
    title: "Building with the Claude API",
    description:
      "Building applications on the Claude API, including tool use, prompting, and integration.",
    link: "https://verify.skilljar.com/c/nqamtohvne9c",
    image: claudeApiImg,
    featured: true,
  },
  {
    title: "Introduction to Model Context Protocol",
    description:
      "Connecting Claude to external tools and data sources using the Model Context Protocol.",
    link: "https://verify.skilljar.com/c/w5fxuqiaqnsz",
    image: mcpImg,
  },
  {
    title: "Introduction to Agent Skills",
    description:
      "Building and using Agent Skills to extend what Claude can do inside real workflows.",
    link: "https://verify.skilljar.com/c/vautracw58vy",
    image: agentSkillsImg,
  },
  {
    title: "Claude Code in Action",
    description:
      "Hands-on use of Claude Code to build, debug, and ship software faster from the terminal.",
    link: "https://verify.skilljar.com/c/qaht2jxzfooj",
    image: claudeCodeImg,
  },
  {
    title: "AI Fluency: Framework & Foundations",
    description:
      "A framework for working effectively with AI, covering core concepts and practical foundations for real use.",
    link: "https://verify.skilljar.com/c/cg95ggoj265e",
    image: aiFluencyImg,
  },
  {
    title: "Claude 101",
    description:
      "Foundations of using Claude for real work tasks, core features, and effective everyday use.",
    link: "https://verify.skilljar.com/c/usm6j76preqz",
    image: claude101Img,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function CertCard({ cert }: { cert: Certification }) {
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      {/* Thumbnail — rounds on its own container so the hover zoom stays clipped */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-100">
        {cert.image ? (
          <Image
            src={cert.image}
            alt={`${cert.title} certificate`}
            fill
            quality={90}
            placeholder="blur"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          // Branded fallback for certificate without a supplied image
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 text-center">
            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-violet-500 opacity-20 blur-2xl" />
            <div className="absolute -bottom-6 left-6 h-28 w-28 rounded-full bg-blue-500 opacity-20 blur-2xl" />
            <div className="relative mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/20">
              <Award size={20} className="text-violet-300" />
            </div>
            <p className="relative text-sm font-semibold text-white leading-snug">
              {cert.title}
            </p>
          </div>
        )}

        {/* Verified badge overlay */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-blue-600 shadow-sm backdrop-blur">
          <BadgeCheck size={12} className="text-blue-500" />
          Verified
        </span>

        {cert.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            <Sparkles size={11} />
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Issuer */}
        <div className="mb-2 flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-orange-500 to-amber-600 text-[9px] font-bold text-white">
            A
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Anthropic · Claude
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-slate-900">
          {cert.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          {cert.description}
        </p>

        {/* Verify link */}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
          Verify credential
          <ExternalLink
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </motion.a>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-100 mb-4">
            <BadgeCheck size={12} />
            Official Anthropic Training
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Certifications
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Verified credentials from Anthropic covering the Claude API, MCP,
            Agent Skills, and Claude Code, the core stack behind modern AI
            product work.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CERTIFICATIONS.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
