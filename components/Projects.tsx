"use client";

import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Rocket, Star, Calendar } from "lucide-react";
import { GithubIcon } from "./icons";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

interface TechItem {
  name: string;
  icon?: string;
}

const PROJECT_TECH: TechItem[] = [
  { name: "React.js", icon: "react/react-original.svg" },
  { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
  { name: "Cloudinary" },
  { name: "REST API" },
];


export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── Project card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 transition-all"
          >
            {/* Top gradient strip */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5" />

            <div className="p-6">
              {/* Badge row */}
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-blue-100">
                  Full Stack
                </span>
                <span className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                  <Star size={11} fill="currentColor" /> Featured
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">Digital Society</h3>
                <span className="flex items-center gap-1 text-slate-400 text-[11px] font-medium whitespace-nowrap flex-shrink-0">
                  <Calendar size={11} />
                  Oct 2021
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium mb-3">Society Management Web App</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Full stack platform with role-based admin panel for managing
                society members, families, events, complaints, and
                advertisements. Secured with JWT + OTP authentication.
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {PROJECT_TECH.map((tech) => (
                  <span
                    key={tech.name}
                    className="bg-slate-50 text-slate-600 border border-slate-200 text-xs rounded-full px-3 py-1 flex items-center gap-1.5 font-medium"
                  >
                    {tech.icon && (
                      <img
                        src={`${DEVICON_BASE}${tech.icon}`}
                        alt={tech.name}
                        width={13}
                        height={13}
                      />
                    )}
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a
                  href="https://society-management.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors min-h-[44px]"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
                <a
                  href="https://github.com/yagneshpatel12/society-management-webapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-slate-200 hover:border-slate-400 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors min-h-[44px]"
                >
                  <GithubIcon width={13} height={13} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Coming soon card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden"
          >
            {/* Decorative orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-8 w-36 h-36 bg-violet-500 rounded-full opacity-10 blur-2xl pointer-events-none" />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative p-6 flex flex-col h-full min-h-[360px]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Rocket size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">More Projects</p>
                  <p className="text-slate-400 text-xs">Work samples available on request</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 bg-white/10 border border-white/15 text-green-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  In Progress
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 flex items-center">
                <p className="text-slate-300 text-sm leading-relaxed">
                  I&apos;ve shipped <span className="text-white font-semibold">10+ production projects</span> across healthcare, real estate, hospitality, and e-commerce — most under <span className="text-white font-semibold">NDA</span> as part of my professional work at SolGuruz LLP.
                </p>
              </div>

              {/* Footer CTA */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <p className="text-slate-400 text-xs">
                  Interested in seeing my work?
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=yagnesh6202patel@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  Request Samples <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
