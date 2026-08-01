import { ImageResponse } from "next/og";

// iOS ignores SVG for home-screen icons, so this one is generated as a PNG.
// No corner radius: iOS applies its own squircle mask.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FF5A24",
          color: "#FFFFFF",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        YP
      </div>
    ),
    size
  );
}
