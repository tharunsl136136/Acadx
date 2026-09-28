"use client";

import { useCallback, useEffect, useState } from "react";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";

type Institution = { id: string; name: string; code: string; country: string | null; website: string | null; status: string; createdAt: string; _count: { users: number; documents: number; credentials: number } };
const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(/\/$/, "");

export default function AdminUniversitiesPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [message, setMessage] = useState("Loading institutions…");
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(async () => {
    const response = await fetch(`${apiBase}/admin/institutions`, { credentials: "include" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? "Sign in with an active administrator account." : "Institution registry is unavailable.");
    setInstitutions(body.institutions || []); setMessage("");
  }, []);
  useEffect(() => { load().catch((error: Error) => setMessage(error.message)); }, [load]);
  async function activate(institution: Institution) {
    setBusy(institution.id); setMessage("");
    try {
      const response = await fetch(`${apiBase}/admin/institutions/${encodeURIComponent(institution.id)}/activate`, { method: "POST", credentials: "include" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Institution could not be activated.");
      await load(); setMessage(`${institution.name} is active. Issuer signing configured: ${body.issuerSigningConfigured ? "yes" : "no"}.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Institution could not be activated."); }
    finally { setBusy(null); }
  }
  return <div className="min-h-screen bg-canvas-texture pb-20 text-forest"><EnterpriseNavbar activeRole="ADMIN"/><main className="mx-auto max-w-6xl space-y-6 px-6 py-8"><header className="rounded-2xl border border-forest/10 bg-white p-6"><p className="text-xs font-bold uppercase tracking-widest text-forest/55">Administration · Core registry</p><h1 className="mt-2 font-serif text-4xl font-extrabold">Institutions</h1><p className="mt-2 text-sm text-forest/70">Institution accounts and issued-record counts from PostgreSQL. Activation does not represent external accreditation.</p></header>{message && <div role="status" className="rounded-xl border border-forest/10 bg-white p-4 text-sm">{message}</div>}<section className="space-y-3">{institutions.map((institution) => <article key={institution.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-forest/10 bg-white p-5"><div><h2 className="font-bold">{institution.name} <span className="font-mono text-xs font-normal">({institution.code})</span></h2><p className="text-xs text-forest/60">{[institution.country, institution.website].filter(Boolean).join(" · ") || "No country or website"} · {institution._count.users} users · {institution._count.documents} documents · {institution._count.credentials} credentials</p><code className="text-[10px] text-forest/50">{institution.id}</code></div><div className="flex items-center gap-3"><span className="rounded-full bg-forest/5 px-3 py-1 text-xs font-bold">{institution.status}</span>{institution.status === "PENDING" && <button disabled={busy !== null} onClick={() => activate(institution)} className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{busy === institution.id ? "Activating…" : "Activate"}</button>}</div></article>)}{institutions.length === 0 && !message && <p className="rounded-xl bg-white p-5 text-sm text-forest/60">No institution records.</p>}</section></main></div>;
}
