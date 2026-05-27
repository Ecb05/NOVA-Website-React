import React, { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import {
  CalendarCheck,
  GitBranch,
  Star,
  Medal,
  Trophy,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  User,
  Bell,
  Lock,
  Shield,
  ExternalLink,
} from 'lucide-react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')
  const [userPoints, setUserPoints] = useState<number>(0)
  const [userRole, setUserRole] = useState<string>('student')
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nova-dashboard-theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // Apply dark class to html element and persist preference
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('nova-dashboard-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  // Sync with system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('nova-dashboard-theme')
      if (!stored) {
        setIsDark(e.matches)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      try {
        const token = await getToken()
        if (!token) return

        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (data.success && data.user) {
          setUserPoints(data.user.points ?? 0)
          setUserRole(data.user.role ?? 'student')
        }
      } catch {
        // Backend might be offline — use defaults
      }
    }

    fetchProfile()
  }, [user, getToken])

  const getGreeting = (): string => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const displayName = user?.fullName || user?.username || 'there'
  const initials = displayName.charAt(0).toUpperCase()
  const profileImage = user?.imageUrl

  const sectionHeader = (title: string, desc: string) => (
    <div className="mb-7">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 m-0 tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 m-0">{desc}</p>
    </div>
  )

  const emptyState = (icon: React.ReactNode, title: string, desc: string) => (
    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <CardContent className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="text-zinc-200 dark:text-zinc-700 mb-5">{icon}</div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 m-0 mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 m-0 max-w-xs leading-relaxed">
          {desc}
        </p>
      </CardContent>
    </Card>
  )

  // --- OVERVIEW SECTION ---

  const GreetingCard = () => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 border-0 shadow-lg mb-7">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 size-28 rounded-full bg-white/5 pointer-events-none" />
      <CardContent className="p-7 md:p-9 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="size-12 ring-2 ring-white/40 shadow-md">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={displayName} />
                ) : (
                  <AvatarFallback className="bg-emerald-200 text-emerald-800 text-sm font-bold">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white m-0">
                  {getGreeting()}, {displayName}!
                </h2>
                <p className="text-sm text-emerald-100/80 m-0 mt-0.5">
                  Welcome to your dashboard
                </p>
              </div>
            </div>
            <p className="text-sm text-white/80 m-0 mt-3 max-w-lg leading-relaxed">
              Manage your profile, track your events, check your submissions,
              and stay connected with the NOVA community.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-2 rounded-lg bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm">
              <Trophy className="size-4" />
              <span>{userPoints} points earned</span>
            </div>
          </div>
          <Sparkles className="size-7 text-white/30 shrink-0 hidden md:block" />
        </div>
      </CardContent>
    </Card>
  )

  interface StatCardProps {
    icon: React.ReactNode
    value: string | number
    label: string
    trend?: string
    trendUp?: boolean
    color: 'emerald' | 'indigo' | 'amber' | 'pink'
  }

  const StatCard = ({ icon, value, label, trend, trendUp, color }: StatCardProps) => {
    const accentMap = {
      emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/50', icon: 'text-emerald-600 dark:text-emerald-400' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/50', icon: 'text-indigo-600 dark:text-indigo-400' },
      amber: { bg: 'bg-amber-50 dark:bg-amber-950/50', icon: 'text-amber-600 dark:text-amber-400' },
      pink: { bg: 'bg-pink-50 dark:bg-pink-950/50', icon: 'text-pink-600 dark:text-pink-400' },
    }
    const a = accentMap[color]
    return (
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md dark:hover:shadow-black/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className={cn(
                'size-9 rounded-lg flex items-center justify-center',
                a.bg,
                a.icon
              )}
            >
              {icon}
            </div>
            {trend && (
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'
                )}
              >
                <TrendingUp className="size-3.5" />
                {trend}
              </div>
            )}
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 m-0 mb-0.5 tracking-tight">
            {value}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 m-0">{label}</p>
        </CardContent>
      </Card>
    )
  }

  const QuickLinks = () => (
    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <CardHeader className="pb-3 px-6 pt-6">
        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Quick Links
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Browse Events', href: '/events', icon: CalendarCheck },
            { label: 'View Sprints', href: '/sprints', icon: GitBranch },
            { label: 'Visit Ideasprint', href: '/ideasprint', icon: Star },
            { label: 'See Announcements', href: '/announcements', icon: Bell },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
            >
              <link.icon className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
              <span>{link.label}</span>
              <ArrowRight className="size-3.5 ml-auto text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const OverviewSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      <GreetingCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatCard
          icon={<CalendarCheck className="size-4" />}
          value={0}
          label="Registered Events"
          trend="+0%"
          trendUp={false}
          color="emerald"
        />
        <StatCard
          icon={<GitBranch className="size-4" />}
          value={0}
          label="Submissions"
          trend="—"
          color="indigo"
        />
        <StatCard
          icon={<Star className="size-4" />}
          value={userPoints}
          label="Total Points"
          trend="+0"
          trendUp={false}
          color="amber"
        />
        <StatCard
          icon={<Medal className="size-4" />}
          value="—"
          label="Leaderboard Rank"
          color="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <QuickLinks />

        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardHeader className="pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Latest Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
              Stay tuned for upcoming events, hackathons, and community
              activities. Check the{' '}
              <a
                href="/events"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 font-medium"
              >
                Events page
              </a>{' '}
              for what's coming next.
            </p>
            <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
              <Clock className="size-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                No recent updates — check back soon
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // --- PROFILE SECTION ---

  const ProfileSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('My Profile', 'View and manage your personal details')}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 lg:col-span-2">
          <CardHeader className="pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <User className="size-4 text-zinc-400 dark:text-zinc-500" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <div className="space-y-1">
              <InfoRow label="Name" value={user?.fullName || 'Not set'} />
              <InfoRow
                label="Email"
                value={user?.emailAddresses?.[0]?.emailAddress || 'Not set'}
              />
              <InfoRow label="Username" value={user?.username || 'Not set'} />
              <InfoRow label="Role" value={userRole === 'admin' ? 'Admin' : 'Member'} />
              <InfoRow
                label="Member since"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : '—'
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <ExternalLink className="size-4 text-zinc-400 dark:text-zinc-500" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
                Your profile is managed through Clerk. Click your avatar in the
                top-right to update your name, email, and photo.
              </p>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="pb-3 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Shield className="size-4 text-zinc-400 dark:text-zinc-500" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
                Authentication is handled securely via Clerk. Use the user menu
                to manage your password and security settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // --- EVENTS SECTION ---

  const EventsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('My Events', "Events you've registered for")}
      {emptyState(
        <CalendarCheck className="size-14" />,
        'No events yet',
        "You haven't registered for any events yet. Browse upcoming events and join the community!"
      )}
    </div>
  )

  // --- SUBMISSIONS SECTION ---

  const SubmissionsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('My Submissions', 'Your hackathon and sprint submissions')}
      {emptyState(
        <GitBranch className="size-14" />,
        'No submissions yet',
        'Submit your first project during the next hackathon or sprint event.'
      )}
    </div>
  )

  // --- SETTINGS SECTION ---

  const SettingsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('Settings', 'Account and notification preferences')}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardHeader className="pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Bell className="size-4 text-zinc-400 dark:text-zinc-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
              Notification preferences are coming soon. You'll be able to manage
              email updates and event reminders here.
            </p>
            <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
              <Clock className="size-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardHeader className="pb-3 px-6 pt-6">
            <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Lock className="size-4 text-zinc-400 dark:text-zinc-500" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed m-0">
              Your account is managed through Clerk, providing secure
              authentication. To update your password or manage security
              settings, use the Clerk user menu.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'profile':
        return <ProfileSection />
      case 'events':
        return <EventsSection />
      case 'submissions':
        return <SubmissionsSection />
      case 'settings':
        return <SettingsSection />
      default:
        return null
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center justify-center min-h-screen text-zinc-400 dark:text-zinc-500 text-sm">
          <svg
            className="animate-spin size-5 mr-3 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userRole={userRole}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />
      <main className="flex-1 md:ml-[260px] min-h-screen transition-all duration-300 pt-20 md:pt-24">
        <div className="max-w-6xl px-5 py-8 md:px-8 md:py-10 mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <span className="text-sm text-zinc-500 dark:text-zinc-400 min-w-[120px] shrink-0">
        {label}
      </span>
      <span className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">{value}</span>
    </div>
  )
}

export default Dashboard
