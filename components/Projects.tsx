"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, Lock } from "lucide-react";
import { GithubIcon } from "./icons";

interface Project {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  description: string;
  highlights: string[];
  tech: string[];
  liveDemo: string;
  github: string;
  /** Screenshot in /public/projects. Falls back to a designed panel until one exists. */
  image?: string;
}

const PROJECTS: Project[] = [
  {
    title: "GymFlow",
    subtitle: "Gym management SaaS",
    category: "Full stack",
    date: "2026",
    description:
      "A complete gym operations product: marketing site, real authentication, and an owner dashboard for members, classes, attendance, trainers and plans.",
    highlights: [
      "Marketing site and app in one build",
      "JWT auth with owner and staff roles",
      "KPI charts and attendance check-ins",
      "Progress photos stored in MongoDB",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Tailwind CSS"],
    liveDemo: "https://getgymflow.vercel.app/",
    github: "https://github.com/yagneshpatel12/GymFlow",
    image: "/projects/gymflow.png",
  },
  {
    title: "Digital Society",
    subtitle: "Society management web app",
    category: "Full stack",
    date: "Oct 2021",
    description:
      "A platform for running a residential society: a role-based admin panel covering members, families, events, complaints and notices, secured end to end.",
    highlights: [
      "Role-based admin panel",
      "JWT and OTP authentication",
      "Complaints and event workflows",
      "Media handled through Cloudinary",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Cloudinary", "REST API"],
    liveDemo: "https://society-management.onrender.com/",
    github: "https://github.com/yagneshpatel12/society-management-webapp",
    image: "/projects/digital-society.png",
  },
];

const domainOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Browser({ project }: { project: Project }) {
  // Until a screenshot exists at that path, fall back rather than showing a
  // broken image.
  const [missing, setMissing] = useState(false);
  const showShot = Boolean(project.image) && !missing;

  return (
    <a
      href={project.liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-edge bg-white shadow-xl shadow-forest/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-edge bg-bone px-4 py-3">
        {/* Traffic lights. Deliberately literal macOS values, not theme tokens:
            alert and mint have assigned jobs (errors, live status) and mint is
            already doing that job on this very card. */}
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-edge bg-white px-2.5 py-1">
          <Lock size={10} className="flex-shrink-0 text-mint" />
          <span className="truncate text-[11px] text-soft">
            {domainOf(project.liveDemo)}
          </span>
        </span>
        <ArrowUpRight
          size={15}
          className="flex-shrink-0 text-soft transition-all group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Viewport — 2.15:1 matches how the shots are captured, so they fill the
          frame edge to edge. Still contain, so an odd-sized capture letterboxes
          instead of losing its right edge. */}
      <div
        className={`relative aspect-[43/20] ${showShot ? "bg-white" : "bg-bone"}`}
      >
        {showShot ? (
          <Image
            src={project.image as string}
            alt={`${project.title} interface`}
            fill
            sizes="(max-width: 1024px) 92vw, 640px"
            onError={() => setMissing(true)}
            className="object-contain object-top transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,59,46,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,59,46,0.05) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 75%)",
              }}
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-lg font-bold text-bone">
              {project.title.charAt(0)}
            </span>
            <span className="relative text-sm font-semibold text-forest">
              Open the live app
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-signal" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-signal">
              Projects
            </span>
          </div>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
            Live products, not case studies.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-moss">
            Everything here runs in production, and every layer of it is mine:
            design, frontend, backend, deployment. Open them and click around.
            Most of my other work is client software under NDA, so these are the
            ones I can hand you a link to.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div
                className={`lg:col-span-7 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Browser project={project} />
              </div>

              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-edge bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-deep">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-[11px] font-bold text-forest">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    Live
                  </span>
                  <span className="text-[11px] font-medium text-soft">
                    {project.date}
                  </span>
                </div>

                <h3 className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-forest">
                  {project.title}
                </h3>
                <p className="mt-1 text-base font-medium text-moss">
                  {project.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-moss">
                  {project.description}
                </p>

                <ul className="mt-5 grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
                  {project.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-snug text-deep"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-edge bg-white px-3 py-1 text-xs font-medium text-moss"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(255,90,36,0.85)] transition-colors hover:bg-signal-hi focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
                  >
                    Open live app
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-edge bg-white px-5 py-3 text-sm font-semibold text-deep transition-colors hover:border-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
                  >
                    <GithubIcon width={15} height={15} />
                    Source
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* The work that can't be linked */}
        <motion.div
          className="mt-16 rounded-3xl bg-forest p-8 sm:p-10 text-bone"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2.5">
                <Lock size={15} className="text-citrus" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-citrus">
                  Under NDA
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] sm:text-[1.75rem]">
                Most of what I&apos;ve built lives behind a login.
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bone/75">
                Nurse platforms, hotel systems, real estate portals, an AI
                healthcare tool, a flight booking build. Admin panels and
                internal tools, all under NDA, so there&apos;s no link to hand
                you. A 30-minute call is the fastest way to see what I actually
                did, and anything you hand me gets the same discretion.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex min-h-[44px] flex-shrink-0 items-center gap-2 self-start rounded-full bg-citrus px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-white lg:self-auto"
            >
              Ask for a walkthrough
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
