"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sandarusbandara110@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Architecture Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:sandarusbandara110@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Info */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Let&apos;s Connect</h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Available for technical architecture reviews, distributed system challenges, Odoo ERP implementations, and strategic technology consulting.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <span className="text-zinc-800 dark:text-zinc-200">sandarusbandara110@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors font-sans font-medium"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://linkedin.com/in/sandaruwan-bandara"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  LinkedIn ↗
                </a>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <a
                  href="https://github.com/SandaruwanB"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name / Company"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your project, distributed system scaling challenge, or advisory scope..."
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Send Message →
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
