# database-agent.md

# Database Agent Instructions

You are responsible for building the MVP database architecture for a club learning and competition platform.

## Database Provider

Use:

* Supabase PostgreSQL

---

# MVP Database Goals

The database should support:

* user accounts
* leaderboards
* event registrations
* basic codejam submissions

Keep schema minimal and scalable.

---

# Table: users

Purpose:
Stores all platform users synced from Clerk.

Columns:

* id

  * TEXT
  * PRIMARY KEY
  * Clerk user ID

* email

  * TEXT
  * UNIQUE
  * NOT NULL

* name

  * TEXT

* role

  * TEXT
  * DEFAULT 'student'

* points

  * INTEGER
  * DEFAULT 0

* created_at

  * TIMESTAMP
  * DEFAULT NOW()

---

# Table: events

Purpose:
Stores all club events.

Columns:

* id

  * UUID
  * PRIMARY KEY

* title

  * TEXT
  * NOT NULL

* description

  * TEXT

* start_time

  * TIMESTAMP

* end_time

  * TIMESTAMP

* created_at

  * TIMESTAMP
  * DEFAULT NOW()

---

# Table: event_registrations

Purpose:
Tracks which users registered for which events.

Columns:

* id

  * UUID
  * PRIMARY KEY

* user_id

  * TEXT
  * REFERENCES users(id)

* event_id

  * UUID
  * REFERENCES events(id)

* registered_at

  * TIMESTAMP
  * DEFAULT NOW()

---

# Table: submissions

Purpose:
Stores codejam/project submissions.

Columns:

* id

  * UUID
  * PRIMARY KEY

* user_id

  * TEXT
  * REFERENCES users(id)

* title

  * TEXT

* repo_url

  * TEXT

* status

  * TEXT
  * DEFAULT 'pending'

* score

  * INTEGER
  * DEFAULT 0

* submitted_at

  * TIMESTAMP
  * DEFAULT NOW()

---

# Relationships

users
↓
event_registrations
↓
events

users
↓
submissions

---

# Important Rules

Use Clerk user ID as users.id.

Do NOT:

* store arrays for submissions
* store leaderboard rankings directly
* store mutable frontend-only data

Leaderboard should be calculated dynamically:

ORDER BY points DESC

---

# Row Level Security (RLS)

Enable RLS on ALL tables.

---

# Minimum Policies

## Users

* users can read their own profile
* backend can update points

## Events

* public read access

## Registrations

* authenticated users can create registrations

## Submissions

* authenticated users can create submissions
* users can read only their own submissions

---

# Backend Access

Frontend uses:

* Supabase anon key

Backend uses:

* Supabase service role key

Never expose service role key publicly.

---

# Future Expansion

Future tables may include:

* achievements
* badges
* codejams
* teams
* notifications
* evaluator results

Do NOT build these yet for MVP.

Keep schema lean and modular.
