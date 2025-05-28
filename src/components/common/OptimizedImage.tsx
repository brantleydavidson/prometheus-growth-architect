import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: number; // width/height ratio
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoad?: () => void;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className = '',
  priority = false,
  sizes,
  quality,
  placeholder = 'blur',
  blurDataURL,
  onError,
  onLoad,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjODg4IiBmaWx0ZXI9InVybCgjYikiIC8+PC9zdmc+';

  useEffect(() => {
    if (priority || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const imageProps = getOptimizedImageProps(src, alt, {
    width,
    height,
    sizes,
    priority,
    quality,
  });

  // Calculate aspect ratio padding for responsive container
  const paddingBottom = aspectRatio 
    ? `${(1 / aspectRatio) * 100}%` 
    : height && width 
    ? `${(height / width) * 100}%` 
    : undefined;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    ...(paddingBottom && { paddingBottom, height: 0 }),
  };

  const imageStyle: React.CSSProperties = {
    position: paddingBottom ? 'absolute' : 'static',
    top: 0,
    left: 0,
    width: '100%',
    height: paddingBottom ? '100%' : 'auto',
    objectFit,
    transition: 'opacity 300ms ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={blurDataURL || defaultBlurDataURL}
          alt=""
          aria-hidden="true"
          style={placeholderStyle}
        />
      )}
      
      {/* Main image */}
      {isInView && (
        <picture>
          {/* AVIF format for modern browsers */}
          <source
            type="image/avif"
            srcSet={imageProps.srcSet?.replace(/\.webp/g, '.avif')}
            sizes={imageProps.sizes}
          />
          
          {/* WebP format */}
          <source
            type="image/webp"
            srcSet={imageProps.srcSet}
            sizes={imageProps.sizes}
          />
          
          {/* Fallback to original format */}
          <img
            ref={imgRef}
            {...imageProps}
            style={imageStyle}
            onLoad={handleLoad}
            onError={onError}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage; 