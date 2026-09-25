"use client";

import React, { useState } from "react";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  History,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Filter,
  ShieldCheck,
  Binary
} from "lucide-react";

export default function AdminAuditCenterPage() {
  const { auditLogs } = usePlatformState();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());

    if (roleFilter === "ALL") return matchesSearch;
    return matchesSearch && log.role === roleFilter;
  });

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="ADMIN" />

      {/* Header */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <History className="w-3.5 h-3.5 text-ochre" />
              Cryptographic Audit Center • Append-Only Ledger
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Immutable Platform Audit Log
            </h1>
            <p className="mt-1 text-forest/75 text-sm max-w-xl">
              Cryptographically timestamped record of every administrative governance action, institutional document upload, credential issuance, and company verification check.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Audit log export generated: acadshield_audit_export.csv")}
              className="px-4 py-2.5 rounded-xl border border-forest/20 text-forest font-bold text-xs hover:bg-forest/5 transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-ochre" />
              Export Audit Trail (CSV)
            </button>
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
              placeholder="Search by actor, action type, entity ID, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-forest/60">Actor Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-forest/20 bg-forest/5 text-xs font-medium text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
            >
              <option value="ALL">All Roles ({auditLogs.length})</option>
              <option value="ADMIN">Universal Admin</option>
              <option value="ISSUER">University Issuer</option>
              <option value="COMPANY">Company Verifier</option>
              <option value="SYSTEM">System Automations</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white border border-forest/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest/5 border-b border-forest/10 text-forest/70 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Timestamp & Event ID</th>
                  <th className="py-3.5 px-6">Actor & Role</th>
                  <th className="py-3.5 px-6">Action & Entity</th>
                  <th className="py-3.5 px-6">Audit Details</th>
                  <th className="py-3.5 px-6">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 font-sans">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-forest/5 transition">
                    <td className="py-4 px-6 font-mono text-[11px]">
                      <div className="font-bold text-forest">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-forest/50 text-[10px]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-forest/40 text-[9px] mt-0.5">{log.id}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-forest">{log.actor}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-forest/5 text-forest/70 border border-forest/10">
                        {log.role}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-forest font-mono text-[11px]">
                        {log.action}
                      </div>
                      <div className="text-forest/50 text-[10px] font-mono">
                        {log.entity}: {log.entityId}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-forest/80 leading-relaxed max-w-md">
                        {log.details}
                      </p>
                      {log.txHash && (
                        <div className="font-mono text-[10px] text-ochre mt-1 truncate max-w-xs">
                          Tx: {log.txHash}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          log.result === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-800"
                            : log.result === "WARNING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.result === "SUCCESS" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            SUCCESS
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            WARNING
                          </>
                        )}
                      </span>
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
