"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Layers, 
  ArrowRight, 
  FileCode, 
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const { enrollments, enrollCourse } = useBasirahStore();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="py-24 text-center space-y-4">
        <h1 className="font-heading font-bold text-2xl text-pearl">Course Not Found</h1>
        <p className="text-slate-soft text-sm">The requested course could not be located in the catalog.</p>
        <Link href="/courses" className="inline-block px-4 py-2 rounded bg-cyan text-midnight font-bold text-xs">
          Return to Course Catalog
        </Link>
      </div>
    );
  }

  const enrolled = enrollments.find((e) => e.slug === course.slug);

  const handleEnroll = () => {
    enrollCourse(course.slug, course.title, course.level);
    const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug || "intro";
    router.push(`/learn/${course.slug}/${firstLessonSlug}`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Course Hero Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-deepspace to-midnight border border-cyan/40 shadow-card-elevated space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded text-xs font-mono uppercase font-bold tracking-wider bg-cyan/15 border border-cyan/40 text-cyan">
            {course.level}
          </span>
          <span className="text-xs font-mono text-slate-soft">
            {course.estimatedHours} Hours of Rigorous Instruction
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl leading-tight">
          {course.title}
        </h1>

        <p className="text-slate-soft text-base sm:text-lg max-w-3xl leading-relaxed">
          {course.tagline}
        </p>

        {/* Action Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          {enrolled ? (
            <Link
              href={`/learn/${course.slug}/${course.modules?.[0]?.lessons?.[0]?.slug || 'intro'}`}
              className="px-8 py-3.5 rounded-xl font-sans font-bold text-sm text-midnight bg-cyan hover:brightness-110 shadow-cyan-glow flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Continue Learning ({enrolled.progressPercent}%)</span>
            </Link>
          ) : (
            <button
              onClick={handleEnroll}
              className="px-8 py-3.5 rounded-xl font-sans font-bold text-sm text-midnight bg-gradient-to-r from-cyan to-electric hover:brightness-110 shadow-cyan-glow flex items-center gap-2 transition-all"
            >
              <span>Enroll in Course</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="text-xs font-mono text-slate-soft px-3 py-2 rounded bg-midnight/70 border border-slate-dim/30">
            {course.modulesCount || 3} Modules • {course.lessonsCount || 6} Lessons • 1 Capstone Project
          </div>
        </div>
      </div>

      {/* Main Grid: Overview & Objectives vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Overview, Modules, Capstone */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <div className="p-8 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-4">
            <h2 className="font-heading font-bold text-xl text-pearl">Course Overview</h2>
            <p className="text-sm text-slate-soft leading-relaxed">
              {course.overview}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="p-8 rounded-xl bg-deepspace/70 border border-slate-dim/30 space-y-4">
            <h2 className="font-heading font-bold text-xl text-pearl">Learning Objectives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {course.objectives?.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-soft leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Breakdown Accordion */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-pearl">Syllabus & Modules</h2>
            <div className="space-y-3">
              {course.modules?.map((mod, modIdx) => {
                const isExpanded = expandedModule === modIdx;
                return (
                  <div
                    key={mod.id}
                    className="rounded-xl bg-deepspace/80 border border-slate-dim/30 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : modIdx)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-cyan">MODULE {mod.sequenceOrder}</span>
                          <span className="text-xs text-slate-soft">• {mod.durationMinutes} mins</span>
                        </div>
                        <h4 className="font-heading font-semibold text-pearl text-base">{mod.title}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-cyan" /> : <ChevronDown className="w-5 h-5 text-slate-soft" />}
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-slate-dim/20 space-y-3 bg-midnight/50">
                        <p className="text-xs text-slate-soft mt-3">{mod.description}</p>
                        <div className="space-y-2 pt-2">
                          {mod.lessons?.map((les) => (
                            <Link
                              key={les.id}
                              href={`/learn/${course.slug}/${les.slug}`}
                              className="group flex items-center justify-between p-3 rounded-lg bg-deepspace border border-slate-dim/20 hover:border-cyan/40 text-xs transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <FileCode className="w-4 h-4 text-slate-soft group-hover:text-cyan" />
                                <span className="text-pearl group-hover:text-cyan font-medium">{les.title}</span>
                              </div>
                              <span className="font-mono text-[11px] text-slate-soft">{les.durationMinutes}m</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real World Capstone Project Section */}
          {course.realWorldProject && (
            <div className="p-8 rounded-xl bg-midnight border border-gold/40 shadow-gold-glow space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-wider">
                <Award className="w-4 h-4 text-gold" />
                <span>Capstone Engineering Deliverable</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-pearl">
                {course.realWorldProject.title}
              </h3>
              <p className="text-xs text-slate-soft leading-relaxed">
                {course.realWorldProject.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-pearl font-semibold block">Required Deliverables:</span>
                {course.realWorldProject.deliverables?.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-soft">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Meta & Completion Criteria */}
        <div className="lg:col-span-4 space-y-6">
          {/* Prerequisites Card */}
          <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-3">
            <h3 className="font-heading font-semibold text-pearl text-sm uppercase tracking-wide">
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {course.prerequisites?.map((pre, idx) => (
                <li key={idx} className="text-xs text-slate-soft leading-relaxed flex items-start gap-2">
                  <span className="text-cyan">•</span>
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Completion Criteria */}
          <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-3">
            <h3 className="font-heading font-semibold text-pearl text-sm uppercase tracking-wide">
              Completion Criteria
            </h3>
            <p className="text-xs text-slate-soft leading-relaxed">
              {course.completionCriteria || "Complete all lessons, pass all module knowledge checks with >= 80%, and deliver the validated capstone project."}
            </p>
          </div>

          {/* References */}
          {course.references && (
            <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-3">
              <h3 className="font-heading font-semibold text-pearl text-sm uppercase tracking-wide">
                Key Literature & References
              </h3>
              <div className="space-y-2.5">
                {course.references.map((ref, idx) => (
                  <div key={idx} className="text-xs border-b border-slate-dim/20 pb-2 last:border-0">
                    <span className="text-pearl font-medium block">{ref.title}</span>
                    <span className="text-slate-soft text-[11px] font-mono">{ref.author} ({ref.year})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

