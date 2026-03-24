---
title: Configure an ELD Connection
sidebar_label: ELD Connection
description: Add and validate your ELD provider connection in tenant settings.
slug: /connecting-providers/eld-connection
---

Your ELD connection is the source of driver, trip, and Hours of Service data.

## Steps

1. Open **Settings**.
2. In the **ELD** section, choose your provider.
3. Open the connection form.
4. Enter the required credentials and configuration fields.
5. Save the connection.
6. Run the connection test.

![ELD section with provider selection and connection status](./images/eld-section-provider-select.png)

![ELD connection form with required fields ready to save](./images/eld-connection-modal.png)

## What to check after saving

- the connection status changes from `not configured` to `needs test`
- the test completes successfully
- the provider remains marked `active`

![ELD section after save and successful connection test](./images/eld-test-success.png)

## If the test fails

Review:

- client credentials
- certificates or private keys if your provider uses them
- any account or region-specific configuration values

Then save again and rerun the test.

![ELD section showing where to retest after correcting credentials](./images/eld-retest-after-failure.png)
