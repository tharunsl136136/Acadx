"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, Eye, EyeOff, Lock, Mail, ArrowRight, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("root@acadshield.network");
  const [password, setPassword] = useState("••••••••••••••••");
  const [mfaCode, setMfaCode] = useState("891042");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem("acadshield_active_role_v1", "ADMIN");
      } catch {}
      router.push("/admin");
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
              Universal Platform Governance
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

      {/* Main Admin Card */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bg-white border-2 border-red-900/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-xs font-bold text-red-900">
              <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
              Restricted Platform Governance Access
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight headline-shadow font-serif">
              Admin Access
            </h1>
            <p className="text-xs text-forest/75 leading-relaxed">
              Universal governance and audit access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-forest mb-1.5">
                Admin Email / Master Identity
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@acadshield.network"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-forest mb-1.5">Password</label>
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

            <div>
              <label className="block font-bold text-forest mb-1.5">
                Hardware Token / 6-Digit MFA Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
              <strong>Authorized platform administrators only.</strong> Public registration is strictly disabled. All authentication attempts and subsequent governance actions are permanently recorded to the immutable audit ledger.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest/90 text-white font-bold shadow-md transition flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <span>Verifying Hardware MFA & Permissions...</span>
              ) : (
                <>
                  <span>Secure Sign In</span>
                  <ArrowRight className="w-4 h-4 text-ochre" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto text-center text-[11px] text-forest/50">
        AcadShield X Digital Trust Infrastructure • Master Governance Node
      </div>
    </div>
  );
}
