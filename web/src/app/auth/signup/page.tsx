"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail, User } from "lucide-react";
import { useBasirahStore } from "@/lib/store";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useBasirahStore();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetLevel, setTargetLevel] = useState("beginner");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName, targetLevel })
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user);
        router.push("/dashboard");
        return;
      }
    } catch (err) {
      // Local fallback
    }

    login({
      id: `usr-${Date.now()}`,
      email,
      displayName: displayName || "Aspiring Engineer",
      role: "student",
      level: targetLevel as any,
      bio: "New scholar embarking on AI engineering at Basirah Academy."
    });
    router.push("/dashboard");
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-deepspace border border-cyan/40 p-2 mx-auto shadow-cyan-glow flex items-center justify-center">
          <img src="/assets/emblem.svg" alt="Basirah Emblem" className="w-full h-full object-contain" />
        </div>
        <h1 className="font-heading font-bold text-2xl text-pearl">
          Create Your Academy Account
        </h1>
        <p className="text-xs text-slate-soft">
          Begin your journey in AI engineering with authentic, practical mastery.
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="p-8 rounded-2xl bg-deepspace/80 border border-slate-dim/30 shadow-card-elevated backdrop-blur-md">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-soft mb-1 uppercase">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-soft absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Amina Al-Mansoor"
                className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

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
                placeholder="you@domain.com"
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

          <div>
            <label className="block text-xs font-mono text-slate-soft mb-1 uppercase">
              Starting Learning Pathway
            </label>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              className="w-full bg-midnight/90 border border-slate-dim/40 focus:border-cyan rounded-lg px-3.5 py-2.5 text-sm text-pearl focus:outline-none transition-colors"
            >
              <option value="beginner">Beginner: Discover AI (10 Courses)</option>
              <option value="intermediate">Intermediate: Build with AI (13 Courses)</option>
              <option value="advanced">Advanced: Engineer Intelligence (13 Courses)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan to-electric text-midnight font-bold text-sm shadow-cyan-glow hover:brightness-110 transition-all"
          >
            {loading ? "Creating Scholar Profile..." : "Join Basirah Academy"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-soft">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-cyan font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}

