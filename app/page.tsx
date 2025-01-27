'use client';
import React, { useEffect, useState } from "react";

export default function Page() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const tokyoTime = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const tokyoDate = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Tokyo',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            setTime(tokyoTime);
            setDate(tokyoDate);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Current time in Tokyo, Japan:</h1>
            <p className="text-4xl font-mono text-gray-900 mt-4">{time}</p>
            <p className="text-lg text-gray-600 mt-2">{date}</p>
        </div>
    );
}