"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ShieldCheck,
  LogOut,
  Upload,
  ExternalLink,
  Send,
  AlertCircle,
  Bookmark,
  User,
  Settings
} from "lucide-react";
import { useBasirahStore } from "@/lib/store";
import { IntelligentProgressRing } from "@/components/visual/IntelligentProgressRing";
import { ALL_COURSES } from "@/lib/courses";
import { signOutFirebase } from "@/lib/firebase";
import { 
  submitCapstoneFirestore, 
  fetchAllSubmissionsFirestore, 
  StudentSubmission,
  syncUserProfileFirestore 
} from "@/lib/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, enrollments, bookmarks, logout, login } = useBasirahStore();
  
  // Real Submissions State synced with Firestore
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(enrollments[0]?.slug || "deep-learning-fundamentals");
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [deliverableNotes, setDeliverableNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.displayName || "");
  const [editBio, setEditBio] = useState(user?.bio || "");

  // Load real submissions from Firestore - ONLY current user's submissions
  useEffect(() => {
    async function loadData() {
      try {
        const allSubs = await fetchAllSubmissionsFirestore();
        if (user) {
          const userSubs = allSubs.filter((s) => s.studentEmail === user.email || s.studentId === user.id);
          setSubmissions(userSubs);
        } else {
          setSubmissions([]);
        }
      } catch (err) {
        console.warn("Could not load submissions:", err);
      }
    }
    loadData();
  }, [user]);

  const totalEnrolled = enrollments.length;
  const avgProgress = totalEnrolled > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progressPercent, 0) / totalEnrolled)
    : 0;

  const totalCompletedLessons = enrollments.reduce((sum, e) => sum + e.completedLessons.length, 0);

  // Handle Real Capstone Submission to Firestore
  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!deliverableUrl.trim()) {
      setSubmitError("Please provide a valid GitHub repository or architecture document link.");
      return;
    }

    setIsSubmitting(true);
    const targetCourse = ALL_COURSES.find((c) => c.slug === selectedCourseSlug) || {
      slug: selectedCourseSlug,
      title: "AI Engineering Capstone"
    };

    try {
      const newSub = await submitCapstoneFirestore({
        studentId: user?.id || "usr-student-001",
        studentName: user?.displayName || "Basirah Scholar",
        studentEmail: user?.email || "scholar@basirah.academy",
        courseSlug: targetCourse.slug,
        courseTitle: targetCourse.title,
        repoUrl: deliverableUrl.trim(),
        description: deliverableNotes.trim() || "Complete capstone implementation with reproducible tests."
      });

      setSubmissions((prev) => [newSub, ...prev]);
      setSubmitSuccess("Capstone deliverable successfully submitted to the Socratic Review Board!");
      setDeliverableUrl("");
      setDeliverableNotes("");
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to submit deliverable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Profile Update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated = {
      ...user,
      displayName: editName.trim() || user.displayName,
      bio: editBio.trim() || user.bio
    };
    login(updated);
    await syncUserProfileFirestore(updated);
    setIsEditingProfile(false);
  };

  // Handle Real Sign Out
  const handleSignOut = async () => {
    await signOutFirebase();
    logout();
    router.push("/auth/signin");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. Master Header: 3D Holographic Glass Tablet Frame */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-white/95 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-slate-300 dark:border-[#38BDF8]/60 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-8 sm:p-10 transition-all duration-300">
        
        {/* Upper glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/20 to-transparent rounded-t-[32px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 text-[#0096C7] dark:text-[#00F0FF] text-xs font-mono font-bold shadow-sm">
                SCHOLAR TIER: {(user?.level || "BEGINNER").toUpperCase()}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
                FIREBASE VERIFIED SESSION
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.displayName || "Basirah Scholar"}.
            </h1>
            
            <p className="text-slate-600 dark:text-cyan-100/70 text-sm sm:text-base max-w-xl leading-relaxed font-sans">
              &ldquo;Your next idea could become your next invention.&rdquo; All tracks start from zero with pure conceptual clarity and verified code laboratories.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="btn-touch px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-xs font-heading font-bold flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? "Close Profile" : "Edit Profile"}</span>
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="btn-touch px-4 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-heading font-bold flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Circular Progress Ring */}
          <div className="flex-shrink-0 p-5 rounded-[24px] bg-slate-50 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 shadow-md">
            <IntelligentProgressRing progress={avgProgress} label="Track Mastery" size={135} />
          </div>
        </div>

        {/* Profile Edit Drawer */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 space-y-4 max-w-xl animate-in fade-in duration-200">
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm">Update Scholar Moniker</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
                className="flex-1 bg-slate-50 dark:bg-white/[0.08] border border-slate-300 dark:border-white/20 rounded-full px-4 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-white/40 focus:outline-none focus:border-[#0096C7] dark:focus:border-[#00F0FF]"
              />
              <button
                type="submit"
                className="btn-touch px-5 py-2 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-bold text-xs shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Metrics Row with 22px Squircle Glass Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-[22px] bg-white/90 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] transition-all shadow-md space-y-1">
          <span className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70 uppercase font-semibold">Enrolled Courses</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">{totalEnrolled}</div>
          <span className="text-[10.5px] text-[#0096C7] dark:text-[#00F0FF] font-mono font-bold block pt-1">Active Specializations</span>
        </div>
        <div className="p-5 sm:p-6 rounded-[22px] bg-white/90 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] transition-all shadow-md space-y-1">
          <span className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70 uppercase font-semibold">Completed Lessons</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">{totalCompletedLessons}</div>
          <span className="text-[10.5px] text-amber-600 dark:text-amber-300 font-mono font-bold block pt-1">Verified Labs</span>
        </div>
        <div className="p-5 sm:p-6 rounded-[22px] bg-white/90 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] transition-all shadow-md space-y-1">
          <span className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70 uppercase font-semibold">Saved Bookmarks</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">{bookmarks.length}</div>
          <span className="text-[10.5px] text-purple-600 dark:text-purple-300 font-mono font-bold block pt-1">Curated Queue</span>
        </div>
        <div className="p-5 sm:p-6 rounded-[22px] bg-white/90 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] transition-all shadow-md space-y-1">
          <span className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70 uppercase font-semibold">Capstone Submissions</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">{submissions.length}</div>
          <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block pt-1">In Evaluation / Verified</span>
        </div>
      </div>

      {/* 3. Continue Learning: Real Enrolled Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-500 dark:text-amber-300" />
            <span>Continue Learning</span>
          </h2>
          <Link href="/courses" className="btn-touch text-xs font-mono text-[#0096C7] dark:text-[#00F0FF] hover:underline font-bold">
            Explore All 36 Courses →
          </Link>
        </div>

        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {enrollments.map((course, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[22px] bg-white/90 dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.1] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] shadow-md transition-all duration-300 space-y-4 backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[#0096C7] dark:text-[#00F0FF] font-bold">
                    {course.level}
                  </span>
                  <span className="font-mono text-xs text-slate-600 dark:text-white/60">
                    {course.completedLessons.length} Labs Finished
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white truncate">
                  {course.title}
                </h3>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-white/60">Mastery Progress</span>
                    <span className="text-amber-600 dark:text-amber-300 font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] h-full transition-all duration-500 shadow-sm"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/learn/${course.slug}/${course.completedLessons[0] || 'conceptual-underpinnings'}`}
                    className="btn-touch inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white text-xs font-heading font-extrabold shadow-sm hover:scale-105 transition-all"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-touch text-xs text-slate-600 dark:text-cyan-200/70 hover:text-slate-950 dark:hover:text-white font-medium"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fresh Zero State for new users */
          <div className="p-8 sm:p-12 rounded-[24px] bg-white/90 dark:bg-white/[0.05] border-[1.5px] border-slate-300 dark:border-white/15 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-[#0096C7] dark:border-[#00F0FF] flex items-center justify-center mx-auto text-[#0096C7] dark:text-[#00F0FF]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Fresh Scholar Track • Initialized from 0%
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-cyan-100/70 max-w-md mx-auto">
                Every engineer began at zero. Your workspace is configured with clean progression tracking. Select your first course to begin.
              </p>
            </div>
            <Link
              href="/courses"
              className="btn-touch inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-bold text-xs shadow-md"
            >
              <span>Explore All 36 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* 4. Real Capstone Submission Engine & Submissions Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Deliverable Submission Form */}
        <div className="lg:col-span-6 rounded-[28px] bg-white/95 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 p-6 sm:p-8 space-y-5 backdrop-blur-2xl shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            <span>SUBMIT CAPSTONE DELIVERABLE</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
            Demonstrate Verified Engineering
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-cyan-100/70 leading-relaxed font-sans">
            Submit your GitHub repository, deployed API endpoint, or architectural writeup. Deliverables are reviewed against reproducible evaluation rubrics.
          </p>

          {submitSuccess && (
            <div className="p-3.5 rounded-[18px] bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{submitSuccess}</span>
            </div>
          )}

          {submitError && (
            <div className="p-3.5 rounded-[18px] bg-rose-500/15 border border-rose-500/40 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitDeliverable} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-700 dark:text-cyan-300 mb-1.5 uppercase font-bold">
                Target Specialization
              </label>
              <select
                value={selectedCourseSlug}
                onChange={(e) => setSelectedCourseSlug(e.target.value)}
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-full px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0096C7] dark:focus:border-[#00F0FF]"
              >
                {ALL_COURSES.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-white dark:bg-[#070D24] text-slate-900 dark:text-white">
                    {c.title} ({c.level})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-700 dark:text-cyan-300 mb-1.5 uppercase font-bold">
                Deliverable URL (GitHub / Architecture)
              </label>
              <input
                type="url"
                required
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
                placeholder="https://github.com/your-username/project-repo"
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-full px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/35 focus:outline-none focus:border-[#0096C7] dark:focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-700 dark:text-cyan-300 mb-1.5 uppercase font-bold">
                Implementation Notes & Architecture Details
              </label>
              <textarea
                rows={3}
                value={deliverableNotes}
                onChange={(e) => setDeliverableNotes(e.target.value)}
                placeholder="Explain tensor dimensions, loss curves, tool-routing DAG, or test coverage..."
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/20 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/35 focus:outline-none focus:border-[#0096C7] dark:focus:border-[#00F0FF]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing to Review Board...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Deliverable for Review</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Real Submissions Queue & Verified Credential Status */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0096C7] dark:text-[#00F0FF]" />
              <span>Evaluation Queue ({submissions.length})</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-600 dark:text-cyan-200/70">Socratic Board</span>
          </div>

          <div className="space-y-3.5">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-[22px] bg-white/90 dark:bg-white/[0.06] border-[1.5px] border-slate-300 dark:border-white/20 hover:border-[#0096C7] dark:hover:border-[#00F0FF] space-y-2.5 backdrop-blur-xl transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate max-w-[220px]">
                    {sub.courseTitle}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      sub.status === "verified"
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-400/40"
                        : sub.status === "rejected"
                        ? "bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-400/40"
                        : "bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40"
                    }`}
                  >
                    {sub.status === "verified" ? `VERIFIED • ${sub.score || 95}/100` : sub.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-cyan-100/70 font-sans line-clamp-2">
                  {sub.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10 text-[10.5px] font-mono">
                  <a
                    href={sub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0096C7] dark:text-[#00F0FF] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-500 dark:text-white/50">{sub.submittedAt}</span>
                </div>

                {sub.feedback && (
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[10.5px] text-emerald-800 dark:text-emerald-300/90 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white block">Evaluator Feedback:</span>
                    {sub.feedback}
                  </div>
                )}
              </div>
            ))}

            {submissions.length === 0 && (
              <div className="p-6 rounded-[22px] bg-white/90 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-center space-y-2">
                <p className="text-xs text-slate-600 dark:text-white/60">No capstone deliverables submitted yet.</p>
                <span className="text-[10.5px] font-mono text-slate-500 dark:text-white/40 block">
                  Submit your first project deliverable on the left to queue for evaluation.
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
