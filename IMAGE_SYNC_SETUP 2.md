# Image Sync Setup Guide

## Overview
This feature allows you to continue uploading images to Supabase storage (your current workflow) while automatically syncing them to local folders for better deployment reliability.

## Initial Setup

### 1. Create Environment File
Create a `.env` file in your project root:
```
VITE_SUPABASE_URL=https://xkarbwfzxfxgtnefcout.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Add GitHub Secrets
Go to your GitHub repository settings → Secrets → Actions and add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Usage

### Manual Sync (Recommended for now)
1. Upload images to Supabase as usual
2. Run locally: `npm run sync-images`
3. Review and commit the downloaded images
4. Push to deploy

### Automatic Sync (Once configured)
- Images sync automatically on every push to main
- Daily sync at 2 AM UTC
- Manual trigger available in GitHub Actions

### Update Code References
To update your components to use local images instead of Supabase URLs:
```bash
npm run update-image-refs
```

Or do both at once:
```bash
npm run sync-and-update
```

## Benefits
- ✅ Keep your simple Supabase upload workflow
- ✅ Images served from your domain (better SEO)
- ✅ No external dependencies in production
- ✅ Images work offline with service workers
- ✅ Version controlled assets
- ✅ Faster page loads

## Current Image Mappings
- `Active Client Logos` → `/public/images/partners/`
- `Prometheus Assets` → `/public/images/logos/`
- `team` → `/public/images/team/`

## Troubleshooting
If sync fails:
1. Check your Supabase credentials in `.env`
2. Ensure the Supabase bucket is public
3. Check folder names match exactly 