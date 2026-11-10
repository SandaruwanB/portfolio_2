"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-zinc-50/90 dark:bg-[#08090d]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            Sandaruwan Bandara
          </span>
          <span className="hidden md:inline text-xs font-mono text-zinc-500">
            / Systems Architect
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-900/60 border border-zinc-300/60 dark:border-zinc-800/80 rounded-full px-3 py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Initiate Contact
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle Navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 mt-2 mx-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-xs font-medium rounded-lg ${
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold"
            >
              Initiate Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
