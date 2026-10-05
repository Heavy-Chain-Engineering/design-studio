import React from 'react';
import { ModularPrismParams } from '../../types';
import { getGoldPalette, getMonochromePalette } from '../../utils/colors';

interface ModularPrismProps {
  params: ModularPrismParams;
  size?: number | string;
  className?: string;
  monochrome?: 'black' | 'white' | null;
}

export const ModularPrism: React.FC<ModularPrismProps> = ({
  params,
  size = 400,
  className = '',
  monochrome = null,
}) => {
  const p = params || { facetGap: 4, prismHeight: 90, bevelDepth: 6, goldWarmth: 55 };
  const gold = getGoldPalette(p.goldWarmth);
  const uid = React.useId().replace(/:/g, '');

  const cx = 200;
  const cy = 200;
  const h = p.prismHeight;
  const w = 78;
  const gap = p.facetGap;

  // Offset directions for 3 facets
  const topDy = -gap * 1.2;
  const leftDx = -gap;
  const leftDy = gap * 0.6;
  const rightDx = gap;
  const rightDy = gap * 0.6;

  // Top Facet Points
  const topPoints = [
    `${cx},${cy - h + topDy}`,
    `${cx + w},${cy - h / 2 + topDy}`,
    `${cx},${cy + topDy}`,
    `${cx - w},${cy - h / 2 + topDy}`,
  ].join(' ');

  // Left Facet Points
  const leftPoints = [
    `${cx + leftDx},${cy + leftDy}`,
    `${cx - w + leftDx},${cy - h / 2 + leftDy}`,
    `${cx - w + leftDx},${cy + h / 2 + leftDy}`,
    `${cx + leftDx},${cy + h + leftDy}`,
  ].join(' ');

  // Right Facet Points
  const rightPoints = [
    `${cx + rightDx},${cy + rightDy}`,
    `${cx + rightDx},${cy + h + rightDy}`,
    `${cx + w + rightDx},${cy + h / 2 + rightDy}`,
    `${cx + w + rightDx},${cy - h / 2 + rightDy}`,
  ].join(' ');

  const colors = monochrome
    ? getMonochromePalette(monochrome)
    : {
        top: gold.primary,
        topGrad: `url(#topGrad-${uid})`,
        left: '#0F172A',
        leftGrad: `url(#leftGrad-${uid})`,
        right: '#253B56',
        rightGrad: `url(#rightGrad-${uid})`,
        line: '#FFFFFF',
      };

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`topGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold.light} />
          <stop offset="50%" stopColor={gold.primary} />
          <stop offset="100%" stopColor={gold.dark} />
        </linearGradient>
        <linearGradient id={`leftGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#090D16" />
        </linearGradient>
        <linearGradient id={`rightGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B577D" />
          <stop offset="100%" stopColor="#162436" />
        </linearGradient>
      </defs>

      <g id="modular-prism-geometry">
        {/* Left Facet */}
        <polygon
          points={leftPoints}
          fill={monochrome ? colors.left : colors.leftGrad}
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : '#0F172A'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Right Facet */}
        <polygon
          points={rightPoints}
          fill={monochrome ? colors.right : colors.rightGrad}
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : '#162436'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Top Facet (Golden Apex) */}
        <polygon
          points={topPoints}
          fill={monochrome ? colors.top : colors.topGrad}
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : gold.dark}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Internal Tectonic Center Point */}
        <circle
          cx={cx}
          cy={cy}
          r={p.bevelDepth > 0 ? p.bevelDepth : 3}
          fill={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : gold.apex}
          opacity="0.9"
        />
      </g>
    </svg>
  );
};
