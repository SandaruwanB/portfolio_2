"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShieldCheck } from "./Icons";
import ScrollReveal from "./ScrollReveal";
import { Product } from "../lib/types";
import { defaultProducts } from "../lib/defaultData";
import { subscribeToProducts } from "../lib/firestoreService";

const icons = [Cpu, Layers, ShieldCheck];

export default function FeaturedSystems() {
  const [featured, setFeatured] = useState<Product[]>(defaultProducts.slice(0, 3));

  useEffect(() => {
    const unsubscribe = subscribeToProducts((liveProducts) => {
      setFeatured(liveProducts.slice(0, 3));
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Featured Systems & Architecture
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Production-proven platforms engineered for scale, reliability, and measurable business impact.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <span>View all systems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const firstMetric = item.metrics?.[0];
            const highlightText = firstMetric ? `${firstMetric.label}: ${firstMetric.value}` : item.tag;
            const bannerImg = item.imageUrl || defaultProducts.find((d) => d.id === item.id)?.imageUrl;

            return (
              <ScrollReveal key={item.id} delay={idx * 120} className="h-full">
                <Link
                  href={`/products#${item.id}`}
                  className="group h-full rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {bannerImg && (
                      <div className="relative w-full h-40 overflow-hidden bg-[#08090d] border-b border-zinc-200 dark:border-zinc-800/60">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={bannerImg}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-zinc-900/60 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-zinc-900 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 pb-3">
                      {!bannerImg && (
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-zinc-500 mb-1">
                        {item.category}
                      </div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium mb-2.5">
                      {highlightText}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
