export type CandidateId = 'modular-prism' | 'concentric-aperture' | 'interlocking-trefoil';

export type DeckPosition = 'docked-right' | 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';

export interface ModularPrismParams {
  facetGap: number;        // 0 to 16
  prismHeight: number;     // 60 to 140
  bevelDepth: number;      // 0 to 12
  goldWarmth: number;      // 0 to 100
}

export interface ConcentricApertureParams {
  apertureRadius: number;  // 10 to 60
  bladeRotation: number;   // 0 to 60
  bladeTension: number;    // 0.5 to 1.5
  goldWarmth: number;      // 0 to 100
}

export interface InterlockingTrefoilParams {
  loopSpan: number;        // 60 to 120
  strandThickness: number; // 12 to 32
  loopTension: number;     // 0.7 to 1.4
  goldWarmth: number;      // 0 to 100
}

export interface LogoParams {
  'modular-prism': ModularPrismParams;
  'concentric-aperture': ConcentricApertureParams;
  'interlocking-trefoil': InterlockingTrefoilParams;
}

export interface DraftingGuides {
  grid: boolean;
  goldenRatio: boolean;
  angleRays: boolean;
  centerCrosshairs: boolean;
  clearspace: boolean;
  vectorNodes: boolean;
}

export type LockupVariant = 'horizontal' | 'stacked' | 'mark-only';
