"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  GitHub, 
  Check, 
  Layers 
} from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";
import { Product } from "../../lib/types";
import { defaultProducts } from "../../lib/defaultData";
import { subscribeToProducts } from "../../lib/firestoreService";
import { normalizeImageUrl } from "../../lib/imageUtils";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(() => {
    return defaultProducts.find((p) => p.id === slug) || null;
  });
  const [isLoading, setIsLoading] = useState(!product);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (liveProducts) => {
        const found = liveProducts.find((p) => p.id === slug);
        if (found) {
          const def = defaultProducts.find((d) => d.id === found.id);
          setProduct({
            ...found,
            imageUrl: normalizeImageUrl(found.imageUrl || def?.imageUrl),
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

  const getPricingBadgeStyle = (pricingType?: string) => {
    switch (pricingType) {
      case "Open Source":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25";
      case "Paid":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25";
      default:
        return "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
        <main className="flex-1 pt-28 pb-20 sm:pt-36 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />
          <div className="h-10 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />
          <div className="h-80 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
        <main className="flex-1 pt-28 pb-20 sm:pt-36 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono text-zinc-400 mb-2">SYSTEM NOT FOUND</div>
          <h1 className="text-2xl font-bold mb-4">Architecture blueprint or product not found</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
            The requested product slug does not exist or may have been unlisted.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Products Catalog</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const bannerImg = normalizeImageUrl(product.imageUrl || defaultProducts.find((d) => d.id === product.id)?.imageUrl);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* BACK BREADCRUMB */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Systems & Products</span>
            </Link>
          </div>

          {/* HEADER & METADATA */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${getPricingBadgeStyle(product.pricingType)}`}>
                {product.pricingType || "Production"} {product.priceLabel ? `• ${product.priceLabel}` : ""}
              </span>

              {product.platform && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {product.platform}
                </span>
              )}

              {product.status && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {product.status}
                </span>
              )}

              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 ml-auto hidden sm:inline">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
              {product.summary}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>{product.pricingType === "Paid" ? "Inquire / Licensing" : "Inquire / Custom Setup"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {product.demoUrl && (
                product.demoUrl.startsWith("/") ? (
                  <Link
                    href={product.demoUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </Link>
                ) : (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )
              )}

              {product.repoUrl && (
                product.repoUrl.startsWith("/") ? (
                  <Link
                    href={product.repoUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
                  >
                    <GitHub className="w-3.5 h-3.5" />
                    <span>Source Repository</span>
                  </Link>
                ) : (
                  <a
                    href={product.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
                  >
                    <GitHub className="w-3.5 h-3.5" />
                    <span>Source Repository</span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* BANNER PREVIEW / ARCHITECTURE SCHEMATIC */}
          {bannerImg && (
            <ScrollReveal className="mb-12">
              <div className="relative w-full h-64 sm:h-96 md:h-[460px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-zinc-950 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerImg}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          )}

          {/* STATS & METRICS GRID */}
          {product.metrics && product.metrics.length > 0 && (
            <ScrollReveal className="mb-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {product.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 shadow-2xs"
                  >
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-white">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* TWO COLUMN DETAILS: ARCHITECTURAL FEATURES & STACK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* LEFT: ARCHITECTURAL HIGHLIGHTS */}
            <div className="lg:col-span-8 space-y-6">
              <ScrollReveal>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span>Architectural Features & Technical Specifications</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features?.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60"
                      >
                        <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: TECH STACK & SYSTEM SPECS */}
            <div className="lg:col-span-4 space-y-6">
              <ScrollReveal delay={100}>
                <div className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.stack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500">Domain</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500">Deployment</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-medium">{product.platform || "Backend"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-500">License Model</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-medium">{product.pricingType || "Custom"}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* BOTTOM CONSULTATION CARD */}
          <ScrollReveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-xl">
                <h3 className="text-xl font-bold tracking-tight">
                  Need a customized deployment or architectural consultation?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Available to adapt this architecture to your infrastructure, connect custom ERP modules, or review high-concurrency bottlenecks.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0 shadow-sm"
              >
                <span>Discuss Implementation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />
    </div>
  );
}
