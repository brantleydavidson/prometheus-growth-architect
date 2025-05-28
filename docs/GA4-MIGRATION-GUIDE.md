# GA4 Implementation Guide: Prometheus Agency Site Update

## Overview
This guide outlines the GA4 setup for deploying the new Prometheus Agency site to prometheusagency.co, replacing the existing site content while maintaining analytics continuity.

## Current Setup
- **Production Domain**: prometheusagency.co (existing site → new site)
- **Staging Domain**: prometheusagency.io (development/testing only)
- **GTM Container ID**: GTM-MSP3RD38 (production container)
- **Strategy**: Use existing GA4 property to maintain historical data

## Pre-Deployment Checklist

### 1. Staging Environment (.io)
- [ ] Add robots.txt to block crawlers on .io domain
- [ ] Test all tracking on staging environment
- [ ] Verify site_environment parameter shows "staging"
- [ ] Ensure no production data contamination

### 2. GA4 Configuration (No Changes Needed)
Since we're keeping the same domain, no GA4 property changes are required:
- Same measurement ID
- Same data stream
- Historical data preserved
- No cross-domain tracking needed

### 3. GTM Container Setup

The codebase includes enhanced tracking for:
- Page views with environment tracking (staging vs production)
- Form submissions (PII-safe)
- Button clicks
- Scroll depth
- File downloads

#### Environment Variable in GTM:
Create a variable to track which environment users are on:
```javascript
// Variable Name: Site Environment
// Type: Custom JavaScript
function() {
  return window.location.hostname.includes('.io') ? 'staging' : 'production';
}
```

## Deployment Process

### Phase 1: Pre-Launch Testing (Current)
- [x] Enhanced analytics code implemented
- [ ] Test all events on staging (.io)
- [ ] Verify no tracking issues
- [ ] Document any custom events needed

### Phase 2: Launch Day
1. **Backup Current Site**
   - Export current GA4 data
   - Screenshot key metrics for comparison
   - Note current conversion rates

2. **Deploy New Site**
   - Deploy new codebase to .co
   - GTM container remains the same
   - Analytics continue uninterrupted

3. **Post-Launch Verification**
   - Check real-time reports
   - Verify all events firing
   - Monitor for any errors

### Phase 3: Post-Launch
- Keep .io as staging environment
- Add noindex, nofollow to .io
- Monitor analytics for anomalies

## Testing Checklist

### On Staging (.io):
- [ ] Install GA Debugger Chrome extension
- [ ] Open GTM Preview mode
- [ ] Test critical user journeys:
  - [ ] Homepage → Service page → Book audit
  - [ ] Blog post navigation
  - [ ] Form submissions
  - [ ] Button clicks
- [ ] Verify environment parameter = "staging"

### On Production (.co) After Launch:
- [ ] Real-time reports showing traffic
- [ ] Events firing correctly
- [ ] No duplicate pageviews
- [ ] Conversions tracking properly
- [ ] Environment parameter = "production"

## Key Events to Track

### Already Implemented:
1. **Page Views** - Enhanced with environment tracking
2. **Form Submissions** - All forms with PII protection
3. **Button Clicks** - CTA and navigation buttons
4. **Scroll Depth** - 25%, 50%, 75%, 90%
5. **Outbound Links** - External link clicks

### Consider Adding:
- Video engagement (if applicable)
- PDF downloads
- Chat widget interactions
- Time on page thresholds

## Robots.txt for Staging

Add to `.io` domain after launch:
```txt
User-agent: *
Disallow: /
```

## Important Considerations

### Data Continuity
- Annotations in GA4 for launch date
- Compare week-over-week after launch
- Monitor user behavior changes
- Track any metric anomalies

### SEO During Transition
- Update sitemap.xml
- Submit to Google Search Console
- Monitor crawl errors
- Check page load speeds

### Campaign Updates
- Review all active UTM parameters
- Update any hardcoded analytics events
- Test conversion tracking
- Verify Google Ads integration

## Troubleshooting

### Common Issues:

1. **Missing Events**
   - Check browser console for errors
   - Verify GTM is loading
   - Review trigger conditions

2. **Incorrect Environment**
   - Clear cache and cookies
   - Check hostname detection
   - Verify DNS propagation

3. **Performance Issues**
   - Monitor Core Web Vitals
   - Check GTM container size
   - Review tag firing rules

## Maintenance

### Weekly Tasks:
- Review staging vs production traffic
- Check for any .io indexing
- Monitor event accuracy
- Update tracking documentation

### Monthly Tasks:
- Audit custom events
- Review conversion paths
- Clean up unused GTM tags
- Performance optimization

## Quick Reference

### GTM Container: GTM-MSP3RD38
### Staging: prometheusagency.io (noindex)
### Production: prometheusagency.co
### Environment Parameter: site_environment

---

Last Updated: [Current Date]
Project Owner: [Your Name]
Emergency Contact: [Contact Info] 