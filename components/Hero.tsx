"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};


export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen pt-16 flex items-center bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                Available for Global Remote Roles
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4"
            >
              Yagnesh Patel
            </motion.h1>

            {/* H2 */}
            <motion.h2
              variants={fadeUp}
              className="text-2xl text-slate-500 font-medium mb-6"
            >
              Frontend & Full-Stack Developer | React · Next.js · Node.js
            </motion.h2>

            {/* Para */}
            <motion.p
              variants={fadeUp}
              className="text-slate-500 text-lg leading-relaxed max-w-xl mb-8"
            >
              Full-stack developer with 3+ years building and shipping real products — nurse platforms, real estate portals, AI healthcare tools, hotel systems. Strong on frontend, capable across the full stack. Clean code, real ownership, startup pace.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={scrollToProjects}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors min-h-[44px]"
              >
                View My Work
              </button>
              <a
                href="/YAGNESH_RESUME.pdf"
                download
                className="flex items-center gap-2 border border-slate-300 hover:border-blue-500 hover:text-blue-500 text-slate-700 font-medium px-6 py-3 rounded-lg transition-colors min-h-[44px]"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/yagneshpatel12"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <GithubIcon width={22} height={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/yagneshpatel05/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <LinkedinIcon width={22} height={22} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&to=yagnesh6202patel@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right photo */}
          <motion.div
            className="flex-shrink-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl"
                style={{ border: "4px solid #3B82F6" }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Yagnesh Patel - Full-Stack Developer"
                  width={288}
                  height={288}
                  sizes="(max-width: 768px) 256px, 288px"
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
