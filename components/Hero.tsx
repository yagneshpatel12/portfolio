"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  type Variants,
} from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { experienceLabel } from "@/lib/experience";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Headline lines rise out of their own clipping mask.
const lineReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Teaser for the full "How I work" section further down the page.
const PIPELINE = [
  { step: "01", label: "Design", detail: "Discovery, UX, UI" },
  { step: "02", label: "Build", detail: "Frontend, backend, integrations" },
  { step: "03", label: "Deploy", detail: "Hosting, domains, going live" },
  { step: "04", label: "Handover", detail: "Docs, training, support" },
];

const GRID_MASK =
  "radial-gradient(ellipse 78% 62% at 50% 38%, #000 34%, transparent 100%)";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")";

export default function Hero() {
  const { phrase: experiencePhrase } = experienceLabel();

  // Cursor spotlight (starts off-canvas so it only appears on move).
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${pointerX}px ${pointerY}px, rgba(255,193,43,0.22), transparent 62%)`;

  const trackPointer = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      onMouseMove={trackPointer}
      className="relative isolate overflow-hidden bg-bone min-h-[100svh] flex items-center pt-24 pb-14"
    >
      {/* ── Ambient layers ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,59,46,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(11,59,46,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -right-40 h-[620px] w-[620px] rounded-full bg-citrus/25 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -left-44 h-[560px] w-[560px] rounded-full bg-mint/15 blur-[150px]"
      />
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 hidden md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-40 mix-blend-multiply"
        style={{ backgroundImage: NOISE }}
      />

      {/* ── Content ── */}
      <div className="relative z-[2] max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Kicker + availability */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 mb-7"
          >
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-signal" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-signal">
                End to end web product partner
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-white px-3.5 py-1.5 text-sm font-medium text-deep shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Open for new projects
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-bone shadow-sm">
                Freelance
                <span className="h-1 w-1 rounded-full bg-citrus" />
                Contract
                <span className="h-1 w-1 rounded-full bg-citrus" />
                Full-time
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1 className="font-bold text-forest tracking-[-0.04em] leading-[0.96] text-[clamp(2.5rem,5.4vw,4.75rem)]">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={lineReveal} className="block">
                I build and ship complete
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={lineReveal} className="block">
                web products, <span className="text-signal">end to end.</span>
              </motion.span>
            </span>
          </h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg sm:text-xl text-moss font-medium max-w-2xl"
          >
            Design, development, deployment, handover. You bring the idea, I hand
            back a live product.
          </motion.p>

          {/* Portrait + pitch + CTAs */}
          <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Portrait */}
            <motion.div variants={fadeUp} className="lg:col-span-4 xl:col-span-3">
              <div className="relative w-[180px] sm:w-[205px] lg:w-full lg:max-w-[225px]">
                <div
                  aria-hidden
                  className="absolute -inset-5 rounded-[40px] bg-citrus/35 blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-forest/15 bg-forest shadow-2xl shadow-forest/25">
                    <Image
                      src="/images/profile-v2.jpg"
                      alt="Yagnesh Patel, full-stack developer"
                      fill
                      sizes="(max-width: 640px) 180px, (max-width: 1024px) 205px, 225px"
                      preload
                      className="object-cover object-[center_18%]"
                    />
                  </div>

                  {/* Proof chip */}
                  <div className="absolute -bottom-5 -right-4 rounded-2xl border border-edge bg-white px-3.5 py-2.5 shadow-lg shadow-forest/10">
                    <p className="text-forest font-bold text-base leading-none">10+</p>
                    <p className="text-soft text-[11px] font-medium mt-1.5 leading-none">
                      products shipped
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Pitch + CTAs */}
            <motion.div variants={fadeUp} className="lg:col-span-8 xl:col-span-9">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-deep">
                  Yagnesh Patel
                </span>
                <span className="h-px w-8 bg-soft/70" />
                <span className="text-[15px] font-medium text-moss">
                  Full-stack developer, India
                </span>
              </div>

              <p className="text-moss text-base sm:text-lg leading-relaxed max-w-2xl first-letter:uppercase">
                {experiencePhrase} of shipping real products: nurse platforms, real
                estate portals, AI healthcare tools, hotel systems. I take a build
                from the first wireframe to the live URL, hand it over clean, and
                stick around for support.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("contact")}
                  className="cursor-pointer group inline-flex items-center gap-2 rounded-full bg-signal hover:bg-signal-hi text-white font-semibold px-6 py-3 min-h-[44px] transition-colors shadow-[0_14px_30px_-12px_rgba(255,90,36,0.8)]"
                >
                  Start a Project
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => scrollTo("projects")}
                  className="cursor-pointer inline-flex items-center rounded-full border border-edge bg-white hover:border-soft text-deep font-medium px-6 py-3 min-h-[44px] transition-colors"
                >
                  View My Work
                </button>
                <a
                  href="/YAGNESH_RESUME.pdf"
                  download
                  className="inline-flex items-center gap-2 text-moss hover:text-deep font-medium px-3 py-3 min-h-[44px] transition-colors"
                >
                  <Download size={16} />
                  Resume
                </a>

                <span className="hidden sm:block h-6 w-px bg-edge mx-1" />

                <div className="flex items-center gap-1">
                  {[
                    {
                      href: "https://github.com/yagneshpatel12",
                      label: "GitHub",
                      icon: <GithubIcon width={20} height={20} />,
                    },
                    {
                      href: "https://www.linkedin.com/in/yagneshpatel05/",
                      label: "LinkedIn",
                      icon: <LinkedinIcon width={20} height={20} />,
                    },
                    {
                      href: "mailto:yagnesh6202patel@gmail.com",
                      label: "Email",
                      icon: <Mail size={20} />,
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full text-soft hover:text-signal hover:bg-forest/5 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Process strip */}
          <motion.div
            variants={fadeUp}
            className="mt-10 pt-6 border-t border-forest/15 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6"
          >
            {PIPELINE.map((item) => (
              <div key={item.step} className="group flex items-start gap-3">
                <span className="text-xs font-bold text-signal mt-0.5 tabular-nums">
                  {item.step}
                </span>
                <div>
                  <p className="text-deep font-semibold text-sm leading-none">
                    {item.label}
                  </p>
                  <p className="text-soft text-xs mt-2 leading-snug">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
