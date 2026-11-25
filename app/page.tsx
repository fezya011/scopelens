import Link from "next/link";
import { ArrowUpRight, ScanEye, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return <main className="landing">
    <nav className="topbar"><Link href="/" className="brand"><span className="brand-icon"><ScanEye size={18}/></span>SCOPELENS</Link><div className="nav-actions"><Link href="/login">Sign in</Link><Link className="button button-dark" href="/signup">Get started <ArrowUpRight size={15}/></Link></div></nav>
    <section className="hero">
      <div className="eyebrow"><span className="pulse"/> SCOPE CLARITY FOR INDEPENDENT TEAMS</div>
      <h1>Keep great work<br/><span>inside the scope.</span></h1>
      <p className="hero-copy">SCOPELENS compares new client requests with your original agreement, so extra work never slips through unnoticed.</p>
      <div className="hero-actions"><Link className="button button-dark button-large" href="/signup">Create your workspace <ArrowUpRight size={17}/></Link><Link className="text-link" href="/login">I already have an account</Link></div>
      <div className="trust-row"><span><ShieldCheck size={15}/> Your client data stays private</span><span><Sparkles size={15}/> Built for freelancers & studios</span></div>
    </section>
    <section className="preview">
      <div className="preview-head"><div><div className="muted-label">PROJECT REVIEW</div><h3>Website redesign · Acme Studio</h3></div><span className="status-pill">2 items to review</span></div>
      <div className="review-item"><div className="review-icon warning">＋</div><div className="review-copy"><b>New blog section</b><small>Not found in original project scope</small></div><strong>Potential extra</strong></div>
      <div className="review-item"><div className="review-icon okay">✓</div><div className="review-copy"><b>Mobile responsive layouts</b><small>Covered by the original agreement</small></div><strong className="included">Included</strong></div>
      <div className="preview-foot">A clearer conversation starts with a clearer scope.</div>
    </section>
    <footer>© {new Date().getFullYear()} SCOPELENS <span>Less ambiguity. Better client work.</span></footer>
  </main>;
}
