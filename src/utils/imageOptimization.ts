/**
 * Image optimization utilities for Supabase Storage images
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
}

/**
 * Optimize Supabase Storage image URLs with transformation parameters
 */
export function optimizeSupabaseImage(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  // Skip optimization for non-Supabase URLs
  if (!url.includes('supabase.co/storage/v1/object/public/')) {
    return url;
  }

  // Default options
  const params = new URLSearchParams();
  
  // Set width if provided
  if (options.width) {
    params.set('width', options.width.toString());
  }
  
  // Set height if provided
  if (options.height) {
    params.set('height', options.height.toString());
  }
  
  // Set quality (default to 80 for good balance)
  params.set('quality', (options.quality || 80).toString());
  
  // Set format (default to webp for better compression)
  params.set('format', options.format || 'webp');
  
  // Add parameters to URL
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

/**
 * Get responsive image srcSet for different screen sizes
 */
export function getResponsiveImageSrcSet(
  url: string,
  sizes: number[] = [400, 800, 1200, 1600, 2400],
  format: 'webp' | 'avif' = 'webp'
): string {
  return sizes
    .map(size => `${optimizeSupabaseImage(url, { width: size, format })} ${size}w`)
    .join(', ');
}

/**
 * Generate a low-quality image placeholder URL
 */
export function generateBlurPlaceholder(
  url: string,
  width: number = 20,
  quality: number = 20
): string {
  return optimizeSupabaseImage(url, {
    width,
    quality,
    format: 'webp'
  });
}

/**
 * Get optimal sizes attribute based on layout
 */
export function getOptimalSizes(layout: 'full' | 'half' | 'third' | 'quarter' | 'thumbnail' = 'full'): string {
  const sizesMap = {
    full: '100vw',
    half: '(min-width: 768px) 50vw, 100vw',
    third: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
    quarter: '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw',
    thumbnail: '(min-width: 1024px) 200px, (min-width: 768px) 150px, 100px'
  };
  
  return sizesMap[layout];
}

/**
 * Get optimized image props for React components
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  options: {
    width?: number;
    height?: number;
    sizes?: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    quality?: number;
  } = {}
) {
  const optimizedSrc = optimizeSupabaseImage(src, {
    width: options.width,
    height: options.height,
    quality: options.quality,
  });

  return {
    src: optimizedSrc,
    srcSet: getResponsiveImageSrcSet(src),
    sizes: options.sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    alt,
    loading: options.priority ? 'eager' : options.loading || 'lazy',
    decoding: (options.priority ? 'sync' : 'async') as 'sync' | 'async',
    ...(options.width && { width: options.width }),
    ...(options.height && { height: options.height }),
  };
}

/**
 * Check if browser supports AVIF format
 */
export function supportsAvif(): boolean {
  if (typeof window === 'undefined') return false;
  
  const avifTest = new Image();
  avifTest.src = 'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACZpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=';
  
  return avifTest.complete && avifTest.naturalHeight !== 0;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, options?: ImageOptimizationOptions): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizeSupabaseImage(src, options);
  
  // Add image format type if specified
  if (options?.format) {
    link.type = `image/${options.format}`;
  }
  
  document.head.appendChild(link);
} 