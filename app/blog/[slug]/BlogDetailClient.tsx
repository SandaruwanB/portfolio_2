"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";
import { BlogPost } from "../../lib/types";
import { defaultBlogs } from "../../lib/defaultData";
import { subscribeToBlogs } from "../../lib/firestoreService";
import { normalizeImageUrl, handleImageFallback } from "../../lib/imageUtils";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(() => {
    return defaultBlogs.find((b) => b.id === slug) || null;
  });
  const [isLoading, setIsLoading] = useState(!post);

  useEffect(() => {
    const unsubscribe = subscribeToBlogs(
      (liveBlogs) => {
        const found = liveBlogs.find((b) => b.id === slug);
        if (found) {
          setPost({
            ...found,
            imageUrl: normalizeImageUrl(found.imageUrl),
          });
        }
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
        <main className="flex-1 pt-28 pb-20 sm:pt-36 max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />
          <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />
          <div className="h-64 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse mb-8" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
        <main className="flex-1 pt-28 pb-20 sm:pt-36 max-w-4xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono text-zinc-400 mb-2">ARTICLE NOT FOUND</div>
          <h1 className="text-2xl font-bold mb-4">Architecture note or article not found</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
            The requested article slug does not exist or may have been unpublished.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Writings & Notes</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const coverImg = normalizeImageUrl(post.imageUrl);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* BACK BREADCRUMB */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Writings & Notes</span>
            </Link>
          </div>

          {/* ARTICLE HEADER */}
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                {post.category}
              </span>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span>Author: Sandaruwan Bandara</span>
              <span>•</span>
              <span>Systems Architect</span>
            </div>
          </header>

          {/* COVER IMAGE */}
          {coverImg && (
            <ScrollReveal className="mb-10">
              <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-950 shadow-sm max-h-[460px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImg}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageFallback}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          )}

          {/* CONTENT BODY */}
          <div className="p-6 sm:p-10 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 shadow-xs mb-12">
            <div className="prose prose-zinc dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans space-y-4">
              {post.content || post.excerpt}
            </div>

            {/* TAGS */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 mr-1">
                  <Tag className="w-3 h-3" />
                  <span>Topics:</span>
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* BOTTOM CONSULTATION CTA */}
          <ScrollReveal>
            <div className="p-8 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-lg font-bold tracking-tight">
                  Interested in discussing this architecture or case study?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Available for architectural advisory, database bottleneck reviews, and custom systems design.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0 shadow-sm"
              >
                <span>Discuss Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

        </article>
      </main>

      <Footer />
    </div>
  );
}
