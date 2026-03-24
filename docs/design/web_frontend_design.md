# Web Frontend Design - HOS Sync Platform

## Goals
- Provide a clear operational view of driver logs, trips, and sync status.
- Enable admins to connect providers (ELD + payroll) and manage tenants.
- Surface errors and retries to reduce support time.
- Support multi-tenant scaling with strong role-based access.

## Non-Goals (initial release)
- Advanced payroll reporting beyond sync status.
- Custom report builder.
- Mobile-first UI (responsive baseline only).

## Primary Users & Roles
- **Admin**: Configure tenant, manage integrations, users, and settings.
- **Operations**: Monitor syncs, review logs/trips, resolve errors.
- **Payroll**: Verify time entries, confirm sync results, export if needed.

## Core User Journeys
1. **Onboarding**: Admin creates tenant → connects ELD + payroll → maps drivers.
2. **Daily Monitoring**: Ops checks sync dashboard → investigates failures → retries.
3. **Payroll Review**: Payroll checks synced trips → verifies totals → resolves mismatches.

## Information Architecture
- **Auth**
  - Sign in
  - Password reset
- **Tenant Setup**
  - Organization profile
  - Provider connections (ELD, Payroll)
  - Driver mapping
- **Dashboard**
  - Sync status overview
  - Recent failures and alerts
- **Drivers**
  - Driver list
  - Driver details (logs, trips, mappings)
- **Trips**
  - Trip list
  - Trip details (source logs, payroll status)
- **Sync Jobs**
  - Job list
  - Job details (payload, retries, error logs)
- **Settings**
  - Users & roles
  - API tokens / webhooks
  - Audit log

## Key Screens & Components
### Dashboard
- Status cards (last sync, failures, retries, total drivers)
- Trend chart (sync success rate over time)
- Alerts list

### Provider Connections
- Connection state (connected, needs auth, error)
- OAuth connection CTA
- Rate limit / last sync info

### Driver Mapping
- Table with ELD driver → payroll employee mapping
- Unmatched drivers highlighted
- Bulk mapping actions

### Trips & Logs
- Filters: date range, driver, status, region
- Trip summary table
- Trip detail: timeline, associated HOS logs, payroll sync result

### Sync Jobs
- Queue status (pending, processing, failed)
- Retry action with confirmation
- Error log panel with copy-to-clipboard

## Data & API Considerations
- **Auth**: Token-based (JWT) with refresh; tenant + role included in claims.
- **Pagination**: Cursor-based for logs/trips/jobs.
- **Filtering**: Server-side filters with URL query sync.
- **Webhooks/Events**: Optional toast + in-app notification for failures.

## UI States
- **Loading**: Skeleton loaders for tables/cards.
- **Empty**: Explain why data is missing and how to fix it.
- **Error**: Actionable messages with retry and support link.
- **Permission denied**: Show role-based access prompt.

## Frontend Architecture
- **Framework**: React + TypeScript (Next.js recommended for routing + auth).
- **State**: React Query for server cache; Zustand for UI state.
- **Design System**: Tailwind + component library (shadcn/ui or custom).
- **Forms**: React Hook Form + zod validation.

## Accessibility & UX
- Keyboard navigation for tables and dialogs.
- ARIA labels on interactive components.
- Color contrast for status indicators.

## MVP Scope
- Auth + Tenant Setup
- Provider Connections
- Dashboard
- Driver list/detail
- Trips list/detail
- Sync jobs list/detail

## Future Enhancements
- Custom report builder
- Alerts integrations (Slack/Email)
- Advanced payroll reconciliation
- In-app support chat
