---
title: Connect ELD and Payroll Providers
sidebar_label: Provider Connections
description: Configure the provider connections HOSSync needs before any sync can run.
slug: /connecting-providers/overview
---

HOSSync requires one active ELD connection and one active payroll connection to queue sync runs.

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

## Recommended setup sequence

1. Save the ELD connection.
2. Save the payroll connection.
3. Test both connections.
4. Confirm both show as active before running a sync.

![Provider setup sequence across ELD, Payroll, and connection test states](./images/provider-setup-sequence.png)

If either connection is missing or disabled, dashboard sync actions and run retries will not complete successfully.
