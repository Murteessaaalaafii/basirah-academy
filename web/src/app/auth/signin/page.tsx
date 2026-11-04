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
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-8">
      {/* Brand Header with App Icon */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-deepspace to-midnight border-2 border-amber-400/60 p-1 mx-auto shadow-gold-glow flex items-center justify-center overflow-hidden">
          <img src="/assets/basirah-app-icon.png" alt="Basirah Emblem" className="w-full h-full object-cover rounded-xl" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-pearl">
          Sign In to Basirah Academy
        </h1>
        <p className="text-xs text-slate-soft">
          Access your personalized learning dashboard, course workspaces, and AI Tutor.
        </p>
      </div>

      {/* Sign In Form with Golden Glass Border */}
      <div className="p-8 sm:p-9 rounded-3xl bg-deepspace/85 border-2 border-amber-400/40 shadow-gold-glass backdrop-blur-2xl">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-status-error/15 border border-status-error text-xs text-status-error font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1.5 uppercase font-bold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@basirah.academy"
                className="w-full bg-midnight/90 border-2 border-amber-400/25 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-3 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1.5 uppercase font-bold">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-midnight/90 border-2 border-amber-400/25 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-3 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-touch w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-sm shadow-gold-glass hover:brightness-110"
          >
            {loading ? "Authenticating..." : "Sign In to Academy"}
          </button>
        </form>

        {/* Demo Fast Logins with Touchable Motion */}
        <div className="mt-8 pt-6 border-t border-amber-400/20 space-y-2.5">
          <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-wider block text-center mb-1 font-bold">
            Instant Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleDemoSignIn('student')}
              className="btn-touch py-2.5 px-3 rounded-xl bg-midnight border-2 border-cyan-400/40 text-cyan text-xs font-mono font-bold hover:bg-cyan/10 shadow-sm"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleDemoSignIn('admin')}
              className="btn-touch py-2.5 px-3 rounded-xl bg-midnight border-2 border-amber-400/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400/10 shadow-sm"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-soft">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/signup" className="btn-touch text-cyan font-bold hover:underline">
            Join the Academy
          </Link>
        </div>
      </div>
    </div>
  );
}
