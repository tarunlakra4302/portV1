"use client";

import React from "react";

const stackData = [
  {
    category: "Development",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Node.js",
      "React Native",
      "ElectronJS",
      "TanStack",
      "Next.js",
    ],
  },
  {
    category: "Design",
    items: [
      "Figma",
      "Webflow",
      "After Effects",
    ],
  },
  {
    category: "AI & Workflows",
    items: [
      "LangChain",
      "Claude Code",
      "Gemini",
      "Codex",
      "MCP",
      "n8n",
    ],
  },
];

export default function TechStack() {
  return (
    <section className="w-full bg-white pt-4 md:pt-6 pb-16 md:pb-24 px-6 md:px-12 text-black font-sans relative z-30">
      <div className="max-w-6xl mx-auto border border-dashed border-black/15 rounded-2xl md:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-dashed divide-black/15">
        {/* Column 1: The Section Title */}
        <div className="p-8 md:p-10 flex flex-col justify-end min-h-[200px] md:min-h-0">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            Stack
          </h2>
        </div>

        {/* Columns 2, 3, 4: Stack Lists */}
        {stackData.map((col, idx) => (
          <div key={idx} className="p-8 md:p-10 flex flex-col">
            <span className="text-sm text-black/50 mb-6 font-medium">
              {col.category}
            </span>
            <ul className="flex flex-col gap-y-3">
              {col.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-center gap-2">
                  <span className="text-black/40 text-base font-normal">/</span>
                  <span className="text-black/90 text-base font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
