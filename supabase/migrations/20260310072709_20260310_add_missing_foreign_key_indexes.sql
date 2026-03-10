/*
  # Add Missing Foreign Key Indexes

  ## Performance Optimization
  
  This migration adds indexes to foreign key columns that are missing covering indexes.
  Foreign keys without indexes can cause significant performance problems during:
  - JOIN operations
  - DELETE operations on parent tables (cascade checks)
  - UPDATE operations on foreign key columns
  - Query filtering by foreign key values

  ### Indexes Being Added:
  
  1. **admin_featured_movies table**:
     - Index on `admin_id` (foreign key to auth.users)
     - Index on `movie_id` (foreign key to movies)
  
  2. **comments table**:
     - Index on `movie_id` (foreign key to movies)
     - Index on `user_id` (foreign key to auth.users)
  
  3. **movies table**:
     - Index on `user_id` (foreign key to auth.users)
  
  4. **reactions table**:
     - Index on `user_id` (foreign key to auth.users)

  ## Performance Impact
  
  These indexes will significantly improve:
  - Query performance when filtering or joining by these foreign keys
  - DELETE performance on parent tables
  - Overall database responsiveness for these tables
*/

-- Add index for admin_featured_movies.admin_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_admin_id 
ON public.admin_featured_movies(admin_id);

-- Add index for admin_featured_movies.movie_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_movie_id 
ON public.admin_featured_movies(movie_id);

-- Add index for comments.movie_id foreign key
CREATE INDEX IF NOT EXISTS idx_comments_movie_id 
ON public.comments(movie_id);

-- Add index for comments.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_comments_user_id 
ON public.comments(user_id);

-- Add index for movies.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_movies_user_id 
ON public.movies(user_id);

-- Add index for reactions.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_reactions_user_id 
ON public.reactions(user_id);