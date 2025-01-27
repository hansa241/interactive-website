import React, {useEffect, useRef, useState} from 'react';

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                <img src="/settings.svg" alt="Settings" className="w-6 h-6" />
            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-16 left-4 bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">Settings</h3>
                </div>
            )}
        </div>
    );
}