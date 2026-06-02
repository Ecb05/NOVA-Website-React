# NOVA Database Schema (Supabase)

This document describes the Supabase PostgreSQL schema for the NOVA Club Platform. It is intended for contributors who need to understand, query, or extend the database.

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Tables](#tables)
  - [users](#1-users)
  - [events](#2-events)
  - [event_registrations](#3-event_registrations)
  - [submissions](#4-submissions)
  - [announcements](#5-announcements)
- [Row-Level Security (RLS)](#row-level-security-rls)
- [Indexes](#indexes)
- [Client Configuration](#client-configuration)
- [Environment Variables](#environment-variables)
- [Migration File](#migration-file)
- [Common Queries](#common-queries)
- [Notes for Contributors](#notes-for-contributors)

---

## Overview

The platform uses **Supabase** (PostgreSQL) as its primary database. It stores:

- **Users** — synced from Clerk authentication
- **Events** — club events and hackathons
- **Event Registrations** — which user registered for which event
- **Submissions** — codejam / project submissions from users
- **Announcements** — platform announcements

**Tech stack:**

- **Frontend:** `@supabase/supabase-js` (anon key, RLS-enforced client)
- **Backend:** `@supabase/supabase-js` (service role key, bypasses RLS)
- **Auth provider:** Clerk (user IDs are used as the `users.id` primary key)

---

## Getting Started

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run the migration

Open the **SQL Editor** in your Supabase dashboard and run the contents of:

```
supabase/migrations/001_schema.sql
```

This creates all tables, enables RLS, creates policies, and adds indexes.

### 3. Configure environment variables

Copy the required keys from your Supabase project settings → API.

**Frontend** (`.env` at project root):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Backend** (`.env` at project root — shared):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ Never expose the service role key publicly. It bypasses all RLS policies.

---

## Tables

### 1. `users`

Stores all platform users. Users are synced from Clerk into this table on sign-in via the `/api/auth/sync-user` endpoint.

| Column       | Type        | Constraints              | Description                               |
|-------------|-------------|--------------------------|-------------------------------------------|
| `id`        | `TEXT`      | `PRIMARY KEY`            | Clerk user ID                             |
| `email`     | `TEXT`      | `UNIQUE`, `NOT NULL`     | User's email address                      |
| `name`      | `TEXT`      |                          | Display name                              |
| `role`      | `TEXT`      | `DEFAULT 'student'`      | `'student'` or `'admin'`                  |
| `points`    | `INTEGER`   | `DEFAULT 0`              | Points earned (used for leaderboard)      |
| `created_at`| `TIMESTAMP` | `DEFAULT NOW()`          | Account creation timestamp                |

**Relationships:**
- Users can have many `event_registrations`
- Users can have many `submissions`

**Sync flow:**
1. User signs in via Clerk (frontend)
2. `useSyncUser()` hook fires and calls `POST /api/auth/sync-user`
3. Backend upserts the Clerk user into this table

---

### 2. `events`

Stores all club events, hackathons, and sprints.

| Column       | Type        | Constraints              | Description                   |
|-------------|-------------|--------------------------|-------------------------------|
| `id`        | `UUID`      | `PRIMARY KEY`            | Auto-generated               |
| `title`     | `TEXT`      | `NOT NULL`               | Event name                    |
| `description`| `TEXT`     |                          | Event description             |
| `start_time`| `TIMESTAMP` |                          | When the event starts         |
| `end_time`  | `TIMESTAMP` |                          | When the event ends           |
| `created_at`| `TIMESTAMP` | `DEFAULT NOW()`          | Creation timestamp            |

**Relationships:**
- An event can have many `event_registrations`

---

### 3. `event_registrations`

Junction table tracking which users registered for which events.

| Column          | Type        | Constraints                                    | Description                |
|----------------|-------------|------------------------------------------------|----------------------------|
| `id`           | `UUID`      | `PRIMARY KEY`                                  | Auto-generated            |
| `user_id`      | `TEXT`      | `NOT NULL`, `REFERENCES users(id) ON DELETE CASCADE` | Clerk user ID      |
| `event_id`     | `UUID`      | `NOT NULL`, `REFERENCES events(id) ON DELETE CASCADE` | Event ID           |
| `registered_at`| `TIMESTAMP` | `DEFAULT NOW()`                                | Registration timestamp     |
|                |             | `UNIQUE(user_id, event_id)`                    | Prevents duplicate signups |

---

### 4. `submissions`

Stores project / codejam submissions from users.

| Column         | Type        | Constraints                                    | Description                            |
|---------------|-------------|------------------------------------------------|----------------------------------------|
| `id`          | `UUID`      | `PRIMARY KEY`                                  | Auto-generated                        |
| `user_id`     | `TEXT`      | `NOT NULL`, `REFERENCES users(id) ON DELETE CASCADE` | Clerk user ID                   |
| `title`       | `TEXT`      |                                                | Submission title / project name        |
| `repo_url`    | `TEXT`      |                                                | Link to the repository                 |
| `status`      | `TEXT`      | `DEFAULT 'pending'`                            | `'pending'`, `'approved'`, `'rejected'`|
| `score`       | `INTEGER`   | `DEFAULT 0`                                    | Evaluation score                      |
| `submitted_at`| `TIMESTAMP` | `DEFAULT NOW()`                                | Submission timestamp                  |

---

### 5. `announcements`

Stores platform announcements displayed to all users.

| Column       | Type        | Constraints              | Description                   |
|-------------|-------------|--------------------------|-------------------------------|
| `id`        | `UUID`      | `PRIMARY KEY`            | Auto-generated               |
| `title`     | `TEXT`      | `NOT NULL`               | Announcement title            |
| `content`   | `TEXT`      |                          | Announcement body/content     |
| `created_at`| `TIMESTAMP` | `DEFAULT NOW()`          | Creation timestamp            |

> **Note:** Currently, announcements are also served from a local `public/data/announcements.json` file via the backend. The Supabase table exists and is ready for future migration.

---

## Row-Level Security (RLS)

RLS is enabled on **all tables**. This ensures that the frontend client (which uses the anon key) can only access data it's authorized to see. The backend service role key bypasses RLS entirely.

### Policies

**`users`**

| Policy              | Action  | Condition                      | Purpose                              |
|---------------------|---------|--------------------------------|--------------------------------------|
| `users_read_own`    | SELECT  | `auth.uid()::text = id`        | Users can read only their own profile |

> Backend service role handles all writes (upsert on sync, points updates).

**`events`**

| Policy                | Action  | Condition | Purpose                        |
|-----------------------|---------|-----------|--------------------------------|
| `events_public_read`  | SELECT  | `true`    | Anyone can read events         |

> Backend service role handles inserts/updates/deletes (admin-only).

**`event_registrations`**

| Policy                        | Action | Condition                             | Purpose                                    |
|-------------------------------|--------|---------------------------------------|--------------------------------------------|
| `registrations_insert_own`    | INSERT | `auth.uid()::text = user_id`          | Users can register themselves               |
| `registrations_read_own`      | SELECT | `auth.uid()::text = user_id`          | Users can see their own registrations       |

**`submissions`**

| Policy                    | Action | Condition                             | Purpose                                  |
|---------------------------|--------|---------------------------------------|------------------------------------------|
| `submissions_insert_own`  | INSERT | `auth.uid()::text = user_id`          | Users can submit their own work           |
| `submissions_read_own`    | SELECT | `auth.uid()::text = user_id`          | Users can read only their own submissions |

**`announcements`**

| Policy                      | Action | Condition | Purpose                              |
|-----------------------------|--------|-----------|--------------------------------------|
| `announcements_public_read` | SELECT | `true`    | Anyone can read announcements         |

> Backend service role handles writes for announcements.

---

## Indexes

The following indexes are defined to optimize common queries:

```sql
CREATE INDEX idx_users_email        ON public.users(email);
CREATE INDEX idx_users_points       ON public.users(points DESC);
CREATE INDEX idx_registrations_user  ON public.event_registrations(user_id);
CREATE INDEX idx_registrations_event ON public.event_registrations(event_id);
CREATE INDEX idx_submissions_user   ON public.submissions(user_id);
```

---

## Client Configuration

### Frontend Client (`src/lib/supabase.ts`)

Uses the **anonymous/public** key. All queries are subject to RLS policies.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Usage in frontend components:** Import `supabase` from `@/lib/supabase` and query normally. RLS ensures users only access their own data.

### Backend Admin Client (`backend/src/db/supabase.js`)

Uses the **service role** key. **Never expose this on the frontend.**

```javascript
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
```

**Usage in backend routes:** Import `supabaseAdmin` and perform admin-level operations (bypasses RLS).

---

## Environment Variables

### `.env.example`

Copy this into a `.env` file at the **project root**. It is shared by both the frontend (Vite) and backend.

```env
# ============================================
# Supabase Configuration
# Find these in: Supabase Dashboard > Settings > API
# ============================================

# --- Frontend (Vite) ---
# Used by: src/lib/supabase.ts (anon/public client, RLS-enforced)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# --- Backend (Express) ---
# Used by: backend/src/db/supabase.js (service role client, bypasses RLS)
# ⚠️ NEVER expose this key on the frontend or in client-side code
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Variable Reference

| Variable                      | Scope      | Where to find it                                      |
|-------------------------------|------------|-------------------------------------------------------|
| `VITE_SUPABASE_URL`           | Frontend   | Supabase dashboard → Settings → API → Project URL     |
| `VITE_SUPABASE_ANON_KEY`      | Frontend   | Supabase dashboard → Settings → API → Anon Key        |
| `SUPABASE_URL`                | Backend    | Supabase dashboard → Settings → API → Project URL     |
| `SUPABASE_SERVICE_ROLE_KEY`   | Backend    | Supabase dashboard → Settings → API → Service Role Key |

---

## Migration File

The canonical migration is located at:

```
supabase/migrations/001_schema.sql
```

To apply changes to the schema:

1. Create a new migration file (e.g., `002_add_teams.sql`)
2. Test it locally or in a staging Supabase project
3. Apply it via the Supabase SQL Editor

---

## Common Queries

### Get a user's profile

```sql
SELECT * FROM public.users WHERE id = 'user_id_from_clerk';
```

### Get upcoming events

```sql
SELECT * FROM public.events
WHERE start_time > NOW()
ORDER BY start_time ASC;
```

### Check if a user is registered for an event

```sql
SELECT * FROM public.event_registrations
WHERE user_id = 'clerk_user_id' AND event_id = 'event_uuid';
```

### Get all submissions for a user

```sql
SELECT * FROM public.submissions
WHERE user_id = 'clerk_user_id'
ORDER BY submitted_at DESC;
```

### Get leaderboard (top users by points)

```sql
SELECT id, name, points FROM public.users
ORDER BY points DESC
LIMIT 10;
```

### Count registrations per event

```sql
SELECT e.title, COUNT(er.id) as registration_count
FROM public.events e
LEFT JOIN public.event_registrations er ON e.id = er.event_id
GROUP BY e.id, e.title
ORDER BY registration_count DESC;
```

---

## Notes for Contributors

### Schema Philosophy

- **Minimal and scalable** — only essential columns for MVP. Future tables (achievements, badges, teams, notifications) are planned but not yet built.
- **Clerk user ID as primary key** — `users.id` is the Clerk user ID (`TEXT`), not a UUID. This avoids a separate `auth.users` table and keeps user sync simple.
- **Dynamic leaderboard** — leaderboard rankings are calculated via `ORDER BY points DESC`, not stored in a separate column or table.
- **No arrays** — avoid storing arrays for related data (e.g., submissions per user). Use separate rows with foreign keys.

### RLS Rules

- **Frontend anon key** — can only read/insert rows permitted by RLS policies.
- **Admin operations** — always go through the backend API (Express routes), which uses the service role key.
- **Adding new tables** — always enable RLS and define at minimum a SELECT policy. If the data should be publicly readable, use `FOR SELECT USING (true)`.

### ⚠️ Important: `auth.uid()::text` Cast

Because `users.id` is a `TEXT` column (Clerk user ID, not a UUID), RLS policies must cast `auth.uid()` to text when comparing:

```sql
-- ✅ Correct
(auth.uid()::text = id)

-- ❌ Wrong — silently fails
(auth.uid() = id)
```

`auth.uid()` returns a `UUID` type. Without the `::text` cast, PostgreSQL never matches it against the `TEXT` column, and RLS blocks the query. This is one of the most common mistakes when adding new policies.

### Adding a New Table

1. Add the `CREATE TABLE` statement in a new migration file
2. Enable RLS: `ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;`
3. Create appropriate policies for SELECT, INSERT, UPDATE, DELETE
4. Add indexes for commonly queried columns (especially foreign keys)
5. Add the corresponding TypeScript/JavaScript types or interfaces in the frontend
6. Create an admin client function in the backend if service-role access is needed

### Existing Backend Architecture Note

The backend currently uses **Notion** for registration and submission data (via `server.js`). The Supabase schema is ready for these features but is not yet used for event registrations or submissions in production — the backend routes for those features are still to be built. See the existing Express routes in `backend/src/routes/auth.js` for a pattern of how to use `supabaseAdmin`.
