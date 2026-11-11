"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, X } from "../components/Icons";
import ScrollReveal from "../components/ScrollReveal";
import { BlogPost } from "../lib/types";
import { defaultBlogs } from "../lib/defaultData";
import { subscribeToBlogs } from "../lib/firestoreService";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogs);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToBlogs(
      (liveBlogs) => {
        setPosts(liveBlogs.filter((b) => b.published !== false));
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-48 rounded-2xl bg-white/60 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 animate-pulse p-8"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 100}>
                  <article
                    className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
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

                    {post.imageUrl && (
                      <div className="relative w-full overflow-hidden rounded-xl mb-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full max-h-[340px] object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}

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

      {/* ARTICLE READER MODAL */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="w-full max-w-3xl bg-white dark:bg-[#0d0f14] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 space-y-6 my-8 shadow-2xl relative max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="sticky top-0 float-right p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
              aria-label="Close reader"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  {selectedPost.category}
                </span>
                <span className="text-zinc-400">• {selectedPost.readTime}</span>
                <span className="text-zinc-400">• {selectedPost.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                {selectedPost.title}
              </h2>
            </div>

            {selectedPost.imageUrl && (
              <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full max-h-[400px] object-cover"
                />
              </div>
            )}

            <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
              {selectedPost.content || selectedPost.excerpt}
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity shrink-0"
              >
                <span>Discuss this Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
