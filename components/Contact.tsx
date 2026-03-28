"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const GMAIL = "https://mail.google.com/mail/?view=cm&to=yagnesh6202patel@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
      {/* Background gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-100 mb-4">
            <Sparkles size={12} />
            Open to Opportunities
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              Great Together
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Looking for a full-stack engineer who ships fast and communicates clearly? I&apos;m actively exploring global remote, India remote, hybrid, and onsite roles.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left — contact info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            {/* Info card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
                Contact Info
              </p>
              <div className="flex flex-col gap-5">
                <a
                  href={GMAIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                    <Mail size={16} className="text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-500 transition-colors">
                      yagnesh6202patel@gmail.com
                    </p>
                  </div>
                </a>

                <a href="tel:+919328406174" className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                    <Phone size={16} className="text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-500 transition-colors">
                      +91 9328406174
                    </p>
                  </div>
                </a>

                <div className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Location</p>
                    <p className="text-sm font-medium text-slate-700">
                      Visnagar, Gujarat, India
                    </p>
                    <p className="text-xs text-slate-400">IST (UTC+5:30) · Timezone-flexible</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social row */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/yagneshpatel12"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-slate-900 hover:shadow-md transition-all"
              >
                <GithubIcon width={20} height={20} className="text-slate-700" />
                <div>
                  <p className="text-xs text-slate-400">GitHub</p>
                  <p className="text-xs font-semibold text-slate-700">yagneshpatel12</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/yagneshpatel05/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <LinkedinIcon width={20} height={20} className="text-blue-600" />
                <div>
                  <p className="text-xs text-slate-400">LinkedIn</p>
                  <p className="text-xs font-semibold text-slate-700">yagneshpatel05</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden shadow-xl">
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500 rounded-full opacity-10" />
              <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-indigo-500 rounded-full opacity-10" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-6">
                  <Mail size={22} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to hire or collaborate?
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Whether you&apos;re a startup scaling fast, a product team looking for a reliable engineer, or a recruiter with an exciting role — I&apos;d love to hear from you. I typically respond within 24 hours.
                </p>

                {/* Response time badge */}
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Usually responds within 24 hours</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="relative flex flex-col sm:flex-row gap-3">
                <a
                  href={GMAIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 min-h-[44px]"
                >
                  <Mail size={16} />
                  Send me an Email
                  <ArrowRight size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yagneshpatel05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-medium py-3.5 px-5 rounded-xl transition-all min-h-[44px]"
                >
                  <LinkedinIcon width={16} height={16} />
                  Connect
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
