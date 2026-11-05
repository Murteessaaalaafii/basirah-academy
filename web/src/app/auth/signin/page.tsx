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
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";
import { useBasirahStore } from "@/lib/store";
import { signInWithEmail, signInWithGoogle, ADMIN_CREDENTIALS } from "@/lib/firebase";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useBasirahStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Email & Password Authentication Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await signInWithEmail(email, password);
      login(user);
      setSuccessMsg(`Welcome back, ${user.displayName}! Access granted.`);
      setTimeout(() => {
        router.push(user.role === "admin" ? "/admin" : "/dashboard");
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please verify your credentials.");
      setLoading(false);
    }
  };

  // Google OAuth Popup Authentication Handler
  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      const user = await signInWithGoogle();
      login(user);
      setSuccessMsg(`Signed in with Google as ${user.displayName}`);
      setTimeout(() => {
        router.push(user.role === "admin" ? "/admin" : "/dashboard");
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Google sign-in could not be completed.");
      setGoogleLoading(false);
    }
  };

  // Quick One-Tap Credentials Fill for Primary Admin
  const handleQuickAdminFill = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError(null);
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
              Sign In to Basirah Academy
            </h1>
            <p className="text-xs text-cyan-200/70 mt-1 font-sans">
              Prismatic Intelligence • Learn • Build • Innovate
            </p>
          </div>
        </div>

        {/* Notifications: Error or Success */}
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

        {/* Google One-Click Authentication Button */}
        <div className="space-y-4 relative z-10">
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-white/15" />
            <span className="text-[10px] font-mono text-cyan-200/50 uppercase tracking-wider">
              or use academic email
            </span>
            <div className="flex-1 h-[1px] bg-white/15" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 uppercase font-bold tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@basirah.academy or basirahinfinity@gmail.com"
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
                  placeholder="••••••••••••"
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

            {/* Submit Button (Image 2 Gradient Pill Button Style) */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-touch w-full py-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#00F0FF] border-[1.5px] border-white/50 text-white font-heading font-extrabold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.02] flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Authenticating Session...
                </span>
              ) : (
                <>
                  <span>Sign In to Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Authorized Administrator Access Box */}
          <div className="p-3.5 rounded-[20px] bg-white/[0.05] border border-white/15 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-300 font-extrabold flex items-center gap-1.5 uppercase text-[10.5px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Executive Governance Access
              </span>
              <button
                type="button"
                onClick={handleQuickAdminFill}
                className="btn-touch px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] text-[#070D24] text-[10px] font-bold shadow-sm"
              >
                Auto-Fill Admin
              </button>
            </div>
            <p className="text-[10px] font-mono text-cyan-100/70">
              Admin Login: <span className="text-white font-bold">basirahinfinity@gmail.com</span> • <span className="text-amber-300 font-bold">basirah@admin123</span>
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-cyan-200/70 relative z-10 border-t border-white/10 font-sans">
          <span>Don&apos;t have an account yet? </span>
          <Link 
            href="/auth/signup" 
            className="text-[#00F0FF] font-bold hover:underline ml-1"
          >
            Create Scholar Account
          </Link>
        </div>
      </div>
    </div>
  );
}
