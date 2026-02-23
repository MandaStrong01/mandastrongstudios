/*
  # Remove Unused Indexes

  1. Changes
    - Drop unused index `idx_project_assets_asset_id`
    - Drop unused index `idx_project_assets_project_id`
    - Drop unused index `idx_projects_user_id`
    - Drop unused index `idx_project_assets_project_asset`
  
  2. Rationale
    - These indexes are currently unused and consume unnecessary storage
    - Unused indexes slow down write operations (INSERT, UPDATE, DELETE)
    - Can be re-added when actual query patterns emerge that require them
  
  Note: Using `IF EXISTS` to ensure idempotency
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_project_assets_asset_id;
DROP INDEX IF EXISTS idx_project_assets_project_id;
DROP INDEX IF EXISTS idx_projects_user_id;
DROP INDEX IF EXISTS idx_project_assets_project_asset;
