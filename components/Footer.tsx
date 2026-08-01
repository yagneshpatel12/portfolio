import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const EMAIL = "yagnesh6202patel@gmail.com";

// Same order as the page, so the footer doubles as the full index the nav
// deliberately doesn't carry.
const SECTIONS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Activity", href: "#activity" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const ELSEWHERE = [
  { label: "Email", href: `mailto:${EMAIL}`, external: false },
  { label: "WhatsApp", href: "https://wa.me/919328406174", external: true },
  { label: "GitHub", href: "https://github.com/yagneshpatel12", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yagneshpatel05/",
    external: true,
  },
  { label: "Resume", href: "/YAGNESH_RESUME.pdf", external: false },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-bone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand + closing argument */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-citrus text-sm font-bold text-forest">
                YP
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold tracking-[-0.01em]">
                  Yagnesh Patel
                </span>
                <span className="text-xs text-bone/55">
                  Design to deploy, end to end
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bone/75">
              This site is the smallest example of the work: designed, built and
              deployed by one person.
            </p>

            <a
              href="#contact"
              className="group mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-hi focus:outline-none focus-visible:ring-2 focus-visible:ring-citrus focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-bone/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Open for projects, freelance or full-time
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-citrus">
                Sections
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SECTIONS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-citrus">
                Elsewhere
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {ELSEWHERE.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      {...(item.label === "Resume" ? { download: true } : {})}
                      className="text-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-citrus">
                Get in touch
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-4 block text-sm text-bone/70 transition-colors hover:text-bone"
              >
                {EMAIL}
              </a>
              <a
                href="tel:+919328406174"
                className="mt-2 block text-sm text-bone/70 transition-colors hover:text-bone"
              >
                +91 93284 06174
              </a>
              <p className="mt-2 text-sm text-bone/45">
                Visnagar, Gujarat, India
              </p>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href="https://github.com/yagneshpatel12"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-citrus hover:text-citrus"
                >
                  <GithubIcon width={16} height={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yagneshpatel05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-citrus hover:text-citrus"
                >
                  <LinkedinIcon width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-bone/15 pt-6 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Yagnesh Patel</p>
          <p>Made in Gujarat, on far too much chai.</p>
        </div>
      </div>
    </footer>
  );
}
