# Image Sync Guide - Prometheus Agency

## Overview

This guide explains how to manage images between Supabase storage and your local repository. The sync process ensures images are available for fast, reliable delivery while maintaining your existing Supabase upload workflow.

## Why We Sync Images

1. **Performance**: Images served from your domain load faster
2. **Reliability**: No dependency on external services during runtime
3. **SEO**: Better for search engines when images are on your domain
4. **Version Control**: Images are tracked in git history

## Initial Setup

### 1. Create `.env` file in project root:
```bash
VITE_SUPABASE_URL=https://xkarbwfzxfxgtnefcout.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Get your Supabase credentials:
- Log into Supabase dashboard
- Go to Settings → API
- Copy the URL and anon key

## Image Sync Workflow

### Step 1: Upload to Supabase (as usual)
Continue uploading images through your normal Supabase workflow

### Step 2: Sync Images Locally
```bash
npm run sync-images
```

This will:
- Connect to your Supabase storage
- Download new images to appropriate folders
- Clean filenames for web compatibility
- Skip files that already exist

### Step 3: Update Code References (Optional)
```bash
npm run update-image-refs
```

This will:
- Find Supabase URLs in your code
- Replace them with local paths
- Preserve all other code

### Step 4: Commit and Deploy
```bash
git add -A
git commit -m "Sync images from Supabase"
git push origin main
```

## Folder Mapping

| Supabase Folder | Local Folder | Used For |
|-----------------|--------------|----------|
| `Active Client Logos/` | `/public/images/partners/` | Partner/client logos |
| `Prometheus Assets/` | `/public/images/logos/` | Company logos |
| `team/` | `/public/images/team/` | Team member photos |
| Root files | `/public/` | Favicon, etc. |

## Common Scenarios

### Adding a New Partner Logo
1. Upload to Supabase: `Active Client Logos/` folder
2. Run: `npm run sync-images`
3. Logo appears in: `/public/images/partners/`
4. Commit and push

### Updating the Company Logo
1. Upload to Supabase: `Prometheus Assets/` folder
2. Run: `npm run sync-images`
3. Update code if filename changed
4. Commit and push

### Adding Team Photos
1. Upload to Supabase: `team/` folder
2. Run: `npm run sync-images`
3. Photos appear in: `/public/images/team/`
4. Commit and push

## Automation Options

### Manual Sync (Recommended)
- Run `npm run sync-images` when you add new images
- Gives you control over what gets committed
- Allows review before deployment

### GitHub Action (Advanced)
- Automatically syncs daily
- Creates PR with new images
- Requires GitHub secrets setup

To enable:
1. Add Supabase credentials as GitHub secrets
2. GitHub Action runs daily at 2 AM UTC
3. Review and merge PR

## Troubleshooting

### "Missing Supabase environment variables"
- Create `.env` file with credentials
- Ensure file is in project root
- Never commit `.env` file

### Images not syncing
- Check Supabase folder names match exactly
- Verify credentials are correct
- Ensure images are in correct folders

### Filename issues
- Script automatically cleans filenames
- Spaces → hyphens
- Special characters removed
- Lowercase conversion

## Best Practices

1. **Sync regularly**: Don't let images pile up
2. **Review before committing**: Check image quality/size
3. **Use descriptive names**: Help with SEO
4. **Optimize images**: Before uploading to Supabase
5. **Test locally**: Verify images display correctly

## Quick Reference

```bash
# One-time setup
echo "VITE_SUPABASE_URL=xxx" > .env
echo "VITE_SUPABASE_ANON_KEY=xxx" >> .env

# Regular workflow
npm run sync-images          # Download new images
npm run update-image-refs    # Update code references
npm run sync-and-update      # Do both

# Deploy
git add -A && git commit -m "Sync images" && git push
```

This system gives you the best of both worlds: easy uploads through Supabase and reliable, fast image delivery from your domain. 