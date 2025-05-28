# GTM Container Strategy Decision Guide

## Current Situation
- **Production Container**: GTM-MSP3RD38 (currently on prometheusagency.co)
- **Test Container**: GTM-KR2LQG9K (was in the codebase)

## Recommended Approach: Use Production Container Everywhere

### Why This Is Best:
1. **Test What You Deploy**: Staging will use exact same tags as production
2. **No Surprises**: What works on staging will work on production
3. **Simpler Management**: One container to maintain
4. **Historical Data**: Keep all existing tag configurations

### Implementation:
The code is already updated to use GTM-MSP3RD38 by default.

### In GTM, Create These:

1. **Environment Variable**
   ```javascript
   // Variable Name: Site Environment
   // Type: Custom JavaScript
   function() {
     return {{Page Hostname}}.includes('.io') ? 'staging' : 'production';
   }
   ```

2. **Update GA4 Configuration Tag**
   - Add custom parameter: `site_environment = {{Site Environment}}`
   - This will track which environment data comes from

3. **Optional: Create Blocking Triggers**
   - For production-only tags: `{{Site Environment}} equals production`
   - For staging-only tags: `{{Site Environment}} equals staging`

## Alternative Approaches

### If You Need Complete Isolation:

Uncomment the multi-container setup in `src/utils/analytics.ts`:

```javascript
const GTM_CONTAINERS = {
  staging: 'GTM-KR2LQG9K',    // Staging container
  production: 'GTM-MSP3RD38'  // Production container
};
```

**Pros:**
- Complete tag isolation
- Test without affecting production
- Different teams can manage each

**Cons:**
- Must maintain two containers
- Tags can get out of sync
- More complex deployment

### If You Want GTM Environments:

1. In GTM-MSP3RD38, go to Admin → Environments
2. Create "Staging" environment
3. Update `GTM_ENVIRONMENTS` in analytics.ts with tokens
4. This gives version control within one container

## Quick Decision Matrix

| If you want... | Use this approach |
|----------------|-------------------|
| Simplest setup | Single container (current) |
| Test = Production guarantee | Single container (current) |
| Complete isolation | Multiple containers |
| Version control | GTM Environments |
| Minimal maintenance | Single container (current) |

## Next Steps

1. **For Single Container (Recommended)**:
   - ✅ Code already updated
   - Add Environment variable in GTM
   - Update GA4 tags with environment parameter
   - Test on staging

2. **For Multiple Containers**:
   - Uncomment multi-container code
   - Set up GTM-KR2LQG9K for staging
   - Copy necessary tags from production
   - Test thoroughly

3. **For GTM Environments**:
   - Create environments in GTM
   - Get auth tokens
   - Update analytics.ts
   - Test deployment flow 