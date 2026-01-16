import React from 'react';

export interface BottomBarMenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    bgColor: string;
    hoverColor: string;
    onClick: () => void;
}

interface BottomBarProps {
    menuItems: BottomBarMenuItem[];
}

const BottomBar: React.FC<BottomBarProps> = ({ menuItems }) => {
    return (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 px-6 py-3 bg-gray-800/90 backdrop-blur-md rounded-full border border-gray-600/50 shadow-2xl">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200"
                        onClick={item.onClick}
                    >
                        <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-1 ${item.hoverColor} transition-colors`}>
                            {item.icon}
                        </div>
                        <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomBar;