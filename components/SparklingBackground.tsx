import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const SparklingBackground: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const colors = [
    "bg-red-700",
    "bg-blue-700",
    "bg-green-700",
    "bg-yellow-600",
    "bg-purple-700",
    "bg-pink-700",
    "bg-indigo-700",
    "bg-teal-700",
    "bg-orange-600",
    "bg-cyan-700",
    "bg-rose-700",
    "bg-violet-700",
    "bg-emerald-700",
    "bg-amber-600",
    "bg-fuchsia-700",
  ];

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles: Sparkle[] = Array.from({ length: 100 }, (_, i) => {
      const isSecondString = i >= 50;
      const baseAngle = (i % 50) * Math.PI * 2; // Full rotation
      const twistAngle = isSecondString ? Math.PI : 0; // Offset second string by 180 degrees
      const radius = 2; // Distance from center
      return {
        id: i,
        x: 95 + Math.cos(baseAngle + twistAngle) * radius, // Moved to far right
        y: ((i % 50) / 50) * 100, // Evenly spaced vertically
        size: Math.random() * 8 + 6,
        delay: 0,
        duration: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setSparkles(initialSparkles);

    // Update sparkles periodically
    const interval = setInterval(() => {
      setSparkles((prevSparkles) =>
        prevSparkles.map((sparkle, i) => {
          const isSecondString = i >= 50;
          const baseAngle = ((i % 50) / 50) * Math.PI * 2 + Date.now() / 30000;
          const twistAngle = isSecondString ? Math.PI : 0;
          const radius = 2;
          return {
            ...sparkle,
            x: 95 + Math.cos(baseAngle + twistAngle) * radius, // Moved to far right
            y: ((i % 50) / 50) * 100,
            delay: Math.random() * 15 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 6,
          };
        })
      );
    }, 200); // Much slower update interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <style>
        {`
          @keyframes sparkle {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`absolute rounded-full ${sparkle.color}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: 1,
            pointerEvents: "none",
            boxShadow: `
              2px 2px 4px rgba(0, 0, 0, 0.2),
              -2px -2px 4px rgba(255, 255, 255, 0.8),
              inset 1px 1px 2px rgba(255, 255, 255, 0.3),
              inset -1px -1px 2px rgba(0, 0, 0, 0.1)
            `,
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
};

export default SparklingBackground;
