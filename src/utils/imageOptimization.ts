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
  sizes: number[] = [400, 800, 1200, 1600]
): string {
  return sizes
    .map(size => `${optimizeSupabaseImage(url, { width: size })} ${size}w`)
    .join(', ');
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
  } = {}
) {
  const optimizedSrc = optimizeSupabaseImage(src, {
    width: options.width,
    height: options.height,
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