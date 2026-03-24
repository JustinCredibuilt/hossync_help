# Notification System Guide

This document describes how notifications work in the current platform code.

## Overview

The notification system has two layers:

1. **Backend notifications** are stored in the database and appear in the notification bell.
2. **Frontend notifications** show immediately in the UI through the notification context.
3. `addNotification()` is no longer purely local. It writes locally first, then attempts backend persistence in the background.

## Backend: Creating Notifications in Edge Functions

### Using the Notification Helper

All edge functions should import the `createNotification` helper from `_shared/notifications.ts`:

```typescript
import { createNotification } from "../_shared/notifications.ts";

await createNotification(adminClient, {
  userId: auth.userId,
  tenantId: tenant.tenantId,
  type: "success",
  message: "Driver sync completed successfully!",
});
```

### Notification Types

- `"success"` for successful operations
- `"error"` for failures or alerts
- `"info"` for informational updates

### Creating Tenant-Wide Notifications

For notifications that should go to all active members of a tenant:

```typescript
import { createTenantNotification } from "../_shared/notifications.ts";

await createTenantNotification(
  adminClient,
  tenant.tenantId,
  "info",
  "New driver mapping rules have been deployed."
);
```

## Frontend: Creating Notifications

Use the `useNotifications()` hook in components:

```typescript
import { useNotifications } from "@/components/notification/notification-context";

export default function MyPage() {
  const { addNotification, addPersistentNotification } = useNotifications();

  async function handleAction() {
    try {
      addNotification("info", "Processing your request...");

      const result = await myApiCall();

      await addPersistentNotification("success", "Request processed successfully!");
    } catch (error) {
      addNotification("error", error.message);
    }
  }
}
```

### Frontend behaviors

1. **`addNotification()`**
   - displays immediately
   - writes to local state and `localStorage`
   - attempts backend persistence through `notifications-create`

2. **`addPersistentNotification()`**
   - calls the backend first
   - refreshes bell data from the database after success
   - falls back to `addNotification()` if backend persistence fails

## Current Backend Endpoints

- `notifications`: returns unread notifications for the current user, limited to 100
- `notifications-create`: creates a notification for the current user in the current tenant
- `notifications-notification_id-read`: marks one notification as read

## Current Implementation Notes

- **Settings Page** (`frontend/src/app/(app)/settings/page.tsx`)
  - uses `addNotification()` for save, test, and OAuth feedback

- **Home Page** (`frontend/src/app/(app)/page.tsx`)
  - still uses local page state for sync queue feedback

- **Notification context** (`frontend/src/components/notification/notification-context.tsx`)
  - fetches notifications after auth is ready and MFA is satisfied
  - caches notifications in `localStorage`
  - supports optimistic local display before persistence completes

## Architecture

```text
Frontend component
  -> useNotifications()
  -> local state and localStorage cache
  -> notifications-create edge function when persistence is attempted
  -> createNotification() helper
  -> database row appears in bell
```

The notification bell automatically:

- fetches unread notifications on app load once auth is ready and MFA is satisfied
- caches notifications in `localStorage`
- allows marking notifications as read
- shows an unread count badge
