"use client";

import React, { useEffect, useState } from 'react';

interface ProjectsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  // Get responsive dimensions based on screen size
  const getResponsiveDimensions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Mobile: full screen with minimal margins
    if (screenWidth < 640) {
      return {
        width: screenWidth - 8,
        height: screenHeight - 16,
        x: 4,
        y: 8
      };
    }
    
    // Small tablet: 95% of screen
    if (screenWidth < 768) {
      return {
        width: screenWidth - 32,
        height: screenHeight - 64,
        x: 16,
        y: 32
      };
    }
    
    // Tablet: 90% of screen
    if (screenWidth < 1024) {
      const width = Math.min(700, screenWidth * 0.9);
      const height = Math.min(600, screenHeight * 0.85);
      return {
        width,
        height,
        x: (screenWidth - width) / 2,
        y: (screenHeight - height) / 2
      };
    }
    
    // Desktop: optimal size, centered
    const width = Math.min(900, screenWidth * 0.75);
    const height = Math.min(700, screenHeight * 0.85);
    return {
      width,
      height,
      x: (screenWidth - width) / 2,
      y: (screenHeight - height) / 2
    };
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Set responsive dimensions
      const dimensions = getResponsiveDimensions();
      setWindowDimensions(dimensions);
      
      setTimeout(() => {
        setIsFullyLoaded(true);
      }, 300);
    } else {
      setIsFullyLoaded(false);
      setIsAnimating(false);
      setIsFullscreen(false);
      setIsResizing(false);
      setIsDragging(false);
    }
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && !isFullscreen && !isResizing && !isDragging) {
        const dimensions = getResponsiveDimensions();
        setWindowDimensions(prev => ({
          ...prev,
          x: Math.min(prev.x, window.innerWidth - prev.width),
          y: Math.min(prev.y, window.innerHeight - prev.height)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, isFullscreen, isResizing, isDragging]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isFullscreen) return; // Disable drag in fullscreen
    
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate offset from mouse position to window top-left corner
    setDragOffset({
      x: clientX - windowDimensions.x,
      y: clientY - windowDimensions.y
    });

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      let newX = currentX - dragOffset.x;
      let newY = currentY - dragOffset.y;
      
      // Keep window within screen bounds
      const maxX = window.innerWidth - windowDimensions.width;
      const maxY = window.innerHeight - windowDimensions.height;
      
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      setWindowDimensions(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.body.style.cursor = 'move';
    document.body.style.userSelect = 'none';
  };

  const handleResizeStart = (direction: string) => (e: React.MouseEvent | React.TouchEvent) => {
    if (isFullscreen || window.innerWidth < 768) return; // Disable resize on mobile
    
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering drag when resizing
    setIsResizing(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const startX = clientX;
    const startY = clientY;
    const startWidth = windowDimensions.width;
    const startHeight = windowDimensions.height;
    const startPosX = windowDimensions.x;
    const startPosY = windowDimensions.y;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      // Responsive minimum sizes
      const minWidth = window.innerWidth < 1024 ? 320 : 400;
      const minHeight = window.innerHeight < 768 ? 200 : 300;

      // Handle different resize directions
      if (direction.includes('right')) {
        newWidth = Math.max(minWidth, Math.min(window.innerWidth - startPosX, startWidth + deltaX));
      }
      if (direction.includes('left')) {
        newWidth = Math.max(minWidth, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minHeight, Math.min(window.innerHeight - startPosY, startHeight + deltaY));
      }
      if (direction.includes('top')) {
        newHeight = Math.max(minHeight, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      // Keep window within screen bounds
      if (newX < 0) {
        newWidth += newX;
        newX = 0;
      }
      if (newY < 0) {
        newHeight += newY;
        newY = 0;
      }
      if (newX + newWidth > window.innerWidth) {
        newWidth = window.innerWidth - newX;
      }
      if (newY + newHeight > window.innerHeight) {
        newHeight = window.innerHeight - newY;
      }

      setWindowDimensions({ width: newWidth, height: newHeight, x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.body.style.cursor = getResizeCursor(direction);
    document.body.style.userSelect = 'none';
  };

  const getResizeCursor = (direction: string) => {
    if (direction === 'top' || direction === 'bottom') return 'ns-resize';
    if (direction === 'left' || direction === 'right') return 'ew-resize';
    if (direction === 'top-left' || direction === 'bottom-right') return 'nw-resize';
    if (direction === 'top-right' || direction === 'bottom-left') return 'ne-resize';
    return 'default';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      {/* <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      /> */}
      
      {/* Window */}
      <div 
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-75 opacity-0 translate-y-10'
        }`}
        style={isFullscreen ? 
          { top: 0, left: 0, right: 0, bottom: 0 } :
          { 
            top: `${windowDimensions.y}px`, 
            left: `${windowDimensions.x}px`, 
            width: `${windowDimensions.width}px`, 
            height: `${windowDimensions.height}px` 
          }
        }
      >
        <div className={`w-full h-full bg-gray-100 dark:bg-gray-900 shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden relative ${
          isFullscreen ? 'rounded-none' : 'rounded-lg'
        }`}>
          {/* Resize Handles - Hidden on mobile */}
          {!isFullscreen && typeof window !== 'undefined' && window.innerWidth >= 768 && (
            <>
              {/* Corner handles */}
              <div 
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('top-left')}
                onTouchStart={handleResizeStart('top-left')}
              />
              <div 
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('top-right')}
                onTouchStart={handleResizeStart('top-right')}
              />
              <div 
                className="absolute bottom-0 left-0 w-3 h-3 cursor-ne-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('bottom-left')}
                onTouchStart={handleResizeStart('bottom-left')}
              />
              <div 
                className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('bottom-right')}
                onTouchStart={handleResizeStart('bottom-right')}
              />
              
              {/* Edge handles */}
              <div 
                className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('top')}
                onTouchStart={handleResizeStart('top')}
              />
              <div 
                className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('bottom')}
                onTouchStart={handleResizeStart('bottom')}
              />
              <div 
                className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('left')}
                onTouchStart={handleResizeStart('left')}
              />
              <div 
                className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize z-10 hover:bg-blue-500/20"
                onMouseDown={handleResizeStart('right')}
                onTouchStart={handleResizeStart('right')}
              />
            </>
          )}
          {/* Window Title Bar */}
          <div 
            className={`bg-gray-200 dark:bg-gray-800 px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between select-none ${
              !isFullscreen ? 'cursor-move' : ''
            } ${isDragging ? 'cursor-move' : ''}`}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* Window Controls */}
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                title="Close"
              />
              <button 
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                title="Minimize"
              />
              <button 
                onClick={toggleFullscreen}
                className={`w-3 h-3 rounded-full transition-colors ${
                  isFullscreen 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                title={isFullscreen ? "Restore" : "Fullscreen"}
              />
            </div>
            
            {/* Window Title */}
            <div className="flex-1 text-center">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Projects - Portfolio</h2>
            </div>
            
            {/* Window Menu */}
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Window Content */}
          <div className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
            {isFullyLoaded && (
              <div className="animate-fadeIn h-full">
                {/* Content Header */}
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
                    My Projects
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    A collection of my recent work and personal projects
                  </p>
                </div>

                {/* Responsive Project Grid */}
                <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {/* Project Cards */}
                  {[
                    {
                      title: "E-Commerce Platform",
                      description: "A full-stack e-commerce solution built with Next.js and Stripe integration.",
                      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
                      status: "Completed"
                    },
                    {
                      title: "Task Management App",
                      description: "A collaborative task management application with real-time updates.",
                      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
                      status: "In Progress"
                    },
                    {
                      title: "Portfolio Website",
                      description: "Personal portfolio website with Ubuntu desktop-like interface.",
                      tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
                      status: "Completed"
                    },
                    {
                      title: "Weather Dashboard",
                      description: "Real-time weather monitoring dashboard with location-based forecasts.",
                      tech: ["Vue.js", "Chart.js", "OpenWeather API"],
                      status: "Completed"
                    },
                    {
                      title: "Chat Application",
                      description: "Real-time messaging application with group chat functionality.",
                      tech: ["React", "Firebase", "Material-UI"],
                      status: "In Progress"
                    },
                    {
                      title: "Blog Platform",
                      description: "A modern blogging platform with markdown support and SEO optimization.",
                      tech: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
                      status: "Planning"
                    }
                  ].map((project, index) => (
                    <div 
                      key={index}
                      className={`
                        bg-white dark:bg-gray-800 
                        rounded-md sm:rounded-lg 
                        p-2 sm:p-3 md:p-4 lg:p-5
                        shadow-sm sm:shadow-md 
                        border border-gray-200 dark:border-gray-700 
                        hover:shadow-md sm:hover:shadow-lg 
                        transition-all duration-300 
                        cursor-pointer 
                        hover:scale-[1.01] sm:hover:scale-[1.02] 
                        animate-slideUp
                        min-h-[140px] sm:min-h-[160px] md:min-h-[180px]
                        flex flex-col
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 leading-tight flex-1 line-clamp-2">
                          {project.title}
                        </h3>
                        <span className={`
                          px-1.5 sm:px-2 py-0.5 sm:py-1 
                          rounded-full 
                          text-[10px] sm:text-xs 
                          font-medium 
                          whitespace-nowrap
                          flex-shrink-0
                          ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }
                        `}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Project Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-sm mb-2 sm:mb-3 leading-relaxed flex-1 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-auto">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="
                              px-1 sm:px-1.5 md:px-2 
                              py-0.5 sm:py-0.5 md:py-1 
                              bg-gray-100 dark:bg-gray-700 
                              text-gray-700 dark:text-gray-300 
                              rounded 
                              text-[10px] sm:text-xs 
                              font-medium
                              whitespace-nowrap
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Loading State - Responsive */}
            {!isFullyLoaded && (
              <div className="flex items-center justify-center h-32 sm:h-48 md:h-64">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-orange-500"></div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Loading projects...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;