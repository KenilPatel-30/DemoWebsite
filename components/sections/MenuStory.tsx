"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMG } from "@/lib/site";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

// The images we want to showcase
const images = [
  IMG.brunchPlate,
  IMG.drinks,
  IMG.dessert,
  IMG.margherita,
  IMG.pizzaCocktails,
];

// 5 copies (25 items) for a very tight, continuous arc with minimal gaps
const marqueeImages = [...images, ...images, ...images, ...images, ...images];

export default function MenuStory() {
  return (
    <div id="menu" className="relative bg-paper py-20 md:py-32 overflow-hidden">
      {/* Intro Header */}
      <div className="container-x mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <Reveal>
            <span className="eyebrow">02 — The Menu</span>
          </Reveal>
          <SplitText
            as="h2"
            text="Taste the Experience."
            className="mt-6 display-lg text-ink"
          />
        </div>
        <Reveal delay={0.15}>
          <p className="max-w-xs prose-body md:pb-3">
            Explore our artisanal coffee, wood-fired mains, and crafted desserts. Or if you're ready, order straight to your table.
          </p>
        </Reveal>
      </div>

      {/* Circular Arc Marquee */}
      <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden flex justify-center mt-6">
        <motion.div
          className="absolute top-[60px] flex justify-center"
          style={{ width: "100%", height: "2400px" }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 90, // Slow, premium rotation
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeImages.map((src, i) => {
            const totalItems = marqueeImages.length;
            const angle = (i / totalItems) * 360;
            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 w-[60vw] md:w-[25vw] max-w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl"
                style={{
                  transformOrigin: "50% 1200px",
                  // We MUST include translateX(-50%) here because the style tag overrides Tailwind's -translate-x-1/2 class
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
              >
                <Image
                  src={src}
                  alt="Menu Item"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 25vw"
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="container-x flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
        <Button href="/order" variant="outline" className="w-full sm:w-auto" cursor="Menu">
          View Menu
        </Button>
        <Button href="/order" variant="solid" className="w-full sm:w-auto" cursor="Taste">
          Order Now
        </Button>
      </div>
    </div>
  );
}
