"use client";

import React, { useEffect, useState } from "react";
import Projects from "./pages/projects";
import Header from "./components/Header";
import BottomBar, { BottomBarMenuItem } from "./components/BottomBar";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import Image from "next/image";
const words = ["Software Engineer", "Fullstack Developer", "Business Solution Provider", "IT Expert", "IoT Enthusiast", "Open Source Contributor"];

export default function Home() {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[wordIndex];

      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullWord) {
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  const handleOpenProjects = () => { setIsProjectOpen(true); };
  const handleCloseProjects = () => { setIsProjectOpen(false); };

  const handleOpenContact = () => { setIsContactOpen(true); }
  const handleCloseContact = () => { setIsContactOpen(false); }

  const handleOpenBlog = () => { setIsBlogOpen(true); }
  const handleCloseBlog = () => { setIsBlogOpen(false); }

  const menuItems: BottomBarMenuItem[] = [
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      bgColor: 'bg-orange-500',
      hoverColor: 'group-hover:bg-orange-400',
      onClick: handleOpenProjects,
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-400',
      onClick: handleOpenBlog,
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-400',
      onClick: handleOpenContact,
    },
    {
      id: 'terminal',
      label: 'Terminal',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-gray-700',
      hoverColor: 'group-hover:bg-gray-600',
      onClick: () => console.log('Terminal clicked'),
    },
  ];


  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-200 dark:bg-[#0b0c15] transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-50 to-orange-100 transition-opacity duration-700 opacity-100 dark:opacity-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0c15] via-[#090909] to-[#170e08] transition-opacity duration-700 opacity-0 dark:opacity-100 pointer-events-none" />

      <div className="sunrise opacity-30 dark:opacity-60 transition-opacity duration-500" aria-hidden="true" />
      <Header />
      <div className="pt-16 flex flex-col items-center justify-center min-h-screen relative z-10 pb-16">
        <div className="mb-8 w-full md:w-3/4 max-w-5xl px-4 z-10 animate-fadeIn mx-auto">
          <div className="relative overflow-hidden rounded-[32px] border border-white/30 dark:border-white/10 bg-white/30 dark:bg-slate-950/60 backdrop-blur-xl shadow-2xl transition-all duration-300 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

            <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-500/20 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-lg bg-black/5 dark:bg-white/5 group z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-violet-500/5 z-10 pointer-events-none" />
              <Image
                src="/images/bg_img.webp"
                alt="Sandaruwan Bandara"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-5 z-10">
              <div className="space-y-2">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 dark:border-orange-500/30 inline-flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  Available for Work
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
                  Sandaruwan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-yellow-300">Bandara</span>
                </h1>
                <p className="text-lg sm:text-lg font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase h-7 flex items-center justify-center md:justify-start">
                  {currentText}
                  <span className="w-[2px] h-5 bg-orange-600 dark:bg-orange-400 ml-1 animate-pulse" />
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://linkedin.com/in/sandaruwan-bandara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 border border-slate-300/30 dark:border-white/5 hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 hover:scale-110 shadow-sm"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/SandaruwanB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 border border-slate-300/30 dark:border-white/5 hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/d_e_v_sandy?igsh=YmY0cTV1YmI4amRu&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 border border-slate-300/30 dark:border-white/5 hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 hover:scale-110 shadow-sm"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                <a
                  href="mailto:sandarusbandara110@gmail.com"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 border border-slate-300/30 dark:border-white/5 hover:border-orange-500/20 dark:hover:border-orange-500/30 transition-all duration-300 hover:scale-110 shadow-sm"
                  title="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md leading-relaxed font-medium">
                I specialize in building scalable Android applications, robust web platforms, and custom API integrations to solve complex digital challenges.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
                {["Android", "React", "Next.js", "TypeScript", "Odoo"].map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-300/30 dark:border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        <BottomBar menuItems={menuItems} />
      </div>

      {isProjectOpen && (
        <Projects isOpen={isProjectOpen} onClose={handleCloseProjects} />
      )}
      {isContactOpen && (
        <Contact isOpen={isContactOpen} onClose={handleCloseContact} />
      )}
      {isBlogOpen && (
        <Blog isOpen={isBlogOpen} onClose={handleCloseBlog} />
      )}
    </div>
  );
}
