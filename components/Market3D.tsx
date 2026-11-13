"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D market: teal spheres (buyers) and amber cubes (sellers) float around a
// pulsing equilibrium ring. Glowing "trade" packets travel buyer -> seller.
const N = 7;

function seeded(i: number, k: number) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Agents() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const buyers = useRef<(THREE.Mesh | null)[]>([]);
  const sellers = useRef<(THREE.Mesh | null)[]>([]);
  const packets = useRef<(THREE.Mesh | null)[]>([]);

  const base = useMemo(() => {
    const mk = (side: number) =>
      Array.from({ length: N }, (_, i) =>
        new THREE.Vector3(
          side * (1.2 + seeded(i, side) * 2.2),
          (seeded(i, side + 3) - 0.5) * 3.4,
          (seeded(i, side + 7) - 0.5) * 2.6
        )
      );
    return { b: mk(-1), s: mk(1) };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // mouse parallax
    if (group.current) {
      group.current.rotation.y += (state.pointer.x * 0.5 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * 0.05;
    }
    const place = (m: THREE.Mesh | null, p: THREE.Vector3, i: number) => {
      if (!m) return;
      m.position.set(
        p.x + Math.sin(t * 0.6 + i) * 0.25,
        p.y + Math.cos(t * 0.5 + i * 1.7) * 0.3,
        p.z + Math.sin(t * 0.4 + i * 2.3) * 0.2
      );
      m.rotation.x = t * 0.4 + i;
      m.rotation.y = t * 0.3 + i;
    };
    base.b.forEach((p, i) => place(buyers.current[i], p, i));
    base.s.forEach((p, i) => place(sellers.current[i], p, i + 5));

    // trade packets
    packets.current.forEach((m, i) => {
      const b = buyers.current[i];
      const s = sellers.current[(i + 2) % N];
      if (!m || !b || !s) return;
      const k = ((t * 0.25 + i / N) % 1);
      m.position.lerpVectors(b.position, s.position, k);
      m.scale.setScalar(Math.sin(k * Math.PI) * 1.1 + 0.05);
    });

    if (ring.current) {
      const k = (t * 0.5) % 1;
      ring.current.scale.setScalar(0.6 + k * 2);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - k);
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: N }, (_, i) => (
        <mesh key={`b${i}`} ref={(el) => void (buyers.current[i] = el)}>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial color="#3f8aa1" roughness={0.25} metalness={0.3} emissive="#2b5a6b" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {Array.from({ length: N }, (_, i) => (
        <mesh key={`s${i}`} ref={(el) => void (sellers.current[i] = el)}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#e0a74a" roughness={0.25} metalness={0.3} emissive="#b8791f" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {Array.from({ length: N }, (_, i) => (
        <mesh key={`p${i}`} ref={(el) => void (packets.current[i] = el)}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#fff4d6" />
        </mesh>
      ))}
      {/* equilibrium core + pulse */}
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#7fc0d3" emissiveIntensity={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.015, 8, 96]} />
        <meshBasicMaterial color="#2b5a6b" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function Market3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} />
      <pointLight position={[-5, -3, 3]} intensity={25} color="#f3c87a" />
      <Agents />
    </Canvas>
  );
}
