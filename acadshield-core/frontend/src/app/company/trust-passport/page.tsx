"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  Award,
  Users,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  GitFork,
  FileCheck2,
  Binary,
  ShieldCheck,
  Building2,
  Sparkles
} from "lucide-react";

export default function CompanyTrustPassportDirectoryPage() {
  const { candidates } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || c.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-semibold text-forest mb-2">
          <Award className="w-3.5 h-3.5 text-ochre" />
          Enterprise Trust Passport Directory
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
          Candidate Trust Passports
        </h1>
        <p className="text-forest/70 text-sm mt-1 max-w-2xl">
          Search candidate portfolios with independently verified educational degrees, institutional credentials, and W3C decentralized identity proofs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur border border-forest/15 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-forest/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name, role, or DID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 focus:outline-none focus:border-forest text-forest placeholder:text-forest/40 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["ALL", "VERIFIED", "PENDING_REVIEW", "HASH_MISMATCH"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === filter
                  ? "bg-forest text-white shadow-sm"
                  : "bg-forest/5 text-forest/70 hover:bg-forest/10 hover:text-forest"
              }`}
            >
              {filter.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white border border-forest/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-forest/40 transition group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-forest text-ochre font-serif text-lg flex items-center justify-center font-bold border border-ochre/30 shadow">
                    {candidate.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-forest group-hover:text-forest/90">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-forest/60">{candidate.targetRole}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    candidate.verificationStatus === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800"
                      : candidate.verificationStatus === "HASH_MISMATCH"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {candidate.verificationStatus}
                </span>
              </div>

              <div className="p-3 bg-forest/5 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-forest">
                  <Building2 className="w-3.5 h-3.5 text-forest/50" />
                  <span>{candidate.institution}</span>
                </div>
                <div className="flex items-center gap-1.5 text-forest/70">
                  <Award className="w-3.5 h-3.5 text-ochre" />
                  <span>{candidate.degreeTitle}</span>
                </div>
                <div className="text-[10px] font-mono text-forest/50 truncate pt-1">
                  DID: {candidate.did}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-forest/10 flex items-center justify-between gap-2 mt-4">
              <Link
                href={`/company/candidates/${candidate.id}/graph`}
                className="p-2 rounded-xl border border-forest/20 text-forest hover:bg-forest/5 transition"
                title="View Trust Graph"
              >
                <GitFork className="w-4 h-4 text-ochre" />
              </Link>
              <Link
                href={`/company/candidates/${candidate.id}/passport`}
                className="flex-1 py-2 px-3 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition text-center flex items-center justify-center gap-1"
              >
                <span>View Trust Passport</span>
                <ArrowRight className="w-3.5 h-3.5 text-ochre" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
