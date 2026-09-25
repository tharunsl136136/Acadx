"use client";

import React, { useState } from "react";
import Link from "next/link";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  Building2,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Ban,
  Check,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default function AdminUniversitiesPage() {
  const { institutions, updateInstitutionStatus } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = institutions.filter((inst) => {
    const matchesSearch =
      inst.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.country.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && inst.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="ADMIN" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <Building2 className="w-3.5 h-3.5 text-ochre" />
              Platform Governance • Institutional Accreditation
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              University Accreditation Directory
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Inspect higher education institutions requesting issuance authority on AcadShield X. Approve accredited universities or suspend fraudulent actors.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by legal name, official domain, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-forest/60">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Statuses ({institutions.length})</option>
              <option value="VERIFIED">Verified ({institutions.filter(i => i.status === "VERIFIED").length})</option>
              <option value="PENDING">Pending Review ({institutions.filter(i => i.status === "PENDING").length})</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {/* Universities Table */}
        <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Institution & Legal Name</th>
                  <th className="py-3.5 px-6">Domain & Jurisdiction</th>
                  <th className="py-3.5 px-6">Accreditation Body</th>
                  <th className="py-3.5 px-6">Network Scale</th>
                  <th className="py-3.5 px-6">Current Status</th>
                  <th className="py-3.5 px-6 text-right">Admin Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((inst) => (
                  <tr key={inst.id} className="hover:bg-forest/5 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-forest text-sm">{inst.legalName}</div>
                      <div className="text-[11px] text-forest/60">{inst.type}</div>
                      <div className="font-mono text-[10px] text-forest/40">ID: {inst.id}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-mono font-semibold text-forest">{inst.domain}</div>
                      <div className="text-forest/60 text-[11px]">
                        {inst.city}, {inst.country}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-medium text-forest">
                        {inst.accreditationBody || "Ministry of Education"}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-forest">
                        <strong>{inst.studentsCount.toLocaleString()}</strong> Students
                      </div>
                      <div className="text-forest/60 text-[10px]">
                        {inst.documentsCount} Docs • {inst.issuersCount} Issuers
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          inst.status === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : inst.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {inst.status === "VERIFIED" ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            VERIFIED ACCREDITED
                          </>
                        ) : inst.status === "PENDING" ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            PENDING REVIEW
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            SUSPENDED
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inst.status === "PENDING" && (
                          <button
                            onClick={() => updateInstitutionStatus(inst.id, "VERIFIED")}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}
                        {inst.status === "VERIFIED" && (
                          <button
                            onClick={() => updateInstitutionStatus(inst.id, "SUSPENDED")}
                            className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-[11px] transition flex items-center gap-1"
                          >
                            <Ban className="w-3.5 h-3.5" /> Suspend
                          </button>
                        )}
                        {inst.status === "SUSPENDED" && (
                          <button
                            onClick={() => updateInstitutionStatus(inst.id, "VERIFIED")}
                            className="px-2.5 py-1.5 rounded-lg bg-forest text-white font-bold text-[11px] transition flex items-center gap-1"
                          >
                            Reactivate
                          </button>
                        )}
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
