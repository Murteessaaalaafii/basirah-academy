import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { CourseCard } from "@/components/learning/CourseCard";
import { getCoursesByLevel, getLearningPathBySlug } from "@/lib/courses";

export const metadata = {
  title: "Beginner Academy: Discover AI — Basirah Academy",
  description: "Understand foundational artificial intelligence, prompt engineering, Python, and machine learning."
};

export default function BeginnerAcademyPage() {
  const path = getLearningPathBySlug("beginner-academy");
  const courses = getCoursesByLevel("beginner");

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-deepspace via-cobalt/30 to-deepspace border border-cyan/40 shadow-card-elevated space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 border border-cyan/30 text-cyan text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BEGINNER PATHWAY • 10 COURSES • 12 WEEKS</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
          Discover AI — The Foundations of Intelligence
        </h1>
        <p className="text-slate-soft text-base sm:text-lg max-w-3xl leading-relaxed">
          {path?.description || "A comprehensive pathway taking you from zero conceptual knowledge to strong AI literacy, programming proficiency in Python, and mathematical intuition."}
        </p>

        {/* Competencies */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-dim/20">
          {path?.competencies.map((comp, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-soft">
              <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-pearl">
          Beginner Pathway Curriculum (10 Courses)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

