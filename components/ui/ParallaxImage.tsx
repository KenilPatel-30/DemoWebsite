"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Rounded, soft-shadowed image with a scroll-driven parallax on the inner
 * media and a clip-reveal curtain on enter. Lazy-loaded by default.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 14,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div
      ref={ref}
      data-cursor="View"
      className={cn(
        "relative overflow-hidden rounded-[3px] shadow-soft",
        className
      )}
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[128%] w-full -translate-y-[14%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-[1.2s] ease-out-expo will-change-transform hover:scale-[1.04]",
            imgClassName
          )}
        />
      </motion.div>

      {/* Reveal curtain */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        className="absolute inset-0 z-10 origin-bottom bg-coffee"
      />
    </div>
  );
}
