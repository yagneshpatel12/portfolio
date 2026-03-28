"use client";

import { motion, type Variants } from "motion/react";
import {
  Layout,
  Server,
  Code2,
  Database,
  Paintbrush,
  GitBranch,
  Brain,
  Globe,
  Shield,
  Zap,
  Bot,
  MessageSquare,
  Sparkles,
  Search,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

interface SkillItem {
  name: string;
  icon?: string; // devicon path relative to base
  lucideIcon?: LucideIcon;
  badge?: string;
}

interface SkillCategory {
  title: string;
  Icon: LucideIcon;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    Icon: Layout,
    skills: [
      { name: "React.js", icon: "react/react-original.svg" },
      { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
      { name: "Redux", icon: "redux/redux-original.svg" },
      { name: "Zustand", badge: "Z" },
      { name: "GraphQL", icon: "graphql/graphql-plain.svg" },
      { name: "Context API", lucideIcon: GitBranch },
      { name: "SSR", lucideIcon: Zap },
      { name: "SEO", lucideIcon: Zap },
      { name: "Web Performance", lucideIcon: Zap },
    ],
  },
  {
    title: "Backend",
    Icon: Server,
    skills: [
      { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
      { name: "Express.js", badge: "Ex" },
      { name: "REST APIs", lucideIcon: Globe },
      { name: "JWT Auth", lucideIcon: Shield },
      { name: "Socket.io", lucideIcon: Zap },
      { name: "Strapi CMS", badge: "St" },
    ],
  },
  {
    title: "Languages",
    Icon: Code2,
    skills: [
      { name: "JavaScript ES6", icon: "javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "typescript/typescript-original.svg" },
    ],
  },
  {
    title: "Databases",
    Icon: Database,
    skills: [
      { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
    ],
  },
  {
    title: "Styling & UI",
    Icon: Paintbrush,
    skills: [
      { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original.svg" },
      { name: "Ant Design", icon: "antdesign/antdesign-original.svg" },
      { name: "Material UI", icon: "materialui/materialui-original.svg" },
      { name: "SCSS", icon: "sass/sass-original.svg" },
    ],
  },
  {
    title: "DevOps & Tools",
    Icon: GitBranch,
    skills: [
      { name: "Git", icon: "git/git-original.svg" },
      { name: "GitHub", icon: "github/github-original.svg" },
      { name: "GitLab", icon: "gitlab/gitlab-original.svg" },
      { name: "Jenkins", icon: "jenkins/jenkins-original.svg" },
      { name: "Figma", icon: "figma/figma-original.svg" },
      { name: "Agile/Scrum", lucideIcon: LayoutGrid },
    ],
  },
  {
    title: "AI & Integrations",
    Icon: Brain,
    skills: [
      { name: "LLM API Integration", lucideIcon: Bot },
      { name: "Prompt Engineering", lucideIcon: MessageSquare },
      { name: "AI Chat & Automation", lucideIcon: Sparkles },
      { name: "RAG Basics", lucideIcon: Search },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function SkillPill({ skill }: { skill: SkillItem }) {
  const LIcon = skill.lucideIcon;
  return (
    <span className="bg-blue-50 text-blue-700 text-xs rounded-full px-3 py-1 flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
      {skill.icon ? (
        <img
          src={`${DEVICON_BASE}${skill.icon}`}
          alt={skill.name}
          width={16}
          height={16}
        />
      ) : LIcon ? (
        <LIcon size={12} />
      ) : skill.badge ? (
        <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
          {skill.badge}
        </span>
      ) : null}
      {skill.name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Technical Skills
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <cat.Icon size={18} className="text-blue-500 flex-shrink-0" />
                <h3 className="font-bold text-slate-900 text-sm">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
