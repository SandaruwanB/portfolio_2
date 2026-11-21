"use client";

import React, { useState, useEffect } from "react";
import { normalizeImageUrl, handleImageFallback } from "../lib/imageUtils";

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackText?: string;
}

export default function ImageWithLoader({
  src,
  alt = "System Preview",
  className = "",
  containerClassName = "",
  fallbackText,
  onError,
  onLoad,
  ...rest
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const normalizedSrc = normalizeImageUrl(src);

  // If the src changes, reset loading state
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* MINIMAL SKELETON PLACEHOLDER */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
      )}

      {/* ERROR FALLBACK */}
      {hasError ? (
        <div className="w-full h-full min-h-[140px] flex items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-900 text-center border border-zinc-200 dark:border-zinc-800">
          <span className="text-[11px] font-mono text-zinc-400 line-clamp-1">
            {fallbackText || alt}
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={normalizedSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            setIsLoading(false);
            onLoad?.(e);
          }}
          onError={(e) => {
            handleImageFallback(e);
            onError?.(e);
            const target = e.currentTarget;
            if (target.dataset.triedFallback === "true") {
              setIsLoading(false);
              setHasError(true);
            }
          }}
          className={`transition-opacity duration-300 ease-out ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
}
