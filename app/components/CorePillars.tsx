"use client";

import React from "react";
import Link from "next/link";
import { Server, Layers, Zap, ArrowRight } from "./Icons";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    icon: Server,
    title: "Distributed Systems & Backends",
    description: "High-throughput, event-driven architectures engineered for zero data loss and low latency under peak concurrency.",
    bullets: ["Java & Node.js microservices", "Kafka & RabbitMQ stream processing", "Redis distributed caching & locks"],
  },
  {
    icon: Layers,
    title: "Modular Enterprise ERP",
    description: "Architecting clean domain boundaries, automated business workflows, and customized multi-branch ERP systems.",
    bullets: ["Custom Odoo core architecture", "Decoupled transactional microservices", "Domain-Driven Design (DDD)"],
  },
  {
    icon: Zap,
    title: "Tech Advisory & Automation",
    description: "Analyzing business workflows to guide modernization through custom software, IoT telemetry, and smart automation.",
    bullets: ["Workflow & bottleneck analysis", "IoT telemetry & sensor streams", "Scalable modernization roadmaps"],
  },
];

export default function CorePillars() {
  return (
    <section className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                What I Do
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Core architectural domains, backend engineering, and technical advisory.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <span>Discuss a project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 120} className="h-full">
                <div
                  className="h-full p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-between shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 mb-4">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-5">
                      {pillar.description}
                    </p>
                  </div>

                  <ul className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-xs bg-zinc-400 dark:bg-zinc-600 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
