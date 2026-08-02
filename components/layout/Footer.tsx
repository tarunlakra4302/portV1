"use client";

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePageNavigate } from '@/lib/view-transition'

interface FooterProps {
  email: string
  location: string
  linkedinUrl: string
  githubUrl: string
  resumeUrl: string
  instagramUrl?: string
  className?: string
}

export function Footer({
  email,
  location,
  linkedinUrl,
  githubUrl,
  resumeUrl,
  instagramUrl,
  className = ""
}: FooterProps) {
  // Use props or fallback to spec values
  const displayEmail = email || "lakra.tarun4302@gmail.com"
  const displayLocation = location || "New Delhi, India"
  const displayLinkedIn = linkedinUrl || "https://www.linkedin.com/in/tarun-lakra/"
  const displayGitHub = githubUrl || "https://github.com/tarunlakra4302"
  const displayInstagram = instagramUrl || "https://www.instagram.com/better_call_tarun?igsh=ZzFhaDI2c3o5OHVl"

  const navigateWithTransition = usePageNavigate()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === "/") {
      try {
        sessionStorage.setItem("animateHeroText", "true");
      } catch (err) {
        // ignore
      }
    }
    navigateWithTransition(href, 'rectangle', 'left-right')
  }

  const containerRef = useRef<HTMLSpanElement>(null)
  const [isExpandedMobile, setIsExpandedMobile] = React.useState(false)

  useGSAP(() => {
    if (!containerRef.current) return
    const hiddenChars = containerRef.current.querySelectorAll('.hidden-char')
    gsap.set(hiddenChars, { width: 0, opacity: 0 })

    // Automatically expand when scrolling into view on small screens
    if (window.innerWidth <= 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(hiddenChars, {
                width: 'auto',
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.05,
                overwrite: 'auto'
              })
              setIsExpandedMobile(true)
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, { scope: containerRef })

  const handleMouseEnter = () => {
    if (!containerRef.current) return
    const hiddenChars = containerRef.current.querySelectorAll('.hidden-char')
    gsap.to(hiddenChars, {
      width: 'auto',
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.05,
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    const hiddenChars = containerRef.current.querySelectorAll('.hidden-char')
    gsap.to(hiddenChars, {
      width: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      stagger: {
        each: 0.03,
        from: 'end'
      },
      overwrite: 'auto'
    })
  }

  const handleMobileClick = () => {
    if (!containerRef.current) return
    if (!isExpandedMobile) {
      handleMouseEnter()
      setIsExpandedMobile(true)
    } else {
      handleMouseLeave()
      setIsExpandedMobile(false)
    }
  }

  return (
    <footer className={`w-full !bg-[#0a0a0a] !text-[#f1f1ef] font-sans pt-16 pb-12 md:pt-20 md:pb-14 px-8 md:px-12 relative z-10 border-t-0 ${className}`}>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 w-full">
        
        {/* 1. Top Navigation Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 lg:gap-12 items-start">
          
          {/* Column 1 (Intro) - Increased font-size and weight to font-bold */}
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg md:text-xl font-bold leading-tight max-w-[280px]">
              Where <span className="text-[#d873cc] font-extrabold">aesthetics</span> & <br />
              <span className="text-[#4fd1f6] font-extrabold">functionality</span> meet
            </p>
          </div>

          {/* Column 2 (Explore) - Title Case & Increased weight to font-bold */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-[#fb923c] text-sm font-bold tracking-wide">Explore</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9ca3af]">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleNavClick(e, '/')}
                  className="hover:text-white font-bold transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  onClick={(e) => handleNavClick(e, '/about')}
                  className="hover:text-white font-bold transition-colors duration-200"
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="/projects" 
                  onClick={(e) => handleNavClick(e, '/projects')}
                  className="hover:text-white font-bold transition-colors duration-200"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (Follow Me) - Title Case & Increased weight to font-bold */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-[#4fd1f6] text-sm font-bold tracking-wide">Follow Me</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 text-sm text-[#9ca3af]">
              
              {/* LinkedIn (left) */}
              <a 
                href={displayLinkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white font-bold transition-colors duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0a66c2"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Spotify (right) */}
              <a 
                href="https://open.spotify.com/user/31ebwleozzuxi3m2ztx7aovcqxi4?si=f5726658e1c442a7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white font-bold transition-colors duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.847-.85 7.094-.501 9.743 1.148.299.199.399.549.199.85zm1.148-2.648c-.249.399-.748.549-1.148.299-2.748-1.701-6.943-2.2-10.24-1.201-.449.15-.899-.101-1.049-.55s.101-.899.55-1.049c3.847-1.148 8.593-.6 11.741 1.35.35.25.449.749.199 1.148zm.249-2.798c-3.197-1.9-8.543-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z" fill="#1ED760"/>
                </svg>
                <span>Spotify</span>
              </a>

              {/* Instagram (left) */}
              <a 
                href={displayInstagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white font-bold transition-colors duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E1306C"/>
                </svg>
                <span>Instagram</span>
              </a>

              {/* Discord (right) */}
              <a 
                href="https://discord.com/users/685535322091946106" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white font-bold transition-colors duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" fill="#5865f2"/>
                </svg>
                <span>Discord</span>
              </a>

              {/* GitHub (left) */}
              <a 
                href={displayGitHub} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white font-bold transition-colors duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" fill="#ffffff"/>
                </svg>
                <span>GitHub</span>
              </a>

            </div>
          </div>

          {/* Column 4 (Contact) */}
          <div className="flex flex-col gap-5 w-full md:items-end justify-start">
            
            {/* Top Block: Contact Me - Increased weight to font-bold */}
            <a 
              href="/contact" 
              onClick={(e) => handleNavClick(e, '/contact')}
              className="group flex items-center justify-between md:justify-end gap-5 w-full md:max-w-[240px] text-left md:text-right"
            >
              <div className="flex flex-col">
                <span className="text-white text-[15px] font-bold tracking-wide transition-colors duration-200">
                  Contact Me
                </span>
                <span className="text-[#6b7280] text-xs font-semibold mt-0.5">
                  Say Hello!
                </span>
              </div>
              {/* Arrow SVG points straight right (→) */}
              <div className="flex-shrink-0 w-[38px] h-[38px] rounded-full border border-neutral-800 flex items-center justify-center text-[#22c55e] group-hover:text-white group-hover:border-white transition-all duration-300">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
            
            {/* Horizontal Line Divider - Made darker/more subtle using bg-white/10 */}
            <div className="w-full md:max-w-[240px] h-[1px] bg-white/10" />
            
            {/* Bottom Block: Thoughts - Increased weight to font-bold */}
            <a 
              href="/thoughts" 
              onClick={(e) => handleNavClick(e, '/thoughts')}
              className="group flex items-center justify-between md:justify-end gap-5 w-full md:max-w-[240px] text-left md:text-right"
            >
              <div className="flex flex-col">
                <span className="text-white text-[15px] font-bold tracking-wide transition-colors duration-200">
                  Thoughts
                </span>
                <span className="text-[#6b7280] text-xs font-semibold mt-0.5">
                  Explore Thoughts
                </span>
              </div>
              {/* Arrow SVG points straight right (→) */}
              <div className="flex-shrink-0 w-[38px] h-[38px] rounded-full border border-neutral-800 flex items-center justify-center text-[#22c55e] group-hover:text-white group-hover:border-white transition-all duration-300">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>

          </div>
          
        </div>

        {/* 2. Bottom Text Section - strictly lowercase, ultra-wide heavy grotesque font, edge-to-edge width, flush vertical line-height */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMobileClick}
          className="w-full select-none overflow-hidden py-0 my-0 text-center flex items-center justify-center -mt-6 mb-8 cursor-pointer"
        >
          <span 
            ref={containerRef} 
            className="font-space-grotesk font-black text-[#fdfce9] inline-flex items-center justify-center leading-[0.7] tracking-tighter text-[7.2vw] sm:text-[9.2vw] md:text-[9.8vw] lg:text-[10vw] xl:text-[10.2vw] whitespace-nowrap lowercase"
          >
            <span>damn</span>
            <span className="hidden-char overflow-hidden opacity-0 inline-block">&nbsp;</span>
            <span>it</span>
            <span className="hidden-char overflow-hidden opacity-0 inline-block">,&nbsp;</span>
            <span>tarun</span>
            <span className="hidden-char overflow-hidden opacity-0 inline-block">!!</span>
          </span>
        </div>

        {/* 3. Bottom Legal Row - Bold weight and aligned to the container edges */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-[#e5e5e5] font-bold pt-2 border-t-0 w-full">
          <div className="text-center sm:text-left tracking-wide">
            Tarun Lakra ©2026 - Made with 🩶 and Strawberry Protein Lattes (120% sugar, less ice).
          </div>
          <div className="text-center sm:text-right tracking-wide">
            {displayLocation}
          </div>
        </div>

      </div>
    </footer>
  )
}
