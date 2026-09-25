"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import {
  FileCheck2,
  ShieldCheck,
  Binary,
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronLeft,
  Copy,
  Download,
  Building2,
  Users,
  Clock,
  Sparkles
} from "lucide-react";

export default function VerificationDossierPage() {
  const params = useParams();
  const verifId = params?.id as string;
  const { verifications } = usePlatformState();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const verif = verifications.find((v) => v.id === verifId) || verifications[0];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isMatch = verif.registeredHash === verif.submittedHash;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/company/verifications"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest/70 hover:text-forest transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Verification History
        </Link>
        <button
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(verif, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `verification-dossier-${verif.id}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5 transition"
        >
          <Download className="w-3.5 h-3.5 text-ochre" />
          Export Verification Audit JSON
        </button>
      </div>

      {/* Verification Header Banner */}
      <div className="bg-white/80 backdrop-blur border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow ${
                verif.result === "VERIFIED"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {verif.result === "VERIFIED" ? (
                <CheckCircle2 className="w-9 h-9" />
              ) : (
                <AlertTriangle className="w-9 h-9" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-forest/50 font-bold">
                  Dossier ID: {verif.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    verif.result === "VERIFIED"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {verif.result}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-forest tracking-tight">
                {verif.documentType}
              </h1>
              <p className="text-forest/70 text-xs font-medium">
                Evaluated for candidate <strong className="text-forest">{verif.candidateName}</strong>   Issuing Entity:{" "}
                <strong className="text-forest">{verif.universityName}</strong>
              </p>
            </div>
          </div>

          <div className="p-4 bg-forest/5 rounded-2xl border border-forest/10 text-xs space-y-1">
            <div className="text-forest/60 text-[11px]">Evaluation Timestamp:</div>
            <div className="font-bold text-forest">{new Date(verif.verificationTime).toLocaleString()}</div>
            <div className="text-[11px] text-forest/60 pt-1">Evaluating Enterprise:</div>
            <div className="font-semibold text-forest">{verif.companyName}</div>
          </div>
        </div>
      </div>

      {/* Side-by-Side SHA-256 Fingerprint Inspection */}
      <div className="bg-white border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-extrabold text-forest">SHA-256 Cryptographic Fingerprint Comparison</h3>
          <p className="text-xs text-forest/70 mt-0.5">
            Bit-for-bit comparison between the authoritative university ledger hash and the raw document submitted by the candidate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-forest/5 border border-forest/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60">
                Authoritative Registered Hash
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                UNIVERSITY LEDGER
              </span>
            </div>
            <div className="font-mono text-xs text-forest break-all bg-white p-3 rounded-xl border border-forest/10">
              {verif.registeredHash}
            </div>
            <p className="text-[11px] text-forest/60">Registered by registrar upon graduation confirmation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-forest/5 border border-forest/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest/60">
                Candidate-Submitted File Hash
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  isMatch ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}
              >
                {isMatch ? "EXACT MATCH" : "MISMATCH"}
              </span>
            </div>
            <div
              className={`font-mono text-xs break-all bg-white p-3 rounded-xl border ${
                isMatch ? "border-emerald-300 text-forest" : "border-red-300 text-red-900"
              }`}
            >
              {verif.submittedHash}
            </div>
            <p className="text-[11px] text-forest/60">
              {isMatch
                ? "Cryptographic digest matches byte-for-byte."
                : "The submitted file does not match the document fingerprint registered by the issuing institution."}
            </p>
          </div>
        </div>

        {/* Verification Checkpoints Matrix */}
        <div className="border-t border-forest/10 pt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest/60">
            Automated Multi-Point Integrity Checkpoints
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-forest/5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Institutional Key Valid</span>
            </div>
            <div className="p-3 bg-forest/5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>W3C VC Signature Match</span>
            </div>
            <div className="p-3 bg-forest/5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ERC-721 Token Bound</span>
            </div>
            <div className="p-3 bg-forest/5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Polygon Amoy Consensus</span>
            </div>
          </div>
        </div>

        {/* Blockchain Evidence Card */}
        <div className="p-4 rounded-2xl bg-white border border-forest/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-forest uppercase tracking-wider">Blockchain Anchor</span>
            <a
              href={`https://amoy.polygonscan.com/tx/${verif.blockchainTx}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-ochre hover:underline flex items-center gap-1"
            >
              PolygonScan <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="font-mono text-xs text-forest/70 break-all bg-forest/5 p-2 rounded-lg">
            Tx: {verif.blockchainTx}
          </div>
        </div>
      </div>
    </div>
  );
}
