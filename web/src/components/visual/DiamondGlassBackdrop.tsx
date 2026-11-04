"use client";

import React from "react";

export const DiamondGlassBackdrop: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Cosmic Sapphire Foundation */}
      <div className="absolute inset-0 bg-[#030914] dark:bg-[#030914] transition-colors duration-500" />

      {/* 2. Static Ambient Crystalline Nebula Glows */}
      <div className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(20,91,215,0.18)_0%,rgba(0,240,255,0.08)_40%,transparent_70%)] blur-[90px]" />
      <div className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,rgba(217,168,63,0.06)_45%,transparent_70%)] blur-[100px]" />
      <div className="absolute -bottom-[15%] left-[25%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.14)_0%,rgba(20,91,215,0.10)_45%,transparent_70%)] blur-[110px]" />

      {/* 3. Water Glass Caustic Wave Gradients */}
      <div 
        className="absolute inset-0 opacity-[0.28] dark:opacity-[0.35] mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 240, 255, 0.25), transparent),
            radial-gradient(ellipse 60% 40% at 85% 60%, rgba(245, 158, 11, 0.18), transparent),
            radial-gradient(ellipse 70% 60% at 15% 75%, rgba(20, 91, 215, 0.22), transparent)
          `
        }}
      />

      {/* 4. Static Diamond-Cut Isometric Facet Geometry (SVG Pattern) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.11]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id="diamondFacetGrid" 
            width="64" 
            height="64" 
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond Rhombus Facets */}
            <path 
              d="M32 0 L64 32 L32 64 L0 32 Z" 
              fill="none" 
              stroke="#00F0FF" 
              strokeWidth="0.75" 
            />
            {/* Inner Diagonal Refraction Accents */}
            <path 
              d="M0 0 L64 64 M64 0 L0 64" 
              stroke="#F59E0B" 
              strokeWidth="0.4" 
              strokeDasharray="4 8"
            />
            {/* Center Crystal Sparkle Node */}
            <circle cx="32" cy="32" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamondFacetGrid)" />
      </svg>

      {/* 5. Crystalline Prism Vignette & Subtle Horizon Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,9,20,0.65)_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
};
