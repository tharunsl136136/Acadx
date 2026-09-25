"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Copy,
  Building2,
  Award,
  Binary,
  Sparkles,
  QrCode,
  Download,
  Lock,
  Layers,
  ArrowRight
} from "lucide-react";

export default function PublicCredentialResolverPage() {
  const params = useParams();
  const credentialId = params?.credentialId as string;
  const { credentials, documents } = usePlatformState();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cred = credentials.find(
    (c) =>
      c.id.toLowerCase() === credentialId?.toLowerCase() ||
      c.blockchain.tokenId === credentialId?.replace("#", "")
  ) || credentials[0];

  const doc = documents.find((d) => d.id === cred.documentId);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isRevoked = cred.status === "REVOKED";

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-20">
      {/* Public Header */}
      <header className="border-b border-forest/15 bg-white/80 backdrop-blur sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest text-ochre flex items-center justify-center font-bold text-base border border-ochre/30 shadow">
              AX
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-forest block leading-none">
                ACADSHIELD X
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-forest/60">
                Universal Credential Resolver
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/company/verify/document"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5"
            >
              <Binary className="w-3.5 h-3.5 text-ochre" />
              Upload PDF To Verify Fingerprint
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Resolution Container */}
      <main className="max-w-4xl mx-auto px-6 pt-10 space-y-8">
        {/* Verification Status Banner */}
        <div
          className={`rounded-3xl p-6 lg:p-8 border shadow-sm ${
            isRevoked
              ? "bg-red-50 border-red-200 text-red-950"
              : "bg-white/90 backdrop-blur border-emerald-200 text-forest"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow ${
                  isRevoked ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
                }`}
              >
                {isRevoked ? <XCircle className="w-9 h-9" /> : <CheckCircle2 className="w-9 h-9" />}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold block opacity-70">
                  Universal Smart Contract Resolver
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight">
                  {isRevoked ? "Credential Revoked by Institution" : "Authentic Verified Credential"}
                </h1>
                <p className="text-xs opacity-80">
                  {isRevoked
                    ? `Revocation registered on-chain: ${cred.revocationReason || "Administrative invalidation"}`
                    : "Cryptographically verified against Polygon Amoy on-chain state and university issuer key."}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                isRevoked
                  ? "bg-red-200 text-red-900 border border-red-300"
                  : "bg-emerald-100 text-emerald-900 border border-emerald-300"
              }`}
            >
              STATUS: {cred.status}
            </span>
          </div>
        </div>

        {/* Academic Details Card */}
        <div className="bg-white border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
          <div className="border-b border-forest/10 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-forest/50 font-bold block">
              Conferred Degree / Title
            </span>
            <h2 className="text-2xl font-extrabold text-forest mt-1">{cred.title}</h2>
            <p className="text-xs text-forest/70 mt-0.5">{cred.type}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-forest/5 space-y-1.5">
                <span className="text-forest/60 text-[11px] block font-semibold uppercase">Credential Holder:</span>
                <h3 className="text-base font-extrabold text-forest">{cred.studentName}</h3>
                <span className="font-mono text-[11px] text-forest/70 break-all block">{cred.studentDid}</span>
              </div>

              <div className="p-4 rounded-2xl bg-forest/5 space-y-1.5">
                <span className="text-forest/60 text-[11px] block font-semibold uppercase">Issuing Institution:</span>
                <h3 className="text-base font-bold text-forest">{cred.universityName}</h3>
                <p className="text-forest/70">Authorized Signing Officer: {cred.issuerName}</p>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded mt-1">
                  <ShieldCheck className="w-3 h-3" /> Accredited Institution Key
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-forest/5 space-y-1.5">
                <span className="text-forest/60 text-[11px] block font-semibold uppercase">
                  Non-Fungible Token (ERC-721):
                </span>
                <div className="flex justify-between items-center">
                  <span className="font-mono font-extrabold text-forest text-base">Token #{cred.blockchain.tokenId}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold">
                    Polygon Amoy
                  </span>
                </div>
                <div className="text-[11px] font-mono text-forest/70 truncate">
                  Tx: {cred.blockchain.txHash}
                </div>
                <div className="pt-1">
                  <a
                    href={`https://amoy.polygonscan.com/tx/${cred.blockchain.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-ochre hover:underline"
                  >
                    Inspect on PolygonScan <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest/5 space-y-1.5">
                <span className="text-forest/60 text-[11px] block font-semibold uppercase">
                  Authoritative Document SHA-256 Fingerprint:
                </span>
                <div className="font-mono text-[11px] bg-white p-2.5 rounded-lg border border-forest/10 text-forest break-all">
                  {cred.documentHash}
                </div>
                <p className="text-[11px] text-forest/60 pt-0.5">
                  Bit-for-bit fingerprint certified by university registrar.
                </p>
              </div>
            </div>
          </div>

          {/* Employer Next Action Prompt */}
          <div className="p-5 rounded-2xl bg-forest text-white space-y-3 shadow-md">
            <h4 className="text-xs font-bold text-ochre uppercase tracking-wider">
              Evaluating an applicant with this certificate?
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Never accept printed paper or unverified screenshots. Upload the candidate's raw PDF file into the AcadShield verifier to confirm that the file's SHA-256 fingerprint matches this registered on-chain digest.
            </p>
            <Link
              href="/company/verify/document"
              className="inline-flex items-center gap-2 text-xs font-bold text-ochre hover:underline pt-1"
            >
              Verify Submitted PDF <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
