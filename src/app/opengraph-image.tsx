import { ImageResponse } from "next/og";

export const alt = "Opportunity Fabric — a student roadmap with clear reasons behind every step.";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f7f4ef 0%, #fde8e3 42%, #e8f0ef 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#c45c3e",
            }}
          />
          <span
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#1c1917",
              letterSpacing: -2,
            }}
          >
            Opportunity Fabric
          </span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#57534e",
            maxWidth: 860,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          One story. A plan that fits—with plain-English reasons on every step.
        </div>
      </div>
    ),
    { ...size }
  );
}
