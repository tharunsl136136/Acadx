"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import { History, ArrowLeft, CheckCircle2, ShieldCheck, Binary } from "lucide-react";

export default function DocumentHistoryPage() {
  const params = useParams();
  const docId = (params?.id as string) || "doc_mit_degree_001";
  const { documents } = usePlatformState();

  const doc = documents.find((d) => d.id === docId) || documents[0];

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-forest/15">
        <Link
          href={`/university/documents/${doc.id}`}
          className="text-xs font-bold text-forest/60 hover:text-forest flex items-center gap-1.5 transition mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Document Dossier
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight headline-shadow font-serif">
            Document Version History & Lineage
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest text-ochre">
            IMMUTABLE AUDIT TRAIL
          </span>
        </div>
        <p className="text-xs text-forest/70">
          Historical versions are preserved forever to guarantee transparent credential lineage and prevent revisionist fraud.
        </p>
      </div>

      {/* Version Timeline */}
      <div className="space-y-4">
        {doc.versions && doc.versions.length > 0 ? (
          doc.versions.map((ver, idx) => (
            <div
              key={ver.versionNumber}
              className={`bg-white border rounded-2xl p-6 shadow-sm space-y-3 ${
                ver.status === "ACTIVE"
                  ? "border-emerald-500 ring-2 ring-emerald-500/10"
                  : "border-forest/15 opacity-85"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-forest/10">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-forest text-ochre font-bold text-xs flex items-center justify-center font-mono">
                    v{ver.versionNumber}
                  </span>
                  <span className="font-bold text-sm text-forest">
                    Version {ver.versionNumber} {ver.status === "ACTIVE" ? "(Current Authoritative)" : "(Superseded)"}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    ver.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-forest/10 text-forest/70"
                  }`}
                >
                  {ver.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-forest/70">
                  <span>Anchored Timestamp:</span>
                  <strong className="text-forest font-mono">
                    {new Date(ver.uploadedAt).toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span className="text-forest/60 text-[11px] block">Cryptographic SHA-256 Fingerprint:</span>
                  <div className="font-mono text-[11px] text-forest/90 bg-forest/5 p-2 rounded-lg break-all select-all mt-0.5">
                    {ver.sha256Hash}
                  </div>
                </div>
                {ver.reason && (
                  <div className="text-[11px] italic text-forest/70 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    Reason: {ver.reason}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white rounded-2xl border border-forest/15 text-xs text-forest/60 text-center">
            Initial version registered. No subsequent revisions recorded.
          </div>
        )}
      </div>
    </div>
  );
}
