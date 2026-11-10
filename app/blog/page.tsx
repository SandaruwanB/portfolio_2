"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight } from "../components/Icons";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    id: "scaling-event-streams",
    title: "Deconstructing Distributed Bottlenecks: Scaling Event Streams to 50,000+ msg/sec",
    excerpt:
      "A deep dive into diagnosing thread pool starvation, Kafka partition keying strategies, non-blocking I/O workers, and eliminating database write bottlenecks under extreme traffic bursts.",
    category: "Distributed Systems",
    readTime: "7 min read",
    date: "November 2026",
    tags: ["Distributed Systems", "Kafka", "Java", "High Throughput"],
  },
  {
    id: "modular-odoo-migration",
    title: "Decoupling the Enterprise Monolith: Migrating Core Logic to Modular Odoo & Microservices",
    excerpt:
      "How to transition legacy monolithic business databases into decoupled, bounded domains using custom Odoo modular plugins and the Transactional Outbox pattern without operational downtime.",
    category: "Enterprise Architecture",
    readTime: "9 min read",
    date: "October 2026",
    tags: ["Odoo ERP", "DDD", "Enterprise", "Architecture"],
  },
  {
    id: "distributed-sagas-idempotency",
    title: "Zero-Downtime Financial Consistency: Sagas, Idempotency Tokens, and Eventual Consistency",
    excerpt:
      "Why distributed lock managers destroy backend throughput, and how implementing orchestrated Sagas with cryptographic idempotency tokens guarantees 100% reconciliation accuracy.",
    category: "System Reliability",
    readTime: "6 min read",
    date: "September 2026",
    tags: ["Fintech", "ACID", "Microservices", "Reliability"],
  },
  {
    id: "edge-to-cloud-iot",
    title: "From Edge to Cloud: Architecting Resilient IoT Telemetry Streams with MQTT & Redis",
    excerpt:
      "Overcoming unreliable hardware connectivity and network latency. Designing store-and-forward edge gateways, lightweight MQTT QoS choreography, and in-memory time-series validation.",
    category: "IoT & Hardware",
    readTime: "8 min read",
    date: "August 2026",
    tags: ["IoT", "Edge Computing", "MQTT", "Redis"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              ENGINEERING INSIGHTS & ESSAYS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Systems Architecture Blog
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In-depth technical reflections on distributed systems, enterprise decoupling, ERP performance engineering, and high-throughput reliability.
            </p>
          </div>
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      • {post.readTime}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {post.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl mb-5">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article / Discuss</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <span>Interested in discussing an engineering topic or case study? Contact me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

