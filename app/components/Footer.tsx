"use client";

import React from "react";
import { Coffee } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-8 text-zinc-500 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium font-sans">
              Sandaruwan Bandara
            </span>
            <span className="text-zinc-400 dark:text-zinc-600"> / Systems Architect</span>
          </div>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
          <div suppressHydrationWarning className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} • High-Throughput & Fault-Tolerant Systems
          </div>
        </div>

        <div>
          <a
            href="https://buymeacoffee.com/sandarusba5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFDD00] hover:bg-[#ffe338] text-black font-sans text-xs font-bold transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 group"
            title="Buy Me a Coffee"
          >
            <Coffee className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span className="tracking-tight">Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
