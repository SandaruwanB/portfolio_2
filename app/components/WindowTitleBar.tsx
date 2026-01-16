import React from 'react';

interface WindowTitleBarProps {
    title: string;
    onClose: () => void;
    onToggleFullscreen: () => void;
    isFullscreen: boolean;
    isDragging: boolean;
    onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
}

const WindowTitleBar: React.FC<WindowTitleBarProps> = ({ 
    title, 
    onClose, 
    onToggleFullscreen, 
    isFullscreen, 
    isDragging,
    onDragStart 
}) => {
    return (
        <div 
            className={`bg-gray-200 dark:bg-gray-800 px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between select-none ${
                !isFullscreen ? 'cursor-move' : ''
            } ${isDragging ? 'cursor-move' : ''}`}
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
        >
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
                    onClick={onToggleFullscreen}
                    className={`w-3 h-3 rounded-full transition-colors ${
                        isFullscreen 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    title={isFullscreen ? "Restore" : "Fullscreen"}
                />
            </div>
      
            <div className="flex-1 text-center">
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h2>
            </div>

            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default WindowTitleBar;
