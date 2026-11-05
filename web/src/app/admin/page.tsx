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
  RefreshCw
} from "lucide-react";
import { ALL_COURSES } from "@/lib/courses";
import { useBasirahStore } from "@/lib/store";
import { ADMIN_CREDENTIALS, signInWithEmail } from "@/lib/firebase";

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

  // Dynamic tuning state (Image 2 style)
  const [socraticDepth, setSocraticDepth] = useState(85);
  const [verificationRigor, setVerificationRigor] = useState(90);
  const [ragTemperature, setRagTemperature] = useState(20);
  const [strictMode, setStrictMode] = useState(true);
  const [autoSignCert, setAutoSignCert] = useState(true);

  // Submissions state
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-101",
      studentName: "Amina Al-Mansoor",
      courseTitle: "Deep Learning Fundamentals",
      deliverable: "Autograd Matrix Backprop Engine in Python",
      status: "verified",
      score: 98,
      timestamp: "10 mins ago"
    },
    {
      id: "sub-102",
      studentName: "Dawit Tesfaye",
      courseTitle: "Retrieval-Augmented Generation",
      deliverable: "Hybrid BM25 + Dense Vector Cross-Encoder Reranker",
      status: "pending",
      score: null,
      timestamp: "35 mins ago"
    },
    {
      id: "sub-103",
      studentName: "Fatima Zahra",
      courseTitle: "Multi-Agent Systems",
      deliverable: "LangGraph Consensus Network with Tool Handshake",
      status: "verified",
      score: 95,
      timestamp: "2 hours ago"
    }
  ]);

  // Scholarship Vouchers
  const [vouchers, setVouchers] = useState([
    { code: "BASIRAH2026", discount: "100%", type: "Merit Grant", claims: 412, active: true },
    { code: "ETHIO-AI-FELLOW", discount: "100%", type: "Regional Initiative", claims: 184, active: true },
    { code: "RESEARCH-GRANT-50", discount: "50%", type: "Academic Aid", claims: 96, active: true }
  ]);
  const [newVoucherCode, setNewVoucherCode] = useState("");

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
      prev.map((c) => (c.slug === slug ? { ...c, published: !c.published } : c))
    );
  };

  const handleApproveSubmission = (id: string, score: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "verified", score } : s))
    );
  };

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucherCode.trim()) return;
    setVouchers((prev) => [
      { code: newVoucherCode.trim().toUpperCase(), discount: "100%", type: "Merit Grant", claims: 0, active: true },
      ...prev
    ]);
    setNewVoucherCode("");
  };

  // If not authenticated as Admin, display the 3D Glass Tablet Security Gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-lg glass-tablet-frame p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-midnight border-2 border-amber-400 p-1 mx-auto shadow-gold-glow flex items-center justify-center">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>EXECUTIVE GOVERNANCE SECURITY GATE</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#07162F] dark:text-pearl">
              Admin Authentication Required
            </h1>
            <p className="text-xs text-[#334E68] dark:text-slate-soft max-w-md mx-auto">
              This private portal requires executive administrator credentials to inspect platform telemetry, curriculum pipelines, and financial ledger data.
            </p>
          </div>

          {gateError && (
            <div className="p-3.5 rounded-2xl bg-status-error/15 border-2 border-status-error/60 text-xs text-status-error font-medium">
              {gateError}
            </div>
          )}

          <form onSubmit={handleGateAuthenticate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-1.5 uppercase font-bold">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                className="w-full bg-white/90 dark:bg-midnight/90 border-2 border-slate-300 dark:border-amber-400/35 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-[#07162F] dark:text-pearl focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-1.5 uppercase font-bold">
                Admin Passphrase
              </label>
              <input
                type="password"
                required
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                className="w-full bg-white/90 dark:bg-midnight/90 border-2 border-slate-300 dark:border-amber-400/35 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-[#07162F] dark:text-pearl focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="btn-touch w-full py-4 rounded-full glass-pill-button flex items-center justify-center gap-2 text-sm font-heading font-bold shadow-lg"
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

          <div className="pt-2 text-center text-xs text-[#334E68] dark:text-slate-soft">
            <span>Official Admin Identity: </span>
            <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">basirahinfinity@gmail.com</span>
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
      <div className="glass-tablet-frame p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Subtle Ambient Refraction */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[radial-gradient(circle,rgba(0,240,255,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,transparent_70%)] pointer-events-none" />

        {/* 1. Top Tablet Bar: Search Bar, Status Pill, Action Pill */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10 pb-6 border-b-2 border-slate-200 dark:border-cyan-400/25">
          {/* Brand & Suite Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-midnight border-2 border-amber-400/60 p-0.5 shadow-gold-glow flex items-center justify-center">
              <img src="/assets/basirah-app-icon.png" alt="Basirah" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#07162F] dark:text-pearl">
                  Basirah Governance Suite
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan/20 border border-cyan-500 text-[10px] font-mono text-cyan-800 dark:text-cyan font-bold">
                  v2.6 LIVE
                </span>
              </div>
              <p className="text-xs text-[#334E68] dark:text-slate-soft">
                Authorized Executive: <span className="text-amber-700 dark:text-amber-400 font-bold">{user?.email}</span>
              </p>
            </div>
          </div>

          {/* Translucent Glass Pill Search Bar */}
          <div className="relative w-full lg:w-72">
            <div className="glass-search-bar flex items-center px-4 py-2.5">
              <Search className="w-4 h-4 text-cyan-600 dark:text-cyan mr-2.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search telemetry or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs text-[#07162F] dark:text-pearl placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Pill Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('finance')}
              className="btn-touch px-4 py-2.5 rounded-full glass-pill-button text-xs flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Issue Merit Grant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs (Dock Style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none relative z-10">
          {[
            { id: "overview", label: "Executive Overview", icon: Activity },
            { id: "courses", label: "Curriculum Engine (36)", icon: BookOpen },
            { id: "scholars", label: "Scholar Verifications", icon: Users },
            { id: "tutor", label: "Socratic RAG Tuning", icon: Cpu },
            { id: "finance", label: "Scholarship & Settlement", icon: DollarSign },
            { id: "logs", label: "Cryptographic Audit", icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`btn-touch flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-heading font-bold whitespace-nowrap transition-all border-2 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-cyan text-midnight border-amber-400 shadow-gold-glass"
                    : "bg-white/70 dark:bg-midnight/70 border-slate-200 dark:border-cyan-400/25 text-[#334E68] dark:text-slate-soft hover:border-cyan-400 hover:text-[#07162F] dark:hover:text-pearl"
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
            {/* 6 AI Services Style Box Cards (From Template 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Vector RAG Knowledge Index */}
              <div className="glass-service-box p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-800 dark:text-cyan">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-status-success/20 text-status-success text-[10.5px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#07162F] dark:text-pearl">
                    RAG Vector Embeddings
                  </h4>
                  <p className="text-xs text-[#334E68] dark:text-slate-soft mt-1">
                    36/36 Courses indexed with 14,280 chunk vectors ready for Socratic retrieval.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-slate-200 dark:border-cyan-400/20">
                  <span className="text-[#334E68] dark:text-slate-soft">Mean Latency:</span>
                  <span className="text-cyan-700 dark:text-cyan font-bold">142ms</span>
                </div>
              </div>

              {/* Card 2: Enrolled Scholars */}
              <div className="glass-service-box p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center text-purple-800 dark:text-purple-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10.5px] font-mono font-bold">
                    +18% THIS MO
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#07162F] dark:text-pearl">
                    Active Scholars
                  </h4>
                  <p className="text-xs text-[#334E68] dark:text-slate-soft mt-1">
                    2,450 verified students actively compiling Python & Dart laboratories.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-slate-200 dark:border-cyan-400/20">
                  <span className="text-[#334E68] dark:text-slate-soft">Avg Lab Score:</span>
                  <span className="text-purple-700 dark:text-purple-300 font-bold">92.4%</span>
                </div>
              </div>

              {/* Card 3: Merit Scholarships Awarded */}
              <div className="glass-service-box p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-400/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-800 dark:text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 text-[10.5px] font-mono font-bold">
                    100% AID
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#07162F] dark:text-pearl">
                    Academic Grants Issued
                  </h4>
                  <p className="text-xs text-[#334E68] dark:text-slate-soft mt-1">
                    $120,050 total tuition funded through the Basirah Open Access endowment.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-slate-200 dark:border-cyan-400/20">
                  <span className="text-[#334E68] dark:text-slate-soft">Code BASIRAH2026:</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">412 Claims</span>
                </div>
              </div>
            </div>

            {/* Glowing Waveform Chart & Mood Grid (Directly inspired by Image 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Learning Velocity Waveform Chart */}
              <div className="lg:col-span-8 glass-service-box p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#07162F] dark:text-pearl">
                      Learning Momentum & Compute Throughput
                    </h3>
                    <p className="text-xs text-[#334E68] dark:text-slate-soft">
                      Real-time aggregate token generation and code compilation load across pathways
                    </p>
                  </div>
                  <div className="text-xs font-mono text-cyan-700 dark:text-cyan bg-cyan-100 dark:bg-cyan/15 px-3 py-1 rounded-full border border-cyan-400/40">
                    This Week
                  </div>
                </div>

                {/* Neon Waveform SVG (Exact replica of Image 2 curve dynamics) */}
                <div className="w-full h-44 rounded-2xl bg-white/40 dark:bg-midnight/60 border border-slate-200 dark:border-cyan-400/20 p-4 relative overflow-hidden flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="neonWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                    {/* Shadow Ambient Line */}
                    <path
                      d="M0,80 Q70,20 150,70 T300,40 T420,90 T500,30"
                      fill="none"
                      stroke="url(#neonWaveGrad)"
                      strokeWidth="6"
                      opacity="0.3"
                      filter="blur(4px)"
                    />
                    {/* Sharp Foreground Neon Wave */}
                    <path
                      d="M0,80 Q70,20 150,70 T300,40 T420,90 T500,30"
                      fill="none"
                      stroke="url(#neonWaveGrad)"
                      strokeWidth="3.5"
                    />
                    {/* Second Harmonic Wave */}
                    <path
                      d="M0,100 Q80,60 160,95 T320,65 T440,80 T500,50"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 text-xs font-mono text-[#334E68] dark:text-slate-soft">
                  <div>
                    <span className="block font-bold text-[#07162F] dark:text-pearl text-sm">4.8M Tokens</span>
                    <span>Socratic Inferences</span>
                  </div>
                  <div>
                    <span className="block font-bold text-cyan-700 dark:text-cyan text-sm">99.98%</span>
                    <span>Sandbox Availability</span>
                  </div>
                  <div>
                    <span className="block font-bold text-amber-700 dark:text-amber-400 text-sm">0 Discards</span>
                    <span>Zero Hallucinations</span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Tuning Sliders & Toggles (From Image 2) */}
              <div className="lg:col-span-4 glass-service-box p-6 space-y-5">
                <h3 className="font-heading font-bold text-base text-[#07162F] dark:text-pearl flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan" />
                  <span>Socratic System Tuning</span>
                </h3>

                {/* Slider 1: Socratic Inquiry Depth */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#334E68] dark:text-slate-soft">Inquiry Depth:</span>
                    <span className="text-cyan-700 dark:text-cyan font-bold">{socraticDepth}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={socraticDepth}
                    onChange={(e) => setSocraticDepth(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                {/* Slider 2: Verification Rigor */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#334E68] dark:text-slate-soft">Rubric Strictness:</span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">{verificationRigor}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={verificationRigor}
                    onChange={(e) => setVerificationRigor(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-cyan-400/20 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#334E68] dark:text-slate-soft">Zero-Answer Mode:</span>
                    <button
                      type="button"
                      onClick={() => setStrictMode(!strictMode)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        strictMode ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${strictMode ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#334E68] dark:text-slate-soft">Auto-Sign Certificates:</span>
                    <button
                      type="button"
                      onClick={() => setAutoSignCert(!autoSignCert)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                        autoSignCert ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${autoSignCert ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Catalog Management Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-[#07162F] dark:text-pearl">
                  Curriculum Engine • 36 Courses
                </h3>
                <p className="text-xs text-[#334E68] dark:text-slate-soft">
                  Publish, archive, or inspect engineering courses across Beginner, Intermediate, and Advanced tiers.
                </p>
              </div>
              <span className="font-mono text-xs text-amber-700 dark:text-amber-400 font-bold bg-amber-400/15 px-3 py-1.5 rounded-full border border-amber-400/40">
                {coursesList.length} Courses Active
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 dark:border-cyan-400/30 bg-white/80 dark:bg-midnight/80">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 dark:bg-deepspace/80 border-b border-slate-200 dark:border-cyan-400/20 text-[#334E68] dark:text-slate-soft uppercase">
                  <tr>
                    <th className="p-4">Course Title & Slug</th>
                    <th className="p-4">Track Tier</th>
                    <th className="p-4">Hours</th>
                    <th className="p-4">Modules</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredCourses.slice(0, 12).map((course) => (
                    <tr key={course.slug} className="hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-colors">
                      <td className="p-4">
                        <span className="font-heading font-bold text-sm text-[#07162F] dark:text-pearl block">
                          {course.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{course.slug}</span>
                      </td>
                      <td className="p-4 uppercase font-bold text-cyan-700 dark:text-cyan">
                        {course.level}
                      </td>
                      <td className="p-4 text-[#07162F] dark:text-pearl font-bold">
                        {course.estimatedHours}h
                      </td>
                      <td className="p-4 text-[#07162F] dark:text-pearl font-bold">
                        {course.modules?.length || 3}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          course.published !== false
                            ? "bg-status-success/20 text-status-success"
                            : "bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        }`}>
                          {course.published !== false ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleCoursePublish(course.slug)}
                          className="btn-touch px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-400/50 text-amber-800 dark:text-amber-300 text-[11px] font-bold"
                        >
                          {course.published !== false ? "Archive" : "Publish"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Scholars & Submissions Review Tab */}
        {activeTab === "scholars" && (
          <div className="space-y-6 relative z-10">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#07162F] dark:text-pearl">
                Capstone Deliverables & Verification Queue
              </h3>
              <p className="text-xs text-[#334E68] dark:text-slate-soft">
                Inspect authentic student engineering code, test suites, and assign rubric scores.
              </p>
            </div>

            <div className="space-y-3.5">
              {submissions.map((sub) => (
                <div key={sub.id} className="glass-service-box p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-700 dark:text-amber-400 font-bold">{sub.studentName}</span>
                      <span className="text-xs text-slate-400">• {sub.timestamp}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-[#07162F] dark:text-pearl">
                      {sub.deliverable}
                    </h4>
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan block">
                      Course: {sub.courseTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {sub.status === "verified" ? (
                      <span className="px-3 py-1 rounded-full bg-status-success/20 text-status-success font-mono font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified (Score: {sub.score}%)
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApproveSubmission(sub.id, 96)}
                          className="btn-touch px-4 py-2 rounded-xl bg-status-success/20 border border-status-success text-status-success font-bold text-xs hover:bg-status-success/30"
                        >
                          Approve (96%)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApproveSubmission(sub.id, 100)}
                          className="btn-touch px-4 py-2 rounded-xl bg-amber-400 text-midnight font-bold text-xs hover:brightness-110"
                        >
                          Honors (100%)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial & Merit Grants Tab */}
        {activeTab === "finance" && (
          <div className="space-y-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-[#07162F] dark:text-pearl">
                  Tuition Settlement & Academic Merit Vouchers
                </h3>
                <p className="text-xs text-[#334E68] dark:text-slate-soft">
                  Issue 100% full merit grants to scholars, track Telebirr/CBE settlement and card receipts.
                </p>
              </div>

              {/* Create New Voucher Form */}
              <form onSubmit={handleCreateVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="NEW-VOUCHER-CODE"
                  value={newVoucherCode}
                  onChange={(e) => setNewVoucherCode(e.target.value)}
                  className="bg-white/90 dark:bg-midnight/90 border-2 border-slate-300 dark:border-amber-400/40 rounded-xl px-3 py-2 text-xs font-mono uppercase text-[#07162F] dark:text-pearl focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-touch px-4 py-2 rounded-xl bg-amber-400 text-midnight text-xs font-bold"
                >
                  Create Grant
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {vouchers.map((v) => (
                <div key={v.code} className="glass-service-box p-5 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-extrabold text-amber-700 dark:text-amber-400">{v.code}</span>
                    <span className="px-2 py-0.5 rounded-full bg-status-success/20 text-status-success font-bold">
                      {v.discount}
                    </span>
                  </div>
                  <span className="text-xs text-[#07162F] dark:text-pearl font-bold block">{v.type}</span>
                  <div className="text-[11px] font-mono text-[#334E68] dark:text-slate-soft pt-2 border-t border-slate-200 dark:border-cyan-400/20">
                    Total Claims: <span className="text-[#07162F] dark:text-pearl font-bold">{v.claims} scholars</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === "logs" && (
          <div className="space-y-4 relative z-10 font-mono text-xs">
            <h3 className="font-heading font-extrabold text-xl text-[#07162F] dark:text-pearl">
              Cryptographic Audit Log & Security Events
            </h3>
            <div className="p-4 rounded-2xl bg-black/80 text-emerald-400 border-2 border-emerald-500/40 space-y-2 h-72 overflow-y-auto">
              <p>[AUTH-AUDIT] 2026-11-05 07:12:04 UTC — Administrator session provisioned for {ADMIN_CREDENTIALS.email} (UID: usr-admin-infinity-001).</p>
              <p>[KNOWLEDGE-RAG] 2026-11-05 07:10:18 UTC — 36 curriculum vector partitions verified against schema checksum.</p>
              <p>[SETTLEMENT-TELEMETRY] 2026-11-05 07:05:44 UTC — Voucher BASIRAH2026 redeemed by scholar (Amount: $49.00 USD discount: 100%).</p>
              <p>[ENCRYPTION-ENGINE] 2026-11-05 06:45:12 UTC — Cryptographic certificate signature issued with 256-bit hash validation.</p>
              <p>[SYSTEM-HEARTBEAT] 2026-11-05 06:00:00 UTC — All 36 course lab sandboxes reported healthy with zero memory leaks.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
