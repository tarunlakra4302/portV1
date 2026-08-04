"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// ─────────────────────────────────────────────
// Sub-component: Code Typing Effect
// ─────────────────────────────────────────────

const CODE_LINES = [
  {
    num: 1,
    segments: [
      { text: "const", color: "text-[#C26127]" },
      { text: " stack = ", color: "text-[#333]" },
      { text: '"JavaScript";', color: "text-[#C26127]" },
    ],
    highlight: false,
  },
  {
    num: 2,
    segments: [
      { text: "int", color: "text-[#C26127]" },
      { text: " projects = 12;", color: "text-[#333]" },
    ],
    highlight: false,
  },
  {
    num: 3,
    segments: [
      { text: "print", color: "text-[#C26127]" },
      { text: '("Build • Innovate")', color: "text-[#333]" },
    ],
    highlight: true,
  },
];

function CodeTypingEffect() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Flatten all characters with their colors for typing
  const allChars: { char: string; color: string; lineIdx: number }[] = [];
  CODE_LINES.forEach((line, lineIdx) => {
    if (lineIdx > 0) {
      allChars.push({ char: "\n", color: "", lineIdx });
    }
    line.segments.forEach((seg) => {
      for (const ch of seg.text) {
        allChars.push({ char: ch, color: seg.color, lineIdx });
      }
    });
  });

  const totalChars = allChars.length;

  // Typing effect
  useEffect(() => {
    if (visibleChars >= totalChars) return;
    const timeout = setTimeout(() => {
      setVisibleChars((v) => v + 1);
    }, 18);
    return () => clearTimeout(timeout);
  }, [visibleChars, totalChars]);

  // Blinking cursor after typing is done
  useEffect(() => {
    if (visibleChars < totalChars) {
      setCursorVisible(true);
      return;
    }
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, [visibleChars, totalChars]);

  // Build rendered lines from visible chars
  const renderedLines: { lineIdx: number; spans: { text: string; color: string }[] }[] = [];
  let currentLine = 0;
  let lineSpans: { text: string; color: string }[] = [];
  let currentColor = "";
  let currentText = "";

  for (let i = 0; i < visibleChars && i < allChars.length; i++) {
    const ch = allChars[i];
    if (ch.char === "\n") {
      if (currentText) lineSpans.push({ text: currentText, color: currentColor });
      renderedLines.push({ lineIdx: currentLine, spans: [...lineSpans] });
      lineSpans = [];
      currentText = "";
      currentColor = "";
      currentLine = ch.lineIdx;
      continue;
    }
    if (ch.color !== currentColor) {
      if (currentText) lineSpans.push({ text: currentText, color: currentColor });
      currentColor = ch.color;
      currentText = ch.char;
    } else {
      currentText += ch.char;
    }
  }
  if (currentText) lineSpans.push({ text: currentText, color: currentColor });
  renderedLines.push({ lineIdx: currentLine, spans: [...lineSpans] });

  // Find which line the cursor is on
  const cursorLineIdx = visibleChars < allChars.length ? allChars[Math.min(visibleChars, allChars.length - 1)].lineIdx : CODE_LINES.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed select-none"
    >
      {CODE_LINES.map((line, idx) => {
        const rendered = renderedLines.find((r) => r.lineIdx === idx);
        const isActive = cursorLineIdx === idx;
        const showCursor = cursorLineIdx === idx;

        return (
          <div
            key={idx}
            className={`flex items-center whitespace-pre py-[2px] px-1 rounded-sm ${
              isActive ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-gray-400 select-none w-4 text-right mr-2.5 text-[10px]">
              {line.num}
            </span>
            <span className="flex items-center">
              {rendered?.spans.map((s, sIdx) => (
                <span key={sIdx} className={s.color}>
                  {s.text}
                </span>
              ))}
              {showCursor && cursorVisible && (
                <span className="w-[7px] h-[14px] bg-[#C26127] inline-block ml-[1px]" />
              )}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Sub-component: Workflow Node Graph
// ─────────────────────────────────────────────

const WORKFLOW_NODES = [
  { id: "prompt", label: "prompt", icon: "✦", iconBg: "bg-[#C45A25]", iconText: "text-black" },
  { id: "plan", label: "plan", icon: "P", iconBg: "bg-gray-300", iconText: "text-white" },
  { id: "generate", label: "generate", icon: "G", iconBg: "bg-gray-300", iconText: "text-white" },
  { id: "ship", label: "ship", icon: "S", iconBg: "bg-gray-300", iconText: "text-white" },
];

// Alternating Top → Bottom → Top → Bottom positions
// Container is 420 x 100
const NODE_POSITIONS = [
  { x: 10, y: 6 },      // prompt — top-left
  { x: 110, y: 58 },    // plan — bottom mid-left
  { x: 220, y: 6 },     // generate — top mid-right
  { x: 320, y: 58 },    // ship — bottom-right
];

// Approximate node widths for connection-dot placement
const NODE_WIDTHS = [82, 68, 92, 64];
const NODE_HEIGHT = 30;

function WorkflowNodeGraph() {
  const [step, setStep] = useState(0);

  const runSequence = useCallback(async () => {
    for (let i = 0; i <= 12; i++) {
      await new Promise((r) => setTimeout(r, i === 0 ? 80 : 130));
      setStep(i);
    }
  }, []);

  useEffect(() => {
    runSequence();
  }, [runSequence]);

  // step mapping:
  // 0: node 0  |  1: check 0  |  2: line 0→1
  // 3: node 1  |  4: check 1  |  5: line 1→2
  // 6: node 2  |  7: check 2  |  8: line 2→3
  // 9: node 3  |  10: check 3  |  11: terminator line+dot
  // 12: done
  const nodeVisible = (i: number) => (i === 0 ? step >= 0 : step >= i * 3);
  const checkVisible = (i: number) => step >= i * 3 + 1;
  const lineDrawn = (i: number) => step >= i * 3 + 2;
  const endpointVisible = step >= 11;

  // Build SVG paths: right-dot of node i → left-dot of node i+1
  const paths = [];
  for (let i = 0; i < NODE_POSITIONS.length - 1; i++) {
    const from = NODE_POSITIONS[i];
    const to = NODE_POSITIONS[i + 1];
    const x1 = from.x + NODE_WIDTHS[i]; // right edge
    const y1 = from.y + NODE_HEIGHT / 2;
    const x2 = to.x;                    // left edge
    const y2 = to.y + NODE_HEIGHT / 2;
    paths.push({ x1, y1, x2, y2 });
  }

  // Terminator line: from right-dot of ship node to endpoint
  const shipRight = NODE_POSITIONS[3].x + NODE_WIDTHS[3];
  const shipMidY = NODE_POSITIONS[3].y + NODE_HEIGHT / 2;
  const endX = shipRight + 28;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative select-none"
      style={{ width: 420, height: 100 }}
    >
      {/* Watermark behind nodes */}
      <span
        className="absolute inset-0 flex items-center justify-center text-gray-100 font-normal tracking-tight pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: "46px", opacity: 0.5 }}
      >
        AI Workflows
      </span>

      {/* SVG Layer — connections */}
      <svg
        className="absolute inset-0 pointer-events-none z-[1]"
        width="420"
        height="100"
        viewBox="0 0 420 100"
        fill="none"
      >
        {/* Node-to-node bezier connectors */}
        {paths.map((p, i) => {
          const mx = (p.x1 + p.x2) / 2;
          const d = `M ${p.x1} ${p.y1} C ${mx} ${p.y1}, ${mx} ${p.y2}, ${p.x2} ${p.y2}`;
          return (
            <g key={i}>
              {/* Solid gray base line */}
              <motion.path
                d={d}
                stroke="#4B5563"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  lineDrawn(i)
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
              {/* Orange dashed overlay */}
              <motion.path
                d={d}
                stroke="#C45A25"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  lineDrawn(i)
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.35, ease: "easeInOut", delay: 0.05 }}
              />
            </g>
          );
        })}

        {/* Terminator connector: short straight line from ship → dot */}
        {endpointVisible && (
          <g>
            <motion.line
              x1={shipRight}
              y1={shipMidY}
              x2={endX}
              y2={shipMidY}
              stroke="#4B5563"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1={shipRight}
              y1={shipMidY}
              x2={endX}
              y2={shipMidY}
              stroke="#C45A25"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            />
          </g>
        )}
      </svg>

      {/* Node Layer */}
      {WORKFLOW_NODES.map((node, i) => {
        const pos = NODE_POSITIONS[i];
        return (
          <AnimatePresence key={node.id}>
            {nodeVisible(i) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute flex items-center gap-2 bg-white border border-gray-600 rounded-lg px-3 py-1.5 shadow-sm font-mono text-sm text-[#222] z-10"
                style={{ left: pos.x, top: pos.y }}
              >
                {/* Left connection dot (not on prompt) */}
                {i > 0 && (
                  <span className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-500 rounded-full" />
                )}
                {/* Right connection dot */}
                <span className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-500 rounded-full" />

                {/* Icon */}
                <span
                  className={`${node.iconBg} ${node.iconText} w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold leading-none flex-shrink-0`}
                >
                  {node.icon}
                </span>
                {/* Label */}
                <span className="font-semibold tracking-tight">{node.label}</span>

                {/* Checkmark badge */}
                <AnimatePresence>
                  {checkVisible(i) && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="absolute -top-[8px] -right-[8px] w-4 h-4 bg-[#C45A25] rounded-full flex items-center justify-center z-20 shadow-sm"
                    >
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5 L4 7.5 L8 3" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Terminator black dot */}
      <AnimatePresence>
        {endpointVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute w-3 h-3 bg-black rounded-full z-10"
            style={{
              left: endX - 5,
              top: shipMidY - 6,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function CodeAiWorkflowsSection() {
  const [codeHovered, setCodeHovered] = useState(false);
  const [workflowHovered, setWorkflowHovered] = useState(false);

  return (
    <section className="w-full bg-white pt-24 md:pt-36 pb-0 px-6 flex items-center justify-center font-sans relative z-30">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-start md:justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black flex flex-wrap items-center justify-start md:justify-center gap-x-3 md:gap-x-4 leading-tight text-left md:text-center">

          {/* ── "Code" ── */}
          <span
            className="relative cursor-pointer inline-block transition-transform duration-300 hover:scale-[1.02]"
            onMouseEnter={() => setCodeHovered(true)}
            onMouseLeave={() => setCodeHovered(false)}
          >
            {/* Smooth fading text anchor */}
            <span className={`inline-block transition-all duration-300 ease-out ${codeHovered ? "opacity-0 blur-xs" : "opacity-100 blur-none"}`}>
              Code
            </span>

            {/* Animated overlay — smooth scale & opacity entry */}
            <AnimatePresence>
              {codeHovered && (
                <motion.span
                  key="code-anim"
                  initial={{ opacity: 0, y: 3, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 3, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  <CodeTypingEffect />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          {/* ── "&" ── */}
          <span className="text-gray-400 font-extralight select-none">&amp;</span>

          {/* ── "AI Workflows." ── */}
          <span
            className="relative cursor-pointer inline-flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
            onMouseEnter={() => setWorkflowHovered(true)}
            onMouseLeave={() => setWorkflowHovered(false)}
          >
            {/* Smooth fading text anchor with persistent Lottie */}
            <span className="inline-flex items-center gap-3 align-middle">
              <span className={`transition-all duration-300 ease-out ${workflowHovered ? "opacity-0 blur-xs" : "opacity-100 blur-none"}`}>
                AI Workflows.
              </span>
              <span className="w-[2.8em] h-[2.8em] md:w-[2.2em] md:h-[2.2em] inline-flex items-center justify-center flex-shrink-0 self-center z-30 transition-transform duration-300 hover:scale-110">
                <DotLottieReact
                  src="https://lottie.host/24f554ea-7a66-4818-8895-211562876512/fzqFJ5WF4L.json"
                  loop
                  autoplay
                />
              </span>
            </span>

            {/* Animated overlay — smooth scale & opacity entry */}
            <AnimatePresence>
              {workflowHovered && (
                <motion.span
                  key="workflow-anim"
                  initial={{ opacity: 0, y: 3, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 3, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  <WorkflowNodeGraph />
                </motion.span>
              )}
            </AnimatePresence>
          </span>

        </h1>
      </div>
    </section>
  );
}
