# SCOPELENS SaaS starter

A real Next.js + Supabase foundation for SCOPELENS. Includes:
- Marketing landing page
- Email/password sign-up and sign-in using Supabase Auth
- Server-side protected dashboard
- Create and list projects
- Row Level Security (RLS) so users only access their own projects
- Responsive premium-minimal UI

## 1. Requirements
- Node.js 20.9+
- A Supabase project (free tier is enough to start)

## 2. Install
```bash
npm install
cp .env.example .env.local
```
Fill `.env.local` with the Project URL and anon/public key from Supabase → Project Settings → API.

## 3. Configure Supabase
1. Open Supabase → SQL Editor.
2. Paste and run `supabase/schema.sql`.
3. Open Authentication → URL Configuration.
4. Set Site URL to `http://localhost:3000`.
5. Add Redirect URL `http://localhost:3000/**`.
6. For a first local test, you can disable email confirmations in Authentication → Providers → Email. Re-enable confirmations before public launch and configure SMTP.

## 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000.

## 5. Deploy
Import this project into a Git provider, then import the repository into Vercel. Add the two environment variables from `.env.local` in Vercel Project Settings → Environment Variables. In Supabase URL Configuration, set the production Site URL and add your production redirect URL.

## Current scope
This is the first real vertical slice: auth + per-user project storage + dashboard. The scope comparison/AI analysis, proposal workflow, team roles, billing and client-facing approval links are not yet implemented. The dashboard labels these as upcoming rather than pretending they work.

## Security notes
- Never commit `.env.local`.
- Never expose a Supabase service-role key in browser code.
- RLS is enabled on `projects`; keep RLS enabled on every future user-owned table.
- Configure production email delivery and review privacy/legal obligations before onboarding customers.

## Project detail update
The dashboard project cards now open `/dashboard/[id]`. The detail page shows the original scope, allows editing project metadata, and stores new client requests in `project_requests`.

If you already ran the original SQL schema, run `supabase/migrations/20261126_project_requests.sql` in Supabase SQL Editor to create the request table and its access policies.
