"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import { Award, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Building2 } from "lucide-react";

export default function CreateCredentialPage() {
  const router = useRouter();
  const { students, documents } = usePlatformState();

  const [step, setStep] = useState(1);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "stu_alex_001");
  const [credentialTitle, setCredentialTitle] = useState("Bachelor of Science in Computer Science & Artificial Intelligence");
  const [credentialType, setCredentialType] = useState("BachelorDegreeCredential");
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || "doc_mit_degree_001");
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const student = students.find((s) => s.id === selectedStudentId) || students[0];
  const doc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMinted(true);
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl">
      <div className="space-y-1 pb-6 border-b border-forest/15">
        <Link
          href="/university/credentials"
          className="text-xs font-bold text-forest/60 hover:text-forest flex items-center gap-1.5 transition mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Credentials Directory
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight headline-shadow font-serif">
            Issue Verifiable Credential & Mint NFT
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest text-ochre">
            POLYGON AMOY
          </span>
        </div>
        <p className="text-xs text-forest/70">
          Transform authoritative university source documents into cryptographically verifiable credentials with unique ERC-721 token representations.
        </p>
      </div>

      {!minted ? (
        <div className="bg-white border-2 border-forest/15 rounded-3xl p-8 shadow-sm space-y-6 text-xs">
          {/* Step 1: Student Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="font-bold uppercase tracking-wider text-forest/50 text-[10px] block">
                Step 1: Select Enrolled Student
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition ${
                      selectedStudentId === s.id
                        ? "border-forest bg-forest/5 ring-2 ring-forest"
                        : "border-forest/10 hover:border-forest/30"
                    }`}
                  >
                    <div className="font-bold text-sm text-forest">{s.name}</div>
                    <div className="text-forest/60 text-[11px] mt-0.5">{s.program}</div>
                    <div className="font-mono text-forest/40 text-[10px] mt-2 truncate">{s.did}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-forest/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
                >
                  <span>Select Source Document</span>
                  <ArrowRight className="w-4 h-4 text-ochre" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Attach Document */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="font-bold uppercase tracking-wider text-forest/50 text-[10px] block">
                Step 2: Attach Verified Institutional Document
              </span>
              <div className="grid grid-cols-1 gap-3">
                {documents.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDocId(d.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition flex items-center justify-between ${
                      selectedDocId === d.id
                        ? "border-forest bg-forest/5 ring-2 ring-forest"
                        : "border-forest/10 hover:border-forest/30"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-forest">{d.documentType}</div>
                      <div className="text-forest/60 text-[11px]">Serial: {d.documentNumber} � Year: {d.academicYear}</div>
                      <div className="font-mono text-forest/40 text-[10px] truncate max-w-md">Hash: {d.sha256Hash}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-forest/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow flex items-center gap-2"
                >
                  <span>Review & Tokenize</span>
                  <ArrowRight className="w-4 h-4 text-ochre" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Tokenize */}
          {step === 3 && (
            <div className="space-y-6">
              <span className="font-bold uppercase tracking-wider text-forest/50 text-[10px] block">
                Step 3: Review & Inscribe On-Chain
              </span>

              <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 space-y-2 text-xs">
                <div>Holder: <strong>{student.name}</strong> ({student.did})</div>
                <div>Document: <strong>{doc.documentType}</strong> ({doc.documentNumber})</div>
                <div className="font-mono text-[11px] truncate">Document Hash: {doc.sha256Hash}</div>
                <div>Network: <strong>Polygon Amoy (ERC-721 Digital Credential)</strong></div>
              </div>

              <div className="flex justify-between pt-4 border-t border-forest/10">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl border border-forest/20 text-xs font-bold text-forest"
                >
                  Back
                </button>
                <button
                  onClick={handleMint}
                  disabled={isMinting}
                  className="px-7 py-3 rounded-xl bg-forest hover:bg-forest/90 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  {isMinting ? (
                    <span>Minting ERC-721 Token on Amoy...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-ochre" />
                      <span>Mint Credential NFT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-10 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-black text-forest">
            Verifiable Credential & NFT Minted Successfully!
          </h2>
          <p className="text-xs text-forest/75 max-w-lg mx-auto leading-relaxed">
            The credential has been issued to <strong>{student.name}</strong>. ERC-721 Token #105 is now anchored to Polygon Amoy.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/university/credentials"
              className="px-5 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest/90 transition shadow"
            >
              Return to Credentials List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
