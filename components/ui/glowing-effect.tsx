"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn, throttle } from "../../lib/utils"

interface GlowingCardProps {
    children: React.ReactNode
    className?: string
    variant?: "default" | "cyan" | "emerald"
    borderWidth?: number
    glowIntensity?: number
}

export function GlowingCard({
    children,
    className,
    variant = "default",
    borderWidth = 1,
    glowIntensity = 1,
}: GlowingCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)
        const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }, [])

    const updatePosition = useCallback((clientX: number, clientY: number) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
            x: clientX - rect.left,
            y: clientY - rect.top,
        })
    }, [])

    const throttledUpdate = useCallback(
        throttle((clientX: number, clientY: number) => {
            updatePosition(clientX, clientY)
        }, 16),
        [updatePosition]
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        throttledUpdate(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0]
        throttledUpdate(touch.clientX, touch.clientY)
    }

    // Handle center glow for keyboard focus
    useEffect(() => {
        if (isFocused && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            setMousePosition({ x: rect.width / 2, y: rect.height / 2 })
        }
    }, [isFocused])

    const getGradientColors = () => {
        if (variant === "cyan") {
            return { primary: "#06b6d4", secondary: "#14b8a6", accent: "#10b981" }
        }
        if (variant === "emerald") {
            return { primary: "#10b981", secondary: "#06b6d4", accent: "#14b8a6" }
        }
        return { primary: "#10b981", secondary: "#14b8a6", accent: "#06b6d4" }
    }
    const colors = getGradientColors()

    const isActive = isHovered || isFocused

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
            className={cn(
                "relative rounded-2xl bg-slate-900/40 overflow-hidden border transition-all duration-500",
                isActive ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-slate-800",
                "will-change-transform", // Hint GPU
                className
            )}
            style={{
                borderWidth,
            }}
        >
            {/* Background Glow */}
            {!prefersReducedMotion && (
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.primary}15, transparent 40%)`,
                        opacity: isActive ? 1 : 0,
                    }}
                />
            )}

            {/* Content Ripple Border */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
                style={{
                    background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.primary}40, transparent 100%)`,
                    opacity: isActive ? glowIntensity : 0,
                    maskImage: "linear-gradient(white, white), linear-gradient(white, white)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "destination-out",
                    padding: borderWidth,
                }}
            />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    )
}


export function GlowingBorder({
    children,
    className,
    variant = "default",
}: {
    children: React.ReactNode
    className?: string
    variant?: "default" | "cyan"
}) {
    const colors = variant === "cyan"
        ? "from-cyan-500/50 via-teal-500/50 to-emerald-500/50"
        : "from-emerald-500/50 via-teal-500/50 to-cyan-500/50"

    return (
        <div className={cn("relative group", className)}>
            <div className={cn(
                "absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt",
                colors
            )} />
            <div className="relative bg-slate-900 rounded-2xl">
                {children}
            </div>
        </div>
    )
}
