/**
 * Performance configuration for the Prometheus Agency website
 * This file centralizes all performance-related settings to ensure
 * consistent optimization across the entire application
 */

export const performanceConfig = {
  // Image optimization settings
  images: {
    // Default quality for all images
    defaultQuality: 80,
    // Default format for modern browsers
    defaultFormat: 'webp' as const,
    // Responsive breakpoints for srcSet generation
    breakpoints: [400, 800, 1200, 1600],
    // Maximum dimensions for different image types
    maxDimensions: {
      thumbnail: { width: 400, height: 300 },
      card: { width: 800, height: 600 },
      hero: { width: 1600, height: 900 },
      logo: { width: 200, height: 200 },
      avatar: { width: 150, height: 150 },
      blogContent: { width: 800, height: 600 }
    },
    // Lazy loading settings
    lazyLoading: {
      enabled: true,
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  },

  // Caching strategies
  caching: {
    // Cache duration for different asset types (in seconds)
    durations: {
      images: 31536000, // 1 year
      fonts: 31536000, // 1 year
      css: 86400, // 1 day
      js: 86400, // 1 day
      html: 3600, // 1 hour
      api: 300 // 5 minutes
    },
    // Service worker settings
    serviceWorker: {
      enabled: true,
      cacheVersion: 'prometheus-v1',
      strategies: {
        images: 'cache-first',
        fonts: 'cache-first',
        css: 'cache-first',
        js: 'cache-first',
        html: 'network-first',
        api: 'network-first'
      }
    }
  },

  // Code splitting settings
  codeSplitting: {
    // Routes that should be lazy loaded
    lazyRoutes: [
      '/admin/*',
      '/insights/:slug',
      '/playbooks/*',
      '/tools/*'
    ],
    // Chunk size limits (in KB)
    chunkSizeWarning: 500,
    maxChunkSize: 1000
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      'https://xkarbwfzxfxgtnefcout.supabase.co',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    dnsPrefetch: [
      'https://cdn.gpteng.co',
      'https://www.googletagmanager.com',
      'https://api.hsforms.com'
    ]
  },

  // Critical CSS settings
  criticalCSS: {
    enabled: true,
    // Paths that need critical CSS extraction
    paths: ['/', '/services', '/about', '/insights'],
    // Maximum size for inline critical CSS (in KB)
    maxSize: 20
  },

  // Third-party script optimization
  thirdPartyScripts: {
    // Scripts to load with defer
    defer: [
      'https://cdn.gpteng.co/gptengineer.js',
      '/sw-register.js'
    ],
    // Scripts to load asynchronously
    async: [
      'https://www.googletagmanager.com/gtag/js'
    ]
  },

  // Performance budgets
  budgets: {
    // Maximum sizes in KB
    javascript: 200,
    css: 50,
    images: 500,
    fonts: 100,
    total: 1000,
    // Core Web Vitals targets
    metrics: {
      fcp: 1800, // First Contentful Paint (ms)
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100, // First Input Delay (ms)
      cls: 0.1, // Cumulative Layout Shift
      ttfb: 600 // Time to First Byte (ms)
    }
  }
};

/**
 * Helper function to get optimized image settings for a specific use case
 */
export function getImageOptimizationSettings(imageType: keyof typeof performanceConfig.images.maxDimensions) {
  const dimensions = performanceConfig.images.maxDimensions[imageType];
  return {
    ...dimensions,
    quality: performanceConfig.images.defaultQuality,
    format: performanceConfig.images.defaultFormat,
    loading: 'lazy' as const,
    decoding: 'async' as const
  };
}

/**
 * Helper function to check if a route should be lazy loaded
 */
export function shouldLazyLoadRoute(path: string): boolean {
  return performanceConfig.codeSplitting.lazyRoutes.some(pattern => {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return regex.test(path);
  });
}

/**
 * Helper function to get cache duration for a resource type
 */
export function getCacheDuration(resourceType: keyof typeof performanceConfig.caching.durations): number {
  return performanceConfig.caching.durations[resourceType] || 3600;
} 