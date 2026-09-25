"use client";

import React, { useState } from "react";
import Link from "next/link";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function CompanyCandidatesPage() {
  const { candidates } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "ALL") return matchesSearch;
    return matchesSearch && c.verificationStatus === filterStatus;
  });

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="COMPANY" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <Users className="w-3.5 h-3.5 text-ochre" />
              Talent Verification Registry
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Candidates & Employee Records
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Inspect candidate-shared credentials, document hash match status, and trust passport credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/company/verify/document"
              className="px-4 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-ochre" />
              Verify New Document
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Filter & Search Bar */}
        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name, DID, or target role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-forest/60">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Statuses ({candidates.length})</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="HASH_MISMATCH">Hash Mismatch</option>
              <option value="PENDING_REVIEW">Pending Review</option>
            </select>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Candidate / Identity</th>
                  <th className="py-3.5 px-6">Target Role & Dept</th>
                  <th className="py-3.5 px-6">Academic Institution</th>
                  <th className="py-3.5 px-6">Document Fingerprint</th>
                  <th className="py-3.5 px-6">Risk Signal</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-forest/5 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-forest text-sm">{candidate.name}</div>
                      <div className="font-mono text-[10px] text-forest/50 truncate max-w-xs">
                        {candidate.did}
                      </div>
                      <div className="text-[11px] text-forest/60 mt-0.5">
                        {candidate.credentialsCount} verified credentials linked
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-semibold text-forest">{candidate.targetRole}</div>
                      <div className="text-forest/60 text-[11px]">{candidate.department}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-forest">{candidate.institution}</div>
                      <div className="text-forest/60 text-[11px]">{candidate.degreeTitle}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          candidate.verificationStatus === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : candidate.verificationStatus === "HASH_MISMATCH"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-forest/10 text-forest/70"
                        }`}
                      >
                        {candidate.verificationStatus === "VERIFIED" ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            MATCHED (SHA-256)
                          </>
                        ) : candidate.verificationStatus === "HASH_MISMATCH" ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            MISMATCH DETECTED
                          </>
                        ) : (
                          <>
                            <Users className="w-3.5 h-3.5" />
                            UNVERIFIED
                          </>
                        )}
                      </span>
                      <div className="text-[10px] text-forest/40 mt-1">
                        Last check: {new Date(candidate.lastVerifiedAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          candidate.riskSignal === "LOW"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {candidate.riskSignal} RISK
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/company/verify/document"
                          className="px-3 py-1.5 rounded-lg bg-forest/5 hover:bg-forest/10 border border-forest/10 text-forest font-bold text-xs transition"
                        >
                          Verify Copy
                        </Link>
                        <Link
                          href="/student/passport"
                          className="px-3 py-1.5 rounded-lg bg-ochre/10 hover:bg-ochre/20 text-ochre font-bold text-xs transition flex items-center gap-1"
                        >
                          Trust Passport <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
