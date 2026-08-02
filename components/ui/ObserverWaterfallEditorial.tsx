"use client";

import React from "react";

export default function ObserverWaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          to look is to touch
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          looking is not innocent. what is measured changes because it is measured.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            a photon at the double slit
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the most unsettling lesson of quantum physics: a photon changes its behavior when you watch which slit it passes through. what acts like a wave becomes a particle under observation. measurement is not a glance from outside; it is a touch upon the system.
        </p>
      </div>

      {/* 3. Section 02 (Indent: ml-4 sm:ml-8 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 flex flex-col gap-3 max-w-[580px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            the user who knows they are watched
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the same law operates in interfaces. a user who feels watched does not behave naturally; every behavior turned into a metric bends. whatever i choose to measure, i have tilted the product in that direction. measurement is not neutral; it is a choice — and i try to make that choice on the user's behalf, not against them.
        </p>
      </div>

      {/* 4. Section 03 (Indent: ml-8 sm:ml-16 md:ml-24) */}
      <div className="ml-8 sm:ml-16 md:ml-24 flex flex-col gap-3 max-w-[560px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">03</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            what i want you to keep
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          assume an observer while writing code, while writing words, even while living. i write clean code because i know someone will read it; even the possibility of a gaze corrects behavior. you cannot erase the observer — but you can choose which observer you live by.
        </p>
      </div>
    </div>
  );
}
