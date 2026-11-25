
create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 12000),
  created_at timestamptz not null default now()
);
create index if not exists project_requests_project_id_created_at_idx
  on public.project_requests(project_id, created_at desc);
alter table public.project_requests enable row level security;
drop policy if exists "Users can read their own project requests" on public.project_requests;
create policy "Users can read their own project requests"
  on public.project_requests for select to authenticated
  using ((select auth.uid()) = user_id and exists (
    select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())
  ));
drop policy if exists "Users can add requests to their own projects" on public.project_requests;
create policy "Users can add requests to their own projects"
  on public.project_requests for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.projects p where p.id = project_id and p.user_id = (select auth.uid())
  ));
drop policy if exists "Users can delete their own project requests" on public.project_requests;
create policy "Users can delete their own project requests"
  on public.project_requests for delete to authenticated
  using ((select auth.uid()) = user_id);
