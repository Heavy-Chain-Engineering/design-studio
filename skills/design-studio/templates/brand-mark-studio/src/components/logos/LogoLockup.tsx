import React from 'react';
import { CandidateId, LogoParams, LockupVariant } from '../../types';
import { LogoRenderer } from './LogoRenderer';
import { getGoldPalette } from '../../utils/colors';

interface LogoLockupProps {
  candidate: CandidateId;
  params: LogoParams;
  variant?: LockupVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  monochrome?: 'black' | 'white' | null;
  className?: string;
  isDark?: boolean;
}

export const LogoLockup: React.FC<LogoLockupProps> = ({
  candidate,
  params,
  variant = 'horizontal',
  size = 'md',
  monochrome = null,
  className = '',
  isDark = true,
}) => {
  const currentParams = params[candidate];
  const gold = getGoldPalette(currentParams.goldWarmth);

  // Scaled dimensions - calibrated for crisp architectural proportions
  const scaleMap = {
    sm: { markSize: 32, brandText: 'text-lg', compText: 'text-[9px]', subText: 'text-[7px]', gap: 'gap-3' },
    md: { markSize: 64, brandText: 'text-2xl', compText: 'text-xs', subText: 'text-[9px]', gap: 'gap-4' },
    lg: { markSize: 104, brandText: 'text-4xl', compText: 'text-sm', subText: 'text-[11px]', gap: 'gap-6' },
    xl: { markSize: 170, brandText: 'text-6xl', compText: 'text-lg', subText: 'text-xs', gap: 'gap-8' },
  };

  const s = scaleMap[size];

  // Text color logic
  const brandColor = monochrome === 'black'
    ? 'text-black'
    : monochrome === 'white'
    ? 'text-white'
    : isDark
    ? 'text-slate-100'
    : 'text-slate-900';

  const subtitleColor = monochrome === 'black'
    ? 'text-neutral-800'
    : monochrome === 'white'
    ? 'text-neutral-200'
    : isDark
    ? 'text-slate-300'
    : 'text-slate-700';

  const dividerColor = monochrome === 'black'
    ? '#000000'
    : monochrome === 'white'
    ? '#FFFFFF'
    : gold.primary;

  if (variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoRenderer
          candidate={candidate}
          params={params}
          size={s.markSize}
          monochrome={monochrome}
        />
      </div>
    );
  }

  // Heavy Chain Brand Typography Component: Disciplined architectural geometric sans
  const BrandRecut = () => (
    <div className="flex items-baseline space-x-2">
      <span
        className={`font-sans font-extrabold tracking-[0.08em] ${s.brandText} ${brandColor}`}
        style={{
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"', // Clean geometric variants
          letterSpacing: '0.08em',
        }}
      >
        HEAVY
      </span>
      <span
        className={`font-sans font-medium tracking-[0.22em] uppercase ${s.compText} ${subtitleColor}`}
      >
        CHAIN
      </span>
    </div>
  );

  // Tertiary Baseline with gold dividers
  const TertiaryBaseline = () => (
    <div
      className={`font-mono font-medium tracking-[0.22em] uppercase ${s.subText} ${subtitleColor} whitespace-nowrap`}
    >
      TECTONIC MASS{' '}
      <span style={{ color: dividerColor, opacity: monochrome ? 0.9 : 1 }}>|</span>{' '}
      HONESTY{' '}
      <span style={{ color: dividerColor, opacity: monochrome ? 0.9 : 1 }}>|</span>{' '}
      ZERO SLOP
    </div>
  );

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${s.gap} ${className}`}>
        <div className="relative">
          <LogoRenderer
            candidate={candidate}
            params={params}
            size={s.markSize * 1.2}
            monochrome={monochrome}
          />
        </div>

        <div className="flex flex-col items-center">
          <BrandRecut />

          {/* Golden Hairline Divider */}
          <div
            className="w-full my-2 h-[1.5px]"
            style={{
              backgroundColor: dividerColor,
              opacity: monochrome ? 0.8 : 0.9,
            }}
          />

          <TertiaryBaseline />
        </div>
      </div>
    );
  }

  // Horizontal variant (Default)
  return (
    <div className={`inline-flex items-center ${s.gap} ${className}`}>
      <LogoRenderer
        candidate={candidate}
        params={params}
        size={s.markSize}
        monochrome={monochrome}
      />

      <div className="flex flex-col justify-center">
        <BrandRecut />

        {/* Golden Hairline Divider */}
        <div
          className="w-full my-1.5 h-[1.2px]"
          style={{
            backgroundColor: dividerColor,
            opacity: monochrome ? 0.8 : 0.9,
          }}
        />

        <TertiaryBaseline />
      </div>
    </div>
  );
};
