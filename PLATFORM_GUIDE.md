# Prometheus Agency Platform Guide

## 🚀 Platform Overview

The Prometheus Agency website is a modern React/TypeScript application built with:
- **Framework**: Vite + React
- **Styling**: Tailwind CSS + Shadcn UI
- **Deployment**: Netlify (automatic from GitHub)
- **CMS**: Supabase (for dynamic content)
- **Performance**: 100/100 Lighthouse score

## 📁 Project Structure

```
prometheus-growth-architect/
├── src/                    # Source code
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── integrations/      # External service integrations
├── public/                # Static assets
│   ├── images/            # Image assets
│   │   ├── logos/         # Company logos
│   │   ├── partners/      # Partner/client logos
│   │   └── team/          # Team photos
│   └── favicon.ico        # Site favicon
├── scripts/               # Automation scripts
└── docs/                  # Documentation
```

## 🔄 Deployment Process

### Automatic Deployment
1. **Push to GitHub** → Automatically triggers Netlify build
2. **Staging**: prometheusagency.io (deploys from main branch)
3. **Production**: prometheusagency.co (manual promotion)

### Build Process
```bash
npm run build           # Builds the application
npm run preview         # Preview production build locally
```

## 🖼️ Image Management

### Current Workflow
1. **Upload**: Images uploaded to Supabase storage
2. **Sync**: Run locally to download images
3. **Commit**: Commit synced images to git
4. **Deploy**: Images served from your domain

### Image Sync Commands
```bash
# Download images from Supabase to local folders
npm run sync-images

# Update code to use local paths instead of Supabase URLs
npm run update-image-refs

# Do both in one command
npm run sync-and-update
```

### Image Locations
- **Supabase Storage** → **Local Path**
- `Active Client Logos/` → `/public/images/partners/`
- `Prometheus Assets/` → `/public/images/logos/`
- `team/` → `/public/images/team/`

## 🔧 Development Workflow

### Local Development
```bash
npm install             # Install dependencies
npm run dev            # Start dev server at http://localhost:8080
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed
4. Add SEO metadata

### SEO Updates
- **Meta tags**: Update in page components
- **Sitemap**: Auto-generated on build
- **Robots.txt**: Edit `/public/robots.txt`

## 📊 Performance Monitoring

### Lighthouse Scores
- Run locally: `npx lighthouse https://prometheusagency.io`
- Current scores: Performance 100, SEO 100, Best Practices 100

### Key Optimizations
- Image lazy loading
- Code splitting
- Service worker for offline support
- Optimized fonts and assets

## 🛠️ Common Tasks

### Update Content
1. **Text/Copy**: Edit component files directly
2. **Images**: Upload to Supabase, then sync locally
3. **SEO**: Update meta tags in components

### Add New Landing Page
1. Copy template from existing landing page
2. Update content and keywords
3. Add to sitemap
4. Update navigation if needed

### Deploy Changes
1. Commit changes: `git add -A && git commit -m "Your message"`
2. Push to GitHub: `git push origin main`
3. Wait for Netlify build (2-3 minutes)
4. Verify on staging site

## 🚨 Troubleshooting

### Build Failures
- Check Netlify logs
- Run `npm run build` locally to test
- Ensure no missing dependencies

### Missing Images
1. Check if images exist in `/public/images/`
2. Run `npm run sync-images` if needed
3. Verify paths in components

### SEO Issues
- Run Lighthouse audit
- Check meta tags
- Verify sitemap is accessible

## 🔐 Environment Variables

### Local Development (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Netlify (Environment Variables)
- Set in Netlify dashboard under Site Settings
- Required for dynamic features (not for builds)

## 📈 Analytics & Monitoring

- **Google Analytics**: Tracking code in index.html
- **Lighthouse CI**: Automated in Netlify builds
- **Error Tracking**: Browser console for debugging

## 🆘 Getting Help

1. **Documentation**: Check `/docs` folder
2. **Code Comments**: Inline documentation
3. **Git History**: Review commit messages
4. **Deployment Logs**: Netlify dashboard

## 📝 Best Practices

1. **Always test locally** before pushing
2. **Commit images** after syncing from Supabase
3. **Use meaningful commit messages**
4. **Check staging** before promoting to production
5. **Monitor Lighthouse scores** after major changes

This platform is designed for reliability, performance, and ease of maintenance. The automated deployment and image sync features ensure a smooth workflow while maintaining best practices for SEO and performance. 