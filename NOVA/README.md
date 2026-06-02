<div align="center">
  <h1>NOVA</h1>
  <p>The official platform for <strong>NOVA Club</strong> — hackathons, sprints, and community.</p>
</div>

---

## Stack

| Layer      | Technology                                                  |
|------------|-------------------------------------------------------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui    |
| **Backend**  | Express 5 (Node.js), Clerk SDK, Supabase Admin, Notion API |
| **Database** | Supabase (PostgreSQL) with Row-Level Security              |
| **Auth**     | Clerk (email, Google, GitHub OAuth)                        |

---

## Project Structure

```
NOVA/
├── src/                  # Frontend (React + Vite)
│   ├── pages/            # Route pages (Home, Dashboard, Events, etc.)
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Supabase client, utilities
│   └── admin/            # Admin panel
├── backend/              # Backend (Express)
│   └── src/
│       ├── routes/       # API routes (auth, etc.)
│       ├── db/           # Supabase admin client
│       └── middleware/   # Auth middleware
├── supabase/
│   └── migrations/       # Database migration files
└── public/data/          # Static data files
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm**
- A **Supabase** project ([create one](https://supabase.com))
- A **Clerk** application ([create one](https://clerk.com))

### 1. Clone and install

```bash
git clone <repo-url>
cd NOVA
npm install
```

### 2. Set up environment variables

Copy these into a `.env` file at the project root:

```env
# === Supabase (from Supabase Dashboard > Settings > API) ===
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# === Clerk (from Clerk Dashboard > API Keys) ===
VITE_CLERK_PUBLISHABLE_KEY=pk_live_**********
CLERK_SECRET_KEY=sk_live_**********
```

> ⚠️ The backend also requires additional env vars (Notion API key, Cloudinary credentials, JWT secret, etc.). Check `backend/server.js` and `backend/src/db/supabase.js` for the full list of expected variables.

### 3. Run the database migration

Open the **Supabase SQL Editor** and run `supabase/migrations/001_schema.sql` to create all tables and RLS policies.

### 4. Start the frontend (dev server)

```bash
npm run dev
# Opens at http://localhost:5173
```

### 5. Start the backend (in a separate terminal)

```bash
npm run server
# Runs at http://localhost:3001
```

---

## Available Commands

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start frontend dev server (Vite)   |
| `npm run server`  | Start backend server (Express)     |
| `npm run build`   | Build frontend for production      |
| `npm run preview` | Preview production build locally   |
| `npm run lint`    | Run ESLint                         |

---

## Architecture & Key Concepts

### Authentication (Clerk)

- Users sign in/up via Clerk's pre-built UI (routes: `/sign-in`, `/sign-up`)
- On sign-in, the `useSyncUser()` hook automatically syncs the user into the **Supabase `users` table** via the backend
- Protected routes use Clerk's `<SignedIn>` component

### Database (Supabase)

- **Supabase** with **Row-Level Security (RLS)** — frontend uses the anon key (RLS-enforced), backend uses the service role key (bypasses RLS)
- 5 tables: `users`, `events`, `event_registrations`, `submissions`, `announcements`
- Full schema documentation → [`SCHEMA.md`](SCHEMA.md)

### Backend

- Express 5 server at `backend/server.js`
- Currently uses **Notion API** for event registrations and hackathon submissions
- Clerk auth routes at `/api/auth/*` — syncs users and fetches profiles from Supabase

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and test locally
4. Open a pull request

See [`SCHEMA.md`](SCHEMA.md) for database details if you're working on data-layer changes.

---

<div align="center">
  <sub>Built by the NOVA team · <a href="https://thenova.club">thenova.club</a></sub>
</div>
