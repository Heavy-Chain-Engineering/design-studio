import React from 'react';
import { InterlockingTrefoilParams } from '../../types';
import { getGoldPalette, getMonochromePalette } from '../../utils/colors';

interface InterlockingTrefoilProps {
  params: InterlockingTrefoilParams;
  size?: number | string;
  className?: string;
  monochrome?: 'black' | 'white' | null;
}

export const InterlockingTrefoil: React.FC<InterlockingTrefoilProps> = ({
  params,
  size = 400,
  className = '',
  monochrome = null,
}) => {
  const p = params || { loopSpan: 88, strandThickness: 22, loopTension: 1.05, goldWarmth: 55 };
  const gold = getGoldPalette(p.goldWarmth);
  const uid = React.useId().replace(/:/g, '');

  const cx = 200;
  const cy = 200;
  const r = p.loopSpan;
  const t = p.strandThickness;
  const tension = p.loopTension;

  const angles = [270, 30, 150]; // 3 lobes: top, bottom-right, bottom-left

  const colors = monochrome
    ? getMonochromePalette(monochrome)
    : {
        goldLobe: gold.primary,
        goldGrad: `url(#trefoilGold-${uid})`,
        navyLobe: '#0F172A',
        navyGrad: `url(#trefoilNavy-${uid})`,
        steelLobe: '#253B56',
        steelGrad: `url(#trefoilSteel-${uid})`,
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
        <linearGradient id={`trefoilGold-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold.light} />
          <stop offset="50%" stopColor={gold.primary} />
          <stop offset="100%" stopColor={gold.dark} />
        </linearGradient>
        <linearGradient id={`trefoilNavy-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#090D16" />
        </linearGradient>
        <linearGradient id={`trefoilSteel-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B577D" />
          <stop offset="100%" stopColor="#162436" />
        </linearGradient>
      </defs>

      <g id="interlocking-trefoil-geometry">
        {/* Outer Circular Reference Guide */}
        <circle
          cx={cx}
          cy={cy}
          r={r * tension + t}
          fill="none"
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : '#253B56'}
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.4"
        />

        {/* 3 Interlocking Geometric Lobes */}
        {angles.map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          const lobeX = cx + Math.cos(rad) * (r * 0.48);
          const lobeY = cy + Math.sin(rad) * (r * 0.48);

          const fill = monochrome
            ? colors.goldLobe
            : idx === 0
            ? colors.goldGrad
            : idx === 1
            ? colors.steelGrad
            : colors.navyGrad;

          return (
            <g key={deg}>
              {/* Outer Loop */}
              <circle
                cx={lobeX}
                cy={lobeY}
                r={r * 0.58 * tension}
                fill="none"
                stroke={fill}
                strokeWidth={t}
                strokeLinecap="round"
                opacity="0.95"
              />
            </g>
          );
        })}

        {/* Central Equilibrium Anchor */}
        <circle
          cx={cx}
          cy={cy}
          r={t * 0.45}
          fill={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : gold.apex}
        />
      </g>
    </svg>
  );
};
