"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";
import SterlingNavigation from "../components/SterlingNavigation";
import { Footer } from "@/components/layout/Footer";
import BlurReveal from "@/components/ui/blur-reveal";
import { SpiderVerseGlitchButton } from "@/components/ui/spider-verse-glitch-button";
import ParetoChart from "@/components/ui/ParetoChart";
import WaterfallEditorial from "@/components/ui/WaterfallEditorial";
import LossAversionChart from "@/components/ui/LossAversionChart";
import LossWaterfallEditorial from "@/components/ui/LossWaterfallEditorial";
import VennDiagramChart from "@/components/ui/VennDiagramChart";
import VennWaterfallEditorial from "@/components/ui/VennWaterfallEditorial";
import ObserverEffectChart from "@/components/ui/ObserverEffectChart";
import ObserverWaterfallEditorial from "@/components/ui/ObserverWaterfallEditorial";
import TrustGameChart from "@/components/ui/TrustGameChart";
import TrustWaterfallEditorial from "@/components/ui/TrustWaterfallEditorial";
import DotParticleCanvas from "@/components/ui/dot-particles";
import EntropyWaterfallEditorial from "@/components/ui/EntropyWaterfallEditorial";

interface ArticleBlock {
  heading?: string;
  paragraphs?: string[];
  codeBlocks?: {
    caption?: string;
    codeHtml: string;
  }[];
  customComponent?: string;
}

interface ThoughtData {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  description?: string;
  metric: string;
  status: string;
  date: string;
  year: string;
  content: ArticleBlock[];
}

const THOUGHTS: ThoughtData[] = [
  {
    id: 1,
    name: "we expect world to share evenly",
    subtitle: "React Architecture",
    category: "React",
    description: "value is not shared evenly; it pools. a vital few carry almost everything, and the rest is a long, fiat, forgotten tail. the whole craft is choosing which few to become.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2026",
    content: [
      {
        paragraphs: [
          "value is not shared evenly; it pools. a vital few carry almost everything, and the rest is a long, fiat, forgotten tail. the whole craft is choosing which few to become."
        ]
      },
      {
        customComponent: "paretoChart"
      },
      {
        customComponent: "waterfallEditorial"
      }
    ]
  },
  {
    id: 2,
    name: "the asymmetry of loss",
    subtitle: "Risk & Decisions",
    category: "Mental Models",
    description: "losing is not the negative of gaining; it pulls twice the weight. kahneman measured it, i live it at every delete key, if i am to tear down what i built, i wait for my finger to tremble.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2024",
    content: [
      {
        paragraphs: [
          "losing is not the negative of gaining; it pulls twice the weight. kahneman measured it, i live it at every delete key, if i am to tear down what i built, i wait for my finger to tremble."
        ]
      },
      {
        customComponent: "lossAversionChart"
      },
      {
        customComponent: "lossWaterfallEditorial"
      }
    ]
  },
  {
    id: 3,
    name: "the dichotomy of mind",
    subtitle: "Mental Models",
    category: "Mental Models",
    description: "one mind, two lobes. both are me.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2022",
    content: [
      {
        paragraphs: [
          "one mind, two lobes. both are me."
        ]
      },
      {
        customComponent: "vennDiagramChart"
      },
      {
        customComponent: "vennWaterfallEditorial"
      }
    ]
  },
  {
    id: 4,
    name: "the observer's power",
    subtitle: "Mental Models",
    category: "Mental Models",
    description: "the system holds all errors and all truths simultaneously until i observe it. reality is a heap of possibilities pruned by the attention of a rational observer. i don't write code; i force probabilities into a single rational output.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2022",
    content: [
      {
        paragraphs: [
          "the system holds all errors and all truths simultaneously until i observe it. reality is a heap of possibilities pruned by the attention of a rational observer. i don't write code; i force probabilities into a single rational output."
        ]
      },
      {
        customComponent: "observerEffectChart"
      },
      {
        customComponent: "observerWaterfallEditorial"
      }
    ]
  },
  {
    id: 5,
    name: "the prisoner's dilema",
    subtitle: "Game Theory",
    category: "Game Theory",
    description: "trust is not a feeling; it is a strategy. in a single hand, betrayal wins — but i don't play single hands with anyone. if we're sitting at the same table again, the math changes. my rule is simple: i trust first. i do what you do. i hold no grudge.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2022",
    content: [
      {
        paragraphs: [
          "trust is not a feeling; it is a strategy. in a single hand, betrayal wins — but i don't play single hands with anyone. if we're sitting at the same table again, the math changes.",
          "my rule is simple: i trust first. i do what you do. i hold no grudge."
        ]
      },
      {
        customComponent: "trustGameChart"
      },
      {
        customComponent: "trustWaterfallEditorial"
      }
    ]
  },
  {
    id: 6,
    name: "the entropy of mind",
    subtitle: "2022 • Philosophy",
    category: "Philosophy",
    description: "order is not a state; it is an expense. it exists while you hold, and scatters when you go. behind every standing system, someone is paying the cost. i pay it gladly.",
    metric: "1 min read",
    status: "Published",
    date: "",
    year: "2022",
    content: [
      {
        paragraphs: [
          "order is not a state; it is an expense. it exists while you hold, and scatters when you go. behind every standing system,",
          "someone is paying the cost. i pay it gladly."
        ]
      },
      {
        customComponent: "dotParticles"
      },
      {
        customComponent: "entropyWaterfallEditorial"
      }
    ]
  }
];

export default function ThoughtsPage() {
  const [selectedThought, setSelectedThought] = useState<ThoughtData | null>(null);
  const [hasOpenedArticle, setHasOpenedArticle] = useState(false);

  const handleSelectThought = (thought: ThoughtData) => {
    setHasOpenedArticle(true);
    setSelectedThought(thought);
  };

  const handleNextThought = () => {
    if (!selectedThought) return;
    const currentIndex = THOUGHTS.findIndex((t) => t.id === selectedThought.id);
    const nextIndex = (currentIndex + 1) % THOUGHTS.length;
    setSelectedThought(THOUGHTS[nextIndex]);
  };

  // Scroll to top when selecting an article
  useEffect(() => {
    if (selectedThought) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedThought]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full min-h-screen bg-white text-black font-sans selection:bg-[#FFDE00] selection:text-black antialiased relative"
    >
      <SterlingNavigation />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 relative z-50">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          {/* Left Column Spacer */}
          <div className="col-span-12 md:col-span-4"></div>

          {/* Right Column: Content Container */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              {selectedThought ? (
                /* Article Detailed View - Exact Match to Reference UI */
                <motion.article
                  key={`article-detail-${selectedThought.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col w-full"
                >
                  {/* Top Bar with Back Button & Pink Line */}
                  <div className="flex items-center gap-3 mb-10">
                    <button
                      onClick={() => setSelectedThought(null)}
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

                  {/* Article Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#111111] tracking-[-0.03em] leading-[1.1]">
                    {selectedThought.name}
                  </h1>

                  {/* Article Date */}
                  <p className="mt-3 text-sm text-gray-500 font-normal">
                    {selectedThought.date}
                  </p>

                  {/* Article Body Sections */}
                  <div className="mt-10 flex flex-col">
                    {selectedThought.content.map((block, bIdx) => (
                      <div key={bIdx} className="mb-8">
                        {block.heading && (
                          <h2 className="text-2xl sm:text-[28px] font-bold text-[#111111] mt-4 mb-5 tracking-tight">
                            {block.heading}
                          </h2>
                        )}

                        {block.paragraphs &&
                          block.paragraphs.map((pText, pIdx) => (
                            <p
                              key={pIdx}
                              className="text-[15px] sm:text-[16px] text-[#333333] font-normal leading-[1.75] mb-5"
                              dangerouslySetInnerHTML={{
                                __html: pText.replace(/\*(.*?)\*/g, "<em>$1</em>")
                              }}
                            />
                          ))}

                        {block.codeBlocks &&
                          block.codeBlocks.map((cBlock, cIdx) => (
                            <div
                              key={cIdx}
                              className="my-5 p-4 md:p-5 rounded-lg bg-[#232530] text-white font-mono text-xs sm:text-sm overflow-x-auto shadow-xs border border-zinc-800/60 leading-relaxed"
                            >
                              <pre
                                className="whitespace-pre-wrap break-words"
                                dangerouslySetInnerHTML={{ __html: cBlock.codeHtml }}
                              />
                            </div>
                          ))}
                        {block.customComponent === "paretoChart" && (
                          <ParetoChart />
                        )}
                        {block.customComponent === "waterfallEditorial" && (
                          <WaterfallEditorial />
                        )}
                        {block.customComponent === "lossAversionChart" && (
                          <LossAversionChart />
                        )}
                        {block.customComponent === "lossWaterfallEditorial" && (
                          <LossWaterfallEditorial />
                        )}
                        {block.customComponent === "vennDiagramChart" && (
                          <VennDiagramChart />
                        )}
                        {block.customComponent === "vennWaterfallEditorial" && (
                          <VennWaterfallEditorial />
                        )}
                        {block.customComponent === "observerEffectChart" && (
                          <ObserverEffectChart />
                        )}
                        {block.customComponent === "observerWaterfallEditorial" && (
                          <ObserverWaterfallEditorial />
                        )}
                        {block.customComponent === "trustGameChart" && (
                          <TrustGameChart />
                        )}
                        {block.customComponent === "trustWaterfallEditorial" && (
                          <TrustWaterfallEditorial />
                        )}
                        {block.customComponent === "dotParticles" && (
                          <DotParticleCanvas />
                        )}
                        {block.customComponent === "entropyWaterfallEditorial" && (
                          <EntropyWaterfallEditorial />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Navigation with Next Button (Hidden on Last Thought) */}
                  {selectedThought && THOUGHTS.findIndex((t) => t.id === selectedThought.id) < THOUGHTS.length - 1 && (
                    <div className="mt-14 pt-8 flex items-center gap-3">
                      <div className="flex-1 h-[1px] bg-[#d9267c]" />
                      <button
                        onClick={handleNextThought}
                        className="flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0 outline-none"
                      >
                        <span className="text-[#d9267c] font-bold text-sm md:text-[15px]">
                          Next
                        </span>
                        <span className="w-[22px] h-[22px] rounded-[4px] bg-[#d9267c] flex items-center justify-center text-white text-[12px] font-bold shadow-xs transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  )}
                </motion.article>
              ) : (
                /* Thoughts Hero & List View */
                <motion.div
                  key="thoughts-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  {/* Massive Hero Typography */}
                  {hasOpenedArticle ? (
                    <div className="flex flex-col text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[0.85] select-none">
                      <span className="block text-[#c2c2c2]">
                        Welcome to my personal
                      </span>
                      <div className="flex flex-wrap items-center gap-x-3 text-black">
                        <span>thoughts</span>
                        <span className="relative inline-block z-50">
                          <span className="absolute -top-5 sm:-top-6 md:-top-8 lg:-top-9 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none z-50">
                            <DotLottieReact
                              src="https://lottie.host/6755c3e1-9f70-462e-b2d3-31c48ffe8576/Xajq2Qz19F.json"
                              loop
                              autoplay
                            />
                          </span>
                          <span>—</span>
                        </span>
                        <span>or, as I like to</span>
                      </div>
                      <div className="flex flex-wrap items-center text-[#c2c2c2] gap-x-3">
                        <span>call them, my</span>
                        <SpiderVerseGlitchButton
                          text="reflections"
                          className="relative inline-block text-black bg-[#FFDE00] px-3.5 py-1 rounded-sm transform -rotate-1 -skew-x-2 shadow-sm font-black"
                        >
                          reflections
                        </SpiderVerseGlitchButton>
                      </div>
                      <span className="block text-black">on code & life.</span>
                    </div>
                  ) : (
                    <div className="flex flex-col text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-[-0.04em] leading-[0.85] select-none">
                      <BlurReveal as="span" className="block text-[#c2c2c2]" delay={0.05}>
                        Welcome to my personal
                      </BlurReveal>
                      <div className="flex flex-wrap items-center gap-x-3 text-black">
                        <BlurReveal as="span" delay={0.1}>
                          thoughts
                        </BlurReveal>
                        <span className="relative inline-block z-50">
                          <span className="absolute -top-5 sm:-top-6 md:-top-8 lg:-top-9 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none z-50">
                            <DotLottieReact
                              src="https://lottie.host/6755c3e1-9f70-462e-b2d3-31c48ffe8576/Xajq2Qz19F.json"
                              loop
                              autoplay
                            />
                          </span>
                          <BlurReveal as="span" delay={0.12}>
                            —
                          </BlurReveal>
                        </span>
                        <BlurReveal as="span" delay={0.15}>
                          or, as I like to
                        </BlurReveal>
                      </div>
                      <div className="flex flex-wrap items-center text-[#c2c2c2] gap-x-3">
                        <BlurReveal as="span" delay={0.18}>
                          call them, my
                        </BlurReveal>
                        <SpiderVerseGlitchButton
                          text="reflections"
                          className="relative inline-block text-black bg-[#FFDE00] px-3.5 py-1 rounded-sm transform -rotate-1 -skew-x-2 shadow-sm font-black"
                        >
                          reflections
                        </SpiderVerseGlitchButton>
                      </div>
                      <BlurReveal as="span" className="block text-black" delay={0.22}>
                        on code & life.
                      </BlurReveal>
                    </div>
                  )}

                  {/* Thoughts List Section */}
                  <div className="mt-16 md:mt-24 flex flex-col divide-y divide-gray-200/80 border-t border-b border-gray-200/80">
                    {THOUGHTS.map((thought, index) => {
                      if (hasOpenedArticle) {
                        return (
                          <div
                            key={thought.id}
                            onClick={() => handleSelectThought(thought)}
                            className="group py-6 md:py-7 cursor-pointer transition-colors duration-200"
                          >
                            <div className="flex items-center justify-between gap-3 sm:gap-4">
                              <h3 className="text-lg sm:text-[19px] md:text-xl font-bold text-[#111111] shrink-0 tracking-tight">
                                {thought.name}
                              </h3>
                              <div className="flex-1 h-[1px] bg-[#d9267c] min-w-[20px]" />
                              <span className="text-xs sm:text-sm text-gray-500 font-normal shrink-0 whitespace-nowrap block">
                                {thought.date}
                              </span>
                            </div>
                            {thought.description && (
                              <div className="mt-2.5">
                                <p className="text-sm sm:text-[15px] text-gray-500 font-normal leading-relaxed">
                                  {thought.description}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      }

                      const itemBaseDelay = 0.15 + index * 0.03;
                      return (
                        <motion.div
                          key={thought.id}
                          onClick={() => handleSelectThought(thought)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: itemBaseDelay, duration: 0.3, ease: "easeOut" }}
                          className="group py-6 md:py-7 cursor-pointer transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between gap-3 sm:gap-4">
                            <BlurReveal
                              as="h3"
                              className="text-lg sm:text-[19px] md:text-xl font-bold text-[#111111] shrink-0 tracking-tight"
                              delay={itemBaseDelay}
                              speedReveal={3}
                              speedSegment={1}
                            >
                              {thought.name}
                            </BlurReveal>
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: itemBaseDelay + 0.03, duration: 0.3, ease: "easeOut" }}
                              className="flex-1 h-[1px] bg-[#d9267c] min-w-[20px] origin-left"
                            />
                            <BlurReveal
                              as="span"
                              className="text-xs sm:text-sm text-gray-500 font-normal shrink-0 whitespace-nowrap block"
                              delay={itemBaseDelay + 0.03}
                              speedReveal={3}
                              speedSegment={1}
                            >
                              {thought.date}
                            </BlurReveal>
                          </div>
                          {thought.description && (
                            <div className="mt-2.5">
                              <BlurReveal
                                as="p"
                                className="text-sm sm:text-[15px] text-gray-500 font-normal leading-relaxed"
                                delay={itemBaseDelay + 0.06}
                                speedReveal={3.5}
                                speedSegment={1.2}
                              >
                                {thought.description}
                              </BlurReveal>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
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
    </motion.main>
  );
}

