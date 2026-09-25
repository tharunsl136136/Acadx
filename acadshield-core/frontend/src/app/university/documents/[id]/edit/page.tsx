"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import { Edit3, ArrowLeft, History, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function DocumentEditPage() {
  const params = useParams();
  const router = useRouter();
  const docId = (params?.id as string) || "doc_mit_degree_001";
  const { documents } = usePlatformState();

  const doc = documents.find((d) => d.id === docId) || documents[0];

  const [reason, setReason] = useState("Administrative typographical correction on honors classification");
  const [newGrade, setNewGrade] = useState("First Class with High Honors (GPA: 4.98/5.0)");
  const [updatedBy, setUpdatedBy] = useState("Prof. Arthur Pendelton (Dean of Engineering)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [versionCreated, setVersionCreated] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setVersionCreated(true);
    }, 1000);
  };

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
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight headline-shadow font-serif">
          Create Non-Destructive Version Update
        </h1>
        <p className="text-xs text-forest/70">
          AcadShield preserves immutable historical records. Any update generates a new version (Version 2) while superseding Version 1.
        </p>
      </div>

      {!versionCreated ? (
        <form onSubmit={handleUpdate} className="bg-white border-2 border-forest/15 rounded-3xl p-8 shadow-sm space-y-6 text-xs">
          {/* Version Diff Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 space-y-2">
              <span className="font-bold uppercase tracking-wider text-forest/50 text-[10px] block">
                Current State (Version 1 � Immutable)
              </span>
              <div className="font-bold text-sm text-forest">{doc.documentType}</div>
              <div className="text-forest/60 font-mono text-[11px] truncate">Hash: {doc.sha256Hash}</div>
              <div className="text-forest/70">Serial: {doc.documentNumber}</div>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-ochre/10 border border-ochre/30 space-y-2">
              <span className="font-bold uppercase tracking-wider text-ochre text-[10px] block">
                Proposed State (Version 2 � New Version Reference)
              </span>
              <div className="font-bold text-sm text-forest">{doc.documentType}</div>
              <div className="text-forest/60 font-mono text-[11px] truncate">
                Hash: 0x8a9b7c12... (Recalculated)
              </div>
              <div className="text-forest/70">Updated Honors: {newGrade}</div>
              <span className="inline-block px-2 py-0.5 rounded bg-forest text-ochre text-[10px] font-bold">
                WILL BECOME ACTIVE
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-forest/10">
            <div>
              <label className="block font-bold text-forest mb-1">
                Mandatory Reason for Update *
              </label>
              <textarea
                rows={2}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs focus:outline-none focus:ring-2 focus:ring-ochre"
              />
            </div>

            <div>
              <label className="block font-bold text-forest mb-1">
                Updated Academic Result / Honors
              </label>
              <input
                type="text"
                required
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs focus:outline-none focus:ring-2 focus:ring-ochre"
              />
            </div>

            <div>
              <label className="block font-bold text-forest mb-1">
                Authorized Signatory / Registrar
              </label>
              <input
                type="text"
                required
                value={updatedBy}
                onChange={(e) => setUpdatedBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs focus:outline-none focus:ring-2 focus:ring-ochre"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-forest/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest/90 text-white font-bold shadow-md transition flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Signing Version 2 Anchor...</span>
              ) : (
                <>
                  <span>Commit Version 2 & Inscribe Audit Event</span>
                  <ArrowRight className="w-4 h-4 text-ochre" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-10 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-black text-forest">
            Version 2 Successfully Registered!
          </h2>
          <p className="text-xs text-forest/75 max-w-lg mx-auto leading-relaxed">
            The updated record has been anchored. Version 1 is marked as <strong>SUPERSEDED</strong> and preserved in the immutable version history.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Link
              href={`/university/documents/${doc.id}`}
              className="px-5 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow"
            >
              Return to Document Dossier
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
