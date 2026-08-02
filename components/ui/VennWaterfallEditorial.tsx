"use client";

import React from "react";

export default function VennWaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          two voices, one signature
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          there are two voices in my head: one makes the plan, the other burns it. my job is to keep them at the same table.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            a beautiful lie
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the story that the left brain is rational and the right brain emotional is a neurological myth; the brain does not split that way. but the myth survives because the metaphor is true: two forces really do negotiate inside us. i use this lie knowingly — even a wrong map can describe the right territory.
        </p>
      </div>

      {/* 3. Section 02 (Indent: ml-4 sm:ml-8 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 flex flex-col gap-3 max-w-[580px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            the voice of order, the voice of chaos
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          one draws boundaries, makes lists, cannot leave a thing unfinished. the other carries the silence of balıkesir, the anger of lost games, morning runs without a reason. for years i waited for one to defeat the other. then i realized: good work does not come from where the war ends — it comes from the front line.
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
          do not treat your inner contradiction as a bug to be fixed. the rational side gives the work its form, the emotional side gives it its reason. silence either one and you are left with a soulless machine or a scattered feeling. the signature is signed by both hands.
        </p>
      </div>
    </div>
  );
}
