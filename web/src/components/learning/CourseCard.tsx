"use client";

import React from "react";
import Link from "next/link";
import { 
  Clock, 
  BookOpen, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Brain,
  Code2,
  Bot,
  Database,
  Eye,
  Network,
  Workflow
} from "lucide-react";
import { Course } from "../../../../shared/curriculum";
import { useBasirahStore } from "@/lib/store";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { bookmarks, toggleBookmark, enrollments } = useBasirahStore();
  const isBookmarked = bookmarks.includes(course.slug);
  const enrolled = enrollments.find((e) => e.slug === course.slug);

  // Dynamic icon and gradient mapping for all courses
  const getCourseVisual = () => {
    const slug = course.slug.toLowerCase();
    const title = course.title.toLowerCase();

    if (slug.includes("rag") || slug.includes("retrieval") || title.includes("retrieval")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#1A73E8] via-[#4285F4] to-[#8AB4F8]",
        icon: <Database className="w-5 h-5 text-white" />
      };
    }
    if (slug.includes("agent") || slug.includes("multi-agent") || title.includes("agent")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA]",
        icon: <Workflow className="w-5 h-5 text-white" />
      };
    }
    if (slug.includes("vision") || slug.includes("image") || title.includes("vision")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#7B2CBF] via-[#9D4EDD] to-[#C77DFF]",
        icon: <Eye className="w-5 h-5 text-white" />
      };
    }
    if (slug.includes("python") || slug.includes("code") || slug.includes("programming")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#E11D48] via-[#F43F5E] to-[#FB7185]",
        icon: <Code2 className="w-5 h-5 text-white" />
      };
    }
    if (slug.includes("neural") || slug.includes("deep-learning")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#10A37F] via-[#1DAF89] to-[#25D366]",
        icon: <Network className="w-5 h-5 text-white" />
      };
    }
    if (slug.includes("prompt") || slug.includes("tools")) {
      return {
        iconBg: "bg-gradient-to-tr from-[#0078D4] via-[#00A4EF] to-[#00C7FF]",
        icon: <Bot className="w-5 h-5 text-white" />
      };
    }
    return {
      iconBg: "bg-gradient-to-tr from-[#00C4CC] via-[#00B4D8] to-[#0077B6]",
      icon: <Sparkles className="w-5 h-5 text-white" />
    };
  };

  const visual = getCourseVisual();

  return (
    <div className="group relative rounded-[22px] bg-white/[0.06] hover:bg-white/[0.1] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)] p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-2xl">
      {/* Top Header Row: Squircle App Icon, Title & Meta, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Specialized Squircle App Icon */}
            <div className={`w-11 h-11 rounded-2xl ${visual.iconBg} p-0.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-105 transition-transform`}>
              {visual.icon}
            </div>

            <div className="min-w-0">
              <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono uppercase font-bold tracking-wider bg-white/10 border border-white/20 text-[#00F0FF]">
                {course.level}
              </span>
              <Link href={`/courses/${course.slug}`}>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#00F0FF] transition-colors truncate mt-1">
                  {course.title}
                </h3>
              </Link>
            </div>
          </div>

          <button
            onClick={() => toggleBookmark(course.slug)}
            aria-label="Bookmark course"
            className={`btn-touch w-8 h-8 rounded-full border transition-all flex items-center justify-center flex-shrink-0 ${
              isBookmarked
                ? "bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "border-white/20 text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Course Description */}
        <p className="text-[11px] text-cyan-100/70 font-sans line-clamp-2 leading-relaxed mt-2">
          {course.tagline || course.overview}
        </p>

        {/* Real World Capstone Pill */}
        {course.realWorldProject && (
          <div className="mt-3 py-1.5 px-3 rounded-full bg-white/[0.05] border border-white/15 text-[10.5px] font-mono text-white/80 flex items-center gap-2">
            <span className="text-[#00F0FF] font-bold flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00F0FF]" />
              PROJECT:
            </span>
            <span className="truncate text-white font-medium">{course.realWorldProject.title}</span>
          </div>
        )}
      </div>

      {/* Bottom Metrics Bar & Actions */}
      <div className="pt-3 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>{course.estimatedHours}h estimated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>{course.modulesCount || 3} modules</span>
          </div>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}/${course.modules?.[0]?.lessons?.[0]?.slug || 'intro'}`}
            className="btn-touch w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-white/10 hover:bg-[#00F0FF] border border-white/25 hover:border-transparent text-white hover:text-[#070D24] text-xs font-bold transition-all shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] group-hover:text-[#070D24]" />
            <span>Continue ({enrolled.progressPercent}%)</span>
          </Link>
        ) : (
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-xs font-mono font-bold text-amber-300">
              $49 <span className="text-[10px] text-emerald-400 font-normal">($0 Grant)</span>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="btn-touch px-4 py-2 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
