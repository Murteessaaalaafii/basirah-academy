"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Brain, 
  Code2, 
  Bot, 
  CloudLightning, 
  Cpu, 
  Sparkles 
} from "lucide-react";

export const PrismaticHeroComposition: React.FC = () => {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  const pillars = [
    {
      id: "aiml",
      label: "AI & ML",
      icon: Brain,
      borderClass: "neon-pill-aiml",
      textClass: "text-cyan-300",
      glowColor: "rgba(0, 240, 255, 0.4)",
      desc: "Neural architectures, backpropagation, and transformer engineering."
    },
    {
      id: "prog",
      label: "Programming",
      icon: Code2,
      borderClass: "neon-pill-prog",
      textClass: "text-emerald-400",
      glowColor: "rgba(16, 185, 129, 0.4)",
      desc: "Python 3.12, Dart 3, PyTorch tensor mechanics, and production clean code."
    },
    {
      id: "agents",
      label: "AI Tools & Agents",
      icon: Bot,
      borderClass: "neon-pill-agents",
      textClass: "text-purple-300",
      glowColor: "rgba(192, 132, 252, 0.4)",
      desc: "Autonomous multi-agent swarms, tool-calling pipelines, and MCP architectures."
    },
    {
      id: "data",
      label: "Data Science",
      icon: CloudLightning,
      borderClass: "neon-pill-data",
      textClass: "text-amber-400",
      glowColor: "rgba(249, 115, 22, 0.4)",
      desc: "High-dimensional vector indexing, embeddings, and statistical learning."
    },
    {
      id: "tech",
      label: "Tech & Innovation",
      icon: Cpu,
      borderClass: "neon-pill-tech",
      textClass: "text-cyan-400",
      glowColor: "rgba(6, 182, 212, 0.4)",
      desc: "End-to-end edge deployment, distributed clusters, and real innovation."
    }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none py-4">
      {/* Dynamic Cosmic Orbital Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.22)_0,rgba(217,168,63,0.18)_40%,transparent_70%)] blur-3xl pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/20 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Centerpiece 3D Emblem Showcase with Golden Glass Beveled Frame */}
      <div className="relative group w-full max-w-lg aspect-square rounded-3xl p-3 bg-gradient-to-b from-deepspace/80 via-midnight/90 to-cosmic/95 border-2 border-amber-400/50 shadow-gold-glass backdrop-blur-2xl transition-all duration-500 hover:border-amber-300 hover:shadow-gold-glow flex items-center justify-center overflow-hidden">
        {/* Subtle Orbital Rotating Ring */}
        <div className="absolute inset-2 rounded-2xl border border-cyan-400/25 pointer-events-none" />
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/20 via-cyan-400/20 to-amber-400/20 opacity-40 blur-md pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* High-Resolution 3D Masterpiece Image */}
        <img
          src="/assets/basirah-logo-hero.png"
          alt="Basirah Academy 3D Crystalline Emblem"
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transform transition-transform duration-500 group-hover:scale-102"
        />

        {/* Corner Golden Crystal Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/70 pointer-events-none" />
      </div>

      {/* 5 Interactive Glowing Neon Category Pills with Touchable Micro-Interactions */}
      <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2.5 px-2">
        {pillars.map((pill) => {
          const Icon = pill.icon;
          const isSelected = activeBadge === pill.id;

          return (
            <button
              key={pill.id}
              onClick={() => setActiveBadge(isSelected ? null : pill.id)}
              className={`btn-touch flex flex-col items-center justify-center p-3 rounded-2xl bg-white/95 dark:bg-cosmic/85 backdrop-blur-md transition-all duration-200 border-2 ${
                pill.borderClass
              } ${isSelected ? "scale-105 brightness-110" : "hover:brightness-105"}`}
              style={{
                boxShadow: isSelected ? `0 0 24px ${pill.glowColor}` : undefined
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-midnight/90 mb-1.5 shadow-sm">
                <Icon className={`w-4 h-4 ${pill.textClass}`} />
              </div>
              <span className="font-heading font-bold text-[11px] text-slate-900 dark:text-pearl text-center tracking-tight leading-tight">
                {pill.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Intuition Drawer */}
      {activeBadge && (
        <div className="w-full mt-4 p-4 rounded-2xl bg-white/95 dark:bg-midnight/90 border border-slate-300 dark:border-amber-400/40 shadow-md dark:shadow-gold-glass text-xs text-slate-700 dark:text-slate-soft flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <p className="text-slate-800 dark:text-pearl">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {pillars.find((p) => p.id === activeBadge)?.label}:{" "}
              </span>
              {pillars.find((p) => p.id === activeBadge)?.desc}
            </p>
          </div>
          <Link
            href="/courses"
            className="btn-touch px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/20 border border-amber-500/40 dark:border-amber-400/50 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 font-mono text-[11px] font-bold whitespace-nowrap"
          >
            Explore Track →
          </Link>
        </div>
      )}
    </div>
  );
};
