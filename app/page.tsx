'use client';
import React, {useEffect, useState} from "react";
import TimeSettings from '../components/TimeSettings';

export default function Page() {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [selectedCity, setCity] = useState('Tokyo, Japan 🇯🇵');

    useEffect(() => {
        const updateTime = () => {
            const selectedTimeZone = localStorage.getItem('selectedTimeZone') ?? 'Asia/Tokyo';
            const selectedCityName = localStorage.getItem('selectedCityName') ?? 'Tokyo, Japan 🇯🇵';

            const tokyoTime = new Date().toLocaleString('en-US', {
                timeZone: selectedTimeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const tokyoDate = new Date().toLocaleString('en-US', {
                timeZone: selectedTimeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            setTime(tokyoTime);
            setDate(tokyoDate);
            setCity(selectedCityName);
        };

        updateTime();
        const interval = setInterval(updateTime, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative"><TimeSettings />
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
            <h1 className="text-2xl font-bold text-gray-800">Current time in {selectedCity}</h1>
            <p className="text-4xl font-mono text-gray-900 mt-4">{time}</p>
            <p className="text-lg text-gray-600 mt-2">{date}</p>
        </div>
        </div>
    );
}