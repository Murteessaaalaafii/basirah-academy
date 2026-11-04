"use client";

import React from "react";

export const PrismaticHeroComposition: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center select-none">
      {/* Background Volumetric Glows */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan/20 via-cobalt/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute w-72 h-72 bg-gold/15 blur-2xl rounded-full pointer-events-none transform translate-x-12 -translate-y-12" />

      {/* Main SVG Vector Composition */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full relative z-10 drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#145BD7" />
            <stop offset="50%" stop-color="#287BFF" />
            <stop offset="100%" stop-color="#16D9F5" />
          </linearGradient>

          <linearGradient id="heroGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#D9A83F" />
            <stop offset="50%" stop-color="#F2D18B" />
            <stop offset="100%" stop-color="#D9A83F" />
          </linearGradient>

          <linearGradient id="facetGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#16D9F5" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#0B2044" stop-opacity="0.85" />
          </linearGradient>

          <radialGradient id="centerIllumination" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
            <stop offset="30%" stop-color="#16D9F5" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#07162F" stop-opacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Orbital Rings with Stippled Dashes */}
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="85"
          fill="none"
          stroke="#16D9F5"
          stroke-width="1.2"
          stroke-dasharray="6,8"
          opacity="0.35"
          transform="rotate(-25 250 250)"
        />
        <ellipse
          cx="250"
          cy="250"
          rx="210"
          ry="85"
          fill="none"
          stroke="#D9A83F"
          stroke-width="1"
          stroke-dasharray="4,10"
          opacity="0.3"
          transform="rotate(40 250 250)"
        />
        <ellipse
          cx="250"
          cy="250"
          rx="225"
          ry="120"
          fill="none"
          stroke="#287BFF"
          stroke-width="0.8"
          opacity="0.25"
        />

        {/* Coordinate Reference Cross-Hairs */}
        <g stroke="#91A4C1" stroke-width="0.75" opacity="0.3">
          <line x1="50" y1="250" x2="450" y2="250" />
          <line x1="250" y1="50" x2="250" y2="450" />
          <circle cx="250" cy="250" r="160" fill="none" stroke-dasharray="3,6" />
        </g>

        {/* Refracted Photon Light Beams */}
        <g opacity="0.8">
          <polygon points="250,250 420,120 440,140" fill="url(#heroCyanGradient)" opacity="0.15" />
          <polygon points="250,250 430,340 410,360" fill="url(#heroGoldGradient)" opacity="0.15" />
          <polygon points="250,250 80,330 90,350" fill="url(#heroCyanGradient)" opacity="0.12" />
        </g>

        {/* Crystalline Core: The Prismatic B Monolith */}
        <g transform="translate(150, 140) scale(1.65)">
          {/* Base Prism Shield */}
          <polygon
            points="60,8 106,34 106,86 60,112 14,86 14,34"
            fill="url(#facetGlass)"
            stroke="url(#heroCyanGradient)"
            stroke-width="1.8"
          />

          {/* Spine Facets */}
          <polygon points="28,24 44,24 44,60 28,60" fill="#07162F" stroke="#16D9F5" stroke-width="0.7" />
          <polygon points="28,60 44,60 44,96 28,96" fill="#0B2044" stroke="#145BD7" stroke-width="0.7" />
          <polygon points="28,24 36,16 44,24" fill="url(#heroCyanGradient)" />
          <polygon points="28,96 36,104 44,96" fill="url(#heroGoldGradient)" />

          {/* Upper Loop */}
          <polygon points="44,24 76,24 88,38 76,56 44,56" fill="url(#heroCyanGradient)" opacity="0.9" />
          <polygon points="50,32 72,32 78,40 70,50 50,50" fill="#07162F" />

          {/* Lower Loop */}
          <polygon points="44,56 78,56 94,72 82,96 44,96" fill="#145BD7" />
          <polygon points="50,64 74,64 84,74 76,88 50,88" fill="#0B2044" stroke="url(#heroGoldGradient)" stroke-width="1" />

          {/* Central Prismatic Insight Jewel */}
          <polygon points="44,52 64,44 76,56 64,68 44,60" fill="url(#heroGoldGradient)" />
          <circle cx="60" cy="56" r="4.5" fill="url(#centerIllumination)" />
        </g>

        {/* Orbiting Quantum Electrons / Tensor Nodes */}
        <circle cx="95" cy="180" r="4.5" fill="#16D9F5" />
        <circle cx="415" cy="190" r="4" fill="#F2D18B" />
        <circle cx="380" cy="360" r="5" fill="#16D9F5" />
        <circle cx="130" cy="340" r="3.5" fill="#D9A83F" />
      </svg>

      {/* Floating Precision Telemetry Chips */}
      <div className="absolute -top-3 right-6 bg-deepspace/90 border border-cyan/40 px-3 py-1.5 rounded-md shadow-prismatic backdrop-blur-md hidden sm:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
        <span className="font-mono text-xs text-pearl tracking-wider">NEURAL_GRAPH::STABLE</span>
      </div>

      <div className="absolute bottom-4 -left-4 bg-deepspace/90 border border-gold/40 px-3 py-1.5 rounded-md shadow-prismatic backdrop-blur-md hidden sm:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold" />
        <span className="font-mono text-xs text-gold-champagne tracking-wider">RAG_CITATION::VERIFIED</span>
      </div>

      <div className="absolute -bottom-2 right-12 bg-deepspace/90 border border-slate-dim/40 px-3 py-1.5 rounded-md shadow-prismatic backdrop-blur-md hidden sm:flex items-center gap-2">
        <span className="font-mono text-[11px] text-slate-soft">LATENCY: 12ms • ZERO_HALLUCINATION</span>
      </div>
    </div>
  );
};

