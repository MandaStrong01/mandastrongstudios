/*
  # Add Foreign Key Indexes for Performance

  1. Performance Improvements
    - Add index on `project_assets.asset_id` for faster joins with media_assets
    - Add index on `project_assets.project_id` for faster joins with projects
    - Add index on `projects.user_id` for faster user project queries
  
  2. Security & Best Practices
    - These indexes improve query performance when filtering by foreign keys
    - Prevents full table scans when joining related tables
    - Essential for production workloads with growing data

  Note: These indexes are created with `IF NOT EXISTS` to ensure idempotency
*/

-- Index for project_assets.asset_id foreign key
CREATE INDEX IF NOT EXISTS idx_project_assets_asset_id 
ON project_assets(asset_id);

-- Index for project_assets.project_id foreign key
CREATE INDEX IF NOT EXISTS idx_project_assets_project_id 
ON project_assets(project_id);

-- Index for projects.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_projects_user_id 
ON projects(user_id);

-- Optional: Composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_project_assets_project_asset 
ON project_assets(project_id, asset_id);
