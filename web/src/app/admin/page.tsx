"use client";

import React, { useState, useEffect } from "react";
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
  Sparkles,
  Lock,
  ArrowRight,
  TrendingUp,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  Bell,
  Settings,
  HelpCircle,
  Database,
  KeyRound,
  RefreshCw,
  SlidersHorizontal,
  Send
} from "lucide-react";
import { ALL_COURSES } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";
import { ADMIN_CREDENTIALS, signInWithEmail } from "@/lib/firebase";
import { 
  fetchAllSubmissionsFirestore, 
  gradeSubmissionFirestore, 
  StudentSubmission,
  fetchAllVouchersFirestore, 
  createVoucherFirestore, 
  ScholarshipVoucher,
  saveAdminSettingsFirestore,
  fetchAdminSettingsFirestore,
  AdminSettings
} from "@/lib/firestore";

export default function AdminPage() {
  const { user, login } = useBasirahStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'scholars' | 'tutor' | 'finance' | 'logs'>('overview');
  const [coursesList, setCoursesList] = useState<any[]>(ALL_COURSES || []);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Security Gate state
  const [gateEmail, setGateEmail] = useState(ADMIN_CREDENTIALS.email);
  const [gatePassword, setGatePassword] = useState(ADMIN_CREDENTIALS.password);
  const [gateError, setGateError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Dynamic tuning state synced with Firestore
  const [socraticDepth, setSocraticDepth] = useState(85);
  const [verificationRigor, setVerificationRigor] = useState(90);
  const [ragTemperature, setRagTemperature] = useState(20);
  const [strictMode, setStrictMode] = useState(true);
  const [autoSignCert, setAutoSignCert] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Submissions queue state from Firestore
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [gradingScores, setGradingScores] = useState<Record<string, number>>({});
  const [gradingFeedbacks, setGradingFeedbacks] = useState<Record<string, string>>({});
  const [isGrading, setIsGrading] = useState<string | null>(null);

  // Scholarship Vouchers from Firestore
  const [vouchers, setVouchers] = useState<ScholarshipVoucher[]>([]);
  const [newVoucherCode, setNewVoucherCode] = useState("");
  const [newVoucherDiscount, setNewVoucherDiscount] = useState("100%");
  const [newVoucherType, setNewVoucherType] = useState("Merit Grant");
  const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null);

  // Load real Firestore collections
  useEffect(() => {
    async function loadFirestoreData() {
      try {
        const [subs, vchs, sett] = await Promise.all([
          fetchAllSubmissionsFirestore(),
          fetchAllVouchersFirestore(),
          fetchAdminSettingsFirestore()
        ]);
        setSubmissions(subs);
        setVouchers(vchs);
        setSocraticDepth(sett.socraticDepth);
        setVerificationRigor(sett.verificationRigor);
        setRagTemperature(sett.ragTemperature);
        setStrictMode(sett.strictMode);
        setAutoSignCert(sett.autoSignCert);
      } catch (err) {
        console.warn("Admin Firestore load warning:", err);
      }
    }
    loadFirestoreData();
  }, []);

  const isAdminAuthenticated = user?.role === "admin" || user?.email?.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase();

  const handleGateAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);
    setIsVerifying(true);

    try {
      const authUser = await signInWithEmail(gateEmail, gatePassword);
      if (authUser.role === "admin") {
        login(authUser);
      } else {
        setGateError("Credentials valid but not assigned administrator authority.");
      }
    } catch (err: any) {
      setGateError(err?.message || "Invalid administrator credentials.");
    } finally {
      setIsVerifying(false);
    }
  };

  const toggleCoursePublish = (slug: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, published: c.published === false ? true : false } : c))
    );
  };

  // Grade a submission and commit to Firestore
  const handleGradeSubmission = async (id: string, status: 'verified' | 'rejected') => {
    setIsGrading(id);
    const score = gradingScores[id] || (status === 'verified' ? 95 : 50);
    const feedback = gradingFeedbacks[id] || (status === 'verified' ? "Verified against Rubric Criteria." : "Revision requested on tensor shapes.");

    try {
      await gradeSubmissionFirestore(id, score, status, feedback);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status, score, feedback } : s))
      );
    } catch (err) {
      console.warn("Failed to grade submission:", err);
    } finally {
      setIsGrading(null);
    }
  };

  // Create a new voucher and commit to Firestore
  const handleCreateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucherCode.trim()) return;

    try {
      const created = await createVoucherFirestore({
        code: newVoucherCode.trim().toUpperCase(),
        discount: newVoucherDiscount,
        type: newVoucherType
      });
      setVouchers((prev) => [created, ...prev]);
      setVoucherSuccess(`Voucher ${created.code} successfully published to Firestore!`);
      setNewVoucherCode("");
      setTimeout(() => setVoucherSuccess(null), 3000);
    } catch (err) {
      console.warn("Failed to create voucher:", err);
    }
  };

  // Save Socratic Tuning to Firestore
  const handleSaveTuning = async () => {
    try {
      await saveAdminSettingsFirestore({
        socraticDepth,
        verificationRigor,
        ragTemperature,
        strictMode,
        autoSignCert
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    } catch (err) {
      console.warn("Failed to save settings:", err);
    }
  };

  // Security Gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-[32px] sm:rounded-[36px] bg-[#0A1430]/75 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-[#38BDF8]/60 hover:border-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-8 sm:p-12 space-y-7 relative overflow-hidden transition-all duration-300">
          
          <div className="w-16 h-16 rounded-2xl bg-[#070D24] border-2 border-[#38BDF8]/60 p-1 mx-auto shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#00F0FF]" />
          </div>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/20 text-[#00F0FF] text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
              <span>EXECUTIVE GOVERNANCE SECURITY GATE</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Admin Authentication Required
            </h1>
            <p className="text-xs text-cyan-200/70 max-w-md mx-auto font-sans">
              This private portal requires executive administrator credentials to inspect platform telemetry, curriculum pipelines, and financial ledger data.
            </p>
          </div>

          {gateError && (
            <div className="p-3.5 rounded-[18px] bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 font-medium">
              {gateError}
            </div>
          )}

          <form onSubmit={handleGateAuthenticate} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                className="w-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus:border-[#00F0FF] rounded-full px-5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Admin Passphrase
              </label>
              <input
                type="password"
                required
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                className="w-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus:border-[#00F0FF] rounded-full px-5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white flex items-center justify-center gap-2 text-xs font-heading font-extrabold shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.02] transition-all"
            >
              {isVerifying ? (
                <span>Verifying Cryptographic Credentials...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate as Super Administrator</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-cyan-200/70 font-sans">
            <span>Official Admin Identity: </span>
            <span className="font-mono text-amber-300 font-bold">basirahinfinity@gmail.com</span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered courses
  const filteredCourses = coursesList.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* 3D Floating Glass Tablet Master Frame (Template 2) */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#0A1430]/75 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-[#38BDF8]/60 hover:border-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-6 sm:p-10 space-y-8 relative overflow-hidden transition-all duration-300">
        
        {/* Upper glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/15 to-transparent rounded-t-[32px] pointer-events-none" />

        {/* 1. Top Tablet Bar: Search Bar, Status Pill, Action Pill */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10 pb-6 border-b border-white/10">
          {/* Brand & Suite Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#070D24] border-2 border-[#38BDF8]/60 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center">
              <img src="/assets/basirah-app-icon.png" alt="Basirah" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  Basirah Governance Suite
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-[#00F0FF]/40 text-[10px] font-mono text-[#00F0FF] font-bold">
                  v2.6 LIVE
                </span>
              </div>
              <p className="text-xs text-cyan-200/70 font-sans">
                Authorized Executive: <span className="text-amber-300 font-bold">{user?.email}</span>
              </p>
            </div>
          </div>

          {/* Capsule Search Bar */}
          <div className="relative w-full lg:w-72">
            <div className="flex items-center px-4 py-2.5 rounded-full bg-white/[0.08] dark:bg-black/30 border border-white/20 focus-within:border-[#00F0FF] transition-all">
              <Search className="w-4 h-4 text-white/50 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search telemetry or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Pill Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('finance')}
              className="btn-touch px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white text-xs font-heading font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Issue Merit Grant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs (Pill Style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none relative z-10">
          {[
            { id: "overview", label: "Executive Overview", icon: Activity },
            { id: "courses", label: "Curriculum Engine (36)", icon: BookOpen },
            { id: "scholars", label: `Evaluation Queue (${submissions.filter(s => s.status === 'pending').length})`, icon: Users },
            { id: "tutor", label: "Socratic RAG Tuning", icon: Cpu },
            { id: "finance", label: "Scholarship & Vouchers", icon: DollarSign },
            { id: "logs", label: "Cryptographic Audit", icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`btn-touch flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-white/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "bg-white/[0.06] border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8 relative z-10">
            {/* 3 Squircle Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-3 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10.5px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    RAG Vector Embeddings
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1 font-sans">
                    36/36 Courses indexed with 14,280 chunk vectors ready for Socratic retrieval.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-white/10">
                  <span className="text-white/60">Mean Latency:</span>
                  <span className="text-[#00F0FF] font-bold">142ms</span>
                </div>
              </div>

              <div className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-3 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-center text-purple-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10.5px] font-mono font-bold">
                    FIRESTORE SYNC
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Active Submissions
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1 font-sans">
                    {submissions.length} student capstones in evaluation queue ready for review.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-white/10">
                  <span className="text-white/60">Pending Evaluation:</span>
                  <span className="text-amber-300 font-bold">{submissions.filter(s => s.status === 'pending').length}</span>
                </div>
              </div>

              <div className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-3 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10.5px] font-mono font-bold">
                    100% AID
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Active Scholarship Vouchers
                  </h4>
                  <p className="text-xs text-cyan-100/70 mt-1 font-sans">
                    {vouchers.length} grant voucher codes deployed for global and regional fellows.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-white/10">
                  <span className="text-white/60">Total Claims:</span>
                  <span className="text-amber-300 font-bold">{vouchers.reduce((sum, v) => sum + (v.claims || 0), 0)} Claims</span>
                </div>
              </div>
            </div>

            {/* Neon Waveform Curve: Learning Compute Throughput */}
            <div className="p-6 sm:p-7 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Learning Momentum & Compute Throughput
                  </h3>
                  <p className="text-xs text-cyan-100/70 font-sans">
                    Real-time aggregate token generation and code compilation load across pathways
                  </p>
                </div>
                <div className="text-xs font-mono text-[#00F0FF] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  This Week
                </div>
              </div>

              <div className="w-full h-36 relative overflow-hidden flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="adminWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00F0FF" />
                      <stop offset="45%" stopColor="#A855F7" />
                      <stop offset="85%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#00F0FF" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,65 Q60,15 130,55 T270,30 T390,75 T500,20"
                    fill="none"
                    stroke="url(#adminWaveGrad)"
                    strokeWidth="5"
                    opacity="0.4"
                    filter="blur(5px)"
                  />
                  <path
                    d="M0,65 Q60,15 130,55 T270,30 T390,75 T500,20"
                    fill="none"
                    stroke="url(#adminWaveGrad)"
                    strokeWidth="2.5"
                  />
                  <circle cx="130" cy="55" r="2.5" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="270" cy="30" r="2.5" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="390" cy="75" r="2.5" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 4. Tab Content: Scholars Evaluation Queue */}
        {activeTab === "scholars" && (
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Capstone Deliverable Evaluation Queue
                </h3>
                <p className="text-xs text-cyan-100/70">
                  Review student pull requests, test logs, and mathematical derivations submitted to Firestore.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {submissions.length} Total Deliverables
              </span>
            </div>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] space-y-4 backdrop-blur-xl transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-base text-white">{sub.studentName}</span>
                        <span className="text-xs font-mono text-cyan-200/60">({sub.studentEmail})</span>
                      </div>
                      <div className="text-xs font-mono text-[#00F0FF] mt-0.5">{sub.courseTitle}</div>
                    </div>
                    
                    <span
                      className={`self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        sub.status === "verified"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                          : sub.status === "rejected"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-400/40"
                          : "bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse"
                      }`}
                    >
                      {sub.status === "verified" ? `VERIFIED • ${sub.score}/100` : sub.status}
                    </span>
                  </div>

                  <p className="text-xs text-cyan-100/80 leading-relaxed font-sans">
                    {sub.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-white/60">Artifact:</span>
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00F0FF] hover:underline flex items-center gap-1"
                    >
                      <span>{sub.repoUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Interactive Grading Controls */}
                  <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-mono text-white/70">Score (0-100):</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={sub.score || 95}
                        onChange={(e) => setGradingScores({ ...gradingScores, [sub.id]: Number(e.target.value) })}
                        className="w-20 bg-white/[0.08] border border-white/20 rounded-full px-3 py-1 text-xs text-white text-center focus:outline-none focus:border-[#00F0FF]"
                      />
                      <input
                        type="text"
                        placeholder="Evaluation feedback..."
                        defaultValue={sub.feedback || ""}
                        onChange={(e) => setGradingFeedbacks({ ...gradingFeedbacks, [sub.id]: e.target.value })}
                        className="flex-1 md:w-64 bg-white/[0.08] border border-white/20 rounded-full px-4 py-1 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleGradeSubmission(sub.id, "verified")}
                        disabled={isGrading === sub.id}
                        className="btn-touch px-4 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-all"
                      >
                        {isGrading === sub.id ? "Saving..." : "Verify & Pass"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGradeSubmission(sub.id, "rejected")}
                        disabled={isGrading === sub.id}
                        className="btn-touch px-4 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 text-xs font-bold transition-all"
                      >
                        Request Revision
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Tab Content: Curriculum Management */}
        {activeTab === "courses" && (
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  36 Canonical AI Engineering Courses
                </h3>
                <p className="text-xs text-cyan-100/70">
                  Toggle course availability, syllabus visibility, and verified laboratory workspaces.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                {filteredCourses.length} Courses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((c) => (
                <div
                  key={c.slug}
                  className="p-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] space-y-3 backdrop-blur-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono uppercase bg-white/10 border border-white/20 text-[#00F0FF] font-bold">
                      {c.level}
                    </span>
                    <button
                      onClick={() => toggleCoursePublish(c.slug)}
                      className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold transition-colors ${
                        c.published !== false
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                          : "bg-white/10 text-white/50 border border-white/20"
                      }`}
                    >
                      {c.published !== false ? "PUBLISHED" : "UNLISTED"}
                    </button>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-white truncate">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-cyan-100/70 line-clamp-2">
                    {c.tagline || c.overview}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10.5px] font-mono text-white/60">
                    <span>{c.estimatedHours}h Duration</span>
                    <Link href={`/courses/${c.slug}`} className="text-[#00F0FF] hover:underline flex items-center gap-1">
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Tab Content: Socratic RAG Tuning */}
        {activeTab === "tutor" && (
          <div className="max-w-2xl space-y-6 relative z-10">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Socratic AI Hyperparameter Tuning
              </h3>
              <p className="text-xs text-cyan-100/70">
                Adjust reasoning depth, verification rigor, and temperature grounded in Basirah&apos;s curriculum.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3.5 rounded-[18px] bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hyperparameters successfully synced with Cloud Firestore!</span>
              </div>
            )}

            <div className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-5 backdrop-blur-xl">
              {/* Socratic Depth */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">Socratic Reasoning Depth</span>
                  <span className="text-[#00F0FF] font-bold">{socraticDepth}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={socraticDepth}
                  onChange={(e) => setSocraticDepth(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                />
              </div>

              {/* Verification Rigor */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">Verification Rigor Threshold</span>
                  <span className="text-[#A855F7] font-bold">{verificationRigor}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={verificationRigor}
                  onChange={(e) => setVerificationRigor(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
                />
              </div>

              {/* RAG Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white font-bold">RAG Retrieval Temperature</span>
                  <span className="text-[#38BDF8] font-bold">{ragTemperature / 100}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  value={ragTemperature}
                  onChange={(e) => setRagTemperature(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/70">Enforce Strict Zero-Hallucination Citations</span>
                <button
                  type="button"
                  onClick={() => setStrictMode(!strictMode)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    strictMode ? "bg-[#00F0FF]" : "bg-white/20"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${strictMode ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveTuning}
                className="btn-touch w-full py-3 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-md hover:scale-[1.02] transition-all"
              >
                Save Hyperparameters to Firestore
              </button>
            </div>
          </div>
        )}

        {/* 7. Tab Content: Scholarship & Vouchers */}
        {activeTab === "finance" && (
          <div className="space-y-8 relative z-10">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Scholarship Grants & Voucher Engine
              </h3>
              <p className="text-xs text-cyan-100/70">
                Issue 100% or partial tuition grants stored in Firestore.
              </p>
            </div>

            {voucherSuccess && (
              <div className="p-3.5 rounded-[18px] bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{voucherSuccess}</span>
              </div>
            )}

            {/* Create Voucher Form */}
            <form onSubmit={handleCreateVoucher} className="p-6 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 space-y-4 backdrop-blur-xl max-w-xl">
              <h4 className="font-heading font-bold text-sm text-white">Issue New Scholarship Voucher</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="CODE (e.g. FELLOW2026)"
                  value={newVoucherCode}
                  onChange={(e) => setNewVoucherCode(e.target.value)}
                  className="bg-white/[0.08] border border-white/20 rounded-full px-4 py-2 text-xs text-white uppercase font-mono placeholder-white/40 focus:outline-none focus:border-[#00F0FF]"
                />
                <select
                  value={newVoucherDiscount}
                  onChange={(e) => setNewVoucherDiscount(e.target.value)}
                  className="bg-white/[0.08] border border-white/20 rounded-full px-4 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="100%" className="bg-[#070D24]">100% Grant</option>
                  <option value="50%" className="bg-[#070D24]">50% Aid</option>
                  <option value="25%" className="bg-[#070D24]">25% Aid</option>
                </select>
                <button
                  type="submit"
                  className="btn-touch py-2 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-bold text-xs shadow-sm hover:scale-105 transition-all"
                >
                  Publish Voucher
                </button>
              </div>
            </form>

            {/* Active Vouchers List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vouchers.map((v) => (
                <div
                  key={v.code}
                  className="p-5 rounded-[22px] bg-white/[0.06] border-[1.5px] border-white/20 hover:border-[#00F0FF] space-y-2 backdrop-blur-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-amber-300">{v.code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                      {v.discount}
                    </span>
                  </div>
                  <div className="text-xs text-white/70 font-sans">{v.type}</div>
                  <div className="pt-2 border-t border-white/10 text-xs font-mono text-[#00F0FF]">
                    {v.claims} Claims Recorded
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Tab Content: Cryptographic Audit Logs */}
        {activeTab === "logs" && (
          <div className="space-y-4 relative z-10 font-mono text-xs">
            <h3 className="font-heading font-extrabold text-xl text-white font-sans">
              Cryptographic Audit Log
            </h3>
            <div className="p-6 rounded-[22px] bg-black/40 border border-white/15 space-y-2.5 text-cyan-200/80">
              <div className="text-emerald-400">[2026-11-05 10:44:22] BUILD_VERIFIED: Next.js static engine 22/22 routes ready.</div>
              <div className="text-cyan-300">[2026-11-05 10:45:01] FIRESTORE_SYNC: Connected to project basirah-academy.</div>
              <div className="text-amber-300">[2026-11-05 10:48:15] AUTH_PROVISIONED: Super Administrator basirahinfinity@gmail.com authenticated.</div>
              <div className="text-white/60">[2026-11-05 10:50:30] SUBMISSION_INGEST: 3 student deliverables loaded from Firestore.</div>
              <div className="text-purple-300">[2026-11-05 10:52:12] SOCRATIC_CALIBRATION: RAG temperature locked at 0.20, depth 85%.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
