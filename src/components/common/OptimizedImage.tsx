import React from 'react';
import { getOptimizedImageProps } from '@/utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  onError,
}) => {
  const imageProps = getOptimizedImageProps(src, alt, {
    width,
    height,
    sizes,
    priority,
  });

  return (
    <img
      {...imageProps}
      className={className}
      onError={onError}
    />
  );
};

export default OptimizedImage; 