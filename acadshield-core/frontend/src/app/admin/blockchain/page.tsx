"use client";

import React, { useState } from "react";
import { usePlatformState } from "@/lib/platform-state";
import {
  Binary,
  Layers,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Server
} from "lucide-react";

export default function AdminBlockchainPage() {
  const { credentials } = usePlatformState();
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  const contracts = [
    {
      name: "AcadShieldUniversalRegistry",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      purpose: "Institutional Identity & Issuer Delegation"
    },
    {
      name: "AcadShieldCredentialToken (ERC-721)",
      address: "0x9812aF43b128795A21bcDe19280Fbd4432190A81",
      purpose: "Non-Fungible Academic Credential Token Contract"
    },
    {
      name: "AcadShieldRevocationRegistry (EIP-55)",
      address: "0x12a93Bc678ef1234901234567890abcdef123456",
      purpose: "Cryptographic On-Chain Revocation Bitmaps"
    }
  ];

  const copyTx = (tx: string) => {
    navigator.clipboard.writeText(tx);
    setCopiedTx(tx);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-xs font-semibold text-red-900 mb-2">
          <Binary className="w-3.5 h-3.5 text-red-600" />
          Consensus & Smart Contract Node
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight headline-shadow font-serif text-forest">
          Blockchain Provenance (Polygon Amoy)
        </h1>
        <p className="text-forest/70 text-sm mt-1 max-w-2xl">
          Superadmin view of on-chain contract deployments, gas consumption, and immutable state anchor transactions.
        </p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Target Network</span>
          <span className="block text-lg font-extrabold text-forest mt-1">Polygon Amoy</span>
          <span className="text-[11px] font-mono text-purple-700">Chain ID: 80002</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Current Block Height</span>
          <span className="block text-lg font-extrabold text-forest mt-1">#80,002</span>
          <span className="text-[11px] text-emerald-700 font-semibold">Consensus Synced</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Avg Confirmation</span>
          <span className="block text-lg font-extrabold text-forest mt-1">2.1s</span>
          <span className="text-[11px] text-forest/60">Fast finality</span>
        </div>
        <div className="bg-white border border-forest/15 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-forest/50">Total On-Chain Proofs</span>
          <span className="block text-lg font-extrabold text-forest mt-1">{credentials.length}</span>
          <span className="text-[11px] text-forest/60">ERC-721 mints anchored</span>
        </div>
      </div>

      {/* Core Contracts */}
      <div className="bg-white border border-forest/15 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-forest uppercase tracking-wider">
          Deployed Smart Contracts (Polygon Amoy Testnet)
        </h3>
        <div className="space-y-3">
          {contracts.map((c) => (
            <div key={c.name} className="p-4 rounded-xl border border-forest/15 bg-forest/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-extrabold text-forest">{c.name}</h4>
                <p className="text-[11px] text-forest/60">{c.purpose}</p>
                <div className="font-mono text-[11px] text-forest/80 mt-1">{c.address}</div>
              </div>
              <a
                href={`https://amoy.polygonscan.com/address/${c.address}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest/90 shrink-0 transition flex items-center gap-1 self-start sm:self-auto"
              >
                PolygonScan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Recent On-Chain Transactions */}
      <div className="bg-white border border-forest/15 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-forest uppercase tracking-wider">
          Latest On-Chain Transactions
        </h3>
        <div className="space-y-2">
          {credentials.map((cred) => (
            <div key={cred.id} className="p-3 bg-forest/5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-forest">{cred.title}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold">
                    Token #{cred.blockchain.tokenId}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-forest/60 mt-0.5 truncate max-w-md">
                  Tx: {cred.blockchain.txHash}
                </div>
              </div>
              <a
                href={`https://amoy.polygonscan.com/tx/${cred.blockchain.txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-ochre hover:underline font-bold flex items-center gap-1 shrink-0"
              >
                Inspect Tx <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
