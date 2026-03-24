---
title: Review the Dashboard
sidebar_label: Dashboard
description: Use the dashboard to start syncs, track current health, and find remediation paths.
slug: /reviewing-sync-runs/dashboard
---

The dashboard gives you the fastest view of current sync health.

## Key signals

- **Last sync**: most recent run activity
- **Failed runs (7d)**: recent run failure count
- **Open operations**: queued or running background work
- **Total drivers**: current synced driver count

![Operational dashboard showing key sync health signals and alert summary](./images/dashboard-key-signals.png)

## Actions from the dashboard

- `Run sync now`: queues a live sync
- `Dry run`: validates workflow without posting payroll entries
- `Review failures`: opens failed jobs
- `Trips needing attention`: opens trip records that need remediation

![Dashboard actions for live sync, dry run, failures, and trips needing attention](./images/dashboard-actions.png)

## Recommended operating pattern

Use dry runs for first-time setup, credential changes, and major mapping changes. Use live sync once connections and mappings are stable.

![Dashboard run mode menu expanded to compare Dry run and Run sync now](./images/dashboard-run-mode-dropdown.png)
