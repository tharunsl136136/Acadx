"use client";

import React from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  GraduationCap,
  FileCheck2,
  Award,
  Users,
  Building2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  QrCode,
  Binary
} from "lucide-react";

export default function UniversityDashboardPage() {
  const { institutions, students, documents, credentials, verifications } = usePlatformState();

  const currentInstitution = institutions.find((i) => i.id === "inst_mit_001") || institutions[0];
  const isVerified = currentInstitution.status === "VERIFIED";

  const totalStudents = students.length;
  const totalDocuments = documents.length;
  const activeCredentials = credentials.filter((c) => c.status === "ACTIVE").length;
  const revokedCredentials = credentials.filter((c) => c.status === "REVOKED").length;

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isVerified
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              AUTHORITATIVE ISSUER • NECHE ACCREDITED
            </span>
            <span className="text-xs text-forest/50 font-mono">
              DID: did:acadshield:inst:mit_001
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
            {currentInstitution.legalName}
          </h1>
          <p className="mt-1 text-forest/75 text-sm max-w-2xl">
            Registrar & Institutional Credential Governance Node • Official Domain: <strong>{currentInstitution.domain}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/university/documents/upload"
            className="px-5 py-3 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-ochre" />
            Upload Source Document
          </Link>
          <Link
            href="/university/credentials/create"
            className="px-4 py-3 rounded-xl border border-forest/20 text-forest font-bold text-xs hover:bg-forest/5 transition flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-ochre" />
            Issue Credential
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Students
          </span>
          <div className="mt-2 text-2xl font-black text-forest">{totalStudents}</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Enrolled cohort</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Source Docs
          </span>
          <div className="mt-2 text-2xl font-black text-forest">{totalDocuments}</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Anchored files</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Active Creds
          </span>
          <div className="mt-2 text-2xl font-black text-emerald-700">{activeCredentials}</div>
          <span className="text-[11px] text-emerald-600/80 block mt-0.5">On-chain valid</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Revoked
          </span>
          <div className="mt-2 text-2xl font-black text-red-700">{revokedCredentials}</div>
          <span className="text-[11px] text-red-700/80 block mt-0.5">Tombstoned</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            NFT Tokens
          </span>
          <div className="mt-2 text-2xl font-black text-forest">101</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">ERC-721 minted</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Verification Req
          </span>
          <div className="mt-2 text-2xl font-black text-ochre">389</div>
          <span className="text-[11px] text-forest/50 block mt-0.5">Employer checks</span>
        </div>
      </div>

      {/* Main Content Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent University Source Documents */}
        <div className="lg:col-span-2 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-forest/10 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-forest">
                Recent Academic Documents Attached
              </h2>
              <p className="text-xs text-forest/60 mt-0.5">
                Source documents registered with SHA-256 fingerprints under dean/registrar signature
              </p>
            </div>
            <Link
              href="/university/documents"
              className="text-xs font-bold text-ochre hover:underline flex items-center gap-1"
            >
              Document Center <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-forest/10">
            {documents.slice(0, 4).map((doc) => (
              <div key={doc.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-forest text-sm">{doc.studentName}</div>
                  <div className="text-forest/70 font-medium">{doc.documentType}</div>
                  <div className="font-mono text-[10px] text-forest/40 mt-0.5">
                    Hash: {doc.sha256Hash.slice(0, 20)}... | Doc #: {doc.documentNumber}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      doc.status === "VERIFIED"
                        ? "bg-emerald-100 text-emerald-800"
                        : doc.status === "REVOKED"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <div className="text-[10px] text-forest/40 mt-1">
                    {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "Active"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel: Authority & Fast Links */}
        <div className="space-y-6">
          <div className="bg-forest text-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-ochre" />
              Source of Authority Model
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              Only accredited universities can attach academic source records (SSLC, HSC, Marksheets, Transcripts, Degrees). Companies are strictly verifiers.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/70">
                <span>Authorized Issuers:</span>
                <strong className="text-white">42 Active Faculty</strong>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Signer Wallet:</span>
                <strong className="text-white font-mono">{currentInstitution.walletAddress || "0x71C...49A2"}</strong>
              </div>
            </div>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-1">
              Quick University Workflows
            </h4>
            <Link
              href="/university/documents/upload"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>Upload Document (15-Step Engine)</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
            <Link
              href="/university/students"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>Manage Student Cohort</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
            <Link
              href="/university/credentials"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>Credential Lifecycle & Revocation</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
            <Link
              href="/university/nfts"
              className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
            >
              <span>NFT Token Center (Polygon Amoy)</span>
              <ArrowRight className="w-3.5 h-3.5 text-ochre" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
