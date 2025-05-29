# Supabase Asset Locations

## Important Files to Sync

### Logo
- **Location**: `Prometheus Assets/` folder
- **Files**: Look for prometheus logo files
- **Local**: Syncs to `/public/images/logos/`

### Favicon
- **Location**: Root level of `cms_media` bucket
- **Files**: `favicon.ico`
- **Local**: Syncs to `/public/favicon.ico`
- **Note**: Already exists locally, no sync needed unless updating

### Partner Logos
- **Location**: `Active Client Logos/` folder
- **Files**: All client/partner logos
- **Local**: Syncs to `/public/images/partners/`

### Team Photos
- **Location**: `team/` folder
- **Files**: Team member photos
- **Local**: Syncs to `/public/images/team/`

## Current Status
- ✅ Logo manually copied to `/public/images/logos/prometheus-logo.png`
- ✅ Favicon already exists at `/public/favicon.ico`
- ⏳ Partner logos need Supabase credentials to sync
- ⏳ Team photos need Supabase credentials to sync

## Next Steps
1. Add Supabase credentials to `.env` file
2. Run `npm run sync-images` to download all assets
3. Verify all images load correctly
4. Commit synced images to git 