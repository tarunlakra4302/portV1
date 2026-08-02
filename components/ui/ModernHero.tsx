"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePageNavigate } from '@/lib/view-transition'

// Custom LinkedIn outline icon
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

// Custom GitHub outline icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)


// Custom AtSign / Email outline icon
const AtSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
)

interface ModernHeroProps {
  name?: string
  greeting?: string
  headline?: React.ReactNode
  email?: string
  linkedinUrl?: string
  githubUrl?: string
  discordUrl?: string
  className?: string
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  name = 'Tarun Lakra',
  email = 'lakra.tarun4302@gmail.com',
  linkedinUrl = 'https://www.linkedin.com/in/tarun-lakra/',
  githubUrl = 'https://github.com/tarunlakra4302',
  className = '',
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("animateHeroText");
      if (flag === "true") {
        sessionStorage.removeItem("animateHeroText");
        setShouldAnimate(true);
      }
    } catch (e) {
      // ignore storage access errors
    }
  }, []);

  // Common motion hover configuration for micro-interactions
  const iconMotionProps = {
    whileHover: { scale: 1.2, y: -3, rotate: 3 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 }
  }

  const navigateWithTransition = usePageNavigate()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === "/") {
      try {
        sessionStorage.setItem("animateHeroText", "true");
      } catch (err) {}
    }
    navigateWithTransition(href, 'rectangle', 'left-right')
  }

  // Animation variants for staggered hero text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 32,
      filter: "blur(10px)",
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 280, 
        damping: 20 
      } 
    },
  };

  return (
    <motion.div
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      variants={containerVariants}
      className={`w-full max-w-4xl text-left font-serif text-[#111111] bg-white py-16 md:py-24 ${className}`}
    >
      {/* 2. Main Headline */}
      <h1 className="text-left text-3xl sm:text-4xl md:text-[40px] font-normal leading-[1.2] text-[#111111] max-w-3xl break-words w-full">
        <motion.span variants={wordVariants} className="inline">
          I turn my frustrations and passions into{" "}
        </motion.span>
        <motion.span variants={wordVariants} className="inline font-bold">
          products that improve{" "}
        </motion.span>
        <motion.span variants={wordVariants} className="inline">
          how people work and interact with their lives.{" "}
        </motion.span>
        <motion.span variants={wordVariants} className="inline-block whitespace-nowrap">
          I <span className="italic border-b-[1.5px] border-pink-500 pb-0.5">simplify</span>.
        </motion.span>
        <motion.span variants={wordVariants} className="inline">
          {" "}I humanize.
        </motion.span>
      </h1>

      <motion.p 
        variants={wordVariants}
        className="mt-6 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl text-gray-700"
      >
        I&apos;m {name} — a Software Engineer who loves building things that solve problems, simplify workflows, and make people&apos;s lives easier. I enjoy translating complex requirements into simple, elegant digital experiences.
      </motion.p>

      {/* 4. The Footer Row (Icons & Links) */}
      <motion.div 
        variants={wordVariants}
        className="mt-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-0"
      >
        {/* Left Side (Icons) */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-serif">More about me:</span>
          <div className="flex items-center gap-4 text-gray-700">
            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200 inline-block"
              aria-label="LinkedIn"
              {...iconMotionProps}
            >
              <LinkedinIcon className="w-5 h-5" strokeWidth={1.5} />
            </motion.a>
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200 inline-block"
              aria-label="GitHub"
              {...iconMotionProps}
            >
              <GithubIcon className="w-5 h-5" strokeWidth={1.5} />
            </motion.a>
            <motion.a
              href={`mailto:${email}`}
              className="hover:text-pink-500 transition-colors duration-200 inline-block"
              aria-label="Email"
              {...iconMotionProps}
            >
              <AtSignIcon className="w-5 h-5" strokeWidth={1.5} />
            </motion.a>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block border-l border-gray-300 mx-6 h-10 self-end" />

        {/* Right Side (Navigation Links) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5 font-sans text-sm text-gray-600 md:self-end">
          <Link
            href="/about"
            onClick={(e) => handleNavClick(e, '/about')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /about_Me
          </Link>
          <Link
            href="/projects"
            onClick={(e) => handleNavClick(e, '/projects')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /projects
          </Link>
          <Link
            href="/thoughts"
            onClick={(e) => handleNavClick(e, '/thoughts')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /thoughts
          </Link>
          <Link
            href="/stats"
            onClick={(e) => handleNavClick(e, '/stats')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /stats
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
