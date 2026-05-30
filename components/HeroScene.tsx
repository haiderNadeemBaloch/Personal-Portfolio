'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/providers/ThemeProvider';

function FloatingShape({
  position,
  shape,
  defaultColor,
  hoverColor,
}: {
  position: [number, number, number];
  shape: 'box' | 'tetrahedron' | 'octahedron';
  defaultColor: string;
  hoverColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y =
      position[1] + Math.sin(time + position[0]) * 0.3;
  });

  const geometry = (() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  })();

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <meshStandardMaterial
        color={hovered ? hoverColor : defaultColor}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

function SceneContent() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const defaultColor = isDark ? '#3387BF' : '#003366';
  const hoverColor = isDark ? '#FFCF33' : '#FFD700';

  const shapes: Array<{
    position: [number, number, number];
    shape: 'box' | 'tetrahedron' | 'octahedron';
  }> = [
    { position: [-4, 2, -2], shape: 'box' },
    { position: [4, -2, -2], shape: 'tetrahedron' },
    { position: [0, 3, -4], shape: 'octahedron' },
    { position: [-3, -3, -3], shape: 'box' },
    { position: [3, 1, -5], shape: 'tetrahedron' },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.position}
          shape={shape.shape}
          defaultColor={defaultColor}
          hoverColor={hoverColor}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}
