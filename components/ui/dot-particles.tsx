"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  angle: number;
  speed: number;
  angleChangeSpeed: number;
}

interface DotParticleCanvasProps {
  backgroundColor?: string;
  particleColor?: string;
  text?: string;
}

export default function DotParticleCanvas({
  backgroundColor = "transparent",
  particleColor = "#111111",
  text = "[ t a r u n ]",
}: DotParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const isApplyingRef = useRef<boolean>(false);
  const timeRef = useRef<number>(0);
  const [isApplying, setIsApplying] = useState(false);

  // Creates target coordinates matching text drawn on an offscreen canvas
  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // High DPI scaling for crisp display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    // Offscreen canvas for text rasterization
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    // Draw monospace text
    const fontSize = Math.min(width / 9, 70);
    octx.fillStyle = "white";
    octx.fillRect(0, 0, width, height);
    octx.fillStyle = "black";
    octx.font = `bold ${fontSize}px monospace`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(text, width / 2, height / 2 - 80);

    const imageData = octx.getImageData(0, 0, width, height).data;
    const newParticles: Particle[] = [];

    // Dense pixel sampling (gap = 4 for high particle density)
    const gap = 4;
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        if (imageData[index] < 128) {
          const existing = particles.current[newParticles.length];

          newParticles.push({
            x: existing ? existing.x : Math.random() * width,
            y: existing ? existing.y : Math.random() * height,
            targetX: x,
            targetY: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            baseX: x,
            baseY: y,
            angle: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 1.4,
            angleChangeSpeed: (Math.random() - 0.5) * 0.08,
          });
        }
      }
    }

    // STRICT 1:1 MAPPING: Particle count matches target text pixels exactly
    particles.current = newParticles;
  }, [text]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Clear canvas frame cleanly (Transparent)
    ctx.clearRect(0, 0, width, height);
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    timeRef.current += 0.05;
    const isApplyingEnergy = isApplyingRef.current;

    // Draw energy ripple concentric rings when held
    if (isApplyingEnergy) {
      const centerX = width / 2;
      const centerY = height / 2 + 60;

      for (let i = 0; i < 3; i++) {
        const ringTime = (timeRef.current + i * 2) % 6;
        const radius = ringTime * 32;
        const opacity = Math.max(0, 0.4 - ringTime * 0.06);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(17, 17, 17, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Update and draw particles with independent 360-degree Brownian motion
    particles.current.forEach((p) => {
      if (isApplyingEnergy) {
        // Rapid spring convergence to target text coordinates
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx = p.vx * 0.8 + dx * 0.1;
        p.vy = p.vy * 0.8 + dy * 0.1;
      } else {
        // Independent multi-directional 360° scattering motion
        p.angle += p.angleChangeSpeed;

        p.vx = p.vx * 0.92 + Math.cos(p.angle) * p.speed * 0.08;
        p.vy = p.vy * 0.92 + Math.sin(p.angle) * p.speed * 0.08;

        // Reflective boundary bounce in any direction
        if (p.x < 0) { p.x = 0; p.angle = Math.PI - p.angle; p.vx = Math.abs(p.vx); }
        if (p.x > width) { p.x = width; p.angle = Math.PI - p.angle; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.angle = -p.angle; p.vy = Math.abs(p.vy); }
        if (p.y > height) { p.y = height; p.angle = -p.angle; p.vy = -Math.abs(p.vy); }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Draw particle circle
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      const size = isApplyingEnergy ? 2.2 : 1.5;
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestIdRef.current = requestAnimationFrame(animate);
  }, [backgroundColor, particleColor]);

  useEffect(() => {
    createParticles();
    window.addEventListener("resize", createParticles);

    if (!requestIdRef.current) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", createParticles);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = null;
      }
    };
  }, [createParticles, animate]);

  const handlePointerDown = () => {
    isApplyingRef.current = true;
    setIsApplying(true);
  };

  const handlePointerUp = () => {
    isApplyingRef.current = false;
    setIsApplying(false);
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto md:-translate-x-[25%] h-[500px] md:h-[600px] overflow-hidden bg-transparent my-8 select-none">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Interactive UI Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Spacer pushing button below text area */}
        <div className="h-[140px]" />

        <motion.div className="relative pointer-events-auto mt-8">
          <motion.button
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-colors bg-[#111111] rounded-md shadow-lg select-none hover:bg-black cursor-pointer"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            apply energy
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
