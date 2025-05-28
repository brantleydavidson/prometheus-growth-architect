import { useState, useEffect, useCallback } from 'react';
import { preloadImage, generateBlurPlaceholder } from '@/utils/imageOptimization';

interface UseOptimizedImageOptions {
  src: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

interface UseOptimizedImageReturn {
  isLoading: boolean;
  hasError: boolean;
  blurDataURL: string | null;
  preload: () => void;
}

/**
 * Custom hook for optimized image loading with performance tracking
 */
export function useOptimizedImage({
  src,
  priority = false,
  onLoad,
  onError,
}: UseOptimizedImageOptions): UseOptimizedImageReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

  // Generate blur placeholder
  useEffect(() => {
    if (src.includes('supabase.co')) {
      const placeholder = generateBlurPlaceholder(src);
      setBlurDataURL(placeholder);
    }
  }, [src]);

  // Preload priority images
  useEffect(() => {
    if (priority && src) {
      preloadImage(src);
    }
  }, [priority, src]);

  // Handle image loading
  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
      
      // Track performance metric
      if (priority && 'performance' in window) {
        performance.mark('image-loaded-' + src);
      }
    };
    
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, priority, onLoad, onError]);

  const preload = useCallback(() => {
    if (src) {
      preloadImage(src);
    }
  }, [src]);

  return {
    isLoading,
    hasError,
    blurDataURL,
    preload,
  };
}

/**
 * Performance observer for image loading metrics
 */
export function useImagePerformanceObserver() {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const element = (entry as any).element;
          if (element?.tagName === 'IMG') {
            console.log('LCP Image:', element.src, 'Time:', entry.startTime);
            
            // Report to analytics if needed
            if (window.dataLayer) {
              window.dataLayer.push({
                event: 'performance_metric',
                metric_name: 'lcp_image',
                metric_value: entry.startTime,
                image_src: element.src
              });
            }
          }
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    return () => observer.disconnect();
  }, []);
} 