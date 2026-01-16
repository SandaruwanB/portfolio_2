"use client";

import { useEffect, useState } from 'react';

const TimeIndicator = () => {
    const [currentTime, setCurrentTime] = useState<string>('');

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
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-xs text-gray-300 font-medium">
            {currentTime}
        </div>
    );
};

export default TimeIndicator;