# Recurring `job-processor` Backlog Drain

This runbook configures a recurring internal invocation of `job-processor` to continuously drain queue backlog and improve resilience if scheduler kick calls are missed.

## Purpose

- Keep `sync_jobs` backlog draining even when no due tenant schedules exist.
- Trigger the due-schedule scan before queue draining so scheduled runs still enqueue even if `scheduler` is not configured as a separate recurring function.
- Provide a safety net when scheduler-to-processor kick calls fail.
- Maintain fresh worker heartbeats for operational visibility.

## Prerequisites

- Edge function `job-processor` is deployed.
- Edge runtime has `INTERNAL_FUNCTION_API_KEY` configured.
- Supabase Scheduled Functions is available for the project.

## Scheduled Function Configuration

Configure a scheduled invocation in Supabase with the following values:

- Function: `job-processor`
- Cron: `* * * * *` (every minute)
- HTTP Method: `POST`
- Header: `x-internal-api-key: <INTERNAL_FUNCTION_API_KEY>`
- Body:

```json
{"source":"scheduled-drain"}
```

## Verification

1. Manual invocation succeeds:
   - `POST /functions/v1/job-processor`
   - Header `x-internal-api-key` set to the configured internal key
   - Body `{"source":"scheduled-drain"}`
   - Expect HTTP `200` (or `202` if your environment fronts async semantics)

2. Response includes source traceability:
   - `source` is present in response payload and equals `scheduled-drain`.

3. Worker heartbeat remains fresh:
   - Query `public.worker_heartbeats` for `function_name = 'job-processor'`.
   - `last_seen_at` should refresh at least every 1-2 minutes.

4. Backlog trend is healthy:
   - Query `public.sync_jobs` counts by status.
   - `PENDING` should decline over successive minute runs when backlog exists.

5. Due schedules are converted into queue work:
   - Ensure a `public.sync_schedules.next_run_at` value is in the past for an enabled schedule.
   - Wait for the next recurring `job-processor` invocation.
   - Expect a new `public.runs` row and at least one `public.sync_jobs` row for that run.

## Operational Notes

- Scheduler remains a valid direct invocation path and should continue invoking `job-processor` after schedule enqueue/reaper reset events.
- The recurring `job-processor` drain now invokes `scheduler` first with processor kick suppression to avoid invocation loops while still enqueuing due schedules.
- Keep the internal key scoped and rotated according to security policy.
