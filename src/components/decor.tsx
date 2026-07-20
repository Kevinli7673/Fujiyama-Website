"use client";

import { motion } from "framer-motion";

/*
 * Decorative Japanese line-art motifs that slide in from the page edges
 * as each section scrolls into view. All art is aria-hidden, low-opacity,
 * and pointer-events-none so it never competes with content.
 */

type SideDecorProps = {
  side: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

export function SideDecor({ side, className = "", children }: SideDecorProps) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className={`pointer-events-none absolute text-ink/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Seigaiha — overlapping wave arcs, a classic Japanese water pattern */
export function SeigaihaArt({ className = "" }: { className?: string }) {
  const arc = (cx: number, cy: number, r: number) =>
    `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const radii = [36, 27, 18, 9];
  const rows = [
    { cy: 58, xs: [40, 120, 200] },
    { cy: 96, xs: [0, 80, 160, 240] },
    { cy: 134, xs: [40, 120, 200] },
  ];

  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      {rows.map(({ cy, xs }) =>
        xs.map((cx) =>
          radii.map((r) => (
            <path key={`${cx}-${cy}-${r}`} d={arc(cx, cy, r)} />
          ))
        )
      )}
    </svg>
  );
}

/* Sakura — a sparse cherry-blossom branch */
export function SakuraArt({ className = "" }: { className?: string }) {
  const blossom = (x: number, y: number, scale: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-8"
          rx="4"
          ry="7"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="1.6" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M150 214 C 120 170, 96 128, 84 84 C 76 56, 74 34, 78 8" />
      <path d="M104 132 C 84 120, 66 114, 44 114" />
      <path d="M88 92 C 102 80, 112 68, 118 52" />
      {blossom(40, 110, 1)}
      {blossom(122, 46, 1.15)}
      {blossom(76, 12, 0.85)}
      {blossom(112, 156, 0.75)}
    </svg>
  );
}

/* Bamboo — two stalks with joint lines and a few leaves */
export function BambooArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M42 10 V 250" />
      <path d="M36 62 H 48 M36 128 H 48 M36 194 H 48" />
      <path d="M84 30 V 250" />
      <path d="M78 88 H 90 M78 156 H 90 M78 222 H 90" />
      <path d="M42 62 C 24 52, 14 40, 8 24" />
      <path d="M42 128 C 60 118, 70 108, 76 94" />
      <path d="M84 88 C 102 78, 110 66, 114 50" />
      <path d="M84 156 C 66 148, 56 140, 50 128" />
    </svg>
  );
}

/* Sensu — a folding fan: ribs radiating to an outer arc */
export function FanArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M 9.1 72.5 A 105 105 0 0 1 190.9 72.5" />
      <path d="M 74 110 A 30 30 0 0 1 126 110" />
      <path d="M100 125 L 9.1 72.5 M100 125 L 47.5 34.1 M100 125 L 100 20 M100 125 L 152.5 34.1 M100 125 L 190.9 72.5" />
    </svg>
  );
}

/* Chochin — a paper lantern with ribs and a tassel */
export function LanternArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 210"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M60 8 V 26" />
      <path d="M45 26 H 75" />
      <ellipse cx="60" cy="100" rx="45" ry="68" />
      <path d="M18 72 Q 60 84 102 72" />
      <path d="M15 100 Q 60 112 105 100" />
      <path d="M18 128 Q 60 140 102 128" />
      <path d="M48 167 H 72" />
      <path d="M60 168 V 188 M55 194 L 60 188 L 65 194" />
    </svg>
  );
}

/* Mt. Fuji — minimal mountain line with a snow-cap zigzag */
export function FujiArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 112 Q 70 100 95 55 Q 110 28 120 26 Q 130 28 145 55 Q 170 100 232 112" />
      <path d="M95 55 l 10 8 l 10 -8 l 10 8 l 10 -8 l 10 8" />
    </svg>
  );
}
