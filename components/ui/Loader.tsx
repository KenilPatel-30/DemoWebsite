"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Loading experience — a black stage, a slowly rotating ceramic-brown coffee
 * bean and a rising percentage. Fades softly into the hero. Shown once per
 * session so return navigation feels instant.
 */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("belluno-loaded")) {
        setDone(true);
        return;
      }
    } catch (e) {
      // Ignore security errors or blocked storage
    }

    document.body.style.overflow = "hidden";
    let current = 0;
    
    // Fallback: forcefully remove loader and overflow after 5 seconds no matter what
    const fallback = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 5000);

    let timer = window.setTimeout(function tick() {
      const step = Math.max(0.6, (100 - current) * 0.045);
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));
      if (current < 100) {
        timer = window.setTimeout(tick, 55);
      } else {
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
          try { sessionStorage.setItem("belluno-loaded", "1"); } catch (e) {}
        }, 420);
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#0B0B0B] text-paper"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-10">
            <span className="text-[11px] uppercase tracking-[0.5em] text-white/45">
              Demo Cafe · Metropolis
            </span>

            {/* Rotating coffee bean */}
            <motion.svg
              width="72"
              height="72"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            >
              <ellipse
                cx="50"
                cy="50"
                rx="26"
                ry="40"
                transform="rotate(28 50 50)"
                fill="none"
                stroke="#C18A53"
                strokeWidth="2.5"
              />
              <path
                d="M62 22 C40 40 60 60 38 78"
                fill="none"
                stroke="#C18A53"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>

            <div className="flex items-baseline gap-1 font-display text-5xl font-bold tabular-nums tracking-tightest">
              {progress}
              <span className="text-2xl text-accent">%</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
