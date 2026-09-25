"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatformState } from "@/lib/platform-state";
import {
  KeyRound,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronLeft,
  Copy,
  Building2,
  Award,
  Binary,
  Sparkles,
  QrCode,
  Download
} from "lucide-react";

export default function CompanyVerifyCredentialPage() {
  const { credentials, documents, addVerification } = usePlatformState();

  const [query, setQuery] = useState("CRED-2024-001");
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const matchedCred = credentials.find(
    (c) =>
      c.id.toLowerCase() === query.trim().toLowerCase() ||
      c.studentDid.toLowerCase() === query.trim().toLowerCase() ||
      c.blockchain.tokenId === query.trim().replace("#", "")
  );

  const matchedDoc = matchedCred ? documents.find((d) => d.id === matchedCred.documentId) : null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (matchedCred) {
      addVerification({
        id: "ver_" + Math.random().toString(36).substring(2, 9),
        companyId: "comp_01",
        companyName: "Anthropic PBC",
        candidateName: matchedCred.studentName,
        candidateId: "cand_01",
        credentialId: matchedCred.id,
        documentId: matchedCred.documentId,
        documentType: matchedCred.type,
        result: matchedCred.status === "ACTIVE" ? "VERIFIED" : "REVOKED",
        verificationTime: new Date().toISOString(),
        registeredHash: matchedCred.documentHash,
        submittedHash: matchedCred.documentHash,
        issuerName: matchedCred.issuerName,
        universityName: matchedCred.universityName,
        blockchainTx: matchedCred.blockchain.txHash,
        aiRiskSignal: "LOW",
        notes: "Direct Credential ID resolution against Polygon Amoy registry."
      });
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/company/verify"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest/70 hover:text-forest transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Verification Hub
        </Link>
        <Link
          href="/company/verify/document"
          className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5"
        >
          <Binary className="w-3.5 h-3.5 text-ochre" />
          Verify by Raw Document Upload
        </Link>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-semibold text-forest mb-2">
          <KeyRound className="w-3.5 h-3.5 text-ochre" />
          On-Chain Credential Resolver
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
          Verify by Credential ID or Token
        </h1>
        <p className="text-forest/70 text-sm mt-1 max-w-2xl">
          Instantly query the universal smart contract registry to verify academic title validity, non-revocation status, and issuing authority keys.
        </p>
      </div>

      {/* Query Form */}
      <div className="bg-white/80 backdrop-blur border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm space-y-4">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
              Enter Credential Identifier, Token #, or Holder DID:
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-forest/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. CRED-2024-001 or did:acadshield:student:STU-001 or 10245"
                className="w-full pl-11 pr-32 py-3.5 rounded-2xl border border-forest/20 bg-forest/5 text-forest font-mono text-sm focus:outline-none focus:border-forest font-medium"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-forest hover:bg-forest/90 text-white font-bold text-xs transition"
              >
                Resolve
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-forest/60">
            <span>Quick test IDs:</span>
            {credentials.slice(0, 3).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setQuery(c.id);
                  setSearched(false);
                }}
                className="px-2 py-0.5 rounded bg-forest/5 hover:bg-forest/10 text-forest font-mono text-[11px] underline"
              >
                {c.id}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-6">
          {matchedCred ? (
            <div className="bg-white border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-forest/10 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${
                      matchedCred.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {matchedCred.status === "ACTIVE" ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      <XCircle className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-forest/50 font-bold block">
                      Verification Result
                    </span>
                    <h2 className="text-xl font-extrabold text-forest">
                      {matchedCred.status === "ACTIVE"
                        ? "Valid Verifiable Credential"
                        : "Revoked Institutional Credential"}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      matchedCred.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-red-100 text-red-900 border border-red-300"
                    }`}
                  >
                    STATUS: {matchedCred.status}
                  </span>
                </div>
              </div>

              {/* Credential Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px] block">
                      Credential Conferred
                    </span>
                    <h3 className="text-base font-extrabold text-forest">{matchedCred.title}</h3>
                    <p className="text-forest/70">{matchedCred.type}</p>
                    <div className="pt-2 text-forest/60">
                      Issue Date: <strong className="text-forest">{matchedCred.issueDate}</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-forest/15 space-y-2">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px] block">
                      Accredited Issuing Authority
                    </span>
                    <h4 className="text-sm font-bold text-forest">{matchedCred.universityName}</h4>
                    <p className="text-forest/70">Authorized Signer: {matchedCred.issuerName}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Institutional Public Key Verified
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px] block">
                      Holder Identity (DID)
                    </span>
                    <h4 className="text-sm font-bold text-forest">{matchedCred.studentName}</h4>
                    <span className="font-mono text-[11px] text-forest/70 break-all block">
                      {matchedCred.studentDid}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-forest/15 space-y-2">
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px] block">
                      Blockchain Provenance (Polygon Amoy)
                    </span>
                    <div className="space-y-1 font-mono text-[11px] text-forest/80">
                      <div>Token ID: <strong className="text-forest">#{matchedCred.blockchain.tokenId}</strong></div>
                      <div className="truncate">Tx: {matchedCred.blockchain.txHash}</div>
                      <div>Block: {matchedCred.blockchain.blockNumber}</div>
                    </div>
                    <a
                      href={`https://amoy.polygonscan.com/tx/${matchedCred.blockchain.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-ochre hover:underline pt-1"
                    >
                      Inspect on PolygonScan <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Registered Document Fingerprint */}
              <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2">
                <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">
                  Authoritative Registered Document SHA-256 Fingerprint:
                </span>
                <div className="font-mono text-xs bg-white p-3 rounded-lg border border-forest/15 text-forest break-all">
                  {matchedCred.documentHash}
                </div>
                <p className="text-[11px] text-forest/60">
                  Compare this hash with any candidate-submitted PDF to ensure byte-level integrity.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                <Link
                  href={`/verify/${matchedCred.id}`}
                  target="_blank"
                  className="text-xs font-bold text-forest/70 hover:text-forest flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-ochre" />
                  Open Public Resolver View
                </Link>
                <Link
                  href={`/company/verify/document`}
                  className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition"
                >
                  Verify Raw Document File
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-forest/15 rounded-3xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-forest">No Credential Record Found</h3>
              <p className="text-xs text-forest/70 max-w-md mx-auto">
                No active or historical credential matches query <code className="font-mono bg-forest/5 px-2 py-0.5 rounded">{query}</code> on the AcadShield universal registry.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
