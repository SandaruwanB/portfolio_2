import React from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    status: 'Completed' | 'In Progress' | 'Planning';
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, status, index }) => {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div 
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
            <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 leading-tight flex-1 line-clamp-2">
                    {title}
                </h3>
                <span className={`
                    px-1.5 sm:px-2 py-0.5 sm:py-1 
                    rounded-full 
                    text-[10px] sm:text-xs 
                    font-medium 
                    whitespace-nowrap
                    flex-shrink-0
                    ${getStatusStyles(status)}
                `}>
                    {status}
                </span>
            </div>
      
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-sm mb-2 sm:mb-3 leading-relaxed flex-1 line-clamp-3">
                {description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-auto">
                {tech.map((techItem, techIndex) => (
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
                        {techItem}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;
