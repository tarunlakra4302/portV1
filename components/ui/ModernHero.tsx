"use client";

import React from 'react'
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

// Custom X (formerly Twitter) outline icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
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

// Custom Discord outline icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
)

interface ModernHeroProps {
  name?: string
  greeting?: string
  headline?: React.ReactNode
  email?: string
  linkedinUrl?: string
  githubUrl?: string
  twitterUrl?: string
  discordUrl?: string
  className?: string
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  name = 'Tarun Lakra',
  email = 'lakra.tarun4302@gmail.com',
  linkedinUrl = 'https://www.linkedin.com/in/tarun-lakra/',
  githubUrl = 'https://github.com/tarunlakra4302',
  twitterUrl = 'https://x.com',
  discordUrl = 'https://discord.com/users/685535322091946106',
  className = '',
}) => {
  // Common motion hover configuration for micro-interactions
  const iconMotionProps = {
    whileHover: { scale: 1.2, y: -3, rotate: 3 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 }
  }

  const navigateWithTransition = usePageNavigate()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    navigateWithTransition(href, 'rectangle', 'left-right')
  }

  return (
    <div
      className={`w-full max-w-4xl text-left font-serif text-[#111111] bg-white py-16 md:py-24 ${className}`}
    >
      {/* 2. Main Headline */}
      <h1 className="text-left text-3xl sm:text-4xl md:text-[40px] font-normal leading-[1.2] text-[#111111] max-w-3xl break-words w-full">
        I turn my frustrations and passions into{' '}
        <span className="font-bold">products that improve</span> how people work and interact
        with their lives. I{' '}
        <span className="italic border-b-[1.5px] border-pink-500 pb-0.5">simplify</span>.
        I humanize.
      </h1>

      <p className="mt-6 text-[16px] sm:text-[17px] leading-relaxed max-w-2xl text-gray-700">
        I&apos;m {name} — a Software Engineer who loves building things that solve problems, simplify workflows, and make people&apos;s lives easier. I enjoy translating complex requirements into simple, elegant digital experiences.
      </p>

      {/* 4. The Footer Row (Icons & Links) */}
      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-0">
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
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200 inline-block"
              aria-label="X (formerly Twitter)"
              {...iconMotionProps}
            >
              <XIcon className="w-5 h-5" strokeWidth={1.5} />
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
            href="/uses"
            onClick={(e) => handleNavClick(e, '/uses')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /uses
          </Link>
          <Link
            href="/stats"
            onClick={(e) => handleNavClick(e, '/stats')}
            className="hover:text-pink-500 transition-colors duration-200"
          >
            /stats
          </Link>
        </div>
      </div>
    </div>
  )
}


