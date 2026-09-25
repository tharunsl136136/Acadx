"use client";

import React, { useState } from "react";
import Link from "next/link";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import { usePlatformState } from "@/lib/platform-state";
import {
  FileCheck2,
  Binary,
  QrCode,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Building2,
  Search,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function CompanyVerifyHubPage() {
  const { documents, credentials } = usePlatformState();
  const [activeTab, setActiveTab] = useState<"upload" | "hash" | "credential" | "qr">("upload");
  const [inputHash, setInputHash] = useState("");
  const [inputCredId, setInputCredId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleLookup = () => {
    if (activeTab === "hash") {
      const match = documents.find(
        (d) => d.sha256Hash.toLowerCase() === inputHash.trim().toLowerCase()
      );
      setSearchResult(match || "NOT_FOUND");
    } else if (activeTab === "credential") {
      const match = credentials.find(
        (c) => c.id.toLowerCase() === inputCredId.trim().toLowerCase()
      );
      setSearchResult(match || "NOT_FOUND");
    }
  };

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="COMPANY" />

      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-ochre" />
            Verification Gateway • AcadShield Digital Trust Layer
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
            Verify Candidate Academic Records
          </h1>
          <p className="mt-2 text-forest/75 max-w-2xl text-sm leading-relaxed">
            Select an independent cryptographic verification pathway to validate candidate claims directly against authoritative university registrar records.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* 4 Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Option 1: Upload Document */}
          <Link
            href="/company/verify/document"
            className="bg-white border-2 border-ochre/40 hover:border-ochre rounded-2xl p-6 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-ochre/15 text-ochre flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-ochre uppercase">
                Recommended
              </span>
              <h3 className="text-base font-bold text-forest mt-1">
                Upload & Compare Document
              </h3>
              <p className="text-xs text-forest/70 mt-2 leading-relaxed">
                Upload a candidate-provided PDF/JPG copy. Calculates instant SHA-256 fingerprint and checks bit-for-bit with the university register.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-ochre">
              Launch Comparison <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Option 2: Search by Document Hash */}
          <div
            onClick={() => {
              setActiveTab("hash");
              setInputHash("0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
            }}
            className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm transition flex flex-col justify-between ${
              activeTab === "hash"
                ? "border-forest ring-2 ring-forest/10"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest/5 text-forest flex items-center justify-center mb-4">
                <Binary className="w-6 h-6 text-ochre" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-forest/50 uppercase">
                Fingerprint Lookup
              </span>
              <h3 className="text-base font-bold text-forest mt-1">
                Verify by SHA-256 Hash
              </h3>
              <p className="text-xs text-forest/70 mt-2 leading-relaxed">
                Directly paste a 64-character SHA-256 hex string to query status, issuer signature, and blockchain anchor.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-forest">
              Lookup by Hash <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 3: Verify by Credential ID */}
          <div
            onClick={() => {
              setActiveTab("credential");
              setInputCredId("cred_valid_degree_001");
            }}
            className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm transition flex flex-col justify-between ${
              activeTab === "credential"
                ? "border-forest ring-2 ring-forest/10"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest/5 text-forest flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6 text-ochre" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-forest/50 uppercase">
                Unique Identifier
              </span>
              <h3 className="text-base font-bold text-forest mt-1">
                Verify by Credential ID
              </h3>
              <p className="text-xs text-forest/70 mt-2 leading-relaxed">
                Query by canonical AcadShield Credential ID (e.g. cred_valid_degree_001) to fetch verified metadata and revocation state.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-forest">
              Lookup Credential <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 4: QR / Share Token */}
          <div
            onClick={() => setActiveTab("qr")}
            className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm transition flex flex-col justify-between ${
              activeTab === "qr"
                ? "border-forest ring-2 ring-forest/10"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest/5 text-forest flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-ochre" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-forest/50 uppercase">
                Candidate Shared
              </span>
              <h3 className="text-base font-bold text-forest mt-1">
                Verify by QR or Share Token
              </h3>
              <p className="text-xs text-forest/70 mt-2 leading-relaxed">
                Scan a candidate’s dynamic verification QR code or paste a secure time-limited disclosure share token.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-forest">
              Scan / Enter Token <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tab Lookup Interface for Non-Upload modes */}
        {activeTab !== "upload" && (
          <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-forest/10 pb-4">
              <h2 className="text-lg font-bold text-forest">
                {activeTab === "hash" && "Lookup by Document Fingerprint (SHA-256)"}
                {activeTab === "credential" && "Lookup by AcadShield Credential ID"}
                {activeTab === "qr" && "Verify Candidate Share Token"}
              </h2>
              <span className="text-xs text-forest/60">
                Connected to AcadShield Digital Trust Infrastructure
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {activeTab === "hash" && (
                <input
                  type="text"
                  placeholder="Paste 0x... SHA-256 fingerprint"
                  value={inputHash}
                  onChange={(e) => setInputHash(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-forest/20 bg-forest/5 text-xs font-mono text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              )}
              {activeTab === "credential" && (
                <input
                  type="text"
                  placeholder="Paste Credential ID (e.g. cred_valid_degree_001)"
                  value={inputCredId}
                  onChange={(e) => setInputCredId(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-forest/20 bg-forest/5 text-xs font-mono text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              )}
              {activeTab === "qr" && (
                <input
                  type="text"
                  placeholder="Paste Candidate Verification URL or Share Token"
                  defaultValue="https://acadshield.network/share/tok_stu991_degree_scope"
                  className="flex-1 px-4 py-3 rounded-xl border border-forest/20 bg-forest/5 text-xs font-mono text-forest focus:outline-none focus:ring-2 focus:ring-ochre"
                />
              )}
              <button
                onClick={handleLookup}
                className="px-6 py-3 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-ochre" />
                Query Ledger
              </button>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-forest/60">Example records:</span>
              <button
                onClick={() => {
                  setInputHash("0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
                  setActiveTab("hash");
                }}
                className="px-2.5 py-1 rounded-lg bg-forest/5 hover:bg-forest/10 border border-forest/10 font-mono text-[11px]"
              >
                MIT Degree (Valid)
              </button>
              <button
                onClick={() => {
                  setInputHash("0x1111b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
                  setActiveTab("hash");
                }}
                className="px-2.5 py-1 rounded-lg bg-forest/5 hover:bg-forest/10 border border-forest/10 font-mono text-[11px]"
              >
                Polytechnic (Revoked)
              </button>
            </div>

            {/* Search Results Display */}
            {searchResult && searchResult !== "NOT_FOUND" && (
              <div className="mt-6 p-5 rounded-2xl bg-forest/5 border border-forest/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-forest">
                      Record Discovered in Authoritative Registry
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      searchResult.status === "VERIFIED" || searchResult.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {searchResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-forest/60 block">Holder / Student:</span>
                    <strong className="text-forest">
                      {searchResult.studentName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-forest/60 block">Document / Credential:</span>
                    <strong className="text-forest">
                      {searchResult.documentType || searchResult.title}
                    </strong>
                  </div>
                  <div>
                    <span className="text-forest/60 block">Issuing University:</span>
                    <strong className="text-forest">
                      {searchResult.universityName}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    href="/company/verify/document"
                    className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition shadow flex items-center gap-1.5"
                  >
                    Open in Side-by-Side Fingerprint Inspector <ArrowRight className="w-3.5 h-3.5 text-ochre" />
                  </Link>
                </div>
              </div>
            )}

            {searchResult === "NOT_FOUND" && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <span className="font-bold">No registered record found:</span>
                The entered fingerprint does not exist in the authoritative institutional directory.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
