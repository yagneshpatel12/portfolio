"use client";

import { motion, type Variants } from "motion/react";
import { Layout, Server, Rocket, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Capability {
  label: string;
  Icon: LucideIcon;
  blurb: string;
  tags: string[];
}

// Grouped by the part of the product it covers, so the list reads as
// "nothing here needs a second hire" rather than as a tool inventory.
const CAPABILITIES: Capability[] = [
  {
    label: "Frontend & interface",
    Icon: Layout,
    blurb: "The part your users touch, on every screen size.",
    tags: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript ES6",
      "Redux",
      "Zustand",
      "Context API",
      "Tailwind CSS",
      "Ant Design",
      "Material UI",
      "SCSS",
      "Figma",
      "SSR",
      "SEO",
      "Web performance",
    ],
  },
  {
    label: "Backend & data",
    Icon: Server,
    blurb: "APIs, auth and the database sitting behind them.",
    tags: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "JWT auth",
      "Strapi CMS",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    label: "Ship & run",
    Icon: Rocket,
    blurb: "Getting it live, and keeping it that way.",
    tags: ["Vercel", "AWS", "Jenkins", "CI/CD", "Git", "GitHub", "GitLab"],
  },
];

const AI: Capability = {
  label: "AI & integrations",
  Icon: Brain,
  blurb: "Where most of the new work is going, and I already build there.",
  tags: [
    "AI agents",
    "MCP",
    "RAG",
    "LLM API integration",
    "LangChain",
    "Vercel AI SDK",
    "Claude Code",
    "OpenAI Codex",
    "Cursor",
    "Prompt engineering",
  ],
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-10 bg-signal" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-signal">
              Skills
            </span>
          </div>
          <h2 className="text-3xl lg:text-[2.75rem] leading-[1.05] font-bold text-forest tracking-[-0.03em]">
            Everything a product needs, from one person.
          </h2>
        </motion.div>

        {/* Capability rows */}
        <div className="mt-12 border-t border-edge">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.label}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08 }}
              className="grid lg:grid-cols-12 gap-4 lg:gap-10 py-8 border-b border-edge"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2.5">
                  <cap.Icon size={17} className="text-signal flex-shrink-0" />
                  <h3 className="text-base font-bold text-forest tracking-tight">
                    {cap.label}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-moss leading-relaxed max-w-xs">
                  {cap.blurb}
                </p>
              </div>

              <div className="lg:col-span-8 flex flex-wrap gap-2 content-start">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-edge bg-white px-3.5 py-1.5 text-sm font-medium text-deep hover:border-signal hover:text-signal transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI & integrations — the differentiator, so it gets the dark card */}
        <motion.div
          className="mt-8 rounded-3xl bg-forest text-bone p-7 sm:p-9 grid lg:grid-cols-12 gap-6 lg:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <AI.Icon size={17} className="text-citrus flex-shrink-0" />
              <h3 className="text-base font-bold tracking-tight">{AI.label}</h3>
            </div>
            <p className="mt-2 text-sm text-bone/70 leading-relaxed max-w-xs">
              {AI.blurb}
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-wrap gap-2 content-start">
            {AI.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/20 bg-bone/10 px-3.5 py-1.5 text-sm font-medium text-bone/90 hover:bg-bone/20 hover:border-citrus/60 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
