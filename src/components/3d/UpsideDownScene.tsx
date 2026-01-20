import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 3000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff1744"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingSpores({ count = 500 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff69b4"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function Portal() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <torusGeometry args={[3, 0.5, 16, 100]} />
      <meshStandardMaterial
        color="#ff1744"
        emissive="#ff1744"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

interface UpsideDownSceneProps {
  intensity?: number;
}

export function UpsideDownScene({ intensity = 1 }: UpsideDownSceneProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff1744" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff69b4" />
        <fog attach="fog" args={['#0a0a0a', 10, 50]} />
        
        <Particles count={Math.floor(3000 * intensity)} />
        <FloatingSpores count={Math.floor(500 * intensity)} />
        <Portal />
      </Canvas>
    </div>
  );
}
