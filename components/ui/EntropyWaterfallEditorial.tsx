"use client";

import React from "react";

export default function EntropyWaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none md:-translate-x-[25%]">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          order is an expenditure
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          order is not natural. order is effort that has been paid for.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            the mind is an energy machine
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          karl friston's free energy principle says something simple but ruthless: the mind spends energy ceaselessly to minimize surprise and uncertainty. anything unexpected is an error, and the mind works to close it. the systems i build obey the same law — staying stable demands constant energy.
        </p>
      </div>

      {/* 3. Section 02 (Indent: ml-4 sm:ml-8 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 flex flex-col gap-3 max-w-[580px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            a temporary war against chaos
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          a flawless code architecture or a rational decision is a temporary front opened against the universe's natural chaos. entropy always returns; keeping an interface, an idea, or an order alive means continuously injecting energy against decay. the moment you cut the energy, the system reverts to its natural — that is, scattered — state.
        </p>
      </div>

      {/* 4. Section 03 (Indent: ml-8 sm:ml-16 md:ml-24) */}
      <div className="ml-8 sm:ml-16 md:ml-24 flex flex-col gap-3 max-w-[560px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">03</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            is the cost worth paying?
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          every order is a cost, but that cost is not meaningless. what i pay for is a clarity that reduces noise, sharpens the decision, and lightens the load on the user's mind. what we call aesthetics is often that cost made visible.
        </p>
      </div>
    </div>
  );
}
