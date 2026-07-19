"use client";

import { useState } from "react";
import type Lenis from "lenis";
import { ArrowUpRight, Instagram, Facebook, Check } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";
import { SplitText } from "@/components/ui/Reveal";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-coffee text-paper">
      <div className="container-x py-16 md:py-32">
        {/* Big CTA */}
        <div className="border-b border-paper/12 pb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-accent">
            Let&apos;s meet
          </span>
          <SplitText
            as="h2"
            text="with us."
            className="mt-4 font-display text-[clamp(3.5rem,13vw,11rem)] font-bold leading-[0.85] tracking-tightest text-paper"
          />
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#contact"
              data-cursor="Book"
              className="rounded-full bg-paper px-9 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-coffee shadow-card transition-transform hover:scale-[1.02]"
            >
              Reserve a Table
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Map"
              className="link-underline group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-paper/80"
            >
              Get Directions
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 pt-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-2xl font-bold tracking-tightest">
              Demo Cafe
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Where artisanal roasting meets brutalist design.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                data-cursor="Follow"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-coffee"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                data-cursor="Follow"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-coffee"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">Explore</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline text-sm text-paper/65">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">Hours</h3>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              {SITE.hours.map((h) => (
                <li key={h.day}>
                  <span className="block text-paper/85">{h.day}</span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">Newsletter</h3>
            <p className="mt-5 text-sm text-paper/55">
              Seasonal menus & events, once a month.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
                setTimeout(() => setSubscribed(false), 4000);
              }}
              className="mt-4 flex items-center gap-3 border-b border-paper/25 pb-2"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="w-full bg-transparent text-sm text-paper placeholder:text-paper/40 outline-none"
                suppressHydrationWarning
              />
              <button
                type="submit"
                aria-label="Subscribe"
                data-cursor="Join"
                className="shrink-0 text-accent transition-transform hover:translate-x-0.5"
                suppressHydrationWarning
              >
                {subscribed ? <Check className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-paper/12 pt-8 text-xs text-paper/40 md:flex-row">
          <p>© 2020–{new Date().getFullYear()} Demo Cafe · Metropolis</p>
          <button
            onClick={scrollTop}
            data-cursor="Top"
            className="uppercase tracking-[0.2em] transition-colors hover:text-paper"
            suppressHydrationWarning
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
