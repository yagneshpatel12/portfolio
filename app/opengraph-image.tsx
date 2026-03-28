import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yagnesh Patel — Frontend & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Blue glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#3B82F6",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />
        {/* Violet glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "#8B5CF6",
            opacity: 0.1,
            filter: "blur(80px)",
          }}
        />

        {/* Top row — monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
          {/* YP Badge */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #3B82F6, #6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            YP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "white", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Yagnesh Patel
            </span>
            <span style={{ color: "#94A3B8", fontSize: "14px", fontWeight: 500 }}>
              yagnesh6202patel@gmail.com
            </span>
          </div>

          {/* Available badge */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "100px",
              padding: "8px 18px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10B981",
              }}
            />
            <span style={{ color: "#10B981", fontSize: "13px", fontWeight: 700 }}>
              Available for Global Remote Roles
            </span>
          </div>
        </div>

        {/* Center — main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: 800,
              color: "white",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Frontend &{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Full-Stack
            </span>{" "}
            Developer
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "22px", margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
            3+ years · React · Next.js · Node.js · TypeScript · AI Integrations
          </p>
        </div>

        {/* Bottom row — tech pills + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["React.js", "Next.js", "Node.js", "TypeScript", "MongoDB", "OpenAI API"].map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  borderRadius: "100px",
                  padding: "6px 16px",
                  color: "#93C5FD",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#475569", fontSize: "13px" }}>📍 Visnagar, India</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
