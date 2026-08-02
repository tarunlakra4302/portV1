"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ElectricBorder from "./electric-border"

const words = ["नमस्ते","Hello", "Bonjour", "Ciao", "Olà", "Hola", "やあ", "你好", "Hallå", "Guten Tag", "Bonjour","Привет"]

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}
const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 },
  },
}

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
 
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    const TOTAL_DURATION = 2600; // total duration to reach 100% and last word
    const INITIAL_WORD_PAUSE = 600; // initial greeting pause
    const numWords = words.length; // 12
    const remainingTime = TOTAL_DURATION - INITIAL_WORD_PAUSE;
    const wordStep = remainingTime / (numWords - 1); // ~181.8ms per word

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Calculate progress (0 to 100)
      const currentProgress = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));
      setProgress(currentProgress);

      // Calculate word index (0 to numWords - 1)
      if (elapsed < INITIAL_WORD_PAUSE) {
        setIndex(0);
      } else {
        const currentWordIndex = Math.min(
          numWords - 1,
          1 + Math.floor((elapsed - INITIAL_WORD_PAUSE) / wordStep)
        );
        setIndex(currentWordIndex);
      }

      // Both reach completion at the exact same moment
      if (elapsed >= TOTAL_DURATION) {
        clearInterval(timer);
        setProgress(100);
        setIndex(numWords - 1);

        // Hold together showing 100% and last word, then slide up exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 800);
        }, 500);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black z-[99999999999]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-white text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
          >
            <span className="block w-2.5 h-2.5 bg-white rounded-full mr-2.5"></span>
            {words[index]}
          </motion.p>
          
          <div 
            className="absolute text-white select-none pointer-events-none z-10 font-medium font-mono"
            style={{
              position: "absolute",
              right: "clamp(1rem, 2vw, 3rem)",
              bottom: "clamp(1rem, 2vw, 3rem)",
              fontSize: "clamp(2rem, 4vw, 5rem)",
              lineHeight: 1,
              opacity: 0.75,
              fontVariantNumeric: "tabular-nums"
            }}
          >
            {progress}%
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
            <ElectricBorder
              color="#7df9ff"
              speed={1.5}
              chaos={0.5}
              thickness={3}
              className="w-full h-[3px]"
            >
              <div className="w-full h-[3px]" />
            </ElectricBorder>
          </div>
        </>
      )}
    </motion.div>
  );
};

