"use client";

import { motion } from "motion/react";

interface Shipped {
  /** The headline fact — a number where there is one, a short qualifier where there isn't. */
  value: string;
  label: string;
  title: string;
  detail: string;
}

interface Job {
  company: string;
  role: string;
  period: string;
  startDate: string; // "YYYY-MM"
  endDate?: string; // "YYYY-MM" or undefined = present
  location: string;
  current?: boolean;
  type: string;
  shipped: Shipped[];
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
    company: "SolGuruz",
    role: "Software Engineer",
    period: "July 2023 – Present",
    startDate: "2023-07",
    location: "Ahmedabad, India",
    type: "Remote",
    current: true,
    tags: ["React", "Next.js", "Node.js", "TypeScript", "AI/OpenAI"],
    shipped: [
      {
        value: "300+",
        label: "nurses",
        title: "Nurse shift management platform",
        detail:
          "Led the build. Dual admin portals with shift listings, location-based availability, request workflows and approvals across 20+ facilities.",
      },
      {
        value: "20+",
        label: "hotels",
        title: "Hotel management system",
        detail:
          "Master admin and owner portals, streamlining task management and staff assignment across 8+ departments.",
      },
      {
        value: "1,000+",
        label: "listings",
        title: "Real estate platform",
        detail:
          "Property registration, seller profiles, browse and filter, appointment scheduling and pricing views.",
      },
      {
        value: "Live",
        label: "in production",
        title: "AI healthcare platform",
        detail:
          "Frontend for real-time conversation recording and OpenAI-powered SOAP note generation for clinical documentation.",
      },
      {
        value: "Airline",
        label: "partner build",
        title: "Flight booking platform",
        detail:
          "Built alongside an airline carrier's technical team: landing pages, booking flows and core UI modules.",
      },
      {
        value: "6",
        label: "developers led",
        title: "Team ownership",
        detail:
          "Mentoring, code and pull request reviews, and keeping integration and code quality steady across projects.",
      },
    ],
  },
  {
    company: "SolGuruz",
    role: "Software Engineer",
    period: "March 2022 – Nov 2022",
    startDate: "2022-03",
    endDate: "2022-11",
    location: "Ahmedabad, India",
    type: "Remote",
    tags: ["React", "Node.js", "MongoDB", "Full-Stack"],
    shipped: [
      {
        value: "100k+",
        label: "downloads",
        title: "Music app admin panel",
        detail:
          "Frontend modules powering content management for a leading Gujarati music app on the Play Store.",
      },
      {
        value: "1M+",
        label: "records",
        title: "Diamond inventory and sales portal",
        detail:
          "Full-stack build handling procurement and sales workflows for the lab-grown diamond industry.",
      },
      {
        value: "200+",
        label: "business clients",
        title: "B2B food delivery platform",
        detail:
          "End-to-end ordering workflows, vendor listings and a checkout built for repeat business buyers.",
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-bone">
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
              Experience
            </span>
          </div>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
            Products I&apos;ve shipped for other people.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-moss">
            Two stints at the same company and the platforms that came out of
            them. Every number is what the product actually runs at.
          </p>
        </motion.div>

        {/* Roles */}
        <div className="mt-12 border-t border-edge">
          {JOBS.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.startDate}`}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 border-b border-edge py-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
            >
              {/* Role */}
              <div className="lg:col-span-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-forest">
                    {job.company}
                  </h3>
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/10 px-2.5 py-0.5 text-[11px] font-bold text-forest">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-base font-medium text-moss">
                  {job.role}
                </p>

                <div className="mt-4 space-y-1 text-sm text-soft">
                  <p>
                    {job.period}
                    <span className="mx-1.5">&middot;</span>
                    {calcDuration(job.startDate, job.endDate)}
                  </p>
                  <p>
                    {job.location}
                    <span className="mx-1.5">&middot;</span>
                    {job.type}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-edge bg-white px-3 py-1 text-xs font-medium text-deep"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* What shipped */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {job.shipped.map((item) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 sm:gap-6"
                  >
                    <div className="pt-0.5">
                      <span className="block text-lg font-bold leading-none tracking-[-0.02em] text-signal">
                        {item.value}
                      </span>
                      <span className="mt-1.5 block text-[11px] leading-tight text-soft">
                        {item.label}
                      </span>
                    </div>

                    <div className="border-l border-edge pl-5 sm:pl-6">
                      <h4 className="text-[15px] font-bold leading-snug tracking-[-0.01em] text-deep">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-moss">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
