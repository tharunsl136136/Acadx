"use client";

import React, { useState } from "react";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History,
  ShieldCheck,
  QrCode,
  ExternalLink,
  Ban,
  FileCheck2,
  Clock,
  Sparkles
} from "lucide-react";

export default function UniversityCredentialsPage() {
  const { credentials, revokeCredential } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCredForRevoke, setSelectedCredForRevoke] = useState<any>(null);
  const [revokeReason, setRevokeReason] = useState<string>("Administrative correction");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const filtered = credentials.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.documentHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExecuteRevocation = () => {
    if (!selectedCredForRevoke) return;
    setIsRevoking(true);
    setTimeout(() => {
      const finalReason = customNotes ? `${revokeReason}: ${customNotes}` : revokeReason;
      revokeCredential(selectedCredForRevoke.id, finalReason);
      setIsRevoking(false);
      setSelectedCredForRevoke(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="UNIVERSITY" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <Award className="w-3.5 h-3.5 text-ochre" />
              Verifiable Credential Lifecycle
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Issued Academic Credentials
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Manage cryptographic credentials anchored to Polygon Amoy. Supports multi-version history and transparent, non-destructive revocation audits.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        {/* Search */}
        <div className="bg-white border border-forest/10 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by credential title, student name, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            />
          </div>
          <span className="text-xs font-bold text-forest/60">
            {filtered.length} Authoritative Credentials
          </span>
        </div>

        {/* Credentials Table */}
        <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Credential & Student</th>
                  <th className="py-3.5 px-6">Issuing Officer</th>
                  <th className="py-3.5 px-6">Version & Blockchain</th>
                  <th className="py-3.5 px-6">Lifecycle Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((cred) => (
                  <tr key={cred.id} className="hover:bg-forest/5 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-forest text-sm">{cred.title}</div>
                      <div className="text-forest/70 font-medium">{cred.studentName}</div>
                      <div className="font-mono text-[10px] text-forest/40 truncate max-w-xs mt-0.5">
                        ID: {cred.id} • Hash: {cred.documentHash.slice(0, 16)}...
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-semibold text-forest">{cred.issuerName}</div>
                      <div className="text-forest/50 text-[10px]">
                        Issued: {new Date(cred.issueDate).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-forest/5 border border-forest/10 text-forest/70">
                        Version {cred.version} (Immutable)
                      </span>
                      <div className="font-mono text-[10px] text-forest/50 mt-1">
                        Token #{cred.blockchain.tokenId} • {cred.blockchain.network}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          cred.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {cred.status === "ACTIVE" ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ACTIVE
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            REVOKED
                          </>
                        )}
                      </span>
                      {cred.revocationReason && (
                        <div className="text-[10px] text-red-600/80 mt-1 max-w-xs italic truncate">
                          Reason: {cred.revocationReason}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      {cred.status === "ACTIVE" ? (
                        <button
                          onClick={() => setSelectedCredForRevoke(cred)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs transition flex items-center gap-1.5 ml-auto"
                        >
                          <Ban className="w-3.5 h-3.5" /> Revoke
                        </button>
                      ) : (
                        <span className="text-[11px] text-forest/40 font-mono">
                          Revoked • Log Preserved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Revocation Modal */}
      {selectedCredForRevoke && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-forest/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-forest/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-forest">
                  Revoke Academic Credential
                </h3>
                <span className="text-xs text-forest/60">
                  Institutional Transparency • Immutable Audit Trail
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <div className="font-bold">Target: {selectedCredForRevoke.title}</div>
              <div>Student: {selectedCredForRevoke.studentName}</div>
              <div className="font-mono text-[10px]">ID: {selectedCredForRevoke.id}</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest mb-1">
                Select Mandatory Revocation Reason *
              </label>
              <select
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                <option value="Administrative correction">Administrative correction</option>
                <option value="Duplicate issuance">Duplicate issuance</option>
                <option value="Incorrect information">Incorrect information</option>
                <option value="Credential withdrawn">Credential withdrawn</option>
                <option value="Academic record correction">Academic record correction</option>
                <option value="Institutional action">Institutional disciplinary action</option>
                <option value="Other verified cause">Other verified cause</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest mb-1">
                Supporting Explanation / Audit Notes
              </label>
              <textarea
                rows={2}
                placeholder="Provide detailed registrar justification..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="text-[11px] text-forest/60 bg-forest/5 p-3 rounded-xl border border-forest/10">
              <strong>Audit Guarantee: </strong> Historical versions are preserved. A cryptographic revocation tombstone will immediately inform verifiers querying this record.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-forest/10">
              <button
                onClick={() => setSelectedCredForRevoke(null)}
                className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteRevocation}
                disabled={isRevoking}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                {isRevoking ? "Signing Revocation..." : "Confirm Revocation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
