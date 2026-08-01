"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

// Three is deliberate. The rest of the sections live in the footer; a nav full
// of links competes with the one button that matters.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // The bar never hides: on a page whose job is one click, the CTA should
  // always be reachable.
  useMotionValueEvent(scrollY, "change", () => {
    setScrolled(scrollY.get() > 24);

    // Active link: the last linked section whose top has crossed a line a third
    // of the way down the viewport and hasn't scrolled off the top yet.
    const line = window.innerHeight * 0.35;
    let current = "";
    for (const link of NAV_LINKS) {
      const id = link.href.slice(1);
      const rect = document.getElementById(id)?.getBoundingClientRect();
      if (rect && rect.top <= line && rect.bottom > 80) current = id;
    }
    setActiveSection(current);
  });

  // Transparent over the hero, bone glass once past it.
  const solid = scrolled || isOpen;

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    if (isOpen) {
      // Close drawer first, then scroll after animation finishes (250ms)
      setIsOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid
          ? "backdrop-blur-md bg-bone/85 border-b border-edge"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 group"
        >
          {/* Monogram badge */}
          <span className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-bone text-xs font-bold tracking-tight shadow-sm group-hover:shadow-md group-hover:shadow-forest/30 transition-shadow flex-shrink-0">
            YP
          </span>
          {/* Name + tagline */}
          <span className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight text-deep">
              Yagnesh Patel
            </span>
            <span className="text-[10px] font-medium tracking-wide text-soft">
              Design to deploy, end to end
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`cursor-pointer text-sm transition-colors relative pb-0.5 ${
                    isActive
                      ? "text-deep font-medium"
                      : "text-moss hover:text-deep"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded bg-signal"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick("#contact")}
            className="cursor-pointer bg-signal hover:bg-signal-hi text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-deep"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-bone/95 border-t border-edge"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="cursor-pointer w-full text-left text-deep hover:text-signal py-3 text-sm font-medium min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="cursor-pointer mt-2 w-full text-center bg-signal text-white text-sm font-semibold px-4 py-3 rounded-full min-h-[44px]"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
