"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-8 text-zinc-500 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
            Sandaruwan Bandara
          </span>
          <span className="text-zinc-400 dark:text-zinc-600"> / Systems Architect</span>
        </div>
        <div suppressHydrationWarning className="text-zinc-500 text-[11px]">
          © {new Date().getFullYear()} • High-Throughput & Fault-Tolerant Systems
        </div>
      </div>
    </footer>
  );
}
