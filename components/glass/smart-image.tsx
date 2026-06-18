'use client';

import { memo, useEffect, useState } from 'react';
import Image, { type ImageProps } from 'next/image';

/** Guaranteed-stable fallback (Dubai skyline) if a source URL fails to load. */
const FALLBACK =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';

/** Neutral light-grey placeholder so image areas fade in instead of sitting blank. */
const BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAEUlEQVR4nGN49+4DVsQw3CUAR33fwWTxjroAAAAASUVORK5CYII=';

/**
 * next/image with an onError fallback so the image-first feed never shows a
 * broken tile if a remote photo 404s. Memoised — image tiles are static once
 * mounted, so they should never re-render just because a parent did. Defaults
 * to a blur placeholder so large covers never flash empty while optimising.
 */
function SmartImageImpl({ src, alt, placeholder, blurDataURL, ...rest }: ImageProps) {
  const [current, setCurrent] = useState(src);

  // Keep the displayed source in sync if the src prop changes.
  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      placeholder={placeholder ?? 'blur'}
      blurDataURL={blurDataURL ?? BLUR}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
    />
  );
}

export const SmartImage = memo(SmartImageImpl);
