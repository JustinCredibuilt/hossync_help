# ADP Mock API Server

This repo now includes a local mock ADP API server so you can test auth + time-entry sync flows without ADP sandbox access.

## Location

- Server: `tests/src/mocks/adpMockServer.ts`
- Run script: `tests/package.json` -> `npm run mock:adp`

## Start The Mock

From `tests/`:

```bash
npm install
npm run mock:adp
```

Default bind:

- `http://127.0.0.1:4010`

Health check:

- `GET /health`

## Endpoints Implemented

- `POST /auth/oauth/v2/token?grant_type=client_credentials`
- `POST /events/time/v2/time-entries.modify`

These are the two endpoints used by `ADPProvider` in `supabase/functions/_shared/providers/adp.ts`.

## Point ADPProvider At The Mock

`ADPProvider` uses fixed ADP production URLs in connection secrets. For local mock testing, point the backend runtime at the mock with environment variables instead:

- `ADP_AUTH_URL=http://127.0.0.1:4010`
- `ADP_API_URL=http://127.0.0.1:4010`

For local mock testing, store ADP connection secret like:

```json
{
  "client_id": "mock-client",
  "client_secret": "mock-secret",
  "cert_pem": "-----BEGIN CERTIFICATE-----\nmock\n-----END CERTIFICATE-----",
  "key_pem": "-----BEGIN PRIVATE KEY-----\nmock\n-----END PRIVATE KEY-----",
  "useMtls": false
}
```

`useMtls=false` is a test-only escape hatch for the local mock. It is not part of the public ADP provider schema.

## Behavior Controls

Set env vars before starting the mock:

- `ADP_MOCK_PORT` (default `4010`)
- `ADP_MOCK_HOST` (default `127.0.0.1`)
- `ADP_MOCK_TOKEN_MODE` (`success|invalid_client|rate_limit|server_error`)
- `ADP_MOCK_SUBMIT_MODE` (`success|unauthorized|unprocessable|conflict|rate_limit|server_error`)
- `ADP_MOCK_STRICT_CLIENT_CREDENTIALS` (`true|false`) checks `client_id` and `client_secret` on the token endpoint
- `ADP_MOCK_EXPECT_CLIENT_ID` expected `client_id` value
- `ADP_MOCK_EXPECT_CLIENT_SECRET` expected `client_secret` value
- `ADP_MOCK_SKIP_TOKEN_VALIDATION` (`true|false`) skips Bearer validation on submit endpoint

You can also force per-entry errors by prefixing `entryID`:

- `fail-422*` -> 422
- `fail-401*` -> 401
- `retry-409*` -> 409
- `retry-429*` -> 429
- `retry-500*` -> 500

This is useful for retry/idempotency test coverage.
