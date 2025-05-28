# Site Optimization Guide

## Overview
This guide documents all the performance optimizations implemented on the Prometheus Agency website to achieve excellent Core Web Vitals scores and maintain high performance.

## 🖼️ Image Optimization

### Using OptimizedImage Component
Always use the `OptimizedImage` component for all images to ensure:
- Automatic WebP/AVIF format delivery
- Responsive sizing
- Lazy loading with blur-up effect
- Proper aspect ratio preservation

```tsx
import OptimizedImage from '@/components/common/OptimizedImage';

<OptimizedImage
  src="image-url.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={true} // For above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
  aspectRatio={16/9}
/>
```

### Image Guidelines by Type

| Image Type | Max Width | Sizes Attribute | Priority |
|------------|-----------|----------------|----------|
| Hero Images | 1600px | `100vw` | Yes |
| Content Images | 800px | `(max-width: 768px) 100vw, 50vw` | No |
| Thumbnails | 400px | `(max-width: 640px) 50vw, 200px` | No |
| Logos | 200px | `150px` | No |
| Avatars | 150px | `100px` | No |

### Supabase Image Optimization
All Supabase images are automatically optimized with:
- Quality: 80% (adjustable via `quality` prop)
- Format: WebP with AVIF fallback
- Responsive srcSet generation

## 📊 Core Web Vitals Monitoring

### Automatic Tracking
The site automatically tracks and reports:
- **FCP** (First Contentful Paint): Target < 1.8s
- **LCP** (Largest Contentful Paint): Target < 2.5s
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **INP** (Interaction to Next Paint): Target < 200ms
- **TTFB** (Time to First Byte): Target < 800ms

### Analytics Integration
All Web Vitals are automatically sent to Google Analytics as events:
```javascript
{
  event: 'web_vital',
  web_vital_name: 'LCP',
  web_vital_value: 2100,
  web_vital_rating: 'good'
}
```

### Performance Debugging
In development, Web Vitals are logged to console with ratings:
```
[Web Vital] LCP: {value: 2100, rating: "good", delta: 100}
```

## ⚡ Critical Optimizations

### 1. Critical CSS
Critical CSS is inlined in the HTML head for instant render:
- Base styles and resets
- Above-the-fold layout styles
- Typography for headings
- Hero section styles

### 2. Font Optimization
- Inter font files are preloaded
- `font-display: swap` prevents invisible text
- Font loading state is cached in sessionStorage

### 3. Resource Hints
```html
<!-- DNS Prefetch for faster lookups -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://xkarbwfzxfxgtnefcout.supabase.co">

<!-- Preconnect for critical origins -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 4. Script Loading Strategy
- **Critical scripts**: Inline in head
- **Analytics**: Loaded after window.load
- **Service Worker**: Deferred with async
- **Third-party scripts**: Async or defer

## 🚀 Performance Checklist

### Before Adding New Content
- [ ] Use `OptimizedImage` component for all images
- [ ] Set appropriate `sizes` attribute
- [ ] Mark hero images with `priority={true}`
- [ ] Ensure images have proper dimensions

### Before Adding New Features
- [ ] Lazy load non-critical routes
- [ ] Use dynamic imports for heavy components
- [ ] Check bundle size impact
- [ ] Test Core Web Vitals impact

### Regular Maintenance
- [ ] Run Lighthouse audit monthly
- [ ] Check GA4 Web Vitals dashboard
- [ ] Review slow render warnings in console
- [ ] Update image dimensions if layouts change

## 📱 Mobile Optimization

### Viewport Height Fix
The site automatically adjusts for mobile viewport changes:
```css
/* Use --vh custom property instead of 100vh */
height: calc(var(--vh, 1vh) * 100);
```

### Touch Target Sizes
- Minimum 44x44px for all interactive elements
- 48px height for primary buttons
- Proper spacing between clickable items

## 🔧 Development Tools

### Performance Monitoring Hooks
```tsx
// Monitor component render performance
import { useRenderPerformance } from '@/utils/webVitals';

function MyComponent() {
  const measureRender = useRenderPerformance('MyComponent');
  
  useEffect(() => {
    return measureRender; // Measures render time
  }, []);
}
```

### Image Performance Observer
Automatically tracks LCP images and reports to analytics.

## 🚨 Common Performance Issues

### Issue: Large Layout Shifts
**Solution**: Always specify width/height or aspectRatio for images

### Issue: Slow LCP
**Solution**: 
1. Use `priority={true}` for hero images
2. Preload critical images
3. Optimize image file sizes

### Issue: High INP
**Solution**:
1. Debounce input handlers
2. Use CSS transforms instead of layout changes
3. Optimize React re-renders

### Issue: Render-blocking Resources
**Solution**:
1. Inline critical CSS
2. Defer non-critical scripts
3. Lazy load below-the-fold content

## 📈 Performance Budget

| Metric | Budget | Current |
|--------|--------|---------|
| JS Bundle | < 200KB | ~180KB |
| CSS | < 50KB | ~45KB |
| Images (per page) | < 500KB | Varies |
| Total Page Weight | < 1MB | ~800KB |
| Time to Interactive | < 3.5s | ~3s |

## 🛠️ Tools & Resources

- **Lighthouse CI**: Run on every PR
- **WebPageTest**: Monthly deep analysis
- **Chrome DevTools**: Performance profiling
- **Bundle Analyzer**: Check before major releases

## 📝 Best Practices Summary

1. **Images**: Always optimize, use correct formats, lazy load
2. **Scripts**: Defer/async all non-critical JavaScript
3. **CSS**: Inline critical, lazy load the rest
4. **Fonts**: Preload, use font-display: swap
5. **Monitoring**: Track Web Vitals continuously
6. **Testing**: Run Lighthouse before deploying

Remember: Performance is a feature, not an afterthought! 