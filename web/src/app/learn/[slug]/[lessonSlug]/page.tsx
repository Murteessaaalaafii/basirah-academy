"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Layers, 
  HelpCircle,
  FileCode,
  Download,
  Share2
} from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";
import { CodeEditor } from "@/components/learning/CodeEditor";
import { QuizRenderer } from "@/components/learning/QuizRenderer";
import { AITutorPanel } from "@/components/ai/AITutorPanel";

export default function LessonLearnPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.slug as string;
  const lessonSlug = params.lessonSlug as string;

  const course = getCourseBySlug(courseSlug);
  const { enrollments, completeLesson } = useBasirahStore();
  const [activeTab, setActiveTab] = useState<'content' | 'lab' | 'quiz'>('content');
  const [showTutor, setShowTutor] = useState(true);

  if (!course) {
    return (
      <div className="py-24 text-center space-y-4">
        <h1 className="font-heading font-bold text-2xl text-pearl">Course Not Found</h1>
        <Link href="/courses" className="text-cyan text-sm underline">Return to Courses</Link>
      </div>
    );
  }

  // Find module & lesson
  let activeModule = course.modules?.[0];
  let activeLesson = activeModule?.lessons?.[0];

  for (const mod of course.modules || []) {
    for (const les of mod.lessons || []) {
      if (les.slug === lessonSlug || les.id === lessonSlug) {
        activeModule = mod;
        activeLesson = les;
        break;
      }
    }
  }

  const enrolled = enrollments.find((e) => e.slug === course.slug);
  const isCompleted = enrolled?.completedLessons.includes(activeLesson?.id || "");

  const handleMarkComplete = () => {
    if (activeLesson) {
      completeLesson(course.slug, activeLesson.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-midnight">
      {/* Top Workspace Header Bar */}
      <div className="h-14 px-4 bg-deepspace/90 border-b border-slate-dim/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 text-slate-soft hover:text-pearl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Syllabus</span>
          </Link>
          <span className="text-slate-dim">/</span>
          <span className="text-pearl font-medium truncate max-w-[200px] sm:max-w-xs">
            {course.title}
          </span>
          <span className="text-slate-dim hidden sm:inline">/</span>
          <span className="text-cyan truncate max-w-[180px] hidden sm:inline">
            {activeLesson?.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTutor(!showTutor)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
              showTutor
                ? "bg-cyan/15 border-cyan text-cyan font-bold"
                : "border-slate-dim/40 text-slate-soft hover:text-pearl"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          <button
            onClick={handleMarkComplete}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
              isCompleted
                ? "bg-status-success/20 border-status-success text-status-success"
                : "bg-cyan text-midnight border-cyan hover:brightness-110"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Lesson Navigation Sidebar */}
        <aside className="w-full lg:w-72 bg-deepspace/50 border-r border-slate-dim/20 overflow-y-auto p-4 space-y-4 flex-shrink-0 hidden md:block">
          <div className="flex items-center justify-between text-xs font-mono text-slate-soft uppercase">
            <span>Course Modules</span>
            <span>{course.modules?.length}</span>
          </div>

          <div className="space-y-4">
            {course.modules?.map((mod) => (
              <div key={mod.id} className="space-y-1.5">
                <span className="text-[11px] font-mono text-cyan block truncate">
                  MOD {mod.sequenceOrder}: {mod.title}
                </span>
                <div className="space-y-1">
                  {mod.lessons?.map((les) => {
                    const isCurrent = les.slug === activeLesson?.slug;
                    const isDone = enrolled?.completedLessons.includes(les.id);
                    return (
                      <Link
                        key={les.id}
                        href={`/learn/${course.slug}/${les.slug}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          isCurrent
                            ? "bg-cyan/15 border border-cyan/40 text-cyan font-semibold"
                            : "text-slate-soft hover:text-pearl hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-1">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-status-success flex-shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-dim flex-shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70 flex-shrink-0">
                          {les.durationMinutes}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Main Stage */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Lesson Header */}
          <div className="space-y-3 pb-6 border-b border-slate-dim/20">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan">
              <span>{activeModule?.title}</span>
              <span>•</span>
              <span>{activeLesson?.durationMinutes} min study</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-pearl">
              {activeLesson?.title}
            </h1>
          </div>

          {/* Tab Navigation: Concept Theory | Code Lab | Knowledge Check */}
          <div className="flex items-center gap-2 border-b border-slate-dim/20 pb-3 text-xs font-mono">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'content'
                  ? "bg-cyan/15 border border-cyan/40 text-cyan font-bold"
                  : "text-slate-soft hover:text-pearl"
              }`}
            >
              Theory & Intuition
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'lab'
                  ? "bg-electric/20 border border-electric/40 text-iceWhite font-bold"
                  : "text-slate-soft hover:text-pearl"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan" />
              <span>Interactive Lab</span>
            </button>
            {activeModule?.quiz && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? "bg-gold/20 border border-gold/40 text-gold-champagne font-bold"
                    : "text-slate-soft hover:text-pearl"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-gold" />
                <span>Knowledge Check</span>
              </button>
            )}
          </div>

          {/* Tab 1: Theory & Content Markdown */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-3xl">
              <div className="prose prose-invert max-w-none text-slate-soft text-sm sm:text-base leading-relaxed space-y-4">
                <div className="whitespace-pre-wrap font-sans">
                  {activeLesson?.contentMarkdown}
                </div>
              </div>

              {/* Code Snippet in Lesson */}
              {activeLesson?.codeSnippet && (
                <div className="mt-6 pt-4 space-y-2">
                  <span className="text-xs font-mono text-cyan font-bold block">
                    REFERENCE IMPLEMENTATION
                  </span>
                  <CodeEditor
                    initialCode={activeLesson.codeSnippet}
                    language={activeLesson.codeLanguage || "python"}
                  />
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Interactive Lab Workspace */}
          {activeTab === 'lab' && (
            <div className="space-y-4 max-w-4xl">
              <div className="p-4 rounded-xl bg-deepspace border border-slate-dim/30 text-xs text-slate-soft space-y-1">
                <span className="text-pearl font-bold block">Interactive Laboratory Instructions:</span>
                <p>
                  {activeLesson?.practicalExercise?.instruction ||
                    "Modify the computational routine, verify tensor transformations, and run the script to observe console telemetry."}
                </p>
              </div>
              <CodeEditor
                initialCode={activeLesson?.practicalExercise?.starterCode || activeLesson?.codeSnippet}
                language={activeLesson?.codeLanguage || "python"}
              />
            </div>
          )}

          {/* Tab 3: Knowledge Check Quiz */}
          {activeTab === 'quiz' && activeModule?.quiz && (
            <div className="max-w-3xl">
              <QuizRenderer quiz={activeModule.quiz} onComplete={() => handleMarkComplete()} />
            </div>
          )}
        </main>

        {/* Right Collapsible AI Tutor Sidebar */}
        {showTutor && (
          <aside className="w-full lg:w-96 h-[500px] lg:h-auto border-t lg:border-t-0 lg:border-l border-slate-dim/20 bg-deepspace/40 flex-shrink-0">
            <AITutorPanel courseSlug={course.slug} lessonSlug={activeLesson?.slug} />
          </aside>
        )}
      </div>
    </div>
  );
}

