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
      <div className="w-full max-w-lg rounded-[32px] sm:rounded-[36px] bg-[#0A1430]/75 dark:bg-[#070D24]/85 backdrop-blur-3xl border-[3px] border-[#38BDF8]/60 hover:border-[#00F0FF] shadow-[0_0_60px_rgba(0,240,255,0.25),0_30px_90px_rgba(4,8,24,0.7),inset_0_1px_3px_rgba(255,255,255,0.4)] p-8 sm:p-12 space-y-7 relative overflow-hidden transition-all duration-300">
        
        {/* Upper glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/15 to-transparent rounded-t-[32px] pointer-events-none" />

        {/* Header with 3D Basirah Emblem */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#070D24] border-2 border-[#38BDF8]/60 p-1 mx-auto shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center overflow-hidden">
            <img 
              src="/assets/basirah-app-icon.png" 
              alt="Basirah Emblem" 
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Create Scholar Account
            </h1>
            <p className="text-xs text-cyan-200/70 mt-1 font-sans">
              Enter the world of deep discovery, neural computing, and verified innovation
            </p>
          </div>
        </div>

        {/* Error or Success Notification */}
        {error && (
          <div className="p-3.5 rounded-[18px] bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 font-medium flex items-start gap-2.5 shadow-sm animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-[18px] bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 font-medium flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* Google Registration Button */}
        <div className="space-y-4 relative z-10">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="btn-touch w-full py-3 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border-[1.5px] border-white/20 hover:border-[#00F0FF] shadow-sm flex items-center justify-center gap-3 text-xs font-heading font-bold text-white transition-all"
          >
            {googleLoading ? (
              <span className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                Connecting with Google...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign Up with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-white/15" />
            <span className="text-[10px] font-mono text-cyan-200/50 uppercase tracking-wider">
              or register academic profile
            </span>
            <div className="flex-1 h-[1px] bg-white/15" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Full Name / Scholar Moniker
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Amina Al-Mansoor"
                  className="w-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus:border-[#00F0FF] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Academic Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@basirah.academy"
                  className="w-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus:border-[#00F0FF] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••• (min 6 characters)"
                  className="w-full bg-white/[0.08] dark:bg-black/30 border-[1.5px] border-white/20 focus:border-[#00F0FF] rounded-full pl-11 pr-11 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Target Discipline Pill Selection */}
            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-2 uppercase font-bold tracking-wider">
                Primary Engineering Discipline
              </label>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => {
                  const Icon = spec.icon;
                  const isSelected = targetSpecialization === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => setTargetSpecialization(spec.id)}
                      className={`btn-touch px-3 py-1.5 rounded-full text-[10.5px] font-mono font-bold flex items-center gap-1.5 transition-all border ${
                        isSelected
                          ? "bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-white/50 text-white shadow-sm"
                          : "bg-white/[0.06] border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{spec.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button (Image 2 Gradient Pill Button Style) */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.02] flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Generating Scholar Workspace...
                </span>
              ) : (
                <>
                  <span>Join Basirah Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-cyan-200/70 relative z-10 border-t border-white/10 font-sans">
          <span>Already registered with the Academy? </span>
          <Link 
            href="/auth/signin" 
            className="text-[#00F0FF] font-bold hover:underline ml-1"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
