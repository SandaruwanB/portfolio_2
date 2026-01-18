import React from 'react';
import DottedIcon from './DottedIcon';

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
            <div className="flex items-center space-x-3 px-5 py-2 bg-gray-800/90 backdrop-blur-md rounded-3xl border border-gray-600/50 shadow-2xl gap-2">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200"
                        onClick={item.onClick}
                    >
                        <div className={`w-9 h-9 ${item.bgColor} rounded-lg flex items-center justify-center mb-0.5 ${item.hoverColor} transition-colors`}>
                            {item.icon}
                        </div>
                        <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                    </div>
                ))}

                <div className='px-[0.5px] bg-white h-10'></div>

                <div className="flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform duration-200">
                    <DottedIcon />
                </div>
            </div>
        </div>
    );
};

export default BottomBar;