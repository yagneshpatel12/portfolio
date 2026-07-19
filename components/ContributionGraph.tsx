"use client";

/*
  ContributionGraph — a self-contained GitLab/GitHub-style activity heatmap.
  No dependencies beyond React. Crisp at any size (SVG). Scrolls sideways on
  narrow screens.

  --- Show YOUR real GitLab activity ---
  1. Log in to your GitLab, then open this in the browser:
       https://gitlab.solguruzsolutions.com/users/yagneshp/calendar.json
     It returns { "2025-07-19": 3, "2025-07-20": 0, ... }  (date -> count).
     This file contains ONLY dates and counts — no project, repo, or company
     names — so it is safe to commit to a public repo.
  2. Save that JSON to data/gitlab-activity.json (replacing the placeholder).
  3. That's it — the Activity section already imports it.

  Notes:
  - The company GitLab is internal, so a public site can't fetch it live
    (auth + CORS). Committing the JSON keeps it a static snapshot. Re-export it
    now and then to refresh. If you ever want it live, proxy the request
    through your own backend with a read token.
  - Leave `data` off and it renders random sample data (layout preview only) —
    don't ship that version, it isn't your real activity.
*/

import { useState, useRef, useMemo, MouseEvent } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_COLORS: [string, string, string, string, string] = ["#eef1f6", "#c8d3f5", "#8ba4e8", "#5069cf", "#26327e"];

export interface ContributionGraphProps {
  /** Map of "YYYY-MM-DD" -> contribution count. Matches GitLab's calendar.json. */
  data?: Record<string, number>;
  /** Last day shown. Defaults to today. */
  endDate?: Date;
  /** Number of week columns. Default 53 (about a year). */
  weeks?: number;
  /** 0 = weeks start Sunday, 1 = Monday. Default 0. */
  weekStart?: 0 | 1;
  blockSize?: number;
  blockMargin?: number;
  blockRadius?: number;
  /** Five colors: [empty, low, ..., high]. */
  colorScale?: [string, string, string, string, string];
  textColor?: string;
  fontFamily?: string;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  showLegend?: boolean;
  /** Show the "N contributions…" total inside the legend. Default true. */
  showTotal?: boolean;
  showTooltip?: boolean;
  title?: string;
}

interface Cell {
  col: number;
  row: number;
  date: Date;
  count: number;
  future?: boolean;
}

function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

function buildSample(weeks: number, end: Date): Record<string, number> {
  const data: Record<string, number> = {};
  const days = weeks * 7;
  for (let i = 0; i < days; i++) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const dow = d.getDay();
    const weekend = dow === 0 || dow === 6;
    if (Math.random() < (weekend ? 0.55 : 0.12)) continue;
    let count = Math.round(Math.pow(Math.random(), 1.7) * (weekend ? 5 : 13));
    if (!weekend && Math.random() < 0.08) count += Math.round(Math.random() * 9);
    if (count > 0) data[toKey(d)] = count;
  }
  return data;
}

export default function ContributionGraph({
  data,
  endDate,
  weeks = 53,
  weekStart = 0,
  blockSize = 11,
  blockMargin = 3,
  blockRadius = 2,
  colorScale = DEFAULT_COLORS,
  textColor = "#57606a",
  fontFamily = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  showMonthLabels = true,
  showWeekdayLabels = true,
  showLegend = true,
  showTotal = true,
  showTooltip = true,
  title = "contributions in the last year",
}: ContributionGraphProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ left: number; top: number; text: string } | null>(null);

  const model = useMemo(() => {
    const end = startOfDay(endDate ?? new Date());
    const source = data || buildSample(weeks, end);
    const endOffset = (end.getDay() - weekStart + 7) % 7;
    const gridStart = new Date(end);
    gridStart.setDate(end.getDate() - endOffset - (weeks - 1) * 7);

    const cells: Cell[] = [];
    let max = 0;
    let total = 0;
    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      const col = Math.floor(i / 7);
      const row = i % 7;
      if (d > end) {
        cells.push({ col, row, date: d, count: 0, future: true });
        continue;
      }
      const count = source[toKey(d)] || 0;
      if (count > max) max = count;
      total += count;
      cells.push({ col, row, date: d, count });
    }

    const monthMarks: { col: number; label: string }[] = [];
    let lastMonth = -1;
    for (let c = 0; c < weeks; c++) {
      const m = cells[c * 7].date.getMonth();
      if (m !== lastMonth) {
        if (monthMarks.length === 0 || c - monthMarks[monthMarks.length - 1].col >= 3) {
          monthMarks.push({ col: c, label: MONTHS[m] });
        }
        lastMonth = m;
      }
    }
    return { cells, max, total, monthMarks };
  }, [data, endDate, weeks, weekStart]);

  const step = blockSize + blockMargin;
  const padLeft = showWeekdayLabels ? 30 : 0;
  const padTop = showMonthLabels ? 18 : 0;
  const svgW = padLeft + (weeks * step - blockMargin);
  const svgH = padTop + (7 * step - blockMargin);

  const levelOf = (count: number): number => {
    if (count <= 0 || model.max <= 0) return 0;
    const t = model.max;
    if (count <= t * 0.25) return 1;
    if (count <= t * 0.5) return 2;
    if (count <= t * 0.75) return 3;
    return 4;
  };

  const fmtDate = (d: Date): string =>
    `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  const onEnter = (e: MouseEvent<SVGRectElement>, cell: Cell) => {
    if (!showTooltip || cell.future) return;
    const root = rootRef.current;
    if (!root) return;
    const r = e.currentTarget.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    setTip({
      left: r.left - rr.left + r.width / 2,
      top: r.top - rr.top,
      text: `${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${fmtDate(cell.date)}`,
    });
  };

  const weekdayLabels: { row: number; label: string }[] = [];
  if (showWeekdayLabels) {
    for (let r = 0; r < 7; r++) {
      const dow = (weekStart + r) % 7;
      if (dow === 1 || dow === 3 || dow === 5) weekdayLabels.push({ row: r, label: WEEKDAYS[dow] });
    }
  }

  return (
    <div ref={rootRef} className="cg-root" style={{ position: "relative", width: "fit-content", maxWidth: "100%", fontFamily, color: textColor }}>
      <style>{`
        .cg-root .cg-scroll { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; }
        .cg-root .cg-scroll::-webkit-scrollbar { height: 8px; }
        .cg-root .cg-scroll::-webkit-scrollbar-track { background: transparent; }
        .cg-root .cg-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 8px; }
        .cg-root .cg-cell { transition: stroke 90ms ease; cursor: pointer; }
        .cg-root .cg-cell:hover { stroke: rgba(27,31,36,0.4); stroke-width: 1.4; }
        @media (prefers-reduced-motion: reduce) { .cg-root .cg-cell { transition: none; } }
      `}</style>

      <div className="cg-scroll">
        <svg width={svgW} height={svgH} role="img" aria-label={`${model.total} ${title}`} style={{ display: "block" }}>
          {showMonthLabels && model.monthMarks.map((m, i) => (
            <text key={`m${i}`} x={padLeft + m.col * step} y={padTop - 6} fontSize="10" fill={textColor}>{m.label}</text>
          ))}
          {weekdayLabels.map((w, i) => (
            <text key={`w${i}`} x={0} y={padTop + w.row * step + blockSize} fontSize="10" fill={textColor}>{w.label}</text>
          ))}
          {model.cells.map((cell, i) => {
            if (cell.future) return null;
            return (
              <rect
                key={i}
                className="cg-cell"
                x={padLeft + cell.col * step}
                y={padTop + cell.row * step}
                width={blockSize}
                height={blockSize}
                rx={blockRadius}
                ry={blockRadius}
                fill={colorScale[levelOf(cell.count)]}
                onMouseEnter={(e) => onEnter(e, cell)}
                onMouseLeave={() => setTip(null)}
              />
            );
          })}
        </svg>
      </div>

      {showLegend && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: showTotal ? "space-between" : "flex-end", marginTop: 8, fontSize: 12 }}>
          {showTotal && <span>{model.total.toLocaleString()} {title}</span>}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ marginRight: 2 }}>Less</span>
            {colorScale.map((c, i) => (
              <span key={i} style={{ width: blockSize, height: blockSize, borderRadius: blockRadius, background: c, display: "inline-block" }} />
            ))}
            <span style={{ marginLeft: 2 }}>More</span>
          </span>
        </div>
      )}

      {tip && (
        <div style={{
          position: "absolute", left: tip.left, top: tip.top,
          transform: "translate(-50%, calc(-100% - 8px))",
          background: "#1f2328", color: "#fff", fontSize: 12, lineHeight: 1.3,
          padding: "6px 8px", borderRadius: 6, whiteSpace: "nowrap", pointerEvents: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)", zIndex: 20,
        }}>{tip.text}</div>
      )}
    </div>
  );
}
