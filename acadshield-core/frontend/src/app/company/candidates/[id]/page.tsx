"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import {
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  FileCheck2,
  Award,
  Binary,
  Share2,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  GitFork,
  FileText
} from "lucide-react";

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params?.id as string;
  const { candidates, documents, credentials, verifications } = usePlatformState();
  const [copiedDid, setCopiedDid] = useState(false);

  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0];

  const candidateDocs = documents.filter((d) => d.studentName.toLowerCase() === candidate.name.toLowerCase());
  const candidateCreds = credentials.filter((c) => c.studentName.toLowerCase() === candidate.name.toLowerCase());
  const candidateVerifs = verifications.filter((v) => v.candidateName.toLowerCase() === candidate.name.toLowerCase());

  const copyDid = () => {
    navigator.clipboard.writeText(candidate.did);
    setCopiedDid(true);
    setTimeout(() => setCopiedDid(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/company/candidates"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest/70 hover:text-forest transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Candidates Roster
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/company/candidates/${candidate.id}/graph`}
            className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5 transition"
          >
            <GitFork className="w-3.5 h-3.5 text-ochre" />
            Interactive Trust Graph
          </Link>
          <Link
            href={`/company/candidates/${candidate.id}/passport`}
            className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5 transition"
          >
            <Award className="w-3.5 h-3.5 text-ochre" />
            Candidate Trust Passport
          </Link>
          <Link
            href={`/company/verify/document`}
            className="px-3.5 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 flex items-center gap-1.5 transition"
          >
            <Binary className="w-3.5 h-3.5 text-ochre" />
            Verify Submitted Document
          </Link>
        </div>
      </div>

      {/* Candidate Profile Header */}
      <div className="bg-white/80 backdrop-blur border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest text-ochre flex items-center justify-center font-bold text-2xl border border-ochre/30 shadow">
              {candidate.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-forest tracking-tight">
                  {candidate.name}
                </h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    candidate.verificationStatus === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : candidate.verificationStatus === "HASH_MISMATCH"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {candidate.verificationStatus}
                </span>
              </div>
              <p className="text-forest/70 text-xs font-medium">
                Applicant for <strong className="text-forest">{candidate.targetRole}</strong>   {candidate.department}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-forest/60">Candidate DID:</span>
                <span className="text-[11px] font-mono text-forest bg-forest/5 px-2 py-0.5 rounded font-medium">
                  {candidate.did}
                </span>
                <button
                  onClick={copyDid}
                  className="text-forest/40 hover:text-forest transition"
                  title="Copy DID"
                >
                  {copiedDid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-forest/10 pt-4 lg:pt-0 lg:pl-8 text-center">
            <div className="p-3 bg-forest/5 rounded-2xl">
              <span className="block text-2xl font-extrabold text-forest">{candidateDocs.length}</span>
              <span className="text-[10px] text-forest/60 font-semibold uppercase">Documents</span>
            </div>
            <div className="p-3 bg-forest/5 rounded-2xl">
              <span className="block text-2xl font-extrabold text-forest">{candidateCreds.length}</span>
              <span className="text-[10px] text-forest/60 font-semibold uppercase">Credentials</span>
            </div>
            <div className="p-3 bg-forest/5 rounded-2xl">
              <span className="block text-2xl font-extrabold text-forest">{candidateVerifs.length}</span>
              <span className="text-[10px] text-forest/60 font-semibold uppercase">Verifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Credentials & Verification Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Credentials claimed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-forest/15 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-forest/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-forest" />
                <h3 className="text-sm font-bold text-forest">Claimed Academic Credentials & Degrees</h3>
              </div>
              <span className="text-xs text-forest/60">{candidateCreds.length} records found</span>
            </div>

            <div className="space-y-3">
              {candidateCreds.length === 0 ? (
                <p className="text-xs text-forest/50 py-4 text-center">No credentials registered yet for this candidate.</p>
              ) : (
                candidateCreds.map((cred) => (
                  <div key={cred.id} className="p-4 rounded-xl border border-forest/15 bg-forest/[0.02] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-forest">{cred.title}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          ERC-721 #{cred.blockchain.tokenId}
                        </span>
                      </div>
                      <p className="text-xs text-forest/70 mt-0.5">
                        Issued by <strong>{cred.universityName}</strong> on {cred.issueDate}
                      </p>
                      <div className="text-[11px] font-mono text-forest/50 mt-1">
                        Hash: {cred.documentHash.substring(0, 20)}...
                      </div>
                    </div>
                    <Link
                      href={`/company/verify/document`}
                      className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 shrink-0 transition"
                    >
                      Verify Hash
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Verification Audit Logs for Candidate */}
          <div className="bg-white border border-forest/15 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-forest">Previous Verifications by Corporate Evaluators</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-forest/5 font-bold uppercase text-[10px] text-forest/70">
                  <tr>
                    <th className="py-2.5 px-4">Document Type</th>
                    <th className="py-2.5 px-4">Result</th>
                    <th className="py-2.5 px-4">Fingerprint Match</th>
                    <th className="py-2.5 px-4">Verified At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {candidateVerifs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-forest/50">
                        No previous verification requests recorded.
                      </td>
                    </tr>
                  ) : (
                    candidateVerifs.map((v) => (
                      <tr key={v.id}>
                        <td className="py-3 px-4 font-bold text-forest">{v.documentType}</td>
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4 font-mono text-[11px] text-forest/70">
                          {v.result === "VERIFIED" ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Exact SHA-256 Match
                            </span>
                          ) : (
                            <span className="text-red-700 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Fingerprint Mismatch
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-forest/60">{new Date(v.verificationTime).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Signal & Employer Verification Guidance */}
        <div className="space-y-6">
          <div className="bg-white border border-forest/15 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider">Automated Risk Analysis</h4>
            <div className="p-4 rounded-xl bg-forest/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-forest">Risk Indicator:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    candidate.riskSignal === "LOW"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {candidate.riskSignal} RISK
                </span>
              </div>
              <p className="text-xs text-forest/70 leading-relaxed">
                Source credentials validated through Polygon Amoy smart contract and NECHE-accredited institutional issuer key.
              </p>
            </div>
          </div>

          <div className="bg-forest text-white rounded-2xl p-5 space-y-3 shadow-md">
            <h4 className="text-xs font-bold text-ochre uppercase tracking-wider">Employer Verification Policy</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Always request the raw PDF from the candidate and upload it to the <strong>Verify Document</strong> tool. The system will independently calculate the SHA-256 hash and compare it with the authoritative university registry.
            </p>
            <Link
              href="/company/verify/document"
              className="inline-flex items-center gap-2 text-xs font-bold text-ochre hover:underline pt-1"
            >
              Open Verification Engine <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
