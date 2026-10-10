import { ImageResponse } from "next/og";

export const alt = "Sahil Pathan, Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card LinkedIn, Slack and WhatsApp show when someone shares the link.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f9f8f6",
          color: "#181614",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#5d5853" }}>FLUTTER DEVELOPER · SURAT, INDIA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Sahil Pathan</div>
          <div style={{ fontSize: 40, marginTop: 28, color: "#3a3631" }}>
            Ordering, POS and kitchen display apps for FoodChow
          </div>
        </div>
        <div style={{ display: "flex", gap: 48, fontSize: 30, color: "#0b4fc2" }}>
          <span>2+ years Flutter</span>
          <span>3 apps on Google Play</span>
          <span>10K+ downloads</span>
        </div>
      </div>
    ),
    size
  );
}
