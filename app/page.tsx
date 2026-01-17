"use client";

import React, { useState } from "react";
import Projects from "./pages/projects";
import Header from "./components/Header";
import BottomBar, { BottomBarMenuItem } from "./components/BottomBar";
import Contact from "./pages/contact";
import Blog from "./pages/blog";

export default function Home() {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Header />
      <div className="pt-8 flex flex-col items-center justify-center min-h-screen relative">
        
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-center text-white mb-2">Sandaruwan Bandara</div>
            <div className="text-sm text-gray-300 text-center">Software Developer Portfolio</div>
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
