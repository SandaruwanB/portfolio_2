"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  GitHub,
  Globe,
  Smartphone,
  Monitor,
  Server,
  Layers
} from "../components/Icons";
import ScrollReveal from "../components/ScrollReveal";
import { Product } from "../lib/types";
import { defaultProducts } from "../lib/defaultData";
import { subscribeToProducts } from "../lib/firestoreService";

const ITEMS_PER_PAGE = 4;

const PLATFORM_OPTIONS = [
  { id: "All", label: "All Platforms", icon: null },
  { id: "Web App", label: "Web Apps", icon: Globe },
  { id: "Mobile App", label: "Mobile Apps", icon: Smartphone },
  { id: "Desktop App", label: "Desktop Apps", icon: Monitor },
  { id: "Backend & Systems", label: "Backend & Systems", icon: Server },
  { id: "ERP & Enterprise", label: "ERP & Enterprise", icon: Layers },
];

const PRICING_OPTIONS = ["All", "Open Source", "Paid", "Enterprise"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedPricing, setSelectedPricing] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const catalogTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (liveProducts) => {
        setProducts(liveProducts);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Merge fallback fields for seeded items that might lack newer metadata
  const enrichedProducts = useMemo(() => {
    return products.map((p) => {
      const def = defaultProducts.find((d) => d.id === p.id);
      return {
        ...p,
        imageUrl: p.imageUrl || def?.imageUrl,
        platform: p.platform || def?.platform || "Backend & Systems",
        pricingType: p.pricingType || def?.pricingType || "Enterprise",
        priceLabel: p.priceLabel || def?.priceLabel,
        status: p.status || def?.status,
      };
    });
  }, [products]);

  // Extract all unique tech stack tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    enrichedProducts.forEach((p) => {
      p.stack?.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [enrichedProducts]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return enrichedProducts.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPlatform =
        selectedPlatform === "All" ||
        p.platform?.toLowerCase() === selectedPlatform.toLowerCase();

      const matchesPricing =
        selectedPricing === "All" ||
        p.pricingType?.toLowerCase() === selectedPricing.toLowerCase();

      const matchesTag =
        !selectedTag ||
        p.stack?.some((s) => s.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesPlatform && matchesPricing && matchesTag;
    });
  }, [enrichedProducts, searchQuery, selectedPlatform, selectedPricing, selectedTag]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, selectedPricing, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedPlatform !== "All" ||
    selectedPricing !== "All" ||
    selectedTag !== null;

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("All");
    setSelectedPricing("All");
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10" ref={catalogTopRef}>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              SOLUTIONS & PLATFORMS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Enterprise Products & Architectures
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Production-grade systems, applications, modular ERP platforms, and open-source infrastructure engineered for scale.
            </p>
          </div>

          {/* SEARCH & FILTER TOOLBAR */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            {/* Top row: Search + License Segmented Pills */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, architectures, or tech stack..."
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* License / Pricing Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
                {PRICING_OPTIONS.map((option) => {
                  const active = selectedPricing === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedPricing(option)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        active
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      {option === "All" ? "All Licenses" : option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">Platform:</span>
              {PLATFORM_OPTIONS.map((plat) => {
                const Icon = plat.icon;
                const active = selectedPlatform === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatform(plat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      active
                        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-xs"
                        : "bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{plat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tech Stack Tags Row */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">Tags:</span>
                {allTags.map((tag) => {
                  const active = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(active ? null : tag)}
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border transition-colors ${
                        active
                          ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:text-zinc-950 dark:border-emerald-500 font-semibold"
                          : "bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RESULTS META BAR */}
          <div className="flex items-center justify-between mb-5 text-xs font-mono text-zinc-500">
            <div>
              Showing <span className="text-zinc-900 dark:text-white font-semibold">{filteredProducts.length}</span> of{" "}
              <span className="text-zinc-900 dark:text-white font-semibold">{enrichedProducts.length}</span> systems
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          {/* PRODUCTS GRID */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-[460px] rounded-3xl bg-white/60 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 animate-pulse p-8"
                />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                No matching systems or products found
              </div>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Try adjusting your search query, platform category, license type, or clearing active tag filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity mt-2"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {paginatedProducts.map((product, idx) => {
                const bannerImg = product.imageUrl;

                return (
                  <ScrollReveal key={product.id} delay={idx * 80} className="h-full">
                    <div
                      id={product.id}
                      className="group h-full rounded-3xl bg-white/85 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-lg transition-all scroll-mt-24 overflow-hidden"
                    >
                      <div>
                        {bannerImg && (
                          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[#08090d] border-b border-zinc-200 dark:border-zinc-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={bannerImg}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                            <div className="absolute bottom-3.5 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10 font-medium">
                                {product.tag}
                              </span>
                              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-200 border border-white/10">
                                {product.platform}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-6 pb-4">
                          {/* Metadata Pills Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {product.pricingType && (
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${getPricingBadgeStyle(
                                    product.pricingType
                                  )}`}
                                >
                                  {product.pricingType}
                                  {product.priceLabel ? ` • ${product.priceLabel}` : ""}
                                </span>
                              )}
                              {product.status && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                                  {product.status}
                                </span>
                              )}
                            </div>

                            {!bannerImg && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                {product.platform}
                              </span>
                            )}
                          </div>

                          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                            {product.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                            {product.summary}
                          </p>

                          {product.features && product.features.length > 0 && (
                            <div className="space-y-1.5 mb-5">
                              <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                                Key Capabilities:
                              </div>
                              <div className="space-y-1.5">
                                {product.features.map((feature, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                                    <span className="text-emerald-500 font-mono mt-0.5">›</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {product.stack && product.stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {product.stack.map((tech) => (
                                <button
                                  key={tech}
                                  onClick={() => setSelectedTag(selectedTag === tech ? null : tech)}
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors ${
                                    selectedTag === tech
                                      ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:text-zinc-950 dark:border-emerald-500"
                                      : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-500"
                                  }`}
                                  title={`Filter by ${tech}`}
                                >
                                  {tech}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
                        {product.metrics && product.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-2.5">
                            {product.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                                <div className="text-[9px] font-mono text-zinc-500 uppercase truncate">{m.label}</div>
                                <div className="text-xs sm:text-sm font-bold font-mono text-zinc-900 dark:text-white truncate mt-0.5">{m.value}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href="/contact"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                          >
                            <span>{product.pricingType === "Paid" ? "Acquire / Inquire" : "Inquire / Implementation"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {product.demoUrl && (
                            <a
                              href={product.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Demo</span>
                            </a>
                          )}

                          {product.repoUrl && (
                            <a
                              href={product.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                              title="GitHub Repository"
                            >
                              <GitHub className="w-3.5 h-3.5" />
                              <span>Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 font-mono text-xs">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl border font-semibold transition-colors ${
                    currentPage === pageNum
                      ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-xs"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="mt-14 text-center">
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
