"use client";

import React, { useState } from "react";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";
import HashComparison from "@/components/HashComparison";
import { usePlatformState, computeSha256 } from "@/lib/platform-state";
import {
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  Upload,
  Search,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  ExternalLink
} from "lucide-react";

export default function DocumentVerificationPage() {
  const { documents, credentials, addVerification } = usePlatformState();
  const [selectedDocId, setSelectedDocId] = useState<string>("doc_mit_degree_001");
  const [submittedHash, setSubmittedHash] = useState<string>("0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
  const [fileName, setFileName] = useState<string>("Alex_Morgan_MIT_Degree_SubmittedCopy.pdf");
  const [isHashing, setIsHashing] = useState<boolean>(false);
  const [hasVerified, setHasVerified] = useState<boolean>(true);
  const [tamperSimulated, setTamperSimulated] = useState<boolean>(false);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];
  const linkedCred = credentials.find((c) => c.documentId === selectedDoc?.id || c.id === selectedDoc?.credentialId);

  const isMatch = submittedHash.toLowerCase() === selectedDoc?.sha256Hash.toLowerCase();
  const isRevoked = selectedDoc?.status === "REVOKED" || linkedCred?.status === "REVOKED";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsHashing(true);
    try {
      const hash = await computeSha256(file);
      setSubmittedHash(hash);
      setTamperSimulated(false);
      setHasVerified(true);
      recordVerification(hash);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  const simulateScenario = (type: "match" | "tampered" | "revoked") => {
    if (type === "match") {
      const target = documents.find((d) => d.status === "VERIFIED") || documents[0];
      setSelectedDocId(target.id);
      setSubmittedHash(target.sha256Hash);
      setFileName(`${target.studentName.replace(/\s+/g, "_")}_Authoritative_Copy.pdf`);
      setTamperSimulated(false);
      setHasVerified(true);
      recordVerification(target.sha256Hash, target.id);
    } else if (type === "tampered") {
      const target = documents.find((d) => d.status === "VERIFIED") || documents[0];
      setSelectedDocId(target.id);
      // Alter the last 4 nibbles of the hash
      const altered = target.sha256Hash.slice(0, -6) + "e8910b";
      setSubmittedHash(altered);
      setFileName(`${target.studentName.replace(/\s+/g, "_")}_Edited_Unofficial.pdf`);
      setTamperSimulated(true);
      setHasVerified(true);
      recordVerification(altered, target.id);
    } else if (type === "revoked") {
      const target = documents.find((d) => d.status === "REVOKED") || documents[0];
      setSelectedDocId(target.id);
      setSubmittedHash(target.sha256Hash);
      setFileName(`${target.studentName.replace(/\s+/g, "_")}_Revoked_Document.pdf`);
      setTamperSimulated(false);
      setHasVerified(true);
      recordVerification(target.sha256Hash, target.id);
    }
  };

  const recordVerification = (hashToCheck: string, docId = selectedDocId) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;

    const match = hashToCheck.toLowerCase() === doc.sha256Hash.toLowerCase();
    const revoked = doc.status === "REVOKED";

    let outcome: "VERIFIED" | "HASH_MISMATCH" | "REVOKED" = "VERIFIED";
    if (revoked) outcome = "REVOKED";
    else if (!match) outcome = "HASH_MISMATCH";

    addVerification({
      id: "ver_" + Math.random().toString(36).substring(2, 9),
      companyId: "comp_anthropic_001",
      companyName: "Corporate Verifier Console",
      candidateName: doc.studentName,
      candidateId: doc.studentId,
      credentialId: doc.credentialId || "N/A",
      documentId: doc.id,
      documentType: doc.documentType,
      result: outcome,
      verificationTime: new Date().toISOString(),
      registeredHash: doc.sha256Hash,
      submittedHash: hashToCheck,
      issuerName: doc.uploadedBy,
      universityName: doc.universityName,
      blockchainTx: "0x4b78912e9b08f4c2843efc6b8c4d2938a101d32098b1b8cf471d2b826b1392fa",
      aiRiskSignal: outcome === "VERIFIED" ? "LOW" : outcome === "HASH_MISMATCH" ? "MEDIUM" : "HIGH",
      notes: outcome === "VERIFIED" ? "Clean cryptographic fingerprint match" : "Fingerprint mismatch against university source record"
    });
  };

  return (
    <div className="min-h-screen bg-canvas-texture text-forest pb-24">
      <EnterpriseNavbar activeRole="COMPANY" />

      {/* Header Banner */}
      <section className="border-b border-forest/10 bg-white/70 backdrop-blur px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-ochre" />
              Company Verifier Module • Independent Audit Layer
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
              Document Fingerprint Comparison
            </h1>
            <p className="mt-2 text-forest/75 max-w-2xl text-sm leading-relaxed">
              Verify candidates’ academic records without relying on self-asserted PDF scans. Upload received document copies to calculate an instant client-side SHA-256 fingerprint and compare it directly against the authoritative university register.
            </p>
          </div>

          {/* Quick Simulation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-forest/5 p-2 rounded-xl border border-forest/10">
            <span className="text-xs font-bold text-forest/60 px-2 py-1 uppercase tracking-wider">
              Quick Test:
            </span>
            <button
              onClick={() => simulateScenario("match")}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Authentic Match
            </button>
            <button
              onClick={() => simulateScenario("tampered")}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Mismatch (Tampered)
            </button>
            <button
              onClick={() => simulateScenario("revoked")}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              Revoked Record
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Source of Authority Reminder */}
        <div className="bg-amber-500/10 border border-amber-600/30 rounded-xl p-4 flex items-start gap-3">
          <Building2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-forest/90 leading-relaxed">
            <span className="font-bold text-amber-900">Authority Boundary Model: </span>
            Universities are the sole authoritative origin of academic records. As a company verifier, AcadShield X allows you to test submitted files for authenticity against institutional registrations, but you cannot alter or reissue university records.
          </div>
        </div>

        {/* Input & Target Selection Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Step 1: Select Target University Record */}
          <div className="lg:col-span-5 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider text-forest/50 uppercase">
                  Step 1 • Target University Record
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-forest/5 text-forest/70">
                  {documents.length} Registered Docs
                </span>
              </div>
              <label className="block text-sm font-bold text-forest mb-2">
                Select Institutional Document to Compare
              </label>
              <select
                value={selectedDocId}
                onChange={(e) => {
                  setSelectedDocId(e.target.value);
                  const doc = documents.find((d) => d.id === e.target.value);
                  if (doc) {
                    setSubmittedHash(doc.sha256Hash);
                    setTamperSimulated(false);
                    setFileName(`${doc.studentName.replace(/\s+/g, "_")}_Received.pdf`);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ochre"
              >
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.studentName} — {doc.documentType} ({doc.universityName})
                  </option>
                ))}
              </select>

              {/* Target Record Card */}
              {selectedDoc && (
                <div className="mt-5 p-4 rounded-xl bg-forest/5 border border-forest/10 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-forest/60">Candidate / Holder:</span>
                    <span className="font-bold text-forest">{selectedDoc.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-forest/60">Issuing University:</span>
                    <span className="font-bold text-forest">{selectedDoc.universityName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-forest/60">Document Number:</span>
                    <span className="font-mono font-bold text-forest">{selectedDoc.documentNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-forest/60">Registration Date:</span>
                    <span className="font-medium text-forest">{selectedDoc.issueDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-forest/60">Institutional Status:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        selectedDoc.status === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800"
                          : selectedDoc.status === "REVOKED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {selectedDoc.status}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-forest/10 text-[11px] text-forest/60 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-ochre" />
              Fingerprint registered by Dean/Registrar under digital signature.
            </div>
          </div>

          {/* Step 2: Upload Received File */}
          <div className="lg:col-span-7 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider text-forest/50 uppercase">
                  Step 2 • Received Document Copy
                </span>
                <span className="text-xs text-forest/60">
                  Client-side Web Crypto (SHA-256)
                </span>
              </div>

              <label className="block text-sm font-bold text-forest mb-2">
                Upload Document Copy Received from Candidate
              </label>

              {/* Drag & drop upload area */}
              <label className="border-2 border-dashed border-forest/20 hover:border-ochre hover:bg-ochre/5 transition rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer group bg-forest/5">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-xl bg-forest/10 group-hover:bg-ochre/20 flex items-center justify-center text-forest group-hover:text-ochre transition mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-forest">
                  Drop candidate PDF or image copy here, or browse
                </p>
                <p className="text-xs text-forest/60 mt-1">
                  Supported formats: PDF, JPG, PNG (Max 50MB). Hashing is executed locally.
                </p>
              </label>

              {/* Uploaded File Pill */}
              <div className="mt-4 flex items-center justify-between bg-forest/5 px-4 py-2.5 rounded-xl border border-forest/10 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-ochre shrink-0" />
                  <span className="font-semibold text-forest truncate">{fileName}</span>
                </div>
                {isHashing ? (
                  <span className="text-ochre font-bold animate-pulse">Calculating SHA-256...</span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Comparison
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-forest/10 flex items-center justify-between text-xs">
              <span className="text-forest/60">
                Algorithm: <strong className="font-mono text-forest">SHA-256</strong>
              </span>
              <button
                onClick={() => {
                  setHasVerified(true);
                  recordVerification(submittedHash);
                }}
                className="px-4 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest/90 transition shadow flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-ochre" />
                Run Cryptographic Verification
              </button>
            </div>
          </div>
        </div>

        {/* Live Comparison Component */}
        {selectedDoc && hasVerified && (
          <div className="space-y-6">
            <HashComparison
              registeredHash={selectedDoc.sha256Hash}
              submittedHash={submittedHash}
              registeredFileName={selectedDoc.fileName}
              submittedFileName={fileName}
              isRevoked={isRevoked}
              isExpired={false}
              studentName={selectedDoc.studentName}
              documentType={selectedDoc.documentType}
              universityName={selectedDoc.universityName}
              credentialId={selectedDoc.credentialId || "CRED-AUTONOMOUS-MIT-01"}
              txHash={linkedCred?.blockchain.txHash || "0x4b78912e9b08f4c2843efc6b8c4d2938a101d32098b1b8cf471d2b826b1392fa"}
              blockNumber={linkedCred?.blockchain.blockNumber || 1420951}
              ipfsCid={selectedDoc.ipfsCid}
            />

            {/* Verification Report Generation Panel */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-forest">
                  Corporate Verification Audit Report
                </h3>
                <p className="text-xs text-forest/70 mt-1">
                  Export an immutable, compliance-ready verification artifact containing cryptographic proof, timestamps, and registrar authority attestations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Report downloaded for verification of ${selectedDoc.studentName}`)}
                  className="px-4 py-2.5 rounded-xl border border-forest/20 text-forest text-xs font-bold hover:bg-forest/5 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-ochre" />
                  Download JSON Audit Proof
                </button>
                <button
                  onClick={() => alert(`Official PDF Dossier generated with cryptographic hash receipt.`)}
                  className="px-4 py-2.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition shadow flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4 text-ochre" />
                  Generate Official Dossier (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
