# Performance Optimization Guide for Analytics

## Overview
This guide outlines best practices for maintaining site performance when implementing analytics and third-party scripts.

## Current Performance Status
- **Target Performance Score**: 85+/100
- **Critical Metrics to Monitor**:
  - First Contentful Paint (FCP): < 1.8s
  - Largest Contentful Paint (LCP): < 2.5s
  - Cumulative Layout Shift (CLS): < 0.1
  - Total Blocking Time (TBT): < 300ms

## Analytics Implementation Best Practices

### 1. Load Scripts Asynchronously
- Always use `async` and `defer` attributes for script tags
- Load analytics after critical resources
- Use `requestIdleCallback` for non-critical tracking

### 2. GTM Configuration
```javascript
// Load GTM after window load
window.addEventListener('load', () => {
  setTimeout(initGTM, 100);
});
```

### 3. Event Tracking Optimization
```javascript
// Use requestIdleCallback for events
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Track event
  });
}
```

### 4. Data Layer Best Practices
- Initialize dataLayer early but don't block render
- Keep data layer pushes minimal
- Avoid sending PII (personally identifiable information)

## Performance Testing Checklist

Before deploying any analytics changes:

1. **Run Lighthouse Tests**
   ```bash
   npx lighthouse https://prometheusagency.io --output=json --output-path=./lighthouse-report.json --only-categories=performance
   ```

2. **Check Core Web Vitals**
   - Use Chrome DevTools Performance tab
   - Monitor real user metrics in GA4

3. **Verify No Render Blocking**
   - Check Network tab for blocking resources
   - Ensure GTM loads after DOMContentLoaded

## Common Performance Issues & Solutions

### Issue: Slow Initial Load
**Solution**: Defer all non-critical scripts
```javascript
script.defer = true;
script.setAttribute('fetchpriority', 'low');
```

### Issue: High TBT (Total Blocking Time)
**Solution**: Break up long tasks using `requestIdleCallback`

### Issue: Layout Shifts from Dynamic Content
**Solution**: Reserve space for dynamic elements

## Monitoring Performance

### Real User Monitoring (RUM)
Track actual user experience using:
- GA4 Web Vitals events
- Custom performance marks

### Synthetic Monitoring
Regular automated tests:
- Weekly Lighthouse CI runs
- PageSpeed Insights API monitoring

## Quick Reference

### Do's ✅
- Load analytics asynchronously
- Use performance budgets
- Test on slow connections
- Monitor Core Web Vitals
- Use lazy loading for below-fold content

### Don'ts ❌
- Block render with analytics
- Send events on every interaction
- Load multiple analytics libraries
- Track sensitive user data
- Ignore mobile performance

## Performance Budget

| Metric | Budget | Current |
|--------|--------|---------|
| FCP | < 1.8s | Monitor |
| LCP | < 2.5s | Monitor |
| CLS | < 0.1 | Monitor |
| TBT | < 300ms | Monitor |
| Performance Score | > 85 | Monitor |

## Emergency Response

If performance drops below 70:

1. **Immediate Actions**:
   - Disable non-essential tracking
   - Review recent changes
   - Check for blocking resources

2. **Investigation**:
   - Run detailed Lighthouse audit
   - Check browser console for errors
   - Review Network waterfall

3. **Resolution**:
   - Implement fixes in staging first
   - Test thoroughly before production
   - Document changes and impacts

## Additional Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [GTM Performance Best Practices](https://developers.google.com/tag-manager/devguide/performance)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: Current Date
**Next Review**: Monthly performance audits recommended 