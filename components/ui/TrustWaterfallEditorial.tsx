"use client";

import React from "react";

export default function TrustWaterfallEditorial() {
  return (
    <div className="w-full max-w-[900px] mx-auto py-16 md:py-24 flex flex-col gap-14 md:gap-16 font-sans text-left lowercase select-none">
      {/* 1. Intro (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <h2 className="text-2xl font-bold text-[#333333] tracking-tight">
          the mathematics of trust
        </h2>
        <p className="text-base text-[#737373] leading-relaxed">
          two prisoners, two separate cells, one question: will you trust the other? game theory calls it a dilemma. i see the same question on the first day of every friendship, every bond.
        </p>
      </div>

      {/* 2. Section 01 (No indent) */}
      <div className="flex flex-col gap-3 max-w-[600px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">01</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            1950: two cells, one table
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          the game was built at rand by merrill flood and melvin dresher; albert tucker gave it its story. two prisoners, two separate cells: talking looks like winning. since both sides know it, both talk — and both lose. mathematics calls this an equilibrium; the mind calls it a trap. and in a single hand it is even right — why open up to someone you will never see again?
        </p>
      </div>

      {/* 3. Blockquote (Indent: ml-4 sm:ml-8 md:ml-12) */}
      <div className="ml-4 sm:ml-8 md:ml-12 flex flex-col max-w-[580px]">
        <blockquote className="border-l-2 border-[#333333] pl-6 py-1">
          <p className="text-lg md:text-xl text-[#333333] font-medium leading-snug tracking-tight">
            the foundation of cooperation is not really trust, but the durability of the relationship.
          </p>
          <cite className="block text-sm text-[#A3A3A3] font-normal not-italic mt-3">
            — robert axelrod, 1984
          </cite>
        </blockquote>
      </div>

      {/* 4. Section 02 (Indent: ml-8 sm:ml-16 md:ml-24) */}
      <div className="ml-8 sm:ml-16 md:ml-24 flex flex-col gap-3 max-w-[560px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">02</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            the four-line winner
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          in 1980 axelrod ran a tournament: which strategy wins the repeated dilemma? clever programs arrived from all over the world. the winner was anatol rapoport's four-line program: open with cooperation, then repeat the other's last move. nice, retaliatory, forgiving, readable. what won wasn't brilliance; it was consistency.
        </p>
      </div>

      {/* 5. Section 03 (Indent: ml-12 sm:ml-24 md:ml-36) */}
      <div className="ml-12 sm:ml-24 md:ml-36 flex flex-col gap-3 max-w-[540px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">03</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            trusting first
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          whoever begins open can be hurt. knowing this, i still open every first hand with trust, because nothing that begins closed ever weaves. if it isn't returned, i become a mirror — naivety is not a virtue. but i hold no grudge: the moment you come back, so do i. that is not forgetting; it is making the game possible again.
        </p>
      </div>

      {/* 6. Section 04 (Indent: ml-16 sm:ml-32 md:ml-48) */}
      <div className="ml-16 sm:ml-32 md:ml-48 flex flex-col gap-3 max-w-[520px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[#94A3B8] font-mono text-sm font-semibold">04</span>
          <span className="text-[#A3A3A3] text-sm font-medium">
            what the lines say
          </span>
        </div>
        <p className="text-base text-[#737373] leading-relaxed">
          life is not a single hand; we keep meeting the same people. every meeting either weaves or breaks, and years later what remains is not the decisions but the shape itself: who you wove with, who you broke from. i don't keep score — the shape is enough. trust is built not by words, but by repetition.
        </p>
      </div>
    </div>
  );
}
