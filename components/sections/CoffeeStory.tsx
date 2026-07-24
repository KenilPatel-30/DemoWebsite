"use client";

import { Reveal, SplitText } from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Button from "@/components/ui/Button";
import Tilt from "@/components/ui/Tilt";
import AmbientParticles from "@/components/ui/AmbientParticles";
import SectionSeam from "@/components/ui/SectionSeam";
import { IMG } from "@/lib/site";

const basePath = process.env.CF_PAGES ? "" : process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";

export default function CoffeeStory() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand py-20 md:py-40">
      {/* Steam carried up from the hero — the scroll never hard-cuts */}
      <SectionSeam className="-top-12" />
      <AmbientParticles count={12} tone="dark" className="opacity-70" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Layered photography — broken grid */}
          <div className="relative lg:col-span-6">
            <Tilt max={5}>
              <ParallaxImage
                src={`${basePath}/images/user_upload_1.jpg`}
                alt="A premium crafted cocktail with an orange slice at Demo Cafe"
                className="aspect-[3/4] w-full md:aspect-[4/5] lg:w-[86%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </Tilt>
            <div className="absolute -bottom-6 -right-2 w-32 md:-bottom-10 md:right-0 md:w-44 lg:w-52">
              <ParallaxImage
                src={`${basePath}/images/user_upload_2.jpg`}
                alt="An elegant iced cocktail with mint against a bokeh background"
                className="aspect-[2/3] w-full shadow-2xl md:aspect-[3/4]"
                amount={20}
                sizes="220px"
              />
            </div>
          </div>

          {/* Editorial copy */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal>
              <span className="eyebrow">01 — The Story</span>
            </Reveal>

            <SplitText
              as="h2"
              text="Coffee, made the slow way."
              className="mt-6 display-lg text-ink"
            />

            <div className="mt-8 space-y-6 prose-body">
              <Reveal delay={0.05}>
                <p>
                  Demo Cafe began with a single machine and a stubborn belief: that
                  great coffee shouldn’t be rushed. We source our beans
                  from single-origin estates, roasting them locally to preserve
                  their distinct terroir. Every cup is a quiet celebration of
                  craft.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-ink/55">
                  Around that ritual we built a room of curved wood, soft light
                  and quiet corners. A place designed not to be rushed through,
                  but lingered in.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 flex items-end gap-10 border-t border-line pt-8">
              <div>
                <div className="font-display text-4xl font-bold tracking-tightest text-primary">
                  2020
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  The first pour
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold tracking-tightest text-primary">
                  100%
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  Handcrafted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
