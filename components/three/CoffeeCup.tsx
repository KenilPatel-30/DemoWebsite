"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A hand-thrown ceramic cup, modelled procedurally (lathe body + lip, torus
 * handle, saucer, glossy coffee surface). Warm, matte glaze — no glow. Turns
 * slowly and breathes on the warm air.
 */
export default function CoffeeCup({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  const cupGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.5, 0.0),
      new THREE.Vector2(0.57, 0.14),
      new THREE.Vector2(0.69, 1.16),
      new THREE.Vector2(0.77, 1.34),
      new THREE.Vector2(0.71, 1.34),
      new THREE.Vector2(0.63, 1.12),
      new THREE.Vector2(0.51, 0.24),
      new THREE.Vector2(0.0, 0.26),
    ];
    return new THREE.LatheGeometry(pts, 128);
  }, []);

  const saucerGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.02, 0.0),
      new THREE.Vector2(1.1, 0.06),
      new THREE.Vector2(1.02, 0.09),
      new THREE.Vector2(0.4, 0.05),
      new THREE.Vector2(0.0, 0.06),
    ];
    return new THREE.LatheGeometry(pts, 128);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Calm, continuous rotation.
    group.current.rotation.y += delta * 0.16;
    const t = state.clock.elapsedTime;
    const settle = 1 - Math.min(scrollRef.current, 1);
    group.current.position.y = -0.35 + Math.sin(t * 0.7) * 0.045 * settle;
    group.current.rotation.z = Math.sin(t * 0.4) * 0.014;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* Cup body */}
      <mesh geometry={cupGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#ece4d7"
          roughness={0.45}
          metalness={0}
          clearcoat={0.35}
          clearcoatRoughness={0.4}
          sheen={0.3}
          sheenColor="#ffffff"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.73, 0.66, 0]} rotation={[0, 0, -0.15]} castShadow>
        <torusGeometry args={[0.3, 0.068, 32, 96, Math.PI * 1.3]} />
        <meshPhysicalMaterial
          color="#ece4d7"
          roughness={0.45}
          clearcoat={0.35}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Coffee surface — glossy, reflects the studio, no emissive */}
      <mesh position={[0, 1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 80]} />
        <meshPhysicalMaterial
          color="#341f13"
          roughness={0.12}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Subtle crema ring */}
      <mesh position={[0, 1.123, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.61, 80]} />
        <meshStandardMaterial
          color="#7a5230"
          roughness={0.6}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Saucer */}
      <mesh geometry={saucerGeometry} position={[0, -0.16, 0]} receiveShadow castShadow>
        <meshPhysicalMaterial
          color="#e6dccc"
          roughness={0.5}
          clearcoat={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
