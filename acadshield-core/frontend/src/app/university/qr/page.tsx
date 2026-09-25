"use client";

import React, { useState } from "react";
import { usePlatformState } from "@/lib/platform-state";
import { QrCode, Download, Share2, Copy, Check, ExternalLink, ArrowRight } from "lucide-react";

export default function UniversityQRPage() {
  const { credentials } = usePlatformState();
  const [selectedCredId, setSelectedCredId] = useState(credentials[0]?.id || "cred_valid_degree_001");
  const [copied, setCopied] = useState(false);

  const cred = credentials.find((c) => c.id === selectedCredId) || credentials[0];
  const qrUrl = `https://acadshield.network/verify/${cred.id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-forest/15">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-xs font-semibold uppercase tracking-wider text-forest/80 mb-2">
          <QrCode className="w-3.5 h-3.5 text-ochre" />
          Public Verification QR Generator
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight headline-shadow font-serif">
          Dynamic Verification QR Codes
        </h1>
        <p className="text-xs text-forest/70">
          Generate tamper-proof QR codes linking to unauthenticated public verification endpoints on AcadShield X.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border-2 border-forest/15 rounded-3xl p-8 shadow-sm">
        {/* Left: Credential Selection */}
        <div className="space-y-4 text-xs">
          <label className="block font-bold text-forest">
            Select Credential for QR Generation
          </label>
          <select
            value={selectedCredId}
            onChange={(e) => setSelectedCredId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-forest/5 text-forest text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ochre"
          >
            {credentials.map((c) => (
              <option key={c.id} value={c.id}>
                {c.studentName} � {c.title}
              </option>
            ))}
          </select>

          <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 space-y-2 text-xs">
            <span className="font-bold text-forest uppercase tracking-wider text-[10px] text-forest/50 block">
              Embedded Metadata
            </span>
            <div>Holder: <strong>{cred.studentName}</strong></div>
            <div>Credential ID: <span className="font-mono">{cred.id}</span></div>
            <div>NFT Token: <span className="font-mono">#{cred.blockchain.tokenId}</span></div>
            <div>Status: <span className="font-bold text-emerald-800">{cred.status}</span></div>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-forest/60 text-[11px] block font-bold">Verification Resolver URL:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={qrUrl}
                className="w-full px-3 py-2 rounded-xl border border-forest/20 bg-white font-mono text-[11px] text-forest"
              />
              <button
                onClick={copyUrl}
                className="px-3 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest/90 transition text-xs shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: QR Preview */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-forest/5 border border-forest/10 text-center space-y-4">
          <div className="p-4 bg-white rounded-2xl border-2 border-forest/15 shadow-md">
            {/* SVG Dynamic Mock QR */}
            <div className="w-48 h-48 bg-white border border-forest/20 rounded-xl flex flex-col items-center justify-center p-3 relative">
              <QrCode className="w-36 h-36 text-forest" />
              <span className="text-[9px] font-mono font-bold text-forest/60 mt-1">
                Scan with any camera
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`QR code image downloaded for ${cred.title}`)}
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 transition shadow flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-ochre" />
              Download PNG
            </button>
            <button
              onClick={() => alert("Verification link copied to clipboard")}
              className="px-4 py-2 rounded-xl border border-forest/20 text-forest text-xs font-bold hover:bg-forest/5 transition flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-ochre" />
              Share Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
