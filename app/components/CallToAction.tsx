"use client";

import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { LiquidGlassViewport, LiquidGlassButton } from '@/components/ui/LiquidGlassButton';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CallToAction() {
  const [copied, setCopied] = useState(false);
  const email = "lakra.tarun4302@gmail.com";

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-12 sm:py-32 md:py-40 px-2 sm:px-4 bg-[#fafafa] min-h-screen min-h-[100dvh] sm:min-h-[50vh] font-serif overflow-hidden">
      <h2 className="text-center text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 max-w-5xl mb-10 sm:mb-12 px-3 leading-[1.15]">
        Ok, you&apos;ve scrolled this far, you must be<br className="hidden md:block" /> looking to do something now right?
      </h2>
      
      <div className="flex flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 w-full max-w-full px-3 sm:px-4">
        {/* Button 1: Email me */}
        <div className="h-[42px] sm:h-[46px] w-auto sm:w-[140px] flex-shrink-0">
          <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
            <LiquidGlassButton 
              onClick={handleCopyEmail}
              className="w-full h-full text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm py-0 px-3.5 sm:px-4 rounded-full flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>{copied ? "Copied!" : "Email me"}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" strokeWidth={2} />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={1.5} />
              )}
            </LiquidGlassButton>
          </LiquidGlassViewport>
        </div>

        {/* Button 2: Connect with me */}
        <div className="h-[42px] sm:h-[46px] w-auto sm:w-[190px] flex-shrink-0">
          <a
            href="https://www.linkedin.com/in/tarun-lakra/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
              <LiquidGlassButton className="w-full h-full text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm py-0 px-3.5 sm:px-4 rounded-full flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Connect with me</span>
              </LiquidGlassButton>
            </LiquidGlassViewport>
          </a>
        </div>

        {/* Button 3: Download resume */}
        <div className="h-[42px] sm:h-[46px] w-auto sm:w-[190px] flex-shrink-0">
          <a
            href="https://drive.google.com/file/d/1uCC1Iam4_oSYYWcFfTqVhdws5F_l-222/view"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
              <LiquidGlassButton className="w-full h-full text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm py-0 px-3.5 sm:px-4 rounded-full flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                <span>Download resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" strokeWidth={1.5} />
              </LiquidGlassButton>
            </LiquidGlassViewport>
          </a>
        </div>
      </div>
    </section>
  );
}
