"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Text } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";
import CoffeeCup from "./CoffeeCup";
import Steam from "./Steam";
import { FloatingBeans, Dust } from "./Particles";

/**
 * Camera rig — a slow natural orbit, gentle mouse parallax, and a scroll-driven
 * dolly that eases the camera toward the cup as the hero leaves the viewport.
 */
function Rig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const p = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    scrollRef.current = p;

    const t = state.clock.elapsedTime;
    const radius = 6.0 - p * 2.3;
    const azimuth = Math.sin(t * 0.14) * 0.22;

    const targetX = Math.sin(azimuth) * radius + state.pointer.x * 0.5;
    const targetY = 0.55 + state.pointer.y * 0.32 - p * 0.55;
    const targetZ = Math.cos(azimuth) * radius;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    state.camera.lookAt(0, 0.55 - p * 0.4, 0);
  });
  return null;
}

/** Subtle sunlit key-light animation (high tier only). */
function SunLight({ shadows }: { shadows: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame((state) => {
    if (light.current) {
      light.current.intensity =
        2.6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    }
  });
  return (
    <directionalLight
      ref={light}
      position={[-4, 6.5, 3]}
      intensity={2.6}
      color="#fff2df"
      castShadow={shadows}
      shadow-mapSize={[1024, 1024]}
      shadow-bias={-0.0004}
    />
  );
}

function detectTier(): "high" | "low" {
  if (typeof window === "undefined") return "low";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  // Only desktop-class machines get the heavy postprocessing path.
  if (reduce || !desktop || !fine || cores <= 6) return "low";
  return "high";
}

export default function HeroCanvas() {
  const scrollRef = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tier] = useState<"high" | "low">(detectTier);
  const high = tier === "high";

  // Stop rendering entirely once the hero has scrolled out of view — this frees
  // the GPU for the rest of the page instead of running the scene the whole time.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        shadows={high}
        dpr={high ? [1, 1.75] : [1, 1.35]}
        gl={{
          antialias: high,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        camera={{ position: [0, 0.55, 6], fov: 36 }}
      >
        <Rig scrollRef={scrollRef} />

        {/* Soft, natural daylight */}
        <ambientLight intensity={0.78} color="#f3e9db" />
        <SunLight shadows={high} />
        <pointLight position={[3, 1, 3]} intensity={1.1} color="#f0d6b0" distance={12} />

        {/* Studio reflections via virtual lightformers (offline-safe, one-time bake) */}
        <Environment resolution={high ? 256 : 96}>
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#ffffff"
            position={[-2.5, 3.5, 3]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            color="#ffe9cf"
            position={[3.5, 2, 2]}
            scale={[3, 3, 1]}
          />
          <Lightformer
            form="circle"
            intensity={0.8}
            color="#ffffff"
            position={[0, -2.5, 3]}
            scale={[5, 3, 1]}
          />
        </Environment>

        <CoffeeCup scrollRef={scrollRef} />
        
        <Text
          position={[0, 0, 0]}
          fontSize={3.2}
          color="#1C1C1C"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.05}
          depthOffset={1}
        >
          BELLUNO CAFE
        </Text>

        <Steam count={high ? 40 : 20} />
        <FloatingBeans count={high ? 12 : 6} />
        <Dust count={high ? 90 : 34} />

        {high && (
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.42}
            scale={9}
            blur={2.8}
            far={4}
            color="#3a2416"
          />
        )}

        {/* Postprocessing is desktop-only — DepthOfField + Bloom are the
            heaviest passes and would tank mobile framerates. */}
        {high && (
          <EffectComposer multisampling={4}>
            <DepthOfField
              focusDistance={0.02}
              focalLength={0.05}
              bokehScale={2.4}
              height={480}
            />
            <Bloom
              intensity={0.28}
              luminanceThreshold={0.82}
              luminanceSmoothing={0.9}
              mipmapBlur
              radius={0.6}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
