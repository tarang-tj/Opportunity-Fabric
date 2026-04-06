import { ImageResponse } from "next/og";

export const alt =
  "Opportunity Fabric: a student roadmap with clear reasons behind every step.";
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
          background: "linear-gradient(145deg, #f4f0e8 0%, #f5e0da 40%, #dfecea 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#b8452f",
            }}
          />
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#141210",
              letterSpacing: -2,
            }}
          >
            Opportunity Fabric
          </span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#5c5854",
            maxWidth: 880,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          One story. A plan that fits. Plain-English reasons on every step.
        </div>
      </div>
    ),
    { ...size }
  );
}
