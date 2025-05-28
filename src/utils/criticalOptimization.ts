/**
 * Critical optimization utilities for Core Web Vitals
 */

/**
 * Critical CSS for above-the-fold content
 * This should be inlined in the HTML head
 */
export const criticalCSS = `
  /* Reset and base styles */
  *, ::before, ::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
  
  /* Hero section critical styles */
  .hero-section { min-height: 100vh; position: relative; }
  .hero-content { position: relative; z-index: 10; }
  
  /* Typography critical styles */
  h1, h2, h3 { margin: 0; font-weight: 700; }
  p { margin: 0; }
  
  /* Layout critical styles */
  .container-custom { width: 100%; margin: 0 auto; padding: 0 1rem; }
  @media (min-width: 640px) { .container-custom { max-width: 640px; } }
  @media (min-width: 768px) { .container-custom { max-width: 768px; } }
  @media (min-width: 1024px) { .container-custom { max-width: 1024px; } }
  @media (min-width: 1280px) { .container-custom { max-width: 1280px; } }
  
  /* Loading states */
  .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
  @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`;

/**
 * Font optimization - preload critical fonts
 */
export function generateFontPreloads(): string {
  const fonts = [
    // Inter for body text
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      crossOrigin: 'anonymous',
      format: 'woff2',
    },
    // Inter Bold for headings
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2',
      crossOrigin: 'anonymous',
      format: 'woff2',
    }
  ];

  return fonts.map(font => 
    `<link rel="preload" href="${font.href}" as="font" type="font/${font.format}" crossorigin="${font.crossOrigin}">`
  ).join('\n');
}

/**
 * Generate resource hints for critical resources
 */
export function generateResourceHints(): string {
  const hints = [
    // DNS prefetch for third-party domains
    '<link rel="dns-prefetch" href="https://fonts.googleapis.com">',
    '<link rel="dns-prefetch" href="https://fonts.gstatic.com">',
    '<link rel="dns-prefetch" href="https://xkarbwfzxfxgtnefcout.supabase.co">',
    '<link rel="dns-prefetch" href="https://www.googletagmanager.com">',
    
    // Preconnect for critical domains
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="preconnect" href="https://xkarbwfzxfxgtnefcout.supabase.co">',
  ];

  return hints.join('\n');
}

/**
 * Inline critical scripts for immediate execution
 */
export const criticalScripts = {
  // Font loading optimization
  fontLoader: `
    (function() {
      // Check if fonts are already cached
      if (sessionStorage.getItem('fontsLoaded')) {
        document.documentElement.classList.add('fonts-loaded');
        return;
      }
      
      // Use Font Face Observer for critical fonts
      if ('fonts' in document) {
        Promise.all([
          document.fonts.load('400 1em Inter'),
          document.fonts.load('700 1em Inter')
        ]).then(function() {
          document.documentElement.classList.add('fonts-loaded');
          sessionStorage.setItem('fontsLoaded', '1');
        });
      }
    })();
  `,
  
  // Theme detection to prevent flash
  themeDetection: `
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  `,
  
  // Viewport height fix for mobile
  viewportFix: `
    (function() {
      const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
      };
      setVh();
      window.addEventListener('resize', setVh);
    })();
  `
};

/**
 * Generate critical path CSS based on route
 */
export function getCriticalCSSForRoute(route: string): string {
  const baseCSS = criticalCSS;
  
  // Add route-specific critical CSS
  const routeCSS: Record<string, string> = {
    '/': `
      /* Home page hero */
      .hero-gradient { background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); }
      .hero-title { font-size: 3rem; line-height: 1.2; color: white; }
      @media (min-width: 768px) { .hero-title { font-size: 4rem; } }
    `,
    '/services': `
      /* Services page */
      .service-grid { display: grid; gap: 2rem; }
      .service-card { background: white; border-radius: 0.5rem; padding: 2rem; }
    `,
    '/about': `
      /* About page */
      .about-hero { background-color: #f9fafb; padding: 4rem 0; }
      .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    `
  };
  
  return baseCSS + (routeCSS[route] || '');
}

/**
 * Lazy load non-critical CSS
 */
export function loadNonCriticalCSS(href: string): void {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = function() {
    (this as HTMLLinkElement).media = 'all';
  };
  document.head.appendChild(link);
}

/**
 * Optimize web font loading with font-display
 */
export const fontFaceCSS = `
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`; 