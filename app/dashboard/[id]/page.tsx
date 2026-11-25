import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, FileText, MessageSquarePlus, ScanEye, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { addProjectRequest, updateProject } from "../actions";

type Project = { id: string; name: string; client_name: string | null; scope_description: string; created_at: string; updated_at: string };
type Request = { id: string; body: string; created_at: string };

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: project, error } = await supabase.from("projects").select("id,name,client_name,scope_description,created_at,updated_at").eq("id", id).eq("user_id", user.id).single();
  if (error || !project) notFound();
  const { data: requests } = await supabase.from("project_requests").select("id,body,created_at").eq("project_id", id).eq("user_id", user.id).order("created_at", { ascending: false });
  const p = project as Project;
  const items = (requests || []) as Request[];

  return <main className="detail-shell">
    <header className="detail-topbar"><Link href="/dashboard" className="brand"><span className="brand-icon"><ScanEye size={18}/></span>SCOPELENS</Link><Link href="/dashboard" className="back-link"><ArrowLeft size={15}/> All projects</Link></header>
    <section className="detail-main">
      <div className="detail-breadcrumb"><Link href="/dashboard">Projects</Link><span>/</span><span>{p.name}</span></div>
      <div className="detail-title-row"><div><div className="eyebrow">PROJECT WORKSPACE</div><h1>{p.name}</h1><p>{p.client_name || "No client assigned"} <span>·</span> Created {new Date(p.created_at).toLocaleDateString()}</p></div><span className="secure-label"><ShieldCheck size={15}/> Private project</span></div>
      <div className="detail-grid">
        <div className="detail-primary">
          <section className="detail-card"><div className="detail-card-head"><div className="detail-icon"><FileText size={18}/></div><div><h2>Original scope</h2><p>The agreement new requests will be compared against.</p></div></div><div className="scope-content">{p.scope_description}</div></section>
          <section className="detail-card"><div className="detail-card-head"><div className="detail-icon"><MessageSquarePlus size={18}/></div><div><h2>New client requests</h2><p>Capture every new ask before deciding whether it is extra work.</p></div></div>
            <form action={addProjectRequest} className="request-form"><input type="hidden" name="project_id" value={p.id}/><textarea name="body" required rows={3} placeholder="Paste or describe the client's new request…"/><button className="button button-dark">Save request <ArrowUpRight size={15}/></button></form>
            <div className="request-list">{items.length ? items.map(item=><article className="request-item" key={item.id}><div className="request-dot"/><div><p>{item.body}</p><small><CalendarDays size={12}/> {new Date(item.created_at).toLocaleString()}</small></div></article>) : <div className="request-empty">No client requests yet. Add the first one above.</div>}</div>
          </section>
        </div>
        <aside className="detail-side"><form action={updateProject} className="new-project-card"><input type="hidden" name="id" value={p.id}/><div className="form-card-title"><span className="plus-icon"><FileText size={16}/></span><div><b>Edit project</b><small>Update the project details</small></div></div><label>Project name<input name="name" required defaultValue={p.name}/></label><label>Client name<input name="client_name" defaultValue={p.client_name || ""} placeholder="Client or company"/></label><label>Original scope<textarea name="scope_description" required rows={7} defaultValue={p.scope_description}/></label><button className="button button-dark full">Save changes</button></form>
          <div className="next-step-card"><div className="eyebrow">COMING NEXT</div><h3>Scope analysis</h3><p>Next we’ll compare saved client requests with this original scope and flag possible extras with a clear explanation.</p><span className="coming-pill">Analysis engine in progress</span></div>
        </aside>
      </div>
    </section>
  </main>;
}
