"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import {
  Users,
  GraduationCap,
  Building2,
  FileCheck2,
  Award,
  Sparkles,
  Binary,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  CheckCircle2,
  Info,
  GitFork
} from "lucide-react";

export default function CandidateTrustGraphPage() {
  const params = useParams();
  const candidateId = params?.id as string;
  const { candidates, credentials, documents } = usePlatformState();

  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const candidateCred = credentials.find((c) => c.studentName.toLowerCase() === candidate.name.toLowerCase()) || credentials[0];
  const candidateDoc = documents.find((d) => d.id === candidateCred.documentId) || documents[0];

  const [selectedNode, setSelectedNode] = useState<string>("CREDENTIAL");

  const nodes = [
    {
      id: "STUDENT",
      type: "STUDENT",
      title: candidate.name,
      subtitle: `DID: ${candidate.did.substring(0, 24)}...`,
      status: "AUTHENTICATED IDENTITY",
      icon: Users,
      evidence: {
        did: candidate.did,
        targetRole: candidate.targetRole,
        department: candidate.department,
        kycStatus: "VERIFIED"
      }
    },
    {
      id: "UNIVERSITY",
      type: "UNIVERSITY",
      title: candidate.institution,
      subtitle: "Accredited Higher Education Institution",
      status: "ACCREDITED ISSUER",
      icon: Building2,
      evidence: {
        accreditationBody: "NECHE Institutional Accreditation",
        issuerDid: "did:acadshield:issuer:univ-harvard",
        institutionalKeyStatus: "VALID"
      }
    },
    {
      id: "DOCUMENT",
      type: "DOCUMENT",
      title: candidateDoc?.documentType || "Bachelor of Science Degree Record",
      subtitle: `Doc ID: ${candidateDoc?.id || "DOC-001"}`,
      status: "AUTHORITATIVE SOURCE",
      icon: FileCheck2,
      evidence: {
        documentNumber: candidateDoc?.documentNumber || "DOC-2024-BS-0921",
        sha256Hash: candidateDoc?.sha256Hash || candidateCred.documentHash,
        registeredAt: candidateDoc?.uploadedAt || "2024-06-15"
      }
    },
    {
      id: "CREDENTIAL",
      type: "CREDENTIAL",
      title: candidateCred.title,
      subtitle: "W3C Verifiable Credential",
      status: "CRYPTOGRAPHICALLY SIGNED",
      icon: Award,
      evidence: {
        credentialId: candidateCred.id,
        signatureType: "Ed25519Signature2020",
        revocationStatus: candidateCred.status === "ACTIVE" ? "UNREVOKED (ACTIVE)" : "REVOKED"
      }
    },
    {
      id: "NFT",
      type: "NFT",
      title: `ERC-721 Token #${candidateCred.blockchain.tokenId}`,
      subtitle: "Non-Fungible Academic Credential",
      status: "MINTED ON-CHAIN",
      icon: Sparkles,
      evidence: {
        contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        tokenId: candidateCred.blockchain.tokenId,
        standard: "ERC-721 Compliant"
      }
    },
    {
      id: "BLOCKCHAIN",
      type: "BLOCKCHAIN",
      title: "Polygon Amoy Proof",
      subtitle: `Block #${candidateCred.blockchain.blockNumber}`,
      status: "IMMUTABLE CONSENSUS",
      icon: Binary,
      evidence: {
        network: "Polygon Amoy Testnet (Chain ID 80002)",
        txHash: candidateCred.blockchain.txHash,
        confirmed: true
      }
    }
  ];

  const secondaryNodes = [
    {
      id: "SKILL",
      title: "Distributed Systems & Cryptography",
      type: "Verified Skill",
      evidence: "Derived from CS-501 & Capstone Thesis"
    },
    {
      id: "CERT",
      title: "Honors in Advanced Computing",
      type: "Institution Award",
      evidence: "Registrar Sealed Achievement Certificate"
    },
    {
      id: "INTERNSHIP",
      title: "Google Research Practicum",
      type: "University Practicum",
      evidence: "Verified Evaluation Form Signed by Academic Dean"
    }
  ];

  const activeEvidence = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/company/candidates/${candidate.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest/70 hover:text-forest transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Candidate Dossier
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/company/candidates/${candidate.id}/passport`}
            className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-ochre" />
            Candidate Trust Passport
          </Link>
          <Link
            href="/company/verify/document"
            className="px-3.5 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 flex items-center gap-1.5"
          >
            <Binary className="w-3.5 h-3.5 text-ochre" />
            Verify Document
          </Link>
        </div>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-xs font-semibold text-forest mb-2">
          <GitFork className="w-3.5 h-3.5 text-ochre" />
          Cryptographic Provenance Graph
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
          Trust Graph   {candidate.name}
        </h1>
        <p className="text-forest/70 text-sm mt-1 max-w-2xl">
          Visual chain of custody illustrating authoritative link from Student Identity through University Source Document, W3C Credential, ERC-721 Token, and Polygon Consensus.
        </p>
      </div>

      {/* Main Graph Flow Visualization */}
      <div className="bg-white/80 backdrop-blur border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-forest/10">
          <span className="text-xs font-bold uppercase tracking-wider text-forest/60">
            Primary Credential Chain of Custody
          </span>
          <span className="text-xs text-forest/50">Click any node to inspect cryptographic evidence</span>
        </div>

        {/* Nodes Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-forest text-white border-forest shadow-lg ring-2 ring-ochre"
                    : "bg-white hover:bg-forest/5 border-forest/15 text-forest"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-white/10 text-ochre" : "bg-forest/5 text-forest"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        isSelected ? "bg-ochre text-forest" : "bg-forest/10 text-forest/80"
                      }`}
                    >
                      Step {idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest font-bold block mb-1 ${
                      isSelected ? "text-white/60" : "text-forest/50"
                    }`}
                  >
                    {node.type}
                  </span>
                  <h4 className="text-xs font-extrabold line-clamp-2 mb-1">{node.title}</h4>
                  <p className={`text-[11px] line-clamp-2 ${isSelected ? "text-white/70" : "text-forest/60"}`}>
                    {node.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider block ${
                      isSelected ? "text-emerald-300" : "text-emerald-700"
                    }`}
                  >
                    ? {node.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence Inspector Box */}
        {activeEvidence && (
          <div className="p-6 rounded-2xl bg-forest/5 border border-forest/15 space-y-4">
            <div className="flex items-center justify-between border-b border-forest/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-forest">
                  Node Evidence Dossier: {activeEvidence.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                {activeEvidence.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {Object.entries(activeEvidence.evidence).map(([key, val]) => (
                <div key={key} className="p-3 bg-white rounded-xl border border-forest/10">
                  <span className="text-[10px] font-mono text-forest/50 uppercase block font-semibold">
                    {key}
                  </span>
                  <span className="font-mono text-xs font-bold text-forest break-all mt-0.5 block">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Relationships (Skills, Certifications, Internships) */}
        <div className="space-y-4 pt-4 border-t border-forest/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-forest/60">
            Validated Sub-Credentials & Practicums
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {secondaryNodes.map((s) => (
              <div key={s.id} className="p-4 rounded-xl border border-forest/15 bg-white space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-forest/50 font-bold block">{s.type}</span>
                <h4 className="text-xs font-extrabold text-forest">{s.title}</h4>
                <p className="text-[11px] text-forest/70">{s.evidence}</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" /> Backed by Institution Evidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
