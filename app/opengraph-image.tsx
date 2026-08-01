import { ImageResponse } from "next/og";
import { experienceLabel } from "@/lib/experience";

export const alt =
  "Yagnesh Patel — I build and ship complete web products, end to end.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time so the card always matches the palette and the years
// figure never goes stale. Line breaks are set explicitly, never left to wrap:
// social cards are often rendered at a third of this width.
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
          background: "#F7F5EF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 72px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                background: "#FF5A24",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              YP
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#0E2A21" }}>
                Yagnesh Patel
              </div>
              <div style={{ fontSize: 22, color: "#5F6F63", marginTop: 2 }}>
                Full-stack developer, India
              </div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#8A9689" }}>
            yagneshpateldev.com
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 56, height: 5, background: "#FF5A24" }} />
            <div
              style={{
                display: "flex",
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#FF5A24",
              }}
            >
              END TO END WEB PRODUCT PARTNER
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#0B3B2E",
            }}
          >
            <div style={{ display: "flex" }}>I build and ship complete</div>
            <div style={{ display: "flex" }}>
              web products,&nbsp;<span style={{ color: "#FF5A24" }}>end to end.</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#5F6F63",
            }}
          >
            Design, development, deployment, handover.
          </div>
        </div>

        {/* Facts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E3DFD1",
            margin: "0 72px",
            padding: "26px 0 44px",
            fontSize: 25,
            color: "#5F6F63",
          }}
        >
          <div style={{ display: "flex", flexShrink: 0 }}>
            {phrase} shipping real products
          </div>
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              color: "#0E2A21",
              fontWeight: 600,
            }}
          >
            Freelance, contract or full-time
          </div>
        </div>
      </div>
    ),
    size
  );
}
