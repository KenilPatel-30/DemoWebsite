"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { SplitText, Reveal } from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-sand py-20 md:py-40">
      <div className="container-x max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Reveal>
            <span className="eyebrow">06 — Visit Us</span>
          </Reveal>
          <SplitText
            as="h2"
            text="Come say hello."
            className="mt-6 display-lg text-ink"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — Map */}
          <div className="w-full">
            <Reveal>
              <div
                data-cursor="Map"
                className="group relative z-50 aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-soft"
              >
                <iframe
                  title="Demo Cafe location on Google Maps"
                  src={SITE.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[0.25] transition-all duration-700 group-hover:grayscale-0"
                />
                <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col justify-center h-full space-y-6">
            {[
              {
                icon: MapPin,
                label: "Find us",
                value: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}`,
                href: SITE.mapsUrl,
              },
              { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phone}` },
              {
                icon: Clock,
                label: "Open hours",
                value: "Mon–Thu · 8AM–11PM   |   Fri–Sun · 8AM–12AM",
              },
            ].map((row) => (
              <Reveal key={row.label} delay={0.05}>
                <a
                  href={row.href}
                  target={row.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-4 border-t border-line pt-6"
                  data-cursor={row.href ? "Open" : undefined}
                >
                  <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                      {row.label}
                    </span>
                    <span className="mt-1 block text-[15px] text-ink">{row.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <a
                href={`tel:${SITE.phone}`}
                data-cursor="Call"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <Phone className="h-4 w-4" /> Call the cafe
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
