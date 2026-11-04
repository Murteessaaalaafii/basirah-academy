"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Terminal,
  FileCode,
  ShieldCheck
} from "lucide-react";
import { useBasirahStore } from "@/lib/store";
import { IntelligentProgressRing } from "@/components/visual/IntelligentProgressRing";
import { ALL_COURSES } from "@/lib/courses";

export default function DashboardPage() {
  const { user, enrollments, bookmarks } = useBasirahStore();

  const totalEnrolled = enrollments.length;
  const avgProgress = totalEnrolled > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progressPercent, 0) / totalEnrolled)
    : 0;

  const totalCompletedLessons = enrollments.reduce((sum, e) => sum + e.completedLessons.length, 0);

  const bookmarkedCourses = (ALL_COURSES || []).filter((c) => bookmarks.includes(c.slug));

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Welcome Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-deepspace via-cobalt/30 to-deepspace border border-cyan/40 shadow-card-elevated flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 border border-cyan/30 text-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span>LEARNING LEVEL: {(user?.level || "INTERMEDIATE").toUpperCase()}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-pearl">
            Welcome back, {user?.displayName || "Amina"}.
          </h1>
          <p className="text-slate-soft text-sm sm:text-base max-w-xl leading-relaxed">
            &ldquo;Your next idea could become your next invention.&rdquo; Continue mastering neural architectures, vector embeddings, and autonomous agent loops.
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="flex-shrink-0 p-4 rounded-xl bg-midnight/70 border border-slate-dim/30">
          <IntelligentProgressRing progress={avgProgress} label="Average Mastery" size={130} />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
          <span className="text-xs font-mono text-slate-soft uppercase">Enrolled Courses</span>
          <div className="font-heading font-bold text-2xl text-pearl mt-1">{totalEnrolled}</div>
          <span className="text-[11px] text-cyan font-mono mt-1 block">Active Ingest</span>
        </div>
        <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
          <span className="text-xs font-mono text-slate-soft uppercase">Completed Lessons</span>
          <div className="font-heading font-bold text-2xl text-pearl mt-1">{totalCompletedLessons}</div>
          <span className="text-[11px] text-gold font-mono mt-1 block">Verified Labs</span>
        </div>
        <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
          <span className="text-xs font-mono text-slate-soft uppercase">Saved Bookmarks</span>
          <div className="font-heading font-bold text-2xl text-pearl mt-1">{bookmarks.length}</div>
          <span className="text-[11px] text-electric font-mono mt-1 block">Curated Queue</span>
        </div>
        <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
          <span className="text-xs font-mono text-slate-soft uppercase">Active Projects</span>
          <div className="font-heading font-bold text-2xl text-pearl mt-1">1</div>
          <span className="text-[11px] text-status-success font-mono mt-1 block">In Progress</span>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-pearl flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan" />
            <span>Continue Learning</span>
          </h2>
          <Link href="/courses" className="text-xs font-mono text-cyan hover:underline">
            Explore More Courses
          </Link>
        </div>

        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((course, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 hover:border-cyan/50 shadow-card-elevated space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-midnight border border-slate-dim/30 text-cyan">
                    {course.level}
                  </span>
                  <span className="font-mono text-xs text-slate-soft">
                    {course.completedLessons.length} Lessons Finished
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-pearl line-clamp-1">
                  {course.title}
                </h3>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-soft">Mastery Progress</span>
                    <span className="text-pearl font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-midnight h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan to-electric h-full transition-all duration-500"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/learn/${course.slug}/${course.completedLessons[0] || 'conceptual-underpinnings'}`}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-cyan text-midnight text-xs font-bold shadow-cyan-glow hover:brightness-110"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-xs text-slate-soft hover:text-pearl"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-deepspace/40 border border-slate-dim/20 text-center space-y-3">
            <p className="text-sm text-slate-soft">You are not enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="inline-block px-4 py-2 rounded-lg bg-cyan text-midnight font-bold text-xs"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>

      {/* Active Capstone Project & Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capstone Project Card */}
        <div className="p-6 rounded-xl bg-midnight border border-gold/40 shadow-gold-glow space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-gold">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold" />
              CAPSTONE PROJECT IN PROGRESS
            </span>
            <span>DUE NOV 20, 2026</span>
          </div>

          <h3 className="font-heading font-bold text-lg text-pearl">
            End-to-End Hybrid RAG with Cross-Encoder Reranking
          </h3>
          <p className="text-xs text-slate-soft leading-relaxed">
            Course: Retrieval-Augmented Generation. Implement sparse BM25 indexing, dense Qdrant vector retrieval, reciprocal rank fusion, and a calibrated cross-encoder reranker.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-cyan">Rubric Status: Ready for Submission</span>
            <Link
              href="/learn/retrieval-augmented-generation/capstone-walkthrough"
              className="px-3.5 py-1.5 rounded-lg bg-deepspace border border-gold/40 text-gold-champagne text-xs font-mono font-bold hover:bg-gold/10"
            >
              Open Project Workspace
            </Link>
          </div>
        </div>

        {/* Verified Certificate Card */}
        <div className="p-6 rounded-xl bg-deepspace/80 border border-cyan/30 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-cyan">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              CRYPTOGRAPHIC CREDENTIAL
            </span>
            <span>ISSUED SEPT 2026</span>
          </div>

          <h3 className="font-heading font-bold text-lg text-pearl">
            Python Programming Fundamentals
          </h3>
          <p className="text-xs text-slate-soft leading-relaxed">
            Verified mastery in OOP, functional decorators, typing, and memory profiling. Evaluation score: 98%.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-soft text-[11px]">ID: BAS-CERT-8812</span>
            <span className="text-status-success font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified on Chain
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

