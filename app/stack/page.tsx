"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const capabilityGroups = [
  {
    category: "Languages & Core Runtimes",
    code: "01 // RUNTIME",
    description: "Multi-threaded, high-concurrency, and memory-managed systems execution.",
    technologies: [
      { name: "Java (JDK 17/21)", detail: "Concurrency, JVM Tuning, Spring Boot, Vert.x" },
      { name: "Node.js / TypeScript", detail: "Asynchronous Event Loop, NestJS, Express, Worker Threads" },
      { name: "Python", detail: "Odoo ERP Backend, Scripting, Automation Pipelines" },
      { name: "Android SDK", detail: "Native Clients, Offline-First Sync, Hardware Interfacing" },
    ],
  },
  {
    category: "Distributed Systems & Messaging",
    code: "02 // DISTRIBUTED",
    description: "Decoupled asynchronous streaming, message broker topologies, and event choreography.",
    technologies: [
      { name: "Apache Kafka", detail: "Event Streaming, Partition Keying, Consumer Groups, DLQs" },
      { name: "RabbitMQ", detail: "AMQP Routing, Priority Queues, Dead-Letter Exchanges" },
      { name: "Redis", detail: "Distributed Caching, Pub/Sub, In-Memory Rate Limiting" },
      { name: "Microservices", detail: "Saga Pattern, Circuit Breakers, Service Meshes, gRPC" },
    ],
  },
  {
    category: "Enterprise Systems & ERP",
    code: "03 // ENTERPRISE",
    description: "Streamlining complex multi-entity operational domains into unified platforms.",
    technologies: [
      { name: "Odoo ERP Core", detail: "Modular Custom Addons, ORM Optimization, Multi-Company Logic" },
      { name: "Business Process Automation", detail: "Automated Approval Flows, Inventory Ledgers, Billing Engines" },
      { name: "Domain-Driven Design (DDD)", detail: "Bounded Contexts, Ubiquitous Language, Aggregate Roots" },
      { name: "Modular Plugins", detail: "Decoupled Extension Hooks, Event Listeners, Dynamic Adapters" },
    ],
  },
  {
    category: "Databases & Storage Engineering",
    code: "04 // PERSISTENCE",
    description: "High-volume transactional persistence, query optimization, indexing, and tuning.",
    technologies: [
      { name: "PostgreSQL", detail: "Query Optimization, Index Tuning (B-Tree/GIN), Sharding, ACID" },
      { name: "MongoDB", detail: "Document Modeling, Aggregation Pipelines, Sharded Clusters" },
      { name: "MySQL / MariaDB", detail: "Transaction Isolation, Replication, High Availability" },
      { name: "Cache Topologies", detail: "Write-Through, Cache-Aside, Invalidation Strategies" },
    ],
  },
  {
    category: "IoT, Edge & AI Telemetry",
    code: "05 // TELEMETRY & AI",
    description: "Ingesting physical telemetry into cloud platforms and running intelligent automation.",
    technologies: [
      { name: "MQTT & WebSockets", detail: "Low-overhead device protocols and bi-directional streams" },
      { name: "Edge Computing Hubs", detail: "Local event filtering, Store-and-forward resilience" },
      { name: "Hardware Interfacing", detail: "Serial communication, Sensor data ingestion, Microcontrollers" },
      { name: "AI Automation", detail: "Predictive anomaly detection, automated classification pipelines" },
    ],
  },
  {
    category: "DevOps & Infrastructure Observability",
    code: "06 // INFRA & OPS",
    description: "Automated deployment pipelines, containerization, and production telemetry monitoring.",
    technologies: [
      { name: "Docker & Containers", detail: "Multi-stage builds, Distroless images, Container isolation" },
      { name: "CI/CD Automation", detail: "GitHub Actions, Automated regression testing, Zero-downtime release" },
      { name: "Linux Internals", detail: "Process management, Network socket tuning, Kernel parameters" },
      { name: "Telemetry & Logs", detail: "Prometheus, Grafana, Structured Logging, Distributed Tracing" },
    ],
  },
];

export default function StackPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Page Heading */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              PRODUCTION TOOLBOX
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Technical Stack & Capabilities
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A comprehensive view of the core frameworks, persistence layers, distributed protocols, and DevOps infrastructure I deploy in production.
            </p>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilityGroups.map((group) => (
              <div
                key={group.code}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-2">
                    {group.code}
                  </div>

                  <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    {group.category}
                  </h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="space-y-3">
                    {group.technologies.map((tech) => (
                      <div key={tech.name} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                          {tech.name}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                          {tech.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <span>Need specific technical advice or stack recommendation? Contact me</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

