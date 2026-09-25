"use client";

import React from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  Building2,
  Users,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function CompanyDashboardPage() {
  const { candidates, verifications, credentials, documents } = usePlatformState();

  const totalCandidates = candidates.length;
  const verifiedCount = verifications.filter((v) => v.result === "VERIFIED").length;
  const mismatchCount = verifications.filter((v) => v.result === "HASH_MISMATCH").length;
  const revokedCount = verifications.filter((v) => v.result === "REVOKED").length;
  const reviewRequiredCount = verifications.filter((v) => v.result === "REVIEW_REQUIRED").length;

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-800 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Corporate Verifier Status: VERIFIED ENTERPRISE
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
            Company Verifier Operations
          </h1>
          <p className="mt-1 text-forest/75 text-sm max-w-xl">
            Anthropic PBC � Talent Assurance & Independent Credential Verification Node
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/company/verify/document"
            className="px-5 py-3 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow-md flex items-center gap-2"
          >
            <FileCheck2 className="w-4 h-4 text-ochre" />
            Verify Candidate Document
          </Link>
          <Link
            href="/company/candidates"
            className="px-4 py-3 rounded-xl border border-forest/20 text-forest font-bold text-xs hover:bg-forest/5 transition flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-ochre" />
            Candidate Directory
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Candidates
          </span>
          <div className="mt-2 text-2xl font-black text-forest">{totalCandidates}</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Active applications</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Hash Matches
          </span>
          <div className="mt-2 text-2xl font-black text-emerald-700">{verifiedCount}</div>
          <span className="text-[11px] text-emerald-600/80 block mt-0.5">100% bit-for-bit</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Mismatches
          </span>
          <div className="mt-2 text-2xl font-black text-amber-700">{mismatchCount}</div>
          <span className="text-[11px] text-amber-700/80 block mt-0.5">Document altered</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Revoked
          </span>
          <div className="mt-2 text-2xl font-black text-red-700">{revokedCount}</div>
          <span className="text-[11px] text-red-700/80 block mt-0.5">University flagged</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Review Req.
          </span>
          <div className="mt-2 text-2xl font-black text-ochre">{reviewRequiredCount}</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Manual inspection</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            API Usage
          </span>
          <div className="mt-2 text-2xl font-black text-forest">389 / 5k</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Monthly quota</span>
        </div>
      </div>

      {/* Main Content & Recent Verification Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-forest/10 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-forest">
                Recent Cryptographic Verification Activity
              </h2>
              <p className="text-xs text-forest/60 mt-0.5">
                Real-time log of candidate document comparisons against university source records
              </p>
            </div>
            <Link
              href="/company/verifications"
              className="text-xs font-bold text-ochre hover:underline flex items-center gap-1"
            >
              Full Verification Log <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-forest/10">
            {verifications.slice(0, 5).map((v) => (
              <div key={v.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      v.result === "VERIFIED"
                        ? "bg-emerald-100 text-emerald-700"
                        : v.result === "HASH_MISMATCH"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.result === "VERIFIED" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : v.result === "HASH_MISMATCH" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-forest">{v.candidateName}</div>
                    <div className="text-forest/60 text-[11px]">
                      {v.documentType} � {v.universityName}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      v.result === "VERIFIED"
                        ? "bg-emerald-100 text-emerald-800"
                        : v.result === "HASH_MISMATCH"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {v.result === "VERIFIED"
                      ? "? MATCH"
                      : v.result === "HASH_MISMATCH"
                      ? "! MISMATCH"
                      : "REVOKED"}
                  </span>
                  <div className="text-[10px] text-forest/40 mt-1 font-mono">
                    {new Date(v.verificationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel: Rules of Engagement & Fast Verification */}
        <div className="space-y-6">
          <div className="bg-forest text-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-ochre" />
              Verifier Boundary Model
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              As a corporate verifier, you have read-only audit rights to test submitted files against university registers.
            </p>
            <ul className="text-xs text-white/70 space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">?</span> Verify candidate files via SHA-256
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">?</span> Inspect university issuer accreditation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">?</span> Cannot issue or modify university documents
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">?</span> Cannot revoke academic credentials
              </li>
            </ul>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-1">
              Quick Verifier Links
            </h4>
            <Link
              href="/company/verify/document"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>Side-by-Side Fingerprint Match</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
            <Link
              href="/company/verify"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>4-Way Verification Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
            <Link
              href="/company/reports"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>Export Compliance Reports</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
