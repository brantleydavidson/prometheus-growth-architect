# Troubleshooting Guide - Prometheus Agency

## Common Issues & Solutions

### Logo/Favicon Not Showing

**Symptoms:**
- Logo appears missing in navigation
- Favicon shows default browser icon

**Solutions:**

1. **Clear Browser Cache**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Open Developer Tools → Network tab → Check "Disable cache"
   - Try incognito/private browsing mode

2. **Verify Files Exist**
   ```bash
   # Check locally
   ls -la public/images/logos/prometheus-logo.png
   ls -la public/favicon.ico
   
   # Test on live site
   curl -I https://prometheusagency.io/images/logos/prometheus-logo.png
   curl -I https://prometheusagency.io/favicon.ico
   ```

3. **Check Git Status**
   ```bash
   # Ensure files are tracked
   git ls-files | grep -E "(logo|favicon)"
   
   # Commit if needed
   git add public/images/logos/prometheus-logo.png public/favicon.ico
   git commit -m "Add logo and favicon"
   git push origin main
   ```

4. **Force Netlify Cache Clear**
   - Go to Netlify dashboard
   - Deploy settings → Clear cache and deploy site

### Build Failures

**"Missing Supabase environment variables"**
- This was fixed by removing the `prebuild` script
- Images should be synced locally and committed, not during builds

**Solution:**
```bash
# Sync images locally
npm run sync-images

# Commit synced images
git add -A
git commit -m "Sync images from Supabase"
git push origin main
```

### Images Not Loading

**Check Image Paths**
- Use absolute paths starting with `/`
- Example: `/images/logos/prometheus-logo.png`

**Check Console Errors**
- Open browser DevTools (F12)
- Look for 404 errors or CSP violations
- Check Network tab for failed requests

### Performance Issues

**Run Lighthouse Audit**
```bash
npx lighthouse https://prometheusagency.io
```

**Common Fixes:**
- Optimize large images before uploading
- Use appropriate image formats (WebP, AVIF)
- Enable lazy loading for below-fold images

### SEO Not Updating

**Force Search Engine Recrawl**
1. Google Search Console → URL Inspection
2. Enter your URL
3. Request indexing

**Verify Meta Tags**
- View page source to check meta tags
- Use SEO browser extensions to validate

### Deployment Issues

**Changes Not Showing**
1. Check Netlify build logs
2. Verify correct branch is deployed
3. Clear CDN cache if using Cloudflare

**Rollback if Needed**
- Netlify dashboard → Deploys
- Click on previous successful deploy
- "Publish deploy"

## Quick Fixes

### Force Asset Refresh
Add version query parameter to force reload:
```html
<img src="/images/logo.png?v=2" />
<link rel="icon" href="/favicon.ico?v=2" />
```

### Test Deployment Locally
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

### Emergency Contacts
- Netlify Status: https://www.netlifystatus.com/
- GitHub Status: https://www.githubstatus.com/

## Prevention Tips

1. **Always test locally** before pushing
2. **Use descriptive commit messages**
3. **Monitor Netlify build logs**
4. **Keep documentation updated**
5. **Regular Lighthouse audits**

Remember: Most issues are cache-related. Try hard refresh first! 