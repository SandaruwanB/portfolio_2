"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight } from "../components/Icons";

interface Product {
  id: string;
  tag: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
}

const products: Product[] = [
  {
    id: "telemetry-engine",
    tag: "PRODUCT 01 // TELEMETRY & EDGE",
    title: "IoT Edge Telemetry & Ingestion Platform",
    category: "Hardware-to-Cloud & Distributed Streams",
    summary:
      "A high-throughput distributed ingestion engine designed to process massive parallel streams of IoT sensor data with sub-15ms P99 latency and zero packet loss.",
    features: [
      "Lightweight MQTT edge broker interfacing and bi-directional device command streams",
      "Asynchronous non-blocking workers streaming directly to partitioned Apache Kafka topics",
      "In-memory Redis state caching for sub-5ms device validation and heartbeat tracking",
      "Automated dead-letter queue (DLQ) replay and graceful backpressure under traffic spikes",
    ],
    metrics: [
      { label: "Throughput", value: "50,000+ msg/s" },
      { label: "P99 Latency", value: "<15ms" },
      { label: "Data Drop", value: "0.00%" },
    ],
    stack: ["Java", "Vert.x", "Kafka", "Redis", "PostgreSQL", "MQTT", "Docker"],
  },
  {
    id: "erp-core",
    tag: "PRODUCT 02 // ENTERPRISE ERP",
    title: "Modular Enterprise ERP & Automation Core",
    category: "Business Operations & Odoo Architecture",
    summary:
      "A decoupled, modular ERP platform built on top of customized Odoo architecture and distributed microservices to automate multi-branch inventory, manufacturing billing, and operations.",
    features: [
      "Custom Odoo ERP modular addons with strict bounded contexts and clean API contracts",
      "Transactional Outbox pattern for reliable cross-system master data synchronization",
      "Automated multi-department approval flows (Procurement, Inventory, Invoicing)",
      "Elimination of database lock contention during concurrent peak branch operations",
    ],
    metrics: [
      { label: "Cycle Time", value: "-62%" },
      { label: "Active Scale", value: "1,200+ Users" },
      { label: "DB Locks", value: "Near Zero" },
    ],
    stack: ["Odoo ERP", "Python", "Node.js", "PostgreSQL", "RabbitMQ", "REST APIs"],
  },
  {
    id: "transaction-engine",
    tag: "PRODUCT 03 // FAULT-TOLERANCE",
    title: "Distributed Transaction & Ledger Engine",
    category: "Financial & High Concurrency",
    summary:
      "A resilient transactional ledger engine enforcing strict ACID guarantees, idempotency, and automated compensation across distributed microservice nodes.",
    features: [
      "Orchestrated Saga workflow ensuring eventual consistency across decoupled microservices",
      "Cryptographic idempotency token hashing preventing double-charges under network retries",
      "Append-only double-entry ledger architecture for complete tamper-evident auditability",
      "Automated circuit breakers and multi-region active-active read replicas with write sharding",
    ],
    metrics: [
      { label: "Availability", value: "99.995%" },
      { label: "Consistency", value: "100% ACID" },
      { label: "Recovery Time", value: "<30 sec" },
    ],
    stack: ["Java (Spring Boot)", "TypeScript", "Kafka", "PostgreSQL", "Docker", "Prometheus"],
  },
  {
    id: "workflow-automator",
    tag: "PRODUCT 04 // PROCESS AUTOMATION",
    title: "Business Process Automation & Integration Hub",
    category: "Enterprise Solutions & Integration",
    summary:
      "A centralized integration middleware that unifies fragmented legacy systems, third-party APIs, and modern cloud backends into cohesive automated business workflows.",
    features: [
      "Event-driven workflow execution eliminating manual spreadsheet and data-entry loops",
      "Extensible plugin architecture enabling fast integration of third-party SaaS and payment gateways",
      "Real-time operational dashboard and audit logging for business stakeholders",
      "Role-based access control (RBAC) and enterprise security governance benchmarks",
    ],
    metrics: [
      { label: "Efficiency", value: "+75%" },
      { label: "Human Error", value: "Eliminated" },
      { label: "Integration", value: "Plug & Play" },
    ],
    stack: ["Node.js", "TypeScript", "Redis", "PostgreSQL", "Docker", "REST / gRPC"],
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              SOLUTIONS & PLATFORMS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Enterprise Products & Architectures
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Production-grade systems, modular ERP platforms, and distributed telemetry architectures designed to scale reliably under load.
            </p>
          </div>
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {product.tag}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {product.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    {product.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl mb-5">
                    {product.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                      Key Capabilities:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <span className="text-emerald-500 font-mono mt-0.5">›</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 flex flex-wrap gap-4">
                    {product.metrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                        <div className="text-[10px] font-mono text-zinc-500">{m.label}</div>
                        <div className="text-sm font-bold font-mono text-zinc-900 dark:text-white">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                    >
                      <span>Inquire / Custom Implementation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <span>Need a customized architecture or technical consultation? Reach out</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

