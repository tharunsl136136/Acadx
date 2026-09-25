"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Shield, CheckCircle2, ArrowRight, QrCode, FileCheck, Layers, Cpu, Database, ExternalLink } from "lucide-react";
import { SAMPLE_CREDENTIALS, CredentialRecord } from "../lib/credentials-data";
import VerificationDrawer from "../components/VerificationDrawer";
import TrustPassportSection from "../components/TrustPassportSection";
import IssuerSimulationModal from "../components/IssuerSimulationModal";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCredential, setSelectedCredential] = useState<CredentialRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIssuerModalOpen, setIsIssuerModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = (idToVerify?: string) => {
    const targetId = (idToVerify || searchQuery).trim();
    if (!targetId) {
      setErrorMessage("Please enter a Credential ID or select a sample below.");
      return;
    }

    setErrorMessage("");
    const record = SAMPLE_CREDENTIALS[targetId];
    if (record) {
      setSelectedCredential(record);
      setIsDrawerOpen(true);
    } else {
      setErrorMessage(`Credential '${targetId}' was not found in the primary registry.`);
    }
  };

  const handleSampleClick = (sampleId: string) => {
    setSearchQuery(sampleId);
    handleVerify(sampleId);
  };

  return (
    <div className="relative min-h-screen text-[#0B251D] flex flex-col justify-between selection:bg-[#E5B25D] selection:text-[#0B251D]">
      
      {/* ---------------------------------------------------------------------- */}
      {/* NAVIGATION BAR (Matches Bumblebee clean tracked header aesthetic)     */}
      {/* ---------------------------------------------------------------------- */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex items-center justify-between z-20">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-[#0B251D] flex items-center">
            ACADSHIELD<span className="text-[#E5B25D] text-3xl font-serif">.</span>
          </span>
        </div>

        {/* Center Nav Links with tracking-[0.25em] */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.22em] text-[#0B251D]/80 uppercase">
          <a href="#verifier" className="hover:text-[#0B251D] transition-colors">VERIFICATION</a>
          <a href="#passport" className="hover:text-[#0B251D] transition-colors">TRUST PASSPORT</a>
          <a href="#infrastructure" className="hover:text-[#0B251D] transition-colors">INFRASTRUCTURE</a>
          <a href="#features" className="hover:text-[#0B251D] transition-colors">THE PROTOCOL</a>
        </nav>

        {/* Right Corner Bordered Pill (BASKET · 0 aesthetic) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsIssuerModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 border border-[#0B251D]/40 hover:border-[#0B251D] px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider text-[#0B251D] transition-all bg-white/40 hover:bg-white"
          >
            <span className="w-2 h-2 rounded-full bg-[#E5B25D]" />
            ISSUER SIMULATOR
          </button>

          <div className="border border-[#0B251D]/60 hover:border-[#0B251D] px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider text-[#0B251D] bg-white/50">
            AMOY · 80002
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------------- */}
      {/* HERO SECTION (Exact visual replica of provided template)               */}
      {/* ---------------------------------------------------------------------- */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-6 pb-20 relative">
        
        {/* Right Vertical Spine Text (WILDFLOWER · HEATHER · ACACIA aesthetic) */}
        <div className="hidden xl:block absolute right-4 top-28 bottom-32">
          <div className="vertical-text-spine text-[11px] font-mono uppercase text-[#0B251D]/45 tracking-[0.32em] font-medium select-none">
            W3C VERIFIABLE CREDENTIALS · POLYGON AMOY · IPFS INTEGRITY · DID PROVENANCE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headlines, Editorial copy & Interactive Verifier */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 z-10">
            
            {/* Overline with orange/ochre dash */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-mono text-[#C88A32] font-semibold">
              <span className="w-8 h-[1.5px] bg-[#C88A32]" />
              DIGITAL TRUST INFRASTRUCTURE · EST. 2026
            </div>

            {/* Giant Headline with 3D ochre shadow (Raw honey, from the hum.) */}
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-[0.92] text-[#0B251D] headline-shadow">
              Trust, <br />
              from the <br />
              source.
            </h1>

            {/* Editorial Paragraph */}
            <p className="max-w-xl text-base sm:text-lg text-[#0B251D]/80 leading-relaxed font-normal pt-2">
              Cryptographically anchored credentials and tamper-resistant provenance for higher education, verified universities, and modern employers. Every degree and certification is traced to an immutable cryptographic proof on Polygon.
            </p>

            {/* -------------------------------------------------------------- */}
            {/* INTERACTIVE VERIFICATION BOX (Core Feature in Hero)            */}
            {/* -------------------------------------------------------------- */}
            <div id="verifier" className="pt-4 max-w-xl">
              <div className="p-2 sm:p-2.5 bg-white border-2 border-[#0B251D] rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-2.5 w-full pl-3 pr-2 py-2">
                  <Search className="w-5 h-5 text-[#0B251D]/60 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    placeholder="Enter Credential ID (e.g. cred_valid_degree_001)..."
                    className="w-full bg-transparent text-sm font-mono text-[#0B251D] focus:outline-none placeholder:text-[#0B251D]/45"
                  />
                </div>

                <button
                  onClick={() => handleVerify()}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0B251D] text-[#FAF7F2] hover:bg-[#0B251D]/90 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-md"
                >
                  Verify Now <ArrowRight className="w-4 h-4 text-[#E5B25D]" />
                </button>
              </div>

              {errorMessage && (
                <div className="mt-2 text-xs font-mono font-medium text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Sample Quick Selector Chips */}
              <div className="mt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#0B251D]/60 mb-2 font-semibold">
                  TRY PRE-LOADED TEST SCENARIOS:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSampleClick("cred_valid_degree_001")}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#0B251D]/20 text-xs font-mono text-[#0B251D] flex items-center gap-1.5 shadow-sm transition-all hover:border-[#0B251D]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    MIT B.Sc. Degree (Active)
                  </button>

                  <button
                    onClick={() => handleSampleClick("cred_revoked_diploma_002")}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#0B251D]/20 text-xs font-mono text-[#0B251D] flex items-center gap-1.5 shadow-sm transition-all hover:border-[#0B251D]"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    Cybersecurity (Revoked)
                  </button>

                  <button
                    onClick={() => handleSampleClick("cred_expired_cert_003")}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#0B251D]/20 text-xs font-mono text-[#0B251D] flex items-center gap-1.5 shadow-sm transition-all hover:border-[#0B251D]"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    Cloud Arch (Expired)
                  </button>

                  <button
                    onClick={() => handleSampleClick("cred_unverified_issuer_004")}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#0B251D]/20 text-xs font-mono text-[#0B251D] flex items-center gap-1.5 shadow-sm transition-all hover:border-[#0B251D]"
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    Unverified Issuer
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The Iconic Arched Curved Window Portal */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px]">
              
              {/* Decorative Arch Backdrop Border */}
              <div className="arch-window-portal relative w-full h-[520px] sm:h-[580px] overflow-hidden border-4 border-white/80 shadow-2xl bg-[#EBE5DB]">
                <Image
                  src="/hero-portal.jpg"
                  alt="AcadShield Digital Trust Cryptographic Portal"
                  fill
                  priority
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Inner Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B251D]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FAF7F2]/90 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#0B251D]/60 uppercase">
                      ON-CHAIN STATUS
                    </div>
                    <div className="text-xs font-black text-[#0B251D] flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      POLYGON AMOY #80002
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[#0B251D]/60 uppercase">BLOCK</div>
                    <div className="text-xs font-mono font-bold text-[#0B251D]">#1,284,920</div>
                  </div>
                </div>
              </div>

              {/* Stamp Badge */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#FAF7F2] border-2 border-[#0B251D] flex items-center justify-center p-2 shadow-lg transform -rotate-12">
                <div className="text-center">
                  <div className="text-[9px] font-black tracking-tighter uppercase leading-tight text-[#0B251D]">
                    SEAL OF<br /><span className="text-[#C88A32]">TRUTH</span>
                  </div>
                  <div className="text-[8px] font-mono text-[#0B251D]/60">EST. 2026</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* ---------------------------------------------------------------------- */}
      {/* LIVE STATS TICKER                                                      */}
      {/* ---------------------------------------------------------------------- */}
      <section className="w-full border-y border-[#0B251D]/15 bg-white/40 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0B251D] font-mono">42,850+</div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#0B251D]/60 mt-1">Credentials Issued</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0B251D] font-mono">180+</div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#0B251D]/60 mt-1">Verified Universities</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0B251D] font-mono">100%</div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#0B251D]/60 mt-1">Bit-Level Tamper Proof</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0B251D] font-mono">0.02s</div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#0B251D]/60 mt-1">Verification Latency</div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* TRUST PASSPORT SHOWCASE (Candidate Profile)                           */}
      {/* ---------------------------------------------------------------------- */}
      <TrustPassportSection onVerifySample={handleSampleClick} />

      {/* ---------------------------------------------------------------------- */}
      {/* CORE PROTOCOL PILLARS SECTION                                          */}
      {/* ---------------------------------------------------------------------- */}
      <section id="infrastructure" className="py-20 border-t border-[#0B251D]/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] font-mono text-[#C88A32] font-semibold mb-2">
              <span className="w-8 h-[1.5px] bg-[#C88A32]" />
              THE TRUST INFRASTRUCTURE
              <span className="w-8 h-[1.5px] bg-[#C88A32]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0B251D] headline-shadow-sm">
              Blockchain is the anchor. Not the database.
            </h2>
            <p className="text-sm text-[#0B251D]/75 mt-4 leading-relaxed">
              We separate relational application metadata from immutable cryptographic proofs. Higher efficiency, zero bloat, absolute mathematical certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#0B251D] shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#0B251D] text-[#E5B25D] flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B251D] mb-2">SHA-256 Bit Integrity</h3>
              <p className="text-xs text-[#0B251D]/75 leading-relaxed">
                Raw certificates generate an immutable 256-bit cryptographic digest. Altering even a single whitespace or punctuation mark invalidates public verification instantly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#0B251D] shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#0B251D] text-[#E5B25D] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B251D] mb-2">Polygon Amoy ERC-721</h3>
              <p className="text-xs text-[#0B251D]/75 leading-relaxed">
                Tokens represent verifiable state without exposing student PII on-chain. Role-based access control inside smart contracts prevents unauthorized issuance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#0B251D] shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#0B251D] text-[#E5B25D] flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B251D] mb-2">Project B REST Integration</h3>
              <p className="text-xs text-[#0B251D]/75 leading-relaxed">
                Exposes standardized, high-speed machine verification endpoints (<code>POST /internal/verify-credential</code>) with service API key protection for external ATS platforms.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* FOOTER                                                                 */}
      {/* ---------------------------------------------------------------------- */}
      <footer className="w-full border-t-2 border-[#0B251D] bg-[#FAF7F2] py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-black tracking-tighter uppercase text-[#0B251D]">
              ACADSHIELD X<span className="text-[#E5B25D]">.</span>
            </span>
            <div className="text-xs font-mono text-[#0B251D]/60 mt-1">
              Project A (Core Infrastructure) + Project B (Trust Intelligence)
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#0B251D]/70 uppercase tracking-wider">
            <a href="https://amoy.polygonscan.com" target="_blank" rel="noreferrer" className="hover:text-[#0B251D] flex items-center gap-1">
              Polygonscan Amoy <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <span>REST API v1</span>
            <span>·</span>
            <span>W3C VC 1.0</span>
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------------------------- */}
      {/* INTERACTIVE MODALS                                                     */}
      {/* ---------------------------------------------------------------------- */}
      <VerificationDrawer
        credential={selectedCredential}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <IssuerSimulationModal
        isOpen={isIssuerModalOpen}
        onClose={() => setIsIssuerModalOpen(false)}
      />

    </div>
  );
}
