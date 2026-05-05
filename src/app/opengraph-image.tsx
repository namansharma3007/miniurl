import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Miniurl — Professional link management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0c1222 0%, #0f172a 40%, #082f3a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              background: "linear-gradient(90deg, #1d4ed8, #22d3ee)",
            }}
          />
          <div style={{ fontSize: 28, color: "#e2e8f0", letterSpacing: 0.5 }}>Miniurl</div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Shorten links. Track clicks. Ship faster.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Fast, secure URL shortener with analytics with easier navigation.
        </div>
      </div>
    ),
    { ...size }
  );
}
