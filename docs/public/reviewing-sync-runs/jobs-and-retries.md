---
title: Review Jobs and Retry Runs
sidebar_label: Jobs and Retries
description: Inspect run timelines, logs, and remediation actions from the Jobs page.
slug: /reviewing-sync-runs/jobs-and-retries
---

The **Jobs** page is the main place to investigate failures.

## What you can review

- run status
- live vs dry-run mode
- trigger source
- created, started, and finished timestamps
- related operations
- filtered run logs by level

![Jobs page with the run list and run detail panel visible](./images/jobs-run-list-and-detail.png)

## Failure workflow

1. Filter for failed or canceled runs.
2. Open the run detail.
3. Read error-level logs first.
4. Confirm whether the issue is credentials, provider behavior, or data quality.
5. Retry the full run or payroll stage after fixing the issue.

![Jobs page filtered to failed runs with error logs visible](./images/jobs-error-logs.png)

## Forced dry runs

Some runs can be forced into dry-run mode because of billing or grace-period conditions. The run detail panel shows this state so you can distinguish a product safeguard from a normal live run.

![Run detail panel showing a forced dry run state](./images/jobs-forced-dry-run.png)
