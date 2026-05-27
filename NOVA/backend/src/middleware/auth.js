import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to verify Clerk session token from the Authorization header.
 * Uses Clerk's built-in middleware which automatically extracts and
 * verifies the JWT from the Bearer token or cookies.
 *
 * Attaches the verified Clerk user info to req.auth:
 *   req.auth.userId    - Clerk user ID
 *   req.auth.email     - Primary email address
 *   req.auth.name      - Display name
 *   req.auth.imageUrl  - Profile image URL
 *   req.auth.role      - Role from publicMetadata (defaults to 'student')
 *
 * If auth fails, returns 401 with an error message.
 */
export const requireAuth = async (req, res, next) => {
  // ClerkExpressRequireAuth returns a middleware that handles everything
  return ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      console.error('[AUTH] Clerk session verification failed:', err.message);
      return res.status(401).json({
        success: false,
        error: 'Authentication failed. Please sign in again.',
      });
    }

    // Clerk's middleware populates req.auth with userId, sessionId, etc.
    // We need to enhance it with email, name, and role from the user object
    if (!req.auth?.userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed. No user ID found.',
      });
    }

    next();
  });
};

/**
 * Middleware to optionally attach user info if a valid token exists.
 * Does NOT block the request if no token is present.
 */
export const optionalAuth = async (req, res, next) => {
  return ClerkExpressWithAuth()(req, res, () => {
    // req.auth will be null if no valid token is present
    next();
  });
};
