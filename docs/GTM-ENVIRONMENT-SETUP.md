# GTM Environment Setup Guide

## Overview
This guide explains how to configure Google Tag Manager (GTM) for your branch-based deployment strategy where:
- **Main branch** → prometheusagency.co (production)
- **Development/feature branches** → prometheusagency.io (staging)

## Two Approaches

### Approach 1: GTM Environments (Recommended)

#### Benefits:
- Test exact tag configurations before production
- Separate staging data from production automatically
- Version control for your GTM changes
- No accidental production data pollution

#### Setup Steps:

1. **Create GTM Environments**
   - Go to GTM → Admin → Environments
   - Click "New" to create a staging environment
   - Name it "Staging" 
   - Leave "Enable Debugging" checked
   - Get the environment snippet

2. **Update Your Code**
   ```javascript
   // In src/utils/analytics.ts, update the GTM_ENVIRONMENTS object:
   const GTM_ENVIRONMENTS = {
     staging: {
       auth: 'YOUR_AUTH_TOKEN', // From GTM environment snippet
       preview: 'env-X', // From GTM environment snippet
     },
     production: {
       auth: null,
       preview: null,
     }
   };
   ```

3. **Configure in GTM**
   - Create a Variable: "Environment"
   - Type: Custom JavaScript
   ```javascript
   function() {
     return window.location.hostname.includes('.io') ? 'staging' : 'production';
   }
   ```

4. **Use Environment in Tags**
   - Add custom dimension/parameter to GA4 tags
   - Use it to create triggers (e.g., only fire certain tags in production)

### Approach 2: Simple Environment Tracking (Current Setup)

If you prefer not to use GTM environments, the current setup will work fine:

#### Benefits:
- Simpler to implement
- No GTM environment management
- Still separates staging/production data

#### Current Implementation:
- Same GTM container on both domains
- `site_environment` parameter tracks staging vs production
- Filter data in GA4 reports

## GA4 Configuration

### For Both Approaches:

1. **Create Custom Dimension in GA4**
   - Admin → Custom definitions → Create custom dimension
   - Name: "Site Environment"
   - Event parameter: "site_environment"
   - Scope: Event

2. **Use in Reports**
   - Add "Site Environment" as a dimension
   - Create filtered views excluding staging
   - Set up alerts for staging traffic spikes

## Testing Workflow

### Before Deploying to Production:

1. **On Development Branch**:
   ```bash
   git checkout development
   # Make changes
   git push origin development
   # Deploys to prometheusagency.io
   ```

2. **Test on Staging**:
   - Open GTM Preview mode
   - Navigate prometheusagency.io
   - Verify all tags fire correctly
   - Check GA4 DebugView

3. **Merge to Main**:
   ```bash
   git checkout main
   git merge development
   git push origin main
   # Deploys to prometheusagency.co
   ```

## Best Practices

### DO:
- Always test GTM changes on staging first
- Use descriptive names for GTM versions
- Document custom variables and triggers
- Monitor both environments in GA4

### DON'T:
- Make GTM changes directly in production
- Forget to publish GTM changes after testing
- Mix staging and production data in reports
- Leave debug mode on in production tags

## Troubleshooting

### Issue: Staging data appearing in production reports
**Solution**: Check that site_environment filter is applied correctly

### Issue: Tags not firing on staging
**Solution**: Verify GTM environment tokens are correct (if using environments)

### Issue: Different behavior between staging and production
**Solution**: Check for hardcoded domain references in GTM tags

## Quick Reference

```javascript
// Check current environment in browser console:
console.log(window.location.hostname.includes('.io') ? 'staging' : 'production');

// Check if GTM is loaded:
console.log(typeof window.dataLayer !== 'undefined' ? 'GTM Loaded' : 'GTM Not Loaded');

// View current dataLayer:
console.log(window.dataLayer);
```

## Next Steps

1. Decide which approach to use (Environments or Simple)
2. If using Environments, create them in GTM
3. Update the analytics.ts file with tokens (if applicable)
4. Test thoroughly on staging
5. Document your choice for the team 