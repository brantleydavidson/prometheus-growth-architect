/**
 * Web Vitals monitoring and reporting
 */

interface WebVitalMetric {
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// Thresholds based on Web Vitals standards
const thresholds = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 }
};

/**
 * Get rating for a metric value
 */
function getRating(name: WebVitalMetric['name'], value: number): WebVitalMetric['rating'] {
  const threshold = thresholds[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report Web Vital to analytics
 */
function reportWebVital(metric: WebVitalMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'web_vital',
      web_vital_name: metric.name,
      web_vital_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      web_vital_rating: metric.rating,
      web_vital_delta: Math.round(metric.delta),
      navigation_type: metric.navigationType
    });
  }

  // You can also send to other monitoring services here
  // Example: sendToMonitoringService(metric);
}

/**
 * Initialize Web Vitals monitoring
 */
export async function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    // Dynamically import web-vitals to avoid bundle bloat
    const { onFCP, onLCP, onCLS, onTTFB, onINP } = await import('web-vitals');

    // First Contentful Paint
    onFCP((metric) => {
      reportWebVital({
        ...metric,
        rating: getRating('FCP', metric.value)
      } as WebVitalMetric);
    });

    // Largest Contentful Paint
    onLCP((metric) => {
      reportWebVital({
        ...metric,
        rating: getRating('LCP', metric.value)
      } as WebVitalMetric);
    });

    // Cumulative Layout Shift
    onCLS((metric) => {
      reportWebVital({
        ...metric,
        rating: getRating('CLS', metric.value)
      } as WebVitalMetric);
    });

    // Time to First Byte
    onTTFB((metric) => {
      reportWebVital({
        ...metric,
        rating: getRating('TTFB', metric.value)
      } as WebVitalMetric);
    });

    // Interaction to Next Paint (new metric)
    onINP((metric) => {
      reportWebVital({
        ...metric,
        rating: getRating('INP', metric.value)
      } as WebVitalMetric);
    });
  } catch (error) {
    console.error('Failed to initialize Web Vitals:', error);
  }
}

/**
 * Get current page performance metrics
 */
export function getPagePerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    // DNS lookup time
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    // TCP connection time
    tcp: navigation.connectEnd - navigation.connectStart,
    // Request time
    request: navigation.responseStart - navigation.requestStart,
    // Response time
    response: navigation.responseEnd - navigation.responseStart,
    // DOM processing time
    domProcessing: navigation.domComplete - navigation.domContentLoadedEventStart,
    // Total load time
    loadTime: navigation.loadEventEnd - navigation.fetchStart,
    // Time to interactive
    tti: navigation.domInteractive - navigation.fetchStart
  };
}

/**
 * Custom hook to monitor component render performance
 */
export function useRenderPerformance(componentName: string) {
  if (typeof window === 'undefined' || !window.performance) return;

  const startMark = `${componentName}-render-start`;
  const endMark = `${componentName}-render-end`;
  const measureName = `${componentName}-render`;

  // Mark render start
  performance.mark(startMark);

  // Return cleanup function to mark render end
  return () => {
    performance.mark(endMark);
    
    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      
      if (measure && measure.duration > 16) { // Log if render takes more than 16ms
        console.warn(`Slow render detected in ${componentName}: ${measure.duration.toFixed(2)}ms`);
      }
      
      // Clean up marks and measures
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    } catch (error) {
      // Ignore errors from timing API
    }
  };
} 