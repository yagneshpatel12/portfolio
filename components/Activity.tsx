"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { GitBranch } from "lucide-react";
import ContributionGraph from "@/components/ContributionGraph";
import activity from "@/data/gitlab-activity.json";

// Site-blue scale so the heatmap matches the rest of the page.
const COLOR_SCALE: [string, string, string, string, string] = [
  "#eef1f6",
  "#c8d3f5",
  "#8ba4e8",
  "#5069cf",
  "#26327e",
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

export default function Activity() {
  const data = activity as Record<string, number>;
  const range = useMemo(() => dateRangeLabel(data), [data]);

  return (
    <section id="activity" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Coding Activity
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded" />
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Most of my day-to-day work lives on a private GitLab, not GitHub.
            That&apos;s why my public GitHub looks quiet. This is a snapshot of
            the real activity.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

          <div className="p-4 sm:p-6">
            {/* Header row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <GitBranch size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Contribution Graph
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Issues, merge requests, pushes &amp; comments
                  {range && <span> · {range}</span>}
                </p>
              </div>
            </div>

            {/* Heatmap */}
            <div className="flex justify-center">
              <ContributionGraph
                data={data}
                weeks={WEEKS}
                colorScale={COLOR_SCALE}
                showTotal={false}
                title={range ? `contributions · ${range}` : "contributions in the last year"}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
