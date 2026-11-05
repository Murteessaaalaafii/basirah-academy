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
  AlertCircle,
  KeyRound,
  Compass
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
      <div className="w-full max-w-lg glass-tablet-frame p-8 sm:p-12 space-y-8 relative overflow-hidden">
        {/* Subtle Ambient Shimmer */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[radial-gradient(circle,rgba(0,240,255,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] pointer-events-none" />

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
              Sign In to Basirah Academy
            </h1>
            <p className="text-xs text-[#334E68] dark:text-slate-soft mt-1">
              Prismatic Intelligence • Learn • Build • Innovate
            </p>
          </div>
        </div>

        {/* Notifications: Error or Success */}
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

        {/* Google One-Click Authentication Button */}
        <div className="space-y-4 relative z-10">
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-amber-400/20" />
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              or use academic email
            </span>
            <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-amber-400/20" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
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
                  placeholder="scholar@basirah.academy or basirahinfinity@gmail.com"
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
                  placeholder="••••••••••••"
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

            {/* Submit Button (Image 2 Pill Button Style) */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn-touch w-full py-4 rounded-full glass-pill-button flex items-center justify-center gap-2 text-sm font-heading font-extrabold shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
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
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border-2 border-amber-500/40 dark:border-amber-400/35 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-700 dark:text-amber-300 font-extrabold flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Executive Governance Access
              </span>
              <button
                type="button"
                onClick={handleQuickAdminFill}
                className="btn-touch px-2.5 py-1 rounded-lg bg-amber-400 text-midnight text-[10.5px] font-bold hover:brightness-110 shadow-sm"
              >
                Auto-Fill Admin
              </button>
            </div>
            <p className="text-[11px] font-mono text-[#334E68] dark:text-slate-soft">
              Admin Login: <span className="text-[#07162F] dark:text-pearl font-bold">basirahinfinity@gmail.com</span> • <span className="text-amber-600 dark:text-amber-400 font-bold">basirah@admin123</span>
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-[#334E68] dark:text-slate-soft relative z-10 border-t border-slate-200 dark:border-amber-400/20">
          <span>Don&apos;t have an account yet? </span>
          <Link 
            href="/auth/signup" 
            className="text-cyan-700 dark:text-cyan font-bold hover:underline ml-1"
          >
            Create Scholar Account
          </Link>
        </div>
      </div>
    </div>
  );
}
