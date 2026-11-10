"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const competencies = [
    "Distributed Systems",
    "Microservices (Java / Node)",
    "Odoo ERP & Plugins",
    "IoT Edge & AI",
    "C-Suite Tech Strategy",
    "High-Throughput Backends",
    "Fault-Tolerant Architecture",
    "Performance & DB Optimization",
  ];

  return (
    <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-0 lg:right-6 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-indigo-500/10 dark:from-cyan-500/15 dark:via-emerald-500/15 dark:to-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left z-20">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
              Architecting scalable, fault-tolerant systems.
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg font-normal">
              Principal Systems Engineer specializing in distributed backends, modular ERPs, and high-performance infrastructure. Turning complex bottlenecks into reliable systems.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href="/products"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Explore Products & Systems
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Initiate Consultation
              </Link>
              <a
                href="https://linkedin.com/in/sandaruwan-bandara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all shadow-xs"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-currentColor text-[#0a66c2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/SandaruwanB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all shadow-xs"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>

          </div>

          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end -mt-8 sm:-mt-14 lg:-mt-20 xl:-mt-24 pointer-events-none">
            <div className="relative w-full max-w-[440px] sm:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px]">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/15 via-cyan-500/10 to-transparent dark:from-emerald-500/20 dark:via-cyan-500/15 rounded-full blur-3xl scale-110 pointer-events-none" />
              <div
                className="relative w-full aspect-square"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              >
                <Image
                  src="/images/profile-transparent.png"
                  alt="Sandaruwan Bandara - Software Architect"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px"
                  className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>

            </div>
          </div>

        </div>

        <div className="mt-8 sm:mt-12 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
          <div
            className="w-full overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="animate-marquee flex items-center gap-3 select-none">
              {competencies.map((item, idx) => (
                <div
                  key={`loop-1-${idx}`}
                  className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-xs whitespace-nowrap hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-default"
                >
                  <span>{item}</span>
                </div>
              ))}
              {competencies.map((item, idx) => (
                <div
                  key={`loop-2-${idx}`}
                  className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-xs whitespace-nowrap hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-default"
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
