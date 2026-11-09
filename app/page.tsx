"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CorePillars from "./components/CorePillars";
import ArchitectureCases from "./components/ArchitectureCases";
import Capabilities from "./components/Capabilities";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CorePillars />
        <ArchitectureCases />
        <Capabilities />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
