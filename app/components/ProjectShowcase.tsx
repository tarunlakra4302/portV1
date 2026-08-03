"use client";
 
import React, { useState, useEffect } from "react";
import "./ProjectShowcase.css";
import ProjectDetailModal, { ProjectDetail } from "./ProjectDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpen, X } from "lucide-react";
 
interface ProjectData extends ProjectDetail {
  category: string;
  description: string;
  metric: string;
  status: string;
}
 
const PROJECTS: ProjectData[] = [
  {
    id: 4,
    name: "Sustainable Sundays",
    subtitle: "Community Impact & Donation Platform",
    heroImage: "/project/sustainable_sundays.png",
    paragraphs: [
      "Sustainable Sundays is a full-stack web platform built for a Bangalore-based environmental initiative to manage zero-waste community programs, volunteer signups, and automated payment gateway donations.",
      "Engineered with a Next.js App Router architecture featuring Razorpay payment integration, Upstash Redis distributed rate limiting, and strict UUID v4 idempotency validation.",
      "The platform eliminates payment duplicate risk, secures public forms against automated spam, and delivers a responsive 60fps WebGL-enhanced user interface."
    ],
    liveUrl: "coming-soon",
    category: "Community Impact & Climate Tech",
    description: "Community impact & donation platform managing zero-waste programs and automated payments.",
    metric: "0% Duplicate Risk",
    status: "Active"
  },
  {
    id: 1,
    name: "Whispering Pages",
    subtitle: "Conversational Voice AI Document Reader",
    heroImage: "/project/whispering pages .png",
    paragraphs: [
      "Whispering Pages is a conversational voice AI platform designed to transform static text documents into interactive, voice-driven experiences. By leveraging real-time WebRTC audio streaming, it allows users to ingest complex document text and engage in natural, two-way vocal Q&A with dynamic voice personas.",
      "The system delegates speech-to-speech routing to Vapi's edge engine paired with ElevenLabs TTS, maintaining stateful document context markers on MongoDB to eliminate processing bottlenecks and achieve sub-700ms voice response latency.",
      "Engineered with a focus on accessibility and rapid comprehension, Whispering Pages features real-time transcript synchronization, multi-provider fallback pipelines for continuous session uptime, and strict end-to-end type safety with Next.js 16 and TypeScript."
    ],
    liveUrl: "https://whispering-pages-kzpk.vercel.app/",
    codeUrl: "https://github.com/tarunlakra4302/Whispering-Pages",
    category: "Conversational Voice AI",
    description: "Real-time voice AI platform for interactive document Q&A and hands-free summarization.",
    metric: "< 700ms latency",
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
      "Inertia delivers visual reporting and event tracking at scale. Processing over 140 million events per second, it filters, aggregates, and transforms raw clickstreams into actionable insights in real-time.",
      "Utilizing web worker multi-threading and optimized WebGL canvases, Inertia renders complex user interaction heatmaps and conversion funnels with smooth 60fps performance directly in the client browser.",
      "Integrate Inertia into any application with a single-line script, and start tracking user behaviors, session replays, and custom event metrics with privacy-first data anonymization."
    ],
    codeUrl: "https://github.com/tarunlakra4302/Inertia-Equity-Risk-Intelligence-Platform",
    category: "Data Processing",
    description: "Visual reporting pipeline for deep user interaction and performance tracking.",
    metric: "140M events/sec",
    status: "Processing"
  }
];
 
export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const scrollPosRef = React.useRef<number>(0);
 
  const activeProject = PROJECTS[activeIndex];
 
  // Screen size listener for mobile slideshow
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Automatic slideshow on small screens
  useEffect(() => {
    if (!isSmallScreen || viewMode !== "list") return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % PROJECTS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isSmallScreen, viewMode]);

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
            {/* Top Right Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("list");
              }}
              className="detail-close-btn"
              aria-label="Close detail view"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

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
                  {activeProject.name === "Sustainable Sundays" || activeProject.liveUrl === "coming-soon" ? (
                    <button
                      disabled
                      className="btn-primary opacity-70 cursor-not-allowed bg-zinc-200 text-zinc-600 hover:scale-100"
                    >
                      <span>Coming Soon</span>
                    </button>
                  ) : activeProject.liveUrl ? (
                    <motion.a
                      href={activeProject.liveUrl}
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
                  ) : null}
 
                  {activeProject.codeUrl && (
                    <motion.a
                      href={activeProject.codeUrl}
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
                  )}
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
                <AnimatePresence>
                  <motion.div 
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                    className={`card-bg-image ${activeProject.name === "Sustainable Sundays" ? "card-bg-image--inset" : ""}`} 
                    style={{ backgroundImage: `url("${encodeURI(activeProject.heroImage)}")` }}
                  />
                </AnimatePresence>
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
                          {isActive && (
                            <motion.span
                              layoutId="active-indicator-dot"
                              transition={{ type: "spring", stiffness: 380, damping: 26 }}
                              className="active-indicator"
                            >
                              {" "}·
                            </motion.span>
                          )}
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
