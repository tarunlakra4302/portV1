"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BAR_HEIGHTS_POWER_LAW = [
  350, 200, 120, 80, 40, 35, 30, 25, 20, 18, 16, 15, 14, 13, 12, 11, 10, 10, 10, 10, 10, 10
];

const EVEN_HEIGHT = 40;

export default function ParetoChart() {
  const [isPowerLaw, setIsPowerLaw] = useState(false);

  const toggleState = () => {
    setIsPowerLaw((prev) => !prev);
  };

  return (
    <div
      onClick={toggleState}
      className="w-full cursor-pointer select-none flex flex-col items-center justify-center mt-2 mb-6 pt-1 pb-6 text-center mx-auto transition-all duration-300 md:-translate-x-[25%]"
    >
      {/* Chart Wrapper Container */}
      <div className="relative flex flex-col items-center justify-end w-full max-w-[700px] h-[390px] mb-8 overflow-hidden pt-4">
        
        {/* Horizontal Dashed Line - 40px above baseline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPowerLaw ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full border-t-2 border-dashed border-[#737373] pointer-events-none z-0"
          style={{ bottom: `${EVEN_HEIGHT}px` }}
        />

        {/* Vertical Bars Container */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3 z-10 pb-0.5">
          {BAR_HEIGHTS_POWER_LAW.map((powerHeight, index) => {
            const isVitalFew = index < 4;
            const targetHeight = isPowerLaw ? powerHeight : EVEN_HEIGHT;
            const targetColor = isPowerLaw
              ? isVitalFew
                ? "#111111"
                : "#D4D4D4"
              : "#9E9E9E";

            return (
              <motion.div
                key={index}
                initial={{ height: EVEN_HEIGHT, backgroundColor: "#9E9E9E" }}
                animate={{
                  height: targetHeight,
                  backgroundColor: targetColor,
                }}
                transition={{
                  height: { type: "spring", stiffness: 100, damping: 20 },
                  backgroundColor: { duration: 0.3, ease: "easeInOut" },
                }}
                className="w-2 sm:w-3 md:w-3.5 rounded-full flex-shrink-0"
              />
            );
          })}
        </div>

        {/* Baseline: 2px thick solid line, color #D4D4D4, slightly wider than total width */}
        <div className="w-[calc(100%+16px)] max-w-[720px] h-[2px] bg-[#D4D4D4] rounded-full z-10" />
      </div>

      {/* Text & Labels Section */}
      <div className="flex flex-col items-center text-center w-full max-w-[700px] space-y-3">
        {/* Main Text Swap with AnimatePresence */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isPowerLaw ? (
              <motion.p
                key="even-text"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[#333333] text-base sm:text-lg font-medium tracking-tight"
              >
                we expect the world to share evenly.
              </motion.p>
            ) : (
              <motion.p
                key="power-text"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[#333333] text-base sm:text-lg font-medium tracking-tight"
              >
                but the few hold almost everything.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Side Labels in State 2 */}
        <div className="w-full flex items-center justify-between min-h-[20px] px-2 sm:px-4">
          <AnimatePresence>
            {isPowerLaw && (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#B0B0B0] text-xs font-normal"
                >
                  the vital few
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#B0B0B0] text-xs font-normal"
                >
                  the trivial many
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Sub-text */}
        <p className="text-[#B0B0B0] text-xs sm:text-sm font-normal">
          tap to see how value really pools
        </p>
      </div>
    </div>
  );
}
