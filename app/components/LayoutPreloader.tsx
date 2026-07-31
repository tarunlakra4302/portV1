"use client";

import React, { useEffect, useRef, useState } from "react";
import HeroSection3 from "./HeroSection3";
import ParallaxVelocityText from "./ParallaxVelocityText";
import ProjectShowcase from "./ProjectShowcase";
import CallToAction from "./CallToAction";
import SterlingNavigation from "./SterlingNavigation";
import Preloader from "@/components/ui/preloader";
import { Footer } from "@/components/layout/Footer";

let hasSiteLoaded = false;

export default function LayoutPreloader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(hasSiteLoaded);

  const handleComplete = () => {
    hasSiteLoaded = true;
    setIsCompleted(true);
  };

  useEffect(() => {
    if (isCompleted) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isCompleted]);

  return (
    <div 
      className="w-full min-h-screen relative bg-white select-none"
      style={{ overflow: isCompleted ? "visible" : "hidden" }}
    >
      {!isCompleted && (
        <Preloader onComplete={handleComplete} />
      )}

      {/* Header / Navigation */}
      <SterlingNavigation ref={headerRef} isCompleted={isCompleted} />

      {/* Hero Section */}
      <div className="relative w-full min-h-screen bg-white">
        <HeroSection3 showContent={isCompleted} />
      </div>

      {/* Scroll animation section (only visible/scrollable after completion) */}
      {isCompleted && (
        <div className="relative z-30 w-full flex flex-col">
          <ParallaxVelocityText />
          <ProjectShowcase />
          <CallToAction />
          <Footer
            email="lakra.tarun4302@gmail.com"
            location="New Delhi, India"
            linkedinUrl="https://www.linkedin.com/in/tarun-lakra/"
            githubUrl="https://github.com/tarunlakra4302"
            resumeUrl="https://drive.google.com/file/d/1uCC1Iam4_oSYYWcFfTqVhdws5F_l-222/view"
            className="relative z-10"
          />
        </div>
      )}
    </div>
  );
}
