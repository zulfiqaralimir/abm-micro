import { ImageResponse } from "next/og";

export const alt = "ABM Micro — rebuilding microeconomics, one small model at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview thumbnail (WhatsApp, LinkedIn, X, Slack...). Generated at build time.
export default function OpengraphImage() {
  const buyers = [[120, 130], [210, 300], [90, 470], [300, 200], [330, 420]];
  const sellers = [[1080, 120], [990, 290], [1100, 480], [890, 190], [870, 430]];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #10242c 0%, #1e434f 55%, #2b5a6b 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        {buyers.map(([x, y], i) => (
          <div key={`b${i}`} style={{ position: "absolute", left: x, top: y, width: 44, height: 44, borderRadius: 44, background: "#7fc0d3", display: "flex" }} />
        ))}
        {sellers.map(([x, y], i) => (
          <div key={`s${i}`} style={{ position: "absolute", left: x, top: y, width: 44, height: 44, borderRadius: 10, background: "#f3c87a", display: "flex" }} />
        ))}
        <div style={{ position: "absolute", left: 560, top: 40, width: 80, height: 80, borderRadius: 80, border: "4px solid rgba(255,255,255,0.5)", display: "flex" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#f3c87a", textTransform: "uppercase", display: "flex" }}>
            A Web Book
          </div>
          <div style={{ fontSize: 150, fontWeight: 800, marginTop: 10, display: "flex" }}>ABM Micro</div>
          <div style={{ fontSize: 44, fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginTop: 10, display: "flex" }}>
            Rebuilding microeconomics, one small model at a time
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)", marginTop: 36, display: "flex" }}>
            Based on Asad Zaman&apos;s course · abm-micro.vercel.app
          </div>
        </div>
      </div>
    ),
    size
  );
}
