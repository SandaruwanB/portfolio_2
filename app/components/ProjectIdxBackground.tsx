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
      {/* 1. Top-Left / Hero Ambient Radiant Glow */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-br from-emerald-500/8 via-cyan-500/6 to-transparent dark:from-emerald-500/10 dark:via-cyan-500/8 dark:to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb1Y}px, 0)`,
        }}
      />

      {/* 3. Center-Right Ambient Glow */}
      <div
        className="absolute top-[45%] -right-28 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-bl from-indigo-500/6 via-purple-500/5 to-transparent dark:from-indigo-500/10 dark:via-purple-500/6 dark:to-transparent blur-[130px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb2Y}px, 0)`,
        }}
      />

      {/* 4. Bottom-Left Ambient Glow */}
      <div
        className="absolute bottom-0 left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/6 via-emerald-500/5 to-transparent dark:from-cyan-500/8 dark:via-emerald-500/6 dark:to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${orb3Y}px, 0)`,
        }}
      />
    </div>
  );
}

