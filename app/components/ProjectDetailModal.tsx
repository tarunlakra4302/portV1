"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectDetail {
  id: number | string;
  name: string;
  subtitle: string;
  heroImage: string;
  paragraphs: string[];
  liveUrl?: string;
  codeUrl?: string;
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetail | null;
}

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-[85vh] bg-[#0c0c0e] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col z-10 m-4"
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-all group duration-300"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:rotate-90 transition-transform duration-300"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto px-6 py-12 md:p-16 custom-scrollbar"
              data-lenis-prevent
            >
              <div className="max-w-3xl mx-auto flex flex-col">
                {/* 1. Main Title */}
                <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8">
                  {project.name}
                </h2>

                {/* 2. Hero Image */}
                <div className="w-full aspect-[16/9] mb-12 overflow-hidden rounded-[24px] md:rounded-3xl border border-white/5">
                  <img
                    src={project.heroImage}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* 3. Subtitle & Divider */}
                <div className="flex items-center gap-6 mb-8 w-full">
                  <span className="text-xl sm:text-2xl font-semibold text-white whitespace-nowrap">
                    {project.subtitle}
                  </span>
                  <div className="flex-1 h-[1px] bg-white/20" />
                </div>

                {/* 4. Description Paragraphs */}
                <div className="space-y-4 text-left text-gray-400 font-normal leading-[1.6] text-base md:text-lg">
                  {project.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* 5. Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4 items-center justify-start">
                  {/* Button 1: Live Preview */}
                  <a
                    href={project.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full md:rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-lg hover:shadow-white/5"
                  >
                    <span>Live Preview</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* Button 2: See Source Code */}
                  <a
                    href={project.codeUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0c0c0e]/50 text-white font-semibold text-sm px-6 py-3 rounded-full md:rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/25 active:scale-95 transition-all"
                  >
                    <span>See Source Code</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
