"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  FileText,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Building2,
  Binary,
  Award,
  Sparkles,
  Calendar
} from "lucide-react";

export default function CompanyReportsPage() {
  const { verifications, candidates } = usePlatformState();
  const [reportType, setReportType] = useState<"ALL" | "DOCUMENT" | "CREDENTIAL">("ALL");

  const exportReport = (format: "json" | "csv") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(verifications, null, 2));
      const a = document.createElement("a");
      a.setAttribute("href", dataStr);
      a.setAttribute("download", `acadshield-verification-report-${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      const headers = "ID,Candidate,DocumentType,University,Result,RegisteredHash,SubmittedHash,Timestamp,BlockchainTx\n";
      const rows = verifications
        .map(
          (v) =>
            `"${v.id}","${v.candidateName}","${v.documentType}","${v.universityName}","${v.result}","${v.registeredHash}","${v.submittedHash}","${v.verificationTime}","${v.blockchainTx}"`
        )
        .join("\n");
      const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", `acadshield-verification-report-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-semibold text-forest mb-2">
            <FileText className="w-3.5 h-3.5 text-ochre" />
            Corporate Compliance & Due Diligence Dossiers
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
            Verification & Audit Reports
          </h1>
          <p className="text-forest/70 text-sm mt-1">
            Generate audit-grade background verification reports with complete cryptographic evidence chains.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportReport("csv")}
            className="px-3.5 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-ochre" />
            Export CSV
          </button>
          <button
            onClick={() => exportReport("json")}
            className="px-3.5 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-ochre" />
            Export Full Dossier (JSON)
          </button>
        </div>
      </div>

      {/* Report Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Total Evaluations</span>
          <span className="block text-2xl font-extrabold text-forest mt-1">{verifications.length}</span>
          <span className="text-[11px] text-forest/60">Candidate documents screened</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Verified Matches</span>
          <span className="block text-2xl font-extrabold text-emerald-800 mt-1">
            {verifications.filter((v) => v.result === "VERIFIED").length}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">100% SHA-256 Bit Match</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Fingerprint Mismatches</span>
          <span className="block text-2xl font-extrabold text-red-800 mt-1">
            {verifications.filter((v) => v.result === "HASH_MISMATCH").length}
          </span>
          <span className="text-[11px] text-red-700 font-semibold">Non-matching file digest</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Average Verification Latency</span>
          <span className="block text-2xl font-extrabold text-forest mt-1">1.8s</span>
          <span className="text-[11px] text-forest/60">Local web crypto calculation</span>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-forest/15 rounded-2xl overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-forest/10">
          <h3 className="text-sm font-bold text-forest uppercase tracking-wider">
            Verification Records & Evidence Logs
          </h3>
          <span className="text-xs text-forest/60 font-medium">Compliance-ready format</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest/5 border-b border-forest/10 font-bold uppercase text-[10px] text-forest/70 tracking-wider">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Issuing University</th>
                <th className="py-3 px-4">Hash Comparison</th>
                <th className="py-3 px-4">Blockchain Anchor</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/10">
              {verifications.map((v) => {
                const isMatch = v.registeredHash === v.submittedHash;
                return (
                  <tr key={v.id} className="hover:bg-forest/[0.02] transition">
                    <td className="py-3.5 px-4 font-bold text-forest">{v.candidateName}</td>
                    <td className="py-3.5 px-4 font-semibold text-forest/90">{v.documentType}</td>
                    <td className="py-3.5 px-4 text-forest/70">{v.universityName}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {isMatch ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> EXACT MATCH
                        </span>
                      ) : (
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> MISMATCH
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-forest/70">
                      <a
                        href={`https://amoy.polygonscan.com/tx/${v.blockchainTx}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ochre hover:underline flex items-center gap-1"
                      >
                        Polygon Amoy <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.result === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {v.result}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/company/verifications/${v.id}`}
                        className="px-2.5 py-1 rounded bg-forest/10 hover:bg-forest text-forest hover:text-white font-bold text-[11px] transition"
                      >
                        View Dossier
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
