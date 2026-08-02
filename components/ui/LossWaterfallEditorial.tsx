"use client";

import React from "react";

export default function LossWaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          the gravity of loss
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          a gain and a loss of the same size do not pull equally. loss is always twice as heavy.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            kahneman's scale
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          kahneman and tversky measured it: the pain of a loss is roughly twice as intense as the joy of an equal gain. flip a coin: win 150, lose 100. the math says play; the gut says don't. that gut is not broken — it was simply calibrated for another age.
        </p>
      </div>

      {/* 3. Section 02 (Indent: ml-6 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 flex flex-col gap-3 max-w-[580px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            a gain is an event, a loss is a state
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the joy of a gain is a spike; you celebrate and return to your baseline. loss is different: the reference point itself moves down, and your old level hangs there as a ghost line you can no longer reach. the projects i deleted, the games i lost — they are all still hanging there. time does not erase that line; it only teaches you to look at it.
        </p>
      </div>

      {/* 4. Section 03 (Indent: ml-12 md:ml-24) */}
      <div className="ml-8 sm:ml-16 md:ml-24 flex flex-col gap-3 max-w-[560px]">
        <div className="flex items-center gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">03</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            what i want you to keep
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the fear of loss decides quietly: we cling to sunk costs, stay in bad jobs, cannot delete dead code. i work by accepting the asymmetry — i design for reversibility, lose small, delete early. and i never let the user suffer an irreversible loss: the undo button is not a feature, it is an act of mercy.
        </p>
      </div>
    </div>
  );
}
