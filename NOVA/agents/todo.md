# NOVA Club Platform — Progress Log


## ✅ Session 1 Completed
- Set up Supabase project + migration (`001_schema.sql`) — tables: `users`, `events`, `event_registrations`, `submissions`, `announcements` with RLS
- Installed packages: `@clerk/clerk-react`, `@supabase/supabase-js` (frontend), `@clerk/clerk-sdk-node`, `@supabase/supabase-js` (backend)
- Wrapped app with `<ClerkProvider>` in `main.tsx`
- Created `src/lib/supabase.ts` (frontend Supabase client)
- Created `.env.example` and `backend/.env.example`
- Created `supabase/migrations/001_schema.sql` (with `auth.uid()::text` cast fix)

## ✅ Session 2 Completed — Backend auth infrastructure
- Created `backend/src/db/supabase.js` — Supabase admin client (service role key)
- Created `backend/src/middleware/auth.js` — Clerk session verification using `ClerkExpressRequireAuth`
- Created `backend/src/routes/auth.js` — `POST /api/auth/sync-user` and `GET /api/auth/me`
- Wired auth routes into `backend/server.js`

## ✅ Session 2 — Frontend auth integration
- Created `src/pages/SignIn.tsx` — dark-themed Clerk `<SignIn>` and `<SignUp>` pages
- Updated `src/App.tsx` — added `/sign-in`, `/sign-up` routes and protected `/dashboard` with `<SignedIn>`
- Added `<UserButton />` and modal `<SignInButton>` to `Navbar.tsx`
- Created `src/components/NavbarAuth.css` for auth button styling

## ✅ Session 2 — TypeScript fixes
- Installed `motion` package (needed by team components)
- Fixed unused imports in `EventBook.tsx` and `Footer.tsx`
- Fixed `TeamLeaderCard.tsx` framer-motion variant typing
- `npx tsc --noEmit` passes with zero errors

## ✅ Session 3 — User sync fix
- **Root cause:** Clerk handles login UI but nothing called the backend to write user data to Supabase
- Created `src/hooks/useSyncUser.ts` — React hook that runs on sign-in, gets Clerk session token, and calls `POST /api/auth/sync-user` with Bearer token
- **Bug fix #1 (frontend):** `synced` ref now tracks `userId` instead of a boolean — so if a different user signs in, the sync runs again
- **Bug fix #2 (backend):** Auth middleware was using `clerkClient.sessions.verifySession({ sessionId: token })` but `getToken()` returns a JWT, not a session ID. Rewrote middleware to use `ClerkExpressRequireAuth()` and `ClerkExpressWithAuth()` per Clerk docs
- **Bug fix #3 (backend):** Route handler now fetches user email/name from Clerk inside the handler (since Clerk built-in middleware only provides `userId`/`sessionId`)

## ✅ Session 4 — Fixed dotenv.config() path resolution
- **Problem:** Running `node backend/server.js` from project root caused `dotenv.config()` to look for `.env` in the project root (CWD), not in `backend/` — so `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` were never loaded
- Updated `backend/server.js` — `dotenv.config()` → `dotenv.config({ path: resolve(__dirname, '.env') })`
- Updated `backend/src/db/supabase.js` — `dotenv.config()` → `dotenv.config({ path: resolve(__dirname, '../../.env') })`
- Both files now resolve `backend/.env` relative to the file's own location (`__dirname`) instead of relying on CWD

## 🔲 User still needs to do
- Verify the backend server starts successfully (try `node backend/server.js` now)
- Test the sign-in → sync flow end-to-end

## 🔜 Next session
- Create Dashboard page with leaderboard, events overview, and user profile
  - for the dashboard, implement a sidebar with user profile options and links to customize thier details .in this side bar protected routes of the activites and thier pages will be there. 
  - we also need to develop the user activity feed thats the default page once the user logs in. Think notion.
- Build event registration flow using Supabase
- Migrate existing registration/submission endpoints from Notion to Supabase
- Add Clerk role-based admin panel


