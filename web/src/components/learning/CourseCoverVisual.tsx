"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Brain, 
  Code2, 
  Bot, 
  CloudLightning, 
  Cpu, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { Course } from "../../../../shared/curriculum";

interface CourseCoverVisualProps {
  course: Course;
  size?: "card" | "hero" | "banner";
  showAction?: boolean;
}

export const CourseCoverVisual: React.FC<CourseCoverVisualProps> = ({
  course,
  size = "card",
  showAction = true
}) => {
  // Determine level configuration
  const levelDetails = {
    beginner: {
      tier: "TIER 01",
      path: "Discover AI",
      accent: "from-cyan-500/20 via-deepspace/95 to-[#051124]",
      border: "border-cyan-400/50 hover:border-cyan-300",
      glow: "shadow-cyan-glass",
      badge: "bg-cyan/15 border-cyan-400 text-cyan",
      cornerColor: "border-cyan-400",
      lightRay: "from-cyan-400/20 to-transparent",
      icon: Sparkles
    },
    intermediate: {
      tier: "TIER 02",
      path: "Build with AI",
      accent: "from-emerald-500/20 via-deepspace/95 to-[#051817]",
      border: "border-emerald-400/50 hover:border-emerald-300",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.22)]",
      badge: "bg-emerald-500/15 border-emerald-400 text-emerald-300",
      cornerColor: "border-emerald-400",
      lightRay: "from-emerald-400/20 to-transparent",
      icon: Bot
    },
    advanced: {
      tier: "TIER 03",
      path: "Engineer Intelligence",
      accent: "from-amber-400/20 via-deepspace/95 to-[#1c1204]",
      border: "border-amber-400/60 hover:border-amber-300",
      glow: "shadow-gold-glass",
      badge: "bg-amber-400/15 border-amber-400 text-amber-300",
      cornerColor: "border-amber-400",
      lightRay: "from-amber-400/20 to-transparent",
      icon: Cpu
    }
  };

  const currentLevel = (course.level?.toLowerCase() || "beginner") as keyof typeof levelDetails;
  const config = levelDetails[currentLevel] || levelDetails.beginner;
  const LevelIcon = config.icon;

  // Determine Specialization Category based on course metadata
  const getCategoryDetails = () => {
    const text = `${course.title} ${course.tagline} ${course.overview}`.toLowerCase();
    if (text.includes("agent") || text.includes("prompt") || text.includes("rag") || text.includes("tools") || text.includes("automation")) {
      return {
        name: "AI Tools & Agents",
        icon: Bot,
        badgeStyle: "bg-purple-500/15 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]",
        ringColor: "rgba(168,85,247,0.25)"
      };
    }
    if (text.includes("python") || text.includes("programming") || text.includes("code") || text.includes("developer") || text.includes("pipeline") || text.includes("dart")) {
      return {
        name: "Programming",
        icon: Code2,
        badgeStyle: "bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
        ringColor: "rgba(16,185,129,0.25)"
      };
    }
    if (text.includes("data") || text.includes("vector") || text.includes("embeddings") || text.includes("analytics")) {
      return {
        name: "Data Science",
        icon: CloudLightning,
        badgeStyle: "bg-amber-400/15 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        ringColor: "rgba(245,158,11,0.25)"
      };
    }
    if (text.includes("cloud") || text.includes("deploy") || text.includes("system") || text.includes("enterprise") || text.includes("innovation")) {
      return {
        name: "Tech & Innovation",
        icon: Cpu,
        badgeStyle: "bg-teal-500/15 border-teal-400 text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.3)]",
        ringColor: "rgba(20,184,166,0.25)"
      };
    }
    return {
      name: "AI & ML",
      icon: Brain,
      badgeStyle: "bg-cyan/15 border-cyan-400 text-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]",
      ringColor: "rgba(0,240,255,0.25)"
    };
  };

  const category = getCategoryDetails();
  const CategoryIcon = category.icon;
  const isHero = size === "hero";

  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${config.accent} border-[3px] border-amber-400/50 hover:border-amber-300 ring-1 ring-inset ring-amber-300/25 shadow-gold-glass transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between ${
        isHero 
          ? "p-8 sm:p-12 shadow-[0_0_50px_rgba(245,158,11,0.28)]" 
          : "p-6 sm:p-7 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
      }`}
    >
      {/* 1. Water Glass Shimmer & Diagonal Refraction Caustics */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${config.lightRay} pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity`} />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[radial-gradient(circle,rgba(0,240,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. Heavy Attractive Diamond Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

      {/* 3. Watermark Official Basirah 3D App Icon */}
      <div className="absolute -bottom-8 -right-8 w-36 h-36 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none transform rotate-12">
        <img 
          src="/assets/basirah-app-icon.png" 
          alt="Basirah Watermark" 
          className="w-full h-full object-contain filter grayscale invert brightness-200" 
        />
      </div>

      {/* 4. Top Badges & Meta */}
      <div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Tier & Path Badge */}
            <span className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase font-extrabold tracking-wider border shadow-sm flex items-center gap-1.5 ${config.badge}`}>
              <LevelIcon className="w-3.5 h-3.5" />
              <span>{config.tier} • {config.path}</span>
            </span>

            {/* Specialization Discipline Pill */}
            <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-heading font-extrabold tracking-wide border flex items-center gap-1.5 ${category.badgeStyle}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{category.name}</span>
            </span>
          </div>

          {/* Time & Module Count */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-soft bg-midnight/90 px-3 py-1 rounded-full border border-amber-400/30 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span className="font-semibold text-pearl">{course.estimatedHours}h</span>
            <span className="text-amber-400">•</span>
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-pearl">{course.modules?.length || 3} Modules</span>
          </div>
        </div>

        {/* 5. Course Title & Focus (Tappable Link to Overview) */}
        <div className="relative z-10 space-y-3">
          <Link href={`/courses/${course.slug}`} className="block group/title">
            <h3 className={`font-heading font-extrabold text-pearl group-hover/title:text-amber-300 transition-colors leading-tight ${
              isHero ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl line-clamp-2"
            }`}>
              {course.title}
            </h3>
          </Link>

          <p className={`text-slate-soft leading-relaxed ${
            isHero ? "text-base sm:text-lg max-w-3xl" : "text-xs sm:text-sm line-clamp-2"
          }`}>
            {course.tagline || course.overview}
          </p>

          {/* Capstone Deliverable Banner with Golden Border */}
          {course.realWorldProject && (
            <div className="py-2.5 px-3.5 rounded-2xl bg-midnight/90 border-2 border-amber-400/40 text-[11.5px] font-mono text-slate-soft flex items-center gap-2.5 shadow-sm">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-amber-400 font-bold flex-shrink-0">CAPSTONE:</span>
              <span className="truncate text-pearl font-medium">{course.realWorldProject.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* 6. Bottom Action Bar: Tuition & Tappable Navigation */}
      {showAction && (
        <div className="relative z-10 mt-6 pt-5 border-t-2 border-amber-400/30 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-amber-400 font-extrabold text-base">$49</span>
              <span className="text-slate-soft line-through text-[11px]">$199</span>
              <span className="text-emerald-400 font-bold text-[10px] uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                100% Aid
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-soft block">
              or 2,800 ETB • Free with Merit Grant
            </span>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="btn-touch flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-xs shadow-gold-glass hover:brightness-110 flex-shrink-0"
          >
            <span>Course Info</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};
