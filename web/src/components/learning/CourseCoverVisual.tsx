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
  Database,
  Workflow,
  Eye,
  Layers,
  Network
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
  const isHero = size === "hero";

  // Specialized icon and gradient mapping for all courses
  const getCourseVisualAssets = () => {
    const slug = course.slug.toLowerCase();
    const title = course.title.toLowerCase();

    if (slug.includes("rag") || slug.includes("retrieval") || title.includes("retrieval")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#1A73E8] via-[#4285F4] to-[#8AB4F8]",
        icon: <Database className="w-5 h-5 text-white" />,
        badgeText: "Multimodal RAG"
      };
    }
    if (slug.includes("agent") || slug.includes("multi-agent") || title.includes("agent")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA]",
        icon: <Workflow className="w-5 h-5 text-white" />,
        badgeText: "Autonomous Agents"
      };
    }
    if (slug.includes("vision") || slug.includes("image") || title.includes("vision")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#7B2CBF] via-[#9D4EDD] to-[#C77DFF]",
        icon: <Eye className="w-5 h-5 text-white" />,
        badgeText: "Computer Vision"
      };
    }
    if (slug.includes("python") || slug.includes("code") || slug.includes("programming")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#E11D48] via-[#F43F5E] to-[#FB7185]",
        icon: <Code2 className="w-5 h-5 text-white" />,
        badgeText: "Python & Dart"
      };
    }
    if (slug.includes("neural") || slug.includes("deep-learning")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#10A37F] via-[#1DAF89] to-[#25D366]",
        icon: <Network className="w-5 h-5 text-white" />,
        badgeText: "Deep Learning"
      };
    }
    if (slug.includes("prompt") || slug.includes("tools")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#0078D4] via-[#00A4EF] to-[#00C7FF]",
        icon: <Bot className="w-5 h-5 text-white" />,
        badgeText: "AI Engineering"
      };
    }
    return {
      iconBg: "bg-gradient-to-tr from-[#00C4CC] via-[#00B4D8] to-[#0077B6]",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      badgeText: "Foundations"
    };
  };

  const assets = getCourseVisualAssets();

  if (isHero) {
    return (
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-white/95 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-slate-300 dark:border-[#38BDF8]/60 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-8 sm:p-12 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-3xl ${assets.iconBg} p-1 shadow-lg flex items-center justify-center border border-white/40 flex-shrink-0`}>
              {assets.icon}
            </div>
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[#0096C7] dark:text-[#00F0FF]">
                {course.level} TRACK • {assets.badgeText}
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-cyan-100/70 max-w-2xl font-sans">
                {course.tagline || course.overview}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/checkout/${course.slug}`}
              className="btn-touch px-7 py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-heading font-bold text-xs hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Exact Card Replica of Image 2's AI Services box cards
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group relative rounded-[22px] bg-white/95 dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.12] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] p-4 sm:p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] backdrop-blur-2xl"
    >
      {/* Top Row: Squircle App Icon, Title, and Circular Arrow Button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Specialized App Squircle Icon */}
          <div className={`w-12 h-12 rounded-2xl ${assets.iconBg} p-0.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-105 transition-transform`}>
            {assets.icon}
          </div>

          {/* Service/Course Name & Subtitle */}
          <div className="min-w-0">
            <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-[#0096C7] dark:group-hover:text-[#00F0FF] transition-colors truncate">
              {course.title}
            </h4>
            <span className="text-[10px] font-mono text-[#0096C7] dark:text-cyan-300/80 block uppercase tracking-wider font-semibold">
              {course.level} • {course.estimatedHours}h
            </span>
          </div>
        </div>

        {/* Circular Pill Arrow Button */}
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-[#0096C7] dark:group-hover:bg-[#00F0FF] border border-slate-300 dark:border-white/25 group-hover:border-transparent flex items-center justify-center text-slate-700 dark:text-white group-hover:text-white dark:group-hover:text-[#070D24] shadow-sm transition-all flex-shrink-0">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Course Tagline */}
      <p className="text-[11.5px] text-slate-600 dark:text-cyan-100/70 font-sans line-clamp-2 leading-relaxed">
        {course.tagline || course.overview}
      </p>

      {/* Bottom Info Bar: Capstone / Price */}
      <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-white/80">
          <BookOpen className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>{course.modules?.length || 3} Modules</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-amber-600 dark:text-amber-400 font-bold">$49 USD</span>
          <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">($0 Grant)</span>
        </div>
      </div>
    </Link>
  );
};
