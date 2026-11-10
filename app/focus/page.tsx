"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Backend Engineering & Distributed Systems",
    subtitle: "High-Throughput • Microservices • Concurrency",
    description:
      "Architecting distributed microservice ecosystems with Java and Node.js. Designing event-driven communication (Kafka, RabbitMQ), non-blocking I/O, distributed consensus, and idempotent transaction patterns that resist failure under extreme load.",
    capabilities: [
      "Event-Driven Microservices (Kafka / RabbitMQ)",
      "Distributed Caching & Concurrency Control (Redis)",
      "High-Availability & Zero-Downtime Deployments",
      "Resilience Patterns: Circuit Breakers, Retries, Sagas",
    ],
  },
  {
    number: "02",
    title: "Enterprise Architecture & ERP Systems",
    subtitle: "Modular Architecture • Odoo ERP • Process Automation",
    description:
      "Turning bloated business processes and fragmented systems into unified, modular enterprise platforms. Extensive domain experience designing extensible plugin frameworks, custom Odoo ERP architectures, and decoupled operational workflows.",
    capabilities: [
      "Odoo ERP Customization & Core Module Architecture",
      "Modular Plugin Ecosystems & Extensibility",
      "Automated Multi-Entity Financial & Operations Workflows",
      "Domain-Driven Design (DDD) & Bounded Contexts",
    ],
  },
  {
    number: "03",
    title: "API Design, Performance & Database Optimization",
    subtitle: "Low Latency • Query Tuning • Sharding",
    description:
      "Deep query profiling, relational and document schema design, distributed indexing strategies, and high-performance API architectures (REST, gRPC, GraphQL). Eliminating N+1 queries and memory leaks before they reach production.",
    capabilities: [
      "PostgreSQL, MongoDB & Redis Storage Architecture",
      "Database Partitioning, Sharding & Index Engineering",
      "High-Performance gRPC & Type-Safe REST APIs",
      "Connection Pooling & Resource Bottleneck Elimination",
    ],
  },
  {
    number: "04",
    title: "Strategic Tech Advisory, IoT & AI Solutions",
    subtitle: "Business Technology Solutions • Hardware-to-Cloud • AI",
    description:
      "Bridging the gap between executive business strategy and hard technical execution. Providing C-suite advisory on how technical architecture directly impacts revenue, margins, and operational speed, alongside cutting-edge IoT telemetry & AI integrations.",
    capabilities: [
      "Executive Technology Advisory & Architecture Audits",
      "IoT Real-Time Telemetry & Edge Computing Streams",
      "AI Automation & Intelligent Data Pipelines",
      "Engineering Leadership, Benchmarks & Mentorship",
    ],
  },
];

export default function FocusPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              DISCIPLINES & EXPERTISE
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Focus Areas & Strategic Advisory
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Where high-performance software engineering meets pragmatic business strategy. Decoupling enterprise bottlenecks into resilient, scalable platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      [{pillar.number}]
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {pillar.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pillar.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <span className="text-emerald-500 font-mono">›</span>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-800 dark:text-zinc-300 hover:text-emerald-500 transition-colors"
                  >
                    <span>Discuss this discipline</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

