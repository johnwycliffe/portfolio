"use client";

import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Points as ThreePoints, BufferGeometry, Float32BufferAttribute } from "three";

const generateSpherePositions = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const r = Math.sqrt(Math.max(0, 1 - y * y)) * radius; // radius at y, with max to prevent NaN
    const theta = phi * i; // Golden angle increment

    // Ensure all values are valid numbers
    positions[i * 3] = Math.cos(theta) * r || 0;     // x
    positions[i * 3 + 1] = y * radius || 0;          // y
    positions[i * 3 + 2] = Math.sin(theta) * r || 0; // z
  }

  return positions;
};

const StarBackground = () => {
  const ref = useRef<ThreePoints>(null);
  const [mounted, setMounted] = useState(false);

  const positions = useMemo(() => {
    const pos = generateSpherePositions(5000, 1.2);
    // Create a new geometry to ensure proper initialization
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(pos, 3));
    geometry.computeBoundingSphere();
    return pos;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta/10;
      ref.current.rotation.y -= delta/15;
    }
  });

  if (!mounted) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas; 