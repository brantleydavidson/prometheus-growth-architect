# GA4 Migration Guide: prometheusagency.co → prometheusagency.io

## Overview
This guide outlines the process for migrating Google Analytics 4 (GA4) tracking from prometheusagency.co to prometheusagency.io while maintaining data continuity and tracking accuracy.

## Current Setup
- **GTM Container ID**: GTM-KR2LQG9K
- **Current Domain**: prometheusagency.co
- **New Domain**: prometheusagency.io
- **Recommendation**: Use existing GA4 property (maintain historical data)

## Pre-Migration Checklist

### 1. GA4 Property Configuration
- [ ] Log into Google Analytics
- [ ] Navigate to Admin → Property Settings
- [ ] Add prometheusagency.io to approved domains
- [ ] Keep both domains active during transition

### 2. Data Stream Updates
- [ ] Go to Admin → Data Streams
- [ ] Click on your web data stream
- [ ] Configure tag settings → More tagging settings
- [ ] List domains: add both prometheusagency.co and prometheusagency.io
- [ ] Enable "Remove referrals" for both domains

### 3. GTM Container Updates

#### Update GA4 Configuration Tag:
```javascript
// In GTM, update your GA4 Configuration tag with these fields:
{
  "cookie_domain": "auto",
  "cookie_flags": "SameSite=None;Secure",
  "linker": {
    "domains": ["prometheusagency.co", "prometheusagency.io"],
    "accept_incoming": true
  }
}
```

#### Create Migration Variables:
1. **Variable Name**: Site Version
   - Type: Custom JavaScript
   - Code: `return window.location.hostname.includes('.io') ? 'io' : 'co';`

2. **Variable Name**: Migration Phase
   - Type: Lookup Table
   - Input: {{Page Hostname}}
   - Outputs:
     - prometheusagency.co → "legacy"
     - prometheusagency.io → "new"

### 4. Enhanced Tracking Implementation

The codebase has been updated with:
- Automatic GTM initialization
- Enhanced page view tracking
- Form submission tracking (PII-safe)
- Button click tracking
- Site version tracking

## Migration Phases

### Phase 1: Dual Tracking (Current)
- Both sites use same GTM container
- Cross-domain tracking enabled
- Test tracking on staging

### Phase 2: DNS Switch
- Update DNS to point to new site
- Monitor real-time reports
- Verify tracking is working

### Phase 3: Post-Migration
- Update default domain in GA4
- Update all UTM campaigns
- Archive .co tracking after 30 days

## Testing Checklist

### Before DNS Switch:
- [ ] Install GA Debugger Chrome extension
- [ ] Test on prometheusagency.io staging
- [ ] Verify events firing in real-time reports
- [ ] Check cross-domain tracking with test navigation
- [ ] Validate form submissions tracking
- [ ] Test goal/conversion tracking

### After DNS Switch:
- [ ] Monitor real-time reports for traffic
- [ ] Verify no duplicate sessions
- [ ] Check referral exclusions working
- [ ] Validate ecommerce/conversion data
- [ ] Review user flow reports

## GTM Tags to Review/Update

1. **GA4 Configuration Tag**
   - Add cross-domain tracking
   - Update cookie settings

2. **GA4 Event Tags**
   - Add site_version parameter
   - Update any hardcoded URLs

3. **Conversion Tags**
   - Google Ads
   - Facebook Pixel
   - LinkedIn Insight
   - Any other platforms

## Important Considerations

### SEO Impact
- Set up 301 redirects from .co to .io
- Update Google Search Console
- Submit new sitemap
- Update canonical URLs

### Campaign Updates
- Update all active Google Ads
- Update social media UTM links
- Update email campaign links
- Update any hardcoded links

### Data Continuity
- Sessions may briefly split during transition
- Use annotations in GA4 to mark migration date
- Create custom reports comparing both domains
- Monitor for 30 days post-migration

## Troubleshooting

### Common Issues:

1. **Split Sessions**
   - Check cross-domain setup
   - Verify referral exclusions
   - Check cookie settings

2. **Missing Data**
   - Verify GTM is firing
   - Check real-time reports
   - Review browser console for errors

3. **Duplicate Pageviews**
   - Check for multiple GTM installations
   - Review trigger conditions
   - Verify SPA tracking setup

## Post-Migration Tasks

### Week 1:
- [ ] Daily monitoring of key metrics
- [ ] Compare YoY data for anomalies
- [ ] Check all conversion tracking
- [ ] Review user feedback

### Week 2-4:
- [ ] Weekly performance reviews
- [ ] Update any missed campaign links
- [ ] Fine-tune tracking based on data
- [ ] Document any custom solutions

### Month 2:
- [ ] Full audit of tracking
- [ ] Archive .co configuration
- [ ] Update documentation
- [ ] Team training on new setup

## Support Resources

- [GA4 Cross-Domain Tracking](https://support.google.com/analytics/answer/10071811)
- [GTM Debug Mode](https://support.google.com/tagmanager/answer/6107056)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)

## Emergency Rollback Plan

If critical issues arise:
1. Revert DNS to .co
2. Disable .io tracking in GTM
3. Document issues encountered
4. Plan fixes before retry

---

Last Updated: [Current Date]
Migration Owner: [Your Name]
Emergency Contact: [Contact Info] 