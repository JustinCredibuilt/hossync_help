# Platform Admin JWT Claim Implementation Plan

## Goal
Make platform admin UI authorization (`Platform Settings` nav item/page) rely on JWT claims issued by Supabase Auth, where claims are derived from `public.platform_users` membership (`role = platform_admin`, `status = active`).

This flow also now includes platform-admin tenant impersonation. That impersonation path mints a short-lived JWT with `platform_actor` and `tenant_override` claims, so it must be configured with a signing key that Supabase Auth accepts.

## Current Status
Code changes are already implemented locally in this repo.  
What remains is deployment/activation in Supabase and post-deploy verification.

---

## Files Implemented (Reference Set)

### 1) Supabase JWT hook SQL (new)
- `db/auth_jwt_hook.sql`
- Purpose:
  - Creates `public.custom_access_token_hook(event jsonb)`
  - Checks `public.platform_users` for the authenticating user
  - Sets JWT claims:
    - `is_platform_admin` (boolean)
    - `platform_role` (`"platform_admin"` for admins, removed otherwise)
  - Grants execution to `supabase_auth_admin`

### 2) Frontend auth claim parsing (updated)
- `frontend/src/lib/auth.ts`
- Purpose:
  - Removes platform-admin lookup dependency from `/platform-admins` API call
  - Decodes JWT payload from access token client-side
  - Computes `isPlatformAdmin` from claims:
    - `platform_role === "platform_admin"` OR
    - `is_platform_admin === true`
    - also supports same keys under `app_metadata`

### 3) Admin-only nav behavior (updated)
- `frontend/src/components/layout/side-nav.tsx`
- Purpose:
  - Shows `Platform Settings` nav item only when `user.isPlatformAdmin` is true

### 4) Platform settings stub page (new)
- `frontend/src/app/(app)/platform-settings/page.tsx`
- Purpose:
  - Stub page for global platform settings
  - Displays restricted-access message for non-admin users

### 5) Auth/session wiring + protected layout/routing (already implemented in same effort)
- `frontend/src/components/auth/auth-provider.tsx`
- `frontend/src/components/providers.tsx`
- `frontend/src/app/login/page.tsx`
- `frontend/middleware.ts`
- `frontend/src/app/(app)/layout.tsx`
- `frontend/src/app/(app)/page.tsx`
- `frontend/src/app/(app)/settings/page.tsx`
- `frontend/src/app/layout.tsx`
- Purpose:
  - Login/logout flow
  - Auth-gated app routes
  - Shared app shell layout

### 6) Docs/env examples (updated)
- `frontend/README.md`
- `frontend/.env.example`

---

## Deployment Steps (for a new session)

1. **Apply SQL hook function**
   - Execute `db/auth_jwt_hook.sql` against the target Supabase project database.

2. **Activate Supabase custom access token hook**
   - In Supabase Auth settings, set **Custom Access Token Hook** to:
     - `public.custom_access_token_hook`

3. **Deploy frontend changes**
   - Build/deploy frontend with current repo changes.

4. **Force fresh tokens**
   - Sign out and sign in again (or refresh token) for test users.

5. **Configure impersonation signing**
   - Preferred for current Supabase projects:
     - Create or import a JWT signing key in Supabase Auth.
     - Store the matching private JWK in the function environment as `PLATFORM_IMPERSONATION_JWT_JWK`.
     - If required, also set `PLATFORM_IMPERSONATION_JWT_KID`.
   - Legacy/shared-secret fallback:
     - Set `PLATFORM_IMPERSONATION_JWT_SECRET` in the function environment.
   - For local development with the Supabase CLI:
     - Copy [supabase/.env.example](/h:/source/hossync/hossync_platform/supabase/.env.example) to `supabase/.env.local` and fill in the impersonation signing variables.

---

## Verification Checklist

1. **JWT claims present**
   - For a known platform admin user in `platform_users`:
     - Access token payload includes `is_platform_admin: true`
     - `platform_role: "platform_admin"` is present

2. **Non-admin behavior**
   - For user not in `platform_users` as active platform admin:
     - `is_platform_admin` false
     - `platform_role` absent

3. **UI behavior**
   - Admin sees `Platform Settings` nav item
   - Non-admin does not
   - Direct route `/platform-settings` shows restricted message for non-admin

4. **Local quality gate**
   - `cd frontend && npm run lint` passes
5. **Impersonation flow**
   - From Platform Admin > Tenants, `Assume tenant admin` returns a token instead of `JWT secret not configured`
   - Navigating into assumed-tenant mode loads the tenant session successfully

---

## Rollback Plan

1. Disable custom access token hook in Supabase Auth settings.
2. Revert frontend to previous role check behavior (if needed).
3. Optionally remove `public.custom_access_token_hook` function.

---

## Notes for Next Session

- If MCP is available, use it to run the SQL and verify hook activation.
- If MCP is unavailable, use Supabase SQL Editor for `db/auth_jwt_hook.sql` and manually enable the auth hook in dashboard.
- After activation, old sessions may still have old JWTs until re-authentication.
