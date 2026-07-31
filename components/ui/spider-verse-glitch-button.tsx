"use client";

import React from "react";

interface SpiderVerseGlitchProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export const SpiderVerseGlitchButton: React.FC<SpiderVerseGlitchProps> = ({
  children,
  text = "playground",
  className = "",
  onClick,
}) => {
  return (
    <div className="button-wrapper relative group inline-block transform-gpu transition-transform duration-200 ease-out select-none">
      <div
        className={`spiderverse-button relative cursor-default font-black transform-gpu transition-all duration-150 ease-out font-sans ${className}`}
      >
        {children}

        {/* Glitch Layers Container */}
        <div className="glitch-layers absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Layer 1 - Electric Cyan */}
          <div className="glitch-layer layer-1 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FFDE00] rounded-sm text-[#00f0ff] opacity-0 transition-all duration-150 origin-center font-black [text-shadow:2px_2px_0_#ff007f]">
            {text}
          </div>

          {/* Layer 2 - Hot Pink/Magenta */}
          <div className="glitch-layer layer-2 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FFDE00] rounded-sm text-[#ff007f] opacity-0 transition-all duration-150 origin-center font-black [text-shadow:-2px_-2px_0_#00f0ff]">
            {text}
          </div>

          {/* Layer 3 - Neon Lime */}
          <div className="glitch-layer layer-3 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FFDE00] rounded-sm text-[#39ff14] opacity-0 transition-all duration-150 origin-center font-black [text-shadow:2px_-2px_0_#a855f7]">
            {text}
          </div>

          {/* Layer 4 - Electric Violet */}
          <div className="glitch-layer layer-4 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#FFDE00] rounded-sm text-[#a855f7] opacity-0 transition-all duration-150 origin-center font-black [text-shadow:-2px_2px_0_#ffea00]">
            {text}
          </div>
        </div>

      </div>

      <style jsx>{`
        .button-wrapper:hover .layer-1 {
          opacity: 1;
          animation: glitchLayer1 0.35s steps(2) infinite;
        }

        .button-wrapper:hover .layer-2 {
          opacity: 1;
          animation: glitchLayer2 0.35s steps(2) infinite;
        }

        .button-wrapper:hover .layer-3 {
          opacity: 1;
          animation: glitchLayer3 0.3s steps(2) infinite;
        }

        .button-wrapper:hover .layer-4 {
          opacity: 1;
          animation: glitchLayer4 0.25s steps(2) infinite;
        }

        .button-wrapper:hover .spiderverse-button {
          animation: buttonGlitch 0.3s steps(2) infinite;
        }

        @keyframes buttonGlitch {
          0% {
            transform: translate(0) scale(1.05);
          }
          25% {
            transform: translate(-6px, 3px) scale(1.08) skew(-5deg);
          }
          50% {
            transform: translate(6px, -3px) scale(1.05) skew(5deg);
          }
          75% {
            transform: translate(-8px, -3px) scale(1.03) skew(-3deg);
          }
          100% {
            transform: translate(0) scale(1.05);
          }
        }

        @keyframes glitchLayer1 {
          0% {
            transform: translate(-10px, -5px) scale(1.05) skew(-10deg);
            clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
          }
          25% {
            transform: translate(10px, 5px) scale(1.1) skew(10deg);
            clip-path: polygon(0 30%, 100% 30%, 100% 60%, 0 60%);
          }
          50% {
            transform: translate(-8px, 3px) scale(0.95) skew(-5deg);
            clip-path: polygon(0 10%, 100% 10%, 100% 40%, 0 40%);
          }
          75% {
            transform: translate(8px, -3px) scale(1.15) skew(5deg);
            clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%);
          }
          100% {
            transform: translate(-10px, -5px) scale(1.05) skew(-10deg);
            clip-path: polygon(0 20%, 100% 20%, 100% 50%, 0 50%);
          }
        }

        @keyframes glitchLayer2 {
          0% {
            transform: translate(10px, 5px) scale(1.05) skew(10deg);
            clip-path: polygon(0 50%, 100% 50%, 100% 80%, 0 80%);
          }
          25% {
            transform: translate(-10px, -5px) scale(1.1) skew(-10deg);
            clip-path: polygon(0 60%, 100% 60%, 100% 90%, 0 90%);
          }
          50% {
            transform: translate(8px, -3px) scale(0.95) skew(5deg);
            clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%);
          }
          75% {
            transform: translate(-8px, 3px) scale(1.15) skew(-5deg);
            clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
          }
          100% {
            transform: translate(10px, 5px) scale(1.05) skew(10deg);
            clip-path: polygon(0 50%, 100% 50%, 100% 80%, 0 80%);
          }
        }

        @keyframes glitchLayer3 {
          0% {
            transform: translate(-12px, 6px) scale(1.08) skew(8deg);
            clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
          }
          33% {
            transform: translate(12px, -6px) scale(0.98) skew(-8deg);
            clip-path: polygon(0 45%, 100% 45%, 100% 75%, 0 75%);
          }
          66% {
            transform: translate(-6px, -4px) scale(1.12) skew(4deg);
            clip-path: polygon(0 65%, 100% 65%, 100% 85%, 0 85%);
          }
          100% {
            transform: translate(-12px, 6px) scale(1.08) skew(8deg);
            clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
          }
        }

        @keyframes glitchLayer4 {
          0% {
            transform: translate(14px, -4px) scale(0.92) skew(-12deg);
            clip-path: polygon(0 5%, 100% 5%, 100% 25%, 0 25%);
          }
          50% {
            transform: translate(-14px, 4px) scale(1.18) skew(12deg);
            clip-path: polygon(0 55%, 100% 55%, 100% 95%, 0 95%);
          }
          100% {
            transform: translate(14px, -4px) scale(0.92) skew(-12deg);
            clip-path: polygon(0 5%, 100% 5%, 100% 25%, 0 25%);
          }
        }

        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(10%, 5%);
          }
          30% {
            transform: translate(-5%, 10%);
          }
          40% {
            transform: translate(15%, -5%);
          }
          50% {
            transform: translate(-10%, 15%);
          }
          60% {
            transform: translate(5%, -10%);
          }
          70% {
            transform: translate(-15%, 5%);
          }
          80% {
            transform: translate(10%, 10%);
          }
          90% {
            transform: translate(-5%, 15%);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes slice {
          0% {
            top: -10%;
            opacity: 0;
          }
          1% {
            opacity: 0.5;
          }
          3% {
            opacity: 0;
          }
          50% {
            top: 110%;
          }
          100% {
            top: 110%;
          }
        }
      `}</style>
    </div>
  );
};

export default SpiderVerseGlitchButton;
