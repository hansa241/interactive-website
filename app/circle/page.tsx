'use client';
import React, {useState, useRef} from 'react';

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{x: number, y: number} | null>(null);
    const [colorIndex, setColorIndex] = useState<number>(0);

    const boxSize = 512; // px
    const circleSize = 32; // px
    const circleColors = ['bg-blue-500', 'bg-red-500', 'bg-green-500'];

    const handleMouseMovement = (event: React.MouseEvent) => {
      if (containerRef.current === null) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const invertedX = rect.width - x;
      const invertedY = rect.height - y;
      setPos({x: invertedX, y: invertedY});
    };

    const handleMouseLeave = () => {setPos(null)};

    const handleCircleClick = () => {
        setColorIndex((prev) => (prev + 1) % circleColors.length);
    };

    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
          <div
              ref={containerRef}
              className="border border-gray-500 relative bg-gray-100"
              onMouseMove={handleMouseMovement}
              onMouseLeave={handleMouseLeave}
              style={{width: boxSize, height: boxSize}}
          >
              {pos && (
                  <div
                      className={`rounded-full absolute ${circleColors[colorIndex]}`}
                      onClick={handleCircleClick}
                      style={{
                          width: circleSize,
                          height: circleSize,
                          left: pos.x,
                          top: pos.y,
                          transform: 'translate(-50%, -50%)',
                      }}
                  />
              )}
          </div>
      </div>
    );
}