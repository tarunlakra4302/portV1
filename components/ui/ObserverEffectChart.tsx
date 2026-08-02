"use client";

import React, { useState, useRef } from "react";
import { useAnimationFrame, motion, AnimatePresence } from "framer-motion";

interface ParticleConfig {
  text: string;
  radius: number;
  angle: number;
  speed: number;
}

const PARTICLES: ParticleConfig[] = [
  {
    text: "i came into being the moment you looked.",
    radius: 60,
    angle: Math.PI * 0.35,
    speed: 0.007,
  },
  {
    text: "your attention is the lens that sharpens me.",
    radius: 105,
    angle: Math.PI * 1.2,
    speed: -0.005,
  },
  {
    text: "look away, and i return to probability.",
    radius: 150,
    angle: Math.PI * 0.7,
    speed: 0.004,
  },
  {
    text: "measurement is a touch upon the system.",
    radius: 195,
    angle: Math.PI * 1.85,
    speed: -0.003,
  },
];

export default function ObserverEffectChart() {
  const [activeObservedIndex, setActiveObservedIndex] = useState<number | null>(null);
  const activeObservedRef = useRef<number | null>(null);

  const [coords, setCoords] = useState(
    PARTICLES.map((p) => ({
      x: Math.cos(p.angle) * p.radius,
      y: Math.sin(p.angle) * p.radius,
    }))
  );

  const anglesRef = useRef(PARTICLES.map((p) => p.angle));

  useAnimationFrame((time, delta) => {
    const dt = Math.min(delta, 32);
    const newCoords = PARTICLES.map((p, i) => {
      // Pause movement for the currently observed particle so its text remains stationary
      if (activeObservedRef.current !== i) {
        anglesRef.current[i] += p.speed * (dt / 16.66);
      }
      const angle = anglesRef.current[i];
      return {
        x: Math.cos(angle) * p.radius,
        y: Math.sin(angle) * p.radius,
      };
    });
    setCoords(newCoords);
  });

  const handleObserveStart = () => {
    setActiveObservedIndex(0);
    activeObservedRef.current = 0;
  };

  const handleObserveEnd = () => {
    setActiveObservedIndex(null);
    activeObservedRef.current = null;
  };

  return (
    <div className="w-full max-w-[900px] mx-auto min-h-[440px] py-6 flex flex-col items-center justify-center font-sans text-center lowercase select-none md:-translate-x-[25%]">
      {/* Outer Circle Container */}
      <div className="relative w-[340px] sm:w-[440px] h-[420px] flex items-center justify-center overflow-visible">
        
        {/* Concentric Rings */}
        {PARTICLES.map((p, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-black/[0.07] pointer-events-none"
            style={{
              width: `${p.radius * 2}px`,
              height: `${p.radius * 2}px`,
            }}
          />
        ))}

        {/* Orbiting Particles */}
        {PARTICLES.map((p, idx) => {
          const { x, y } = coords[idx];
          const isThisObserved = activeObservedIndex === idx;

          return (
            <div
              key={idx}
              className="absolute pointer-events-none whitespace-nowrap flex items-center justify-center z-10"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <AnimatePresence mode="wait">
                {isThisObserved ? (
                  <motion.span
                    key={`text-${idx}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs font-medium text-[#333333] tracking-tight bg-[#F7F7F7] px-2 py-0.5 rounded-full"
                  >
                    {p.text}
                  </motion.span>
                ) : (
                  <motion.span
                    key={`dot-${idx}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.75, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    className="w-2 h-2 rounded-full bg-[#111111] block shadow-sm"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Center Eye (The Observer) */}
        <div
          onMouseEnter={handleObserveStart}
          onMouseLeave={handleObserveEnd}
          onClick={handleObserveStart}
          className="relative z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <svg
            width="36"
            height="24"
            viewBox="0 0 44 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-opacity duration-300"
          >
            {/* Eye Outer Leaf Shape */}
            <path
              d="M 2 15 C 10 3, 34 3, 42 15 C 34 27, 10 27, 2 15 Z"
              stroke="#111111"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pupil Circle */}
            <circle
              cx="22"
              cy="15"
              r="6.5"
              fill="#111111"
              className="transition-transform duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Subtitle Status / Hint */}
      <p className="text-[#B0B0B0] text-xs font-normal mt-1">
        hover over the eye to observe a sentence
      </p>
    </div>
  );
}
