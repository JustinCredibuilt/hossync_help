---
title: Quick Start
sidebar_label: Quick Start
description: Set up your HOSSync tenant for the first successful sync.
slug: /getting-started/quick-start
---

This checklist is the fastest path to a usable tenant.

## 1. Open tenant settings

Go to **Settings** and confirm you can access these sections:

- ELD
- Payroll
- Sync Configuration
- Notifications
- Billing

If you cannot access billing, your tenant role may not allow subscription management.

![Settings overview with ELD, Payroll, Sync Configuration, Notifications, and Billing sections](./images/settings-overview.png)

## 2. Add provider connections

Create one active ELD connection and one active payroll connection. Save both connections, then run a connection test after entering credentials.

![Settings page showing the ELD and Payroll provider sections](./images/settings-eld-and-payroll-cards.png)

## 3. Configure sync behavior

In **Sync Configuration**, set:

- timezone
- schedule frequency
- lookback days
- platform log window
- optional driver tags
- optional selected drivers list

These settings determine which records HOSSync pulls and when scheduled runs occur.

![Sync Configuration section showing timezone, schedule settings, lookback days, and platform log window](./images/settings-sync-configuration.png)

## 4. Review drivers

Open **Drivers** and look for mapping gaps. Drivers without payroll IDs can block complete payroll output.

![Drivers page showing mapping states and unmapped payroll records](./images/drivers-mapping-review.png)

## 5. Run a dry run first

From the dashboard, choose **Dry run** before your first live sync. This lets you validate connections, mappings, and run visibility without posting payroll entries.

![Dashboard run action menu expanded with Dry run selected](./images/dashboard-dry-run-menu.png)

## 6. Move to live sync

When the dry run looks correct, return to the dashboard and choose **Run sync now**.

![Operational dashboard showing the Run sync now action for live processing](./images/dashboard-live-run-action.png)
