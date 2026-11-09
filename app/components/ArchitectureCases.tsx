"use client";

import React from "react";
import Link from "next/link";

const cases = [
  {
    title: "High-Throughput IoT Telemetry & Ingestion Pipeline",
    category: "IoT & Distributed Systems",
    summary:
      "Engineered an event-driven ingestion platform handling high-frequency sensor streams from IoT devices with sub-15ms latency.",
    architecture: "Edge Gateways → Asynchronous Vert.x Workers → Apache Kafka → Redis Buffer → Sharded PostgreSQL.",
    metrics: [
      { label: "Throughput", value: "50,000+ msg/s" },
      { label: "P99 Latency", value: "<15ms" },
      { label: "Reliability", value: "Zero Loss" },
    ],
    stack: ["Java", "Kafka", "Redis", "PostgreSQL", "Docker"],
  },
  {
    title: "Modular Enterprise ERP & Business Process Platform",
    category: "Enterprise ERP & Automation",
    summary:
      "Modernized a high-volume multi-branch operational core using custom Odoo ERP architecture and decoupled transactional microservices.",
    architecture: "Domain-Driven Design (DDD) → Decoupled Odoo Addons → Outbox Messaging → Asynchronous Reconciliation.",
    metrics: [
      { label: "Cycle Time", value: "-62%" },
      { label: "Active Scale", value: "1,200+ Users" },
      { label: "DB Locks", value: "Near Zero" },
    ],
    stack: ["Odoo", "Python", "Node.js", "PostgreSQL", "RabbitMQ"],
  },
  {
    title: "Fault-Tolerant Distributed Transaction Engine",
    category: "Financial & High Concurrency",
    summary:
      "Architected an idempotent transaction pipeline ensuring strict ACID guarantees and consistency across decoupled services.",
    architecture: "Saga Pattern Orchestration → Idempotency Hashing → Append-Only Ledger → Automated Circuit Breakers.",
    metrics: [
      { label: "Uptime", value: "99.995%" },
      { label: "Consistency", value: "100% ACID" },
      { label: "Race Conditions", value: "Zero" },
    ],
    stack: ["Java", "Spring Boot", "TypeScript", "Kafka", "PostgreSQL"],
  },
];

export default function ArchitectureCases() {
  return (
    <section id="work" className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Selected Architecture Work</h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Real-world systems engineered for scale, fault tolerance, and business impact.</p>
          </div>
          <Link
            href="/products"
            className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Explore all enterprise systems & products →
          </Link>
        </div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-zinc-500">{c.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map((tech) => (
                    <span key={tech} className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">{c.summary}</p>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/60 text-xs font-mono text-zinc-700 dark:text-zinc-300 mb-4">
                <span className="text-zinc-400 dark:text-zinc-500">Architecture: </span>
                <span>{c.architecture}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                {c.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-xs sm:text-sm font-semibold font-mono text-zinc-900 dark:text-white mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
