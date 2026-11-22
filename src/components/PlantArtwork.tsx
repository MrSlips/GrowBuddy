import { useState } from 'react';
import { Sprout } from 'lucide-react';

interface PlantArtworkProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function PlantArtwork({
  src,
  alt,
  className = '',
  fallbackLabel,
}: PlantArtworkProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#e7efe2] to-[#d5e3cd] text-[#2b5439] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sprout className="w-8 h-8 mb-1.5 opacity-80" strokeWidth={1.75} />
        {fallbackLabel && (
          <span className="text-xs font-medium text-center px-2">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
