"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
          stroke="rgba(255,255,255,0.1)"
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
      onClick={() => onHoverStart(t)}
      className="flex cursor-pointer items-center gap-4 rounded-full border border-ink/20 bg-ink/5 backdrop-blur-md px-4 py-2.5 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md sm:w-[400px]"
    >
      <RatingCircle rating={t.rating} />
      <p className="truncate text-sm font-medium text-ink/90">{t.quote}</p>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 40, onHoverStart, onHoverEnd, isPaused }: { items: Testimonial[], direction?: "left" | "right", speed?: number, onHoverStart: (t: Testimonial) => void, onHoverEnd: () => void, isPaused?: boolean }) {
  return (
    <div className="flex w-max overflow-hidden">
      <div
        className="flex w-max gap-4 sm:gap-6 animate-marquee"
        style={{ 
          animationDuration: `${speed}s`, 
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationPlayState: isPaused ? 'paused' : 'running' 
        }}
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
      </div>
    </div>
  );
}

export default function Testimonials() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 30 });
  const [hovered, setHovered] = useState<Testimonial | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="reviews"
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden py-20 bg-coffee text-ink md:py-32"
    >
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
            className="mt-4 display-md text-ink"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-ink/20 pt-8">
            <div className="flex items-end gap-2">
              <CountUp
                value={SITE.rating}
                decimals={1}
                className="font-display text-5xl font-bold tracking-tightest text-ink"
              />
              <span className="mb-1 text-base text-ink/60">/ 5</span>
            </div>
            <p className="mt-2 text-sm text-ink/80">
              Across <CountUp value={SITE.reviews} className="font-medium text-ink" />+ verified Google reviews
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
        <MarqueeRow items={ROW_1} direction="left" speed={180} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} isPaused={!!hovered} />
        <MarqueeRow items={ROW_2} direction="right" speed={200} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} isPaused={!!hovered} />
        <MarqueeRow items={ROW_3} direction="left" speed={160} onHoverStart={setHovered} onHoverEnd={() => setHovered(null)} isPaused={!!hovered} />
      </div>

      <AnimatePresence>
        {hovered && (
          <>
            {isMobile && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={() => setHovered(null)}
              />
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={isMobile ? {} : { 
                x: smoothX, 
                y: smoothY,
                translateX: "20px", 
                translateY: "20px" 
              }}
              className={`fixed z-50 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-sand p-6 shadow-2xl ${
                isMobile 
                  ? "inset-0 m-auto h-fit w-[90vw] max-w-[400px]" 
                  : "left-0 top-0 w-[360px] pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-4">
                <RatingCircle rating={hovered.rating} size={48} strokeWidth={4} />
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold leading-tight text-ink">{hovered.name}</span>
                  <span className="text-xs uppercase tracking-wider text-ink/60">{hovered.role}</span>
                </div>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
                "{hovered.quote}"
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
