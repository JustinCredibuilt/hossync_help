# Samsara Technical Description

**Internal-only document for Samsara review. Not customer-facing.**

This document describes how HOSSync uses the Samsara API to authorize access, validate connectivity, retrieve driver records, and retrieve Hours of Service (HOS) logs for payroll processing. HOSSync does not write operational data back into Samsara. The integration is read-only after OAuth token issuance and refresh.

## Integration Summary

- **(a) Use case / data flow:** A tenant administrator connects their Samsara account from the HOSSync settings page. HOSSync creates an OAuth state record, redirects the admin to Samsara for consent, receives the authorization code callback, exchanges that code for access and refresh tokens, and stores the resulting credential set securely for subsequent API calls.
  **(b) API endpoints called:** `GET https://api.samsara.com/oauth2/authorize`, `POST https://api.samsara.com/oauth2/token`
  **(c) Call frequency:** Authorization is initiated once per connection or whenever the customer intentionally reconnects the integration. The token exchange occurs once per successful authorization event.

- **(a) Use case / data flow:** When a customer clicks the HOSSync "test connection" action, HOSSync validates that the stored Samsara credentials can successfully access the driver API before the customer relies on the connection for scheduled sync runs.
  **(b) API endpoints called:** `GET https://api.samsara.com/fleet/drivers?limit=1`
  **(c) Call frequency:** Only on explicit connection-test actions initiated by the tenant administrator.

- **(a) Use case / data flow:** At the start of a scheduled or manually triggered sync run, HOSSync retrieves the tenant's Samsara driver roster based on the selected Tags, normalizes the driver payload, extracts the configured payroll identifier attribute, and reconciles the returned drivers against HOSSync's internal driver table. This roster is then used to determine which active drivers should proceed to HOS log ingestion.
  **(b) API endpoints called:** `GET https://api.samsara.com/fleet/drivers` with pagination via the `after` cursor when additional pages are present
  **(c) Call frequency:** Once per sync run, plus additional paginated requests if the driver roster spans multiple pages. Sync runs occur on the tenant's configured schedule (daily at a time they choose) or on explicit manual run requests.

- **(a) Use case / data flow:** After driver reconciliation, HOSSync fetches HOS logs for each active in-scope driver over the tenant's configured log window (24 hour period, on an x-day delay). HOSSync then stores the raw log intervals internally, groups them into payable time segments, and forwards only the derived payroll output to the downstream payroll provider. Samsara data is therefore used as the source-of-truth input for payroll segmentation, auditability, and exception handling.
  **(b) API endpoints called:** `GET https://api.samsara.com/fleet/hos/logs` with query parameters including `startTime`, `endTime`, and `driverIds`, plus pagination via the `after` cursor when additional pages are present
  **(c) Call frequency:** Typically once per sync run for all configured drivers, plus additional paginated requests if results span multiple pages. Sync cadence is tenant-configurable. HOSSync's internal scheduler checks for due work every minute, but Samsara API calls occur only when a tenant has a due scheduled run or an administrator initiates a manual run.

- **(a) Use case / data flow:** When an access token is near expiry or Samsara returns `401 Unauthorized`, HOSSync exchanges the stored refresh token for a new access token, updates the persisted secret, and retries the blocked request. This refresh path is protected by an internal lock so that concurrent workers do not perform duplicate refresh attempts for the same connection.
  **(b) API endpoints called:** `POST https://api.samsara.com/oauth2/token` with `grant_type=refresh_token`
  **(c) Call frequency:** Only when the current access token is expired, within the pre-expiry refresh window, or rejected by Samsara with `401`. It is not called on every sync run.

## Operational Notes

- HOSSync uses OAuth 2.0 and stores the resulting access token, refresh token, expiry, token type, and granted scope in encrypted connection secret storage.
- HOSSync uses the Samsara driver list to read driver identity, activation status, timezone, tags, and configured custom attributes needed for payroll mapping.
- HOSSync uses the HOS logs endpoint only to read duty status intervals required for payroll segment generation.
- HOSSync currently does not submit mutations to Samsara fleet, driver, vehicle, or log records.
- Samsara API requests are rate-limited in HOSSync to a nominal provider setting of 5 requests per second.
