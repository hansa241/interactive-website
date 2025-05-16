'use client';
import React, {useEffect, useState} from 'react';

export default function Page() {
    const getRandomColor = () => {
        const hex = Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, '0');
        return `#${hex}`;
    };

    const [color, setColor] = useState<string>('#ffffff');

    useEffect(() => {
        setColor(getRandomColor());
    }, []);

    const randomizeColor = () => setColor(getRandomColor());

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(color);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <main className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div
                onClick={randomizeColor}
                style={{ backgroundColor: color }}
                className="w-52 h-52 rounded-full shadow-lg cursor-pointer mb-5 transition-all duration-300"
                title="Click to change color"
            />
            <p className="text-lg mb-2">
                Current Color: <span className="font-bold">{color}</span>
            </p>
            <button
                onClick={copyToClipboard}
                className="px-4 py-2 text-base rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
                Copy to Clipboard
            </button>
        </main>
    );
}
