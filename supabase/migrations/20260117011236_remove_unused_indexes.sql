/*
  # Remove Unused Indexes

  This migration removes database indexes that are not being used by any queries,
  which improves write performance and reduces storage overhead.

  1. Dropped Indexes
    - `idx_project_assets_asset_id` - Unused index on project_assets.asset_id
    - `idx_project_assets_project_id` - Unused index on project_assets.project_id
    - `idx_projects_user_id` - Unused index on projects.user_id

  2. Performance Impact
    - Reduces write overhead on INSERT, UPDATE, DELETE operations
    - Frees up storage space
    - No impact on query performance since indexes were not being used

  Note: The foreign key constraints remain in place for data integrity.
  If query patterns change in the future and these indexes are needed,
  they can be re-created.
*/

-- Drop unused index on project_assets.asset_id
DROP INDEX IF EXISTS idx_project_assets_asset_id;

-- Drop unused index on project_assets.project_id
DROP INDEX IF EXISTS idx_project_assets_project_id;

-- Drop unused index on projects.user_id
DROP INDEX IF EXISTS idx_projects_user_id;
