import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'

/**
 * useSyncUser
 *
 * Automatically syncs the authenticated Clerk user into the Supabase `users` table.
 * Runs once after the user signs in or refreshes the page with an active session.
 *
 * Call this once at the app root (e.g., in App.tsx or a dedicated component).
 */
export function useSyncUser(): void {
  const { isSignedIn, userId, getToken } = useAuth()
  const syncedUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!isSignedIn || !userId || syncedUserId.current === userId) return

    const syncUser = async () => {
      try {
        const token = await getToken()

        if (!token) {
          console.warn('[SYNC-USER] No session token available')
          return
        }

        const response = await fetch('/api/auth/sync-user', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        if (data.success) {
          console.log(`[SYNC-USER] User synced: ${data.user?.email || userId}`)
          syncedUserId.current = userId
        } else {
          console.warn('[SYNC-USER] Sync failed:', data.error)
        }
      } catch (error) {
        // Backend might be offline — this is non-critical, so just log
        console.warn('[SYNC-USER] Could not reach backend:', error)
      }
    }

    syncUser()
  }, [isSignedIn, userId, getToken])
}
