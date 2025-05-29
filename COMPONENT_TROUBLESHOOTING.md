# Component Troubleshooting Guide

## AboutPartners Component

### Overview
The AboutPartners component displays client logos from Supabase storage with grayscale styling and rotation animation.

### Common Issues and Solutions

#### 1. Logos Not Displaying
**Symptoms**: Empty section or only showing placeholder logos

**Possible Causes**:
- Supabase storage bucket permissions
- Empty "Active Client Logos" folder
- Authentication issues
- Network/CORS issues

**Debugging Steps**:
1. Check browser console for errors
2. Verify Supabase connection in console:
   ```javascript
   // Look for these console logs:
   "Fetching client logos from Supabase..."
   "Found X client logos" // or error messages
   ```
3. Check Supabase dashboard: https://supabase.com/dashboard/project/xkarbwfzxfxgtnefcout/storage/buckets/cms_media
4. Verify "Active Client Logos" folder exists and contains images

**Solutions**:
- Ensure bucket is public or has proper RLS policies
- Upload logos to the correct folder in Supabase
- Check Supabase environment variables are set

#### 2. Logos Appearing All White
**Cause**: The component applies a grayscale CSS filter for consistency

**Solution**: This is intentional! Logos show in grayscale and turn to color on hover. If logos are too light/white, they may not be visible against the gray background.

#### 3. Only Showing Prometheus Logos
**Cause**: Fallback logos are displayed when Supabase fetch fails

**Solution**: Check console for Supabase errors and follow debugging steps above.

### Component Architecture

```typescript
// Key features:
1. Fallback logos show immediately (better UX)
2. Real logos replace fallbacks when loaded
3. Grayscale filter for consistency
4. Rotation animation every 4 seconds
5. Hover effect removes grayscale
```

### Best Practices

1. **Always Start Simple**: Begin with static data, then add dynamic fetching
2. **Visible Fallbacks**: Show something immediately, don't leave empty space
3. **Clear Error Messages**: Log specific errors to console for debugging
4. **Progressive Enhancement**: Basic functionality first, then add animations/effects

### Environment Requirements

- Supabase URL and Anon Key must be configured
- Storage bucket "cms_media" must exist
- Folder "Active Client Logos" must exist within the bucket
- Images should be in standard formats (PNG, JPG, SVG)

### Testing Checklist

- [ ] Component renders without errors
- [ ] Fallback logos appear immediately
- [ ] Console shows successful Supabase fetch
- [ ] Real logos replace fallbacks
- [ ] Grayscale effect works
- [ ] Hover removes grayscale
- [ ] Rotation animation works
- [ ] No console errors

### Quick Fixes

**Force Fallback Only** (temporary fix):
```typescript
// Comment out the fetchLogos() call in useEffect
// This ensures logos always show, even if Supabase fails
```

**Debug Mode**:
```typescript
// Add more console logs:
console.log('Supabase response:', data);
console.log('Public URLs:', logos);
``` 