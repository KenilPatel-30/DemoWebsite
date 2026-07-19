"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "link";

export default function Button({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  cursor = "Explore",
  type = "button",
  arrow = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  cursor?: string;
  type?: "button" | "submit";
  arrow?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [fill, setFill] = useState({ x: 50, y: 50, on: false });

  // Anchor the hover-fill circle to where the cursor enters/leaves.
  const setFrom = (e: React.MouseEvent, on: boolean) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setFill({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on,
    });
  };

  if (variant === "link") {
    const cls = cn(
      "link-underline group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-primary",
      className
    );
    const content = (
      <>
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-power4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </>
    );
    return (
      <Magnetic strength={0.25} className="inline-block">
        {href ? (
          <Link href={href} data-cursor={cursor} className={cls}>
            {content}
          </Link>
        ) : (
          <button type={type} onClick={onClick} data-cursor={cursor} className={cls}>
            {content}
          </button>
        )}
      </Magnetic>
    );
  }

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-power4",
    variant === "solid"
      ? "bg-primary text-paper shadow-card"
      : "border border-ink/20 text-ink hover:border-ink",
    className
  );

  // Expanding circle wipe (the "ripple") in the contrast tone.
  const ripple = (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-full transition-transform duration-[650ms] ease-power4"
      style={{
        left: `${fill.x}%`,
        top: `${fill.y}%`,
        width: "260%",
        aspectRatio: "1",
        transform: `translate(-50%, -50%) scale(${fill.on ? 1 : 0})`,
        background: variant === "solid" ? "#5A3726" : "#1C1C1C",
      }}
    />
  );

  const inner = (
    <span
      className={cn(
        "relative z-10 flex items-center gap-2 transition-colors duration-500",
        variant === "outline" && fill.on && "text-paper"
      )}
    >
      {children}
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-power4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </span>
  );

  const handlers = {
    onMouseEnter: (e: React.MouseEvent) => setFrom(e, true),
    onMouseLeave: (e: React.MouseEvent) => setFrom(e, false),
  };

  return (
    <Magnetic strength={0.3} className="inline-block">
      {href ? (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          data-cursor={cursor}
          className={base}
          {...handlers}
        >
          {ripple}
          {inner}
        </Link>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
          onClick={onClick}
          data-cursor={cursor}
          className={base}
          {...handlers}
        >
          {ripple}
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
