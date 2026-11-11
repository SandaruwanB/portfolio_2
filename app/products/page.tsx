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
  Layers,
  SlidersHorizontal
} from "../components/Icons";
import ScrollReveal from "../components/ScrollReveal";
import { Product } from "../lib/types";
import { defaultProducts } from "../lib/defaultData";
import { subscribeToProducts } from "../lib/firestoreService";

const ITEMS_PER_PAGE = 4;

const PLATFORM_OPTIONS = [
  { id: "All", label: "All Platforms", icon: Layers },
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

  // Filter, Sort & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedPricing, setSelectedPricing] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"order" | "newest" | "az">("order");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const catalogTopRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  // Compute live counts per Platform
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = { All: enrichedProducts.length };
    PLATFORM_OPTIONS.forEach((opt) => {
      if (opt.id !== "All") {
        counts[opt.id] = enrichedProducts.filter(
          (p) => p.platform?.toLowerCase() === opt.id.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [enrichedProducts]);

  // Compute live counts per License
  const pricingCounts = useMemo(() => {
    const counts: Record<string, number> = { All: enrichedProducts.length };
    PRICING_OPTIONS.forEach((opt) => {
      if (opt !== "All") {
        counts[opt] = enrichedProducts.filter(
          (p) => p.pricingType?.toLowerCase() === opt.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [enrichedProducts]);

  // Extract all unique tech stack tags with counts sorted by popularity
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    enrichedProducts.forEach((p) => {
      p.stack?.forEach((t) => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [enrichedProducts]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    const filtered = enrichedProducts.filter((p) => {
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

    if (sortBy === "newest") {
      return [...filtered].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    if (sortBy === "az") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  }, [enrichedProducts, searchQuery, selectedPlatform, selectedPricing, selectedTag, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, selectedPricing, selectedTag, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const activeFilterCount =
    (selectedPlatform !== "All" ? 1 : 0) +
    (selectedPricing !== "All" ? 1 : 0) +
    (selectedTag !== null ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedPlatform("All");
    setSelectedPricing("All");
    setSelectedTag(null);
    setSortBy("order");
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

  const visibleTags = showAllTags ? tagCounts : tagCounts.slice(0, 10);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 sm:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* HEADER */}
          <div className="max-w-3xl mb-10" ref={catalogTopRef}>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              SOLUTIONS & PLATFORMS
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Enterprise Products & Architectures
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Production-grade systems, web & mobile applications, modular ERP platforms, and open-source tools engineered for scale.
            </p>
          </div>

          {/* COMMAND BAR: SEARCH + LICENSE SWITCHER */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
            {/* Spotlight Search Input */}
            <div className="relative flex-1 max-w-xl group">
              <div className="flex items-center w-full rounded-2xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 group-focus-within:border-emerald-500/50 group-focus-within:ring-4 group-focus-within:ring-emerald-500/10 transition-all shadow-xs">
                <Search className="w-4 h-4 text-zinc-400 ml-4 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search systems, tech stack, or solutions..."
                  className="w-full px-3 py-3 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-3 p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 mr-3.5 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 select-none">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Right Controls: License Switcher + Mobile Filter Button */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
              {/* Segmented Glass Control for License */}
              <div className="inline-flex items-center p-1 rounded-2xl bg-zinc-200/60 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/90 backdrop-blur-sm overflow-x-auto max-w-full">
                {PRICING_OPTIONS.map((option) => {
                  const active = selectedPricing === option;
                  const count = pricingCounts[option] || 0;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedPricing(option)}
                      className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        active
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      <span>{option === "All" ? "All" : option}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          active
                            ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
                            : "text-zinc-400 dark:text-zinc-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Filter Drawer Trigger */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-mono">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* TWO-COLUMN ARCHITECTURAL LAYOUT: LEFT STICKY FILTER RAIL + RIGHT 2-COL GRID */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* LEFT STICKY FILTER SIDEBAR */}
            <aside
              className={`w-full lg:w-60 shrink-0 lg:sticky lg:top-28 space-y-6 ${
                mobileFiltersOpen ? "block" : "hidden lg:block"
              }`}
            >
              {/* Active Clear Bar */}
              {activeFilterCount > 0 && (
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/70 dark:border-zinc-800/70">
                  <span className="text-[11px] font-mono text-zinc-500">
                    {activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                  >
                    Reset all
                  </button>
                </div>
              )}

              {/* Platform Category Rail */}
              <div>
                <h3 className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                  Platform
                </h3>
                <div className="space-y-1">
                  {PLATFORM_OPTIONS.map((plat) => {
                    const Icon = plat.icon;
                    const active = selectedPlatform === plat.id;
                    const count = platformCounts[plat.id] || 0;
                    return (
                      <button
                        key={plat.id}
                        onClick={() => setSelectedPlatform(plat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all group relative ${
                          active
                            ? "bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-white font-semibold shadow-2xs border border-zinc-200/90 dark:border-zinc-800"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/40 dark:hover:bg-zinc-900/40"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-emerald-500" />
                        )}
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-3.5 h-3.5 ${
                              active
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                            }`}
                          />
                          <span>{plat.label}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                            active
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                              : "text-zinc-400 dark:text-zinc-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack Tags Cloud */}
              {tagCounts.length > 0 && (
                <div className="pt-5 border-t border-zinc-200/70 dark:border-zinc-800/70">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      Tech Stack
                    </h3>
                    {selectedTag && (
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="text-[10px] font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTags.map(([tag, count]) => {
                      const active = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(active ? null : tag)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                            active
                              ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white font-semibold shadow-xs"
                              : "bg-white/70 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white"
                          }`}
                        >
                          <span>{tag}</span>
                          <span
                            className={`text-[9px] ${
                              active ? "opacity-75" : "text-zinc-400 dark:text-zinc-600"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {tagCounts.length > 10 && (
                    <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="mt-3 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {showAllTags ? "Show fewer tags" : `Show all ${tagCounts.length} tags →`}
                    </button>
                  )}
                </div>
              )}
            </aside>

            {/* RIGHT CONTENT AREA: ACTIVE CHIPS + SORT + 2-COL GRID */}
            <div className="flex-1 w-full min-w-0">
              {/* Top Results & Sort Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
                  <span>
                    Showing{" "}
                    <strong className="text-zinc-900 dark:text-white">
                      {filteredProducts.length}
                    </strong>{" "}
                    of {enrichedProducts.length} systems
                  </span>

                  {/* Removable Active Filter Pills */}
                  {selectedPlatform !== "All" && (
                    <button
                      onClick={() => setSelectedPlatform("All")}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <span>{selectedPlatform}</span>
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {selectedPricing !== "All" && (
                    <button
                      onClick={() => setSelectedPricing("All")}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <span>{selectedPricing}</span>
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] border border-emerald-500/30"
                    >
                      <span>#{selectedTag}</span>
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Minimal Sort Control */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-400 text-[11px]">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "order" | "newest" | "az")}
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 cursor-pointer"
                  >
                    <option value="order">Featured</option>
                    <option value="newest">Newest First</option>
                    <option value="az">Name (A → Z)</option>
                  </select>
                </div>
              </div>

              {/* PRODUCTS 2-COLUMN GRID */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-[460px] rounded-3xl bg-white/60 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 animate-pulse p-8"
                    />
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="p-14 rounded-3xl bg-white/70 dark:bg-zinc-900/30 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                    No matching systems found
                  </div>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Adjust your platform, license filter, or search keywords to explore other engineered solutions.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity mt-2"
                  >
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedProducts.map((product, idx) => {
                    const bannerImg = product.imageUrl;

                    return (
                      <ScrollReveal key={product.id} delay={idx * 75} className="h-full">
                        <div
                          id={product.id}
                          className="group h-full rounded-3xl bg-white/85 dark:bg-zinc-900/40 backdrop-blur-xs border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-lg transition-all scroll-mt-24 overflow-hidden"
                        >
                          <div>
                            {bannerImg && (
                              <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#08090d] border-b border-zinc-200 dark:border-zinc-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={bannerImg}
                                  alt={product.title}
                                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
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
                                          ? "bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:text-zinc-950 dark:border-emerald-500 font-semibold"
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
            </div>
          </div>

          <div className="mt-16 text-center">
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
