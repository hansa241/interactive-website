'use client';
import React, {Fragment, useEffect, useState} from 'react';

export default function Page() {
    const symbol = 'PIZ';
    const volatility = 1; // max price increase (decrease if inverted) per second
    const [prices, setPrices] = useState<number[]>([30.00]);
    const [lineColor, setLineColor] = useState<string>('green');
    const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
    const [profitLoss, setProfitLoss]    = useState<number | null>(null);
    const currentPrice = prices[prices.length - 1];

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => {
                const last = prev[prev.length - 1];
                const delta = Math.random() * volatility * 2 - volatility; // between -volatility and volatility
                setLineColor(delta >= 0 ? 'green' : 'red');
                const next = +(last + delta).toFixed(2);
                return [...prev, next];
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleBuy = () => {
        if (purchasePrice === null) {
            setPurchasePrice(currentPrice);
            setProfitLoss(null);
        }
    }

    const handleSell = () => {
        if (purchasePrice !== null) {
            const pl = +(currentPrice - purchasePrice).toFixed(2);
            setProfitLoss(pl);
            setPurchasePrice(null);
        }
    }

    const yValues = [0, 50, 100, 150, 200, 250, 300];

    // price --> SVG path
    const xStart = 50;
    const xEnd = 550;
    const widthSpan = xEnd - xStart;
    const count = prices.length;
    const denom = count > 1 ? count - 1 : 1;
    const pathPoints = prices
        .map((p, i) => {
            const x = xStart + (i / denom) * widthSpan;
            const y = 300 - p * 5; // map price to y coordinate
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{symbol}</h1>
                <span className="text-2xl">{prices[prices.length - 1].toFixed(2)}</span>
            </div>

            <div className="w-full max-w-4xl h-64 border-2 border-black bg-white relative">
                <svg viewBox="0 0 600 300" className="w-full h-full">
                    {yValues.map(y => (
                        <Fragment key={`grid-${y}`}>
                            <line
                                x1={xStart}
                                y1={y}
                                x2={xEnd}
                                y2={y}
                                stroke="#e2e8f0"
                                strokeWidth={1}
                            />
                            <text
                                x={xStart - 5}
                                y={y + 4}
                                textAnchor="end"
                                fontSize={12}
                                fill="gray"
                            >
                                {((300 - y) / 5).toFixed(0)}
                            </text>
                        </Fragment>
                    ))}

                    <line
                        x1={xStart}
                        y1={0}
                        x2={xStart}
                        y2={300}
                        stroke="black"
                        strokeWidth={2}
                    />

                    <polyline
                        points={pathPoints}
                        stroke={lineColor}
                        strokeWidth={2}
                        fill="none"
                    />
                </svg>

                <button
                    onClick={handleBuy}
                    className="absolute bottom-0 left-0 mb-2 ml-2 text-lg"
                >
                    Buy
                </button>
                <button
                    onClick={handleSell}
                    className="absolute bottom-0 right-0 mb-2 mr-2 text-lg"
                >
                    Sell
                </button>
            </div>

            <div className="max-w-4xl mt-4 text-lg">
                {profitLoss != null ? (
                    <>Profit/Loss: {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)}</>
                ) : purchasePrice != null ? (
                    <>Bought at: {purchasePrice.toFixed(2)}</>
                ) : null}
            </div>
        </main>
    );
}
