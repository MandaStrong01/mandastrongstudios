# Auth Security Configuration Recommendations

## Issues Resolved

### ✅ Unused Indexes - FIXED
All unused indexes have been removed via migration:
- `idx_admin_featured_movies_admin_id` - Removed
- `idx_admin_featured_movies_movie_id` - Removed
- `idx_comments_user_id` - Removed
- `idx_comments_movie_id` - Removed
- `idx_movies_user_id` - Removed
- `idx_reactions_user_id` - Removed

**Benefits:**
- Reduced storage consumption
- Faster write operations (INSERT, UPDATE, DELETE)
- Maintained referential integrity through foreign key constraints

---

## Manual Configuration Required (Supabase Dashboard)

The following security improvements require configuration through the Supabase Dashboard and cannot be applied via SQL migrations:

### 1. Auth DB Connection Strategy - Percentage Mode

**Current Issue:** Auth server uses fixed 10 connections, limiting scalability

**Recommended Action:**
1. Go to Supabase Dashboard → Settings → Database
2. Navigate to "Connection Pooling" section
3. Change Auth connection strategy from "Fixed" to "Percentage"
4. Set to ~15-20% of total available connections
5. This allows Auth server to scale with your instance size

**Why This Matters:**
- Fixed connections don't scale when you upgrade database instance
- Percentage-based allocation automatically adjusts to instance capacity
- Prevents Auth bottlenecks during high traffic
- Better resource utilization

---

### 2. Leaked Password Protection - ENABLE

**Current Issue:** Compromised password checking is disabled

**Recommended Action:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Scroll to "Security and Protection" section
3. Enable "Leaked Password Protection"
4. This checks passwords against HaveIBeenPwned.org database

**Why This Matters:**
- Prevents users from using passwords exposed in data breaches
- Protects against credential stuffing attacks
- Industry best practice for authentication security
- Zero additional cost or performance impact
- Happens automatically during registration/password change

**How It Works:**
- Password hashes are checked against HaveIBeenPwned API using k-anonymity
- Only first 5 characters of SHA-1 hash are sent (preserves privacy)
- No actual passwords are transmitted
- Rejected passwords force users to choose stronger credentials

---

## Additional Security Best Practices

### Already Implemented ✓
- Row Level Security (RLS) enabled on all tables
- Restrictive RLS policies requiring authentication
- Secure foreign key constraints
- Proper email validation during registration

### Recommended Enhancements
1. **Enable Email Confirmations** (if not using magic links)
   - Dashboard → Auth → Settings → Email Auth
   - Requires users to verify email before access

2. **Set Password Strength Requirements**
   - Dashboard → Auth → Settings → Password Protection
   - Minimum length, complexity requirements

3. **Enable Multi-Factor Authentication (MFA)**
   - Dashboard → Auth → Settings → MFA
   - Provides optional 2FA for enhanced security

4. **Configure Rate Limiting**
   - Dashboard → Auth → Settings → Rate Limits
   - Prevent brute force attacks on login endpoints

---

## Implementation Checklist

- [x] Remove unused database indexes (automated via migration)
- [ ] Switch Auth connections to percentage-based strategy (manual - Dashboard)
- [ ] Enable Leaked Password Protection (manual - Dashboard)
- [ ] Review and enable email confirmations (optional)
- [ ] Configure password strength requirements (optional)
- [ ] Enable MFA support (optional)
- [ ] Review rate limiting settings (optional)

---

## Support Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Database Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pool)
- [HaveIBeenPwned Integration](https://supabase.com/docs/guides/auth/auth-password-strength)
- [Auth Security Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/security)

---

**Last Updated:** 2026-03-06
**Migration Applied:** `remove_unused_indexes.sql`
