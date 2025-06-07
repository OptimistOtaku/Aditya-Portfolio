import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export default function Avatar() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#b026ff"
          metalness={0.8}
          roughness={0.2}
          emissive="#b026ff"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.2, 16, 16]} position={[0.3, 0.3, 0.8]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[-0.3, 0.3, 0.8]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </Sphere>

      {/* Body */}
      <Sphere args={[1.2, 32, 32]} position={[0, -2, 0]}>
        <meshStandardMaterial
          color="#4d4dff"
          metalness={0.8}
          roughness={0.2}
          emissive="#4d4dff"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
} 