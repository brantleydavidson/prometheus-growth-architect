# Image Sync Scripts

This directory contains scripts to automate syncing images from Supabase storage to local public folders.

## Scripts

### sync-supabase-images.js
Downloads images from Supabase storage to local public folders.

**Usage:**
```bash
npm run sync-images
```

**What it does:**
- Downloads images from Supabase storage buckets
- Saves them to appropriate public folders:
  - `Active Client Logos` → `/public/images/partners/`
  - `Prometheus Assets` → `/public/images/logos/`
  - `team` → `/public/images/team/`
- Cleans filenames for web compatibility
- Skips files that already exist locally

### update-image-references.js
Updates component code to use local image paths instead of Supabase URLs.

**Usage:**
```bash
npm run update-image-refs
```

**What it does:**
- Scans all `.ts`, `.tsx`, `.js`, and `.jsx` files in `src/`
- Finds Supabase storage URLs
- Replaces them with local paths (e.g., `/images/partners/logo.png`)
- Updates files in place

### Combined workflow
```bash
npm run sync-and-update
```
This runs both scripts in sequence: download images, then update code references.

## Automation

### Build Process
Images are automatically synced before builds:
```bash
npm run build  # Automatically runs sync-images first
```

### GitHub Actions
The `.github/workflows/sync-images.yml` workflow:
- Runs daily at 2 AM UTC
- Runs on every push to main
- Can be triggered manually
- Commits any new images automatically

## Setup

### Local Development
1. Ensure you have Supabase credentials in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Run the sync:
   ```bash
   npm run sync-images
   ```

3. (Optional) Update code references:
   ```bash
   npm run update-image-refs
   ```

### GitHub Actions Setup
Add these secrets to your GitHub repository:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Benefits

1. **Reliability**: Images are served from your domain, not external URLs
2. **Performance**: Images are bundled and optimized with your build
3. **Offline Support**: Images work with service workers
4. **Version Control**: Images are tracked in git
5. **SEO**: Better for search engines when images are on your domain

## Workflow

1. Upload images to Supabase storage (existing workflow)
2. Run `npm run sync-and-update` locally or wait for automation
3. Commit the changes
4. Deploy

This maintains your simple upload workflow while ensuring production reliability! 