"use client";

import React, { useEffect, useState } from 'react';
import WindowTitleBar from './WindowTitleBar';
import ResizeHandles from './ResizeHandles';
import LoadingSpinner from './LoadingSpinner';

interface WindowContainerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    loadingText?: string;
}

const WindowContainer: React.FC<WindowContainerProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children,
    loadingText = 'Loading...'
}) => {
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

    const getResponsiveDimensions = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        if (screenWidth < 640) {
            return {
                width: screenWidth - 8,
                height: screenHeight - 16,
                x: 4,
                y: 8
            };
        }
    
        if (screenWidth < 768) {
            return {
                width: screenWidth - 32,
                height: screenHeight - 64,
                x: 16,
                y: 32
            };
        }
    
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

    useEffect(() => {
        const handleResize = () => {
            if (isOpen && !isFullscreen && !isResizing && !isDragging) {
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
        if (isFullscreen) return;
    
        e.preventDefault();
        setIsDragging(true);
    
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
        const offsetX = clientX - windowDimensions.x;
        const offsetY = clientY - windowDimensions.y;
        const width = windowDimensions.width;
        const height = windowDimensions.height;

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
            let newX = currentX - offsetX;
            let newY = currentY - offsetY;

            const maxX = window.innerWidth - width;
            const maxY = window.innerHeight - height;
      
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
        if (isFullscreen || window.innerWidth < 768) return;
    
        e.preventDefault();
        e.stopPropagation();
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

            const minWidth = window.innerWidth < 1024 ? 320 : 400;
            const minHeight = window.innerHeight < 768 ? 200 : 300;

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
                {!isFullscreen && typeof window !== 'undefined' && window.innerWidth >= 768 && (
                    <ResizeHandles onResizeStart={handleResizeStart} />
                )}

                <WindowTitleBar 
                    title={title}
                    onClose={onClose}
                    onToggleFullscreen={toggleFullscreen}
                    isFullscreen={isFullscreen}
                    isDragging={isDragging}
                    onDragStart={handleDragStart}
                />
        
                <div className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
                    {isFullyLoaded ? (
                        <div className="animate-fadeIn h-full">
                            {children}
                        </div>
                    ) : (
                        <LoadingSpinner text={loadingText} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WindowContainer;
