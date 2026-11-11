"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedSystems from "./components/FeaturedSystems";
import CorePillars from "./components/CorePillars";
import ExecutiveCTA from "./components/ExecutiveCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white transition-colors duration-200 relative">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Hero />
        <FeaturedSystems />
        <CorePillars />
        <ExecutiveCTA />
      </main>
      <Footer />
    </div>
  );
}
