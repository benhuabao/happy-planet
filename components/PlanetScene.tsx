import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedPlanet = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#FFD93D"
                    speed={2}
                    distort={0.3}
                    radius={1}
                />
            </Sphere>
        </Float>
    );
};

const FloatingStar = ({ position, color }: { position: [number, number, number], color: string }) => {
    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
            <mesh position={position}>
                <octahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
        </Float>
    );
};

export const PlanetScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <AnimatedPlanet />

                <FloatingStar position={[-3, 2, -2]} color="#6EB3F7" />
                <FloatingStar position={[3, -1, -1]} color="#FF87B2" />
                <FloatingStar position={[-2, -2, 1]} color="#A8E6CF" />
                <FloatingStar position={[2, 2, 0]} color="#FF9F45" />
            </Canvas>
        </div>
    );
};
