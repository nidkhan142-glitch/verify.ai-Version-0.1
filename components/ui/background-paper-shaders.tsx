"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Custom shader material with mouse-responsive displacement and bioluminescent glow
const vertexShader = `
  uniform float time;
  uniform float intensity;
  uniform vec2 mouse;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Mouse interaction - subtle ripple that follows the cursor
    float dist = distance(uv, mouse);
    float ripple = smoothstep(0.4, 0.0, dist);
    pos.z += ripple * 1.5 * intensity;

    // Wavy displacement to feel like "Deep Sea"
    pos.z += sin(pos.x * 2.5 + time) * 0.4 * intensity;
    pos.z += cos(pos.y * 2.0 + time * 0.8) * 0.4 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1; // Primary Base (#020617)
  uniform vec3 color2; // Primary Glow (#10b981)
  uniform vec3 color3; // Secondary Glow (#064e3b)
  uniform vec3 color4; // Highlight (#34d399)
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Complex organic movement
    float n1 = sin(uv.x * 10.0 + time * 0.4) * cos(uv.y * 8.0 + time * 0.3);
    float n2 = sin(uv.x * 20.0 - time * 0.7) * cos(uv.y * 15.0 + time * 0.5) * 0.5;
    float combinedNoise = n1 + n2;
    
    // Layer 1: Base to Deep Forest
    vec3 color = mix(color1, color3, clamp(combinedNoise * 0.5 + 0.5, 0.0, 1.0));
    
    // Layer 2: Main Emerald Glow
    float glow1 = smoothstep(-0.2, 0.8, n1);
    color = mix(color, color2, glow1 * 0.4 * intensity);
    
    // Layer 3: Minty Biological Highlights (Sharp spots)
    float highlightMask = pow(clamp(n2 * 2.0, 0.0, 1.0), 3.0);
    color = mix(color, color4.rgb, highlightMask * 0.6 * intensity);
    
    // Vignette for depth
    float dist = length(uv - 0.5);
    float vignette = 1.0 - smoothstep(0.4, 0.8, dist);
    
    gl_FragColor = vec4(color * (0.9 + 0.1 * vignette), 1.0);
  }
`

export function ShaderPlane({
    position,
    color1 = "#020617", // Primary Base
    color2 = "#10b981", // Primary Glow
    color3 = "#064e3b", // Secondary Glow
    color4 = "#34d399", // Highlight
}: {
    position: [number, number, number]
    color1?: string
    color2?: string
    color3?: string
    color4?: string
}) {
    const mesh = useRef<THREE.Mesh>(null)

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            intensity: { value: 1.0 },
            mouse: { value: new THREE.Vector2(0.5, 0.5) },
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
            color3: { value: new THREE.Color(color3) },
            color4: { value: new THREE.Color(color4) },
        }),
        [color1, color2, color3, color4],
    )

    useFrame((state) => {
        if (mesh.current) {
            uniforms.time.value = state.clock.elapsedTime * 0.5
            uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 1.2) * 0.3

            // Map mouse coordinates from [-1, 1] to [0, 1] for shader UVs
            uniforms.mouse.value.x = THREE.MathUtils.lerp(uniforms.mouse.value.x, (state.mouse.x + 1) / 2, 0.05)
            uniforms.mouse.value.y = THREE.MathUtils.lerp(uniforms.mouse.value.y, (state.mouse.y + 1) / 2, 0.05)
        }
    })

    return (
        <mesh ref={mesh} position={position} rotation={[-0.1, 0, 0]}>
            <planeGeometry args={[40, 40, 128, 128]} />
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
            if (mesh.current.material instanceof THREE.MeshBasicMaterial) {
                mesh.current.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1
            }
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <ringGeometry args={[radius * 0.95, radius, 64]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
    )
}
