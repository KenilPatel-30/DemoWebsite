"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type Lenis from "lenis";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function scrollToHash(hash: string) {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  const target = hash === "#top" ? document.body : document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(hash === "#top" ? 0 : (target as HTMLElement), {
      offset: -80,
      duration: 1.4,
    });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#top");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is centered in the viewport to light the nav.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(hash);
  };

  if (pathname && (pathname.startsWith("/order") || pathname.startsWith("/reserve"))) return null;

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-colors duration-500",
          scrolled
            ? "bg-paper/85 backdrop-blur-md"
            : "bg-transparent"
        )}
        style={
          scrolled
            ? { borderBottom: "1px solid var(--line)" }
            : undefined
        }
      >
        <div className="container-x flex items-center justify-between py-5">
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            data-cursor="Top"
            className="flex items-baseline gap-2"
          >
            <span className="font-display text-2xl font-bold tracking-tightest text-ink">
              Demo Cafe
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.35em] text-primary/60 sm:inline">
              Cafe
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  data-cursor="Go"
                  className={cn(
                    "link-underline relative text-[13px] font-medium uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
              suppressHydrationWarning
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-paper px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl font-bold tracking-tightest text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="/reserve"
              className="mt-12 w-fit border-b border-primary pb-1 text-sm uppercase tracking-[0.2em] text-primary"
            >
              Reserve a Table · {SITE.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
