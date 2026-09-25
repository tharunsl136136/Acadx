"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  FileCheck2,
  Search,
  Filter,
  Plus,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Binary,
  QrCode,
  Eye,
  ArrowRight
} from "lucide-react";

export default function UniversityDocumentCenterPage() {
  const { documents } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = documents.filter((doc) => {
    const matchesSearch =
      doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || doc.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || doc.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = documents.length;
  const verifiedCount = documents.filter((d) => d.status === "VERIFIED").length;
  const pendingCount = documents.filter((d) => d.status === "PENDING_REVIEW").length;
  const revokedCount = documents.filter((d) => d.status === "REVOKED").length;

  return (
    <div className="p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-ochre" />
            Institutional Source Document Registry
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
            University Document Center
          </h1>
          <p className="mt-1 text-forest/75 text-sm max-w-xl">
            Authoritative repository of academic records (Degrees, Marksheets, Transcripts, Certificates) with immutable SHA-256 fingerprints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/university/documents/upload"
            className="px-5 py-3 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-ochre" />
            Upload & Validate Document
          </Link>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Total Documents
          </span>
          <div className="mt-2 text-2xl font-black text-forest">{totalCount}</div>
          <span className="text-[11px] text-forest/50">In institutional custody</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Verified Records
          </span>
          <div className="mt-2 text-2xl font-black text-emerald-700">{verifiedCount}</div>
          <span className="text-[11px] text-emerald-700/80">Passed 10-step checks</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Pending / Review
          </span>
          <div className="mt-2 text-2xl font-black text-amber-700">{pendingCount}</div>
          <span className="text-[11px] text-amber-700/80">Registrar queue</span>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-bold text-forest/60 uppercase tracking-wider block">
            Revoked Records
          </span>
          <div className="mt-2 text-2xl font-black text-red-700">{revokedCount}</div>
          <span className="text-[11px] text-red-700/80">Tombstone preserved</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, doc type, doc number or hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest/60">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Categories</option>
              <option value="UNDERGRADUATE">Undergraduate</option>
              <option value="POSTGRADUATE">Postgraduate</option>
              <option value="SCHOOL">School Documents (SSLC/HSC)</option>
              <option value="IDENTITY">Academic Identity</option>
              <option value="INTERNSHIP">Internship / Training</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest/60">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="REVOKED">Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Student & Document Type</th>
                <th className="py-3.5 px-6">Category & Doc #</th>
                <th className="py-3.5 px-6">SHA-256 Fingerprint</th>
                <th className="py-3.5 px-6">Authoritative Issuer</th>
                <th className="py-3.5 px-6">Integrity Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/10">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-forest/5 transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-forest text-sm">{doc.studentName}</div>
                    <div className="text-forest/80 font-medium">{doc.documentType}</div>
                    <div className="text-[10px] text-forest/40 font-mono mt-0.5">
                      File: {doc.fileName} ({doc.fileSize})
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-forest/5 text-forest/70 border border-forest/10">
                      {doc.category}
                    </span>
                    <div className="font-mono font-bold text-forest mt-1">
                      {doc.documentNumber}
                    </div>
                    <div className="text-[10px] text-forest/40">
                      Year: {doc.academicYear}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-forest/90 bg-forest/5 px-2 py-1 rounded border border-forest/10 max-w-xs truncate">
                      <span className="truncate">{doc.sha256Hash}</span>
                      <button
                        onClick={() => copyHash(doc.sha256Hash, doc.id)}
                        className="text-forest/60 hover:text-ochre shrink-0 p-0.5"
                        title="Copy SHA-256 Fingerprint"
                      >
                        {copiedId === doc.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="text-[10px] text-forest/40 mt-1">
                      IPFS: {doc.ipfsCid.slice(0, 14)}...
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-forest">{doc.uploadedBy}</div>
                    <div className="text-forest/50 text-[10px]">
                      {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "Historical"}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        doc.status === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800"
                          : doc.status === "REVOKED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {doc.status === "VERIFIED" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          VERIFIED
                        </>
                      ) : doc.status === "REVOKED" ? (
                        <>
                          <XCircle className="w-3 h-3 text-red-600" />
                          REVOKED
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          PENDING REVIEW
                        </>
                      )}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/university/documents/${doc.id}`}
                        className="px-2.5 py-1.5 rounded-lg bg-forest/5 hover:bg-forest/10 border border-forest/10 text-forest font-bold text-[11px] transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-ochre" />
                        Dossier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
