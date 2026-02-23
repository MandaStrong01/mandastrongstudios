/*
  # Update Default Project Name to MandaStrong Studio

  1. Changes
    - Updates the default project name from "Untitled Project" to "MandaStrong Studio Project"
    - Ensures all new projects are branded correctly with MandaStrong Studio
  
  2. Notes
    - This change only affects new projects created after this migration
    - Existing projects will keep their current names
    - Users can still rename projects to anything they want
*/

-- Update the default value for project names
ALTER TABLE projects 
ALTER COLUMN name SET DEFAULT 'MandaStrong Studio Project';
