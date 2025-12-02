import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Spacemint AI - AI-Powered Floor Plan Staging";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to bottom right, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        {/* Logo/Icon placeholder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              backgroundColor: "#392e58",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
            }}
          >
            SM
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(to right, #392e58, #6b5b95)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          Spacemint AI
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#6c757d",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.4,
          }}
        >
          Transform Floor Plans into Beautifully Staged Interiors with AI
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            marginTop: 60,
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#495057",
            }}
          >
            ✨ AI-Powered
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#495057",
            }}
          >
            ⚡ Instant Results
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#495057",
            }}
          >
            🏠 22+ Styles
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
