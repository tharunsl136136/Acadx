"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function CompanyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("talent@anthropic.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem("acadshield_active_role_v1", "COMPANY");
      } catch {}
      router.push("/company");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-canvas-texture text-forest flex flex-col justify-between p-6 sm:p-12">
      {/* Brand Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-forest text-ochre flex items-center justify-center font-bold text-lg border border-ochre/30 shadow">
            AX
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-forest block leading-none">
              ACADSHIELD X
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-forest/60">
              Corporate Verifier Network
            </span>
          </div>
        </Link>
        <Link
          href="/login"
          className="text-xs font-bold text-forest/70 hover:text-forest transition flex items-center gap-1.5"
        >
          Change Role
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bg-white border-2 border-forest/15 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold text-forest">
              <Briefcase className="w-3.5 h-3.5 text-ochre" />
              Independent Verifier Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight headline-shadow font-serif">
              Company Sign In
            </h1>
            <p className="text-xs text-forest/75 leading-relaxed">
              Verify employee and candidate credentials with evidence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-forest mb-1.5">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-forest">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions dispatched to corporate security contact.")}
                  className="text-[11px] text-ochre font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ochre"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-forest rounded focus:ring-ochre"
                />
                <span className="text-forest/70 font-medium">Remember this browser</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Corporate Support: enterprise@acadshield.network")}
                className="text-forest/50 hover:text-forest text-[11px]"
              >
                Need Help?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest/90 text-white font-bold shadow-md transition flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span>Validating Verifier Credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-ochre" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-forest/10 text-center text-xs">
            <span className="text-forest/60">New enterprise? </span>
            <Link
              href="/register/company"
              className="font-bold text-ochre hover:underline"
            >
              Register Company
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto text-center text-[11px] text-forest/50">
        AcadShield X Digital Trust Infrastructure • Corporate Verifier Layer
      </div>
    </div>
  );
}
