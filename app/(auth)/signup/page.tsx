"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ScanEye } from "lucide-react";

export default function SignupPage() {
  const [name,setName] = useState(""); const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [message,setMessage] = useState(""); const [busy,setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const { data, error } = await createClient().auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) setMessage(error.message);
    else if (data.session) window.location.href="/dashboard";
    else setMessage("Check your email to confirm your account, then sign in.");
    setBusy(false);
  }
  return <main className="auth-shell"><Link href="/" className="brand"><span className="brand-icon"><ScanEye size={18}/></span>SCOPELENS</Link><form className="auth-card" onSubmit={submit}><div className="eyebrow">START WITH CLARITY</div><h1>Create account</h1><p>Your workspace for healthier client projects.</p><label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Morgan"/></label><label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></label><label>Password<input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/></label>{message && <div className="form-note">{message}</div>}<button className="button button-dark full" disabled={busy}>{busy?"Creating account…":"Create account"}</button><div className="auth-switch">Already registered? <Link href="/login">Sign in</Link></div></form></main>;
}
