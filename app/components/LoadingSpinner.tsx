import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading...' }) => {
    return (
        <div className="flex items-center justify-center h-32 sm:h-48 md:h-64">
            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-orange-500"></div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{text}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
