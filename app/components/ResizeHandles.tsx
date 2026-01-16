import React from 'react';

interface ResizeHandlesProps {
    onResizeStart: (direction: string) => (e: React.MouseEvent | React.TouchEvent) => void;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResizeStart }) => {
    return (
        <>
            <div 
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('top-left')}
                onTouchStart={onResizeStart('top-left')}
            />
            <div 
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('top-right')}
                onTouchStart={onResizeStart('top-right')}
            />
            <div 
                className="absolute bottom-0 left-0 w-3 h-3 cursor-ne-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('bottom-left')}
                onTouchStart={onResizeStart('bottom-left')}
            />
            <div 
                className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('bottom-right')}
                onTouchStart={onResizeStart('bottom-right')}
            />
      
            <div 
                className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('top')}
                onTouchStart={onResizeStart('top')}
            />
            <div 
                className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('bottom')}
                onTouchStart={onResizeStart('bottom')}
            />
            <div 
                className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('left')}
                onTouchStart={onResizeStart('left')}
            />
            <div 
                className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize z-10 hover:bg-blue-500/20"
                onMouseDown={onResizeStart('right')}
                onTouchStart={onResizeStart('right')}
            />
        </>
    );
};

export default ResizeHandles;
