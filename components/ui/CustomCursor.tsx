"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const pathname = usePathname();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for the fluid trail
  const springConfig1 = { stiffness: 400, damping: 25 };
  const springConfig2 = { stiffness: 200, damping: 25 };
  const springConfig3 = { stiffness: 100, damping: 25 };
  const springConfig4 = { stiffness: 50, damping: 25 };

  const x1 = useSpring(mouseX, springConfig1);
  const y1 = useSpring(mouseY, springConfig1);
  
  const x2 = useSpring(mouseX, springConfig2);
  const y2 = useSpring(mouseY, springConfig2);
  
  const x3 = useSpring(mouseX, springConfig3);
  const y3 = useSpring(mouseY, springConfig3);
  
  const x4 = useSpring(mouseX, springConfig4);
  const y4 = useSpring(mouseY, springConfig4);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // We remove the mobile check here because user explicitly asked:
    // "when ever user scrolls in mobile or on desktop that wave effect"
    // However, tracking mouse coordinates on scroll on mobile is tricky,
    // but we can listen to pointer events. Let's just track it normally.
    // Actually, on mobile, pointer move happens on touch. 

    if (pathname && (pathname.startsWith("/order") || pathname.startsWith("/reserve"))) {
      setIsHidden(true);
      return;
    }

    let movementTimeout: NodeJS.Timeout | null = null;

    const triggerMovement = () => {
      setIsMoving(true);
      if (movementTimeout) clearTimeout(movementTimeout);
      movementTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150); // hide after 150ms of no movement
    };

    const moveCursor = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      
      mouseX.set(clientX);
      mouseY.set(clientY);
      
      const target = e.target as HTMLElement;
      
      // Hide if over footer or Hero section (#top)
      const footer = target.closest("footer");
      const hero = target.closest("#top");
      if (footer || hero) {
        setIsHidden(true);
        return;
      }
      setIsHidden(false);
      triggerMovement();

      // Use elementFromPoint for accurate detection even during mobile scroll
      const elementAtPoint = document.elementFromPoint(clientX, clientY);
      const img = elementAtPoint?.closest("img, iframe, [data-cursor='View'], .parallax-image") || target.closest("img, iframe, [data-cursor='View'], .parallax-image") || target.tagName === 'IMG' || target.tagName === 'IFRAME';
      
      if (img) {
        setIsHoveringImage(true);
      } else {
        setIsHoveringImage(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleTouchStart = (e: TouchEvent) => {
      setIsHidden(false);
      moveCursor(e);
    };
    const handleScroll = () => {
      triggerMovement();
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("touchmove", moveCursor, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("touchmove", moveCursor);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (movementTimeout) clearTimeout(movementTimeout);
    };
  }, [pathname, mouseX, mouseY]);

  if (isHidden) return null;

  // The sizes of the blob (shrink to 0 when over an image or when touch ended)
  const showBlob = !isHoveringImage && isMoving;
  const r1 = showBlob ? 110 : 0;
  const r2 = showBlob ? 85 : 0;
  const r3 = showBlob ? 60 : 0;
  const r4 = showBlob ? 30 : 0;

  // Transition settings: fast when expanding, slow/smooth when shrinking, INSTANT when over image/map
  const getTransition = (baseDuration: number) => {
    if (showBlob) return { duration: baseDuration, ease: "easeOut" };
    if (isHoveringImage) return { duration: 0, ease: "linear" };
    return { duration: 1.5, ease: [0.16, 1, 0.3, 1] }; // End slowly and smoothly!
  };

  return (
    <>
      {/* The Liquid Blob SVG */}
      <svg className="pointer-events-none fixed top-0 left-0 w-full h-[100svh] z-[40] mix-blend-difference" style={{ filter: 'url(#global-watery-blob)' }}>
        <defs>
          <filter id="global-watery-blob">
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" result="noise">
              <animate attributeName="baseFrequency" values="0.008;0.012;0.008" dur="2s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="150" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            
            <feGaussianBlur in="displaced" stdDeviation="25" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 50 -20" 
            />
          </filter>
        </defs>
        
        <g fill="white">
          <motion.circle cx={x1} cy={y1} animate={{ r: r1 }} transition={getTransition(0.15)} />
          <motion.circle cx={x2} cy={y2} animate={{ r: r2 }} transition={getTransition(0.20)} />
          <motion.circle cx={x3} cy={y3} animate={{ r: r3 }} transition={getTransition(0.25)} />
          <motion.circle cx={x4} cy={y4} animate={{ r: r4 }} transition={getTransition(0.30)} />
        </g>
      </svg>
    </>
  );
}
