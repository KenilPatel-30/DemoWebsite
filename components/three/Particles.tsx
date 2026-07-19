"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* --------------------------------------------------------------------- */
/* Floating coffee beans — instanced, calmly orbiting the cup             */
/* --------------------------------------------------------------------- */

type BeanData = {
  radius: number;
  angle: number;
  height: number;
  speed: number;
  spin: THREE.Vector3;
  scale: number;
};

export function FloatingBeans({ count = 12 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const beans = useMemo<BeanData[]>(() => {
    return Array.from({ length: count }, () => ({
      radius: 2.0 + Math.random() * 2.2,
      angle: Math.random() * Math.PI * 2,
      height: (Math.random() - 0.5) * 3,
      speed: (Math.random() > 0.5 ? 1 : -1) * (0.03 + Math.random() * 0.07),
      spin: new THREE.Vector3(
        Math.random() * 0.4,
        Math.random() * 0.4,
        Math.random() * 0.4
      ),
      scale: 0.7 + Math.random() * 0.6,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    beans.forEach((b, i) => {
      const angle = b.angle + t * b.speed;
      dummy.position.set(
        Math.cos(angle) * b.radius,
        b.height + Math.sin(t * 0.5 + i) * 0.18,
        Math.sin(angle) * b.radius - 0.5
      );
      dummy.rotation.set(t * b.spin.x, t * b.spin.y, t * b.spin.z);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow>
      <sphereGeometry args={[0.11, 20, 16]} />
      <meshStandardMaterial color="#43291a" roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

/* --------------------------------------------------------------------- */
/* Cinnamon / cocoa motes drifting through the light                      */
/* --------------------------------------------------------------------- */

const dustVertex = /* glsl */ `
  uniform float uTime;
  attribute float aScale;
  attribute float aSpeed;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec3 pos = position;
    pos.y += sin(uTime * aSpeed + position.x * 2.0) * 0.35;
    pos.x += cos(uTime * aSpeed * 0.8 + position.z) * 0.25;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * 80.0 / -mv.z;
  }
`;

// Normal blend, warm pigment — visible as soft motes on light paper.
const dustFragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * 0.35);
  }
`;

export function Dust({ count = 90 }: { count?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, scales, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const palette = [
      new THREE.Color("#8b4513"),
      new THREE.Color("#c18a53"),
      new THREE.Color("#5a3726"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      scales[i] = 0.4 + Math.random() * 1.0;
      speeds[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions, colors, scales, speeds };
  }, [count]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
