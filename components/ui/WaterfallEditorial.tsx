"use client";

import React from "react";

export default function WaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          the curve is not kind
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          in 1896 vilfredo pareto noticed that 80% of the land in italy was owned by 20% of the population. it wasn't a policy; it was a pattern. the same curve showed up in his garden: 20% of the pea pods produced 80% of the peas.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            1896: the shape that keeps returning
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          pareto started with land. then he looked at wealth, income, and industry. everywhere he measured, the distribution was not a gentle bell curve where most people gather near the average. it was a cliff. a tiny fraction held almost everything, while the vast majority shared what was left. the math didn't care about fairness.
        </p>
      </div>

      {/* 3. Blockquote (Indent: ml-6 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 pl-6 border-l-2 border-[#333333] max-w-[580px]">
        <p className="text-lg md:text-xl font-medium text-[#333333] leading-snug">
          "the vital few and the trivial many."
        </p>
        <span className="block mt-3 text-sm text-[#A3A3A3]">
          — joseph m. juran, 1951
        </span>
      </div>

      {/* 4. Section 02 (Indent: ml-12 md:ml-24) */}
      <div className="ml-8 sm:ml-16 md:ml-24 flex flex-col gap-3 max-w-[560px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            the average is a fiction
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          in a power law almost nothing sits near the mean. average income, average impact, average reach—these numbers describe a middle ground that barely exists. when power laws rule, the winners take nearly the entire market, the top features drive almost all engagement, and a handful of decisions shape the outcome of years.
        </p>
      </div>

      {/* 5. Section 03 (Indent: ml-18 md:ml-36) */}
      <div className="ml-12 sm:ml-24 md:ml-36 flex flex-col gap-3 max-w-[540px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">03</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            what i want you to keep
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          most of what you make is the long tail. it feels productive because it takes time, but it moves almost nothing. real leverage comes from recognizing which 20% actually matter—and having the courage to ignore the rest. the whole craft is choosing which few to become.
        </p>
      </div>
    </div>
  );
}
