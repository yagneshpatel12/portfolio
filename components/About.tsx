"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Handshake, PenTool, Rocket, KeyRound } from "lucide-react";
import { experienceLabel } from "@/lib/experience";

const exp = experienceLabel();

const STATS = [
  { value: exp.value, prefix: exp.prefix, suffix: "", label: "Years shipping products" },
  { value: 10, suffix: "+", label: "Products delivered" },
  { value: 6, suffix: "", label: "Developers led" },
];

// What a client actually gets — not what I am.
const PROMISES = [
  {
    icon: Handshake,
    title: "One point of contact",
    body: "You brief one person and one person stays accountable, from the first sketch to the bug you spot in week nine.",
  },
  {
    icon: PenTool,
    title: "Design is included",
    body: "Wireframes, interface, responsive states. You don't need a designer lined up first, and you don't need to hand me a Figma file to get started.",
  },
  {
    icon: Rocket,
    title: "Shipped, not just built",
    body: "Hosting, domains, environments, deploys. The work is done when it's live and your team is using it, not when the code runs on my machine.",
  },
  {
    icon: KeyRound,
    title: "Yours after handover",
    body: "Repos, docs, credentials and a walkthrough. If you bring in another developer next year, they can pick it up without calling me.",
  },
];

// The timezone question, answered before anyone has to ask it.
const COVERAGE = [
  { region: "US & Canada", detail: "Your morning, my evening" },
  { region: "UK & Europe", detail: "Same working day" },
  { region: "Anywhere else", detail: "Async, daily written updates" },
];

function CountUp({
  target,
  prefix = "",
  suffix,
}: {
  target: number;
  prefix?: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="text-4xl sm:text-5xl font-bold text-forest tracking-tight tabular-nums"
    >
      {prefix}
      {count}
      <span className="text-signal">{suffix}</span>
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[2px] w-10 bg-signal" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-signal">
              About
            </span>
          </div>
          <h2 className="text-3xl lg:text-[2.75rem] leading-[1.05] font-bold text-forest tracking-[-0.03em]">
            One partner for the whole build, not a pair of hands for part of it.
          </h2>
        </motion.div>

        {/* Statement + promises */}
        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Statement card */}
          <motion.div
            className="lg:col-span-5 rounded-3xl bg-forest text-bone p-8 sm:p-9 flex flex-col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <p className="text-lg leading-relaxed text-bone/85">
              I&apos;m Yagnesh, a full-stack developer. For{" "}
              <span className="text-citrus font-medium">{exp.phrase}</span>{" "}
              I&apos;ve shipped production web apps inside a product team, owning
              features from brief to release.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-bone/85">
              Now I take that work on directly. You bring the idea; I design it,
              build it, ship it to your domain and hand it back with docs you can
              follow. No handoffs, no &ldquo;that wasn&apos;t in my scope&rdquo;.
            </p>

            <div className="mt-auto pt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-citrus" />
              <span className="text-sm text-bone/70">
                Yagnesh Patel, full-stack developer
              </span>
            </div>
          </motion.div>

          {/* Promise cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {PROMISES.map((item, i) => (
              <motion.div
                key={item.title}
                className="group rounded-2xl border border-edge bg-bone/60 hover:bg-bone p-6 transition-colors"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 + i * 0.06 }}
              >
                <span className="inline-flex w-10 h-10 rounded-xl bg-white border border-edge items-center justify-center text-signal group-hover:bg-signal group-hover:text-white group-hover:border-signal transition-colors">
                  <item.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-bold text-deep tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-moss">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 rounded-3xl border border-edge overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-8 py-7 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l border-edge" : ""
              }`}
            >
              <span className="block h-[3px] w-8 rounded-full bg-signal mb-4" />
              <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-moss">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Where I work, and how the clock works out */}
        <motion.div
          className="relative isolate overflow-hidden mt-4 rounded-3xl border border-edge bg-bone p-7 sm:p-9"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          {/* Warm texture, so it reads as a surface rather than an empty box */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(11,59,46,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,59,46,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 65% 85% at 12% 20%, #000 10%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 85% at 12% 20%, #000 10%, transparent 72%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-citrus/30 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2.5 text-base font-semibold text-deep">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Available now, worldwide
              </span>
              <span className="text-sm text-moss">
                Freelance, contract or full-time
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-edge grid sm:grid-cols-3 gap-x-8 gap-y-5">
              {COVERAGE.map((item) => (
                <div key={item.region}>
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-signal">
                    {item.region}
                  </p>
                  <p className="mt-2 text-sm font-medium text-deep">{item.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 pt-5 border-t border-edge text-sm text-soft">
              Visnagar, India &middot; IST (UTC+5:30) &middot; English &middot; Slack,
              Teams or email
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
