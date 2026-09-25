"use client";

import React, { useState } from "react";
import Link from "next/link";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Download,
  ExternalLink,
  ShieldCheck,
  Binary
} from "lucide-react";

export default function CompanyVerificationsHistoryPage() {
  const { verifications } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [resultFilter, setResultFilter] = useState("ALL");

  const filtered = verifications.filter((v) => {
    const matchesSearch =
      v.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (resultFilter === "ALL") return matchesSearch;
    return matchesSearch && v.result === resultFilter;
  });

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="COMPANY" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <FileCheck2 className="w-3.5 h-3.5 text-ochre" />
              Cryptographic Audit Log
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Verification History & Reports
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Immutable historical register of all candidate credential and document hash checks conducted by this organization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/company/verify/document"
              className="px-4 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4 text-ochre" />
              New Verification
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Filter Bar */}
        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate, verification ID, university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-forest/60">Outcome:</span>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Outcomes ({verifications.length})</option>
              <option value="VERIFIED">Matched (Verified)</option>
              <option value="HASH_MISMATCH">Hash Mismatch</option>
              <option value="REVOKED">Revoked Record</option>
            </select>
          </div>
        </div>

        {/* Verifications Table */}
        <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Verification ID & Time</th>
                  <th className="py-3.5 px-6">Candidate & Document</th>
                  <th className="py-3.5 px-6">Issuing Authority</th>
                  <th className="py-3.5 px-6">Cryptographic Result</th>
                  <th className="py-3.5 px-6">AI Risk Signal</th>
                  <th className="py-3.5 px-6 text-right">Evidence Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-forest/5 transition">
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-forest">{v.id}</div>
                      <div className="text-[11px] text-forest/50 mt-0.5">
                        {new Date(v.verificationTime).toLocaleString()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-forest">{v.candidateName}</div>
                      <div className="text-forest/60 text-[11px]">{v.documentType}</div>
                      <div className="font-mono text-[10px] text-forest/40 truncate max-w-xs">
                        Registered: {v.registeredHash.slice(0, 16)}...
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-medium text-forest">{v.universityName}</div>
                      <div className="text-forest/60 text-[11px]">{v.issuerName}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          v.result === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : v.result === "HASH_MISMATCH"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {v.result === "VERIFIED" ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            VERIFIED (MATCH)
                          </>
                        ) : v.result === "HASH_MISMATCH" ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            HASH MISMATCH
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            REVOKED BY UNIVERSITY
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.aiRiskSignal === "LOW"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {v.aiRiskSignal} RISK
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert(`Downloaded Official Verification Certificate for ${v.candidateName}`)}
                          className="px-3 py-1.5 rounded-lg bg-forest/5 hover:bg-forest/10 border border-forest/10 text-forest font-bold text-xs transition flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-ochre" />
                          Certificate
                        </button>
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
