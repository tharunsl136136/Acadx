"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePlatformState } from "@/lib/platform-state";
import {
  GraduationCap,
  Award,
  FileCheck2,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  Binary,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Layers
} from "lucide-react";

export default function CompanyCandidatePassportPage() {
  const params = useParams();
  const candidateId = params?.id as string;
  const { candidates, credentials, documents } = usePlatformState();

  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const candidateCreds = credentials.filter((c) => c.studentName.toLowerCase() === candidate.name.toLowerCase());
  const candidateDocs = documents.filter((d) => d.studentName.toLowerCase() === candidate.name.toLowerCase());

  const [filterType, setFilterType] = useState<string>("ALL");

  const passportSections = [
    {
      category: "EDUCATION & DEGREES",
      items: [
        {
          title: "Bachelor of Science in Computer Science & Applied Mathematics",
          issuer: "Harvard University (NECHE Accredited)",
          date: "Graduated May 2024",
          badge: "VERIFIED",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
          evidence: "ERC-721 Token #10245 on Polygon Amoy. SHA-256 fingerprint verified.",
          txHash: "0x89ab12cd34ef5678901234567890abcdef1234567890abcdef1234567890abcd",
          docHash: "0x4f8b2c1d3e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b"
        },
        {
          title: "High School Diploma / Secondary School Certificate",
          issuer: "St. Xavier's Matriculation Higher Secondary",
          date: "Completed June 2020",
          badge: "VERIFIED",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
          evidence: "State Board Marksheet registered and cryptographically anchored.",
          txHash: "0x23bc34de56fa78901234567890abcdef1234567890abcdef1234567890abcdef",
          docHash: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b"
        }
      ]
    },
    {
      category: "CERTIFICATIONS & LICENSES",
      items: [
        {
          title: "AWS Certified Solutions Architect   Professional",
          issuer: "Amazon Web Services Training & Certification",
          date: "Issued Aug 2023   Expires Aug 2026",
          badge: "VERIFIED",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
          evidence: "Credly Digital Badge cross-verified via OAuth verification webhook.",
          txHash: null,
          docHash: null
        },
        {
          title: "Certified Kubernetes Administrator (CKA)",
          issuer: "The Linux Foundation & CNCF",
          date: "Issued Nov 2023",
          badge: "AI SIGNAL",
          badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
          evidence: "OCR extracted from PDF certificate. Signature match confidence: 98.4%.",
          txHash: null,
          docHash: null
        }
      ]
    },
    {
      category: "INTERNSHIPS & PRACTICUMS",
      items: [
        {
          title: "Systems Engineering Research Intern",
          issuer: "Google Research Labs (Boston)",
          date: "Jun 2023   Aug 2023 (12 Weeks)",
          badge: "VERIFIED",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
          evidence: "Authoritative internship completion letter issued directly by university supervisor.",
          txHash: "0x78ab12cd34ef5678901234567890abcdef1234567890abcdef1234567890abcd",
          docHash: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d"
        },
        {
          title: "Distributed Storage Intern",
          issuer: "Decentralized Storage Network Inc",
          date: "Jan 2023   May 2023",
          badge: "SELF-REPORTED",
          badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
          evidence: "Claimed by candidate on CV. Awaiting employer reference response.",
          txHash: null,
          docHash: null
        }
      ]
    },
    {
      category: "PROJECTS & SKILLS",
      items: [
        {
          title: "Zero-Knowledge Rollup Prototype in Rust",
          issuer: "GitHub Open Source Repository (140+ Stars)",
          date: "Published Jan 2024",
          badge: "AI SIGNAL",
          badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
          evidence: "Code repository parsed. Author commit signatures match student GPG key.",
          txHash: null,
          docHash: null
        },
        {
          title: "Competitive Programming Finalist (ICPC Regional)",
          issuer: "International Collegiate Programming Contest",
          date: "Dec 2023",
          badge: "UNVERIFIED",
          badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
          evidence: "Submitted certificate scan has not yet been matched against official leaderboard.",
          txHash: null,
          docHash: null
        }
      ]
    }
  ];

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
            href={`/company/candidates/${candidate.id}/graph`}
            className="px-3.5 py-1.5 rounded-xl border border-forest/20 text-xs font-bold text-forest hover:bg-forest/5 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-ochre" />
            Trust Graph View
          </Link>
          <Link
            href="/company/verify/document"
            className="px-3.5 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 flex items-center gap-1.5"
          >
            <Binary className="w-3.5 h-3.5 text-ochre" />
            Verify Document Hash
          </Link>
        </div>
      </div>

      {/* Trust Passport Overview Card */}
      <div className="bg-white/80 backdrop-blur border border-forest/15 rounded-3xl p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest text-ochre flex items-center justify-center font-bold text-2xl border border-ochre/30 shadow">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-forest/60 font-bold">
                  Verifier Portal   Trust Passport
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-bold text-emerald-900">
                  DIGITAL CREDENTIAL DOSSIER
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-forest tracking-tight">
                {candidate.name}
              </h1>
              <p className="text-forest/70 text-xs">
                Candidate DID: <span className="font-mono font-medium text-forest">{candidate.did}</span>
              </p>
            </div>
          </div>

          {/* Badge Legend */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-forest/5 rounded-2xl border border-forest/10 text-[11px]">
            <span className="font-bold text-forest text-xs mr-1">Verification Key:</span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              VERIFIED
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-300">
              SELF-REPORTED
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 border border-purple-300">
              AI SIGNAL
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
              UNVERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["ALL", "VERIFIED", "AI SIGNAL", "SELF-REPORTED", "UNVERIFIED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterType === f
                ? "bg-forest text-white shadow-sm"
                : "bg-white border border-forest/15 text-forest/70 hover:bg-forest/5 hover:text-forest"
            }`}
          >
            {f} Records
          </button>
        ))}
      </div>

      {/* Passport Sections */}
      <div className="space-y-6">
        {passportSections.map((section) => {
          const filteredItems = section.items.filter(
            (item) => filterType === "ALL" || item.badge === filterType
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={section.category} className="bg-white border border-forest/15 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-forest/50" />
                {section.category}
              </h3>

              <div className="space-y-3">
                {filteredItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-forest/15 bg-forest/[0.02] hover:bg-forest/[0.04] transition space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-forest">{item.title}</h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-forest/50 font-medium">{item.date}</span>
                    </div>

                    <p className="text-xs text-forest/70">
                      Issuing Entity / Host: <strong className="text-forest">{item.issuer}</strong>
                    </p>

                    <div className="p-3 bg-white rounded-lg border border-forest/10 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-forest/80">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Evidence: {item.evidence}</span>
                      </div>
                      {item.txHash && (
                        <div className="text-[11px] font-mono text-forest/60 truncate">
                          Tx Hash: <span className="text-forest">{item.txHash}</span>
                        </div>
                      )}
                      {item.docHash && (
                        <div className="text-[11px] font-mono text-forest/60 truncate">
                          Document SHA-256: <span className="text-forest">{item.docHash}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
