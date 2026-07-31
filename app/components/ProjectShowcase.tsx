"use client";
 
import React, { useState, useEffect } from "react";
import "./ProjectShowcase.css";
import ProjectDetailModal, { ProjectDetail } from "./ProjectDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
 
interface ProjectData extends ProjectDetail {
  category: string;
  description: string;
  metric: string;
  status: string;
}
 
const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: "Whispering Pages",
    subtitle: "Billion Dollar Saas",
    heroImage: "/project/whispering pages .png",
    paragraphs: [
      "Whispering Pages is a highly optimized, state-of-the-art open-source project management platform designed for scale. By utilizing modern web protocols and local-first architecture, it achieves near-zero latency state updates across distributed engineering teams globally.",
      "The engine features high-frequency state synchronization powered by delta-compression algorithms, allowing real-time collaborative whiteboarding, interactive kanban streams, and dynamic task scheduling without database bottlenecks.",
      "Engineered with a focus on developer experience, it provides standard inline instrumentation, a clean extensible CLI, and custom integration adapters for all modern CI/CD pipelines, making it a robust foundation for building high-performing software organizations."
    ],
    liveUrl: "https://whispering-pages-kzpk.vercel.app/",
    codeUrl: "https://github.com/tarunlakra4302/Whispering-Pages",
    category: "Real-time Synchronization",
    description: "High-frequency state synchronization engine for multi-agent environments.",
    metric: "4.2ms latency",
    status: "Active"
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
    status: "Synced"
  },
  {
    id: 3,
    name: "Inertia",
    subtitle: "Real-Time User Intelligence",
    heroImage: "/project/Inertia.png",
    paragraphs: [
      "Zenith Analytics delivers visual reporting and event tracking at scale. Processing over 140 million events per second, it filters, aggregates, and transforms raw clickstreams into actionable insights in real-time.",
      "Utilizing web worker multi-threading and optimized WebGL canvases, Zenith renders complex user interaction heatmaps and conversion funnels with smooth 60fps performance directly in the client browser.",
      "Integrate Zenith into any application with a single-line script, and start tracking user behaviors, session replays, and custom custom event metrics with privacy-first data anonymization."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com/tarunlakra4302/Inertia-Equity-Risk-Intelligence-Platform",
    category: "Data Processing",
    description: "Visual reporting pipeline for deep user interaction and performance tracking.",
    metric: "140M events/sec",
    status: "Processing"
  },
  {
    id: 4,
    name: "TaskFlow Sonet",
    subtitle: "Low-level Hardware Interface",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "Quantum Deck is a low-latency communications framework designed specifically for interfacing with custom edge devices, external displays, and matrix controllers directly over USB and web serial connections.",
      "With high-throughput serialization buffers, Quantum Deck easily streams high-resolution data channels (up to 12Gbps) to peripheral arrays, supporting custom refresh rates and visual feedback systems.",
      "Ideal for industrial instrumentation and high-fidelity simulated environments, the framework includes comprehensive hardware-in-the-loop testing suites and custom device drivers out of the box."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com",
    category: "Hardware Interface",
    description: "Low-level protocol framework for edge devices and external displays.",
    metric: "12Gbps throughput",
    status: "Connected"
  },
  {
    id: 5,
    name: "CloudVibe Bruh",
    subtitle: "Premium Design Vocabulary",
    heroImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    paragraphs: [
      "Nova is a premium design language and comprehensive UI component library, strictly optimized for speed, responsive design, and visual excellence across devices.",
      "Nova offers curated color palettes, elegant typography pairings, fluid layouts, and built-in interactive micro-animations that turn standard web interactions into satisfying sensory experiences.",
      "Developers can build consistent, beautiful, and accessible web application frontends in minutes using Nova's pre-configured theme tokens and highly flexible modular elements."
    ],
    liveUrl: "https://github.com",
    codeUrl: "https://github.com",
    category: "UI Components",
    description: "Premium visual language and component library for state-of-the-art apps.",
    metric: "v2.4.0 release",
    status: "Stable"
  }
];
 
export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const scrollPosRef = React.useRef<number>(0);
 
  const activeProject = PROJECTS[activeIndex];
 
  const handleSelectProject = (index: number) => {
    scrollPosRef.current = window.scrollY;
    setActiveIndex(index);
    setViewMode("detail");
  };

  useEffect(() => {
    if (viewMode === "detail") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      // Restore scroll position after the class is removed
      if (viewMode === "list" && scrollPosRef.current > 0) {
        // Use a small timeout or requestAnimationFrame to ensure the DOM has updated and scroll height is restored
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosRef.current);
        });
      }
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [viewMode]);
 
  return (
    <div className={`project-showcase-container ${viewMode === "detail" ? "is-detailed" : ""}`}>
      <AnimatePresence>
        {viewMode === "detail" ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="detail-view-bg cursor-pointer w-full h-full"
            onClick={() => setViewMode("list")}
          >
            <div className="detail-view-scroll-wrapper" onClick={() => setViewMode("list")}>
              <div className="detail-view-content" onClick={(e) => e.stopPropagation()}>
                {/* Title */}
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.25 }}
                  className="detail-title"
                >
                  {activeProject.name}
                </motion.h2>
                
                {/* Mockup Image */}
                <div className="detail-image-container">
                  <img
                    src={activeProject.heroImage}
                    alt={activeProject.name}
                    className="detail-image"
                  />
                </div>
 
                {/* Subtitle with divider line */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className="detail-subtitle-container"
                >
                  <span className="detail-subtitle">{activeProject.subtitle}</span>
                  <div className="detail-subtitle-line" />
                </motion.div>
 
                {/* Paragraphs */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="detail-paragraphs"
                >
                  {activeProject.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </motion.div>
 
                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="detail-actions" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.a
                    href={activeProject.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    whileHover="hover"
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>Live Preview</span>
                    <motion.span
                      variants={{
                        hover: { x: 2, y: -2 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="inline-flex"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </motion.a>
 
                  <motion.a
                    href={activeProject.codeUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    whileHover="hover"
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>See Source Code</span>
                    <motion.span
                      variants={{
                        hover: { rotate: 8 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="inline-flex"
                    >
                      <BookOpen className="w-4 h-4" />
                    </motion.span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="list-view-wrapper"
          >
            {/* Module 1: Left Card (UI Preview) */}
            <div 
              className="preview-card-container cursor-pointer group"
              onClick={() => setViewMode("detail")}
            >
              <div className="preview-card">
                {/* Project Image Background */}
                <div 
                  className="card-bg-image" 
                  style={{ backgroundImage: `url("${encodeURI(activeProject.heroImage)}")` }}
                />
              </div>
            </div>
 
            {/* Module 2: Right Typography List (Projects) */}
            <div className="projects-list-container">
              <div className="list-header">
                <span className="list-header__text">MY PROJECTS</span>
                <div className="list-header__line" />
              </div>
 
              <ul className="projects-list">
                {PROJECTS.map((project, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <li key={project.id} className="projects-list__item">
                      <motion.button
                        className={`project-btn ${isActive ? "active" : ""}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleSelectProject(index)}
                        whileTap={{ scale: 0.96 }}
                      >
                        <span className="project-name">
                          {project.name}
                          {isActive && <span className="active-indicator"> ·</span>}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
