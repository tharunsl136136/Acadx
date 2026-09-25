"use client";

import React from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  ShieldAlert,
  Building2,
  Briefcase,
  Users,
  Award,
  FileCheck2,
  History,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Flame
} from "lucide-react";

export default function AdminDashboardPage() {
  const { institutions, companies, students, documents, credentials, verifications, auditLogs } =
    usePlatformState();

  const totalUniversities = institutions.length;
  const verifiedUniversities = institutions.filter((i) => i.status === "VERIFIED").length;
  const pendingUniversities = institutions.filter((i) => i.status === "PENDING").length;
  const suspendedUniversities = institutions.filter((i) => i.status === "SUSPENDED").length;

  const totalCompanies = companies.length;
  const verifiedCompanies = companies.filter((c) => c.status === "VERIFIED").length;

  const activeCreds = credentials.filter((c) => c.status === "ACTIVE").length;
  const revokedCreds = credentials.filter((c) => c.status === "REVOKED").length;

  const successfulVerifs = verifications.filter((v) => v.result === "VERIFIED").length;
  const failedVerifs = verifications.filter((v) => v.result !== "VERIFIED").length;

  return (
    <div className="text-forest pb-24">
      

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/40 backdrop-blur px-6 py-6 rounded-2xl mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-xs font-semibold text-red-900 mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              Universal Governance Console � Platform Superadmin
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              AcadShield X Trust Network
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Global oversight across institutional issuers, enterprise verifiers, immutable document hashes, and security logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/universities"
              className="px-4 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-ochre" />
              Manage Universities ({pendingUniversities} Pending)
            </Link>
            <Link
              href="/admin/audit"
              className="px-4 py-2.5 rounded-xl border border-forest/20 text-forest font-bold text-xs hover:bg-forest/5 transition flex items-center gap-1.5"
            >
              <History className="w-4 h-4 text-ochre" />
              Audit Center
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Platform Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Institutions</span>
            <div className="mt-2 text-2xl font-black text-forest">{totalUniversities}</div>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
              {verifiedUniversities} Verified � {pendingUniversities} Pending
            </span>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Companies</span>
            <div className="mt-2 text-2xl font-black text-forest">{totalCompanies}</div>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
              {verifiedCompanies} Active Verifiers
            </span>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Students</span>
            <div className="mt-2 text-2xl font-black text-forest">{students.length}</div>
            <span className="text-[11px] text-forest/50 block mt-0.5">DIDs on Network</span>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Credentials</span>
            <div className="mt-2 text-2xl font-black text-emerald-700">{activeCreds}</div>
            <span className="text-[11px] text-red-600 font-semibold block mt-0.5">
              {revokedCreds} Revoked Tombstones
            </span>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Documents</span>
            <div className="mt-2 text-2xl font-black text-forest">{documents.length}</div>
            <span className="text-[11px] text-forest/50 block mt-0.5">Hashed & Anchored</span>
          </div>

          <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] font-bold text-forest/60 uppercase">Verifications</span>
            <div className="mt-2 text-2xl font-black text-forest">{verifications.length}</div>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
              {successfulVerifs} Clean Matches
            </span>
          </div>
        </div>

        {/* Pending Actions & Governance Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4 mb-4">
              <div>
                <h2 className="text-base font-bold text-forest">
                  Global Immutable Audit Activity
                </h2>
                <p className="text-xs text-forest/60 mt-0.5">
                  Append-only ledger recording all actor events, status shifts, and cryptographic anchors
                </p>
              </div>
              <Link
                href="/admin/audit"
                className="text-xs font-bold text-ochre hover:underline flex items-center gap-1"
              >
                View Full Log <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-forest/10">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        log.result === "SUCCESS"
                          ? "bg-emerald-500"
                          : log.result === "WARNING"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <div className="font-bold text-forest">{log.action}</div>
                      <div className="text-[11px] text-forest/70">{log.details}</div>
                      <div className="font-mono text-[10px] text-forest/40">
                        Actor: {log.actor} ({log.role})
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-forest/50">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div className="space-y-6">
            <div className="bg-forest text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-ochre" />
                Platform Rule Enforcement
              </h3>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Admins govern network accreditation, API quotas, and platform trust standards. Any state mutation produces an unforgeable audit entry.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-white/80">
                  <span>Smart Contract Network:</span>
                  <strong className="text-ochre">Polygon Amoy</strong>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span>Audit Guarantee:</span>
                  <strong className="text-white">Append-Only</strong>
                </div>
              </div>
            </div>

            <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm space-y-2.5">
              <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Governance Hubs
              </h4>
              <Link
                href="/admin/universities"
                className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
              >
                <span>Accreditation Center (Universities)</span>
                <ArrowRight className="w-3.5 h-3.5 text-ochre" />
              </Link>
              <Link
                href="/admin/companies"
                className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
              >
                <span>Corporate Verifiers Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-ochre" />
              </Link>
              <Link
                href="/admin/documents"
                className="w-full py-2.5 px-3 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-bold text-forest flex items-center justify-between transition"
              >
                <span>Global Document Hash Register</span>
                <ArrowRight className="w-3.5 h-3.5 text-ochre" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
