"use client";

import BatteryStatusIndicator from './BatteryStatusIndicator';
import TimeIndicator from './TimeIndicator';
import Calendar from './Calander';

const Header = () => {
    return (
        <>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 z-50">
                <div className="flex items-center justify-between h-full px-4">
                    <div className="text-sm text-gray-300 font-semibold">Portfolio</div>
                    <div className="flex items-center space-x-3">
                        <Calendar />
                        <TimeIndicator />
                        <BatteryStatusIndicator />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;