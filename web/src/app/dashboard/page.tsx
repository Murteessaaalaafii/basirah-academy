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
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Welcome Banner with Golden Glass & App Icon */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-deepspace via-midnight/90 to-deepspace border-2 border-amber-400/45 shadow-gold-glass flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-2xl">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>LEARNING LEVEL: {(user?.level || "INTERMEDIATE").toUpperCase()}</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-pearl">
            Welcome back, {user?.displayName || "Amina"}.
          </h1>
          <p className="text-slate-soft text-base max-w-xl leading-relaxed">
            &ldquo;Your next idea could become your next invention.&rdquo; Continue mastering neural architectures, vector embeddings, and autonomous agent loops.
          </p>
        </div>

        {/* Circular Progress Ring with Golden Glass Border */}
        <div className="flex-shrink-0 p-5 rounded-2xl bg-midnight/80 border-2 border-amber-400/40 shadow-gold-glass">
          <IntelligentProgressRing progress={avgProgress} label="Average Mastery" size={135} />
        </div>
      </div>

      {/* Metrics Row with Golden Glass Styling */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
          <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Enrolled Courses</span>
          <div className="font-heading font-extrabold text-3xl text-pearl mt-2">{totalEnrolled}</div>
          <span className="text-xs text-cyan font-mono mt-1.5 block font-bold">Active Ingest</span>
        </div>
        <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
          <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Completed Lessons</span>
          <div className="font-heading font-extrabold text-3xl text-pearl mt-2">{totalCompletedLessons}</div>
          <span className="text-xs text-amber-400 font-mono mt-1.5 block font-bold">Verified Labs</span>
        </div>
        <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
          <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Saved Bookmarks</span>
          <div className="font-heading font-extrabold text-3xl text-pearl mt-2">{bookmarks.length}</div>
          <span className="text-xs text-purple-300 font-mono mt-1.5 block font-bold">Curated Queue</span>
        </div>
        <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
          <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Active Capstone</span>
          <div className="font-heading font-extrabold text-3xl text-pearl mt-2">1</div>
          <span className="text-xs text-status-success font-mono mt-1.5 block font-bold">In Evaluation</span>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-pearl flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span>Continue Learning</span>
          </h2>
          <Link href="/courses" className="btn-touch text-xs font-mono text-cyan hover:underline font-bold">
            Explore All 36 Courses →
          </Link>
        </div>

        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrollments.map((course, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-gradient-to-b from-deepspace/80 to-midnight/90 border-2 border-amber-400/35 hover:border-amber-300 transition-all duration-300 hover:shadow-gold-glass space-y-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold">
                    {course.level}
                  </span>
                  <span className="font-mono text-xs text-slate-soft">
                    {course.completedLessons.length} Lessons Finished
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-pearl line-clamp-1">
                  {course.title}
                </h3>

                {/* Progress Bar with Golden Accent */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-soft">Mastery Progress</span>
                    <span className="text-amber-400 font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-midnight h-2.5 rounded-full overflow-hidden border border-amber-400/20">
                    <div
                      className="bg-gradient-to-r from-amber-400 via-amber-300 to-cyan h-full transition-all duration-500 shadow-gold-glass"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/learn/${course.slug}/${course.completedLessons[0] || 'conceptual-underpinnings'}`}
                    className="btn-touch inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-cyan text-midnight text-xs font-bold shadow-gold-glass hover:brightness-110"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-touch text-xs text-slate-soft hover:text-amber-300 font-medium"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-deepspace/50 border-2 border-amber-400/30 text-center space-y-4">
            <p className="text-base text-slate-soft">You are not enrolled in any courses yet.</p>
            <Link
              href="/courses"
              className="btn-touch inline-block px-6 py-3 rounded-xl bg-amber-400 text-midnight font-bold text-xs shadow-gold-glass"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>

      {/* Active Capstone Project & Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capstone Project Card with Golden Glass */}
        <div className="p-7 rounded-3xl bg-midnight/90 border-2 border-amber-400/50 shadow-gold-glass space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              CAPSTONE PROJECT IN PROGRESS
            </span>
            <span>DUE NOV 20, 2026</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl text-pearl">
            End-to-End Hybrid RAG with Cross-Encoder Reranking
          </h3>
          <p className="text-xs text-slate-soft leading-relaxed">
            Course: Retrieval-Augmented Generation. Implement sparse BM25 indexing, dense Qdrant vector retrieval, reciprocal rank fusion, and a calibrated cross-encoder reranker.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan font-semibold">Rubric: Ready for Submission</span>
            <Link
              href="/learn/retrieval-augmented-generation/capstone-walkthrough"
              className="btn-touch px-4 py-2 rounded-xl bg-deepspace border-2 border-amber-400/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400/10 shadow-gold-glass"
            >
              Open Project Workspace
            </Link>
          </div>
        </div>

        {/* Verified Certificate Card with Golden Glass */}
        <div className="p-7 rounded-3xl bg-deepspace/80 border-2 border-cyan-400/40 shadow-cyan-glass space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-cyan font-bold">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              CRYPTOGRAPHIC CREDENTIAL
            </span>
            <span>ISSUED SEPT 2026</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl text-pearl">
            Python & Dart Programming Fundamentals
          </h3>
          <p className="text-xs text-slate-soft leading-relaxed">
            Verified mastery in OOP, functional decorators, typing, and memory profiling. Evaluation score: 98%.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-soft text-xs">ID: BAS-CERT-8812</span>
            <span className="text-status-success font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Verified on Chain
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
