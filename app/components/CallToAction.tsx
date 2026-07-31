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
    <section className="flex flex-col items-center justify-center py-32 md:py-40 px-4 bg-[#fafafa] min-h-[50vh] font-serif">
      <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 max-w-5xl mb-12">
        Ok, you've scrolled this far, you must be<br className="hidden md:block" /> looking to do something now right?
      </h2>
      
      <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        {/* Button 1: Email me */}
        <div className="w-[140px] h-[46px]">
          <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
            <LiquidGlassButton 
              onClick={handleCopyEmail}
              className="w-full h-full text-neutral-800 hover:text-black font-semibold text-sm py-0 px-0 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>{copied ? "Copied!" : "Email me"}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" strokeWidth={2} />
              ) : (
                <Copy className="w-4 h-4" strokeWidth={1.5} />
              )}
            </LiquidGlassButton>
          </LiquidGlassViewport>
        </div>

        {/* Button 2: Download resume */}
        <div className="w-[190px] h-[46px]">
          <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
            <LiquidGlassButton className="w-full h-full text-neutral-800 hover:text-black font-semibold text-sm py-0 px-0 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
              <span>Download resume</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </LiquidGlassButton>
          </LiquidGlassViewport>
        </div>

        {/* Button 3: Connect with me */}
        <div className="w-[190px] h-[46px]">
          <a
            href="https://www.linkedin.com/in/tarun-lakra/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <LiquidGlassViewport bgImage="" fallbackMode="blur" className="w-full h-full rounded-full bg-transparent overflow-visible">
              <LiquidGlassButton className="w-full h-full text-neutral-800 hover:text-black font-semibold text-sm py-0 px-0 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]">
                <LinkedinIcon className="w-4 h-4" />
                <span>Connect with me</span>
              </LiquidGlassButton>
            </LiquidGlassViewport>
          </a>
        </div>
      </div>
    </section>
  );
}
