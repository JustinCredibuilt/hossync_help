---
title: Troubleshooting Common Issues
sidebar_label: Common Issues
description: Resolve the most common connection, mapping, and run problems in HOSSync.
slug: /troubleshooting/common-issues
---

## A sync will not start

Check that:

- you have an active ELD connection
- you have an active payroll connection
- both connections have passed their tests
- you are signed in with an owner or admin role
- if using Samsara, OAuth is connected before testing or running

![Settings page showing active, tested ELD and Payroll connections](./images/settings-connections-active-and-tested.png)

## Drivers are missing from payroll output

Open **Drivers** and look for records marked `Unmapped payroll`. Drivers without payroll IDs are not ready for complete payroll sync output.

![Drivers page highlighting unmapped payroll records](./images/drivers-unmapped-row.png)

## A run failed after starting

Open **Jobs**, select the failed run, and inspect:

- error-level logs
- related operations
- the run timeline

If the logs point to authentication or provider errors, retest the affected connection in **Settings**.

![Jobs page showing a failed run with logs, related operations, and timeline context](./images/jobs-failed-run-detail.png)

## Samsara shows connected but still will not run

If the ELD connection shows an OAuth-related status such as `connected, needs test` or `oauth ok, test failed`, open **Settings**, rerun the connection test, and correct any OAuth or payroll attribute issues shown in the connection panel.

## Billing forced a dry run

If a run detail shows `Dry run (forced)`, HOSSync skipped live payroll posting because of billing state or grace-period protections. Resolve billing status before expecting live payroll delivery.

![Run detail panel showing a forced dry run due to billing or grace-period safeguards](./images/jobs-forced-dry-run.png)
