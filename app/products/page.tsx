"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight } from "../components/Icons";
import ScrollReveal from "../components/ScrollReveal";
import { Product } from "../lib/types";
import { defaultProducts } from "../lib/defaultData";
import { getProducts } from "../lib/firestoreService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProducts() {
      try {
        const liveProducts = await getProducts();
        if (isMounted && liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      } catch (err) {
        console.warn("Could not load products from Firestore, using defaults:", err);
      }
    }
    loadLiveProducts();
    return () => {
      isMounted = false;
    };
  }, []);

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
            {products.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 100}>
                <div
                  className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
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

                    {product.imageUrl && (
                      <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                        Key Capabilities:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.features?.map((feature, i) => (
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
                      {product.metrics?.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
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
              </ScrollReveal>
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
