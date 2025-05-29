# Prometheus Agency - Quick Reference

## 🚀 Essential Commands

### Development
```bash
npm run dev              # Start local server (http://localhost:8080)
npm run build            # Build for production
npm run preview          # Preview production build
```

### Image Management
```bash
npm run sync-images      # Download images from Supabase
npm run update-image-refs # Update code to use local paths
npm run sync-and-update  # Do both above
```

### Deployment
```bash
git add -A
git commit -m "Your message"
git push origin main     # Auto-deploys to staging
```

## 📁 Key Directories

- `/src/pages/` - Landing pages and main pages
- `/src/components/` - Reusable components
- `/public/images/` - All image assets
- `/scripts/` - Automation scripts

## 🔗 URLs

- **Local**: http://localhost:8080
- **Staging**: https://prometheusagency.io
- **Production**: https://prometheusagency.co
- **Netlify**: app.netlify.com

## 🏃 Common Workflows

### Add New Landing Page
1. Copy existing page template
2. Update content and SEO
3. Add route in App.tsx
4. Test locally
5. Deploy

### Update Images
1. Upload to Supabase
2. Run `npm run sync-images`
3. Commit new images
4. Push to deploy

### Fix Issues
1. Check Netlify logs
2. Test locally with `npm run build`
3. Fix and push

## 📊 Performance Check
```bash
npx lighthouse https://prometheusagency.io
```

## 🆘 Help
- Platform Guide: `PLATFORM_GUIDE.md`
- Image Guide: `IMAGE_SYNC_GUIDE.md`
- Deployment Fixes: `DEPLOYMENT_FIXES.md` 