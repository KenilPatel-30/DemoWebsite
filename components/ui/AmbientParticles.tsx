"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Kind = "bean" | "dust" | "cinnamon";

// Stable module-level default so the prop reference never changes between
// renders (an inline default array would re-trigger the effect every render).
const DEFAULT_KINDS: Kind[] = ["bean", "dust", "cinnamon"];

type Particle = {
  kind: Kind;
  left: number;
  top: number;
  size: number;
  rotate: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  opacity: number;
};

/**
 * A calm, decorative field of drifting coffee elements (beans, cinnamon flecks,
 * light dust) that lives *inside* a section behind its content. Pure CSS
 * transforms — GPU-composited, paused while off-screen, and skipped entirely
 * for reduced-motion or coarse-pointer/low-core devices. Keeps pages from ever
 * feeling flat without the cost of an always-on WebGL layer.
 */
export default function AmbientParticles({
  count = 14,
  className,
  tone = "dark",
  kinds = DEFAULT_KINDS,
}: {
  count?: number;
  className?: string;
  tone?: "dark" | "light";
  kinds?: Kind[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [active, setActive] = useState(false);

  // Serialise the kinds so the generation effect keys on a stable primitive
  // rather than an array reference (which could change identity each render).
  const kindsKey = kinds.join("|");

  // Generate the particle field once for a given count/kind set.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      !window.matchMedia("(pointer: fine)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    if (reduce || lowPower) return;

    const activeKinds = kindsKey.split("|") as Kind[];
    const rnd = (min: number, max: number) => min + Math.random() * (max - min);
    const list: Particle[] = Array.from({ length: count }, () => {
      const kind = activeKinds[Math.floor(Math.random() * activeKinds.length)];
      return {
        kind,
        left: rnd(2, 98),
        top: rnd(4, 96),
        size:
          kind === "bean" ? rnd(9, 16) : kind === "cinnamon" ? rnd(4, 9) : rnd(2, 4),
        rotate: rnd(0, 360),
        driftX: rnd(-30, 30),
        driftY: rnd(-50, -18),
        duration: rnd(14, 26),
        delay: rnd(-14, 0),
        opacity: kind === "dust" ? rnd(0.14, 0.28) : rnd(0.1, 0.22),
      };
    });
    setParticles(list);
  }, [count, kindsKey]);

  // Pause the animation while the section is off-screen. Runs once on mount.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    tone === "dark" ? "rgba(90,55,38," : "rgba(247,244,238,";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {particles.map((p, i) => {
        // Use animation longhand props only — mixing the `animation` shorthand
        // with `animationPlayState` triggers a React style-reconciliation warning.
        const style: React.CSSProperties = {
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: p.size,
          height: p.kind === "bean" ? p.size * 1.4 : p.size,
          opacity: p.opacity,
          // Custom props consumed by the keyframes below.
          ["--dx" as string]: `${p.driftX}px`,
          ["--dy" as string]: `${p.driftY}px`,
          ["--rot" as string]: `${p.rotate}deg`,
          animationName: "ambient-float",
          animationDuration: `${p.duration}s`,
          animationTimingFunction: "ease-in-out",
          animationDelay: `${p.delay}s`,
          animationIterationCount: "infinite",
          animationPlayState: active ? "running" : "paused",
        };

        if (p.kind === "bean") {
          return (
            <span
              key={i}
              className="absolute rounded-[50%]"
              style={{
                ...style,
                background: tone === "dark" ? "#5A3726" : "#e9d9c4",
              }}
            >
              <span
                className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2"
                style={{
                  background:
                    tone === "dark" ? "rgba(28,18,11,0.5)" : "rgba(90,55,38,0.35)",
                }}
              />
            </span>
          );
        }
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              ...style,
              background:
                p.kind === "cinnamon"
                  ? tone === "dark"
                    ? "#8B4513"
                    : "#C18A53"
                  : `${base}${tone === "dark" ? "0.4" : "0.9"})`,
            }}
          />
        );
      })}
    </div>
  );
}
