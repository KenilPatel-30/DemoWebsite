"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY } from "@/lib/content";
import { Reveal, SplitText } from "@/components/ui/Reveal";

export default function Gallery() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal parallax on each image, driven by the pin timeline.
        gsap.utils.toArray<HTMLElement>(".g-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".g-frame") as HTMLElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={section}
      className="relative bg-paper lg:h-screen lg:overflow-hidden"
    >
      <div
        ref={track}
        className="flex flex-col lg:h-screen lg:flex-row lg:flex-nowrap lg:items-center"
      >
        {/* Intro panel */}
        <div className="flex w-full shrink-0 flex-col justify-center px-6 pt-28 pb-10 md:px-16 lg:h-screen lg:w-[42vw] lg:py-0">
          <Reveal>
            <span className="eyebrow">04 — The Gallery</span>
          </Reveal>
          <SplitText
            as="h2"
            text="A room worth the visit."
            className="mt-6 display-lg text-ink"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 prose-body">
              Curved timber ceilings, sculpted white walls, courtyard fountains
              and the glow of evening — every corner of our cafe is composed like
              a photograph.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted lg:flex">
              <span>Scroll to wander</span>
              <span className="h-px w-16 bg-primary/40" />
              <span>→</span>
            </div>
          </Reveal>
        </div>

        {/* Image panels */}
        {GALLERY.map((item, i) => (
          <figure
            key={item.src}
            className="flex w-full shrink-0 flex-col justify-center px-6 py-6 md:px-16 lg:h-screen lg:w-[46vw] lg:px-6 lg:py-0"
          >
            <div className="g-frame group relative z-50 h-[58vh] w-full overflow-hidden rounded-[3px] shadow-soft lg:h-[70vh]">
              <div className="g-img absolute -left-[10%] top-0 h-full w-[120%]">
                <Image
                  src={item.src}
                  alt={`${item.caption} — Demo Cafe`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-[1.2s] ease-power4 group-hover:scale-[1.05]"
                />
              </div>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-display text-xl font-semibold tracking-tight text-ink">
                {item.caption}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                {String(i + 1).padStart(2, "0")} — {item.label}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
