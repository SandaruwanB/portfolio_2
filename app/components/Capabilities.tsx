"use client";

import React from "react";
import Link from "next/link";

const stackGroups = [
  {
    category: "Languages & Runtimes",
    items: ["Java (JDK 17/21)", "Spring Boot", "Node.js", "TypeScript", "Python", "Android SDK"],
  },
  {
    category: "Distributed & Messaging",
    items: ["Apache Kafka", "RabbitMQ", "Redis (Pub/Sub & Cache)", "Microservices", "gRPC", "Event-Driven Arch"],
  },
  {
    category: "Enterprise & ERP",
    items: ["Odoo ERP Core", "Modular Plugin Systems", "Domain-Driven Design (DDD)", "Business Process Automation"],
  },
  {
    category: "Databases & Infrastructure",
    items: ["PostgreSQL (Query & Index Tuning)", "MongoDB", "Docker", "Linux Internals", "Prometheus / Grafana"],
  },
];

export default function Capabilities() {
  return (
    <section id="stack" className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Technical Stack</h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">Core technologies and frameworks I use in production.</p>
          </div>
          <Link
            href="/stack"
            className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Explore full technical matrix →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 shadow-xs"
            >
              <h3 className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                  >
                    {item}
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
