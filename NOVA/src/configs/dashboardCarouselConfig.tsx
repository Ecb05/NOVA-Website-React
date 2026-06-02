import React from 'react'
import {
  Trophy,
  CalendarCheck,
  GitBranch,
  Star,
  Bell,
  Clock,
  TrendingUp,
  Megaphone,
  Sparkles,
  Rocket,
} from 'lucide-react'

/**
 * User data required to build personalized carousel slides.
 * Add more fields here as the dashboard grows (e.g. upcomingEvents, submissions, etc.)
 */
export interface DashboardCarouselUserData {
  /** Total points the user has earned */
  points: number
}

// ──────────────────────────────────────────────
// Announcements — suitable for viewMode="single"
// ──────────────────────────────────────────────

/**
 * Build announcement slides — one at a time, full width, with dots.
 * Good for important notifications, featured events, or spotlight content.
 */
export function buildAnnouncementSlides(): React.ReactNode[] {
  return [
    <div key="announce-welcome" className="select-none h-full">
      <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-zinc-900 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl p-6 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <Sparkles className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Welcome to NOVA Dashboard
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              Your hub for everything NOVA
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed m-0">
          Explore events, join sprints, track your submissions, and earn points
          — all from one place. Get started by browsing upcoming events!
        </p>
        <div className="mt-4 flex items-center gap-2">
          <a
            href="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            Browse Events
            <Rocket className="size-3.5" />
          </a>
        </div>
      </div>
    </div>,

    <div key="announce-sprints" className="select-none h-full">
      <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-zinc-900 border border-indigo-200/60 dark:border-indigo-900/40 rounded-xl p-6 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <Rocket className="size-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Sprints Are Live!
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              Compete in time-bound challenges
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed m-0">
          Participate in upcoming sprints to showcase your skills, collaborate
          with peers, and climb the leaderboard. New sprints launch regularly!
        </p>
        <div className="mt-4 flex items-center gap-2">
          <a
            href="/sprints"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          >
            View Sprints
            <TrendingUp className="size-3.5" />
          </a>
        </div>
      </div>
    </div>,

    <div key="announce-community" className="select-none h-full">
      <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-zinc-900 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-6 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <Megaphone className="size-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Community Updates
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              What's happening in the community
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed m-0">
          Stay connected with the NOVA community. Join discussions, share your
          projects, and get feedback from fellow developers and mentors.
        </p>
        <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30">
          <Bell className="size-4 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="text-xs text-amber-700 dark:text-amber-300 font-medium">
            Check the Announcements page for latest news
          </span>
        </div>
      </div>
    </div>,
  ]
}

// ──────────────────────────────────────────────
// Activity cards — suitable for viewMode="multi"
// ──────────────────────────────────────────────

/**
 * Build activity card slides — multiple visible at once, free-scroll.
 * Great for browsing dashboards cards, stats, and quick actions.
 */
export function buildActivitySlides(data: DashboardCarouselUserData): React.ReactNode[] {
  const { points } = data

  return [
    // Card 1 — Points & achievements
    <div key="act-points" className="select-none h-full">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
            <Trophy className="size-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Points
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              Total earned
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 m-0">
          {points}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <TrendingUp className="size-3.5" />
          Keep participating!
        </div>
      </div>
    </div>,

    // Card 2 — Quick actions
    <div key="act-actions" className="select-none h-full">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm h-full">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0 mb-3">
          Quick Actions
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { label: 'Events', href: '/events', icon: CalendarCheck },
            { label: 'Sprints', href: '/sprints', icon: GitBranch },
            { label: 'Ideasprint', href: '/ideasprint', icon: Star },
            { label: 'Announcements', href: '/announcements', icon: Bell },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
            >
              <link.icon className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>,

    // Card 3 — Registered events snapshot
    <div key="act-events" className="select-none h-full">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
            <CalendarCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Events
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              Your registrations
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 m-0">0</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 m-0">
          No events registered yet
        </p>
      </div>
    </div>,

    // Card 4 — Latest update
    <div key="act-updates" className="select-none h-full">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
            <Clock className="size-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 m-0">
              Latest
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 m-0">
              Recent activity
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
          <Clock className="size-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            No recent updates
          </span>
        </div>
      </div>
    </div>,
  ]
}
