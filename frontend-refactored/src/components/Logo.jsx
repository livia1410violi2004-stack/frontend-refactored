import React from "react";

/**
 * Absoluta Fixadores logo (SVG).
 * A stylized "A" formed by two beveled beams (dark) with a diagonal yellow accent,
 * plus a hex-nut silhouette centered inside the "A".
 */
export const AbsolutaMark = ({ size = 40, variant = "dark" }) => {
  const dark = variant === "light" ? "#FFFFFF" : "#1D1D1C";
  const shade = variant === "light" ? "#D4D4D4" : "#2A2A29";
  const yellow = "#F2A900";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Absoluta"
    >
      {/* left beam of A */}
      <polygon points="10,58 26,58 34,20 30,20" fill={dark} />
      {/* right beam (main) */}
      <polygon points="54,58 38,58 30,20 34,20" fill={dark} />
      {/* diagonal yellow accent */}
      <polygon points="42,58 54,58 46,20 42,20" fill={yellow} opacity="0.95" />
      {/* inner shadow */}
      <polygon points="30,20 34,20 32,10" fill={shade} />
      {/* hex nut */}
      <polygon
        points="32,32 40,36 40,44 32,48 24,44 24,36"
        fill={dark}
        stroke={yellow}
        strokeWidth="1"
      />
      <circle cx="32" cy="40" r="3" fill="#F5F5F5" />
    </svg>
  );
};

export const AbsolutaLogo = ({ variant = "dark", compact = false }) => {
  const primary = variant === "light" ? "#FFFFFF" : "#1D1D1C";
  const yellow = "#F2A900";
  return (
    <div className="flex items-center gap-2.5">
      <AbsolutaMark size={compact ? 32 : 38} variant={variant} />
      <div className="leading-none">
        <div
          className="font-heading font-bold tracking-tight"
          style={{ color: primary, fontSize: compact ? 16 : 18, letterSpacing: "-0.01em" }}
        >
          ABSOLUTA
        </div>
        <div
          className="font-heading font-semibold uppercase"
          style={{
            color: yellow,
            fontSize: compact ? 9 : 10,
            letterSpacing: "0.32em",
            marginTop: 2,
          }}
        >
          ERP · Fixadores
        </div>
      </div>
    </div>
  );
};
