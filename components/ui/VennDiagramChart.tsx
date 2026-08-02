"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StateType = "rational" | "human" | "emotional";

export default function VennDiagramChart() {
  const [activeState, setActiveState] = useState<StateType>("rational");

  return (
    <div className="w-full max-w-[900px] mx-auto min-h-[60vh] sm:min-h-[70vh] py-12 flex flex-col items-center justify-center font-sans text-center lowercase select-none space-y-8 md:-translate-x-[25%]">
      {/* 1. SVG Venn Diagram */}
      <div className="relative w-[320px] sm:w-[380px] h-[240px] flex items-center justify-center">
        <svg
          viewBox="0 0 360 240"
          className="w-full h-full overflow-visible"
        >
          {/* Left Circle (Rational) */}
          <motion.circle
            cx={140}
            cy={120}
            r={90}
            animate={{
              stroke: activeState === "rational" ? "#111111" : "#D4D4D4",
              strokeWidth: activeState === "rational" ? 2 : 1,
              fill: activeState === "rational" ? "rgba(0, 0, 0, 0.05)" : "transparent",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActiveState("rational")}
            className="cursor-pointer"
          />

          {/* Right Circle (Emotional) */}
          <motion.circle
            cx={220}
            cy={120}
            r={90}
            animate={{
              stroke: activeState === "emotional" ? "#111111" : "#D4D4D4",
              strokeWidth: activeState === "emotional" ? 2 : 1,
              fill: activeState === "emotional" ? "rgba(0, 0, 0, 0.05)" : "transparent",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActiveState("emotional")}
            className="cursor-pointer"
          />

          {/* Intersection Lens Shape (Human) */}
          <motion.path
            d="M 180 39.38 A 90 90 0 0 1 180 200.62 A 90 90 0 0 1 180 39.38 Z"
            animate={{
              fill: activeState === "human" ? "#111111" : "transparent",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveState("human");
            }}
            className="cursor-pointer"
          />
        </svg>
      </div>

      {/* 2. Navigation Menu */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-sans">
        <button
          type="button"
          onClick={() => setActiveState("rational")}
          className={`transition-colors duration-200 ${
            activeState === "rational"
              ? "text-[#111111] font-medium"
              : "text-[#A3A3A3] hover:text-[#555555] font-normal cursor-pointer"
          }`}
        >
          the rational side
        </button>

        <span className="text-[#D4D4D4]">|</span>

        <button
          type="button"
          onClick={() => setActiveState("human")}
          className={`transition-colors duration-200 ${
            activeState === "human"
              ? "text-[#111111] font-medium"
              : "text-[#A3A3A3] hover:text-[#555555] font-normal cursor-pointer"
          }`}
        >
          human
        </button>

        <span className="text-[#D4D4D4]">|</span>

        <button
          type="button"
          onClick={() => setActiveState("emotional")}
          className={`transition-colors duration-200 ${
            activeState === "emotional"
              ? "text-[#111111] font-medium"
              : "text-[#A3A3A3] hover:text-[#555555] font-normal cursor-pointer"
          }`}
        >
          the emotional side
        </button>
      </div>

      {/* 3. Dynamic Content Body */}
      <div className="w-full max-w-[600px] min-h-[90px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {activeState === "rational" && (
            <motion.p
              key="rational-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[#737373] text-base leading-relaxed text-center"
            >
              this side is my order. plans, boundaries, work i can't leave unfinished. a thing is either right or wrong; the in-between tires me. no ornament here. data in, decision out.
            </motion.p>
          )}

          {activeState === "human" && (
            <motion.p
              key="human-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[#111111] text-xl sm:text-2xl font-medium leading-snug text-center tracking-tight"
            >
              not pure logic, not pure feeling. human is where the two collide.
            </motion.p>
          )}

          {activeState === "emotional" && (
            <motion.p
              key="emotional-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-[#737373] text-base leading-relaxed text-center"
            >
              this side is my chaos. the silence of balıkesir, the anger of lost games, morning runs without a reason. it won't follow a plan, it won't fit a measure. but everything that makes me, me, lives here.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Footer Note */}
      <p className="text-[#B0B0B0] text-xs font-normal pt-2">
        click a side — and where they meet
      </p>
    </div>
  );
}
