"use client";

import {
  Bell,
  CloudLightning,
  Music2,
  Phone,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Thermometer,
  Timer as TimerIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useMemo, useState } from "react";
import Image from "next/image";

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
} as const;

const DEFAULT_BOUNCE = 0.5;
const TIMER_INTERVAL_MS = 1000;

// Idle Component with Weather
const DefaultIdle = () => {
  const [showTemp, setShowTemp] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2"
      layout
      onHoverEnd={() => setShowTemp(false)}
      onHoverStart={() => setShowTemp(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="text-foreground"
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          key="storm"
        >
          <CloudLightning className="h-5 w-5 text-white" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showTemp && (
          <motion.div
            animate={{ opacity: 1, width: "auto" }}
            className="flex items-center gap-1 overflow-hidden text-white"
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
          >
            <Thermometer className="h-3 w-3" />
            <span className="pointer-events-none whitespace-nowrap text-white text-xs">
              12°C
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Ring Component
const DefaultRing = () => (
  <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
    <Phone className="h-5 w-5 text-green-500" />
    <div className="flex-1">
      <p className="pointer-events-none font-medium text-sm text-white">
        Incoming Call
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        Guillermo Rauch
      </p>
    </div>
    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
  </div>
);

// Timer Component
const DefaultTimer = () => {
  const [time, setTime] = useState(60);

  useMemo(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, TIMER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
      <TimerIcon className="h-5 w-5 text-amber-500" />
      <div className="flex-1">
        <p className="pointer-events-none font-medium text-sm text-white">
          {time}s remaining
        </p>
      </div>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20">
        <motion.div
          animate={{ width: "0%" }}
          className="h-full bg-amber-500"
          initial={{ width: "100%" }}
          transition={{ duration: time, ease: "linear" }}
        />
      </div>
    </div>
  );
};

// Notification Component
const Notification = () => (
  <div className="flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-foreground">
    <Bell className="h-5 w-5 text-yellow-400" />
    <div className="flex-1">
      <p className="pointer-events-none font-medium text-sm text-white">
        New Message
      </p>
      <p className="pointer-events-none text-white text-xs opacity-70">
        You have a new notification!
      </p>
    </div>
    <span className="rounded-full bg-yellow-400/40 px-2 py-0.5 text-xs text-yellow-500">
      1
    </span>
  </div>
);

// Music Player Component
export interface MusicPlayerProps {
  title?: string;
  artist?: string;
  albumImage?: string;
  isPlaying?: boolean;
  progressMs?: number;
  durationMs?: number;
  mode?: 'compact' | 'expanded';
  onToggleExpand?: () => void;
}

import { useEffect } from "react";

export const MusicPlayer = ({ 
  title, 
  artist, 
  albumImage, 
  isPlaying,
  progressMs = 0,
  durationMs = 180000,
  mode = 'compact',
  onToggleExpand
}: MusicPlayerProps) => {
  const totalSeconds = Math.max(1, Math.floor(durationMs / 1000));
  const initialElapsed = Math.min(totalSeconds, Math.floor(progressMs / 1000));

  const [elapsed, setElapsed] = useState(initialElapsed);

  // Synchronize elapsed time when new progress or song title arrives from Spotify API
  useEffect(() => {
    setElapsed(Math.min(totalSeconds, Math.floor((progressMs || 0) / 1000)));
  }, [progressMs, title, totalSeconds]);

  // Tick local timer forward every second while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsed((prev) => (prev < totalSeconds ? prev + 1 : totalSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatRemaining = (secs: number) => {
    const remaining = Math.max(0, totalSeconds - secs);
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `-${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const percentage = Math.min(100, (elapsed / totalSeconds) * 100);

  if (mode === 'compact') {
    return (
      <div 
        onClick={onToggleExpand} 
        className="flex items-center gap-4 px-5 py-3 cursor-pointer select-none pointer-events-auto"
      >
        {albumImage ? (
          <img
            src={albumImage}
            alt="Album art"
            className="h-7 w-7 rounded-full object-cover flex-shrink-0 animate-spin"
            style={{ 
              animationDuration: '8s', 
              animationTimingFunction: 'linear', 
              animationIterationCount: 'infinite', 
              animationPlayState: isPlaying ? 'running' : 'paused' 
            }}
          />
        ) : (
          <Music2 className="h-6 w-6 text-pink-500 flex-shrink-0" />
        )}
        
        <div className="flex items-end gap-[2.5px] h-4.5 px-1 flex-shrink-0">
          <motion.div
            animate={isPlaying ? { height: ["4px", "14px", "4px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" } : {}}
            className="w-[2.5px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
          <motion.div
            animate={isPlaying ? { height: ["11px", "4px", "11px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" } : {}}
            className="w-[2.5px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
          <motion.div
            animate={isPlaying ? { height: ["7px", "14px", "7px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 } : {}}
            className="w-[2.5px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-80 p-4 text-foreground cursor-pointer select-none pointer-events-auto"
      onClick={onToggleExpand}
    >
      {/* Top row */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.16 }}
        className="flex items-center gap-3"
      >
        {albumImage ? (
          <img
            src={albumImage}
            alt="Album art"
            className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Music2 className="h-6 w-6 text-pink-500" />
          </div>
        )}
        
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-white truncate">
            {title || "Not Playing"}
          </p>
          <p className="text-xs text-white/70 truncate">
            {artist || "Spotify"}
          </p>
        </div>

        {/* Animated equalizer waves */}
        <div className="flex items-end gap-[3px] h-5 px-1">
          <motion.div
            animate={isPlaying ? { height: ["4px", "18px", "4px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" } : {}}
            className="w-[3px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
          <motion.div
            animate={isPlaying ? { height: ["14px", "4px", "14px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut" } : {}}
            className="w-[3px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
          <motion.div
            animate={isPlaying ? { height: ["8px", "18px", "8px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 } : {}}
            className="w-[3px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
          <motion.div
            animate={isPlaying ? { height: ["18px", "4px", "18px"] } : { height: "4px" }}
            transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 } : {}}
            className="w-[3px] bg-green-500 rounded-sm"
            style={{ height: "4px" }}
          />
        </div>
      </motion.div>

      {/* Progress Bar scrubber */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.18, type: "spring", bounce: 0.16 }}
        className="mt-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-medium">
          <span>{formatTime(elapsed)}</span>
          <span>{formatRemaining(elapsed)}</span>
        </div>
      </motion.div>

    </div>
  );
};

export type View = "idle" | "ring" | "timer" | "notification" | "music";

export interface DynamicIslandProps {
  className?: string;
  idleContent?: ReactNode;
  onViewChange?: (view: View) => void;
  ringContent?: ReactNode;
  timerContent?: ReactNode;
  musicContent?: ReactNode;
  musicProps?: {
    title?: string;
    artist?: string;
    albumImage?: string;
    isPlaying?: boolean;
    progressMs?: number;
    durationMs?: number;
  };
  view?: View;
}

export default function DynamicIsland({
  view: controlledView,
  onViewChange,
  idleContent,
  ringContent,
  timerContent,
  musicContent,
  musicProps,
  className = "",
}: DynamicIslandProps) {
  const [internalView, setInternalView] = useState<View>("idle");
  const [isMusicExpanded, setIsMusicExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const view = controlledView ?? internalView;

  // Reset expansion state if the view changes
  useEffect(() => {
    if (view !== "music") {
      setIsMusicExpanded(false);
    }
  }, [view]);

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return ringContent ?? <DefaultRing />;
      case "timer":
        return timerContent ?? <DefaultTimer />;
      case "notification":
        return <Notification />;
      case "music":
        return musicContent ?? (
          <MusicPlayer 
            title={musicProps?.title}
            artist={musicProps?.artist}
            albumImage={musicProps?.albumImage}
            isPlaying={musicProps?.isPlaying}
            progressMs={musicProps?.progressMs}
            durationMs={musicProps?.durationMs}
            mode={isMusicExpanded ? 'expanded' : 'compact'} 
            onToggleExpand={() => setIsMusicExpanded(!isMusicExpanded)}
          />
        );
      default:
        return idleContent ?? <DefaultIdle />;
    }
  }, [view, idleContent, ringContent, timerContent, musicContent, musicProps, isMusicExpanded]);

  return (
    <div className={`pointer-events-auto flex items-center justify-center ${className}`}>
      <motion.div
        className="overflow-hidden rounded-full bg-black shadow-lg shadow-black/20"
        layout
        style={{ borderRadius: 32 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring" as const,
                bounce: 0.16,
                duration: 0.4,
              }
        }
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  originX: 0.5,
                  originY: 0.5,
                  transition: { delay: 0.05, type: "spring", bounce: 0.16 },
                }
          }
          initial={{
            scale: 0.9,
            opacity: 0,
            filter: "blur(5px)",
            originX: 0.5,
            originY: 0.5,
          }}
          key={view + (view === "music" ? `-${isMusicExpanded}` : "")}
          transition={{
            type: "spring" as const,
            bounce: 0.16,
          }}
        >
          {content}
        </motion.div>
      </motion.div>
    </div>
  );
}
