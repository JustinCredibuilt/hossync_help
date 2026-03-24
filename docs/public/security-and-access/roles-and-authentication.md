---
title: Security and Access
sidebar_label: Security and Access
description: Understand authentication, role-sensitive actions, and credential-handling expectations.
slug: /security-and-access/roles-and-authentication
---

HOSSync is designed for business use and operational accountability.

## Role-sensitive actions

Tenant role affects what you can change:

- `owner` and `admin` can manage provider connections, run connection tests, change sync settings, queue manual syncs, retry failed runs, update driver overrides, and manage billing
- `member` and `viewer` can review operational data, but write actions are blocked

## Authentication expectations

- use individual user accounts
- protect credentials and integration secrets
- remove access promptly for former team members
- complete MFA enrollment and verification when prompted during sign-in

## Integration secrets

Provider credentials are sensitive operational data. Limit access to the smallest group that needs to manage integrations, and rotate credentials when team ownership changes or compromise is suspected.
