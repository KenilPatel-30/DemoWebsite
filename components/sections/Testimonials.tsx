"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TESTIMONIALS, SITE, IMG, Testimonial } from "@/lib/site";
import { SplitText, Reveal } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import AmbientParticles from "@/components/ui/AmbientParticles";

const ease = [0.16, 1, 0.3, 1] as const;

// Shuffle function to make rows look varied
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  const result = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }
  return result;
}

// Generate enough items to fill a wide screen multiple times seamlessly
const baseList = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const ROW_1 = shuffle([...baseList]);
const ROW_2 = shuffle([...baseList]);
const ROW_3 = shuffle([...baseList]);

function RatingCircle({ rating, size = 32, strokeWidth = 3 }: { rating: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (rating / 5) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex shrink-0 items-center justify-center font-sans font-bold text-ink" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#eab308"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontSize: size * 0.35, lineHeight: 1 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function ReviewPill({ 
  t, 
  onHoverStart, 
  onHoverEnd 
}: { 
  t: Testimonial; 
  onHoverStart: (t: Testimonial) => void;
  onHoverEnd: () => void;
}) {
  return (
    <div 
      onMouseEnter={() => onHoverStart(t)}
      onMouseLeave={onHoverEnd}
      className="flex cursor-pointer items-center gap-4 rounded-full border border-ink/5 bg-paper px-4 py-2.5 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md sm:w-[400px]"
    >
      <RatingCircle rating={t.rating} />
      <p className="truncate text-sm font-medium text-ink/80">{t.quote}</p>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 40, onHoverStart, onHoverEnd }: { items: Testimonial[], direction?: "left" | "right", speed?: number, onHoverStart: (t: Testimonial) => void, onHoverEnd: () => void }) {
  return (
    <div className="flex w-max overflow-hidden">
      <motion.div
        className="flex w-max gap-4 sm:gap-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex gap-4 pr-4 sm:gap-6 sm:pr-6">
          {items.map((t, i) => (
            <ReviewPill key={`set1-${i}`} t={t} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
          ))}
        </div>
        <div className="flex gap-4 pr-4 sm:gap-6 sm:pr-6">
          {items.map((t, i) => (
            <ReviewPill key={`set2-${i}`} t={t} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 30 });
  const [hovered, setHovered] = useState<Testimonial | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="reviews"
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden py-20 text-paper md:py-32"
    >
      <Image
        src={IMG.warmInterior}
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-coffee/85" />
      <AmbientParticles count={14} tone="light" className="-z-10 opacity-60" />

      <div className="container-x relative mb-16">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-accent">
              05 — Kind Words
            </span>
          </Reveal>
          <SplitText
            as="h2"
            text="Loved across Surat."
            className="mt-4 display-md text-paper"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-paper/15 pt-8">
            <div className="flex items-end gap-2">
              <CountUp
                value={SITE.rating}
                decimals={1}
                className="font-display text-5xl font-bold tracking-tightest text-paper"
              />
              <span className="mb-1 text-base text-paper/60">/ 5</span>
            </div>
            <p className="mt-2 text-sm text-paper/65">
              Across <CountUp value={SITE.reviews} className="font-medium text-paper" />+ verified Google reviews
            </p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Reviews"
              className="link-underline mt-4 inline-block text-[12px] font-medium uppercase tracking-[0.16em] text-accent"
            >
              Read on Google
            </a>
          </div>
        </div>
      </div>

      <div className="relative -mx-4 flex flex-col gap-4 overflow-hidden sm:mx-0 sm:gap-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <MarqueeRow items={ROW_1} direction="left" speed={45} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} />
        <MarqueeRow items={ROW_2} direction="right" speed={50} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} />
        <MarqueeRow items={ROW_3} direction="left" speed={40} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ 
              x: smoothX, 
              y: smoothY,
              translateX: "20px", 
              translateY: "20px" 
            }}
            className="pointer-events-none fixed left-0 top-0 z-50 flex w-[340px] flex-col gap-3 rounded-2xl border border-white/10 bg-ink/75 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <RatingCircle rating={hovered.rating} size={48} strokeWidth={4} />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold leading-tight text-white">{hovered.name}</span>
                <span className="text-xs uppercase tracking-wider text-white/60">{hovered.role}</span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              "{hovered.quote}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
