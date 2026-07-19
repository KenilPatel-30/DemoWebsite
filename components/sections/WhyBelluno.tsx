"use client";

import { motion } from "framer-motion";
import { Reveal, SplitLetters } from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import CountUp from "@/components/ui/CountUp";
import Tilt from "@/components/ui/Tilt";
import AmbientParticles from "@/components/ui/AmbientParticles";
import { WHY } from "@/lib/content";
import { IMG, STATS } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhyBelluno() {
  return (
    <section id="why" className="relative overflow-hidden bg-sand py-20 md:py-40">
      <AmbientParticles count={10} tone="dark" className="opacity-60" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">03 — Why Us</span>
            </Reveal>
            <SplitLetters
              as="h2"
              text="Small obsessions you can taste."
              className="mt-6 display-lg text-ink"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Editorial reasons */}
          <div className="lg:col-span-7">
            {WHY.map((item, i) => (
              <motion.div
                key={item.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.9, ease, delay: i * 0.08 }}
                className="grid grid-cols-1 gap-4 border-t border-line py-9 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <span className="font-display text-2xl font-bold tracking-tightest text-primary">
                    {item.stat}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted">
                    {item.no}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink/60">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tall photograph */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Tilt max={5}>
                <ParallaxImage
                  src={IMG.fountainWall}
                  alt="The signature Demo Cafe wordmark on a curved wall above a courtyard fountain"
                  className="aspect-[3/4] w-full"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </Tilt>
            </div>
          </div>
        </div>

        {/* Animated statistics */}
        <div className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {STATS.map((s, i) => {
            const num = parseFloat(s.value);
            const decimals = s.value.includes(".") ? 1 : 0;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="border-line px-2 py-8 md:border-l md:px-8 md:first:border-l-0"
              >
                <div className="flex items-baseline gap-1 font-display text-5xl font-bold tracking-tightest text-ink md:text-6xl">
                  <CountUp value={num} decimals={decimals} />
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
