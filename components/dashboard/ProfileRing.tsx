"use client";
import { useEffect, useState } from "react";

/**
 * SVG ring that animates from 0 to the given percentage.
 * Shows the agent's initial letter in the center.
 */
export default function ProfileRing({
  value,
  initial,
  size = 56,
}: {
  value: number;
  initial: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimatedValue(value);
    });
    return () => cancelAnimationFrame(timer);
  }, [value]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E7E3F2"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E42BC" />
            <stop offset="100%" stopColor="#F982FF" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center avatar */}
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="rounded-full bg-gradient-accent flex items-center justify-center text-white font-black shadow-glow-sm"
          style={{ width: size - strokeWidth * 4, height: size - strokeWidth * 4, fontSize: size * 0.28 }}
        >
          {initial}
        </div>
      </div>
    </div>
  );
}
