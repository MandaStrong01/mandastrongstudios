# MandaStrong Studio Branding Update

## Issue Fixed
Projects now save with "MandaStrong Studio" branding instead of any old names.

## Changes Made

### 1. Database Default Project Name
- **Updated**: Default project name changed from "Untitled Project" to "MandaStrong Studio Project"
- **Location**: `projects` table in Supabase
- **Effect**: All NEW projects created will automatically be named "MandaStrong Studio Project"

### 2. Service Worker Cache Names
- **Updated**: Cache version bumped to v2 to force refresh
- **Old caches cleaned**: Removes any caches named "manda-movies" or similar
- **New cache names**:
  - `mandastrong-studio-v2`
  - `mandastrong-runtime-v2`

### 3. Auto-Update on Reload
- **Added**: Service worker now checks for updates on every app load
- **Auto-reload**: When a new version is detected, app automatically reloads
- **Benefit**: Users always get the latest branding and features

## How to Update for Existing Users

If you or your users still see "Manda Movies" or old branding:

### Option 1: Hard Refresh (Recommended)
1. Open the app in your browser
2. Press **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac)
3. This clears the cache and reloads with fresh content

### Option 2: Clear Browser Data
1. Open browser settings
2. Go to Privacy/Clear browsing data
3. Select "Cached images and files"
4. Clear data for the last hour
5. Reload the app

### Option 3: Uninstall and Reinstall PWA
1. Right-click the app icon (desktop) or long-press (mobile)
2. Select "Uninstall" or "Remove from Chrome"
3. Visit the website again
4. Click "Install" when prompted
5. Fresh install with correct branding

### Option 4: Developer Tools (Advanced)
1. Open the app
2. Press **F12** to open DevTools
3. Go to **Application** tab
4. Click **Storage** in left sidebar
5. Click **Clear site data**
6. Reload the page

## What's Branded as "MandaStrong Studio"

### PWA Manifest
- ✅ App Name: "MandaStrong Studio"
- ✅ Short Name: "MandaStrong"
- ✅ Description: "All In One Make Your Own Longer Movies App"

### Browser Cache
- ✅ Cache Name: "mandastrong-studio-v2"
- ✅ Runtime Cache: "mandastrong-runtime-v2"

### Database
- ✅ Default Project Name: "MandaStrong Studio Project"
- ✅ Table Names: Uses "movies" and "projects" (generic, intentional)

### UI Elements
- ✅ Page Title: "MandaStrong Studio - Create Your Movies"
- ✅ Main Heading: "MANDASTRONG STUDIO"
- ✅ Footer: "MandaStrong Studio 2025"

### Service Worker
- ✅ Console logs: "MandaStrong Studio PWA"
- ✅ Registration scope: Branded correctly

## Testing the Fix

### Test New Project Creation
```javascript
// In browser console:
// This would create a project with default name
// You should see "MandaStrong Studio Project"
```

### Check Cache Names
1. Open DevTools (F12)
2. Application tab
3. Cache Storage
4. Should see:
   - mandastrong-studio-v2
   - mandastrong-runtime-v2
5. Should NOT see:
   - manda-movies
   - Any other old cache names

### Verify Manifest
1. Open DevTools (F12)
2. Application tab
3. Manifest
4. Name should be "MandaStrong Studio"
5. Short name should be "MandaStrong"

## For Developers

### Updating Branding in Future
If you need to change branding again:

1. **Update manifest.json**
   ```json
   {
     "name": "Your New Name",
     "short_name": "Short Name"
   }
   ```

2. **Update service worker cache version**
   ```javascript
   const CACHE_NAME = 'mandastrong-studio-v3'; // Increment version
   ```

3. **Update database default**
   ```sql
   ALTER TABLE projects
   ALTER COLUMN name SET DEFAULT 'Your New Default Name';
   ```

4. **Update UI text in App.tsx**
   - Search for "MANDASTRONG STUDIO"
   - Update as needed

5. **Rebuild and deploy**
   ```bash
   npm run build
   ```

### Cache Versioning Strategy
- Bump cache version (v2 → v3) whenever you need to force all users to refresh
- Old caches are automatically deleted on activation
- Service worker checks for updates on every load

## Summary

✅ **Fixed**: All new projects save as "MandaStrong Studio Project"
✅ **Fixed**: Cache names use "mandastrong-studio" prefix
✅ **Fixed**: Old "manda-movies" caches are automatically deleted
✅ **Fixed**: App auto-updates when new version detected
✅ **Fixed**: All UI consistently shows "MandaStrong Studio"

## Next Build
After running `npm run build`, the app will have:
- Updated service worker (v2)
- New default project names
- Automatic old cache cleanup
- Auto-reload on updates

Users will see "MandaStrong Studio" everywhere!
