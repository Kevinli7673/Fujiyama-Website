"use client";

import * as React from "react";
import styles from "./LineSidebar.module.css";

type Falloff = "linear" | "smooth" | "sharp";

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

export interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const LineSidebar = ({
  items,
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = "",
}: LineSidebarProps) => {
  const listRef = React.useRef<HTMLUListElement>(null);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = React.useRef<number[]>([]);
  const currentRef = React.useRef<number[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const lastRef = React.useRef(0);
  const activeRef = React.useRef(defaultActive);
  const smoothingRef = React.useRef(smoothing);
  const runFrameRef = React.useRef<(now: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActive,
  );

  React.useEffect(() => {
    activeRef.current = activeIndex;
    smoothingRef.current = smoothing;
  }, [activeIndex, smoothing]);

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = React.useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const target = Math.max(
        targetsRef.current[i] || 0,
        activeRef.current === i ? 1 : 0,
      );
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving
      ? requestAnimationFrame((t) => runFrameRef.current(t))
      : null;
  }, []);

  React.useEffect(() => {
    runFrameRef.current = runFrame;
  }, [runFrame]);

  const startLoop = React.useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }

    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const els = itemRefs.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = React.useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = React.useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick],
  );

  React.useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  React.useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    [],
  );

  return (
    <nav
      className={[
        styles.lineSidebar,
        showMarker && styles.lineSidebarMarkers,
        scaleTick && styles.lineSidebarScaleTick,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as React.CSSProperties
      }
    >
      <ul
        ref={listRef}
        className={styles.lineSidebarList}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={styles.lineSidebarItem}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker && (
              <span className={styles.lineSidebarMarker} aria-hidden="true" />
            )}
            <span className={styles.lineSidebarLabel}>
              {showIndex && (
                <span className={styles.lineSidebarIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
