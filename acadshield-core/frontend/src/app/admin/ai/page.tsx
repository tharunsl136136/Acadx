"use client";

import React, { useState } from "react";
import { usePlatformState } from "@/lib/platform-state";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ShieldAlert,
  FileCheck2,
  Layers,
  ArrowRight
} from "lucide-react";

export default function AdminAiForensicsPage() {
  const { documents } = usePlatformState();

  const aiSignals = [
    {
      docId: "DOC-001",
      title: "Bachelor of Science in Computer Science Degree",
      student: "Alexander Wright",
      university: "Harvard University",
      classification: "DEGREE CERTIFICATE (99.8% confidence)",
      ocrStatus: "COMPLETED (34 fields extracted)",
      aiSignal: "LOW",
      anomalyNote: "All font typography, watermark gradients, and seal geometry align with historical template benchmarks.",
      statusColor: "bg-emerald-100 text-emerald-800"
    },
    {
      docId: "DOC-002",
      title: "Consolidated Semester Transcript (Semesters 1 - 8)",
      student: "Marcus Chen",
      university: "Stanford University",
      classification: "CONSOLIDATED MARKSHEET (98.4% confidence)",
      ocrStatus: "COMPLETED (112 grade cells parsed)",
      aiSignal: "LOW",
      anomalyNote: "GPA calculation matches extracted credit hours. No typography shifts detected.",
      statusColor: "bg-emerald-100 text-emerald-800"
    },
    {
      docId: "DOC-003",
      title: "Provisional Degree Certificate",
      student: "Sophia Rodriguez",
      university: "Massachusetts Institute of Technology",
      classification: "PROVISIONAL CERTIFICATE (94.1% confidence)",
      ocrStatus: "COMPLETED",
      aiSignal: "REVIEW",
      anomalyNote: "Potential anomaly detected: Slight pixel compression variance in institutional emblem stamp area. Registrar manual review recommended.",
      statusColor: "bg-amber-100 text-amber-800"
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-xs font-semibold text-red-900 mb-2">
          <Cpu className="w-3.5 h-3.5 text-red-600" />
          Neural Document Understanding & Forensics
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
          AI Document Forensics Engine
        </h1>
        <p className="text-forest/70 text-sm mt-1 max-w-2xl">
          Superadmin monitoring of OCR field extraction, layout anomaly detection, and classification confidence scores.
        </p>
      </div>

      {/* AI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">OCR Engine Model</span>
          <span className="block text-base font-extrabold text-forest mt-1">Vision Transformer v4</span>
          <span className="text-[11px] text-forest/60">Multilingual field parser</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Median Confidence</span>
          <span className="block text-xl font-extrabold text-emerald-800 mt-1">98.6%</span>
          <span className="text-[11px] text-emerald-700 font-semibold">High accuracy threshold</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Active Inference Queue</span>
          <span className="block text-xl font-extrabold text-forest mt-1">0 Pending</span>
          <span className="text-[11px] text-forest/60">Real-time processing</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Review Required</span>
          <span className="block text-xl font-extrabold text-amber-800 mt-1">1 File</span>
          <span className="text-[11px] text-amber-700 font-semibold">Flagged for human check</span>
        </div>
      </div>

      {/* Rule Notice */}
      <div className="p-4 rounded-2xl bg-forest/5 border border-forest/15 text-xs text-forest/80 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-forest/60 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-forest block">Forensics Separation Principle:</strong>
          AI signals provide heuristic guidance only (LOW, REVIEW, HIGH_ATTENTION). AI never unilaterally decides validity; authoritative validity is strictly determined by cryptographic SHA-256 matching and institutional digital signatures.
        </div>
      </div>

      {/* Inference Logs */}
      <div className="bg-white border border-forest/15 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-forest uppercase tracking-wider">
          Recent Document Inference Forensics
        </h3>
        <div className="space-y-4">
          {aiSignals.map((sig) => (
            <div
              key={sig.docId}
              className="p-5 rounded-2xl border border-forest/15 bg-forest/[0.02] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-forest">{sig.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest/10 text-forest font-bold">
                    {sig.docId}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider self-start sm:self-auto ${sig.statusColor}`}
                >
                  AI SIGNAL: {sig.aiSignal}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-forest/60 block text-[11px]">Student & Institution:</span>
                  <span className="font-bold text-forest">{sig.student}   {sig.university}</span>
                </div>
                <div>
                  <span className="text-forest/60 block text-[11px]">Model Classification:</span>
                  <span className="font-semibold text-forest">{sig.classification}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-forest/10 text-xs">
                <span className="text-forest/60 block text-[10px] uppercase font-bold mb-0.5">
                  Anomaly Analysis Note:
                </span>
                <p className="text-forest/80">{sig.anomalyNote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
