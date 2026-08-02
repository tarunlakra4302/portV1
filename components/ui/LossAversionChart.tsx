"use client";

import React, { useState, useEffect, useRef } from "react";

interface DropEvent {
  startX: number;
  oldY: number;
  newY: number;
}

interface GainEvent {
  startX: number;
  baselineY: number;
}

interface SnakeEvent {
  startX: number;
  baselineY: number;
}

export default function LossAversionChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gainCount, setGainCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  // Animation State References (Mutated smoothly inside requestAnimationFrame)
  const animRef = useRef({
    worldX: 0,
    currentBaselineY: 200,
    initialBaselineY: 200,
    maxBaselineY: 410,
    speed: 1.8,
    drops: [] as DropEvent[],
    gains: [] as GainEvent[],
    snakes: [] as SnakeEvent[],
    pathHistory: [] as { x: number; y: number }[],
    animatingGain: null as GainEvent | null,
    animatingLoss: null as DropEvent | null,
    animatingSnake: null as SnakeEvent | null,
  });

  const handleGain = () => {
    const state = animRef.current;
    state.gains.push({
      startX: state.worldX,
      baselineY: state.currentBaselineY,
    });
    setGainCount((prev) => prev + 1);
  };

  const handleLoss = () => {
    const state = animRef.current;
    const dropDistance = 35; // Reduced gap between baseline paths
    const nextBaseline = state.currentBaselineY + dropDistance;

    setLossCount((prev) => prev + 1);

    if (nextBaseline > state.maxBaselineY) {
      // Bottom bound reached: trigger Snake/Shiver animation
      state.snakes.push({
        startX: state.worldX,
        baselineY: state.currentBaselineY,
      });
    } else {
      // Standard Loss drop
      const newDrop: DropEvent = {
        startX: state.worldX,
        oldY: state.currentBaselineY,
        newY: nextBaseline,
      };
      state.drops.push(newDrop);
      state.currentBaselineY = nextBaseline;
    }
  };

  const handleReset = () => {
    const state = animRef.current;
    state.worldX = 0;
    state.currentBaselineY = state.initialBaselineY;
    state.drops = [];
    state.gains = [];
    state.snakes = [];
    state.pathHistory = [];
    setGainCount(0);
    setLossCount(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const state = animRef.current;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Advance world position
      state.worldX += state.speed;
      const worldX = state.worldX;

      // Determine camera offset to keep dot in exact center of chart (50%)
      const targetScreenDotX = Math.min(width * 0.5, worldX);
      const cameraX = Math.max(0, worldX - targetScreenDotX);

      // Compute Y position for current frame
      let currentY = state.currentBaselineY;

      // Subtle breathing idle noise (1-2px sine wave)
      const idleBreathing = Math.sin(worldX * 0.04) * 1.5;
      currentY += idleBreathing;

      // Check active Gain spikes
      for (const gain of state.gains) {
        const dist = worldX - gain.startX;
        const gainDuration = 50; // px width of hill
        if (dist >= 0 && dist <= gainDuration) {
          const progress = dist / gainDuration;
          const spikeHeight = 40; // 1 * U
          const spikeDelta = Math.sin(progress * Math.PI) * -spikeHeight;
          currentY += spikeDelta;
        }
      }

      // Check active Loss drops (smooth transition to lower baseline)
      for (const drop of state.drops) {
        const dist = worldX - drop.startX;
        const transitionWidth = 25; // px width of drop transition
        if (dist >= 0 && dist <= transitionWidth) {
          const progress = dist / transitionWidth;
          const smoothProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
          // Interpolate from oldY to newY
          currentY = drop.oldY + (drop.newY - drop.oldY) * smoothProgress + idleBreathing;
        }
      }

      // Check active Snake/Shiver animations at bottom bound
      for (const snake of state.snakes) {
        const dist = worldX - snake.startX;
        const snakeDuration = 60;
        if (dist >= 0 && dist <= snakeDuration) {
          const progress = dist / snakeDuration;
          const env = Math.sin(progress * Math.PI);
          const shiver = Math.sin(dist * 0.4) * 8 * env;
          currentY += shiver;
        }
      }

      // Record point in history
      state.pathHistory.push({ x: worldX, y: currentY });

      // Keep path history bounded to visible range
      while (state.pathHistory.length > 0 && state.pathHistory[0].x < cameraX - 50) {
        state.pathHistory.shift();
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Top and Bottom 1px Boundary Lines (#E5E5E5)
      ctx.strokeStyle = "#E5E5E5";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(0, 0.5);
      ctx.lineTo(width, 0.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, height - 0.5);
      ctx.lineTo(width, height - 0.5);
      ctx.stroke();

      // 2. Draw Ghost Dashed Lines & Vertical Red Drop Stamps
      for (const drop of state.drops) {
        const dropScreenX = drop.startX - cameraX;

        // Draw Ghost Dashed Line (#D4D4D4) from drop point to right edge of screen
        if (dropScreenX < width) {
          ctx.save();
          ctx.strokeStyle = "#D4D4D4";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);

          ctx.beginPath();
          const lineStartX = Math.max(0, dropScreenX);
          ctx.moveTo(lineStartX, drop.oldY);
          ctx.lineTo(width, drop.oldY);
          ctx.stroke();
          ctx.restore();
        }

        // Draw Vertical Red Drop Line (#EF4444) at drop location
        if (dropScreenX >= 0 && dropScreenX <= width) {
          ctx.save();
          ctx.strokeStyle = "#EF4444";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(dropScreenX, drop.oldY);
          ctx.lineTo(dropScreenX, drop.newY);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Draw Continuous Solid Black Main Path (#111111, stroke-width: 1.5px)
      if (state.pathHistory.length > 1) {
        ctx.save();
        ctx.strokeStyle = "#111111";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        const firstPt = state.pathHistory[0];
        ctx.moveTo(firstPt.x - cameraX, firstPt.y);

        for (let i = 1; i < state.pathHistory.length; i++) {
          const pt = state.pathHistory[i];
          const screenX = pt.x - cameraX;
          ctx.lineTo(screenX, pt.y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw Leading Dot (r=3.5px, fill #111111)
      const headScreenX = worldX - cameraX;
      ctx.save();
      ctx.fillStyle = "#111111";
      ctx.beginPath();
      ctx.arc(headScreenX, currentY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = 460 * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `460px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full max-w-[900px] mx-auto py-10 flex flex-col items-center font-sans text-left lowercase select-none md:-translate-x-[25%]">
      {/* Chart Area Container with Boundaries */}
      <div
        ref={containerRef}
        className="w-full relative h-[460px] overflow-hidden flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="block w-full h-[460px]" />
      </div>

      {/* Control Panel (Positioned below chart area) */}
      <div className="mt-8 flex flex-col items-center text-center w-full">
        {/* Buttons Container */}
        <div className="flex items-center gap-4">
          {/* + gain button */}
          <button
            type="button"
            onClick={handleGain}
            className="bg-[#111111] hover:bg-neutral-800 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>•</span>
            <span>+ gain</span>
          </button>

          {/* - lose button */}
          <button
            type="button"
            onClick={handleLoss}
            className="bg-[#111111] hover:bg-neutral-800 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>•</span>
            <span>- lose</span>
          </button>
        </div>

        {/* Status Text & Reset Link */}
        <div className="mt-6 text-xs sm:text-sm text-[#A3A3A3] font-normal flex items-center gap-3">
          <span>gain {gainCount}</span>
          <span>/</span>
          <span>loss {lossCount}</span>
          <button
            type="button"
            onClick={handleReset}
            className="ml-2 hover:text-[#111111] transition-colors cursor-pointer underline underline-offset-4"
          >
            [reset the line]
          </button>
        </div>
      </div>
    </div>
  );
}
