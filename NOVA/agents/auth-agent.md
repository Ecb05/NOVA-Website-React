# auth-agent.md

# Authentication Agent Instructions

You are responsible for implementing authentication for a club learning and competition platform.

## Authentication Provider

Use:

* Clerk Authentication

Frontend Stack:

* React
* TypeScript
* Vite

Backend Stack:

* Express Node

---

# MVP Authentication Goals

The authentication system should support:

* Google OAuth login
* secure sessions
* protected routes
* college email restriction
* Clerk + Supabase integration
* persistent login state

Keep implementation simple and secure.

---

# Required Packages

Frontend:

npm install @clerk/clerk-react

Backend:

npm install @clerk/backend

---

# Clerk Setup

Create a Clerk application.

Enable:

* Google Authentication

Disable unnecessary providers for MVP.

---

# Environment Variables

Frontend:

VITE_CLERK_PUBLISHABLE_KEY=

Backend:

CLERK_SECRET_KEY=

Never expose secret keys in frontend.

---

# Frontend Setup

Wrap application with:

ClerkProvider

inside:

* main.tsx

---

# Authentication Flow

User clicks sign in
↓
Clerk Google OAuth
↓
Session created
↓
Frontend receives authenticated user
↓
Backend syncs user with database
↓
Dashboard loads

---

# User Object

Use Clerk user object as source of identity.

Important fields:

* user.id
* user.emailAddresses
* user.fullName

Use:
user.id

as the primary identifier in database.

---

# Database Integration

When user logs in:

Frontend calls:
POST /api/auth/sync-user

Backend:

* validates Clerk session
* checks if user exists
* creates profile if missing

Use Clerk ID as:
users.id

---

# Protected Routes

Protected pages:

* /dashboard
* /events
* /leaderboard
* /profile
* /codejam

Unauthenticated users must be redirected to:

* /sign-in

---

# College Email Restriction

In Clerk Dashboard:

User & Authentication
→ Email Address
→ Allowed Domains

Add:

* yourcollege.edu.in

Only approved domains may register.

---

# Required Components

Use:

* SignIn
* SignUp
* UserButton

UserButton should appear in navbar after login.

---

# Session Rules

Sessions should:

* persist across refreshes
* automatically restore on reload
* logout securely

---

# Backend Authentication Validation

Backend must validate:

* Clerk JWT/session
* authenticated user ID

Never trust frontend-provided IDs directly.

All protected APIs must validate auth.

---

# Security Rules

Never:

* store passwords manually
* create custom auth systems
* trust frontend sessions blindly
* expose Clerk secret keys

Always:

* validate sessions backend-side
* use environment variables
* secure protected routes

---

# Error Handling

Handle:

* unauthorized access
* expired sessions
* invalid domains
* failed sign-ins

Redirect users appropriately.

---

# MVP Goal

The authentication MVP should support:

* Google sign in
* protected routes
* persistent sessions
* user sync with database
* college-only access

Focus on:

* simplicity
* security
* smooth onboarding
* modular architecture
