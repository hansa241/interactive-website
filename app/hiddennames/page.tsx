'use client';
import React, { useState } from 'react';

type Cell = {
    word: string,
    color: 'blue' | 'red' | 'gray' | '';
};

/* max. 12 letters, all caps */
const WORD_BANK = [
    'TEMPLE', 'A. FANTANO', 'SUBARU', 'SAVANNA', 'PAWN STARS',
    'WORDLE', 'NEIGHBOR', 'SOUTH POLE', 'SKIBIDI', 'CORN MAZE',
    'DEFAULT MII', 'LANGUAGE', 'CRUISE SHIP', 'HAIRLESS CAT',
    'SMOKE BREAK', 'RED LOBSTER', 'FREQ. FLYER', 'CHICKEN',
    'AMONG US', 'CAR ON FIRE', 'FNAF', 'DESK CHAIR', 'SOMBRERO',
    'FIONA APPLE', 'EMPTY PLAYG', 'PATCH', 'PUFF', 'DONKEY',
    'BLANK', 'GUMBALL', 'HOWIE MANDEL', 'BRIAN DOG', 'FAMILY GUY',
    'STEVE', 'MINECRAFT', 'SKELETON', 'GERMANY', 'SON',
    'NEW TRENDS', 'PLACEHOLDER', 'INTERACTION', 'YOUR BED',
    'WARRANTY', 'REACT', 'YESTERDAY', 'DRAGON', 'HARPY', 'HORSE',
    'GEORGIA', 'ROYALTY', 'GHOST', 'ROSE', 'GENES', 'AWARD',
    'DINOSAUR', 'YERBA MATE', 'ENERGY', 'MITOCHONDRIA', 'MOON',
];

export default function Page() {
    const [grid, setGrid] = useState<Cell[][]>(
        Array.from({ length: 5 }, () =>
            Array.from({ length: 5 }, () => ({ word: '', color: '' }))
        )
    );
    const [selectedColor, setSelectedColor] = useState<'blue' | 'red' | 'gray' | null>(null);
    const [shareString, setShareString] = useState('');

    const handleCellClick = (r: number, c: number) => {
        if (!selectedColor) return;
        setGrid(prev => {
            const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
            newGrid[r][c].color = selectedColor;
            return newGrid;
        });
        setSelectedColor(null);
    };

    const handleWordChange = (r: number, c: number, value: string) => {
        const word = value.slice(0, 12).toUpperCase();
        setGrid(prev => {
            const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
            newGrid[r][c].word = word;
            return newGrid;
        });
    };

    const exportWords = () => {
        const letters = grid.map(row => row.map(cell => cell.word));
        const json = JSON.stringify(letters);
        setShareString(btoa(json));
    };

    const importWords = () => {
        try {
            const decoded = atob(shareString.trim());
            const words: string[][] = JSON.parse(decoded);
            if (
                Array.isArray(words) &&
                words.length === 5 &&
                words.every(row => Array.isArray(row) && row.length === 5)
            ) {
                setGrid(prev =>
                    prev.map((row, r) =>
                        row.map((cell, c) => ({
                            word: words[r][c] || '',
                            color: cell.color,
                        }))
                    )
                );
            }
        } catch (e) {
            console.error('Invalid import string', e);
        }
    };

    const colorClass = (color: Cell['color']) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-500 text-white';
            case 'red':
                return 'bg-red-500 text-white';
            case 'gray':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-white';
        }
    };

    const clearColors = () => {
        setGrid(prev =>
            prev.map(row =>
                row.map(cell => ({
                    ...cell,
                    color: '',
                })),
            ),
        );
    };

    const shuffleBoard = () => {
        const words = [...WORD_BANK];
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }

        setGrid(prev =>
            prev.map((row, r) =>
                row.map((cell, c) => ({
                    ...cell,
                    word: (words[(r * 5 + c) % words.length] || '').slice(0, 12),
                })),
            ),
        );
    };

    return (
        <main className="p-4 mx-auto max-w-full sm:max-w-xl">
            <div className="flex space-x-2 mb-4">
                {(['blue', 'red', 'gray'] as const).map(color => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded focus:outline-none ${selectedColor === color
                                ? `ring-2 ring-offset-2 ring-${color}-600`
                                : `bg-${color}-500 text-white`
                            }`}
                    >
                        Mark {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-8">
                    {grid.map((row, r) =>
                        row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                className={`border border-gray-300 w-[12ch] h-12 flex items-center justify-center ${colorClass(cell.color)}`}
                            >
                                <input
                                    type="text"
                                    maxLength={12}
                                    value={cell.word}
                                    onChange={e => handleWordChange(r, c, e.target.value)}
                                    className="w-full h-full text-center bg-transparent"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-6">
                <div className="flex space-x-2 mb-2">
                    <button
                        onClick={exportWords}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Export
                    </button>
                    <button
                        onClick={importWords}
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                        Import
                    </button>
                    <button
                        onClick={shuffleBoard}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                        Shuffle
                    </button>
                    <button
                        onClick={clearColors}
                        className="px-4 py-2 bg-black text-white rounded"
                    >
                        Clear
                    </button>
                </div>
                <textarea
                    value={shareString}
                    onChange={e => setShareString(e.target.value)}
                    rows={3}
                    placeholder="Paste import string or see export here"
                    className="w-full border border-gray-300 rounded p-2"
                />
            </div>
        </main>
    );
}
