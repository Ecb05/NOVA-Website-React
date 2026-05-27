-- ============================================
-- NOVA Club Platform — Database Schema
-- ============================================

-- 1. users
CREATE TABLE IF NOT EXISTS public.users (
  id         TEXT PRIMARY KEY,          -- Clerk user ID
  email      TEXT UNIQUE NOT NULL,
  name       TEXT,
  role       TEXT DEFAULT 'student',     -- 'student' | 'admin'
  points     INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "users_read_own" ON public.users
  FOR SELECT USING (auth.uid()::text = id);

-- Backend service role can update points (via supabase service role key)
-- Service role bypasses RLS by default, so no policy needed for writes.

-- 2. events
CREATE TABLE IF NOT EXISTS public.events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  start_time  TIMESTAMP,
  end_time    TIMESTAMP,
  created_at  TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "events_public_read" ON public.events
  FOR SELECT USING (true);

-- Only authenticated users with admin role can insert/update/delete
-- Handled by backend service role

-- 3. event_registrations
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  event_id       UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registered_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Authenticated users can create their own registrations
CREATE POLICY "registrations_insert_own" ON public.event_registrations
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can read their own registrations
CREATE POLICY "registrations_read_own" ON public.event_registrations
  FOR SELECT USING (auth.uid()::text = user_id);

-- 4. submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title         TEXT,
  repo_url      TEXT,
  status        TEXT DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  score         INTEGER DEFAULT 0,
  submitted_at  TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Authenticated users can create their own submissions
CREATE POLICY "submissions_insert_own" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Users can read only their own submissions
CREATE POLICY "submissions_read_own" ON public.submissions
  FOR SELECT USING (auth.uid()::text = user_id);

-- 5. announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  content    TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "announcements_public_read" ON public.announcements
  FOR SELECT USING (true);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email       ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_points      ON public.users(points DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user  ON public.submissions(user_id);
