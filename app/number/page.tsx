'use client';
import React from "react";

export default function Page() {
    const update = (i: number) => {
        let previous: string | number | null = sessionStorage.getItem('previous');
        if (previous != null) {
            previous = Number.parseInt(previous);
            const result = document.getElementById('resultNumber');
            if (result != null) result.innerText = String(i + previous);
        }
        sessionStorage.setItem('previous', String(i));
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-amber-100">
            <div className="flex flex-col items-center gap-4">
                <div className="grid grid-cols-5 gap-3">
                    {Array.from({length: 10}, (_, i) => (
                        <button
                            onClick={() => update(i)}
                            key={i}
                            className="px-5 py-2 text-black rounded-2xl bg-amber-300 hover:bg-amber-500 transition"
                        >{i}
                        </button>
                    ))}
                </div>
                <p id="resultNumber">-</p>
            </div>
        </div>
    );
}
