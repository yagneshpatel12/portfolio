"use client";

import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ChevronDown,
  Check,
  CircleAlert,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const EMAIL = "yagnesh6202patel@gmail.com";

interface Intent {
  value: string;
  companyLabel: string;
  companyPlaceholder: string;
  /** Null hides the timing question entirely. */
  timingLabel: string | null;
  messagePlaceholder: string;
}

// Every intent carries its own wording. A founder doesn't "work somewhere",
// and someone picking "Something else" shouldn't be asked about a stack.
const INTENTS: Intent[] = [
  {
    value: "Build something new",
    companyLabel: "Company or product",
    companyPlaceholder: "If it has a name yet",
    timingLabel: "When do you need it?",
    messagePlaceholder:
      "What do you want to build, who is it for, and what does the first version need to do?",
  },
  {
    value: "Finish or fix an existing product",
    companyLabel: "Company or product",
    companyPlaceholder: "What it's called",
    timingLabel: "When do you need it?",
    messagePlaceholder:
      "What's built so far, what's broken or unfinished, and what is it running on?",
  },
  {
    value: "Full-time role",
    companyLabel: "Company",
    companyPlaceholder: "Who's hiring",
    timingLabel: "When would it start?",
    messagePlaceholder:
      "Tell me about the role, the team, the stack, and whether it's remote.",
  },
  {
    value: "Something else",
    companyLabel: "Company",
    companyPlaceholder: "If there is one",
    timingLabel: null,
    messagePlaceholder:
      "Say what's on your mind. A collaboration, a question, or something I haven't thought of.",
  },
];

// Timeline over budget on purpose: it qualifies how serious an enquiry is
// without anchoring price before the first call.
const TIMELINES = [
  "Not sure yet",
  "As soon as possible",
  "Within the next month",
  "In one to three months",
  "Just exploring for now",
];

const STEPS = [
  {
    step: "01",
    title: "You send the details",
    body: "The short version is fine. What it is, roughly when you need it, and what done looks like.",
  },
  {
    step: "02",
    title: "I reply within a day",
    body: "With first questions, a rough shape for the build, and an honest read on fit. If I'm not the right person, I'll tell you.",
  },
  {
    step: "03",
    title: "We talk for 30 minutes",
    body: "A call to size it properly and agree what happens first. No charge, no pitch deck.",
  },
];

const DIRECT = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    icon: Phone,
    label: "Call",
    value: "+91 93284 06174",
    href: "tel:+919328406174",
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Fastest for a quick question",
    href: "https://wa.me/919328406174",
    external: true,
  },
];

const inputBase =
  "w-full rounded-xl border border-edge bg-white px-4 py-3 text-[15px] text-deep placeholder:text-soft transition-colors focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25";

const errorRing = "border-alert focus:border-alert focus:ring-alert/20";

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-alert"
    >
      <CircleAlert size={14} className="mt-[1px] flex-shrink-0" />
      {children}
    </p>
  );
}

/** Select-only combobox, so the option list can carry the site's styling. */
function Listbox({
  id,
  labelId,
  value,
  options,
  onChange,
}: {
  id: string;
  labelId: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActive(Math.max(0, options.indexOf(value)));
  }, [value, options]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-controls={`${id}-list`}
        aria-expanded={open}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`${inputBase} flex cursor-pointer items-center justify-between gap-3 text-left ${
          open ? "border-signal ring-2 ring-signal/25" : ""
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-soft transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-edge bg-white p-1.5 shadow-xl shadow-forest/15"
          >
            {options.map((option, i) => {
              const selected = option === value;
              return (
                <li
                  key={option}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    i === active ? "bg-bone" : ""
                  } ${selected ? "font-semibold text-forest" : "text-moss"}`}
                >
                  {option}
                  {selected && (
                    <Check size={15} className="flex-shrink-0 text-signal" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [intent, setIntent] = useState<string>(INTENTS[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle"
  );
  const [website, setWebsite] = useState(""); // honeypot

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const current = INTENTS.find((i) => i.value === intent) ?? INTENTS[0];
  const asksTiming = current.timingLabel !== null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found: typeof errors = {};
    if (!name.trim()) {
      found.name = "Your name, so I know who I'm replying to.";
    }
    if (!email.trim()) {
      found.email = "I need an email address to reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      found.email = "That doesn't look like an email address.";
    }
    if (!message.trim()) {
      found.message = "Tell me a little about it, even one line.";
    } else if (message.trim().length < 10) {
      found.message = "A sentence or two gives me something to work with.";
    }

    setErrors(found);
    if (found.name) return nameRef.current?.focus();
    if (found.email) return emailRef.current?.focus();
    if (found.message) return messageRef.current?.focus();

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          name,
          email,
          company,
          timing: asksTiming ? timeline : "",
          message,
          website,
        }),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
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
              Contact
            </span>
          </div>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
            Start a project, or start a conversation.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-moss">
            Tell me what you&apos;re building and what&apos;s in the way. If
            it&apos;s a role rather than a project, say so and I&apos;ll answer
            just as fast. Either way the reply comes from me, usually within a
            day.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* What happens next + direct lines */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1.5 text-xs font-bold text-forest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Usually replies within 24 hours
            </span>

            {/* Direct lines first — nobody should have to hunt for these */}
            <h3 className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-soft">
              Reach me directly
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              {DIRECT.map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-3.5 rounded-2xl border border-edge bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-signal hover:shadow-lg hover:shadow-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-edge bg-bone text-forest transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <row.icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-soft">
                      {row.label}
                    </span>
                    <span className="block truncate text-[15px] font-semibold text-deep">
                      {row.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="flex-shrink-0 text-soft transition-all group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-moss">
                <MapPin size={14} className="flex-shrink-0 text-soft" />
                Gujarat, India &middot; IST (UTC+5:30)
              </span>

              <span className="flex items-center gap-2">
                <a
                  href="https://github.com/yagneshpatel12"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-white text-moss transition-colors hover:border-signal hover:text-signal"
                >
                  <GithubIcon width={16} height={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yagneshpatel05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-white text-moss transition-colors hover:border-signal hover:text-signal"
                >
                  <LinkedinIcon width={16} height={16} />
                </a>
              </span>
            </div>

            <h3 className="mt-9 text-[11px] font-bold uppercase tracking-[0.18em] text-soft">
              What happens next
            </h3>

            <ol className="mt-5 flex flex-col">
              {STEPS.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-4 border-b border-edge py-5 first:pt-0 last:border-b-0"
                >
                  <span className="text-xs font-bold tabular-nums text-signal">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold tracking-[-0.01em] text-forest">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-moss">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 rounded-3xl border border-edge bg-bone p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-start py-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/15 text-mint">
                  <Check size={24} />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-forest">
                  That&apos;s landed in my inbox
                  {name ? `, ${name.split(" ")[0]}` : ""}.
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-moss">
                  I reply to everything within a day, usually sooner. If it turns
                  out to be urgent, WhatsApp gets me faster than email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setEmail("");
                    setCompany("");
                    setMessage("");
                  }}
                  className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-edge bg-white px-5 py-3 text-sm font-semibold text-deep transition-colors hover:border-soft"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
            <fieldset>
              <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-soft">
                What brings you here?
              </legend>
              <div className="mt-3 grid sm:grid-cols-2 gap-2.5">
                {INTENTS.map((option) => {
                  const selected = intent === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                        selected
                          ? "border-signal bg-white text-forest shadow-sm"
                          : "border-edge bg-white/60 text-moss hover:border-soft"
                      }`}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={option.value}
                        checked={selected}
                        onChange={() => setIntent(option.value)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                            selected ? "border-signal" : "border-soft"
                          }`}
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-signal" />
                          )}
                        </span>
                        {option.value}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-[13px] font-semibold text-deep"
                >
                  Name
                </label>
                <input
                  id="name"
                  ref={nameRef}
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className={`${inputBase} ${errors.name ? errorRing : ""}`}
                />
                {errors.name && (
                  <FieldError id="name-error">{errors.name}</FieldError>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[13px] font-semibold text-deep"
                >
                  Email
                </label>
                <input
                  id="email"
                  ref={emailRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@company.com"
                  className={`${inputBase} ${errors.email ? errorRing : ""}`}
                />
                {errors.email && (
                  <FieldError id="email-error">{errors.email}</FieldError>
                )}
              </div>
            </div>

            <div className={`mt-4 grid gap-4 ${asksTiming ? "sm:grid-cols-2" : ""}`}>
              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-[13px] font-semibold text-deep"
                >
                  {current.companyLabel}{" "}
                  <span className="font-normal text-soft">(optional)</span>
                </label>
                <input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={current.companyPlaceholder}
                  className={inputBase}
                />
              </div>

              {asksTiming && (
                <div>
                  <span
                    id="timeline-label"
                    className="mb-1.5 block text-[13px] font-semibold text-deep"
                  >
                    {current.timingLabel}{" "}
                    <span className="font-normal text-soft">(optional)</span>
                  </span>
                  <Listbox
                    id="timeline"
                    labelId="timeline-label"
                    value={timeline}
                    options={TIMELINES}
                    onChange={setTimeline}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block text-[13px] font-semibold text-deep"
              >
                Message
              </label>
              <textarea
                id="message"
                ref={messageRef}
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message)
                    setErrors((p) => ({ ...p, message: undefined }));
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder={current.messagePlaceholder}
                className={`${inputBase} resize-y ${
                  errors.message ? errorRing : ""
                }`}
              />
              {errors.message && (
                <FieldError id="message-error">{errors.message}</FieldError>
              )}
            </div>

            {/* Bots fill this in. People never see it. */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {status === "failed" && (
              <p
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-xl border border-alert/30 bg-alert/5 px-4 py-3 text-[13px] font-medium text-alert"
              >
                <CircleAlert size={15} className="mt-[2px] flex-shrink-0" />
                <span>
                  That didn&apos;t send. Try once more, or email me directly at{" "}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                    {EMAIL}
                  </a>
                  .
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-signal px-7 py-3 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(255,90,36,0.85)] transition-colors hover:bg-signal-hi focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending
                  </>
                ) : (
                  <>
                    Send it over
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
              <p className="text-xs leading-relaxed text-soft">
                No lists, no forwarding. Your details reach me and stop there.
              </p>
            </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
