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
  Layers,
  Database,
  Network,
  Eye,
  Workflow,
  ShieldCheck,
  Terminal,
  Activity,
  GitBranch
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
  // Determine level configuration with Bright/Dark dual palettes
  const levelDetails = {
    beginner: {
      tier: "TIER 01",
      path: "Discover AI",
      lightGradient: "from-sky-50/95 via-white/95 to-cyan-50/90",
      darkGradient: "dark:from-cyan-500/20 dark:via-deepspace/95 dark:to-[#051124]",
      border: "border-amber-500/45 dark:border-cyan-400/50 hover:border-amber-500 dark:hover:border-cyan-300",
      badgeLight: "bg-cyan-100/80 border-cyan-500/60 text-cyan-900",
      badgeDark: "dark:bg-cyan/15 dark:border-cyan-400 dark:text-cyan",
      lightRay: "from-cyan-300/30 dark:from-cyan-400/20 to-transparent",
      icon: Sparkles
    },
    intermediate: {
      tier: "TIER 02",
      path: "Build with AI",
      lightGradient: "from-emerald-50/95 via-white/95 to-teal-50/90",
      darkGradient: "dark:from-emerald-500/20 dark:via-deepspace/95 dark:to-[#051817]",
      border: "border-amber-500/45 dark:border-emerald-400/50 hover:border-amber-500 dark:hover:border-emerald-300",
      badgeLight: "bg-emerald-100/80 border-emerald-500/60 text-emerald-900",
      badgeDark: "dark:bg-emerald-500/15 dark:border-emerald-400 dark:text-emerald-300",
      lightRay: "from-emerald-300/30 dark:from-emerald-400/20 to-transparent",
      icon: Bot
    },
    advanced: {
      tier: "TIER 03",
      path: "Engineer Intelligence",
      lightGradient: "from-amber-50/95 via-white/95 to-orange-50/90",
      darkGradient: "dark:from-amber-400/20 dark:via-deepspace/95 dark:to-[#1c1204]",
      border: "border-amber-500/55 dark:border-amber-400/60 hover:border-amber-600 dark:hover:border-amber-300",
      badgeLight: "bg-amber-100/80 border-amber-500/60 text-amber-900",
      badgeDark: "dark:bg-amber-400/15 dark:border-amber-400 dark:text-amber-300",
      lightRay: "from-amber-300/30 dark:from-amber-400/20 to-transparent",
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
        badgeStyle: "bg-purple-100/80 dark:bg-purple-500/15 border-purple-500/50 dark:border-purple-400 text-purple-900 dark:text-purple-300"
      };
    }
    if (text.includes("python") || text.includes("programming") || text.includes("code") || text.includes("developer") || text.includes("pipeline") || text.includes("dart")) {
      return {
        name: "Programming",
        icon: Code2,
        badgeStyle: "bg-emerald-100/80 dark:bg-emerald-500/15 border-emerald-500/50 dark:border-emerald-400 text-emerald-900 dark:text-emerald-300"
      };
    }
    if (text.includes("data") || text.includes("vector") || text.includes("embeddings") || text.includes("analytics")) {
      return {
        name: "Data Science",
        icon: CloudLightning,
        badgeStyle: "bg-amber-100/80 dark:bg-amber-400/15 border-amber-500/50 dark:border-amber-400 text-amber-900 dark:text-amber-300"
      };
    }
    if (text.includes("cloud") || text.includes("deploy") || text.includes("system") || text.includes("enterprise") || text.includes("innovation")) {
      return {
        name: "Tech & Innovation",
        icon: Cpu,
        badgeStyle: "bg-teal-100/80 dark:bg-teal-500/15 border-teal-500/50 dark:border-teal-400 text-teal-900 dark:text-teal-300"
      };
    }
    return {
      name: "AI & ML",
      icon: Brain,
      badgeStyle: "bg-cyan-100/80 dark:bg-cyan/15 border-cyan-500/50 dark:border-cyan-400 text-cyan-900 dark:text-cyan"
    };
  };

  const category = getCategoryDetails();
  const CategoryIcon = category.icon;
  const isHero = size === "hero";

  // Unique topic visual artwork for each course
  const renderTopicArtwork = () => {
    const slug = course.slug.toLowerCase();
    if (slug.includes("rag") || slug.includes("retrieval") || slug.includes("vector")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <Database className="w-6 h-6" />
        </div>
      );
    }
    if (slug.includes("agent") || slug.includes("multi-agent")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <Workflow className="w-6 h-6" />
        </div>
      );
    }
    if (slug.includes("vision") || slug.includes("image")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <Eye className="w-6 h-6" />
        </div>
      );
    }
    if (slug.includes("python") || slug.includes("code") || slug.includes("programming")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-midnight shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <Code2 className="w-6 h-6" />
        </div>
      );
    }
    if (slug.includes("neural") || slug.includes("deep-learning")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <Network className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-cyan flex items-center justify-center text-midnight shadow-[0_0_20px_rgba(245,158,11,0.4)]">
        <Sparkles className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${config.lightGradient} ${config.darkGradient} border-[3px] border-amber-500/45 dark:border-amber-400/50 hover:border-amber-500 dark:hover:border-amber-300 ring-1 ring-inset ring-amber-400/25 shadow-[0_10px_30px_rgba(7,22,47,0.06),0_0_20px_rgba(217,168,63,0.14)] dark:shadow-gold-glass transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between ${
        isHero 
          ? "p-8 sm:p-12 shadow-[0_15px_45px_rgba(7,22,47,0.1),0_0_40px_rgba(217,168,63,0.2)] dark:shadow-[0_0_50px_rgba(245,158,11,0.28)]" 
          : "p-6 sm:p-7 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(7,22,47,0.12),0_0_35px_rgba(217,168,63,0.25)] dark:hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
      }`}
    >
      {/* 1. Real Water Glass Shimmer & Caustic Reflection Layer */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${config.lightRay} pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity`} />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[radial-gradient(circle,rgba(0,180,216,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,240,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. 4-Sided Box-Style Diamond Corner Caps */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500 dark:border-amber-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500 dark:border-amber-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500 dark:border-amber-400 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500 dark:border-amber-400 pointer-events-none" />

      {/* 3. Watermark Official Basirah 3D App Icon */}
      <div className="absolute -bottom-8 -right-8 w-36 h-36 opacity-10 dark:opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none transform rotate-12">
        <img 
          src="/assets/basirah-app-icon.png" 
          alt="Basirah Watermark" 
          className="w-full h-full object-contain filter grayscale dark:invert brightness-150" 
        />
      </div>

      {/* 4. Top Badges & Meta */}
      <div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Tier & Path Badge */}
            <span className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase font-extrabold tracking-wider border-2 shadow-sm flex items-center gap-1.5 ${config.badgeLight} ${config.badgeDark}`}>
              <LevelIcon className="w-3.5 h-3.5" />
              <span>{config.tier} • {config.path}</span>
            </span>

            {/* Specialization Discipline Pill */}
            <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-heading font-extrabold tracking-wide border-2 flex items-center gap-1.5 ${category.badgeStyle}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{category.name}</span>
            </span>
          </div>

          {/* Time & Module Count Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#334E68] dark:text-slate-soft bg-white/90 dark:bg-midnight/90 px-3 py-1 rounded-full border-2 border-amber-500/35 dark:border-amber-400/30 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan" />
            <span className="font-bold text-[#07162F] dark:text-pearl">{course.estimatedHours}h</span>
            <span className="text-amber-500 dark:text-amber-400">•</span>
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="font-bold text-[#07162F] dark:text-pearl">{course.modules?.length || 3} Mods</span>
          </div>
        </div>

        {/* 5. Unique Topic Artwork Header & Title */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3.5">
            {renderTopicArtwork()}
            <div className="flex-1">
              <Link href={`/courses/${course.slug}`} className="block group/title">
                <h3 className={`font-heading font-extrabold text-[#07162F] dark:text-pearl group-hover/title:text-amber-600 dark:group-hover/title:text-amber-300 transition-colors leading-tight ${
                  isHero ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl line-clamp-2"
                }`}>
                  {course.title}
                </h3>
              </Link>
            </div>
          </div>

          <p className={`text-[#334E68] dark:text-slate-soft leading-relaxed font-normal ${
            isHero ? "text-base sm:text-lg max-w-3xl" : "text-xs sm:text-sm line-clamp-2"
          }`}>
            {course.tagline || course.overview}
          </p>

          {/* Capstone Deliverable Banner with 4-Sided Golden Box Border */}
          {course.realWorldProject && (
            <div className="py-2.5 px-3.5 rounded-2xl bg-amber-50/80 dark:bg-midnight/90 border-2 border-amber-500/40 dark:border-amber-400/40 text-[11.5px] font-mono text-[#334E68] dark:text-slate-soft flex items-center gap-2.5 shadow-sm">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="text-amber-700 dark:text-amber-400 font-extrabold flex-shrink-0">CAPSTONE:</span>
              <span className="truncate text-[#07162F] dark:text-pearl font-semibold">{course.realWorldProject.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* 6. Bottom Action Bar: Tuition & Tappable Navigation */}
      {showAction && (
        <div className="relative z-10 mt-6 pt-5 border-t-2 border-amber-500/30 dark:border-amber-400/30 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-amber-600 dark:text-amber-400 font-extrabold text-base">$49</span>
              <span className="text-slate-400 line-through text-[11px]">$199</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-400/40">
                100% Aid
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-[#475569] dark:text-slate-soft block font-medium">
              or 2,800 ETB • Free with Grant
            </span>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="btn-touch flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill-button text-xs shadow-md flex-shrink-0"
          >
            <span>Course Info</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};
