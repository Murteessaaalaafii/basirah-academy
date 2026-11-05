"use client";

import React, { useEffect, useState } from "react";
import { useBasirahStore } from "@/lib/store";

export const DiamondGlassBackdrop: React.FC = () => {
  const { theme } = useBasirahStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === "dark";

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-colors duration-500"
      aria-hidden="true"
    >
      {/* 1. Base Liquid Glass Foundation (Dual Theme) */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark 
            ? "bg-[#030914]" 
            : "bg-gradient-to-b from-[#EDF5FF] via-[#E4EFFE] to-[#F3F8FF]"
        }`} 
      />

      {/* 2. Real Water Glass Ambient Caustic Glows */}
      {isDark ? (
        <>
          {/* Dark Mode Cosmic Bioluminescent Caustics */}
          <div className="absolute -top-[15%] left-[8%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(20,91,215,0.22)_0%,rgba(0,240,255,0.10)_45%,transparent_70%)] blur-[95px] animate-pulse-slow" />
          <div className="absolute top-[30%] -right-[8%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18)_0%,rgba(217,168,63,0.08)_45%,transparent_70%)] blur-[105px]" />
          <div className="absolute -bottom-[15%] left-[20%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.16)_0%,rgba(20,91,215,0.12)_45%,transparent_70%)] blur-[115px]" />
        </>
      ) : (
        <>
          {/* Light/Bright Mode Sunlit Crystalline Lagoon Water Caustics */}
          <div className="absolute -top-[12%] left-[10%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,180,216,0.18)_0%,rgba(72,202,228,0.10)_45%,transparent_70%)] blur-[90px]" />
          <div className="absolute top-[25%] -right-[5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(254,215,102,0.08)_40%,transparent_70%)] blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[25%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,150,199,0.14)_0%,rgba(144,224,239,0.12)_50%,transparent_70%)] blur-[110px]" />
        </>
      )}

      {/* 3. Real Reflective Water Glass Wave Caustics Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark 
            ? "opacity-[0.32] mix-blend-screen" 
            : "opacity-[0.45] mix-blend-multiply"
        }`}
        style={{
          backgroundImage: isDark
            ? `
              radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0, 240, 255, 0.28), transparent),
              radial-gradient(ellipse 70% 50% at 90% 55%, rgba(245, 158, 11, 0.20), transparent),
              radial-gradient(ellipse 80% 65% at 10% 80%, rgba(20, 91, 215, 0.25), transparent)
            `
            : `
              radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0, 180, 216, 0.22), transparent),
              radial-gradient(ellipse 70% 50% at 90% 55%, rgba(217, 168, 63, 0.16), transparent),
              radial-gradient(ellipse 80% 65% at 10% 80%, rgba(0, 119, 182, 0.18), transparent)
            `
        }}
      />

      {/* 4. Realistic Water Refraction Sine Ripple Pattern */}
      <svg 
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isDark ? "opacity-[0.12]" : "opacity-[0.16]"
        }`} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id="waterCausticPattern" 
            width="80" 
            height="80" 
            patternUnits="userSpaceOnUse"
          >
            {/* Water Caustic Curvature Lines */}
            <path 
              d="M0 20 Q 20 10, 40 20 T 80 20" 
              fill="none" 
              stroke={isDark ? "#00F0FF" : "#0096C7"} 
              strokeWidth="0.8" 
              strokeOpacity="0.7"
            />
            <path 
              d="M0 60 Q 20 70, 40 60 T 80 60" 
              fill="none" 
              stroke={isDark ? "#F59E0B" : "#D9A83F"} 
              strokeWidth="0.6" 
              strokeOpacity="0.6"
            />
            {/* Diamond Rhombus Water Facets */}
            <path 
              d="M40 0 L80 40 L40 80 L0 40 Z" 
              fill="none" 
              stroke={isDark ? "#00F0FF" : "#023E8A"} 
              strokeWidth="0.4" 
              strokeDasharray="2 6"
              strokeOpacity="0.5"
            />
            {/* Glistening Sunlight/Moonlight Specular Node */}
            <circle 
              cx="40" 
              cy="40" 
              r="1.8" 
              fill={isDark ? "#FFFFFF" : "#0077B6"} 
              opacity={isDark ? "0.7" : "0.5"} 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waterCausticPattern)" />
      </svg>

      {/* 5. Real Reflective Water Glass Surface Sheen & Prismatic Bevel */}
      <div 
        className={`absolute top-0 left-0 right-0 h-28 pointer-events-none transition-opacity duration-700 ${
          isDark
            ? "bg-gradient-to-b from-cyan-400/15 via-cyan-400/5 to-transparent"
            : "bg-gradient-to-b from-white/80 via-white/30 to-transparent"
        }`} 
      />
      <div 
        className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
        }`} 
      />

      {/* 6. Soft Radial Vignette for Depth */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark 
            ? "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,9,20,0.7)_100%)]" 
            : "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(219,234,254,0.4)_100%)]"
        }`} 
      />
    </div>
  );
};
