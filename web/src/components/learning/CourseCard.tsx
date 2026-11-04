"use client";

import React from "react";
import Link from "next/link";
import { Clock, BookOpen, Bookmark, ArrowRight, CheckCircle2 } from "lucide-react";
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
        return "bg-cyan/10 border-cyan/40 text-cyan";
      case "intermediate":
        return "bg-cobalt/20 border-electric/40 text-iceWhite";
      case "advanced":
        return "bg-gold/10 border-gold/40 text-gold-champagne";
      default:
        return "bg-slate-dim/20 border-slate-dim/40 text-slate-soft";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-deepspace/70 border border-cyan-500/15 hover:border-cyan-400/50 p-6 sm:p-7 transition-all duration-300 hover:shadow-card-elevated hover:-translate-y-1 backdrop-blur-md">
      {/* Top Meta Bar with standard margins */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase font-semibold tracking-wider border ${getLevelBadgeStyles(
              course.level
            )}`}
          >
            {course.level}
          </span>
          <button
            onClick={() => toggleBookmark(course.slug)}
            aria-label="Bookmark course"
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? "bg-gold/20 border-gold text-gold"
                : "border-transparent text-slate-soft hover:text-pearl hover:bg-white/5"
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Course Title with standard heading margins */}
        <Link href={`/courses/${course.slug}`}>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-pearl group-hover:text-cyan transition-colors line-clamp-1">
            {course.title}
          </h3>
        </Link>

        {/* Tagline / Overview */}
        <p className="mt-2.5 text-sm text-slate-soft line-clamp-2 leading-relaxed">
          {course.tagline || course.overview}
        </p>

        {/* Real World Project Pill with crystalline border */}
        {course.realWorldProject && (
          <div className="mt-4 py-2 px-3 rounded-xl bg-midnight/80 border border-slate-dim/25 text-[11px] font-mono text-slate-soft flex items-center gap-2">
            <span className="text-gold font-bold flex-shrink-0">CAPSTONE:</span>
            <span className="truncate text-pearl">{course.realWorldProject.title}</span>
          </div>
        )}
      </div>

      {/* Bottom Metrics & Actions with standard top margin and border */}
      <div className="mt-6 pt-5 border-t border-slate-dim/20">
        <div className="flex items-center justify-between text-xs text-slate-soft font-mono mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span>{course.estimatedHours}h estimated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            <span>{course.modulesCount || 3} modules</span>
          </div>
        </div>

        {enrolled ? (
          <Link
            href={`/learn/${course.slug}/${course.modules?.[0]?.lessons?.[0]?.slug || 'intro'}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan/15 border border-cyan/40 text-cyan text-sm font-semibold hover:bg-cyan/25 transition-all shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan" />
            <span>Continue ({enrolled.progressPercent}%)</span>
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-deepspace border border-slate-dim/40 hover:border-cyan text-pearl text-sm font-medium hover:text-cyan group-hover:bg-midnight transition-all"
          >
            <span>Explore Course</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
