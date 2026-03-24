---
title: Configure an ELD Connection
sidebar_label: ELD Connection
description: Add and validate your ELD provider connection in tenant settings.
slug: /connecting-providers/eld-connection
---

Your ELD connection is the source of driver and Hours of Service data.

Current ELD providers:

- `Samsara`
- `Motive`

## Steps

1. Open **Settings**.
2. In the **ELD** section, choose your provider.
3. Open the connection form.
4. Enter the required fields for that provider.
5. Save the connection.
6. If you selected `Samsara`, choose **Connect to Samsara** and complete the OAuth authorization flow.
7. Run the connection test.

![ELD section with provider selection and connection status](./images/eld-section-provider-select.png)

![ELD connection form with required fields ready to save](./images/eld-connection-modal.png)

## What to check after saving

- the connection status changes from `not configured` to `needs test`
- for Samsara, OAuth shows `Connected` before you test
- the test completes successfully
- the provider remains marked `active`

![ELD section after save and successful connection test](./images/eld-test-success.png)

## If the test fails

Review:

- `Samsara`: verify the payroll attribute name and re-run the OAuth connect flow if authorization failed
- `Motive`: verify the API token and any optional base URL override
- any account-specific configuration values

Then save again and rerun the test.

![ELD section showing where to retest after correcting credentials](./images/eld-retest-after-failure.png)
