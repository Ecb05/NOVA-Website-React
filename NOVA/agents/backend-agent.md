# backend-agent.md

# Backend Agent Instructions

You are responsible for building the backend infrastructure for a club learning and competition platform.

## Stack

Use:

* Node.js
* TypeScript
* Express
* Supabase Admin SDK
* Clerk Backend SDK

---

# Core Responsibilities

Backend handles:

* secure database writes
* authentication validation
* user synchronization
* leaderboard updates
* event registration logic
* submission handling
* admin operations
* evaluator integration

Backend is the source of truth.

---

# Backend Folder Structure

backend/
│
├── routes/
├── middleware/
├── services/
├── db/
├── utils/
├── validators/
└── types/

---

# Required Routes

Create these route groups:

routes/
│
├── auth.routes.ts
├── events.routes.ts
├── leaderboard.routes.ts
├── submissions.routes.ts
└── admin.routes.ts

---

# Required APIs

## Authentication

POST /api/auth/sync-user

Purpose:

* sync Clerk users into database
* create user profile if missing

---

## Events

GET /api/events

POST /api/events/register

Purpose:

* fetch events
* register authenticated users

---

## Leaderboard

GET /api/leaderboard

Purpose:

* fetch ranked users
* return points and rankings

---

## Codejam Submissions

POST /api/codejams/submit

Purpose:

* store user submissions
* trigger evaluation pipeline later

---

# Authentication Rules

Use Clerk JWT/session validation.

Every protected API must:

* validate Clerk token
* extract user ID
* verify user exists

Never trust frontend user IDs directly.

---

# User Sync Flow

When user logs in:

Frontend sends request
↓
Backend validates Clerk session
↓
Check if user exists in database
↓
If not:
Create new user profile
↓
Return user data

---

# Database Responsibilities

Backend uses:

* Supabase service role key
* secure database operations

Never expose service role key publicly.

---

# Points & Leaderboard Rules

Points must ONLY be updated backend-side.

Never allow:

* frontend point updates
* direct leaderboard modifications
* client-side score calculations

Leaderboard rankings should be calculated using:
ORDER BY points DESC

---

# Event Registration Flow

Authenticated user
↓
Backend validates session
↓
Check duplicate registration
↓
Store registration
↓
Return success response

---

# Submission Flow

User submits:

* GitHub repository
  OR
* project link

Backend:

* validates session
* stores submission
* marks status as pending

Do not evaluate submissions inside request cycle.

---

# Validation Rules

Validate:

* request body
* required fields
* URLs
* IDs
* duplicate actions

Reject malformed requests.

---

# Security Rules

Never:

* trust frontend data
* expose service role keys
* allow unrestricted admin APIs
* perform sensitive logic client-side

Always:

* validate auth
* sanitize inputs
* use environment variables
* secure protected routes

---

# Environment Variables

Required:

CLERK_SECRET_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

Never commit .env files.

---

# Recommended Middleware

Create middleware for:

* authentication
* logging
* error handling
* request validation

---

# Error Handling

All APIs should return:

{
success: boolean,
message: string,
data?: any
}

Use proper HTTP status codes.

---

# MVP Goal

The backend MVP should support:

* authentication validation
* user synchronization
* leaderboard fetching
* event registrations
* submission storage

Focus on:

* security
* modularity
* scalability
* clean API structure
