"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Subtle 3D tilt toward the cursor — the kind of quiet parallax that makes
 * large photography feel physical rather than pasted-on. Eased with springs,
 * capped to a few degrees so it stays luxurious, never gimmicky.
 */
export default function Tilt({
  children,
  className,
  max = 6,
  scale = 1.0,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
