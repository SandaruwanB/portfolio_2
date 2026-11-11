import { Product, BlogPost } from "./types";

export const defaultProducts: Product[] = [
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
    order: 1,
    createdAt: Date.now() - 30 * 86400000,
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
    order: 2,
    createdAt: Date.now() - 20 * 86400000,
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
    order: 3,
    createdAt: Date.now() - 10 * 86400000,
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
    order: 4,
    createdAt: Date.now() - 5 * 86400000,
  },
];

export const defaultBlogs: BlogPost[] = [
  {
    id: "scaling-event-streams",
    title: "Deconstructing Distributed Bottlenecks: Scaling Event Streams to 50,000+ msg/sec",
    excerpt:
      "A deep dive into diagnosing thread pool starvation, Kafka partition keying strategies, non-blocking I/O workers, and eliminating database write bottlenecks under extreme traffic bursts.",
    content: "Full architectural breakdown coming soon...",
    category: "Distributed Systems",
    readTime: "7 min read",
    date: "November 2026",
    tags: ["Distributed Systems", "Kafka", "Java", "High Throughput"],
    published: true,
    createdAt: Date.now() - 8 * 86400000,
  },
  {
    id: "modular-odoo-migration",
    title: "Decoupling the Enterprise Monolith: Migrating Core Logic to Modular Odoo & Microservices",
    excerpt:
      "How to transition legacy monolithic business databases into decoupled, bounded domains using custom Odoo modular plugins and the Transactional Outbox pattern without operational downtime.",
    content: "Full architectural breakdown coming soon...",
    category: "Enterprise Architecture",
    readTime: "9 min read",
    date: "October 2026",
    tags: ["Odoo ERP", "DDD", "Enterprise", "Architecture"],
    published: true,
    createdAt: Date.now() - 15 * 86400000,
  },
  {
    id: "distributed-sagas-idempotency",
    title: "Zero-Downtime Financial Consistency: Sagas, Idempotency Tokens, and Eventual Consistency",
    excerpt:
      "Why distributed lock managers destroy backend throughput, and how implementing orchestrated Sagas with cryptographic idempotency tokens guarantees 100% reconciliation accuracy.",
    content: "Full architectural breakdown coming soon...",
    category: "System Reliability",
    readTime: "6 min read",
    date: "September 2026",
    tags: ["Fintech", "ACID", "Microservices", "Reliability"],
    published: true,
    createdAt: Date.now() - 25 * 86400000,
  },
  {
    id: "edge-to-cloud-iot",
    title: "From Edge to Cloud: Architecting Resilient IoT Telemetry Streams with MQTT & Redis",
    excerpt:
      "Overcoming unreliable hardware connectivity and network latency. Designing store-and-forward edge gateways, lightweight MQTT QoS choreography, and in-memory time-series validation.",
    content: "Full architectural breakdown coming soon...",
    category: "IoT & Hardware",
    readTime: "8 min read",
    date: "August 2026",
    tags: ["IoT", "Edge Computing", "MQTT", "Redis"],
    published: true,
    createdAt: Date.now() - 40 * 86400000,
  },
];

