import { useEffect, useState } from "react";

const BatteryStatusIndicator = () => {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState<boolean>(false);
    const [batterySupported, setBatterySupported] = useState<boolean>(true);
    
    useEffect(() => {
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                setBatteryLevel(Math.round(battery.level * 100));
                setIsCharging(battery.charging);
                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(Math.round(battery.level * 100));
                });
    
                battery.addEventListener('chargingchange', () => {
                    setIsCharging(battery.charging);
                });
            });
        } else {
            setBatterySupported(false);
        }
    }, []);

    return (
        <>
            {batterySupported && batteryLevel !== null && (
                <div className="flex items-center space-x-[0.5rem] text-xs text-gray-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                    </svg>
                    <span>{batteryLevel}%</span>
                    {isCharging && (
                        <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                        </svg>
                    )}
                </div>
            )}
        </>
    )
}


export default BatteryStatusIndicator;