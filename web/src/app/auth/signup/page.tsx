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
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-8">
      {/* Brand Header with App Icon */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-deepspace to-midnight border-2 border-amber-400/60 p-1 mx-auto shadow-gold-glow flex items-center justify-center overflow-hidden">
          <img src="/assets/basirah-app-icon.png" alt="Basirah Emblem" className="w-full h-full object-cover rounded-xl" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-pearl">
          Create Your Academy Account
        </h1>
        <p className="text-xs text-slate-soft">
          Embark on a rigorous, authentic journey to understand and build artificial intelligence.
        </p>
      </div>

      {/* Sign Up Form with Golden Glass Border */}
      <div className="p-8 sm:p-9 rounded-3xl bg-deepspace/85 border-2 border-amber-400/40 shadow-gold-glass backdrop-blur-2xl">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1.5 uppercase font-bold">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Amina Al-Mansoor"
                className="w-full bg-midnight/90 border-2 border-amber-400/25 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-3 text-sm text-pearl focus:outline-none transition-colors"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1.5 uppercase font-bold">
              Target Learning Pathway
            </label>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              className="w-full bg-midnight/90 border-2 border-amber-400/25 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-pearl focus:outline-none transition-colors font-sans"
            >
              <option value="beginner">Discover AI (Beginner Track)</option>
              <option value="intermediate">Build with AI (Intermediate Track)</option>
              <option value="advanced">Engineer Intelligence (Advanced Track)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-touch w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-cyan text-midnight font-heading font-extrabold text-sm shadow-gold-glass hover:brightness-110"
          >
            {loading ? "Creating Account..." : "Join the Academy"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-soft">
          Already have an account?{" "}
          <Link href="/auth/signin" className="btn-touch text-cyan font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
