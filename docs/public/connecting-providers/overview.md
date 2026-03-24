---
title: Connect ELD and Payroll Providers
sidebar_label: Provider Connections
description: Configure the provider connections HOSSync needs before any sync can run.
slug: /connecting-providers/overview
---

HOSSync requires one active ELD connection and one active payroll connection to queue sync runs.

Current provider options in the product are:

- ELD: `Samsara` or `Motive`
- Payroll: `ADP`

## Where connections live

Provider connections are managed in **Settings**:

- **ELD** for log and driver source data
- **Payroll** for outbound payroll delivery

![Settings page showing both ELD and Payroll connection areas](./images/settings-eld-and-payroll-cards.png)

Each connection has a status badge:

- `not configured`: no connection exists yet
- `needs test`: saved, but not validated yet
- `active`: tested and ready
- `test failed`: credentials or configuration need attention

Samsara also uses OAuth status inside the connection modal. After you save the connection, you authorize it with Samsara and then run a connection test. You may see statuses like `connected, needs test` or `oauth ok, test failed`.

## Recommended setup sequence

1. Save the ELD connection.
2. If the ELD provider is Samsara, complete the OAuth authorization step.
3. Save the payroll connection.
4. Test both connections.
5. Confirm both show as `active` before running a sync.

![Provider setup sequence across ELD, Payroll, and connection test states](./images/provider-setup-sequence.png)

If either connection is missing, disabled, or not ready, dashboard sync actions, manual driver sync, and run retries will not complete successfully.
