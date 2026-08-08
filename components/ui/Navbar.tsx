"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type Lenis from "lenis";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();


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
    if (pathname === "/") {
      scrollToHash(hash);
    } else {
      router.push("/" + hash);
    }
  };

  // Hide global navbar on pages that have their own custom layouts
  if (pathname === '/reserve' || pathname?.startsWith('/admin') || pathname?.startsWith('/kitchen') || pathname?.startsWith('/order/')) {
    return null;
  }

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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-paper lg:hidden pt-20 pb-10"
          >
            <nav className="flex flex-col px-8 w-full max-w-sm mx-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full border-b border-ink/10 py-6 text-[32px] font-display font-medium text-ink transition-colors flex items-center justify-between active:bg-ink/5 px-2 rounded-lg"
                >
                  {link.label}
                  <span className="text-[12px] font-sans tracking-widest text-ink/30">0{i+1}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
