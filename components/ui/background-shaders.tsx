"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Custom shader material for advanced bioluminescent effects
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1; // Deep Navy
  uniform vec3 color2; // Emerald
  uniform vec3 color3; // Cyan/Teal
  varying vec2 vUv;
  
  // Modulo 289 without a semicolon (for compatibility)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0 * vec3(x0.x, x12.xz) + h * vec3(x0.y, x12.yw);
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Slow, organic movement
    float n1 = snoise(uv * 1.5 + time * 0.05);
    float n2 = snoise(uv * 2.5 - time * 0.08);
    float n3 = snoise(uv * 4.0 + time * 0.1);
    
    float combinedNoise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Base color (Deep Navy)
    vec3 finalColor = color1;
    
    // Layer in the emerald bioluminescence
    float glow1 = smoothstep(0.1, 0.8, n1 * 0.5 + 0.5);
    finalColor = mix(finalColor, color2, glow1 * 0.3);
    
    // Layer in the sharper cyan sparkles
    float glow2 = smoothstep(0.4, 0.9, n2 * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, glow2 * 0.4);
    
    // Add pulsing overall intensity
    float pulse = sin(time * 0.5) * 0.1 + 0.9;
    finalColor *= pulse;
    
    // Subtle vignette to focus center
    float dist = length(uv - 0.5);
    float vignette = 1.0 - smoothstep(0.3, 1.0, dist);
    finalColor += color2 * vignette * 0.1;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function ShaderPlane({
    position,
    color1 = "#020617",
    color2 = "#10b981",
    color3 = "#14b8a6",
}: {
    position: [number, number, number]
    color1?: string
    color2?: string
    color3?: string
}) {
    const mesh = useRef<THREE.Mesh>(null)

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
            color3: { value: new THREE.Color(color3) },
        }),
        [color1, color2, color3],
    )

    useFrame((state) => {
        if (mesh.current) {
            uniforms.time.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <planeGeometry args={[25, 25, 32, 32]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

export function EnergyRing({
    radius = 1,
    position = [0, 0, 0],
}: {
    radius?: number
    position?: [number, number, number]
}) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.z = state.clock.elapsedTime * 0.5
            const material = mesh.current.material as THREE.MeshBasicMaterial
            material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <ringGeometry args={[radius * 0.8, radius, 64]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
    )
}
