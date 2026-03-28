"use client";

import { motion } from "motion/react";
import { ExternalLink, Plus } from "lucide-react";
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 transition-all"
          >
            {/* Top gradient strip */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2" />

            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Digital Society — Society Management Web App
              </h3>
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
                    className="bg-blue-50 text-blue-700 text-xs rounded-full px-3 py-1 flex items-center gap-1.5 font-medium"
                  >
                    {tech.icon && (
                      <img
                        src={`${DEVICON_BASE}${tech.icon}`}
                        alt={tech.name}
                        width={14}
                        height={14}
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
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors min-h-[44px]"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
                <a
                  href="https://github.com/yagneshpatel12/society-management-webapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-slate-300 hover:border-blue-500 hover:text-blue-500 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors min-h-[44px]"
                >
                  <GithubIcon width={14} height={14} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Placeholder card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center min-h-[280px] p-8"
          >
            <Plus size={32} className="text-slate-300 mb-3" />
            <p className="text-slate-400 text-sm font-medium text-center">
              More projects coming soon...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
