"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;
const basePath = process.env.CF_PAGES ? "" : process.env.NODE_ENV === "production" ? "/DemoWebsite" : "";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [textureType, setTextureType] = useState<"beans" | "foam">("beans");
  const containerRef = useRef<HTMLDivElement>(null);
  const stopTimeout = useRef<NodeJS.Timeout>();
  
  // Track raw pointer coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Initialize at center
  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, [mouseX, mouseY]);

  function updatePointer(clientX: number, clientY: number, target: EventTarget & HTMLDivElement) {
    const { left, top } = target.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    setIsHovered(true);
    setIsMoving(true);
    clearTimeout(stopTimeout.current);
    stopTimeout.current = setTimeout(() => {
      setIsMoving(false);
    }, 100);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // Hide the blob if it gets too close to the Navbar (top 100px) 
    // or Floating Actions (right 100px) to prevent obscuring them.
    if (e.clientY < 100 || window.innerWidth - e.clientX < 100) {
      setIsHovered(false);
      setIsMoving(false);
      return;
    }
    updatePointer(e.clientX, e.clientY, e.currentTarget);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    updatePointer(e.clientX, e.clientY, e.currentTarget);
    // Toggle the aesthetic (Texture + Font) exactly once per new touch/click!
    setTextureType((prev) => (prev === "beans" ? "foam" : "beans"));
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    setIsHovered(false);
    setIsMoving(false);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    // On touch devices, lifting the finger hides the effect
    if (e.pointerType === "touch") {
      setIsHovered(false);
      setIsMoving(false);
    }
  }

  // Springs for the fluid trail (slightly faster for mobile snappiness)
  const x1 = useSpring(mouseX, { stiffness: 400, damping: 25 });
  const y1 = useSpring(mouseY, { stiffness: 400, damping: 25 });
  
  const x2 = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const y2 = useSpring(mouseY, { stiffness: 200, damping: 25 });
  
  const x3 = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const y3 = useSpring(mouseY, { stiffness: 100, damping: 25 });
  
  const x4 = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const y4 = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const showEffect = isHovered && isMoving;

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-paper">
      
      {/* SVG Definitions for the Advanced Watery Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="watery-blob">
            {/* 1. Organic Displacement (scale 200 is perfectly balanced for both mobile and desktop) */}
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" result="noise">
              <animate attributeName="baseFrequency" values="0.008;0.012;0.008" dur="2s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="200" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            
            {/* 2. Gooey Blur */}
            <feGaussianBlur in="displaced" stdDeviation="30" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 60 -30" 
            />
          </filter>
          
          {/* 3. Bean Edges Filter (makes the text look like physical 3D objects) */}
          <filter id="bean-edges">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feDropShadow in="displaced" dx="2" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.9" />
          </filter>

          {/* 4. Foam Edges Filter (Keeps foam natural brightness) */}
          <filter id="foam-edges">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          </filter>

          <mask id="dynamic-splat-mask">
            {/* The white circles act as the base shape for the mask */}
            <g filter="url(#watery-blob)">
              <motion.circle cx={x1} cy={y1} r={showEffect ? 110 : 0} fill="white" animate={{ r: showEffect ? 110 : 0 }} transition={{ duration: 0.15 }} />
              <motion.circle cx={x2} cy={y2} r={showEffect ? 85 : 0} fill="white" animate={{ r: showEffect ? 85 : 0 }} transition={{ duration: 0.2 }} />
              <motion.circle cx={x3} cy={y3} r={showEffect ? 60 : 0} fill="white" animate={{ r: showEffect ? 60 : 0 }} transition={{ duration: 0.25 }} />
              <motion.circle cx={x4} cy={y4} r={showEffect ? 30 : 0} fill="white" animate={{ r: showEffect ? 30 : 0 }} transition={{ duration: 0.3 }} />
            </g>
          </mask>
        </defs>
      </svg>

      <div 
        ref={containerRef}
        className="relative w-full h-[100svh] flex flex-col justify-center touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        
        {/* Architectural Dot Pattern to fill the empty space elegantly */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 z-0" 
          style={{
            backgroundImage: "radial-gradient(#1c1c1c 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px"
          }}
        />

        {/* Layer 1: Base Layer (Normal State) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10">
          <h1 className="text-center font-syne font-extrabold tracking-tighter leading-[0.85] text-ink uppercase text-[clamp(2.5rem,10.5vw,10rem)]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            DEMO<br/>WEBSITE
          </h1>
        </div>

        {/* Layer 2: Reveal Layer (Hover State) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-ink pointer-events-none px-4 z-20"
          style={{
            WebkitMaskImage: "url(#dynamic-splat-mask)",
            mask: "url(#dynamic-splat-mask)"
          }}
        >
          {/* Inverted White Dot Pattern inside the black mask */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10 z-0" 
            style={{
              backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px"
            }}
          />

          {/* Inside the fluid mask, exactly aligned font, but with physical texture */}
          <h1 
            className="text-center font-syne font-extrabold tracking-tighter leading-[0.85] uppercase text-[clamp(2.5rem,10.5vw,10rem)] pointer-events-none"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              backgroundImage: textureType === "beans" ? `url('${basePath}/images/coffee-beans.png')` : `url('${basePath}/images/coffee-foam.png')`,
              backgroundSize: textureType === "beans" ? "clamp(150px, 30vw, 250px)" : "clamp(300px, 60vw, 600px)", 
              backgroundRepeat: "repeat",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: textureType === "beans" ? "url(#bean-edges)" : "url(#foam-edges)",
            }}
          >
            DEMO<br/>WEBSITE
          </h1>
        </div>

        {/* Buttons (Clean and presentable arrangement) */}
        <div className="absolute bottom-10 sm:bottom-14 left-0 w-full z-30 pointer-events-auto flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 w-full"
          >
            <Button href="/reserve" variant="solid">
              Reserve a Table
            </Button>
            <Button 
              href={SITE.mapsUrl} 
              variant="link" 
              cursor="Map" 
              className="text-primary hover:text-coffee bg-paper/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none px-5 py-2 rounded-full transition-all"
            >
              Visit Today
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
