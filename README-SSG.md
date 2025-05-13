
# Static Site Generation (SSG) Setup for Prometheus Agency

This project is configured for Static Site Generation (SSG) to improve SEO and page load performance.

## Build Process

The build process has been updated to support SSG:

1. `npm run build:client` - Builds the client-side assets
2. `npm run build:server` - Builds the server-side rendering code
3. `npm run prerender` - Pre-renders all pages based on the routes defined in the src/pages directory
4. `npm run build` - Runs all of the above commands in sequence

## How to Set Up SSG

If you haven't set up the scripts yet, run:

```bash
node package-scripts.js
```

This will automatically update your package.json with the required scripts.

## How to Build

```bash
npm run build
```

This will create:
- `dist/client` - The client-side build (to be deployed)
- `dist/server` - Server-side rendering code (used during build)
- Pre-rendered HTML files for all routes in `dist/client`

## Deployment

Deploy the contents of the `dist/client` directory to your hosting provider.
