---
title: Manage Drivers
sidebar_label: Driver Management
description: Review mapping health, search drivers, and apply manual status overrides.
slug: /managing-drivers/overview
---

The **Drivers** page is where you confirm that synced drivers are ready for payroll processing.

## What you can do on this page

- search by driver name or external ID
- filter by active or inactive status
- filter by mapped or unmapped payroll status
- run a manual driver sync
- apply or reset a manual active or inactive override

![Drivers page showing search, status filters, and mapping filters](./images/drivers-list-filters.png)

## Mapping states

- `Mapped`: the driver has both an ELD ID and a payroll ID
- `Unmapped payroll`: the driver is missing a payroll ID
- ELD ID gaps are also highlighted directly in the driver list

Drivers without payroll IDs are a common reason for incomplete sync output.

![Driver list showing an unmapped payroll record and mapping state badges](./images/drivers-unmapped-row.png)

## Manual overrides

If a driver's source status is not what you need operationally, you can apply a manual status override. Resetting the override returns the driver to inherited source behavior.

Manual driver sync and override changes are admin-only actions.

![Driver detail panel showing the manual status override controls](./images/driver-detail-manual-override.png)
