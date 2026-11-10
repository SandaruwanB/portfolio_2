"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShieldCheck } from "./Icons";

const systems = [
  {
    icon: Cpu,
    title: "High-Throughput IoT Telemetry Pipeline",
    category: "Distributed Systems & Ingestion",
    highlight: "50,000+ msg/s with <15ms P99 latency",
    description: "Event-driven real-time telemetry streaming from edge sensor fleets into an asynchronous processing cluster.",
    tags: ["Java", "Apache Kafka", "Redis", "PostgreSQL"],
    href: "/products#iot-telemetry",
  },
  {
    icon: Layers,
    title: "Modular Enterprise Odoo ERP Architecture",
    category: "Enterprise Systems & Automation",
    highlight: "-62% order cycle time across 1,200+ users",
    description: "Decoupled multi-branch operational platform with custom business engines and outbox messaging.",
    tags: ["Odoo ERP", "Python", "RabbitMQ", "Microservices"],
    href: "/products#odoo-platform",
  },
  {
    icon: ShieldCheck,
    title: "Fault-Tolerant Distributed Transaction Engine",
    category: "Financial & High Concurrency",
    highlight: "99.995% uptime with strict ACID guarantees",
    description: "Idempotent payment and ledger pipeline orchestrated with Saga patterns and automated circuit breakers.",
    tags: ["Spring Boot", "Kafka", "TypeScript", "PostgreSQL"],
    href: "/products#transaction-engine",
  },
];

export default function FeaturedSystems() {
  return (
    <section className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Featured Systems & Architecture
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Production-proven platforms engineered for scale, reliability, and measurable business impact.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            <span>View all systems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {systems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>

                  <div className="text-[11px] font-mono text-zinc-500 mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium mb-2.5">
                    {item.highlight}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

