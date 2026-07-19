"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowUp } from "lucide-react";
import type Lenis from "lenis";
import { SITE } from "@/lib/site";
import { usePathname } from "next/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.63 1.19h.01c5.24 0 9.5-4.26 9.5-9.5s-4.26-9.5-9.5-9.5z" />
    </svg>
  );
}

function Action({
  href,
  onClick,
  label,
  cursor,
  children,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  cursor: string;
  children: React.ReactNode;
}) {
  const cls =
    "group/btn relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper/85 text-ink shadow-card backdrop-blur-md transition-all duration-500 ease-power4 hover:-translate-x-0.5 hover:bg-primary hover:text-paper";
  const tooltip = (
    <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-paper opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
      {label}
    </span>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-cursor={cursor} className={cls} aria-label={label}>
      {tooltip}
      {children}
    </a>
  ) : (
    <button onClick={onClick} data-cursor={cursor} className={cls} aria-label={label} suppressHydrationWarning>
      {tooltip}
      {children}
    </button>
  );
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname && (pathname.startsWith("/order") || pathname.startsWith("/reserve"))) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease, delay: 1.2 }}
      className="fixed right-4 bottom-5 z-[70] flex flex-col gap-3 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2"
    >
      <Action href={`tel:${SITE.phone.replace(/\s/g, "")}`} label="Call us" cursor="Call">
        <Phone className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </Action>

      <Action
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
          "Hi Demo Cafe, I'd like to book a table."
        )}`}
        label="WhatsApp"
        cursor="Chat"
      >
        <WhatsAppIcon className="h-5 w-5" />
      </Action>

      <AnimatePresence>
        {showTop && (
          <motion.div
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, ease }}
          >
            <Action onClick={scrollTop} label="Back to top" cursor="Top">
              <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </Action>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
