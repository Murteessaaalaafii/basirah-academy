"use client";

import React from "react";
import Link from "next/link";
import { Clock, BookOpen, Bookmark, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Course } from "../../../../shared/curriculum";
import { useBasirahStore } from "@/lib/store";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { bookmarks, toggleBookmark, enrollments } = useBasirahStore();
  const isBookmarked = bookmarks.includes(course.slug);
  const enrolled = enrollments.find((e) => e.slug === course.slug);

  const getLevelBadgeStyles = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case "beginner":
        return "bg-cyan/15 border-cyan-400 text-cyan shadow-[0_0_12px_rgba(0,240,255,0.25)]";
      case "intermediate":
        return "bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]";
      case "advanced":
        return "bg-amber-400/15 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]";
      default:
        return "bg-slate-dim/20 border-slate-dim/40 text-slate-soft";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-deepspace/80 to-midnight/90 border-2 border-amber-400/35 hover:border-amber-300/80 p-6 sm:p-7 transition-all duration-300 hover:shadow-gold-glass hover:-translate-y-1.5 backdrop-blur-xl">
      {/* Top Meta Bar with standard margins */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase font-bold tracking-wider border ${getLevelBadgeStyles(
              course.level
            )}`}
          >
            {course.level}
          </span>
          <button
            onClick={() => toggleBookmark(course.slug)}
            aria-label="Bookmark course"
            className={`btn-touch p-2 rounded-xl border transition-all ${
              isBookmarked
                ? "bg-amber-400/25 border-amber-400 text-amber-400 shadow-gold-glass"
                : "border-slate-dim/30 text-slate-soft hover:text-pearl hover:border-cyan-400/50 hover:bg-white/5"
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Course Title with standard heading margins */}
        <Link href={`/courses/${course.slug}`} className="group/title">
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-pearl group-hover/title:text-cyan transition-colors line-clamp-1">
            {course.title}
          </h3>
        </Link>

        {/* Tagline / Overview */}
        <p className="mt-2.5 text-sm text-slate-soft line-clamp-2 leading-relaxed">
          {course.tagline || course.overview}
        </p>

        {/* Real World Project Pill with golden glass styling */}
        {course.realWorldProject && (
          <div className="mt-4 py-2 px-3 rounded-xl bg-midnight/90 border border-amber-400/30 text-[11px] font-mono text-slate-soft flex items-center gap-2 shadow-sm">
            <span className="text-amber-400 font-bold flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              CAPSTONE:
            </span>
            <span className="truncate text-pearl font-medium">{course.realWorldProject.title}</span>
          </div>
        )}
      </div>

      {/* Bottom Metrics & Actions with standard top margin and golden border */}
      <div className="mt-6 pt-5 border-t border-amber-400/20">
        <div className="flex items-center justify-between text-xs text-slate-soft font-mono mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span>{course.estimatedHours}h estimated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>{course.modulesCount || 3} modules</span>
          </div>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}/${course.modules?.[0]?.lessons?.[0]?.slug || 'intro'}`}
            className="btn-touch w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan/15 border border-cyan/40 text-cyan text-sm font-bold hover:bg-cyan/25 shadow-cyan-glass"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan" />
            <span>Continue ({enrolled.progressPercent}%)</span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="btn-touch w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-deepspace/90 border border-amber-400/40 hover:border-amber-300 text-pearl text-sm font-semibold hover:text-amber-300 shadow-gold-glass"
          >
            <span>Explore Course</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
