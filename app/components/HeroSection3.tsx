"use client";

import React, { useEffect, useRef, useState } from "react";
import { ModernHero } from "@/components/ui/ModernHero";


interface HeroSection3Props {
  showContent?: boolean;
}

export default function HeroSection3({ showContent = true }: HeroSection3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(-2500);

  useEffect(() => {
    if (!showContent) return;

    let animationFrameId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // The scrolling distance is the total height of the container minus the viewport height
      const totalScrollableHeight = rect.height - windowHeight;
      
      // Calculate how far the top of the container has scrolled past the top of the viewport
      let progress = 0;
      if (totalScrollableHeight > 0) {
        progress = -rect.top / totalScrollableHeight;
        progress = Math.max(0, Math.min(1, progress));
      }

      // Translate the jet from off-screen left to off-screen right.
      const startX = -2500;
      const endX = windowWidth + 500;
      const currentX = startX + progress * (endX - startX);

      console.log("Scroll progress:", progress, "TranslateX:", currentX, "RectTop:", rect.top, "TotalScrollable:", totalScrollableHeight);

      setTranslateX(currentX);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    // Run once initially to set the correct position
    handleScroll();

    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showContent]);

  return (
    <div ref={containerRef} className="w-full bg-white text-zinc-950">
      <div className="relative h-[140vh]">
        <div className="sticky top-0 flex h-screen items-center justify-start pl-12 sm:pl-20 md:pl-32 lg:pl-48 pr-4 sm:pr-6 md:pr-12 lg:pr-24 overflow-hidden bg-white">
          {showContent && (
            <>


              {/* Left-aligned Typography Section */}
              <div className="z-10 w-full flex justify-start relative">
                <section aria-label="Hero section" className="w-full">
                  <ModernHero
                    name="Tarun Lakra"
                    greeting="Hey!"
                    headline={
                      <>
                        I turn my frustrations and passions into <span className="font-bold">products that improve</span> how people work and interact with their lives. I <span className="italic border-b border-pink-500 pb-1">simplify</span>. I humanize.
                      </>
                    }
                    email="lakra.tarun4302@gmail.com"
                    linkedinUrl="https://www.linkedin.com/in/tarun-lakra/"
                    githubUrl="https://github.com/tarunlakra4302"
                  />
                </section>
              </div>

              {/* Jet Animation Wrapper */}
              <div
                className="absolute top-0 left-0 z-20 flex h-full w-full items-center pointer-events-none"
                style={{
                  transform: `translateX(${translateX}px)`,
                  willChange: "transform",
                }}
              >
                <img
                  alt="Top view of a private jet flying across the screen"
                  className="w-auto h-auto max-w-none drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                  src="/jet.webp"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

