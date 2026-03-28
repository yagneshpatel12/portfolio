"use client";

import { motion } from "motion/react";
import { MapPin, Calendar, Users, Briefcase } from "lucide-react";

interface Job {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  current?: boolean;
  type: string;
  bullets: string[];
  tags: string[];
}

const JOBS: Job[] = [
  {
    company: "SolGuruz LLP",
    role: "Software Engineer",
    period: "July 2023 – Present",
    duration: "1 yr 9 mos",
    location: "Ahmedabad, India",
    type: "Remote",
    current: true,
    tags: ["React", "Next.js", "Node.js", "TypeScript", "AI/OpenAI"],
    bullets: [
      "Led development of a nurse shift management platform, building dual admin portals with shift listings, location-based availability, request workflows, and approval systems serving 300 nurses across 20 facilities.",
      "Built a hotel management system with dedicated master admin and owner portals, streamlining task management and staff assignment across 20 hotels and 8 departments.",
      "Developed a Dubai-based real estate platform with 1,000 listings, implementing property registration, seller profiles, browse and filter, appointment scheduling, and pricing views.",
      "Collaborated with an airline carrier's technical team to build a flight booking platform, delivering landing pages, booking flows, and core UI modules across a joint development effort.",
      "Engineered frontend for a production AI healthcare platform, implementing real-time conversation recording and OpenAI-powered SOAP note generation for clinical documentation.",
      "Supervised and mentored a team of 6 members, reviewing code and pull requests, and ensuring smooth integration and code quality across projects.",
    ],
  },
  {
    company: "SolGuruz LLP",
    role: "Software Engineer",
    period: "March 2022 – Nov 2022",
    duration: "9 mos",
    location: "Ahmedabad, India",
    type: "Remote",
    tags: ["React", "Node.js", "MongoDB", "Full-Stack"],
    bullets: [
      "Engineered frontend modules for the admin panel of a leading Gujarati music app, enabling efficient content management and contributing to 100,000 Play Store downloads.",
      "Built a full stack diamond inventory management and selling portal handling 1M diamond records, streamlining procurement and sales workflows for the lab-grown diamond industry.",
      "Developed a B2B food delivery platform, delivering end-to-end ordering workflows, vendor listings, and seamless checkout experience for 200 business clients.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Work Experience</h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent" />

          <div className="space-y-8">
            {JOBS.map((job, i) => (
              <motion.div
                key={`${job.company}-${i}`}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
              >
                {/* Timeline dot — perfectly centred on the line (left-6 = 24px, dot w-4=16px → ml-[-8px] + left-6) */}
                <div className="relative flex-shrink-0 w-12 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-md ring-2 ring-blue-200 mt-5 z-10" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all mb-2">
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {/* Company logo placeholder */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={14} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{job.company}</h3>
                        {job.current && (
                          <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full animate-pulse">
                            ● Current
                          </span>
                        )}
                      </div>
                      <p className="text-blue-500 font-semibold text-sm">{job.role}</p>
                    </div>

                    {/* Duration badge */}
                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
                      {job.duration}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-blue-400" />
                      {job.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-blue-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={12} className="text-blue-400" />
                      {job.type}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 mb-4" />

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {job.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
