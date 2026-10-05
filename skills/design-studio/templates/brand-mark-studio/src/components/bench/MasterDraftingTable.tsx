import React, { useState } from 'react';
import { CandidateId, LogoParams, DraftingGuides, LockupVariant } from '../../types';
import { LogoLockup } from '../logos/LogoLockup';
import { LogoRenderer } from '../logos/LogoRenderer';
import { Download, Copy, Check, Eye, Compass, Grid, Maximize2, Shield } from 'lucide-react';

interface MasterDraftingTableProps {
  candidate: CandidateId;
  params: LogoParams;
  isDark: boolean;
}

export const MasterDraftingTable: React.FC<MasterDraftingTableProps> = ({
  candidate,
  params,
  isDark,
}) => {
  const [guides, setGuides] = useState<DraftingGuides>({
    grid: true,
    goldenRatio: true,
    angleRays: false,
    centerCrosshairs: true,
    clearspace: true,
    vectorNodes: false,
  });

  const [lockupVariant, setLockupVariant] = useState<LockupVariant>('horizontal');
  const [copied, setCopied] = useState(false);

  // Metadata for the 3 Generic Architectural Candidates
  const candidateMeta = {
    'modular-prism': {
      title: 'Candidate 1: The Modular Hex Prism',
      subtitle: 'Isometric Tectonic Form • Tri-Facet Spatial Balance',
      rationale:
        'Three precision-ground isometric facets converging along a 120° axonometric axis. Pure geometric mass, balanced negative space, and disciplined architectural baselines. Clean, modular, and unencumbered by decorative clutter.',
      flanks: [
        {
          label: 'Left Facet (Navy)',
          role: 'Structural Foundation Pier',
          desc: 'Represents foundational structural engineering, tectonic mass, and architectural ledger integrity.',
        },
        {
          label: 'Top Facet (Gold)',
          role: 'Central Apex & Geometric Cap',
          desc: 'The central geometric cap providing compression equilibrium, optical focus, and isometric balance.',
        },
        {
          label: 'Right Facet (Steel)',
          role: 'Tectonic Balance Flank',
          desc: 'Represents structural symmetry, material performance, and precision craftsmanship.',
        },
      ],
    },
    'concentric-aperture': {
      title: 'Candidate 2: The Concentric Aperture',
      subtitle: 'Golden Ratio Geometry • Rotational Iris Mechanics',
      rationale:
        'Mathematical logarithmic arcs nested along golden-ratio radii. Rotational momentum with balanced negative-space void, delivering extreme contrast and legibility at micro-scales.',
      flanks: [
        {
          label: 'Rotational Arc 1 (Navy)',
          role: 'Primary Curvature Vector',
          desc: 'Dynamic exterior sweeping arc guiding visual flow into the geometric core.',
        },
        {
          label: 'Aperture Ring (Gold)',
          role: 'Central Focus & Focal Aperture',
          desc: 'Precision central aperture framing the focal eye and balancing internal light.',
        },
        {
          label: 'Rotational Arc 2 (Steel)',
          role: 'Counter-Rotational Balance',
          desc: 'Stabilizing counter-rotational curve anchoring the overall circular envelope.',
        },
      ],
    },
    'interlocking-trefoil': {
      title: 'Candidate 3: The Interlocking Trefoil',
      subtitle: 'Continuous Knot Topology • Tri-Vector Equilibrium',
      rationale:
        'Three continuous geometric loops in dynamic equilibrium. High structural tension, balanced mathematical clearspace, and instantaneous recognition across all viewport breakpoints.',
      flanks: [
        {
          label: 'Primary Loop (Gold)',
          role: 'Leading Topological Apex',
          desc: 'Topological loop articulating ascension, agility, and dynamic momentum.',
        },
        {
          label: 'Center Hub (Amber)',
          role: 'Geometric Convergence Point',
          desc: 'Central junction where all three vectors converge into unified equilibrium.',
        },
        {
          label: 'Anchor Loops (Navy/Steel)',
          role: 'Grounding Bilateral Base',
          desc: 'Dual grounded loops providing bilateral stability and structural anchoring.',
        },
      ],
    },
  }[candidate];

  const toggleGuide = (key: keyof DraftingGuides) => {
    setGuides((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copySvg = () => {
    const svgEl = document.getElementById('master-mark-svg');
    if (svgEl) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgEl);
      navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadSvg = () => {
    const svgEl = document.getElementById('master-mark-svg');
    if (svgEl) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgEl);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `heavy-chain-mark-${candidate}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Top Section: Architectural Title & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-base-200/80 rounded-2xl border border-base-300 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="badge badge-outline badge-primary font-mono text-[10px] uppercase font-bold">
              Renzo Master Blueprint
            </span>
            <span className="text-xs font-mono text-base-content/60">MATH RATIO: φ (1.618) GOLDEN HARMONY</span>
          </div>
          <h2 className="text-2xl font-bold font-sans text-base-content mt-1 tracking-tight">
            {candidateMeta.title}
          </h2>
          <p className="text-xs font-mono text-base-content/70 mt-0.5">
            {candidateMeta.subtitle}
          </p>
        </div>

        {/* Lockup Format & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lockup Variant Switcher */}
          <div className="flex items-center bg-base-300/70 p-1 rounded-xl border border-base-300 gap-1">
            <button
              onClick={() => setLockupVariant('horizontal')}
              className={`btn btn-xs font-mono ${
                lockupVariant === 'horizontal'
                  ? 'btn-primary'
                  : 'btn-ghost text-base-content/70 hover:text-base-content'
              }`}
            >
              Horizontal
            </button>
            <button
              onClick={() => setLockupVariant('stacked')}
              className={`btn btn-xs font-mono ${
                lockupVariant === 'stacked'
                  ? 'btn-primary'
                  : 'btn-ghost text-base-content/70 hover:text-base-content'
              }`}
            >
              Stacked
            </button>
            <button
              onClick={() => setLockupVariant('mark-only')}
              className={`btn btn-xs font-mono ${
                lockupVariant === 'mark-only'
                  ? 'btn-primary'
                  : 'btn-ghost text-base-content/70 hover:text-base-content'
              }`}
            >
              Mark Only
            </button>
          </div>

          {/* Export Actions */}
          <button
            onClick={copySvg}
            className="btn btn-xs btn-ghost border border-base-300 font-mono gap-1 text-base-content"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy SVG'}</span>
          </button>
          <button
            onClick={downloadSvg}
            className="btn btn-xs btn-primary font-mono font-bold gap-1 shadow-sm"
          >
            <Download size={14} />
            <span>Export SVG</span>
          </button>
        </div>
      </div>

      {/* Main Drafting Canvas Container */}
      <div className="relative rounded-2xl border border-base-300 overflow-hidden shadow-2xl bg-blueprint">
        {/* Top-Right Technical Guide Toggles Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 bg-base-200/90 p-1.5 rounded-xl border border-base-300 backdrop-blur-md">
          <span className="text-[10px] font-mono text-base-content/60 px-2 uppercase font-semibold">
            Guides:
          </span>
          <button
            onClick={() => toggleGuide('grid')}
            className={`px-2 py-1 text-[10px] font-mono rounded flex items-center space-x-1 transition-all ${
              guides.grid
                ? 'bg-blue-600 text-white font-bold'
                : 'text-base-content/60 hover:text-base-content bg-base-300/60'
            }`}
          >
            <Grid size={12} />
            <span>Grid</span>
          </button>
          <button
            onClick={() => toggleGuide('goldenRatio')}
            className={`px-2 py-1 text-[10px] font-mono rounded flex items-center space-x-1 transition-all ${
              guides.goldenRatio
                ? 'bg-amber-600 text-white font-bold'
                : 'text-base-content/60 hover:text-base-content bg-base-300/60'
            }`}
          >
            <Compass size={12} />
            <span>φ Circles</span>
          </button>
          <button
            onClick={() => toggleGuide('centerCrosshairs')}
            className={`px-2 py-1 text-[10px] font-mono rounded flex items-center space-x-1 transition-all ${
              guides.centerCrosshairs
                ? 'bg-primary text-primary-content font-bold'
                : 'text-base-content/60 hover:text-base-content bg-base-300/60'
            }`}
          >
            <Maximize2 size={12} />
            <span>Crosshairs</span>
          </button>
          <button
            onClick={() => toggleGuide('clearspace')}
            className={`px-2 py-1 text-[10px] font-mono rounded flex items-center space-x-1 transition-all ${
              guides.clearspace
                ? 'bg-accent text-accent-content font-bold'
                : 'text-base-content/60 hover:text-base-content bg-base-300/60'
            }`}
          >
            <Shield size={12} />
            <span>Clearspace (1X)</span>
          </button>
          <button
            onClick={() => toggleGuide('angleRays')}
            className={`px-2 py-1 text-[10px] font-mono rounded flex items-center space-x-1 transition-all ${
              guides.angleRays
                ? 'bg-neutral text-neutral-content font-bold'
                : 'text-base-content/60 hover:text-base-content bg-base-300/60'
            }`}
          >
            <Eye size={12} />
            <span>Angle Vectors</span>
          </button>
        </div>

        {/* Blueprint Coordinate Markings in Corners */}
        <div className={`absolute top-4 left-4 z-10 font-mono text-[9px] leading-tight ${isDark ? 'text-blue-400/60' : 'text-blue-900/60'}`}>
          <div>ORIGIN: (200.00, 200.00)</div>
          <div>VECTOR UNITS: EPS / SVG 1:1</div>
          <div>STANDARDS: ISO 128 • SVG 1.1 • WCAG AA</div>
        </div>
        <div className={`absolute bottom-4 left-4 z-10 font-mono text-[9px] ${isDark ? 'text-blue-400/60' : 'text-blue-900/60'}`}>
          HEAVY CHAIN ATELIER • MASTER BLUEPRINT PROOF
        </div>
        <div className={`absolute bottom-4 right-4 z-10 font-mono text-[9px] text-right ${isDark ? 'text-blue-400/60' : 'text-blue-900/60'}`}>
          OPTICAL CENTROID: VECTOR GEOMETRIC APEX
        </div>

        {/* Canvas Display Area */}
        <div className="min-h-[500px] flex items-center justify-center p-8 sm:p-14 relative z-0">
          {/* Construction Overlay SVG Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Center Crosshairs */}
            {guides.centerCrosshairs && (
              <g
                stroke={isDark ? "rgba(99, 179, 237, 0.5)" : "rgba(30, 58, 138, 0.45)"}
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <line x1="500" y1="50" x2="500" y2="550" />
                <line x1="150" y1="300" x2="850" y2="300" />
                <circle
                  cx="500"
                  cy="300"
                  r="4"
                  fill="none"
                  stroke={isDark ? "rgba(99, 179, 237, 0.85)" : "rgba(30, 58, 138, 0.8)"}
                />
                <text
                  x="506"
                  y="294"
                  fill={isDark ? "rgba(99, 179, 237, 0.8)" : "rgba(30, 58, 138, 0.75)"}
                  fontSize="10"
                  fontFamily="monospace"
                  className="font-mono"
                >
                  (0,0)
                </text>
              </g>
            )}

            {/* Golden Ratio Circles (φ = 1.618) */}
            {guides.goldenRatio && (
              <g
                stroke={isDark ? "rgba(227, 165, 46, 0.5)" : "rgba(214, 141, 22, 0.5)"}
                strokeWidth="1"
                fill="none"
              >
                <circle cx="500" cy="300" r="162" strokeDasharray="3 6" />
                <circle cx="500" cy="300" r="100" strokeDasharray="3 6" />
                <circle cx="500" cy="300" r="62" strokeDasharray="3 6" />
                <circle cx="500" cy="300" r="38" strokeDasharray="3 6" />
                <text
                  x="668"
                  y="304"
                  fill={isDark ? "rgba(227, 165, 46, 0.85)" : "rgba(214, 141, 22, 0.85)"}
                  fontSize="9"
                  fontFamily="monospace"
                  className="font-mono"
                >
                  R=161.8 (φ)
                </text>
                <text
                  x="606"
                  y="304"
                  fill={isDark ? "rgba(227, 165, 46, 0.85)" : "rgba(214, 141, 22, 0.85)"}
                  fontSize="9"
                  fontFamily="monospace"
                  className="font-mono"
                >
                  R=100
                </text>
              </g>
            )}

            {/* Angle Ray Guides (30°, 45°, 60°, 75°) */}
            {guides.angleRays && (
              <g
                stroke={isDark ? "rgba(247, 250, 252, 0.3)" : "rgba(15, 23, 42, 0.3)"}
                strokeWidth="1"
                strokeDasharray="6 6"
              >
                <line x1="500" y1="300" x2="800" y2="127" />
                <line x1="500" y1="300" x2="200" y2="127" />
                <line x1="500" y1="300" x2="712" y2="88" />
                <line x1="500" y1="300" x2="288" y2="88" />
                <text
                  x="760"
                  y="145"
                  fill={isDark ? "rgba(247, 250, 252, 0.7)" : "rgba(15, 23, 42, 0.7)"}
                  fontSize="9"
                  fontFamily="monospace"
                  className="font-mono"
                >
                  60° WING BEVEL VECTOR
                </text>
              </g>
            )}

            {/* Clearspace Boundaries (1X Margin) */}
            {guides.clearspace && (
              <g
                stroke={isDark ? "rgba(240, 188, 85, 0.4)" : "rgba(122, 76, 5, 0.4)"}
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              >
                <rect x="260" y="100" width="480" height="400" rx="4" />
                <text
                  x="270"
                  y="118"
                  fill={isDark ? "rgba(240, 188, 85, 0.8)" : "rgba(122, 76, 5, 0.8)"}
                  fontSize="10"
                  fontFamily="monospace"
                  className="font-mono"
                >
                  1X PROTECTIVE CLEARSPACE ZONE
                </text>
              </g>
            )}
          </svg>

          {/* Active Mark Lockup Render */}
          <div className="relative z-10 transition-transform duration-300">
            {lockupVariant === 'mark-only' ? (
              <div id="master-mark-svg" className="p-4">
                <LogoRenderer
                  candidate={candidate}
                  params={params}
                  size={260}
                />
              </div>
            ) : (
              <div id="master-mark-svg" className="p-4">
                <LogoLockup
                  candidate={candidate}
                  params={params}
                  size="xl"
                  variant={lockupVariant}
                  isDark={isDark}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rationale & Pillar Analysis Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidateMeta.flanks.map((flank, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-base-200/60 border border-base-300 backdrop-blur flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] font-mono text-primary uppercase tracking-wider font-semibold">
                {flank.label}
              </div>
              <div className="text-sm font-bold text-base-content mt-1">
                {flank.role}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-base-content/70 font-sans leading-relaxed">
              {flank.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
