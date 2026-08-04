"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SterlingNavigation from "../components/SterlingNavigation";
import { Footer } from "@/components/layout/Footer";
import BlurReveal from "@/components/ui/blur-reveal";
import { SpiderVerseGlitchButton } from "@/components/ui/spider-verse-glitch-button";

interface TechStackCategorized {
  frontend: string;
  backend: string;
  aiAudio: string;
  dataAuth: string;
}

interface ADRRecord {
  context: string;
  decision: string;
  alternatives: string;
  consequencesPros: string;
  consequencesCons: string;
}

interface OperationalMetrics {
  latency: string;
  resilience: string;
  velocity: string;
}

interface CaseStudyDetails {
  companyLabel?: string;
  company: string;
  role: string;
  type: string;
  tech: string;
  problem: string;
  solution: string;
  architecture: string;
  impact: string;
  techStackCategorized?: TechStackCategorized;
  adr?: ADRRecord;
  operationalMetrics?: OperationalMetrics;
  achievements: {
    number: string;
    label: string;
    description: string;
  }[];
}

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
  caseStudy?: CaseStudyDetails;
}

const DEFAULT_CASE_STUDY: CaseStudyDetails = {
  company: "self-initiated / r&d",
  role: "full-stack web application developer & ui/ux designer",
  type: "web application",
  tech: "next.js 16, react 19, typescript, tailwind css, node.js, vapi, elevenlabs, mongodb, clerk",
  problem: "static text documents lack interactive mechanisms for rapid comprehension, accessibility, and dynamic query-driven extraction.",
  solution: "built a web platform leveraging real-time WebRTC audio streaming to ingest document text and enable two-way vocal Q&A with dynamic voice personas.",
  architecture: "the primary architectural hurdle was maintaining sub-second audio turn-taking latency during multi-turn LLM inference and voice generation while processing large pdf payloads. the system delegates speech-to-speech routing to Vapi’s edge engine, maintaining stateful document context markers on mongodb to prevent pipeline bottlenecks.",
  impact: "reduced user document review times by enabling hands-free dynamic audio summarization and real-time transcript synchronization.",
  techStackCategorized: {
    frontend: "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI",
    backend: "Next.js Server Actions / API Routes, Node.js",
    aiAudio: "Vapi (WebSockets/WebRTC Voice Orchestration), ElevenLabs (TTS Engine)",
    dataAuth: "MongoDB, Mongoose, Clerk Authentication"
  },
  adr: {
    context: "Real-time audio latency requiring <800ms response times for conversational feel.",
    decision: "Integrated Vapi WebRTC orchestration for direct client-to-engine audio streaming.",
    alternatives: "Custom WebSockets pipeline with server-side buffer queuing.",
    consequencesPros: "Achieved sub-second voice latency; reduced backend CPU overhead.",
    consequencesCons: "Tight vendor coupling to external voice gateway API."
  },
  operationalMetrics: {
    latency: "Maintained sub-700ms end-to-end voice-to-voice response latency via edge audio routing.",
    resilience: "Implemented fallback TTS voice pipelines to sustain session stability during provider outages.",
    velocity: "Standardized API contracts using TypeScript and strict schemas, achieving 100% type safety across audio state management."
  },
  achievements: [
    {
      number: "< 700 ms",
      label: "voice latency (end-to-end)",
      description: "achieved sub-second end-to-end voice-to-voice response latency via edge audio routing."
    },
    {
      number: "100%",
      label: "type safety achieved",
      description: "achieved 100% type safety across audio state management by standardizing api contracts with typescript and strict schemas."
    },
    {
      number: "2+ (providers)",
      label: "fallback providers integrated",
      description: "implemented multi-provider fallback pipelines (elevenlabs, vapi) for session stability and minimal service interruption."
    }
  ]
};

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
    liveUrl: "https://github.com/tarunlakra4302",
    category: "Community Impact & Climate Tech",
    description: "Community impact & donation platform managing zero-waste programs and automated payments.",
    metric: "0% Duplicate Risk",
    status: "Active",
    year: "2026",
    caseStudy: {
      companyLabel: "ngo",
      company: "sustainable sundays (bangalore)",
      role: "full-stack web application developer & system architect",
      type: "community impact & donation platform",
      tech: "next.js 16, react 19, typescript, tailwind css v4, razorpay sdk, upstash redis, zod, gsap, three.js",
      problem: "manual onboarding and unverified donation workflows created operational overhead and exposed payment endpoints to traffic abuse during public campaigns.",
      solution: "engineered a Next.js App Router platform featuring Razorpay payment integration, Upstash Redis distributed rate limiting, and strict UUID v4 idempotency validation.",
      architecture: "the system employs serverless Next.js API routes coupled with edge Redis caching to maintain fast payload verification and transactional safety. the primary engineering challenge was orchestrating complex WebGL and GSAP scroll transitions at a constant 60fps budget while strictly validating incoming financial transaction payloads.",
      impact: "eliminated payment duplicate risk, secured public forms against automated spam, and delivered a responsive 60fps WebGL-enhanced user interface.",
      techStackCategorized: {
        frontend: "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP, Three.js / React Three Fiber, Framer Motion",
        backend: "Next.js API Routes, Razorpay SDK, Google APIs, Zod",
        aiAudio: "Sliding-window Rate Limiting & Key-Value Store",
        dataAuth: "Upstash Redis, Vercel"
      },
      adr: {
        context: "Prevent double-charging and duplicate form submissions across serverless lambdas.",
        decision: "Distributed Redis Idempotency Keys (UUID v4) with 24-hour TTL.",
        alternatives: "1. In-memory Node.js state (resets on lambda lifecycle)\n2. Relational DB locks",
        consequencesPros: "Low latency (~5ms) edge lookup, zero DB schema lock contention.",
        consequencesCons: "Hard dependency on Upstash Redis availability."
      },
      operationalMetrics: {
        latency: "Zero Payment Duplication: Guaranteed 100% idempotent transaction processing using Redis-backed UUID v4 key matching on payment routes.",
        resilience: "Automated Bot Mitigation: Restricted endpoint abuse via IP-based sliding-window rate limiting set to 10 requests per 60 seconds.",
        velocity: "Rendering & Type Safety: Maintained target 60fps frame rate during WebGL transitions and validated 100% of API payloads via Zod schemas."
      },
      achievements: [
        {
          number: "100%",
          label: "idempotency guaranteed",
          description: "guaranteed 100% idempotent transaction processing using redis-backed uuid v4 key matching on payment routes."
        },
        {
          number: "10 req/60s",
          label: "sliding-window rate limit",
          description: "restricted endpoint abuse via ip-based sliding-window rate limiting."
        },
        {
          number: "60 fps",
          label: "rendering efficiency",
          description: "maintained target 60fps frame rate during scroll-driven webgl shader transitions and gsap timelines."
        }
      ]
    }
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
    status: "Active",
    year: "2026",
    caseStudy: DEFAULT_CASE_STUDY
  },
  {
    id: 2,
    name: "Aetheris",
    subtitle: "AI Architectural Visualization SaaS",
    heroImage: "/project/aetheris.png",
    paragraphs: [
      "Aetheris: An AI-driven architectural visualization platform that transforms 2D floor plans into photorealistic 3D interior renders for architects and interior designers.",
      "Engineered a full-stack Web application leveraging React 19, React Router v7, and Puter cloud serverless Workers to automate 2D-to-3D rendering via generative AI models (Claude and Gemini).",
      "Offloaded database and file hosting overhead to edge key-value storage and cloud workers, enabling persistent media asset hosting and zero-infrastructure server deployment."
    ],
    liveUrl: "https://aetheris-spatial-orchestration-engi.vercel.app/",
    codeUrl: "https://github.com/tarunlakra4302/Aetheris-Spatial-Orchestration-Engine",
    category: "AI Spatial Visualization",
    description: "AI-driven architectural visualization platform automating 2D-to-3D photorealistic interior renders.",
    metric: "0 DB cost",
    status: "Active",
    year: "2025",
    caseStudy: {
      company: "freelance",
      role: "full-stack web application developer & system architect",
      type: "ai architectural visualization saas",
      tech: "react 19, react router v7, typescript, tailwind css v4, puter cloud kv, claude, gemini, zod",
      problem: "manual conversion of 2D architectural sketches into high-fidelity 3D visual concepts is slow, creating latency in iterative client feedback loops.",
      solution: "engineered a full-stack Web application leveraging React 19, React Router v7, and Puter cloud serverless Workers to automate 2D-to-3D rendering via generative AI models (Claude and Gemini).",
      architecture: "the architecture decouples client UI state management from backend AI inference pipelines by connecting React Router v7 API actions to Puter serverless workers and edge KV storage. the primary technical hurdle was efficiently handling large base64 image payloads and maintaining state synchronization between server-side file fallbacks and cloud key-value stores without incurring performance degradation.",
      impact: "offloaded database and file hosting overhead to edge key-value storage and cloud workers, enabling persistent media asset hosting and zero-infrastructure server deployment.",
      techStackCategorized: {
        frontend: "React 19, React Router v7, TypeScript, TailwindCSS v4, Lucide React, Shaders React",
        backend: "Node.js, React Router Server Actions, Puter Serverless Workers",
        aiAudio: "Puter Cloud OS, Docker, Vite (Claude & Gemini Generative AI Pipelines)",
        dataAuth: "Puter Key-Value Store, Server-side File/Base64 Storage System, Zod Validation"
      },
      adr: {
        context: "Need fast key-value metadata persistence and public asset hosting without managing server clusters.",
        decision: "Implemented Puter Cloud KV storage and Serverless Workers backed by a server-side file system fallback.",
        alternatives: "Provisioning a PostgreSQL database cluster alongside AWS S3 bucket storage.",
        consequencesPros: "Zero database operational overhead, sub-millisecond edge KV read speeds.",
        consequencesCons: "Coupled to Puter SDK abstractions and key-prefix querying limits."
      },
      operationalMetrics: {
        latency: "Zero Database Overhead: Replaced traditional relational database instances with edge key-value storage (aetheris_project_*), eliminating database provisioning and maintenance costs.",
        resilience: "Storage Resiliency: Implemented failover handling that safely converts base64 image streams into localized server disk storage (/uploads/projects/) when cloud API limits are reached.",
        velocity: "End-to-End Type Safety: Enforced full type integrity across client components, backend endpoints, and schema transformations using TypeScript 5.9 and Zod schemas."
      },
      achievements: [
        {
          number: "$0",
          label: "database operational cost",
          description: "replaced traditional SQL database instances with edge key-value storage."
        },
        {
          number: "< 1 ms",
          label: "edge KV read latency",
          description: "achieved sub-millisecond key-value metadata reads backed by cloud workers."
        },
        {
          number: "100%",
          label: "storage failover resilience",
          description: "automatic failover from cloud KV to server disk storage for base64 media."
        }
      ]
    }
  },
  {
    id: 3,
    name: "Inertia",
    subtitle: "Institutional Market Data & Risk Engine",
    heroImage: "/project/Inertia.png",
    paragraphs: [
      "An institutional market data orchestration platform and risk engine designed for systematic traders to track financial assets, compute alpha signals, and process automated market summaries.",
      "The engine leverages Next.js 15 App Router architecture with Domain-Driven Design (DDD) principles to decouple core signal scoring and risk calculation models from web transport layers.",
      "By delegating multi-step AI summary generation and scheduled email deliveries to asynchronous Inngest background event queues, the platform keeps primary client action response times sub-100ms."
    ],
    codeUrl: "https://github.com/tarunlakra4302/Inertia-Equity-Risk-Intelligence-Platform",
    category: "Data Processing",
    description: "Institutional market data orchestration platform and risk engine.",
    metric: "sub-100ms response",
    status: "Processing",
    year: "2025",
    caseStudy: {
      company: "self-initiated / fintech",
      role: "full-stack software engineer & system architect",
      type: "financial analytics platform",
      tech: "next.js 15, react 19, typescript, tailwind css, inngest, mongodb, zod, finnhub, better auth",
      problem: "fragmented financial data providers and synchronous API processing caused page rendering bottlenecks and risked database connection pool exhaustion in serverless environments.",
      solution: "implemented a Next.js 15 App Router architecture utilizing Domain-Driven Design (DDD) principles, decoupled Inngest background event workers, and strict Zod runtime schema validation.",
      architecture: "the architecture decouples core business logic (signal scoring and risk calculations) from framework transport layers using a Domain-Driven Design pattern. the primary technical hurdle was orchestrating multi-step AI summary generation and real-time market data ingestion without blocking client rendering pipelines or exceeding serverless execution timeouts.",
      impact: "achieved resilient serverless connection pooling via global database caching and eliminated blocking I/O on primary request routes by delegating heavy AI workflows to asynchronous background queues.",
      techStackCategorized: {
        frontend: "Next.js 15 (App Router, Turbopack), React 19, Zustand, Tailwind CSS, Radix UI, CMDK",
        backend: "Next.js Server Actions, Better Auth, Inngest (Workflow Orchestration), Nodemailer",
        aiAudio: "Serverless Node.js Runtime, Docker, Gemini 1.5 Flash (via Inngest step inference)",
        dataAuth: "MongoDB, Mongoose (Cached Adapter), Finnhub REST Gateway, Zod"
      },
      adr: {
        context: "Serverless Cold-Starts: Next.js serverless functions risked exhausting MongoDB pool limits during concurrent request spikes.",
        decision: "Implemented global Mongoose connection caching with strict 5-second timeouts (bufferCommands: false).",
        alternatives: "Re-establishing DB connections on every request; deploying a dedicated stateful server instance.",
        consequencesPros: "Prevents connection leaks and reduces database initialization overhead.",
        consequencesCons: "Requires explicit global connection state handling in dev HMR."
      },
      operationalMetrics: {
        latency: "Zero Connection Exhaustion: Eliminated redundant connection overhead across serverless route invocations via global connection state caching.",
        resilience: "Asynchronous Execution: Offloaded AI digest generation and scheduled email deliveries to Inngest background cron tasks, keeping client action responses sub-100ms.",
        velocity: "Schema Reliability: Enforced type-safe contracts with Zod across external financial API gateways, preventing runtime failures from malformed payload structures."
      },
      achievements: [
        {
          number: "< 100 ms",
          label: "client action response time",
          description: "offloaded heavy AI summaries and cron deliveries to asynchronous background event queues."
        },
        {
          number: "0 Leaks",
          label: "database pool exhaustion",
          description: "achieved zero connection leaks in serverless runtimes via global mongoose caching."
        },
        {
          number: "100%",
          label: "schema reliability",
          description: "enforced strict zod runtime schema validation across external financial data streams."
        }
      ]
    }
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hasOpenedProject, setHasOpenedProject] = useState(false);

  const handleSelectProject = (project: ProjectData) => {
    setHasOpenedProject(true);
    setSelectedProject(project);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex < PROJECTS.length - 1) {
      setSelectedProject(PROJECTS[currentIndex + 1]);
    }
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
                  key={`project-detail-${selectedProject.id}`}
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

                  {/* Detailed Case Study Section (Editorial Swiss Layout) */}
                  {(() => {
                    const cs = selectedProject.caseStudy || DEFAULT_CASE_STUDY;
                    return (
                      <div className="mt-6 mb-12 pt-8 border-t border-zinc-200/80 font-sans text-[#111111]">
                        <h2 className="text-2xl font-bold text-[#111111] mb-6 tracking-tight">
                          Engineering Architecture
                        </h2>

                        {/* Metadata Grid (4 Columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 border-y border-zinc-200/80 py-8 mb-12 bg-zinc-50/50 px-4 rounded-lg">
                          <div className="md:col-span-3 space-y-1">
                            <span className="text-xs font-mono text-zinc-400 block lowercase">[{cs.companyLabel || "company"}]</span>
                            <p className="font-bold text-sm md:text-base lowercase tracking-tight text-black">
                              {cs.company}
                            </p>
                          </div>

                          <div className="md:col-span-4 space-y-1">
                            <span className="text-xs font-mono text-zinc-400 block lowercase">[role]</span>
                            <p className="font-bold text-sm md:text-base lowercase tracking-tight text-black leading-snug">
                              {cs.role}
                            </p>
                          </div>

                          <div className="md:col-span-2 space-y-1">
                            <span className="text-xs font-mono text-zinc-400 block lowercase">[type]</span>
                            <p className="font-bold text-sm md:text-base lowercase tracking-tight text-black">
                              {cs.type}
                            </p>
                          </div>

                          <div className="md:col-span-3 space-y-1">
                            <span className="text-xs font-mono text-zinc-400 block lowercase">[tech]</span>
                            <p className="font-bold text-sm md:text-base lowercase tracking-tight text-black leading-snug">
                              {cs.tech}
                            </p>
                          </div>
                        </div>

                        {/* Labelled Narrative Sections (Vertically Aligned) */}
                        <div className="space-y-10 mb-14">
                          {/* Block 1: Problem */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
                            <div className="md:col-span-3">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[problem]</span>
                            </div>
                            <div className="md:col-span-9">
                              <p className="text-lg md:text-xl font-medium tracking-tight text-black leading-relaxed lowercase">
                                {cs.problem}
                              </p>
                            </div>
                          </div>

                          {/* Block 2: Solution */}
                          {cs.solution && (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
                              <div className="md:col-span-3">
                                <span className="text-xs font-mono text-zinc-400 block lowercase">[solution]</span>
                              </div>
                              <div className="md:col-span-9">
                                <p className="text-lg md:text-xl font-medium tracking-tight text-black leading-relaxed lowercase">
                                  {cs.solution}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Block 3: Architecture */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
                            <div className="md:col-span-3">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[architecture]</span>
                            </div>
                            <div className="md:col-span-9">
                              <p className="text-lg md:text-xl font-medium tracking-tight text-black leading-relaxed lowercase">
                                {cs.architecture}
                              </p>
                            </div>
                          </div>

                          {/* Block 4: Impact */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
                            <div className="md:col-span-3">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[impact]</span>
                            </div>
                            <div className="md:col-span-9">
                              <p className="text-lg md:text-xl font-medium tracking-tight text-black leading-relaxed lowercase">
                                {cs.impact}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Technology Stack (Categorized) */}
                        {cs.techStackCategorized && (
                          <div className="mb-14 pt-8 border-t border-zinc-200/80">
                            <div className="mb-6">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[technology stack]</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50/50 p-6 rounded-lg border border-zinc-100">
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[frontend]</span>
                                <p className="text-sm font-semibold text-black">{cs.techStackCategorized.frontend}</p>
                              </div>
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[backend &amp; api]</span>
                                <p className="text-sm font-semibold text-black">{cs.techStackCategorized.backend}</p>
                              </div>
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[ai &amp; audio engine]</span>
                                <p className="text-sm font-semibold text-black">{cs.techStackCategorized.aiAudio}</p>
                              </div>
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[data &amp; auth]</span>
                                <p className="text-sm font-semibold text-black">{cs.techStackCategorized.dataAuth}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Architecture Decision Record (ADR) */}
                        {cs.adr && (
                          <div className="mb-14 pt-8 border-t border-zinc-200/80">
                            <div className="mb-6">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[architecture decision record (adr)]</span>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-100 text-xs font-mono uppercase text-zinc-500 border-b border-zinc-200">
                                  <tr>
                                    <th className="py-3 px-4">Context / Constraint</th>
                                    <th className="py-3 px-4">Decision Made</th>
                                    <th className="py-3 px-4">Alternatives Rejected</th>
                                    <th className="py-3 px-4">Consequences (Pros / Cons)</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 text-zinc-800">
                                  <tr className="align-top">
                                    <td className="py-3.5 px-4 font-medium">{cs.adr.context}</td>
                                    <td className="py-3.5 px-4">{cs.adr.decision}</td>
                                    <td className="py-3.5 px-4 text-zinc-500">{cs.adr.alternatives}</td>
                                    <td className="py-3.5 px-4 space-y-1">
                                      <span className="block text-emerald-700 font-medium">✓ {cs.adr.consequencesPros}</span>
                                      <span className="block text-amber-700">⚠ {cs.adr.consequencesCons}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Operational Metrics & Outcomes */}
                        {cs.operationalMetrics && (
                          <div className="mb-14 pt-8 border-t border-zinc-200/80">
                            <div className="mb-6">
                              <span className="text-xs font-mono text-zinc-400 block lowercase">[operational outcomes]</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50/50 p-6 rounded-lg border border-zinc-100">
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[latency]</span>
                                <p className="text-sm text-zinc-800">{cs.operationalMetrics.latency}</p>
                              </div>
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[resilience]</span>
                                <p className="text-sm text-zinc-800">{cs.operationalMetrics.resilience}</p>
                              </div>
                              <div>
                                <span className="text-xs font-mono text-zinc-400 block mb-1">[developer velocity]</span>
                                <p className="text-sm text-zinc-800">{cs.operationalMetrics.velocity}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Achievements Section (Impact Metrics) */}
                        <div className="border-t border-zinc-200/80 pt-8 mb-4">
                          <div className="mb-8">
                            <span className="text-xs font-mono text-zinc-400 block lowercase">[achievements]</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {cs.achievements.map((item, idx) => (
                              <div key={idx} className="space-y-3 p-4 rounded-lg bg-zinc-50/50 border border-zinc-100">
                                <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
                                  {item.number}
                                </div>
                                <div className="text-sm leading-snug">
                                  <span className="font-bold text-black block lowercase mb-1">
                                    {item.label}
                                  </span>
                                  <span className="text-zinc-600 lowercase">
                                    {item.description}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

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

                  {/* Bottom Navigation with Next Button (Hidden on Last Project) */}
                  {selectedProject && PROJECTS.findIndex((p) => p.id === selectedProject.id) < PROJECTS.length - 1 && (
                    <div className="mt-14 pt-8 flex items-center gap-3">
                      <div className="flex-1 h-[1px] bg-[#d9267c]" />
                      <button
                        onClick={handleNextProject}
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
                          className="group flex items-center justify-between py-4 md:py-5 border-b border-zinc-100 cursor-pointer transition-all duration-300 hover:px-2 gap-4"
                        >
                          <div className="flex flex-col gap-1 min-w-0 flex-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#c2c2c2] font-semibold group-hover:text-black transition-colors duration-200">
                              {project.category}
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black group-hover:translate-x-1 transition-transform duration-300">
                              {project.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 ml-auto">
                            <div className="text-right hidden md:block">
                              <p className="text-sm font-medium text-black">{project.metric}</p>
                              <p className="text-xs text-[#c2c2c2]">{project.subtitle}</p>
                            </div>
                            <span className="text-sm font-bold text-zinc-400 group-hover:text-black transition-colors duration-200">
                              {project.year}
                            </span>
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300">
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
        resumeUrl="https://drive.google.com/file/d/1hZEg2OOxralKmsUK_2fWJ3sVvWwob4PN/view?usp=sharing"
        className="relative z-10 bg-white border-t border-zinc-100 text-black py-16"
      />
    </main>
  );
}

