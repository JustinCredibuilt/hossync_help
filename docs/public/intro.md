---
title: HOSSync User Guide
sidebar_label: Overview
description: Learn how to connect providers, manage drivers, run syncs, and troubleshoot HOSSync.
slug: /
---

HOSSync helps fleet and payroll teams turn driver Hours of Service data into payroll-ready sync output with traceable run history.

Use this guide to:

- connect your ELD and payroll providers
- configure sync schedules and filters
- review driver mapping health
- inspect run failures and retry safely

## Before you begin

You will get the best results when you have:

- owner or admin access to your HOSSync tenant
- active credentials for your ELD provider and payroll provider
- a clear list of drivers who should be included in payroll syncs

Current supported provider combinations are:

- ELD: `Samsara` or `Motive`
- Payroll: `ADP`

## Core workflow

1. Connect an ELD provider and a payroll provider in **Settings**.
2. Complete Samsara OAuth if you selected Samsara.
3. Configure sync scope, schedule, and notification preferences.
4. Review driver mappings and fix any unmapped payroll IDs.
5. Start a live sync or dry run from the dashboard.
6. Review jobs, logs, retry states, and retry options when exceptions occur.
