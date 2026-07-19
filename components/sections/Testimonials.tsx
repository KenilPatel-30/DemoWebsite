"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, SITE, IMG } from "@/lib/site";
import { SplitText, Reveal } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import AmbientParticles from "@/components/ui/AmbientParticles";

const ease = [0.16, 1, 0.3, 1] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.07, ease }}
        >
          <Star
            className={`h-4 w-4 ${
              i < rating ? "fill-accent text-accent" : "text-paper/25"
            }`}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden py-20 text-paper md:py-40"
    >
      {/* Warm photographic backdrop so the glass has something to refract */}
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

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Aggregate */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-accent">
                05 — Kind Words
              </span>
            </Reveal>
            <SplitText
              as="h2"
              text="Loved across Surat."
              className="mt-6 display-md text-paper"
            />
            <div className="mt-10 border-t border-paper/15 pt-8">
              <div className="flex items-end gap-2">
                <CountUp
                  value={SITE.rating}
                  decimals={1}
                  className="font-display text-7xl font-bold tracking-tightest text-paper"
                />
                <span className="mb-2 text-lg text-paper/60">/ 5</span>
              </div>
              <div className="mt-3">
                <Stars rating={5} />
              </div>
              <p className="mt-4 text-sm text-paper/65">
                Across{" "}
                <CountUp value={SITE.reviews} className="font-medium text-paper" />+
                verified Google reviews
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Reviews"
                className="link-underline mt-6 inline-block text-[13px] font-medium uppercase tracking-[0.16em] text-accent"
              >
                Read on Google
              </a>
            </div>
          </div>

          {/* Floating glass panels */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {TESTIMONIALS.slice(0, 4).map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.85, delay: i * 0.08, ease }}
                whileHover={{ y: -6 }}
                data-cursor="Read"
                className="group relative flex flex-col overflow-hidden rounded-[10px] border border-white/20 bg-white/[0.12] p-7 shadow-lift backdrop-blur-none md:backdrop-blur-lg"
              >
                <div className="flex flex-1 flex-col">
                  <span
                    aria-hidden
                    className="font-display text-6xl font-bold leading-none text-paper/25"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="-mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-paper/85">
                    {t.quote}
                  </blockquote>
                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
                    <figcaption>
                      <div className="font-display text-lg font-semibold tracking-tight text-paper">
                        {t.name}
                      </div>
                      <div className="text-xs uppercase tracking-wide text-paper/55">
                        {t.role}
                      </div>
                    </figcaption>
                    <Stars rating={t.rating} />
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
