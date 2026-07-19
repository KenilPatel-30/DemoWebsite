"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A whisper of rising steam placed at the boundary between two sections so the
 * scroll never feels like a hard cut — the warm air of the hero seems to carry
 * through the whole page. Rendered as a few blurred, slowly-rising columns.
 * Off-screen-gated and reduced-motion aware.
 */
export default function SectionSeam({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), {
      rootMargin: "0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const color = tone === "dark" ? "rgba(90,55,38," : "rgba(247,244,238,";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 z-10 h-24 w-64 -translate-x-1/2",
        className
      )}
    >
      {enabled &&
        [0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full blur-md"
            style={{
              left: `${18 + i * 20}%`,
              width: 26,
              height: 60,
              background: `radial-gradient(circle, ${color}0.5) 0%, ${color}0) 70%)`,
              ["--steam-peak" as string]: tone === "dark" ? "0.32" : "0.5",
              animationName: "seam-steam",
              animationDuration: `${5 + i * 0.9}s`,
              animationTimingFunction: "ease-out",
              animationDelay: `${i * 0.7}s`,
              animationIterationCount: "infinite",
              animationPlayState: on ? "running" : "paused",
            }}
          />
        ))}
    </div>
  );
}
