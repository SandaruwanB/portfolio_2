"use client";

import React, { useEffect, useState } from "react";

export default function ProjectIdxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax translation offsets
  const orb1Y = scrollY * 0.15;
  const orb2Y = scrollY * -0.1;
  const orb3Y = scrollY * 0.08;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Base Technical Dot & Cross Grid (Project IDX Style) */}
      <div className="absolute inset-0 bg-idx-grid opacity-70 dark:opacity-60" />

      {/* 2. Top-Left / Hero Ambient Radiant Orb (Emerald / Cyan) */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-br from-emerald-500/12 via-cyan-500/10 to-transparent dark:from-emerald-500/16 dark:via-cyan-500/12 dark:to-transparent blur-[110px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb1Y}px, 0)`,
        }}
      />

      {/* 3. Center-Right Ambient Orb (Indigo / Violet - brightens as you scroll down) */}
      <div
        className="absolute top-[45%] -right-28 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-bl from-indigo-500/10 via-purple-500/8 to-transparent dark:from-indigo-500/15 dark:via-purple-500/10 dark:to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb2Y}px, 0)`,
        }}
      />

      {/* 4. Bottom-Left Consultation Ambient Orb (Teal / Sky) */}
      <div
        className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/8 to-transparent dark:from-cyan-500/14 dark:via-emerald-500/10 dark:to-transparent blur-[100px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb3Y}px, 0)`,
        }}
      />

      {/* 5. IDX Technical Axis & Watermark Accents (Faint Left/Right Lines with Technical Coordinates) */}
      <div className="hidden 2xl:block absolute top-0 bottom-0 left-8 w-px bg-zinc-200/50 dark:bg-zinc-800/40">
        <div className="sticky top-28 pl-2 space-y-36 text-[10px] font-mono text-zinc-400/60 dark:text-zinc-600/60 select-none">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 border border-current" />
            <span>SYS::01</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 border border-current" />
            <span>CORE::ARCH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 border border-current" />
            <span>SCALE::HIGH</span>
          </div>
        </div>
      </div>

      <div className="hidden 2xl:block absolute top-0 bottom-0 right-8 w-px bg-zinc-200/50 dark:bg-zinc-800/40">
        <div className="sticky top-32 pr-2 text-right space-y-40 text-[10px] font-mono text-zinc-400/60 dark:text-zinc-600/60 select-none">
          <div>LATENCY &lt; 15ms</div>
          <div>ACID CONSISTENT</div>
          <div>FAULT TOLERANT</div>
        </div>
      </div>
    </div>
  );
}

