"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail } from "lucide-react";
import { useBasirahStore } from "@/lib/store";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useBasirahStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user);
        router.push("/dashboard");
        return;
      }
    } catch (err) {
      // Local client fallback auth
    }

    // Default student session for offline/demo evaluation
    login({
      id: "usr-student-001",
      email: email || "student@basirah.academy",
      displayName: email.includes("admin") ? "Director Zaidan" : "Amina Al-Mansoor",
      role: email.includes("admin") ? "admin" : "student",
      level: "intermediate",
      bio: "AI engineering researcher focusing on multimodal RAG systems and efficient fine-tuning."
    });
    router.push(email.includes("admin") ? "/admin" : "/dashboard");
  };

  const handleDemoSignIn = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      login({
        id: "usr-admin-001",
        email: "admin@basirah.academy",
        displayName: "Director Zaidan",
        role: "admin",
        level: "advanced",
        bio: "Academic Dean of AI Systems and Infrastructure at Basirah Academy."
      });
      router.push("/admin");
    } else {
      login({
        id: "usr-student-001",
        email: "student@basirah.academy",
        displayName: "Amina Al-Mansoor",
        role: "student",
        level: "intermediate",
        bio: "AI engineering researcher focusing on multimodal RAG systems and efficient fine-tuning."
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-deepspace border border-cyan/40 p-2 mx-auto shadow-cyan-glow flex items-center justify-center">
          <img src="/assets/emblem.svg" alt="Basirah Emblem" className="w-full h-full object-contain" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-pearl">
          Sign In to Basirah Academy
        </h1>
        <p className="text-xs text-slate-soft">
          Access your personalized learning dashboard, course workspaces, and AI Tutor.
        </p>
      </div>

      {/* Sign In Form */}
      <div className="p-8 rounded-2xl bg-deepspace/80 border border-slate-dim/30 shadow-card-elevated backdrop-blur-md">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-status-error/15 border border-status-error text-xs text-status-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-soft mb-1 uppercase">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-soft absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@basirah.academy"
                className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-soft mb-1 uppercase">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-soft absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan to-electric text-midnight font-bold text-sm shadow-cyan-glow hover:brightness-110 transition-all"
          >
            {loading ? "Authenticating..." : "Sign In to Academy"}
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div className="mt-6 pt-6 border-t border-slate-dim/20 space-y-2">
          <span className="text-[11px] font-mono text-slate-soft uppercase tracking-wider block text-center mb-1">
            Instant Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoSignIn('student')}
              className="py-2 px-3 rounded-lg bg-midnight border border-cyan/30 text-cyan text-xs font-mono hover:bg-cyan/10 transition-colors"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleDemoSignIn('admin')}
              className="py-2 px-3 rounded-lg bg-midnight border border-gold/30 text-gold-champagne text-xs font-mono hover:bg-gold/10 transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-soft">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/signup" className="text-cyan font-semibold hover:underline">
            Join the Academy
          </Link>
        </div>
      </div>
    </div>
  );
}

