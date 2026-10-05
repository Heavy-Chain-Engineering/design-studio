import React from 'react';
import { ConcentricApertureParams } from '../../types';
import { getGoldPalette, getMonochromePalette } from '../../utils/colors';

interface ConcentricApertureProps {
  params: ConcentricApertureParams;
  size?: number | string;
  className?: string;
  monochrome?: 'black' | 'white' | null;
}

export const ConcentricAperture: React.FC<ConcentricApertureProps> = ({
  params,
  size = 400,
  className = '',
  monochrome = null,
}) => {
  const p = params || { apertureRadius: 28, bladeRotation: 15, bladeTension: 1.0, goldWarmth: 55 };
  const gold = getGoldPalette(p.goldWarmth);
  const uid = React.useId().replace(/:/g, '');

  const cx = 200;
  const cy = 200;
  const rInner = p.apertureRadius;
  const rOuter = 100 * p.bladeTension;

  // 6 rotational blades
  const blades = [0, 60, 120, 180, 240, 300];

  const colors = monochrome
    ? getMonochromePalette(monochrome)
    : {
        goldBlade: gold.primary,
        goldGrad: `url(#apertureGold-${uid})`,
        darkBlade: '#0F172A',
        midBlade: '#253B56',
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
        <linearGradient id={`apertureGold-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold.light} />
          <stop offset="50%" stopColor={gold.primary} />
          <stop offset="100%" stopColor={gold.dark} />
        </linearGradient>
      </defs>

      <g id="concentric-aperture-geometry">
        {/* Outer Circular Boundary Hairline */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 8}
          fill="none"
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : '#253B56'}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />

        {/* 6 Rotational Iris Blades */}
        {blades.map((deg, idx) => {
          const isGold = idx === 0 || idx === 3;
          const isMid = idx === 1 || idx === 4;
          const bladeFill = monochrome
            ? colors.goldBlade
            : isGold
            ? colors.goldGrad
            : isMid
            ? colors.midBlade
            : colors.darkBlade;

          return (
            <path
              key={deg}
              d={`
                M ${cx},${cy - rInner}
                C ${cx + rInner * 1.2},${cy - rInner * 0.8} ${cx + rOuter * 0.7},${cy - rOuter * 0.7} ${cx + rOuter},${cy}
                A ${rOuter} ${rOuter} 0 0 1 ${cx + rOuter * 0.86},${cy + rOuter * 0.5}
                C ${cx + rInner * 1.5},${cy + rInner * 0.5} ${cx + rInner},${cy} ${cx},${cy - rInner}
                Z
              `}
              fill={bladeFill}
              stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : '#0F172A'}
              strokeWidth="1.2"
              transform={`rotate(${deg + p.bladeRotation}, ${cx}, ${cy})`}
              opacity={monochrome ? 0.9 : 0.95}
            />
          );
        })}

        {/* Inner Aperture Void Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill="none"
          stroke={monochrome ? (monochrome === 'white' ? '#FFFFFF' : '#000000') : gold.primary}
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
