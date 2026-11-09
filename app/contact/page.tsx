"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Distributed Systems Architecture");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    "Distributed Systems Architecture",
    "Enterprise ERP & Odoo Modernization",
    "Performance & Database Bottleneck Audit",
    "Strategic Tech Advisory / Mentorship",
    "Other Engineering Consultation",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sandarusbandara110@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`[${topic}] Architecture Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
    window.location.href = `mailto:sandarusbandara110@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Page Heading */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              INITIATE ENGAGEMENT
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Let&apos;s Discuss Architecture & Scalability
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you are planning an enterprise architecture overhaul, resolving distributed bottlenecks, or seeking strategic technical guidance for your business, reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            
            {/* Left Column: Direct channels */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Direct Communication</h2>
                
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-1">DIRECT EMAIL</div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-800 dark:text-zinc-200 text-xs">sandarusbandara110@gmail.com</span>
                      <button
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors font-sans font-medium text-[11px]"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-1">PROFESSIONAL NETWORKS</div>
                    <div className="space-y-2">
                      <a
                        href="https://linkedin.com/in/sandaruwan-bandara"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
                      >
                        <span className="text-zinc-800 dark:text-zinc-200 font-sans text-xs">LinkedIn</span>
                        <span className="text-zinc-400 group-hover:text-emerald-500">↗</span>
                      </a>
                      <a
                        href="https://github.com/SandaruwanB"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
                      >
                        <span className="text-zinc-800 dark:text-zinc-200 font-sans text-xs">GitHub Profile</span>
                        <span className="text-zinc-400 group-hover:text-emerald-500">↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <span>Available for Advisory & Contracts</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                  Send Architecture Inquiry
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6">
                  Fill in your technical details and I will reply promptly.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">Inquiry Initiated</div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Your default mail client has been opened with your inquiry details. I look forward to connecting with you.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-xs font-mono text-emerald-500 underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Topic selector */}
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                        ENGAGEMENT TOPIC
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                      >
                        {topics.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                          YOUR NAME / COMPANY
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe / Acme Corp"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                          CORPORATE EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                        SYSTEM CONTEXT & CHALLENGE
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your current architectural state, scaling bottlenecks, Odoo ERP goals, or advisory requirements..."
                        className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                    >
                      Submit Architecture Inquiry →
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

