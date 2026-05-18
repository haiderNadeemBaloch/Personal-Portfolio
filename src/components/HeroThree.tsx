'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo, useEffect, memo, useState } from 'react';
import * as THREE from 'three';

interface HeroThreeProps {
  intensity?: number;
  colorTokens?: {
    primary: string;
    accent: string;
  };
  enableInteraction?: boolean;
}

interface FloatingShapeProps {
  position: [number, number, number];
  shape: 'sphere' | 'roundedBox';
  color: string;
  accentColor: string;
  intensity: number;
  enableInteraction: boolean;
}

const FloatingShape = memo(function FloatingShape({
  position,
  shape,
  color,
  accentColor,
  intensity,
  enableInteraction,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Create geometry with low detail for performance
  const geometry = useMemo(() => {
    if (shape === 'sphere') {
      return new THREE.SphereGeometry(0.8, 12, 8); // Low detail sphere
    } else {
      // Rounded box using BoxGeometry (low detail)
      return new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    }
  }, [shape]);

  // Material color based on hover state
  const materialColor = hovered ? accentColor : color;

  // Pointer parallax effect
  useEffect(() => {
    if (!enableInteraction || !meshRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableInteraction]);

  // Animation frame with performance optimization
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const speed = (intensity ?? 1) * 0.5;

    // Gentle rotation
    meshRef.current.rotation.x = time * speed * 0.2;
    meshRef.current.rotation.y = time * speed * 0.3;

    // Floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(time * speed + position[0]) * 0.3;

    // Pointer parallax
    if (enableInteraction) {
      const intensityValue = intensity ?? 1;
      meshRef.current.position.x =
        position[0] + mouseRef.current.x * 0.2 * intensityValue;
      meshRef.current.position.z =
        position[2] + mouseRef.current.y * 0.2 * intensityValue;
    }
  });

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      onPointerOver={enableInteraction ? () => setHovered(true) : undefined}
      onPointerOut={enableInteraction ? () => setHovered(false) : undefined}
      scale={hovered && enableInteraction ? 1.2 : 1}
    >
      <meshStandardMaterial
        color={materialColor}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
});

FloatingShape.displayName = 'FloatingShape';

function SceneContent({
  intensity,
  colorTokens,
  enableInteraction,
}: HeroThreeProps) {
  const shapes: Array<{
    position: [number, number, number];
    shape: 'sphere' | 'roundedBox';
  }> = useMemo(
    () => [
      { position: [-4, 2, -2], shape: 'sphere' },
      { position: [4, -2, -2], shape: 'roundedBox' },
      { position: [0, 3, -4], shape: 'sphere' },
      { position: [-3, -3, -3], shape: 'roundedBox' },
      { position: [3, 1, -5], shape: 'sphere' },
    ],
    []
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5 * (intensity ?? 1)} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1 * (intensity ?? 1)}
      />
      <pointLight
        position={[-10, -10, -5]}
        intensity={0.5 * (intensity ?? 1)}
      />
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.position}
          shape={shape.shape}
          color={colorTokens?.primary ?? '#003366'}
          accentColor={colorTokens?.accent ?? '#FFD700'}
          intensity={intensity ?? 1}
          enableInteraction={enableInteraction ?? true}
        />
      ))}
    </>
  );
}

function HeroThree({
  intensity = 1,
  colorTokens = { primary: '#003366', accent: '#FFD700' },
  enableInteraction = true,
}: HeroThreeProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]} // Limit pixel ratio for performance
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <SceneContent
        intensity={intensity}
        colorTokens={colorTokens}
        enableInteraction={enableInteraction}
      />
    </Canvas>
  );
}

// Export as default for lazy loading
export default HeroThree;
// Named export for direct imports
export { HeroThree };

// SVG Fallback for reduced motion
export function HeroThreeFallback({
  colorTokens = { primary: '#003366', accent: '#FFD700' },
}: {
  colorTokens?: { primary: string; accent: string };
}) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorTokens.primary} stopOpacity="0.1" />
          <stop
            offset="100%"
            stopColor={colorTokens.accent}
            stopOpacity="0.1"
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
      <circle
        cx="150"
        cy="150"
        r="60"
        fill={colorTokens.primary}
        opacity="0.2"
      />
      <rect
        x="600"
        y="400"
        width="80"
        height="80"
        rx="10"
        fill={colorTokens.accent}
        opacity="0.2"
      />
      <circle
        cx="400"
        cy="200"
        r="50"
        fill={colorTokens.primary}
        opacity="0.15"
      />
    </svg>
  );
}
