"use client";

import React, { useState } from "react";
import Projects from "./components/projects";

export default function Home() {
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleOpenProjects = () => {
    setIsProjectOpen(true);
  };

  const handleCloseProjects = () => {
    setIsProjectOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Ubuntu-style desktop background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Ubuntu-style top panel */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="text-sm text-gray-300">Portfolio Desktop</div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Desktop content */}
      <div className="pt-8 flex flex-col items-center justify-center min-h-screen relative">
        {/* Desktop icon/name */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-center text-white mb-2">Sandaruwan Bandara</div>
            <div className="text-sm text-gray-300 text-center">Software Developer Portfolio</div>
          </div>
        </div>

        {/* Ubuntu-style taskbar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-3 px-6 py-3 bg-gray-800/90 backdrop-blur-md rounded-full border border-gray-600/50 shadow-2xl">
            {/* Projects folder icon */}
            <div 
              className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200"
              onClick={handleOpenProjects}
            >
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-1 group-hover:bg-orange-400 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Projects</span>
            </div>

            {/* Terminal icon */}
            <div className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-1 group-hover:bg-gray-600 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Terminal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Window */}
      {isProjectOpen && (
        <Projects isOpen={isProjectOpen} onClose={handleCloseProjects} />
      )}
    </div>
  );
}
