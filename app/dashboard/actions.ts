"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const name = String(formData.get("name") || "").trim();
  const client = String(formData.get("client_name") || "").trim();
  const scope = String(formData.get("scope_description") || "").trim();
  if (!name || !scope) return;
  const { error } = await supabase.from("projects").insert({ user_id: user.id, name, client_name: client || null, scope_description: scope });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const client = String(formData.get("client_name") || "").trim();
  const scope = String(formData.get("scope_description") || "").trim();
  if (!id || !name || !scope) return;
  const { error } = await supabase.from("projects").update({ name, client_name: client || null, scope_description: scope }).eq("id", id).eq("user_id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/${id}`);
  revalidatePath("/dashboard");
}

export async function addProjectRequest(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const projectId = String(formData.get("project_id") || "");
  const body = String(formData.get("body") || "").trim();
  if (!projectId || !body) return;
  const { error } = await supabase.from("project_requests").insert({ project_id: projectId, user_id: user.id, body });
  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/${projectId}`);
}
