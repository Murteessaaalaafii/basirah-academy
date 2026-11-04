"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Cpu, 
  Terminal, 
  FileCheck2, 
  AlertTriangle, 
  Plus, 
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  Sparkles
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
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Admin Header with Golden Glass Beveled Frame */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-deepspace via-midnight/90 to-deepspace border-2 border-amber-400/45 shadow-gold-glass flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>EXECUTIVE GOVERNANCE PORTAL</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-pearl">
            Basirah Academy Administration
          </h1>
          <p className="text-slate-soft text-xs sm:text-sm max-w-xl">
            Logged in as <span className="text-amber-400 font-mono font-bold">{user?.displayName || "Director Zaidan"}</span> (Role: Super Administrator).
          </p>
        </div>

        {/* System Health Badge with Golden Glass Styling */}
        <div className="p-5 rounded-2xl bg-midnight/90 border-2 border-amber-400/35 flex items-center gap-3.5 shadow-gold-glass">
          <div className="w-3.5 h-3.5 rounded-full bg-status-success animate-ping" />
          <div className="font-mono text-xs">
            <span className="text-pearl font-bold block">ALL SYSTEMS NOMINAL</span>
            <span className="text-amber-400 font-bold text-[10px]">RAG Vector Index: 36/36 Synced</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs with Touchable Micro-Interactions */}
      <div className="flex items-center gap-2.5 border-b-2 border-amber-400/20 pb-4 text-xs font-mono overflow-x-auto">
        {[
          { id: "overview", label: "Overview & Analytics" },
          { id: "courses", label: "Course Management (36)" },
          { id: "submissions", label: "Submission Reviews" },
          { id: "logs", label: "Security & Audit Logs" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`btn-touch px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-400 to-amber-300 text-midnight shadow-gold-glass"
                : "text-slate-soft hover:text-pearl bg-deepspace/70 border border-amber-400/20 hover:border-amber-400/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
              <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Total Courses</span>
              <div className="font-heading font-extrabold text-3xl text-pearl mt-2">36</div>
              <span className="text-xs text-cyan font-mono mt-1.5 block font-bold">3 Pathways Published</span>
            </div>
            <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
              <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Indexed Modules</span>
              <div className="font-heading font-extrabold text-3xl text-pearl mt-2">108</div>
              <span className="text-xs text-amber-400 font-mono mt-1.5 block font-bold">216 Lab Lessons</span>
            </div>
            <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
              <span className="text-xs font-mono text-slate-soft uppercase font-semibold">Pending Reviews</span>
              <div className="font-heading font-extrabold text-3xl text-pearl mt-2">
                {submissions.filter((s) => s.status === "pending_review").length}
              </div>
              <span className="text-xs text-status-warning font-mono mt-1.5 block font-bold">Submissions Queue</span>
            </div>
            <div className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/30 shadow-sm">
              <span className="text-xs font-mono text-slate-soft uppercase font-semibold">AI Inference Cost</span>
              <div className="font-heading font-extrabold text-3xl text-pearl mt-2">$0.04</div>
              <span className="text-xs text-status-success font-mono mt-1.5 block font-bold">Optimal Flash Budget</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-7 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 shadow-gold-glass space-y-4">
              <h3 className="font-heading font-bold text-lg text-pearl">System Topography & Health</h3>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between p-3 rounded-xl bg-midnight/80 border border-slate-dim/20">
                  <span className="text-slate-soft">AI Gateway (Python FastAPI)</span>
                  <span className="text-status-success font-bold">CONNECTED (:8000)</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-midnight/80 border border-slate-dim/20">
                  <span className="text-slate-soft">Vector Search Index (BM25 + Dense)</span>
                  <span className="text-status-success font-bold">144 CHUNKS LOADED</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-midnight/80 border border-slate-dim/20">
                  <span className="text-slate-soft">Prompt Injection Guardrail V2</span>
                  <span className="text-cyan font-bold">ACTIVE & ENFORCED</span>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-deepspace/80 border-2 border-amber-400/35 shadow-gold-glass space-y-4">
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
        <div className="rounded-3xl border-2 border-amber-400/35 bg-deepspace/80 overflow-hidden shadow-gold-glass">
          <table className="w-full text-left text-xs">
            <thead className="bg-midnight/90 border-b border-amber-400/20 font-mono text-amber-400 uppercase font-bold">
              <tr>
                <th className="p-4 sm:p-5">Course Title</th>
                <th className="p-4 sm:p-5">Level</th>
                <th className="p-4 sm:p-5">Hours</th>
                <th className="p-4 sm:p-5">Modules</th>
                <th className="p-4 sm:p-5">Status</th>
                <th className="p-4 sm:p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-400/10 text-slate-soft">
              {coursesList.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-pearl">{c.title}</td>
                  <td className="p-4 sm:p-5 font-mono uppercase text-cyan font-semibold">{c.level}</td>
                  <td className="p-4 sm:p-5 font-mono">{c.estimatedHours}h</td>
                  <td className="p-4 sm:p-5 font-mono">{c.modulesCount || 3}</td>
                  <td className="p-4 sm:p-5">
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold ${
                        c.published !== false
                          ? "bg-status-success/20 text-status-success border border-status-success/40"
                          : "bg-status-error/20 text-status-error border border-status-error/40"
                      }`}
                    >
                      {c.published !== false ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <button
                      onClick={() => toggleCoursePublish(c.slug)}
                      className="btn-touch px-3.5 py-1.5 rounded-xl bg-midnight border border-amber-400/40 hover:border-amber-300 text-pearl text-xs font-mono font-bold shadow-sm"
                    >
                      {c.published !== false ? "Unpublish" : "Publish"}
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
              className="p-6 rounded-2xl bg-deepspace/80 border-2 border-amber-400/35 flex flex-col md:flex-row items-center justify-between gap-4 shadow-gold-glass"
            >
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{sub.id}</span>
                <h4 className="font-heading font-bold text-base text-pearl">{sub.assignmentTitle}</h4>
                <p className="text-xs text-slate-soft">Student: <span className="text-pearl font-medium">{sub.studentName}</span> | Course: {sub.courseTitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {sub.status === "reviewed" ? (
                  <span className="px-3 py-1 rounded-full bg-status-success/20 text-status-success font-mono text-xs font-bold border border-status-success/40">
                    Reviewed ({sub.score}/100)
                  </span>
                ) : (
                  <button
                    onClick={() => handleGrade(sub.id, 92)}
                    className="btn-touch px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-cyan text-midnight text-xs font-bold shadow-gold-glass"
                  >
                    Grade & Verify
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Logs */}
      {activeTab === "logs" && (
        <div className="p-6 rounded-3xl bg-midnight/90 border-2 border-amber-400/35 font-mono text-xs space-y-2 shadow-gold-glass">
          <div className="text-amber-400 font-bold mb-3">[SECURITY & AUDIT STREAM]</div>
          <div className="text-slate-soft"><span className="text-cyan">[2026-11-04 18:23:12]</span> AUTH_SUCCESS: user &quot;usr-student-001&quot; authenticated via session token.</div>
          <div className="text-slate-soft"><span className="text-cyan">[2026-11-04 18:24:05]</span> RAG_QUERY: course=&quot;transformers-and-llm-architecture&quot; top_k=3 latency=14.2ms.</div>
          <div className="text-slate-soft"><span className="text-cyan">[2026-11-04 18:28:44]</span> SAFETY_CHECK: prompt injection score=0.02 (CLEAR).</div>
        </div>
      )}
    </div>
  );
}
