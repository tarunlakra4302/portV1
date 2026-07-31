"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectDetailModal, { ProjectDetail } from "../components/ProjectDetailModal";
import SterlingNavigation from "../components/SterlingNavigation";
import Skiper67 from "../components/Skiper67";
import { Footer } from "@/components/layout/Footer";
import BlurReveal from "@/components/ui/blur-reveal";
import { SpiderVerseGlitchButton } from "@/components/ui/spider-verse-glitch-button";

interface ThoughtData extends ProjectDetail {
  category: string;
  description: string;
  metric: string;
  status: string;
  year: string;
}

const THOUGHTS: ThoughtData[] = [
  {
    id: 1,
    name: "Architecting Local-First Software",
    subtitle: "7 min read • Software Architecture",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "The cloud transition gave us unprecedented centralization, but at the cost of ownership, speed, and reliability. Local-first software flips the paradigm: data lives locally on the client's device first, synchronizing asynchronously in the background.",
      "By eliminating round-trip latency for user actions, interfaces feel instantaneously reactive (0ms perception delay). Conflict-free Replicated Data Types (CRDTs) and state compression make state updates seamless even in offline or weak-network conditions.",
      "As client devices become increasingly powerful, moving computational weight back to the edge and user hardware isn't just an optimization — it's the foundation for the next decade of user-centric application design."
    ],
    liveUrl: "https://github.com/tarunlakra4302",
    codeUrl: "https://github.com/tarunlakra4302",
    category: "Architecture",
    description: "Deep dive into local-first system design, CRDTs, and zero-latency interfaces.",
    metric: "7 min read",
    status: "Published",
    year: "2026"
  },
  {
    id: 2,
    name: "The Art of Digital Simplification",
    subtitle: "5 min read • Product Philosophy",
    heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "Every added configuration toggle or nested menu item in software is cognitive debt handed directly to the user. Simplicity isn't about removing necessary functionality — it's about hiding complexity behind intuitive defaults.",
      "When designing modern software, the goal is to reduce friction until the software becomes an extension of thought. Great tools get out of the user's way and let momentum take over.",
      "By focusing on opinionated workflows and micro-interactions, we can craft digital environments that feel lightweight, deliberate, and deeply satisfying to use every day."
    ],
    liveUrl: "https://github.com/tarunlakra4302",
    codeUrl: "https://github.com/tarunlakra4302",
    category: "Product Philosophy",
    description: "Reflections on reducing cognitive load, opinionated UI defaults, and fluid UX.",
    metric: "5 min read",
    status: "Published",
    year: "2026"
  },
  {
    id: 3,
    name: "High-Frequency UI & State Synchronization",
    subtitle: "9 min read • Frontend Engineering",
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "Rendering 60 FPS real-time interfaces while consuming high-throughput backend events requires strict separation between DOM mutations and data ingestion threads.",
      "By utilizing Web Workers for binary delta parsing and OffscreenCanvas/WebGL for visual presentation, main thread blocking becomes a problem of the past.",
      "In this breakdown, we explore event loop optimization, memory pool allocation for transient objects, and strategy patterns for high-frequency dashboard streaming."
    ],
    liveUrl: "https://github.com/tarunlakra4302",
    codeUrl: "https://github.com/tarunlakra4302",
    category: "Performance",
    description: "Engineering high-frequency client state engines with Web Workers and WebGL.",
    metric: "9 min read",
    status: "Published",
    year: "2025"
  },
  {
    id: 4,
    name: "Why Software Needs Human Touch",
    subtitle: "6 min read • Design & Craft",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "In an era where automated template generation and boilerplate frameworks dominate, software often loses its visual identity and tactile warmth.",
      "Injecting subtle physics-based animations, customized typography hierarchies, and thoughtful error states transforms cold utilities into memorable products people love.",
      "Craft isn't ornamental — it communicates quality, builds trust, and makes complex tasks feel accessible and enjoyable."
    ],
    liveUrl: "https://github.com/tarunlakra4302",
    codeUrl: "https://github.com/tarunlakra4302",
    category: "Design Craft",
    description: "Exploring tactile UI feedback, typography, and humanizing digital tools.",
    metric: "6 min read",
    status: "Published",
    year: "2025"
  }
];

export default function ThoughtsPage() {
  const [selectedThought, setSelectedThought] = useState<ThoughtData | null>(null);
  const [currentTime, setCurrentTime] = useState("06:16");

  // Keep local time dynamic, default matches Indian time formatting
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans selection:bg-[#FFDE00] selection:text-black antialiased relative">
      <SterlingNavigation />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24">

        {/* Section 2: The Main Content */}
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          {/* Left Column Spacer */}
          <div className="col-span-12 md:col-span-4"></div>

          {/* Right Column: Hero Typography & Thoughts */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            {/* Massive Hero Typography */}
            <div className="flex flex-col text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[0.85] select-none">
              <BlurReveal as="span" className="block text-[#c2c2c2]" delay={0.1}>
                Welcome to my personal
              </BlurReveal>
              <BlurReveal as="span" className="block text-black" delay={0.25}>
                thoughts — or, as I like to
              </BlurReveal>
              <div className="flex flex-wrap items-center text-[#c2c2c2] gap-x-3">
                <BlurReveal as="span" delay={0.4}>
                  call it, my
                </BlurReveal>
                <SpiderVerseGlitchButton
                  text="reflections"
                  className="relative inline-block text-black bg-[#FFDE00] px-3.5 py-1 rounded-sm transform -rotate-1 -skew-x-2 shadow-sm font-black"
                >
                  reflections
                </SpiderVerseGlitchButton>
              </div>
              <BlurReveal as="span" className="block text-black" delay={0.55}>
                on code & life.
              </BlurReveal>
            </div>

            {/* Video Showreel Component */}
            <div className="mt-12">
              <Skiper67 />
            </div>
          </div>
        </div>
      </div>

      <Footer
        email="lakra.tarun4302@gmail.com"
        location="New Delhi, India"
        linkedinUrl="https://www.linkedin.com/in/tarun-lakra/"
        githubUrl="https://github.com/tarunlakra4302"
        resumeUrl="https://drive.google.com/file/d/1uCC1Iam4_oSYYWcFfTqVhdws5F_l-222/view"
        className="relative z-10 bg-white border-t border-zinc-100 text-black py-16"
      />

      {/* Thought Detail Modal */}
      {selectedThought && (
        <ProjectDetailModal
          isOpen={!!selectedThought}
          project={selectedThought}
          onClose={() => setSelectedThought(null)}
        />
      )}
    </main>
  );
}
