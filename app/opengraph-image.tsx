import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Belluno Cafe – Premium Coffee & Cuisine in Surat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 20% 0%, #5C3A21 0%, #3B2416 45%, #1A120B 100%)",
          padding: "80px",
          color: "#FFF8E1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 8, color: "#D2B48C" }}>
            BELLUNO · CAFE
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#C9A15A" }}>
            {SITE.rating} / 5 · {SITE.reviews}+ reviews
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, fontWeight: 300 }}>
            Premium Coffee & Cuisine in Surat
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "rgba(255,248,225,0.7)" }}>
            Handcrafted coffee · Brunch · Desserts · Catering — Vesu, Surat
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,248,225,0.55)" }}>
          bellunocafe.com
        </div>
      </div>
    ),
    { ...size }
  );
}
