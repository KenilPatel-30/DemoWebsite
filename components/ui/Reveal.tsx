"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const easing = [0.16, 1, 0.3, 1] as const;

/** Simple fade-up-on-enter wrapper for blocks. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: easing, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: easing },
  },
};

/**
 * Editorial headline reveal — splits text into words, each clipped and
 * translated up in sequence. Renders as a heading tag of choice.
 */
export function SplitText({
  text,
  className,
  as = "h2",
  stagger = 0.06,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delayChildren: delay }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden py-[0.06em]">
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

const letter: Variants = {
  hidden: { y: "120%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: easing },
  },
};

/**
 * Per-letter editorial reveal — each character clips up in sequence. Reserved
 * for short, high-impact headlines where the extra granularity reads as craft.
 * Preserves word boundaries (no mid-word wraps) and remains accessible via an
 * aria-label on the wrapper.
 */
export function SplitLetters({
  text,
  className,
  as = "h2",
  stagger = 0.03,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      aria-label={text}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delayChildren: delay }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((w, wi) => (
        <span key={wi} aria-hidden className="mr-[0.25em] inline-flex overflow-hidden py-[0.08em]">
          {w.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              variants={letter}
              className="inline-block will-change-transform"
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
