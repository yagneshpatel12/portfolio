import { ImageResponse } from "next/og";
import { experienceLabel } from "@/lib/experience";

export const alt =
  "Yagnesh Patel — I build and ship complete web products, end to end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time so the social card always matches the site's palette
// and the years figure never goes stale.
export default function OpenGraphImage() {
  const { phrase } = experienceLabel();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F5EF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#0B3B2E",
              color: "#F7F5EF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            YP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#0E2A21" }}>
              Yagnesh Patel
            </div>
            <div style={{ fontSize: 20, color: "#5F6F63" }}>
              Full-stack developer, India
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0B3B2E",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            I build and ship complete web products,&nbsp;
            <span style={{ color: "#FF5A24" }}>end to end.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "#5F6F63",
              display: "flex",
            }}
          >
            Design, development, deployment, handover.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E3DFD1",
            paddingTop: 28,
            fontSize: 22,
            color: "#5F6F63",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>{phrase} shipping products</span>
            <span style={{ color: "#E3DFD1" }}>|</span>
            <span>Freelance, contract or full-time</span>
          </div>
          <span style={{ color: "#0B3B2E", fontWeight: 600 }}>
            yagneshpateldev.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
