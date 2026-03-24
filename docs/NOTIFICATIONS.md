# Notification System Guide

This document describes how to integrate notifications into edge functions and the frontend.

## Overview

The notification system has two components:

1. **Backend notifications** - Created via edge functions using the `createNotification()` helper. These are persisted in the database and appear in the user's notification bell.
2. **Frontend notifications** - Created via `addNotification()` in the context. These appear immediately but are not persisted (useful for inline feedback).

## Backend: Creating Notifications in Edge Functions

### Using the Notification Helper

All edge functions should import the `createNotification` helper from `_shared/notifications.ts`:

```typescript
import { createNotification } from "../_shared/notifications.ts";

// In your handler function, after the operation completes:
await createNotification(adminClient, {
  userId: auth.userId,
  tenantId: tenant.tenantId,
  type: "success",
  message: "Driver sync completed successfully!",
});
```

### Notification Types

- `"success"` - Green badge, used for successful operations
- `"error"` - Red badge, used for failures or alerts
- `"info"` - Blue badge, used for informational messages

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

### Example: Sync Completion Notification

```typescript
// After successful driver sync
const result = await syncDrivers(/* ... */);

if (result.success) {
  await createNotification(adminClient, {
    userId: auth.userId,
    tenantId: tenant.tenantId,
    type: "success",
    message: `Synced ${result.driverCount} drivers successfully.`,
  });
} else {
  await createNotification(adminClient, {
    userId: auth.userId,
    tenantId: tenant.tenantId,
    type: "error",
    message: `Driver sync failed: ${result.error}`,
  });
}
```

## Frontend: Creating Notifications

### From Pages/Components

Use the `useNotifications()` hook in components:

```typescript
import { useNotifications } from "@/components/notification/notification-context";

export default function MyPage() {
  const { addNotification, addPersistentNotification } = useNotifications();

  async function handleAction() {
    try {
      // For immediate UI feedback (not persisted):
      addNotification("info", "Processing your request...");

      const result = await myApiCall();

      // For persistent notifications (saved in database):
      await addPersistentNotification("success", "Request processed successfully!");
    } catch (error) {
      addNotification("error", error.message);
    }
  }
}
```

### Types of Frontend Notifications

1. **Local Notifications** - Use `addNotification()` for immediate feedback
   - Displayed instantly
   - Not persisted in database
   - Lost on page refresh
   - Good for: form validation, loading states, quick feedback

2. **Persistent Notifications** - Use `addPersistentNotification()` for important updates
   - Persisted in database
   - Visible in notification bell
   - Survive page refresh/logout
   - Good for: operation results, errors, important updates

## Where Notifications Should Be Added

### Edge Functions

These operations should create notifications:

- ✅ Successful sync completion
- ✅ Sync failures or errors
- ✅ Important configuration changes
- ✅ Driver mapping updates
- ✅ Connection status changes
- ✅ Job completions
- ❌ Routine validation errors (return via response instead)
- ❌ Every step of a multi-step process (too noisy)

### Frontend Pages

Currently, the following pages use notifications:

- **Settings Page** (`frontend/src/app/(app)/settings/page.tsx`)
  - Uses `addNotification()` for form validation and data load errors
  - Should migrate to `addPersistentNotification()` for important operations

- **Home Page** (`frontend/src/app/(app)/page.tsx`)
  - Uses local state for sync messages
  - Should use notifications for sync results

- **Queue Viewer** (`frontend/src/app/(app)/queue-viewer/page.tsx`)
  - Currently uses local state
  - Should use notifications for queue processing results

## Migration Plan

To integrate the new notification system into existing operations:

1. **Run Sync** - Create notification when sync completes (success/error)
2. **Connection Tests** - Create notification for test results
3. **Driver Mapping** - Create notification when mappings are updated
4. **Settings Save** - Create persistent notification for settings updates
5. **Operations** - Create notification when operations complete

## Architecture

```
Frontend Component
    ↓
useNotifications() hook
    ├─ addNotification() → LocalStorage (temporary)
    └─ addPersistentNotification() → Edge Function
            ↓
    notifications-create Edge Function
            ↓
    createNotification() helper → Database
            ↓
    Notification appears in bell
```

The notification bell automatically:
- Fetches notifications on app load via the `notifications` Edge Function
- Caches in localStorage for quick access
- Allows marking as read
- Shows unread count badge
