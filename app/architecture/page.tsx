"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const caseStudies = [
  {
    id: "telemetry",
    tag: "CASE 01 // TELEMETRY & DISTRIBUTED INGESTION",
    title: "High-Throughput IoT Edge Telemetry & Ingestion Pipeline",
    domain: "IoT, Edge & Distributed Systems",
    summary:
      "A distributed, fault-tolerant telemetry platform built to ingest, validate, and process massive parallel streams of IoT sensor data with sub-15ms latency and zero packet loss.",
    challenge:
      "Legacy HTTP polling suffered from thread pool exhaustion and database connection bottlenecks during burst transmissions, resulting in dropped sensor telemetry and unindexed backlog spikes.",
    solution:
      "Re-architected the ingestion boundary using lightweight MQTT brokers and asynchronous non-blocking ingestion workers that stream into partitioned Apache Kafka topics. Buffered high-volume writes through Redis time-series cache before batch persisting to sharded PostgreSQL.",
    highlights: [
      "Asynchronous non-blocking event ingestion via Kafka partitioned topics",
      "Dynamic backpressure and dead-letter queue (DLQ) automated replay",
      "In-memory Redis cache layer for sub-5ms device state validation",
      "Idempotent event processing preventing duplicate telemetry writes",
    ],
    stack: ["Java", "Vert.x", "Apache Kafka", "Redis", "PostgreSQL", "Docker", "MQTT"],
    metrics: [
      { label: "Throughput Capacity", value: "50,000+ msg/sec" },
      { label: "P99 Ingestion Latency", value: "<15ms" },
      { label: "Data Drop Rate", value: "0.00%" },
      { label: "CPU Resource Savings", value: "48%" },
    ],
  },
  {
    id: "erp",
    tag: "CASE 02 // ENTERPRISE ARCHITECTURE",
    title: "Modular Enterprise ERP & Business Process Modernization",
    domain: "Enterprise ERP & Automation",
    summary:
      "Architecting a modular, decoupled ERP platform on top of Odoo and custom microservices to unify inventory, complex manufacturing billing, and automated multi-branch operations.",
    challenge:
      "A monolithic legacy architecture triggered severe database table locks during concurrent warehouse dispatches and month-end invoicing, creating severe latency for 8 regional branches.",
    solution:
      "Decoupled operational domains using Domain-Driven Design (DDD). Extracted heavy inventory reconciliations into an asynchronous worker queue, authored modular custom Odoo addons with strict bounded contexts, and synchronized master data via the Transactional Outbox pattern.",
    highlights: [
      "Modular plugin architecture with strict bounded contexts and API contracts",
      "Transactional Outbox pattern for reliable cross-system synchronization",
      "Optimistic locking and atomic inventory balance allocations",
      "Automated business approval workflows cutting manual paperwork loops",
    ],
    stack: ["Odoo ERP", "Python", "Node.js", "PostgreSQL", "Redis", "RabbitMQ", "REST APIs"],
    metrics: [
      { label: "Process Cycle Time", value: "-62%" },
      { label: "Concurrent Branch Users", value: "1,200+" },
      { label: "Month-End Billing Time", value: "Hours to Mins" },
      { label: "Database Lock Contention", value: "Near Zero" },
    ],
  },
  {
    id: "transaction",
    tag: "CASE 03 // RELIABILITY & FAULT-TOLERANCE",
    title: "Fault-Tolerant Distributed Transaction & Ledger Engine",
    domain: "Financial & High Concurrency",
    summary:
      "Architecting a high-concurrency transactional ledger engine that enforces strict ACID guarantees, idempotency, and automated compensation across distributed microservices.",
    challenge:
      "In distributed payment environments, network partitions and microservice failures risked duplicate transactions and inconsistent distributed states without an expensive distributed lock manager that would kill throughput.",
    solution:
      "Implemented an event-driven Saga pattern with compensating actions, cryptographic idempotency tokens on every transaction request, and an append-only immutable ledger. Configured multi-region active-active read replicas with write-optimized master sharding.",
    highlights: [
      "Orchestrated Saga workflow ensuring eventual consistency across microservices",
      "Idempotency token hashing preventing double-charge under network retries",
      "Append-only double-entry ledger architecture for complete auditability",
      "Automated health probes, circuit-breakers, and graceful service degradation",
    ],
    stack: ["Java (Spring Boot)", "Node.js / TypeScript", "Kafka", "PostgreSQL", "Docker", "Prometheus"],
    metrics: [
      { label: "Transaction Reconciliation", value: "100.0%" },
      { label: "System Availability", value: "99.995%" },
      { label: "Recovery Time (RTO)", value: "<30 sec" },
      { label: "Concurrency Scale", value: "Zero Race Conds" },
    ],
  },
];

export default function ArchitecturePage() {
  const [activeCaseId, setActiveCaseId] = useState<string>(caseStudies[0].id);
  const activeCase = caseStudies.find((c) => c.id === activeCaseId) || caseStudies[0];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                SYSTEM DESIGN ARCHIVE
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Architecture Case Studies
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Real-world distributed systems, modular ERP platforms, and fault-tolerant transaction pipelines engineered for production scale.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl">
              {caseStudies.map((study, idx) => (
                <button
                  key={study.id}
                  onClick={() => setActiveCaseId(study.id)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    activeCaseId === study.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Case 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 sm:p-8 lg:p-10 shadow-xs">

            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {activeCase.tag}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {activeCase.domain}
              </span>
            </div>

            <div className="py-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                {activeCase.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
                {activeCase.summary}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 border-y border-zinc-100 dark:border-zinc-800/80">
              <div className="space-y-2">
                <div className="text-xs font-mono text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  The Engineering Bottleneck
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {activeCase.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Architectural Solution
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>
            </div>

            <div className="py-6">
              <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
                KEY ARCHITECTURAL DECISIONS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeCase.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="text-emerald-500 font-mono mt-0.5">▪</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeCase.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/70">
                    <div className="text-[10px] font-mono text-zinc-500">{m.label}</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-zinc-900 dark:text-white mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-1.5 justify-start lg:justify-end">
                {activeCase.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <span>Have a similar architectural challenge? Let&apos;s talk</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

