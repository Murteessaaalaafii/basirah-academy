"use client";

import React from "react";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtext?: string;
}

export const IntelligentProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 140,
  strokeWidth = 10,
  label = "Mastery",
  subtext
}) => {
  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg height={size} width={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#145BD7" />
              <stop offset="60%" stop-color="#16D9F5" />
              <stop offset="100%" stop-color="#D9A83F" />
            </linearGradient>
          </defs>

          {/* Track background */}
          <circle
            stroke="#0B2044"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />

          {/* Animated Progress Arc */}
          <circle
            stroke="url(#ringGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 0.8s ease-in-out" }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-heading font-bold text-2xl text-pearl">{progress}%</span>
          <span className="font-mono text-[10px] text-cyan uppercase tracking-wider">{label}</span>
        </div>
      </div>
      {subtext && <span className="mt-2 text-xs text-slate-soft text-center">{subtext}</span>}
    </div>
  );
};

