"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Choice = "trust" | "betray";

function buildBezierPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx1 = prev.x + (curr.x - prev.x) * 0.5;
    const cy1 = prev.y;
    const cx2 = prev.x + (curr.x - prev.x) * 0.5;
    const cy2 = curr.y;
    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function TrustGameChart() {
  const [history, setHistory] = useState<Choice[]>([]);

  const turn = history.length;

  const handleChoice = (choice: Choice) => {
    if (turn >= 5) return;
    setHistory((prev) => [...prev, choice]);
  };

  const handleReset = () => {
    setHistory([]);
  };

  // Scenario Detections
  const historyKey = history.join(",");
  const isScenarioA = history.length === 5 && history.every((c) => c === "trust");
  const isScenarioRecovery = historyKey === "betray,trust,trust,trust,trust";
  const isScenarioAlternating = historyKey === "trust,betray,trust,betray,trust";

  // Compute SVG path points based on Tit-for-Tat Y-axis physics
  const mePoints = [{ x: 60, y: 100 }];
  const youPoints = [{ x: 60, y: 200 }];

  for (let t = 0; t < history.length; t++) {
    const userChoice = history[t];
    const compChoice: Choice = t === 0 ? "trust" : history[t - 1];
    const i = t + 1;
    const x = 60 + i * 140;

    let yMe: number;
    let yYou: number;

    const currentSubKey = history.slice(0, t + 1).join(",");

    if (currentSubKey === "betray,trust,trust,trust,trust" || currentSubKey.startsWith("betray,trust")) {
      // Scenario 4: Betray, then All Trust (Recovery Sequence)
      if (i === 1) {
        yMe = 120; // Shallow dip
        yYou = 300; // Deep U-shape
      } else if (i === 2) {
        yMe = 30;  // Massive upward hump by computer (copycat betray)
        yYou = 180; // User shallow hump recovering upward
      } else if (i === 3) {
        yMe = 150; // Computer dives down to center
        yYou = 150; // User shallow hump to center -> Intersection!
      } else if (i === 4) {
        yMe = 100;
        yYou = 200; // Resumed sine braid
      } else {
        yMe = 200;
        yYou = 100; // Resumed sine braid
      }
    } else if (currentSubKey.startsWith("trust,betray,trust")) {
      // Scenario 5: Alternating Sequence (Trust, Betray, Trust, Betray, Trust)
      if (i === 1) {
        yMe = 200; // Perfect weave crossover
        yYou = 100;
      } else if (i === 2) {
        yMe = 120; // Computer shallow dip down
        yYou = 300; // User deep U-shape dive down
      } else if (i === 3) {
        yMe = 120; // Computer shallow dip down
        yYou = 180; // User shallow hump up (close, no cross)
      } else if (i === 4) {
        yMe = 30;  // Computer massive upward peak
        yYou = 300; // User deep U-shape dive down
      } else {
        yMe = 120; // Computer shallow dip down
        yYou = 180; // User shallow hump up
      }
    } else {
      const hasHadBetrayal = history.slice(0, t + 1).includes("betray");

      if (!hasHadBetrayal && userChoice === "trust" && compChoice === "trust") {
        // Scenario 1: All Trust (The Braid)
        if (i % 2 === 1) {
          yMe = 200;
          yYou = 100;
        } else {
          yMe = 100;
          yYou = 200;
        }
      } else {
        // Scenario 2 & 3: Divergence / Immediate Betrayal
        if (compChoice === "trust" && userChoice === "betray") {
          yMe = 120; // Shallow dip
          yYou = 300; // Deep U-shape
        } else if (compChoice === "betray" && userChoice === "trust") {
          yMe = 30;  // High peak
          yYou = 180; // Shallow hump
        } else {
          // Both Betray
          if (i % 2 === 1) {
            yMe = 30;
            yYou = 300;
          } else {
            yMe = 50;
            yYou = 280;
          }
        }
      }
    }

    mePoints.push({ x, y: yMe });
    youPoints.push({ x, y: yYou });
  }

  const mePathD = buildBezierPath(mePoints);
  const youPathD = buildBezierPath(youPoints);

  const lastMe = mePoints[mePoints.length - 1];
  const lastYou = youPoints[youPoints.length - 1];

  // Outcome text resolution
  let endText = "i did what you did. what remains is not a braid — just two lonely lines, side by side.";
  if (isScenarioA) {
    endText = "five hands of trust. two lines braided into each other — this is what trust looks like.";
  } else if (isScenarioRecovery || isScenarioAlternating) {
    endText = "it broke here and there, yet it wove. what matters is not never breaking, but coming back.";
  }

  return (
    <div className="w-full max-w-[900px] mx-auto py-12 flex flex-col items-center justify-center font-sans text-center lowercase select-none space-y-6 md:-translate-x-[25%]">
      {/* SVG Canvas Area (800x400) */}
      <div className="relative w-full max-w-[800px] h-[360px] sm:h-[400px] flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full overflow-visible">
          {/* Static Labels */}
          <text x="15" y="104" fill="#A3A3A3" className="text-[12px] font-mono select-none">
            [me]
          </text>
          <text x="15" y="204" fill="#111111" className="text-[12px] font-mono select-none font-medium">
            [you]
          </text>

          {/* Computer Line [me] with Framer Motion path animation */}
          <motion.path
            d={mePathD}
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ d: mePathD }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Computer Line Leading Head Dot */}
          <motion.circle
            cx={lastMe.x}
            cy={lastMe.y}
            r="4"
            fill="#A3A3A3"
            initial={false}
            animate={{ cx: lastMe.x, cy: lastMe.y }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.circle
            cx={lastMe.x}
            cy={lastMe.y}
            r="8"
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="1"
            initial={false}
            animate={{
              cx: lastMe.x,
              cy: lastMe.y,
              scale: [1, 1.4, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              cx: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              cy: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              scale: { repeat: Infinity, duration: 1.8 },
              opacity: { repeat: Infinity, duration: 1.8 },
            }}
          />

          {/* User Line [you] with Framer Motion path animation */}
          <motion.path
            d={youPathD}
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ d: youPathD }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* User Line Leading Head Dot */}
          <motion.circle
            cx={lastYou.x}
            cy={lastYou.y}
            r="4.5"
            fill="#111111"
            initial={false}
            animate={{ cx: lastYou.x, cy: lastYou.y }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.circle
            cx={lastYou.x}
            cy={lastYou.y}
            r="9"
            fill="none"
            stroke="#111111"
            strokeWidth="1"
            initial={false}
            animate={{
              cx: lastYou.x,
              cy: lastYou.y,
              scale: [1, 1.5, 1],
              opacity: [0.7, 0.1, 0.7],
            }}
            transition={{
              cx: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              cy: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              scale: { repeat: Infinity, duration: 1.8, delay: 0.2 },
              opacity: { repeat: Infinity, duration: 1.8, delay: 0.2 },
            }}
          />
        </svg>
      </div>

      {/* Controls & Subtext */}
      <div className="flex flex-col items-center gap-4 min-h-[100px] max-w-[600px] px-4">
        {turn < 5 ? (
          <>
            <div className="flex items-center gap-8 text-sm">
              <button
                type="button"
                onClick={() => handleChoice("trust")}
                className="text-[#737373] hover:text-[#111111] transition-colors cursor-pointer font-medium bg-transparent border-0"
              >
                • trust
              </button>
              <button
                type="button"
                onClick={() => handleChoice("betray")}
                className="text-[#737373] hover:text-[#111111] transition-colors cursor-pointer font-medium bg-transparent border-0"
              >
                • betray
              </button>
            </div>
            <p className="text-xs text-[#A3A3A3]">
              trust or betray — both lines are drawn at once
            </p>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="end-container"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <p className="text-sm font-medium text-[#333333] leading-relaxed">
                {endText}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="text-[#111111] text-sm font-medium hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-0 mt-1"
              >
                • start over
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
