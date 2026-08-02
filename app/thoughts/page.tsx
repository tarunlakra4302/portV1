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

interface ArticleBlock {
  heading?: string;
  paragraphs?: string[];
  codeBlocks?: {
    caption?: string;
    codeHtml: string;
  }[];
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
    name: "React Under the Hood",
    subtitle: "February 28, 2026 • React Architecture",
    category: "React",
    description: "A deep dive into how React actually works behind the scenes, from JSX to the Virtual DOM, reconciliation, and the Fiber architecture.",
    metric: "8 min read",
    status: "Published",
    date: "February 28, 2026",
    year: "2026",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "If you're like me, you've probably been writing React for a while now, building components, managing state, passing props around, without really thinking about what's going on behind the curtain. And honestly, you don't *have* to know. React's API is nice enough that you can be productive without understanding its guts.",
          "But once you peek under the hood? It makes a lot of things click. Performance issues start making sense. Those weird \"rules of hooks\" finally have a reason. And honestly, it's just cool to see how it all works.",
          "So let's dig in."
        ]
      },
      {
        heading: "JSX is Just Syntactic Sugar",
        paragraphs: [
          "First things first. JSX is not HTML. I know it looks like it, but it's really just syntactic sugar for function calls.",
          "When you write this:"
        ],
        codeBlocks: [
          {
            codeHtml: `<span className="text-[#e5c07b]">const</span> <span className="text-[#e06c75]">element</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#e06c75]">&lt;h1</span> <span className="text-[#d19a66]">className</span><span className="text-[#56b6c2]">=</span><span className="text-[#98c379]">"greeting"</span>&gt;<span className="text-white">Hello, world!</span>&lt;/h1&gt;<span className="text-gray-400">;</span>`
          }
        ]
      },
      {
        paragraphs: [
          "Your compiler (SWC, OXC, Babel, whatever you're using) turns it into this:"
        ],
        codeBlocks: [
          {
            codeHtml: `<span className="text-[#e5c07b]">const</span> <span className="text-[#e06c75]">element</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#61afef]">React</span>.<span className="text-[#56b6c2]">createElement</span>(<span className="text-[#98c379]">'h1'</span>, { <span className="text-[#e06c75]">className</span><span className="text-[#56b6c2]">:</span> <span className="text-[#98c379]">'greeting'</span> }, <span className="text-[#98c379]">'Hello, world!'</span>)<span className="text-gray-400">;</span>`
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "How to merge an existing git repository into Turborepo",
    subtitle: "November 26, 2024 • Monorepo Tooling",
    category: "Git & Tooling",
    description: "A guide on how to merge any existing app or library into Turborepo.",
    metric: "4 min read",
    status: "Published",
    date: "November 26, 2024",
    year: "2024",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "When scaling projects in a monorepo, merging standalone git repositories while preserving full commit history can be tricky.",
          "Here is the step-by-step guide to seamlessly merging existing codebases into Turborepo using git subtree and remote commands."
        ]
      },
      {
        heading: "Step 1: Adding the Remote Repository",
        paragraphs: [
          "First, add your existing repository as a git remote:"
        ],
        codeBlocks: [
          {
            codeHtml: `<span className="text-[#61afef]">git</span> <span className="text-[#98c379]">remote add</span> <span className="text-[#e06c75]">existing-app</span> <span className="text-[#d19a66]">https://github.com/user/existing-app.git</span>`
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Publishing a component library with Storybook, TypeScript, and Tailwind",
    subtitle: "September 18, 2022 • Frontend Systems",
    category: "Design Systems",
    description: "A guide on how to publish your own custom React component library with Storybook, TypeScript, and Tailwind to NPM",
    metric: "6 min read",
    status: "Published",
    date: "September 18, 2022",
    year: "2022",
    content: [
      {
        heading: "Overview",
        paragraphs: [
          "Building a design system component library requires careful consideration for bundle size, TypeScript type exports, and Tailwind CSS isolation.",
          "In this guide we look into setting up Storybook for interactive documentation and tsup for zero-config bundling."
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Why does React need keys?",
    subtitle: "July 31, 2022 • React Concepts",
    category: "React",
    description: "This article will show you what is the purpose if the “key” prop in React and some best practices around it.",
    metric: "3 min read",
    status: "Published",
    date: "July 31, 2022",
    year: "2022",
    content: [
      {
        heading: "Understanding Identity in React",
        paragraphs: [
          "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.",
          "Without keys, React falls back to index-based comparison, causing subtle state bugs in dynamic lists."
        ]
      }
    ]
  },
  {
    id: 5,
    name: "How to merge a git repository into Nx",
    subtitle: "May 18, 2022 • Monorepos",
    category: "Nx Monorepo",
    description: "A guide on how to merge any existing app or library into a Nx monorepo.",
    metric: "5 min read",
    status: "Published",
    date: "May 18, 2022",
    year: "2022",
    content: [
      {
        heading: "Integrating with Nx",
        paragraphs: [
          "Nx workspace tools provide powerful monorepo generators. Learn how to import external projects without losing branch history."
        ]
      }
    ]
  },
  {
    id: 6,
    name: "JavaScript Promise and Async/Await",
    subtitle: "April 20, 2022 • JavaScript",
    category: "JavaScript",
    description: "A short visual guide on what a Promise is in JavaScript, and how to avoid call back hell.",
    metric: "4 min read",
    status: "Published",
    date: "April 20, 2022",
    year: "2022",
    content: [
      {
        heading: "Promises Under the Event Loop",
        paragraphs: [
          "Understanding microtasks vs macrotasks, asynchronous stack traces, and how async/await syntax unwraps promise execution."
        ]
      }
    ]
  },
  {
    id: 7,
    name: "How to type the setState function from the useState hook",
    subtitle: "April 14, 2022 • TypeScript",
    category: "TypeScript",
    metric: "2 min read",
    status: "Published",
    date: "April 14, 2022",
    year: "2022",
    content: [
      {
        heading: "Typing React State Dispatchers",
        paragraphs: [
          "Use React.Dispatch<React.SetStateAction<T>> when passing state dispatch functions as component props in TypeScript."
        ]
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

  // Scroll to top when selecting an article
  useEffect(() => {
    if (selectedThought) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedThought]);

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans selection:bg-[#FFDE00] selection:text-black antialiased relative">
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
                  key="article-detail"
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
                      </div>
                    ))}
                  </div>
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
                      <BlurReveal as="span" className="block text-[#c2c2c2]" delay={0.1}>
                        Welcome to my personal
                      </BlurReveal>
                      <div className="flex flex-wrap items-center gap-x-3 text-black">
                        <BlurReveal as="span" delay={0.25}>
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
                          <BlurReveal as="span" delay={0.3}>
                            —
                          </BlurReveal>
                        </span>
                        <BlurReveal as="span" delay={0.35}>
                          or, as I like to
                        </BlurReveal>
                      </div>
                      <div className="flex flex-wrap items-center text-[#c2c2c2] gap-x-3">
                        <BlurReveal as="span" delay={0.4}>
                          call them, my
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

                      const itemBaseDelay = 0.9 + index * 0.06;
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
    </main>
  );
}

