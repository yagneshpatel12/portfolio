"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { Lock } from "lucide-react";
import ContributionGraph from "@/components/ContributionGraph";
import activity from "@/data/gitlab-activity.json";

// Bone → forest ramp, so the heatmap belongs to the page instead of importing
// GitHub's green or the old site blue.
const COLOR_SCALE: [string, string, string, string, string] = [
  "#EAE7DC",
  "#CBE7D9",
  "#8FCFB4",
  "#35A277",
  "#0F4A38",
];

const WEEKS = 53;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jul 2025 – Jul 2026" derived from the earliest/latest active day in the data. */
function dateRangeLabel(data: Record<string, number>): string {
  const days = Object.keys(data)
    .filter((k) => data[k] > 0)
    .sort();
  if (days.length === 0) return "";
  const fmt = (key: string) => {
    const [y, m] = key.split("-").map(Number);
    return `${MONTHS[m - 1]} ${y}`;
  };
  const start = fmt(days[0]);
  const end = fmt(days[days.length - 1]);
  return start === end ? start : `${start} – ${end}`;
}

const utc = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

const DAY = 86_400_000;

export default function Activity() {
  const data = activity as Record<string, number>;
  const range = useMemo(() => dateRangeLabel(data), [data]);

  // Everything below is computed from the same snapshot the heatmap draws.
  const stats = useMemo(() => {
    const days = Object.entries(data)
      .filter(([, v]) => v > 0)
      .sort(([a], [b]) => a.localeCompare(b));

    let total = 0;
    let best = { key: "", count: 0 };

    for (const [key, count] of days) {
      total += count;
      if (count > best.count) best = { key, count };
    }

    // Calendar days covered by the snapshot, so "days with commits" has a base.
    const span =
      days.length > 1
        ? Math.round((utc(days[days.length - 1][0]) - utc(days[0][0])) / DAY) + 1
        : days.length;

    const bestLabel = best.key
      ? (() => {
          const [y, m, d] = best.key.split("-").map(Number);
          return `${MONTHS[m - 1]} ${d}, ${y}`;
        })()
      : "";

    const activeDays = days.length;
    const perDay = activeDays ? Math.round(total / activeDays) : 0;

    return { total, activeDays, span, perDay, best, bestLabel };
  }, [data]);

  const CARDS = [
    { value: stats.total.toLocaleString(), label: "Contributions" },
    {
      value: stats.activeDays.toLocaleString(),
      label: `Days with commits, of ${stats.span}`,
    },
    { value: `${stats.perDay}`, label: "Average on an active day" },
    { value: `${stats.best.count}`, label: `Busiest day · ${stats.bestLabel}` },
  ];

  return (
    <section id="activity" className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-signal" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-signal">
                Activity
              </span>
            </div>
            <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
              My GitHub is quiet. My work isn&apos;t.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-moss">
              Almost all of my day-to-day work lives on a private company GitLab,
              which no public profile will ever show you. This is that activity,
              exported straight from it.
            </p>
          </div>

          <span className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-edge bg-white px-4 py-2 text-sm font-medium text-deep">
            <Lock size={14} className="text-soft" />
            Private GitLab &middot; snapshot
          </span>
        </motion.div>

        {/* Panel */}
        <motion.div
          className="mt-12 overflow-hidden rounded-3xl border border-edge bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        >
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-bold tracking-[-0.01em] text-forest">
                Issues, merge requests, pushes and comments
              </h3>
              {range && (
                <span className="text-sm text-soft">{range}</span>
              )}
            </div>

            <div className="flex justify-center">
              <ContributionGraph
                data={data}
                weeks={WEEKS}
                colorScale={COLOR_SCALE}
                textColor="#8A9689"
                showTotal={false}
                blockSize={13}
                blockMargin={3}
                blockRadius={3}
                title={range ? `contributions · ${range}` : "contributions in the last year"}
              />
            </div>
          </div>

          {/* Stats read from the same snapshot */}
          <div className="grid grid-cols-2 border-t border-edge bg-bone sm:grid-cols-4">
            {CARDS.map((card, i) => (
              <div
                key={card.label}
                className={`px-6 py-5 ${
                  i > 0 ? "border-l border-edge" : ""
                } ${i > 1 ? "border-t sm:border-t-0" : ""} ${
                  i === 2 ? "border-l-0 sm:border-l" : ""
                }`}
              >
                <span className="block text-2xl font-bold tracking-[-0.02em] text-forest tabular-nums">
                  {card.value}
                </span>
                <span className="mt-1 block text-xs font-medium leading-tight text-soft">
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
