'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  UserCircle,
  CalendarCheck,
  GitBranch,
  Settings,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path?: string
  adminOnly?: boolean
  onClick?: () => void
}

interface DashboardSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userRole?: string
  isDark?: boolean
  onThemeToggle?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <UserCircle className="size-5" />,
  },
  {
    id: 'events',
    label: 'Events',
    icon: <CalendarCheck className="size-5" />,
  },
  {
    id: 'submissions',
    label: 'Submissions',
    icon: <GitBranch className="size-5" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="size-5" />,
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: <Shield className="size-5" />,
    adminOnly: true,
  },
]

function SidebarContent({
  activeSection,
  onSectionChange,
  userRole,
  isCollapsed,
  isDark,
  onThemeToggle,
  onItemClick,
}: DashboardSidebarProps & {
  isCollapsed: boolean
  onItemClick?: () => void
}) {
  const { user } = useUser()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = useCallback(async () => {
    await signOut()
    navigate('/')
  }, [signOut, navigate])

  const handleNavClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick()
      return
    }
    if (item.id === 'admin') {
      navigate('/admin')
      return
    }
    onSectionChange(item.id)
    onItemClick?.()
  }

  const displayName = user?.fullName || user?.username || 'User'
  const displayEmail = user?.emailAddresses?.[0]?.emailAddress || ''
  const profileImage = user?.imageUrl

  const NavButton = ({ item }: { item: NavItem }) => {
    const isActive = activeSection === item.id
    const btn = (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'w-full justify-start gap-3 px-3 h-9 text-sm font-medium rounded-md transition-all',
          isCollapsed && 'justify-center px-2',
          isActive
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 hover:text-emerald-800 dark:hover:text-emerald-200'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        )}
        onClick={() => handleNavClick(item)}
      >
        <span className={cn('shrink-0', isActive && 'text-emerald-600 dark:text-emerald-400')}>
          {item.icon}
        </span>
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </Button>
    )

    if (isCollapsed) {
      return (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{btn}</TooltipTrigger>
          <TooltipContent side="right" className="ml-2 text-xs">
            {item.label}
          </TooltipContent>
        </Tooltip>
      )
    }

    return btn
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 dark:border-zinc-800 min-h-[60px]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
            <Sparkles className="size-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-base font-bold text-zinc-800 dark:text-zinc-100 tracking-tight whitespace-nowrap">
              NOVA Dashboard
            </span>
          )}
        </div>
      </div>

      {/* User profile */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800',
          isCollapsed && 'justify-center px-2'
        )}
      >
        <div className="relative shrink-0">
          <Avatar className="size-10 ring-2 ring-emerald-100 dark:ring-emerald-900">
            {profileImage ? (
              <AvatarImage src={profileImage} alt={displayName} />
            ) : (
              <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 text-xs font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col gap-0.5 overflow-hidden min-w-0">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate m-0">
              {displayName}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate m-0">{displayEmail}</p>
            <span
              className={cn(
                'inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider w-fit',
                userRole === 'admin'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              )}
            >
              {userRole === 'admin' ? 'Admin' : 'Member'}
            </span>
          </div>
        )}
      </div>

      {/* Navigation — scrollable area that pushes footer to bottom */}
      <div className="flex-1 overflow-y-auto px-2 py-3 hide-scrollbar">
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            if (item.adminOnly && userRole !== 'admin') return null
            return <NavButton key={item.id} item={item} />
          })}
        </nav>
      </div>

      {/* Theme toggle + Sign out — pinned to bottom */}
      <div className="px-2 pt-3 pb-4 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
        {/* Theme toggle */}
        {isCollapsed ? (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center px-2 h-9 text-zinc-400 dark:text-zinc-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                onClick={onThemeToggle}
              >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {isDark ? 'Light mode' : 'Dark mode'}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 px-3 h-9 text-zinc-400 dark:text-zinc-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
            onClick={onThemeToggle}
          >
            {isDark ? <Sun className="size-5 shrink-0" /> : <Moon className="size-5 shrink-0" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
        )}

        {/* Sign out */}
        {isCollapsed ? (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center px-2 h-9 text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md"
                onClick={handleSignOut}
              >
                <LogOut className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Sign Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 px-3 h-9 text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md"
            onClick={handleSignOut}
          >
            <LogOut className="size-5 shrink-0" />
            <span>Sign Out</span>
          </Button>
        )}
      </div>
    </div>
  )
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
  userRole = 'student',
  isDark = false,
  onThemeToggle,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  // Desktop sidebar
  const DesktopSidebar = (
    <aside
      className={cn(
        'fixed top-20 left-0 h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shadow-sm dark:shadow-black/20',
        isCollapsed ? 'w-[68px]' : 'w-[260px]'
      )}
    >
      <TooltipProvider>
        <SidebarContent
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          userRole={userRole}
          isCollapsed={isCollapsed}
          isDark={isDark}
          onThemeToggle={onThemeToggle}
        />
      </TooltipProvider>

      {/* Collapse toggle */}
      <button
        onClick={() => onToggleCollapse?.()}
        className="absolute -right-3 top-8 size-6 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all z-50 cursor-pointer shadow-sm dark:shadow-black/20"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="size-3" />
        ) : (
          <ChevronLeft className="size-3" />
        )}
      </button>
    </aside>
  )

  return (
    <>
      {/* Mobile trigger */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-24 left-4 z-50 md:hidden size-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm"
          >
            {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[260px] p-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 pt-20"
        >
          <TooltipProvider>
            <SidebarContent
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              userRole={userRole}
              isCollapsed={false}
              isDark={isDark}
              onThemeToggle={onThemeToggle}
              onItemClick={() => setIsMobileOpen(false)}
            />
          </TooltipProvider>
        </SheetContent>
      </Sheet>

      {DesktopSidebar}
    </>
  )
}

export default DashboardSidebar
