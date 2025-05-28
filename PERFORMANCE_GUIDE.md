# Prometheus Agency Performance Guide

## Overview
This guide ensures that all team members maintain the site's performance standards when adding new content or features.

## Current Performance Status
- **Mobile Score**: 88/100 (Good)
- **Desktop Score**: Expected 95+/100
- **Core Web Vitals**: All passing

## Image Optimization Guidelines

### For All Images
1. **Always use the `OptimizedImage` component** for React components:
   ```tsx
   import OptimizedImage from '@/components/common/OptimizedImage';
   
   <OptimizedImage
     src="image-url"
     alt="Descriptive alt text"
     width={800}
     height={600}
     priority={false} // Set to true only for above-the-fold images
   />
   ```

2. **For blog content images**, they are automatically optimized when using the `[media:Title]` syntax

3. **Image size guidelines**:
   - Logos: Max 200px width
   - Thumbnails: Max 400px width
   - Blog content: Max 800px width
   - Hero images: Max 1600px width

### Supabase Storage Images
All images from Supabase are automatically optimized with:
- WebP format conversion
- Quality optimization (80%)
- Responsive sizing

## JavaScript Performance

### Code Splitting
The following routes are automatically lazy-loaded:
- `/admin/*` - All admin pages
- `/insights/:slug` - Individual blog posts
- `/playbooks/*` - Playbook pages
- `/tools/*` - Tool pages

### Adding New Routes
For new feature pages, consider lazy loading:
```tsx
const NewFeature = lazy(() => import('./pages/NewFeature'));

// In your route configuration
<Route path="/new-feature" element={
  <Suspense fallback={<LoadingSpinner />}>
    <NewFeature />
  </Suspense>
} />
```

## Caching Strategy

### Service Worker
The site uses a service worker that automatically caches:
- Static assets (JS, CSS) - Cache first
- Images - Cache first with network fallback
- API responses - Network first with cache fallback

### Cache Headers (via Netlify)
- JS/CSS files: 1 year cache
- Images: 1 day browser cache, 1 year CDN cache
- Service worker: No cache

## Security Best Practices

### Content Security Policy (CSP)
When adding new third-party services, update the CSP in `netlify.toml`:
```toml
Content-Security-Policy = "... existing policy ..."
```

### Required Security Headers
All responses include:
- Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy

## Performance Monitoring

### Before Deploying
1. Run local Lighthouse test:
   ```bash
   npx lighthouse http://localhost:8080 --view
   ```

2. Check bundle size:
   ```bash
   npm run build
   # Check the output for bundle sizes
   ```

### After Deploying
1. Run PageSpeed Insights: https://pagespeed.web.dev
2. Target scores:
   - Mobile: 85+ (currently 88)
   - Desktop: 95+

## Common Performance Pitfalls to Avoid

### ❌ Don't Do This:
```tsx
// Unoptimized image
<img src={url} alt="..." />

// Loading all routes eagerly
import AboutPage from './pages/AboutPage';

// Inline large data
const hugeArray = [...10000 items];
```

### ✅ Do This Instead:
```tsx
// Optimized image
<OptimizedImage src={url} alt="..." width={800} />

// Lazy load routes
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Load large data asynchronously
useEffect(() => {
  fetchLargeData().then(setData);
}, []);
```

## Adding New Features Checklist

- [ ] Images use `OptimizedImage` component or image optimization utility
- [ ] New routes are lazy-loaded if not critical
- [ ] No render-blocking resources added
- [ ] Bundle size increase is under 50KB
- [ ] Lighthouse score remains above 85 on mobile
- [ ] All third-party scripts use defer or async
- [ ] CSP updated if new domains are needed
- [ ] Service worker cache strategy considered

## Performance Budget

| Metric | Budget | Current |
|--------|--------|---------|
| Total Page Weight | < 1MB | ~800KB |
| JavaScript | < 200KB | ~160KB |
| CSS | < 50KB | ~40KB |
| Images | < 500KB | ~400KB |
| Time to Interactive | < 3.5s | ~3s |

## Troubleshooting

### Site Feels Slow
1. Check Network tab for large resources
2. Run Lighthouse audit
3. Check for render-blocking resources
4. Verify images are optimized

### Images Not Loading
1. Check if Supabase URL includes optimization params
2. Verify OptimizedImage component is used
3. Check browser console for CSP violations

### JavaScript Errors
1. Check if lazy-loaded components have proper Suspense boundaries
2. Verify all imports are correct
3. Check service worker registration

## Resources
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/) 