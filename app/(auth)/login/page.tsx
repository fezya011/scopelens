"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ScanEye } from "lucide-react";

export default function LoginPage() {
  const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [message,setMessage] = useState(""); const [busy,setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message); else window.location.href="/dashboard";
    setBusy(false);
  }
  return <main className="auth-shell"><Link href="/" className="brand"><span className="brand-icon"><ScanEye size={18}/></span>SCOPELENS</Link><form className="auth-card" onSubmit={submit}><div className="eyebrow">WELCOME BACK</div><h1>Sign in</h1><p>Pick up where you left off.</p><label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></label>{message && <div className="form-error">{message}</div>}<button className="button button-dark full" disabled={busy}>{busy?"Signing in…":"Sign in"}</button><div className="auth-switch">New to SCOPELENS? <Link href="/signup">Create an account</Link></div></form></main>;
}
