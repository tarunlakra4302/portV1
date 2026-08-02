"use client";

import React from "react";
import { ModernHero } from "@/components/ui/ModernHero";

interface HeroSection3Props {
  showContent?: boolean;
}

export default function HeroSection3({ showContent = true }: HeroSection3Props) {
  return (
    <div className="w-full bg-white text-zinc-950 flex min-h-screen items-center justify-start pl-12 sm:pl-20 md:pl-32 lg:pl-48 pr-4 sm:pr-6 md:pr-12 lg:pr-24 overflow-hidden">
      {showContent && (
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
      )}
    </div>
  );
}


