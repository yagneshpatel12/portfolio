"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  dur: number;
  delay: number;
  type: "a" | "b" | "c" | "sq" | "ring";
}

const COLORS = [
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EC4899",
];

const ORBS = [
  { x: 5,  y: 8,  size: 520, color: "#3B82F6", opacity: 0.07, dur: 22, delay: 0 },
  { x: 78, y: 65, size: 460, color: "#8B5CF6", opacity: 0.06, dur: 28, delay: 4 },
  { x: 85, y: 5,  size: 400, color: "#06B6D4", opacity: 0.05, dur: 19, delay: 7 },
  { x: 15, y: 75, size: 380, color: "#10B981", opacity: 0.05, dur: 24, delay: 2 },
];

export default function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Particle["type"][] = ["a", "b", "c", "sq", "ring"];
    const list: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size:
        i < 12 ? 3 + Math.random() * 3
        : i < 30 ? 5 + Math.random() * 5
        : 9 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity:
        i < 15 ? 0.1 + Math.random() * 0.12
        : 0.06 + Math.random() * 0.09,
      dur: 9 + Math.random() * 16,
      delay: Math.random() * 8,
      type: i % 9 === 0 ? "ring" : i % 13 === 0 ? "sq" : types[i % 3],
    }));
    setParticles(list);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* Subtle dot-grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* CSS-animated orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="orb"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            opacity: orb.opacity,
            filter: "blur(70px)",
            // CSS custom props for animation
            ["--dur" as string]: `${orb.dur}s`,
            ["--delay" as string]: `${orb.delay}s`,
          }}
        />
      ))}

      {/* CSS-animated particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle particle-${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor:
              p.type === "ring" ? "transparent" : p.color,
            border: p.type === "ring" ? `1.5px solid ${p.color}` : undefined,
            opacity: p.opacity,
            ["--dur" as string]: `${p.dur}s`,
            ["--delay" as string]: `${p.delay}s`,
          }}
        />
      ))}

      {/* Edge vignette — keeps content readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(250,250,250,0.65) 100%)",
        }}
      />
    </div>
  );
}
