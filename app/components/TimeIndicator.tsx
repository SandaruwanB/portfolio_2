"use client";

import { useEffect, useState } from 'react';

const TimeIndicator = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [showColon, setShowColon] = useState<boolean>(true);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
            
            setCurrentTime(`${hours}:${minutesStr} ${ampm}`);
        };
        
        updateTime();
        const timeIntervalId = setInterval(updateTime, 1000);
        
        const colonIntervalId = setInterval(() => {
            setShowColon(prev => !prev);
        }, 1000);
        
        return () => {
            clearInterval(timeIntervalId);
            clearInterval(colonIntervalId);
        };
    }, []);

    return (
        <div className="text-xs text-gray-300 font-bold">
            {currentTime.replace(':', showColon ? ':' : ' ')}
        </div>
    );
};

export default TimeIndicator;