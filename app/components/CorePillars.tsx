"use client";

import React from "react";
import Link from "next/link";

const focusAreas = [
  {
    title: "Distributed Systems & High-Throughput Backends",
    description:
      "Engineering resilient microservices with Java and Node.js. Designing event-driven streaming (Kafka/RabbitMQ), distributed caching, and zero-downtime architectures that scale under heavy load.",
    tags: ["Java / Spring", "Node.js", "Kafka", "Redis", "Microservices"],
  },
  {
    title: "Enterprise Architecture & ERP Automation",
    description:
      "Transforming complex business logic into modular, maintainable systems. Architecting custom Odoo ERP solutions, extensible plugin engines, and automated multi-branch operational workflows.",
    tags: ["Odoo ERP", "Modular Architectures", "Process Automation", "DDD"],
  },
  {
    title: "Strategic Tech Advisory, IoT & AI Solutions",
    description:
      "Advising C-suite leaders and founders on technology roadmaps, eliminating performance bottlenecks, and deploying real-time IoT hardware telemetry and intelligent data automation.",
    tags: ["Tech Advisory", "IoT Edge", "Bottleneck Audits", "AI Automation"],
  },
];

export default function CorePillars() {
  return (
    <section id="focus" className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Core Focus Areas</h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">What I architect and build for enterprise and technical teams.</p>
          </div>
          <Link
            href="/focus"
            className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Learn more about focus & advisory →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-2">0{idx + 1}</div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 leading-snug">
                  {area.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-5">
                  {area.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
