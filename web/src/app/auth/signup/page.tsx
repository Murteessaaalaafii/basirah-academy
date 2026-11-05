"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle,
  Brain,
  Code2,
  Bot,
  CloudLightning,
  Cpu
} from "lucide-react";
import { useBasirahStore } from "@/lib/store";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useBasirahStore();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [targetSpecialization, setTargetSpecialization] = useState("ai");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const specializations = [
    { id: "ai", label: "AI & ML", icon: Brain },
    { id: "prog", label: "Programming", icon: Code2 },
    { id: "agents", label: "AI Tools & Agents", icon: Bot },
    { id: "data", label: "Data Science", icon: CloudLightning },
    { id: "tech", label: "Tech & Innovation", icon: Cpu }
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password, displayName);
      login(user);
      setSuccessMsg(`Welcome to Basirah Academy, ${user.displayName}! Your scholar identity is ready.`);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Failed to create scholar account. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      login(user);
      setSuccessMsg(`Scholar account linked with Google as ${user.displayName}!`);
      setTimeout(() => {
        router.push(user.role === "admin" ? "/admin" : "/dashboard");
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Google sign-up could not be completed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* 3D Floating Holographic Glass Tablet Container (Template 2) */}
      <div className="w-full max-w-lg glass-tablet-frame p-8 sm:p-12 space-y-8 relative overflow-hidden">
        {/* Ambient Refraction Glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[radial-gradient(circle,rgba(0,240,255,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* 4 Corner Diamond Accent Brackets */}
        <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Header with 3D Basirah Emblem */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-deepspace to-midnight border-[2.5px] border-amber-400/60 p-1 mx-auto shadow-gold-glow flex items-center justify-center overflow-hidden ring-1 ring-cyan-400/40">
            <img 
              src="/assets/basirah-app-icon.png" 
              alt="Basirah Emblem" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#07162F] dark:text-pearl">
              Create Your Scholar Account
            </h1>
            <p className="text-xs text-[#334E68] dark:text-slate-soft mt-1">
              Join the ecosystem of genuine understanding and real-world AI engineering
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-status-error/15 border-2 border-status-error/60 text-xs text-status-error font-medium flex items-start gap-2.5 shadow-sm animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-status-success/15 border-2 border-status-success/60 text-xs text-status-success font-medium flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* Google Authentication */}
        <div className="space-y-4 relative z-10">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="btn-touch w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-[#07162F]/90 border-2 border-slate-300 dark:border-cyan-400/40 hover:border-cyan-500 dark:hover:border-cyan-300 shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center gap-3 text-sm font-heading font-bold text-[#07162F] dark:text-pearl transition-all"
          >
            {googleLoading ? (
              <span className="flex items-center gap-2 font-mono text-xs">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                Connecting with Google...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign Up with Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-amber-400/20" />
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              or create with email
            </span>
            <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-amber-400/20" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-1.5 uppercase font-extrabold tracking-wider">
                Full Scholar Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-600 dark:text-cyan absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Amina Al-Mansoor"
                  className="w-full bg-white/90 dark:bg-[#07162F]/90 border-2 border-slate-300 dark:border-amber-400/35 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-[#07162F] dark:text-pearl placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-1.5 uppercase font-extrabold tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@basirah.academy"
                  className="w-full bg-white/90 dark:bg-[#07162F]/90 border-2 border-slate-300 dark:border-amber-400/35 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-[#07162F] dark:text-pearl placeholder-slate-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-1.5 uppercase font-extrabold tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-600 dark:text-cyan absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-white/90 dark:bg-[#07162F]/90 border-2 border-slate-300 dark:border-amber-400/35 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-2xl pl-10 pr-10 py-3 text-sm text-[#07162F] dark:text-pearl placeholder-slate-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Specialization Discipline Selector */}
            <div>
              <label className="block text-xs font-mono text-amber-600 dark:text-amber-400 mb-2 uppercase font-extrabold tracking-wider">
                Primary Specialization
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specializations.map((spec) => {
                  const Icon = spec.icon;
                  const isSelected = targetSpecialization === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setTargetSpecialization(spec.id)}
                      className={`btn-touch p-2.5 rounded-xl border-2 text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? "bg-amber-400/25 border-amber-500 dark:border-amber-400 text-amber-800 dark:text-amber-300 shadow-sm"
                          : "bg-white/60 dark:bg-deepspace/60 border-slate-200 dark:border-slate-dim/30 text-slate-600 dark:text-slate-soft hover:border-cyan-400"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{spec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Pill Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-touch w-full py-4 rounded-full glass-pill-button flex items-center justify-center gap-2 text-sm font-heading font-extrabold shadow-lg mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating Scholar Profile...
                </span>
              ) : (
                <>
                  <span>Create Account & Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-[#334E68] dark:text-slate-soft relative z-10 border-t border-slate-200 dark:border-amber-400/20">
          <span>Already have a scholar account? </span>
          <Link 
            href="/auth/signin" 
            className="text-cyan-700 dark:text-cyan font-bold hover:underline ml-1"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
