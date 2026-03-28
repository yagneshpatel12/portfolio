"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Globe, MapPin, Laptop, Building2 } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "", label: "Team Members Led" },
];

const AVAILABILITY = [
  {
    icon: Globe,
    label: "Global Remote",
    sublabel: "US · UK · EU · Worldwide",
    gradient: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    iconBg: "bg-blue-500",
  },
  {
    icon: Laptop,
    label: "India Remote",
    sublabel: "Work from anywhere in India",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    iconBg: "bg-violet-500",
  },
  {
    icon: Building2,
    label: "Onsite / Hybrid",
    sublabel: "Open to India-based offices",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    iconBg: "bg-emerald-500",
  },
  {
    icon: MapPin,
    label: "Based in India",
    sublabel: "Visnagar, Gujarat · IST (UTC+5:30)",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    iconBg: "bg-amber-500",
  },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
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
    <span ref={ref} className="text-4xl font-bold text-blue-500">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">About Me</h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-500 text-sm font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Availability cards */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {AVAILABILITY.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.07 }}
              className={`relative overflow-hidden rounded-xl border ${item.border} ${item.bg} p-4 flex flex-col gap-2`}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient}`} />

              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                <item.icon size={16} className="text-white" />
              </div>

              {/* Text */}
              <div>
                <p className={`font-semibold text-sm ${item.text}`}>{item.label}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-tight">{item.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recruiter tagline */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          {[
            "⚡ Available Immediately",
            "🌍 Timezone-Flexible",
            "🔄 Async & Sync Ready",
            "🤝 Startup to Enterprise",
          ].map((tag) => (
            <span
              key={tag}
              className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
