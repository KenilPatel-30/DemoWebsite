"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aSway;
  varying float vAlpha;

  void main() {
    float life = fract(uTime * aSpeed * 0.12 + aSeed);
    vec3 pos = position;
    pos.y += life * 2.9;
    float ang = life * 6.2831 * aSway + aSeed * 10.0;
    pos.x += sin(ang) * (0.08 + life * 0.32);
    pos.z += cos(ang * 0.9) * (0.08 + life * 0.28);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float grow = 0.5 + life * 2.4;
    gl_PointSize = uSize * grow / -mv.z;
    vAlpha = smoothstep(0.0, 0.14, life) * (1.0 - smoothstep(0.4, 1.0, life));
  }
`;

// Normal-blended soft taupe wisps so steam reads gently against the warm,
// light studio background (additive would wash out on paper tones).
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.20;
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Delicate rising steam above the cup, tuned for a light background. */
export default function Steam({ count = 40 }: { count?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds, speeds, sways } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const speeds = new Float32Array(count);
    const sways = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 0.4;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(a) * r;
      seeds[i] = Math.random();
      speeds[i] = 0.55 + Math.random() * 0.7;
      sways[i] = 0.5 + Math.random() * 1.1;
    }
    return { positions, seeds, speeds, sways };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 300 },
      uColor: { value: new THREE.Color("#a89478") },
    }),
    []
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points position={[0, 0.75, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aSway" args={[sways, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
