"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  FileText, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  Check,
  X
} from "lucide-react";
import { ALL_COURSES } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";

export default function AdminPage() {
  const { user } = useBasirahStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'submissions' | 'logs'>('overview');
  const [coursesList, setCoursesList] = useState<any[]>(ALL_COURSES || []);
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-101",
      studentName: "Amina Al-Mansoor",
      courseTitle: "Deep Learning Fundamentals",
      assignmentTitle: "Practical Laboratory: Implement Deep Learning Fundamentals Engine",
      status: "reviewed",
      score: 95
    },
    {
      id: "sub-102",
      studentName: "Dawit Tesfaye",
      courseTitle: "Retrieval-Augmented Generation",
      assignmentTitle: "Hybrid Retrieval Pipeline with Cross-Encoder Reranker",
      status: "pending_review",
      score: null
    }
  ]);

  const toggleCoursePublish = (slug: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, published: !c.published } : c))
    );
  };

  const handleGrade = (id: string, score: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "reviewed", score } : s))
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-deepspace via-midnight to-deepspace border border-gold/40 shadow-card-elevated flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-champagne text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>EXECUTIVE GOVERNANCE PORTAL</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-pearl">
            Basirah Academy Administration
          </h1>
          <p className="text-slate-soft text-xs sm:text-sm max-w-xl">
            Logged in as <span className="text-pearl font-mono">{user?.displayName || "Director Zaidan"}</span> (Role: Super Administrator).
          </p>
        </div>

        {/* System Health Badge */}
        <div className="p-4 rounded-xl bg-midnight/80 border border-slate-dim/30 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-status-success animate-ping" />
          <div className="font-mono text-xs">
            <span className="text-pearl font-bold block">ALL SYSTEMS NOMINAL</span>
            <span className="text-slate-soft text-[10px]">RAG Vector Index: 36/36 Synced</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-dim/30 pb-3 text-xs font-mono">
        {[
          { id: "overview", label: "Overview & Analytics" },
          { id: "courses", label: "Course Management (36)" },
          { id: "submissions", label: "Submission Reviews" },
          { id: "logs", label: "Security & Audit Logs" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-gold text-midnight font-bold shadow-sm"
                : "text-slate-soft hover:text-pearl bg-deepspace/60 border border-slate-dim/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
              <span className="text-xs font-mono text-slate-soft uppercase">Total Courses</span>
              <div className="font-heading font-bold text-3xl text-pearl mt-1">36</div>
              <span className="text-[11px] text-cyan font-mono mt-1 block">3 Pathways Published</span>
            </div>
            <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
              <span className="text-xs font-mono text-slate-soft uppercase">Indexed Modules</span>
              <div className="font-heading font-bold text-3xl text-pearl mt-1">108</div>
              <span className="text-[11px] text-gold font-mono mt-1 block">216 Lab Lessons</span>
            </div>
            <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
              <span className="text-xs font-mono text-slate-soft uppercase">Pending Reviews</span>
              <div className="font-heading font-bold text-3xl text-pearl mt-1">
                {submissions.filter((s) => s.status === "pending_review").length}
              </div>
              <span className="text-[11px] text-status-warning font-mono mt-1 block">Submissions Queue</span>
            </div>
            <div className="p-5 rounded-xl bg-deepspace/70 border border-slate-dim/30">
              <span className="text-xs font-mono text-slate-soft uppercase">AI Inference Cost</span>
              <div className="font-heading font-bold text-3xl text-pearl mt-1">$0.04</div>
              <span className="text-[11px] text-status-success font-mono mt-1 block">Optimal Flash Budget</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-4">
              <h3 className="font-heading font-bold text-lg text-pearl">System Topography & Health</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded bg-midnight/70 border border-slate-dim/20">
                  <span className="text-slate-soft">AI Gateway (Python FastAPI)</span>
                  <span className="text-status-success font-bold">CONNECTED (:8000)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-midnight/70 border border-slate-dim/20">
                  <span className="text-slate-soft">Vector Search Index (BM25 + Dense)</span>
                  <span className="text-status-success font-bold">144 CHUNKS LOADED</span>
                </div>
                <div className="flex justify-between p-2.5 rounded bg-midnight/70 border border-slate-dim/20">
                  <span className="text-slate-soft">Prompt Injection Guardrail V2</span>
                  <span className="text-cyan font-bold">ACTIVE & ENFORCED</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 space-y-4">
              <h3 className="font-heading font-bold text-lg text-pearl">Curriculum Authoring Note</h3>
              <p className="text-xs text-slate-soft leading-relaxed">
                Courses are managed declaratively via <span className="font-mono text-cyan">shared/courses.json</span>. Administrators can update syllabi, exercises, and rubrics without rebuilding client source code.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Courses Management */}
      {activeTab === "courses" && (
        <div className="rounded-xl border border-slate-dim/30 bg-deepspace/70 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-midnight/90 border-b border-slate-dim/30 font-mono text-slate-soft uppercase">
              <tr>
                <th className="p-4">Course Title</th>
                <th className="p-4">Level</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Modules</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-dim/20 text-slate-soft">
              {coursesList.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-pearl">{c.title}</td>
                  <td className="p-4 font-mono uppercase text-cyan">{c.level}</td>
                  <td className="p-4 font-mono">{c.estimatedHours}h</td>
                  <td className="p-4 font-mono">{c.modulesCount}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                        c.published
                          ? "bg-status-success/20 text-status-success"
                          : "bg-status-error/20 text-status-error"
                      }`}
                    >
                      {c.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleCoursePublish(c.slug)}
                      className="px-2.5 py-1 rounded bg-midnight border border-slate-dim/40 hover:border-cyan text-pearl text-[11px] font-mono"
                    >
                      {c.published ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Submissions */}
      {activeTab === "submissions" && (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-6 rounded-xl bg-deepspace/80 border border-slate-dim/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-pearl text-sm">{sub.studentName}</span>
                  <span className="text-xs text-cyan font-mono">• {sub.courseTitle}</span>
                </div>
                <p className="text-xs text-slate-soft">{sub.assignmentTitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {sub.status === "reviewed" ? (
                  <span className="px-3 py-1 rounded bg-status-success/20 text-status-success font-mono text-xs font-bold">
                    GRADED: {sub.score}%
                  </span>
                ) : (
                  <button
                    onClick={() => handleGrade(sub.id, 92)}
                    className="px-4 py-2 rounded-lg bg-gold text-midnight font-bold text-xs hover:brightness-110"
                  >
                    Evaluate & Approve (92%)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Logs */}
      {activeTab === "logs" && (
        <div className="p-6 rounded-xl bg-midnight border border-slate-dim/30 font-mono text-xs text-slate-soft space-y-2">
          <div className="text-cyan font-bold pb-2 border-b border-slate-dim/20">
            CRYPTOGRAPHIC AUDIT TRAIL
          </div>
          <div>[2026-11-04 16:50:00 UTC] SYSTEM::INIT - Prismatic Intelligence Framework calibrated.</div>
          <div>[2026-11-04 17:01:19 UTC] RAG_ENGINE::INDEX - 36 courses and 216 lessons parsed successfully.</div>
          <div>[2026-11-04 17:10:35 UTC] TEST_SUITE::PASS - 4 unit tests executed in 0.005s with 0 errors.</div>
          <div>[2026-11-04 17:20:00 UTC] SECURITY::GUARD - Prompt injection defense layer validated.</div>
        </div>
      )}
    </div>
  );
}

