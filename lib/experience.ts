/*
  Single source of truth for "years of experience".

  Derived from the actual work history (the same stints shown in
  Experience.tsx) so the figure stays correct on its own as time passes —
  no hardcoded "3.5+" to update by hand.

  Rounding rule (friendly, resume-style):
    - exactly N years, 0 months        -> "N years"
    - N years, 1–4 months              -> "N.5 years"
    - N years, 5–11 months             -> "around N+1 years"  (approx)
*/

interface Stint {
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM"; omitted = present
}

// Keep in sync with the roles in components/Experience.tsx.
const STINTS: Stint[] = [
  { start: "2022-03", end: "2022-11" },
  { start: "2023-07" }, // current — grows automatically
];

function monthsFor(start: string, end: Date): number {
  const [sy, sm] = start.split("-").map(Number);
  const ey = end.getFullYear();
  const em = end.getMonth() + 1;
  return Math.max(0, (ey - sy) * 12 + (em - sm));
}

/** Total months of experience across all stints, as of `now`. */
export function experienceMonths(now: Date = new Date()): number {
  return STINTS.reduce((sum, s) => {
    const end = s.end ? new Date(`${s.end}-01T00:00:00`) : now;
    return sum + monthsFor(s.start, end);
  }, 0);
}

export interface ExperienceLabel {
  /** Rounded figure: 4, 4.5, 5, … */
  value: number;
  /** True when rounded up (show "around"/"~"). */
  approx: boolean;
  /** "~" when approx, else "". Handy for a numeric counter. */
  prefix: string;
  /** Prose form: "around 4 years" | "4 years" | "4.5 years". */
  phrase: string;
}

export function experienceLabel(now: Date = new Date()): ExperienceLabel {
  const months = experienceMonths(now);
  const whole = Math.floor(months / 12);
  const rem = months % 12;

  let value: number;
  let approx = false;
  if (rem === 0) {
    value = whole;
  } else if (rem <= 4) {
    value = whole + 0.5;
  } else {
    value = whole + 1;
    approx = true;
  }

  const num = Number.isInteger(value) ? `${value}` : value.toFixed(1);
  const prefix = approx ? "~" : "";
  const phrase = approx
    ? `around ${value} years`
    : `${num} year${value === 1 ? "" : "s"}`;

  return { value, approx, prefix, phrase };
}
