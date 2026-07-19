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

// Duplicate for seamless infinite scrolling
const marqueeImages = [...images, ...images];

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
            Explore our artisanal coffee, wood-fired mains, and crafted desserts. Or if you&apos;re ready, order straight to your table.
          </p>
        </Reveal>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden flex items-center mb-16 py-4">
        <motion.div
          className="flex gap-4 md:gap-8 px-4 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeImages.map((src, i) => (
            <div
              key={i}
              className="relative w-[70vw] md:w-[35vw] lg:w-[25vw] aspect-[4/5] shrink-0 overflow-hidden rounded-[8px]"
            >
              <Image
                src={src}
                alt="Menu Item"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 70vw, 35vw"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="container-x flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
        <Button href="/order" variant="outline" className="w-full sm:w-auto" cursor="Menu">
          View Full Menu
        </Button>
        <Button href="/order" variant="solid" className="w-full sm:w-auto" cursor="Taste">
          Order Now
        </Button>
      </div>
    </div>
  );
}
