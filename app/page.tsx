"use client";

import React, { useState } from "react";
import Projects from "./pages/projects";
import Header from "./components/Header";
import BottomBar, { BottomBarMenuItem } from "./components/BottomBar";

export default function Home() {
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleOpenProjects = () => {
    setIsProjectOpen(true);
  };

  const handleCloseProjects = () => {
    setIsProjectOpen(false);
  };

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
    </div>
  );
}
