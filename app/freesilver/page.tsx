'use client';
import React, {useState} from 'react';
import {motion} from 'motion/react';
import {DollarSign, Ban} from 'lucide-react';

export default function Page() {
    const [position, setPosition] = useState<string | null>(null);

    const handleChoice = (choice: string) => {
        setPosition(choice);
    };

    return (
        <main className="min-h-screen flex flex-col items-center
        justify-center bg-gradient-to-br from-slate-950 to-gray-600 text-white p-4">
            <motion.div
                className="p-6 bg-gray-600 bg-opacity-10 rounded-2xl shadow-2xl mb-8"
                layout={true}
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="text-4xl font-extrabold mb-4 flex items-center space-x-3">
                    <DollarSign size={48}/>
                    <span>Free Silver</span>
                </h1>
                <p className="text-lg italic mb-6">
                    Are you PRO or ANTI Coinage Act of 1873?
                </p>
                <div className="flex justify-between mb-4">
                    <button
                        className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
                        onClick={() => handleChoice('PRO')}
                    >
                        <span className="flex items-center space-x-2">
                            <DollarSign/>
                            <span>PRO</span>
                        </span>
                    </button>
                    <button
                        className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleChoice('ANTI')}
                    >
                        <span className="flex items-center space-x-2">
                            <Ban/>
                            <span>ANTI</span>
                        </span>
                    </button>
                </div>
                {position && (
                    <motion.p
                        className="mt-6 text-2xl font-bold"
                        initial={{y: -10, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{type: 'spring', stiffness: 120}}
                    >
                        You are {position} <i>Coinage Act of 1873</i>
                    </motion.p>
                )}
            </motion.div>
        </main>
    )
}