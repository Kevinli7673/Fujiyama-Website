/**
 * Decorative corner ornament — a seigaiha (traditional Japanese wave) fan
 * rendered as a quarter circle that tucks into a page corner.
 *
 * To use your own artwork, replace the inner <svg> with your SVG (or an
 * <Image> import) — the wrapper handles positioning/rotation per corner.
 */

const CORNER_CLASSES = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0 rotate-90",
  "bottom-right": "bottom-0 right-0 rotate-180",
  "bottom-left": "bottom-0 left-0 -rotate-90",
} as const;

type Corner = keyof typeof CORNER_CLASSES;

function CornerOrnament({
  corner = "top-left",
  className = "",
}: {
  corner?: Corner;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute text-primary ${CORNER_CLASSES[corner]} ${className}`}
    >
      {/* Concentric seigaiha fan anchored to the top-left corner */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[150, 120, 90, 60, 30].map((r) => (
          <path
            key={r}
            d={`M 0 ${r} A ${r} ${r} 0 0 0 ${r} 0`}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.14"
          />
        ))}
        {[135, 105, 75, 45, 15].map((r) => (
          <path
            key={r}
            d={`M 0 ${r} A ${r} ${r} 0 0 0 ${r} 0`}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.07"
          />
        ))}
      </svg>
    </div>
  );
}

export default CornerOrnament;
