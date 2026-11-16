"use client";

import React from "react";
import { Coffee } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-8 text-zinc-500 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div suppressHydrationWarning className="text-zinc-500 dark:text-zinc-400 text-xs font-mono text-center sm:text-left">
          © {new Date().getFullYear()} Sandaruwan Bandara. All rights reserved.
        </div>

        <div>
          <a
            href="https://buymeacoffee.com/sandarusba5"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFDD00] via-[#FFE234] to-[#FFDD00] text-zinc-950 font-sans text-xs font-bold transition-all duration-300 shadow-[0_4px_14px_rgba(255,221,0,0.35)] hover:shadow-[0_6px_22px_rgba(255,221,0,0.55)] hover:scale-[1.03] active:scale-95 border border-amber-300/80 group overflow-hidden"
            title="Support my engineering work on Buy Me a Coffee"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <Coffee className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-tight font-extrabold">Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
