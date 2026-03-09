/*
  # Remove Unused Indexes on Media Assets and Projects

  ## Performance Optimization
  
  This migration removes indexes that are not being used by any queries.
  Unused indexes consume disk space and slow down INSERT, UPDATE, and DELETE operations
  without providing any query performance benefits.

  ### Indexes Being Removed:
  
  1. **media_assets table**:
     - `idx_media_assets_project_id` - Unused index on project_id
     - `idx_media_assets_user_id` - Unused index on user_id
  
  2. **projects table**:
     - `idx_projects_user_id` - Unused index on user_id
  
  3. **render_jobs table**:
     - `idx_render_jobs_project_id` - Unused index on project_id
     - `idx_render_jobs_user_id` - Unused index on user_id

  ## Performance Impact
  
  Removing these indexes will:
  - Free up disk space
  - Improve INSERT/UPDATE/DELETE performance on these tables
  - Reduce maintenance overhead
  
  ## Important Note
  
  These tables may not be actively used yet or query patterns don't require these indexes.
  If these tables become more actively queried in the future, we can re-add indexes
  based on actual query performance analysis.
*/

-- Drop unused indexes on media_assets
DROP INDEX IF EXISTS public.idx_media_assets_project_id;
DROP INDEX IF EXISTS public.idx_media_assets_user_id;

-- Drop unused indexes on projects
DROP INDEX IF EXISTS public.idx_projects_user_id;

-- Drop unused indexes on render_jobs
DROP INDEX IF EXISTS public.idx_render_jobs_project_id;
DROP INDEX IF EXISTS public.idx_render_jobs_user_id;