import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  shadowColor: string;
}

const colors = [
  { bg: "bg-yellow-600", shadow: "rgba(161, 98, 7, 0.95)" },
  { bg: "bg-orange-500", shadow: "rgba(249, 115, 22, 0.95)" },
  { bg: "bg-amber-500", shadow: "rgba(245, 158, 11, 0.95)" },
  { bg: "bg-red-500", shadow: "rgba(239, 68, 68, 0.95)" },
  { bg: "bg-pink-500", shadow: "rgba(236, 72, 153, 0.95)" },
];

const SparklingBackground: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles: Sparkle[] = Array.from({ length: 50 }, (_, i) => {
      const colorIndex = Math.floor(Math.random() * colors.length);
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        color: colors[colorIndex].bg,
        shadowColor: colors[colorIndex].shadow,
      };
    });
    setSparkles(initialSparkles);

    // Update sparkles periodically
    const interval = setInterval(() => {
      setSparkles((prevSparkles) =>
        prevSparkles.map((sparkle) => {
          const colorIndex = Math.floor(Math.random() * colors.length);
          return {
            ...sparkle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            color: colors[colorIndex].bg,
            shadowColor: colors[colorIndex].shadow,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <style>
        {`
          @keyframes sparkle {
            0% {
              opacity: 0.5;
              transform: scale(0.5);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
            }
            100% {
              opacity: 0.5;
              transform: scale(0.5);
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
            animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
            opacity: 0.5,
            boxShadow: `0 0 20px ${sparkle.shadowColor}`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default SparklingBackground;
