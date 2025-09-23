import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const Image = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(e);
  };

  const getOptimizedSrc = (originalSrc) => {
    // If it's a Cloudinary URL, add optimization parameters
    if (originalSrc?.includes('cloudinary.com')) {
      const [base, params] = originalSrc.split('/upload/');
      return `${base}/upload/f_auto,q_${quality},w_${width || 'auto'},h_${height || 'auto'}/${params}`;
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading || hasError ? 'opacity-0' : 'opacity-100',
          'w-full h-full object-cover'
        )}
        {...props}
      />
    </div>
  );
};

export { Image };