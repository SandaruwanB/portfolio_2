"use client";

import { useEffect, useState } from 'react';
import BatteryStatusIndicator from './BatteryStatusIndicator';

const Header = () => {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState<boolean>(false);
    const [batterySupported, setBatterySupported] = useState<boolean>(true);

    useEffect(() => {
        // Check if Battery Status API is supported
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                // Set initial values
                setBatteryLevel(Math.round(battery.level * 100));
                setIsCharging(battery.charging);

                // Update battery level when it changes
                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(Math.round(battery.level * 100));
                });

                // Update charging status when it changes
                battery.addEventListener('chargingchange', () => {
                    setIsCharging(battery.charging);
                });
            });
        } else {
            setBatterySupported(false);
        }
    }, []);

    const getBatteryColor = () => {
        if (batteryLevel === null) return 'bg-gray-500';
        if (isCharging) return 'bg-blue-500';
        if (batteryLevel > 50) return 'bg-green-500';
        if (batteryLevel > 20) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
                <div className="flex items-center justify-between h-full px-4">
                    <div className="text-sm text-gray-300 font-semibold">Portfolio</div>
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="flex space-x-2">
                        </div>
                        <BatteryStatusIndicator />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;