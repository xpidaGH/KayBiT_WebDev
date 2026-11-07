import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/appConfig';

export type LogoVariant = 'desktop' | 'mobile' | 'web';

interface KbtBrandLogoProps {
  variant?: LogoVariant;
  className?: string;
}

export const KbtBrandLogo: React.FC<KbtBrandLogoProps> = ({
  variant = 'web',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const config = BRAND_ASSETS.VARIANTS[variant];
  const fallbackSvg = BRAND_ASSETS.KBT_FALLBACK_SVG;

  return (
    <div
      className={`relative bg-gradient-to-br from-zinc-900 to-black mask-squircle flex items-center justify-center border border-yellow-400/25 shrink-0 select-none ${config.sizeClass} ${className}`}
      title={config.label}
    >
      {!hasError ? (
        <img
          src={config.src}
          alt={config.alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover mask-squircle filter drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]"
        />
      ) : (
        <svg
          viewBox={fallbackSvg.viewBox}
          fill="none"
          className="w-4/5 h-4/5 text-lime-400"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={fallbackSvg.path} />
        </svg>
      )}
    </div>
  );
};
