import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: { background: string; border: string };
}

const SparklingBackground: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const colors = [
    { background: "#6da9fd", border: "#a8c9ff" },
    { background: "#C03221", border: "#e05a4a" },
    { background: "#F9C22E", border: "#ffd86b" },
  ];

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles: Sparkle[] = Array.from({ length: 300 }, (_, i) => {
      const strandIndex = Math.floor(i / 100);
      const baseAngle = (i % 100) * Math.PI * 2;
      // Create a staggered twisting pattern
      const phaseOffset = strandIndex * (Math.PI / 2); // Different phase for each strand
      const twistAngle =
        strandIndex * (Math.PI / 3) +
        Math.sin(baseAngle / 4 + phaseOffset) *
          Math.PI *
          (strandIndex === 2 ? -1 : 1);
      // Vary the radius to create a spiral effect
      const radius =
        3 +
        Math.sin(baseAngle / 8 + strandIndex * (Math.PI / 3) + phaseOffset) * 2;
      return {
        id: i,
        x: 95 + Math.cos(baseAngle + twistAngle) * radius,
        y: ((i % 100) / 100) * 100,
        size: Math.random() * 12 + 10,
        delay: 0,
        duration: 0,
        color: colors[strandIndex],
      };
    });
    setSparkles(initialSparkles);

    // Update sparkles periodically
    const interval = setInterval(() => {
      setSparkles((prevSparkles) =>
        prevSparkles.map((sparkle, i) => {
          const strandIndex = Math.floor(i / 100);
          const baseAngle =
            ((i % 100) / 100) * Math.PI * 2 + Date.now() / 240000;
          // Create a staggered twisting pattern
          const phaseOffset = strandIndex * (Math.PI / 2); // Different phase for each strand
          const twistAngle =
            strandIndex * (Math.PI / 3) +
            Math.sin(baseAngle / 4 + phaseOffset) *
              Math.PI *
              (strandIndex === 2 ? -1 : 1);
          // Vary the radius to create a spiral effect
          const radius =
            3 +
            Math.sin(
              baseAngle / 8 + strandIndex * (Math.PI / 3) + phaseOffset
            ) *
              2;
          return {
            ...sparkle,
            x: 95 + Math.cos(baseAngle + twistAngle) * radius,
            y: ((i % 100) / 100) * 100,
            delay: Math.random() * 15 + 7,
            duration: Math.random() * 6 + 4,
            color: colors[strandIndex],
            size: Math.random() * 12 + 10,
          };
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <style>
        {`
          @keyframes sparkle {
            0% {
              transform: scale(0.98);
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(0.98);
            }
          }
        `}
      </style>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
            pointerEvents: "none",
            backgroundColor: sparkle.color.background,
            border: `2px solid ${sparkle.color.border}`,
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
};

export default SparklingBackground;
