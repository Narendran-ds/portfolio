import type { Certificate } from "@/data/certificates";

/**
 * Designed minimal cover for certificates — same palette-locked language as
 * ProjectCover (no scans/photos), swapping the categories row for issuer.
 */
const VARIANTS = [
  { bg: "#171310", fg: "#F2EEE3", dim: "rgba(242,238,227,0.35)", accent: "#E8500A", grid: "rgba(242,238,227,0.10)" },
  { bg: "#EAE5D6", fg: "#171310", dim: "rgba(23,19,16,0.4)", accent: "#E8500A", grid: "rgba(23,19,16,0.10)" },
  { bg: "#E8500A", fg: "#F2EEE3", dim: "rgba(242,238,227,0.55)", accent: "#171310", grid: "rgba(242,238,227,0.18)" },
  { bg: "#C9BEA4", fg: "#171310", dim: "rgba(23,19,16,0.45)", accent: "#E8500A", grid: "rgba(23,19,16,0.12)" },
];

export default function CertificateCover({
  certificate,
  index = 0,
}: {
  certificate: Certificate;
  index?: number;
}) {
  const v = VARIANTS[certificate.variant % VARIANTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: v.bg,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.2rem, 2.5vw, 2.2rem)",
        userSelect: "none",
      }}
    >
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
        <defs>
          <pattern id={`plus-cert-${certificate.slug}`} width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M36 30 V42 M30 36 H42" stroke={v.grid} strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#plus-cert-${certificate.slug})`} />
      </svg>

      <span
        className="display"
        aria-hidden
        style={{
          position: "absolute",
          right: "-0.08em",
          bottom: "-0.24em",
          fontSize: "clamp(9rem, 22vw, 20rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: `1.5px ${v.dim}`,
          pointerEvents: "none",
        }}
      >
        {certificate.mark}
      </span>

      <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: v.dim, position: "relative" }}>
        <span>{certificate.date}</span>
        <span style={{ color: v.accent }}>{num}</span>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ width: 38, height: 6, background: v.accent, marginBottom: "1rem" }} />
        <div
          className="display"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            color: v.fg,
            maxWidth: "14ch",
          }}
        >
          {certificate.title}
        </div>
        <div className="mono" style={{ marginTop: "0.9rem", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: v.dim }}>
          [{certificate.issuer}]
        </div>
      </div>
    </div>
  );
}
