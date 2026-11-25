import { createClient } from "@/lib/supabase/server";
import { createProject, signOut } from "./actions";
import { ArrowUpRight, FolderKanban, Plus, ScanEye, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

type Project = { id: string; name: string; client_name: string | null; scope_description: string; created_at: string };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from("projects").select("id,name,client_name,scope_description,created_at").order("created_at", { ascending: false });
  const projects = (data || []) as Project[];
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "there";
  return <main className="dashboard-shell">
    <aside className="sidebar"><a className="brand" href="/dashboard"><span className="brand-icon"><ScanEye size={18}/></span>SCOPELENS</a><div className="workspace-label">WORKSPACE</div><a className="side-link active" href="/dashboard"><FolderKanban size={17}/> Projects</a><div className="sidebar-bottom"><div className="user-chip"><div className="avatar">{String(displayName).slice(0,1).toUpperCase()}</div><div><b>{displayName}</b><small>{user.email}</small></div></div><form action={signOut}><button className="signout"><LogOut size={15}/> Sign out</button></form></div></aside>
    <section className="dashboard-main"><header className="dashboard-header"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>Good to see you, {displayName}.</h1><p>Keep every project aligned with what was agreed.</p></div><span className="secure-label"><ShieldCheck size={15}/> Private workspace</span></header>
      <div className="stats-grid"><div className="stat-card"><span>Active projects</span><b>{projects.length}</b><small>In your workspace</small></div><div className="stat-card"><span>Scope reviews</span><b>—</b><small>Coming in the next release</small></div><div className="stat-card"><span>Potential extras</span><b>—</b><small>Track additional work soon</small></div></div>
      <div className="section-heading"><div><h2>Your projects</h2><p>Start by saving the original scope of work.</p></div></div>
      <div className="project-layout"><div className="project-list">{error ? <div className="empty-state">Could not load projects: {error.message}</div> : projects.length ? projects.map(project=><Link href={`/dashboard/${project.id}`} className="project-card project-card-link" key={project.id}><div className="project-mark"><FolderKanban size={19}/></div><div className="project-info"><b>{project.name}</b><span>{project.client_name || "No client added"}</span><p>{project.scope_description}</p></div><span className="project-date">Open project <ChevronRight size={15}/></span></Link>) : <div className="empty-state"><div className="empty-icon"><FolderKanban size={22}/></div><h3>Your first project starts here</h3><p>Add the original agreement so future client requests can be checked against it.</p></div>}</div>
      <form className="new-project-card" action={createProject}><div className="form-card-title"><span className="plus-icon"><Plus size={17}/></span><div><b>New project</b><small>Save the agreed scope</small></div></div><label>Project name<input name="name" required placeholder="Website redesign"/></label><label>Client name <span className="optional">OPTIONAL</span><input name="client_name" placeholder="Acme Studio"/></label><label>Original scope<textarea name="scope_description" required rows={5} placeholder="Describe what was agreed: deliverables, pages, revisions, deadlines…"/></label><button className="button button-dark full">Create project <ArrowUpRight size={15}/></button></form></div>
      <div className="release-note"><ShieldCheck size={17}/><span><b>Secure by default.</b> Your projects are protected by Supabase Row Level Security, so each account can access only its own records.</span></div>
    </section>
  </main>;
}
