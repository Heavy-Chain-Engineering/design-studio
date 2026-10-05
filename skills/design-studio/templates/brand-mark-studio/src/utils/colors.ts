/**
 * Color generator for Heavy Chain architectural palette with warmth adjustments
 */
export function getGoldPalette(warmth: number = 50) {
  // warmth 0 = cool champagne (#E6D5AC)
  // warmth 50 = institutional warm gold (#D4AF37)
  // warmth 100 = deep imperial amber (#C88A1A)
  const t = Math.max(0, Math.min(100, warmth)) / 100;

  // Primary Gold
  const r1 = Math.round(230 + (200 - 230) * t);
  const g1 = Math.round(213 + (138 - 213) * t);
  const b1 = Math.round(172 + (26 - 172) * t);
  const primary = `rgb(${r1}, ${g1}, ${b1})`;

  // Highlight Gold (Facet light)
  const rH = Math.round(248 + (255 - 248) * t);
  const gH = Math.round(236 + (190 - 236) * t);
  const bH = Math.round(200 + (70 - 200) * t);
  const highlight = `rgb(${rH}, ${gH}, ${bH})`;

  // Shadow Gold (Facet dark)
  const rS = Math.round(180 + (150 - 180) * t);
  const gS = Math.round(155 + (95 - 155) * t);
  const bS = Math.round(105 + (12 - 105) * t);
  const shadow = `rgb(${rS}, ${gS}, ${bS})`;

  return {
    primary,
    highlight,
    shadow,
    light: highlight,
    dark: shadow,
    apex: highlight,
    glow: `rgba(${r1}, ${g1}, ${b1}, 0.25)`,
  };
}

export function getMonochromePalette(monochrome: 'black' | 'white') {
  const isWhite = monochrome === 'white';
  const color = isWhite ? '#FFFFFF' : '#000000';
  return {
    stroke: color,
    fill: color,
    top: color,
    topGrad: color,
    left: color,
    leftGrad: color,
    right: color,
    rightGrad: color,
    line: color,
    goldBlade: color,
    goldGrad: color,
    darkBlade: color,
    midBlade: color,
    goldLobe: color,
    navyLobe: color,
    steelLobe: color,
    navyGrad: color,
    steelGrad: color,
  };
}

export const BRAND_COLORS = {
  navy: {
    regulation: '#0A2540',
    regulationLight: '#163B66',
    regulationDark: '#061626',
  },
  steel: {
    product: '#253B56',
    productLight: '#3D5C85',
    productDark: '#172537',
  },
  slate: {
    cockpit: '#0F172A',
    surface: '#1E293B',
    border: '#334155',
  }
};
