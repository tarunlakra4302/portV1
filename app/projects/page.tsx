"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SterlingNavigation from "../components/SterlingNavigation";
import { Footer } from "@/components/layout/Footer";
import BlurReveal from "@/components/ui/blur-reveal";
import { SpiderVerseGlitchButton } from "@/components/ui/spider-verse-glitch-button";

interface ProjectData {
  id: number;
  name: string;
  subtitle: string;
  heroImage: string;
  paragraphs: string[];
  liveUrl?: string;
  codeUrl?: string;
  category: string;
  description: string;
  metric: string;
  status: string;
  year: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: "Whispering Pages",
    subtitle: "Billion Dollar SaaS",
    heroImage: "/project/whispering pages .png",
    paragraphs: [
      "Whispering Pages is a highly optimized, state-of-the-art open-source project management platform designed for scale. By utilizing modern web protocols and local-first architecture, it achieves near-zero latency state updates across distributed engineering teams globally.",
      "The engine features high-frequency state synchronization powered by delta-compression algorithms, allowing real-time collaborative whiteboarding, interactive Kanban streams, and dynamic task scheduling without database bottlenecks.",
      "Engineered with a focus on developer experience, it provides standard inline instrumentation, a clean, extensible CLI, and custom integration adapters for all modern CI/CD pipelines, making it a robust foundation for building high-performing software organizations."
    ],
    liveUrl: "https://whispering-pages-kzpk.vercel.app/",
    codeUrl: "https://github.com/tarunlakra4302/Whispering-Pages",
    category: "Real-time Synchronization",
    description: "High-frequency state synchronization engine for multi-agent environments.",
    metric: "4.2ms latency",
    status: "Active",
    year: "2026"
  },
  {
    id: 2,
    name: "Aetheris",
    subtitle: "Distributed Serverless Sync",
    heroImage: "/project/aetheris.png",
    paragraphs: [
      "Aetheris Spatial orchestrates distributed serverless tasks with absolute precision. Designed to bridge the gap between heavy background workers and instant web clients, it provides robust pub/sub communication channels across edge nodes.",
      "By implementing intelligent queueing mechanisms and automated retries, Aetheris Spatial ensures that cron schedules and critical application webhooks are delivered and processed even during network partitions.",
      "The dashboard offers real-time visualization of pipeline queues, thread pooling metrics, and custom error boundaries, giving operations teams complete transparency over their asynchronous architecture."
    ],
    liveUrl: "https://aetheris-spatial-orchestration-engi.vercel.app/",
    codeUrl: "https://github.com/tarunlakra4302/Aetheris-Spatial-Orchestration-Engine",
    category: "Distributed Compute",
    description: "Serverless orchestration layer for heavy background tasks and cron jobs.",
    metric: "99.99% uptime",
    status: "Synced",
    year: "2025"
  },
  {
    id: 3,
    name: "Inertia",
    subtitle: "Real-Time User Intelligence",
    heroImage: "/project/Inertia.png",
    paragraphs: [
      "Inertia delivers visual reporting and event tracking at scale. Processing over 140 million events per second, it filters, aggregates, and transforms raw clickstreams into actionable insights in real-time.",
      "Utilizing web worker multi-threading and optimized WebGL canvases, Inertia renders complex user interaction heatmaps and conversion funnels with smooth 60fps performance directly in the client browser.",
      "Integrate Inertia into any application with a single-line script, and start tracking user behaviors, session replays, and custom event metrics with privacy-first data anonymization."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com/tarunlakra4302/Inertia-Equity-Risk-Intelligence-Platform",
    category: "Data Processing",
    description: "Visual reporting pipeline for deep user interaction and performance tracking.",
    metric: "140M events/sec",
    status: "Processing",
    year: "2025"
  },
  {
    id: 4,
    name: "TaskFlow Sonet",
    subtitle: "Low-level Hardware Interface",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "TaskFlow Sonet is a low-latency communications framework designed specifically for interfacing with custom edge devices, external displays, and matrix controllers directly over USB and web serial connections.",
      "With high-throughput serialization buffers, TaskFlow Sonet easily streams high-resolution data channels (up to 12Gbps) to peripheral arrays, supporting custom refresh rates and visual feedback systems.",
      "Ideal for industrial instrumentation and high-fidelity simulated environments, the framework includes comprehensive hardware-in-the-loop testing suites and custom device drivers out of the box."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com",
    category: "Hardware Interface",
    description: "Low-level protocol framework for edge devices and external displays.",
    metric: "12Gbps throughput",
    status: "Connected",
    year: "2024"
  },
  {
    id: 5,
    name: "CloudVibe Design",
    subtitle: "Premium Design Vocabulary",
    heroImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "CloudVibe is a premium design language and comprehensive UI component library, strictly optimized for speed, responsive design, and visual excellence across devices.",
      "CloudVibe offers curated color palettes, elegant typography pairings, fluid layouts, and built-in interactive micro-animations that turn standard web interactions into satisfying sensory experiences.",
      "Developers can build consistent, beautiful, and accessible web application frontends in minutes using CloudVibe's pre-configured theme tokens and highly flexible modular elements."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com",
    category: "UI Components",
    description: "Premium visual language and component library for state-of-the-art apps.",
    metric: "v2.4.0 release",
    status: "Stable",
    year: "2024"
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hasOpenedProject, setHasOpenedProject] = useState(false);

  const handleSelectProject = (project: ProjectData) => {
    setHasOpenedProject(true);
    setSelectedProject(project);
  };

  // Scroll to top when selecting a project
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProject]);

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans selection:bg-[#FFDE00] selection:text-black antialiased relative">
      <SterlingNavigation />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 relative z-50">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          {/* Left Column Spacer */}
          <div className="col-span-12 md:col-span-4"></div>

          {/* Right Column: Content Area */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                /* Project Detailed View - Matching Thoughts Layout & Reference UI */
                <motion.article
                  key="project-detail"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col w-full"
                >
                  {/* Top Bar with Back Button & Pink Line */}
                  <div className="flex items-center gap-3 mb-10">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0 outline-none"
                    >
                      <span className="w-[22px] h-[22px] rounded-[4px] bg-[#d9267c] flex items-center justify-center text-white text-[12px] font-bold shadow-xs transition-transform group-hover:-translate-x-1">
                        ←
                      </span>
                      <span className="text-[#d9267c] font-bold text-sm md:text-[15px]">
                        Back
                      </span>
                    </button>
                    <div className="flex-1 h-[1px] bg-[#d9267c]" />
                  </div>

                  {/* Project Category Tag */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#d9267c] font-bold">
                      {selectedProject.category}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs text-gray-500 font-semibold">{selectedProject.year}</span>
                  </div>

                  {/* Project Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#111111] tracking-[-0.03em] leading-[1.1]">
                    {selectedProject.name}
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-2 text-base text-gray-500 font-medium">
                    {selectedProject.subtitle}
                  </p>

                  {/* Hero Image / Banner */}
                  {selectedProject.heroImage && (
                    <div className="mt-8 mb-8 rounded-xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-50">
                      <img
                        src={selectedProject.heroImage}
                        alt={selectedProject.name}
                        className="w-full h-auto max-h-[420px] object-cover"
                      />
                    </div>
                  )}

                  {/* Metrics Bar */}
                  <div className="flex flex-wrap items-center gap-6 py-4 px-0 mb-8 text-sm">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Metric</span>
                      <span className="font-bold text-black">{selectedProject.metric}</span>
                    </div>
                    <div className="h-8 w-[1px] bg-zinc-200" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Status</span>
                      <span className="font-bold text-black">{selectedProject.status}</span>
                    </div>
                  </div>

                  {/* Project Overview Paragraphs */}
                  <div className="flex flex-col mb-10">
                    <h2 className="text-2xl font-bold text-[#111111] mb-4 tracking-tight">
                      Overview
                    </h2>
                    {selectedProject.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15px] sm:text-[16px] text-[#333333] font-normal leading-[1.75] mb-5"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-100">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#111111] text-white text-sm font-semibold hover:bg-black transition-colors"
                      >
                        Live Demo
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {selectedProject.codeUrl && (
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-zinc-100 text-black text-sm font-semibold hover:bg-zinc-200 transition-colors border border-zinc-200"
                      >
                        Source Code
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ) : (
                /* Projects Hero & Case Studies List View */
                <motion.div
                  key="projects-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  {/* Massive Hero Typography */}
                  <div className="flex flex-col text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[0.85] select-none">
                    <BlurReveal as="span" className="block text-[#c2c2c2]" delay={0.1}>
                      Welcome to my personal
                    </BlurReveal>
                    <BlurReveal as="span" className="block text-black" delay={0.25}>
                      crafts — or, as I like to
                    </BlurReveal>
                    <div className="flex flex-wrap items-center text-[#c2c2c2] gap-x-3">
                      <BlurReveal as="span" delay={0.4}>
                        call them,
                      </BlurReveal>
                      <div className="inline-flex items-center gap-x-3">
                        <BlurReveal as="span" delay={0.45}>
                          my
                        </BlurReveal>
                        <SpiderVerseGlitchButton
                          text="playground"
                          className="relative inline-block text-black bg-[#FFDE00] px-3.5 py-1 rounded-sm transform -rotate-1 -skew-x-2 shadow-sm font-black"
                        >
                          playground
                        </SpiderVerseGlitchButton>
                      </div>
                    </div>
                    <BlurReveal as="span" className="block text-black" delay={0.55}>
                      on the web.
                    </BlurReveal>
                  </div>

                  {/* Case Studies Section */}
                  <div className="mt-20 md:mt-24">
                    <BlurReveal as="h2" className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter mb-6 md:mb-8" delay={0.7}>
                      Case studies
                    </BlurReveal>

                    {/* Elegant List of Case Studies */}
                    <div className="flex flex-col border-t border-zinc-100">
                      {PROJECTS.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => handleSelectProject(project)}
                          className="group flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 md:py-5 border-b border-zinc-100 cursor-pointer transition-all duration-300 hover:px-2"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#c2c2c2] font-semibold group-hover:text-black transition-colors duration-200">
                              {project.category}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">
                              {project.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-6 mt-4 sm:mt-0">
                            <div className="text-right hidden md:block">
                              <p className="text-sm font-medium text-black">{project.metric}</p>
                              <p className="text-xs text-[#c2c2c2]">{project.subtitle}</p>
                            </div>
                            <span className="text-sm font-bold text-zinc-400 group-hover:text-black transition-colors duration-200">
                              {project.year}
                            </span>
                            <div className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
    </main>
  );
}

