"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Grid, 
  Sparkles, 
  ArrowRight, 
  Home, 
  Star, 
  Layers, 
  Heart, 
  MessageSquare, 
  Settings, 
  ChevronDown, 
  Plus,
  Brain,
  Code2,
  Bot,
  Database,
  Eye,
  Network,
  Workflow,
  Cpu,
  Terminal
} from "lucide-react";

export const HolographicGlassSuite: React.FC = () => {
  const [activeDock, setActiveDock] = useState<number>(3); // Default on Sparkle/Lens icon
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Week");
  
  // Interactive sliders from Image 2
  const [creativity, setCreativity] = useState(85);
  const [styleVal, setStyleVal] = useState(90);
  const [variationVal, setVariationVal] = useState(65);
  
  // Interactive toggles from Image 2
  const [highQuality, setHighQuality] = useState(true);
  const [safeMode, setSafeMode] = useState(false);

  // 4 Recent Capstone Projects
  const recentProjects = [
    {
      id: "proj-1",
      title: "Autograd Backprop Engine",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "proj-2",
      title: "Dense Hybrid RAG Vectorizer",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "proj-3",
      title: "Cosmic Nebula Classifier",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "proj-4",
      title: "Autonomous Agent DAG Consensus",
      image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80",
    }
  ];

  // 9 Canonical Engineering Specializations (Copied 100% of Template 2's visual cards & buttons)
  const services = [
    {
      id: "applied-ai",
      title: "Foundations of Applied AI",
      description: "Intuitive mechanics, tensors & compute.",
      slug: "foundations-of-applied-ai",
      iconBg: "bg-gradient-to-tr from-[#0078D4] via-[#00A4EF] to-[#00C7FF]",
      icon: <Brain className="w-6 h-6 text-white" />
    },
    {
      id: "rag",
      title: "Multimodal RAG & Vectors",
      description: "Hybrid BM25, embeddings & rerankers.",
      slug: "retrieval-augmented-generation",
      iconBg: "bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0284C7]",
      icon: <Database className="w-6 h-6 text-[#38BDF8]" />
    },
    {
      id: "deep-learning",
      title: "Deep Learning & Autograd",
      description: "Reverse-mode differentiation from scratch.",
      slug: "deep-learning-fundamentals",
      iconBg: "bg-gradient-to-tr from-[#0E1E25] via-[#103038] to-[#10A37F]",
      icon: <Network className="w-6 h-6 text-white" />
    },
    {
      id: "vision",
      title: "Computer Vision & Diffusion",
      description: "Latent diffusion, UNet & CLIP guidance.",
      slug: "computer-vision-engineering",
      iconBg: "bg-gradient-to-tr from-[#3B0764] via-[#581C87] to-[#A855F7]",
      icon: <Eye className="w-6 h-6 text-white" />
    },
    {
      id: "python-dart",
      title: "Python & Dart AI Pipelines",
      description: "Production typing, profiling & memory.",
      slug: "practical-python-for-ai",
      iconBg: "bg-gradient-to-tr from-[#450A0A] via-[#7F1D1D] to-[#DC2626]",
      icon: <Code2 className="w-6 h-6 text-white" />
    },
    {
      id: "agents",
      title: "Multi-Agent Consensus DAGs",
      description: "Decentralized tool-routing & rollbacks.",
      slug: "multi-agent-systems",
      iconBg: "bg-gradient-to-tr from-[#0369A1] via-[#0284C7] to-[#00F0FF]",
      icon: <Workflow className="w-6 h-6 text-white" />
    },
    {
      id: "prompt",
      title: "Prompt Engineering & Context",
      description: "KV cache reuse, few-shot & reasoning.",
      slug: "prompt-engineering-fundamentals",
      iconBg: "bg-gradient-to-tr from-[#1E1B4B] via-[#312E81] to-[#6366F1]",
      icon: <Bot className="w-6 h-6 text-white" />
    },
    {
      id: "nlp",
      title: "Neural NLP & Transformers",
      description: "Attention math, rotary embeddings & RoPE.",
      slug: "natural-language-processing",
      iconBg: "bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#475569]",
      icon: <Terminal className="w-6 h-6 text-white" />
    },
    {
      id: "mlops",
      title: "Production MLOps & Systems",
      description: "AWQ, GGUF, vLLM & latency optimization.",
      slug: "ai-tools-for-everyday-productivity",
      iconBg: "bg-gradient-to-tr from-[#2E1065] via-[#581C87] to-[#9333EA]",
      icon: <Cpu className="w-6 h-6 text-white" />
    }
  ];

  const dockIcons = [
    { id: 0, icon: Home, label: "Home", href: "/" },
    { id: 1, icon: Star, label: "Featured", href: "/courses" },
    { id: 2, icon: Layers, label: "Pathways", href: "/paths" },
    { id: 3, icon: Sparkles, label: "AI Suite", isSpecial: true, href: "/experience" },
    { id: 4, icon: Heart, label: "Projects", href: "/projects" },
    { id: 5, icon: MessageSquare, label: "Community", href: "/about" },
    { id: 6, icon: Settings, label: "Settings", href: "/dashboard" }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto p-2 sm:p-6 select-none">
      {/* 3D Holographic Perspective Ambient Backdrops (Exact Replica of Scene) */}
      <div className="absolute -top-24 -left-20 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.25)_0%,transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute top-1/4 -right-28 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-28 left-1/4 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,transparent_70%)] blur-[110px] pointer-events-none" />

      {/* Decorative Floating 3D Glass Sphere on Bottom-Left Surface */}
      <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full bg-gradient-to-br from-white/60 via-[#00F0FF]/30 to-[#A855F7]/40 backdrop-blur-md border border-white/50 shadow-[0_0_25px_rgba(0,240,255,0.4),inset_0_2px_4px_rgba(255,255,255,0.8)] pointer-events-none z-20 hidden md:block" />

      {/* Main Glass Tablet Container with 3D Beveled Cyan Frame */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#0A1430]/75 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-[#38BDF8]/60 hover:border-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,240,255,0.2)] p-5 sm:p-8 transition-all duration-300">
        
        {/* Upper Tablet Glass Reflection Highlight */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-t-[32px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent pointer-events-none" />

        <div className="flex gap-4 sm:gap-7 relative z-10">
          
          {/* ========================================================= */}
          {/* 1. LEFT FLOATING VERTICAL DOCK CAPSULE (Exact from Image) */}
          {/* ========================================================= */}
          <div className="hidden sm:flex flex-col items-center justify-between py-6 px-2.5 rounded-full bg-white/[0.08] dark:bg-black/35 backdrop-blur-2xl border-[1.5px] border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_0_rgba(255,255,255,0.3)] w-14 flex-shrink-0 self-stretch my-2">
            <div className="flex flex-col items-center gap-6">
              {dockIcons.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isSelected = activeDock === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveDock(item.id)}
                    aria-label={item.label}
                    className={`btn-touch relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-gradient-to-tr from-[#00F0FF] to-[#38BDF8] text-[#070D24] shadow-[0_0_20px_#00F0FF] scale-110"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-25" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-6">
              {dockIcons.slice(4).map((item) => {
                const Icon = item.icon;
                const isSelected = activeDock === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveDock(item.id)}
                    aria-label={item.label}
                    className={`btn-touch w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-gradient-to-tr from-[#00F0FF] to-[#38BDF8] text-[#070D24] shadow-[0_0_20px_#00F0FF] scale-110"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. MAIN TABLET CONTENT CANVAS                             */}
          {/* ========================================================= */}
          <div className="flex-1 space-y-6 min-w-0">
            
            {/* Top Bar: Capsule Search Bar & Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              {/* Capsule Search Input */}
              <div className="relative flex-1 max-w-md">
                <div className="flex items-center justify-between px-4 py-2.5 rounded-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus-within:border-[#00F0FF] focus-within:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                  <div className="flex items-center gap-2.5 flex-1">
                    <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search neural architectures, vectors, or DAGs..."
                      className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-sans"
                    />
                  </div>
                  <Search className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                </div>
              </div>

              {/* Right Action Icons (Bell, 9-Dot Grid, Spherical Camera Orb) */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="btn-touch w-9 h-9 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors shadow-sm"
                >
                  <Bell className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Applications Grid"
                  className="btn-touch w-9 h-9 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors shadow-sm"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <Link
                  href="/dashboard"
                  aria-label="User Profile Orb"
                  className="btn-touch relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#38BDF8] to-[#1E40AF] p-0.5 shadow-[0_0_16px_rgba(0,240,255,0.5)] hover:scale-105 transition-all overflow-hidden border border-white/40"
                >
                  <div className="w-full h-full rounded-full bg-[#070D24] flex items-center justify-center text-[10px] font-heading font-extrabold text-white">
                    <div className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Header: Suite Title & Famous "✨ Launch Workspace ›" Gradient Pill Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  AI Engineering Suite
                </h2>
                <p className="text-xs text-cyan-200/70 mt-1 font-sans">
                  Interactive Neural Workspace, Socratic RAG & Production Labs.
                </p>
              </div>

              {/* The Exact Glowing Magenta/Violet-to-Cyan Pill Button */}
              <Link
                href="/courses"
                className="btn-touch self-start sm:self-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 shadow-[0_0_25px_rgba(168,85,247,0.5),0_0_10px_rgba(0,240,255,0.35),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.03] transition-all flex items-center gap-2.5 text-white font-heading font-bold text-xs"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>Launch Workspace</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] ml-0.5">
                  ›
                </span>
              </Link>
            </div>

            {/* Specializations Section Header */}
            <div className="text-xs font-heading font-bold text-white/90 uppercase tracking-wider pt-2">
              Featured Specializations
            </div>

            {/* ========================================================= */}
            {/* 3. 3x3 GRID OF GLASS CARDS (Exact Replica from Image 2)   */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {services.map((item) => (
                <Link
                  key={item.id}
                  href={`/courses/${item.slug}`}
                  className="group relative rounded-[22px] bg-white/[0.06] hover:bg-white/[0.1] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Specialized App Squircle Icon */}
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} p-0.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-105 transition-transform`}>
                      {item.icon}
                    </div>

                    {/* Service Name & Tagline */}
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10.5px] text-cyan-100/70 truncate leading-tight mt-0.5 font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Circular Pill Arrow Button */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-[#00F0FF] border border-white/25 group-hover:border-transparent flex items-center justify-center text-white group-hover:text-[#070D24] shadow-sm transition-all flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* ========================================================= */}
            {/* 4. BOTTOM DUAL PANELS: WAVEFORM CHART & TUNING SLIDERS   */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
              
              {/* Left Box: Creative & Compute Momentum Waveform Chart */}
              <div className="lg:col-span-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-white">Compute & Learning Momentum</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] text-white/80 font-mono">
                    <span>{selectedTimeframe}</span>
                    <ChevronDown className="w-3 h-3 text-white/60" />
                  </div>
                </div>

                {/* Neon Wave Curve SVG matching the image */}
                <div className="w-full h-28 relative flex items-end overflow-hidden pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="suiteWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="45%" stopColor="#A855F7" />
                        <stop offset="80%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#00F0FF" />
                      </linearGradient>
                    </defs>
                    {/* Glowing Blur Halo */}
                    <path
                      d="M0,65 Q60,15 130,55 T270,30 T390,75 T500,20"
                      fill="none"
                      stroke="url(#suiteWaveGrad1)"
                      strokeWidth="5"
                      opacity="0.45"
                      filter="blur(5px)"
                    />
                    {/* Sharp Foreground Sine Curve */}
                    <path
                      d="M0,65 Q60,15 130,55 T270,30 T390,75 T500,20"
                      fill="none"
                      stroke="url(#suiteWaveGrad1)"
                      strokeWidth="2.5"
                    />
                    <circle cx="130" cy="55" r="2.5" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="270" cy="30" r="2.5" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="390" cy="75" r="2.5" fill="#FFFFFF" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* Right Box: Socratic Tuning Sliders & Toggle Controls */}
              <div className="lg:col-span-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] p-4 sm:p-5 space-y-3 font-mono text-[11px]">
                
                {/* Reasoning Depth Slider */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/80 w-24">Reasoning Depth</span>
                  <div className="flex-1 relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                    />
                  </div>
                  <span className="text-white font-bold w-8 text-right">{creativity}%</span>
                </div>

                {/* Verification Rigor Slider */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/80 w-24">Verification Rigor</span>
                  <div className="flex-1 relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={styleVal}
                      onChange={(e) => setStyleVal(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
                    />
                  </div>
                  <span className="text-white font-bold w-8 text-right">{styleVal}%</span>
                </div>

                {/* Context Caching Slider */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/80 w-24">Context Cache</span>
                  <div className="flex-1 relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={variationVal}
                      onChange={(e) => setVariationVal(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                    />
                  </div>
                  <span className="text-white font-bold w-8 text-right">{variationVal}%</span>
                </div>

                {/* Toggles */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-white/70">Verified Socratic Guidance</span>
                    <button
                      type="button"
                      onClick={() => setHighQuality(!highQuality)}
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        highQuality ? "bg-[#00F0FF]" : "bg-white/20"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${highQuality ? "translate-x-4" : ""}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <span className="text-white/70">Zero-Hallucination Guard</span>
                  <button
                    type="button"
                    onClick={() => setSafeMode(!safeMode)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                      safeMode ? "bg-[#00F0FF]" : "bg-white/20"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${safeMode ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. BOTTOM ROW: RECENT PROJECTS & INSPIRATION FEED         */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
              {/* Recent Scholar Projects */}
              <div className="lg:col-span-8 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-white">Recent Scholar Capstones</span>
                  <Link href="/projects" className="text-[10.5px] font-mono text-cyan-300 hover:text-white flex items-center gap-1">
                    <span>View All</span>
                    <ChevronDown className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {recentProjects.map((proj) => (
                    <div 
                      key={proj.id}
                      className="group/thumb relative h-20 rounded-xl overflow-hidden border border-white/20 shadow-sm cursor-pointer"
                    >
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[9.5px] font-heading font-bold text-white truncate">
                          {proj.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspiration Feed / Research Spotlight */}
              <div className="lg:col-span-4 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-white">Research Feed</span>
                    <Link
                      href="/experience"
                      aria-label="Add Inspiration"
                      className="btn-touch w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 flex items-center justify-center text-white text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-[10px] text-cyan-200/70 font-sans mt-0.5">
                    Curated engineering papers
                  </p>
                </div>

                <div className="relative h-20 rounded-xl overflow-hidden border border-white/20 mt-3 group/insp cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80"
                    alt="Research Feed"
                    className="w-full h-full object-cover group-hover/insp:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#00F0FF]/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
