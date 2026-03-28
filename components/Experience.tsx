"use client";

import { motion } from "motion/react";
import { MapPin, Calendar, Users, Briefcase } from "lucide-react";

interface Job {
  company: string;
  role: string;
  period: string;
  startDate: string; // "YYYY-MM"
  endDate?: string;  // "YYYY-MM" or undefined = present
  location: string;
  current?: boolean;
  type: string;
  bullets: string[];
  tags: string[];
}

function calcDuration(startDate: string, endDate?: string): string {
  const [sy, sm] = startDate.split("-").map(Number);
  const end = endDate ? new Date(`${endDate}-01`) : new Date();
  const [ey, em] = [end.getFullYear(), end.getMonth() + 1];
  let months = (ey - sy) * 12 + (em - sm);
  if (months < 1) months = 1;
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} mo${mos !== 1 ? "s" : ""}`;
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? "s" : ""}`;
  return `${yrs} yr${yrs !== 1 ? "s" : ""} ${mos} mo${mos !== 1 ? "s" : ""}`;
}

const JOBS: Job[] = [
  {
    company: "SolGuruz LLP",
    role: "Software Engineer",
    period: "July 2023 – Present",
    startDate: "2023-07",
    location: "Ahmedabad, India",
    type: "Remote",
    current: true,
    tags: ["React", "Next.js", "Node.js", "TypeScript", "AI/OpenAI"],
    bullets: [
      "Led development of a nurse shift management platform, building dual admin portals with shift listings, location-based availability, request workflows, and approval systems serving 300+ nurses across 20+ facilities.",
      "Built a hotel management system with dedicated master admin and owner portals, streamlining task management and staff assignment across 20+ hotels and 8+ departments.",
      "Developed a Dubai-based real estate platform with 1,000+ listings, implementing property registration, seller profiles, browse and filter, appointment scheduling, and pricing views.",
      "Collaborated with an airline carrier's technical team to build a flight booking platform, delivering landing pages, booking flows, and core UI modules across a joint development effort.",
      "Engineered frontend for a production AI healthcare platform, implementing real-time conversation recording and OpenAI-powered SOAP note generation for clinical documentation.",
      "Supervised and mentored a team of 6 members, reviewing code and pull requests, and ensuring smooth integration and code quality across projects.",
    ],
  },
  {
    company: "SolGuruz LLP",
    role: "Software Engineer",
    period: "March 2022 – Nov 2022",
    startDate: "2022-03",
    endDate: "2022-11",
    location: "Ahmedabad, India",
    type: "Remote",
    tags: ["React", "Node.js", "MongoDB", "Full-Stack"],
    bullets: [
      "Engineered frontend modules for the admin panel of a leading Gujarati music app, enabling efficient content management and contributing to 100,000+ Play Store downloads.",
      "Built a full stack diamond inventory management and selling portal handling 1M+ diamond records, streamlining procurement and sales workflows for the lab-grown diamond industry.",
      "Developed a B2B food delivery platform, delivering end-to-end ordering workflows, vendor listings, and seamless checkout experience for 200+ business clients.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Work Experience</h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — hidden on mobile, shown md+ */}
          <div className="hidden md:block absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent" />

          <div className="space-y-6">
            {JOBS.map((job, i) => (
              <motion.div
                key={`${job.company}-${i}`}
                className="relative flex gap-0 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                {/* Dot — only on md+ */}
                <div className="hidden md:flex flex-shrink-0 w-10 justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-md ring-2 ring-blue-200 z-10" style={{ marginTop: "38px" }} />
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">

                  {/* Card top accent bar */}
                  <div className={`h-1 w-full ${job.current ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gradient-to-r from-slate-300 to-slate-200"}`} />

                  <div className="p-4 sm:p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{job.company}</h3>
                            {job.current && (
                              <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                                ● Current
                              </span>
                            )}
                          </div>
                          <p className="text-blue-500 font-semibold text-xs sm:text-sm mt-0.5">{job.role}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <span className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                        {calcDuration(job.startDate, job.endDate)}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-[11px] sm:text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-blue-400 flex-shrink-0" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-blue-400 flex-shrink-0" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={11} className="text-blue-400 flex-shrink-0" />
                        {job.type}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 mb-4" />

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-slate-100">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-1 rounded-md whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
