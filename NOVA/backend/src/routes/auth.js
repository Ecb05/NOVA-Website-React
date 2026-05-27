import { Router } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { supabaseAdmin } from '../db/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/auth/sync-user
 *
 * Syncs the authenticated Clerk user into the Supabase `users` table.
 * Called on the frontend after a user signs in or refreshes the page.
 */
router.post('/sync-user', requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;

    // Fetch user details from Clerk to get email, name, imageUrl
    const clerkUser = await clerkClient.users.getUser(userId);

    const email = clerkUser.emailAddresses[0]?.emailAddress || null;
    const name =
      clerkUser.firstName && clerkUser.lastName
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser.firstName || clerkUser.username || 'Unknown';
    const imageUrl = clerkUser.imageUrl;

    // Upsert the user into Supabase
    const { data, error } = await supabaseAdmin.from('users').upsert(
      {
        id: userId,
        email,
        name,
        role: 'student',
        points: 0,
      },
      {
        onConflict: 'id',
        ignoreDuplicates: false,
      }
    ).select('*').single();

    if (error) {
      console.error('[SYNC-USER] Supabase upsert error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to sync user',
      });
    }

    console.log(`[SYNC-USER] Synced user: ${email} (${userId})`);

    // If the Clerk user has no publicMetadata.role, set it from Supabase
    // This ensures the role is synchronized both ways
    if (!clerkUser.publicMetadata?.role) {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          role: data.role || 'student',
        },
      });
    }

    return res.json({
      success: true,
      message: 'User synced successfully',
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        points: data.points,
        createdAt: data.created_at,
      },
    });
  } catch (error) {
    console.error('[SYNC-USER] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to sync user',
    });
  }
});

/**
 * GET /api/auth/me
 *
 * Returns the current authenticated user's profile from Supabase.
 */
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { userId } = req.auth;

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // User not found in Supabase — try syncing
        return res.status(404).json({
          success: false,
          error: 'User not found. Please try syncing your account.',
          needsSync: true,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to fetch user profile',
      });
    }

    return res.json({
      success: true,
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        points: data.points,
        createdAt: data.created_at,
      },
    });
  } catch (error) {
    console.error('[ME] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
    });
  }
});

export default router;
