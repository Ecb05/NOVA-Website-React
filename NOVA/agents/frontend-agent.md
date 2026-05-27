# frontend-agent.md

# Frontend Agent Instructions

You are responsible for building the frontend of a club learning and competition platform.

## Stack

Use:

* React
* TypeScript
* Vite
* React Router
* TailwindCSS
* shadcn/ui
* Clerk Authentication
* Supabase Client SDK

---

# Core Responsibilities

Frontend handles:

* UI rendering
* routing
* authentication state
* dashboard rendering
* leaderboard display
* event pages
* codejam submission forms
* realtime UI updates

Frontend does NOT handle:

* point calculations
* admin privilege assignment
* secure scoring
* evaluator execution
* sensitive database writes

Sensitive operations must go through backend APIs.

---

# Folder Structure

src/
│
├── pages/
├── components/
├── layouts/
├── hooks/
├── services/
├── lib/
├── routes/
├── types/
└── utils/

---

# Required Pages

Create these pages:

* Home
* Sign In
* Dashboard
* Events
* Leaderboard
* Codejam
* Profile

---

# Required Components

Create reusable components:

* Navbar
* Sidebar
* EventCard
* LeaderboardTable
* SubmissionForm
* UserProfileCard
* ProtectedRoute

---

# Authentication

Use Clerk for authentication.

Requirements:

* Google OAuth login
* protected routes
* persistent sessions
* UserButton component in navbar

Restrict access to college email domains only.

---

# Authentication Flow

User clicks sign in
↓
Clerk OAuth popup
↓
Session created
↓
Frontend receives user object
↓
Backend syncs user profile
↓
Dashboard loads

---

# Routing Rules

Public Routes:

* /
* /sign-in

Protected Routes:

* /dashboard
* /events
* /leaderboard
* /codejam
* /profile

Unauthenticated users must be redirected to /sign-in.

---

# API Communication Rules

Frontend can directly fetch:

* leaderboard data
* events
* announcements

Frontend must use backend APIs for:

* event registration
* submissions
* point updates
* admin actions

Never expose secret keys in frontend.

---

# Services Layer

Create API abstraction files:

services/
│
├── auth.service.ts
├── events.service.ts
├── leaderboard.service.ts
└── submissions.service.ts

All API calls should go through services.

Do not call fetch directly inside components.

---

# UI Guidelines

Design goals:

* modern
* minimal
* responsive
* gamified
* clean developer-focused aesthetic

Use:

* cards
* badges
* XP indicators
* rankings
* gradient highlights

---

# State Management

Use:

* React Context
* local component state

Avoid Redux for MVP.

---

# Error Handling

Handle:

* loading states
* auth failures
* API failures
* empty states
* submission errors

Never leave blank screens.

---

# Realtime Features

Use Supabase realtime subscriptions for:

* leaderboard updates
* live event status
* competition state changes

---

# Performance Rules

* lazy load routes
* memoize expensive components
* avoid unnecessary re-renders
* keep bundle size small

---

# Important Security Rules

Frontend is public.

Never:

* trust client-side points
* expose admin logic
* expose service role keys
* validate submissions locally

Backend is the source of truth.

---

# MVP Goal

The frontend MVP should support:

* authentication
* dashboard
* leaderboard
* event registration
* codejam submissions

Focus on speed, modularity, and scalability.
