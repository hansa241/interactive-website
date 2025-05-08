import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Image from "next/image";

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState({
        name: 'Tokyo, Japan 🇯🇵', timeZone: 'Asia/Tokyo'
    });
    const menuRef = useRef<HTMLDivElement | null>(null);

    const cities = [
        { name: 'Tokyo, Japan 🇯🇵', timeZone: 'Asia/Tokyo' },
        { name: 'Midway Atoll, USA 🇺🇸', timeZone: 'Pacific/Midway'},
        { name: 'Baghdad, Iraq 🇮🇶', timeZone: 'Asia/Baghdad' },
        { name: 'Kiritimati, Kiribati 🇰🇮', timeZone: 'Pacific/Kiritimati'},
        { name: 'Minneapolis, USA 🇺🇸', timeZone: 'America/Chicago' },
        { name: 'Amsterdam, NL 🇳🇱', timeZone: 'Europe/Amsterdam' }
    ];

    useEffect(() => {
        localStorage.setItem('selectedCityName', selectedCity.name);
        localStorage.setItem('selectedTimeZone', selectedCity.timeZone);
    }, [selectedCity]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const timeZone = event.target.value;
        const matchedCityName =
            cities.find((city) => city.timeZone === timeZone);
        if (matchedCityName) setSelectedCity(matchedCityName);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="absolute top-4 left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md
                focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Image src="/settings.svg" alt="Settings" width="24" height="24" />
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-16 left-4 bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">Settings</h3>
                    <div className="mt-4">
                        <label htmlFor="city-select" className="block text-sm font-medium text-gray-700">
                            Select a city:
                        </label>
                        <select
                            id="city-select"
                            value={selectedCity.timeZone}
                            onChange={handleCityChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md
                            shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            {cities.map((city) => (
                                <option key={city.timeZone} value={city.timeZone}>
                                    {city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}