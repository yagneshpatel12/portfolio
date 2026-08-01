"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { BadgeCheck, ArrowUpRight } from "lucide-react";

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
  image: StaticImageData;
}

// Ordered for recruiter/CTO impact: hands-on, build-focused credentials first,
// foundational courses last.
const CERTIFICATIONS: Certification[] = [
  {
    title: "Building with the Claude API",
    description:
      "Applications on the Claude API, including tool use, prompting and integration.",
    link: "https://verify.skilljar.com/c/nqamtohvne9c",
    image: claudeApiImg,
  },
  {
    title: "Introduction to Model Context Protocol",
    description:
      "Connecting Claude to external tools and data sources over MCP.",
    link: "https://verify.skilljar.com/c/w5fxuqiaqnsz",
    image: mcpImg,
  },
  {
    title: "Introduction to Agent Skills",
    description:
      "Building and using Agent Skills to extend what Claude does inside real workflows.",
    link: "https://verify.skilljar.com/c/vautracw58vy",
    image: agentSkillsImg,
  },
  {
    title: "Claude Code in Action",
    description:
      "Hands-on use of Claude Code to build, debug and ship software from the terminal.",
    link: "https://verify.skilljar.com/c/qaht2jxzfooj",
    image: claudeCodeImg,
  },
  {
    title: "AI Fluency: Framework & Foundations",
    description:
      "A working framework for using AI on real tasks, from core concepts to practice.",
    link: "https://verify.skilljar.com/c/cg95ggoj265e",
    image: aiFluencyImg,
  },
  {
    title: "Claude 101",
    description:
      "Foundations of Claude for real work: core features and effective everyday use.",
    link: "https://verify.skilljar.com/c/usm6j76preqz",
    image: claude101Img,
  },
];

// The verify URL ends in the real credential code — that's the part worth showing.
const codeOf = (link: string) =>
  link.split("/").filter(Boolean).pop()?.toUpperCase() ?? "";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-signal" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-signal">
                Certifications
              </span>
            </div>
            <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
              The AI work is trained, not improvised.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-moss">
              I&apos;ve completed six Anthropic credentials covering the Claude
              API, MCP, Agent Skills and Claude Code. Each one is issued to my
              full name, Yagneshkumar Patel, and every code below checks out
              against Anthropic&apos;s own verifier.
            </p>
          </div>

          {/* Proof, kept small — the certificates read better as a stack than blown up */}
          <div className="group relative h-[168px] w-[248px] flex-shrink-0 self-start lg:self-center">
            {[claude101Img, mcpImg, claudeApiImg].map((img, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-[172px] overflow-hidden rounded-xl border border-edge bg-bone shadow-lg shadow-forest/10 transition-transform duration-500"
                style={{
                  transform: `translate(-50%, -50%) rotate(${
                    (i - 1) * 7
                  }deg) translateX(${(i - 1) * 26}px)`,
                  zIndex: i,
                }}
              >
                <Image
                  src={img}
                  alt=""
                  aria-hidden
                  quality={70}
                  sizes="172px"
                  className="h-auto w-full"
                />
              </div>
            ))}
            <span className="absolute -bottom-1 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-edge bg-white px-3.5 py-1.5 text-xs font-semibold text-deep shadow-sm">
              <BadgeCheck size={14} className="text-mint" />
              6 verified
            </span>
          </div>
        </motion.div>

        {/* Register */}
        <div className="mt-12 border-t border-edge">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
              className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-x-6 gap-y-3 border-b border-edge px-3 -mx-3 py-5 rounded-lg transition-colors hover:bg-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <div className="lg:col-span-7 flex items-start gap-3.5">
                <BadgeCheck
                  size={19}
                  className="mt-0.5 flex-shrink-0 text-mint"
                />
                <div>
                  <h3 className="text-base font-bold leading-snug tracking-[-0.01em] text-forest">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-moss">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3 pl-[33px] lg:pl-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-soft">
                  Credential
                </span>
                <span className="mt-0.5 block text-[13px] tracking-[0.08em] text-moss">
                  {codeOf(cert.link)}
                </span>
              </div>

              <span className="lg:col-span-2 pl-[33px] lg:pl-0 inline-flex items-center gap-1.5 text-sm font-semibold text-signal lg:justify-end">
                Verify
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
