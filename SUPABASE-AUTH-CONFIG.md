# Supabase Auth Configuration Required

The following security configurations need to be applied through the Supabase Dashboard. These cannot be set via SQL migrations and require project admin access.

## Required Configuration Changes

### 1. Auth DB Connection Strategy (High Priority)

**Current Issue:** Auth server is using a fixed connection limit (10 connections) which won't scale with instance upgrades.

**Fix Required:**
1. Go to Supabase Dashboard: https://okgmbyaeabifoyhssdcp.supabase.co
2. Navigate to: **Project Settings** > **Database** > **Connection Pooling**
3. Find the **Auth Server Pool** configuration
4. Change from **Fixed** to **Percentage** mode
5. Set the percentage to **15%** (recommended for most applications)
6. Click **Save**

**Why This Matters:**
- Allows Auth connections to scale automatically when you upgrade your database instance
- Prevents Auth server from becoming a bottleneck as your app grows
- Improves overall system reliability and performance

### 2. Leaked Password Protection (High Priority)

**Current Issue:** HaveIBeenPwned password checking is disabled, allowing users to set compromised passwords.

**Fix Required:**
1. Go to Supabase Dashboard: https://okgmbyaeabifoyhssdcp.supabase.co
2. Navigate to: **Authentication** > **Providers** > **Email**
3. Scroll down to **Security and Protection**
4. Find **Leaked Password Protection**
5. Toggle **Enable HaveIBeenPwned Integration** to **ON**
6. Click **Save**

**Why This Matters:**
- Prevents users from setting passwords that have been exposed in data breaches
- Significantly improves account security
- Protects users from credential stuffing attacks
- Industry best practice for modern authentication systems

## Database Indexes (✅ Completed)

The following database performance issues have been fixed via migrations:

✅ Added index on `admin_featured_movies.admin_id`
✅ Added index on `admin_featured_movies.movie_id`
✅ Added index on `comments.user_id`
✅ Added index on `movies.user_id`
✅ Added index on `reactions.user_id`
✅ Removed unused index `idx_comments_movie_id`

These changes improve query performance and prevent potential DoS attacks through slow database queries.

## Verification

After applying the Auth configuration changes:

1. **Connection Strategy:** Check that Auth pool shows a percentage value (15%) instead of a fixed number
2. **Password Protection:** Try registering with a known compromised password like "password123" - it should be rejected

## Support

If you need assistance accessing these settings, contact your Supabase project administrator or refer to:
- Connection Pooling: https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooling
- Auth Security: https://supabase.com/docs/guides/auth/auth-password-protection
