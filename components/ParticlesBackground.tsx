"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

export default function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#3B82F6", "#93C5FD"];
    const generated: Particle[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.15 + Math.random() * 0.25,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Large gradient orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "#3B82F6", opacity: 0.07 }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "#818CF8", opacity: 0.07 }}
      />
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "#38BDF8", opacity: 0.07 }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [-15, 15],
            x: [-10, 10],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
