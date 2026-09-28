"use client";

import { useCallback, useEffect, useState } from "react";
import EnterpriseNavbar from "@/components/EnterpriseNavbar";

type Company = { id: string; name: string; domain: string | null; status: string; createdAt: string; _count: { users: number; verifications: number } };
const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(/\/$/, "");

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState("Loading companies…");
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(async () => {
    const response = await fetch(`${apiBase}/admin/companies`, { credentials: "include" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? "Sign in with an active administrator account." : "Company registry is unavailable.");
    setCompanies(body.companies || []); setMessage("");
  }, []);
  useEffect(() => { load().catch((error: Error) => setMessage(error.message)); }, [load]);
  async function activate(company: Company) {
    setBusy(company.id); setMessage("");
    try {
      const response = await fetch(`${apiBase}/admin/companies/${encodeURIComponent(company.id)}/activate`, { method: "POST", credentials: "include" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Company could not be activated.");
      await load(); setMessage(`${company.name} is active.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Company could not be activated."); }
    finally { setBusy(null); }
  }
  return <div className="min-h-screen bg-canvas-texture pb-20 text-forest"><EnterpriseNavbar activeRole="ADMIN"/><main className="mx-auto max-w-6xl space-y-6 px-6 py-8"><header className="rounded-2xl border border-forest/10 bg-white p-6"><p className="text-xs font-bold uppercase tracking-widest text-forest/55">Administration · Core registry</p><h1 className="mt-2 font-serif text-4xl font-extrabold">Companies</h1><p className="mt-2 text-sm text-forest/70">Company accounts and verification counts from PostgreSQL.</p></header>{message && <div role="status" className="rounded-xl border border-forest/10 bg-white p-4 text-sm">{message}</div>}<section className="space-y-3">{companies.map((company) => <article key={company.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-forest/10 bg-white p-5"><div><h2 className="font-bold">{company.name}</h2><p className="text-xs text-forest/60">{company.domain || "No domain"} · {company._count.users} users · {company._count.verifications} verifications</p><code className="text-[10px] text-forest/50">{company.id}</code></div><div className="flex items-center gap-3"><span className="rounded-full bg-forest/5 px-3 py-1 text-xs font-bold">{company.status}</span>{company.status === "PENDING" && <button disabled={busy !== null} onClick={() => activate(company)} className="rounded-lg bg-forest px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{busy === company.id ? "Activating…" : "Activate"}</button>}</div></article>)}{companies.length === 0 && !message && <p className="rounded-xl bg-white p-5 text-sm text-forest/60">No company records.</p>}</section></main></div>;
}
