import React from 'react';
import { CandidateId, LogoParams } from '../../types';
import { LogoRenderer } from '../logos/LogoRenderer';

interface QuadrantScalabilityMatrixProps {
  candidate: CandidateId;
  params: LogoParams;
}

export const QuadrantScalabilityMatrix: React.FC<QuadrantScalabilityMatrixProps> = ({
  candidate,
  params,
}) => {
  const sizes = [
    { label: '128px App Icon', size: 128, tileClass: 'w-36 h-36 rounded-2xl' },
    { label: '64px Dock / App', size: 64, tileClass: 'w-24 h-24 rounded-xl' },
    { label: '32px Toolbar', size: 32, tileClass: 'w-14 h-14 rounded-lg' },
    { label: '16px Micro Favicon', size: 16, tileClass: 'w-10 h-10 rounded-md' },
  ];

  return (
    <div className="flex flex-col h-full bg-base-200/40 rounded-xl border border-base-300 overflow-hidden shadow-xl">
      {/* Quadrant Header */}
      <div className="px-4 py-2.5 bg-base-300/80 border-b border-base-300 flex items-center justify-between text-base-content">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-base-content uppercase">
            Q2: Scalability & Anti-Smudge Matrix (128px → 16px)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-base-content/60">FAVICON FIDELITY TEST</span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
        {/* Row 1: Dark Cockpit Tiles */}
        <div>
          <div className="text-[11px] font-mono text-base-content/70 mb-2 flex items-center justify-between">
            <span>DARK TILES (#0F172A SURFACE)</span>
            <span className="text-[10px] text-base-content/50">PROVES EDGE CONTRAST</span>
          </div>
          <div className="flex items-end justify-around gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            {sizes.map((s) => (
              <div key={`dark-${s.size}`} className="flex flex-col items-center">
                <div
                  className={`${s.tileClass} bg-slate-900 border border-slate-700/80 shadow-md flex items-center justify-center p-1 relative overflow-hidden group`}
                >
                  <LogoRenderer
                    candidate={candidate}
                    params={params}
                    size={s.size}
                  />
                </div>
                <span className="mt-1.5 text-[9px] font-mono text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Clinical Light Tiles */}
        <div>
          <div className="text-[11px] font-mono text-base-content/70 mb-2 flex items-center justify-between">
            <span>LIGHT TILES (#FFFFFF MEDICAL CLINICAL)</span>
            <span className="text-[10px] text-base-content/50">PROVES GOLD LUMINANCE</span>
          </div>
          <div className="flex items-end justify-around gap-2 p-3 bg-slate-200/90 rounded-xl border border-slate-300">
            {sizes.map((s) => (
              <div key={`light-${s.size}`} className="flex flex-col items-center">
                <div
                  className={`${s.tileClass} bg-white border border-slate-300 shadow-md flex items-center justify-center p-1 relative overflow-hidden`}
                >
                  <LogoRenderer
                    candidate={candidate}
                    params={params}
                    size={s.size}
                  />
                </div>
                <span className="mt-1.5 text-[9px] font-mono text-slate-600 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Browser Tab Micro-Sim */}
        <div className="bg-base-300/60 p-2.5 rounded-lg border border-base-300 flex items-center space-x-3">
          <div className="text-[10px] font-mono text-base-content/60 shrink-0">BROWSER TAB:</div>
          <div className="flex-1 flex items-center bg-base-100 px-3 py-1.5 rounded border border-base-300 max-w-sm space-x-2">
            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
              <LogoRenderer candidate={candidate} params={params} size={16} />
            </div>
            <span className="text-xs font-sans text-base-content truncate">
              Heavy Chain Studio | Architectural Vector Proof
            </span>
            <span className="text-base-content/50 text-xs ml-auto">✕</span>
          </div>
          <div className="text-[10px] font-mono text-success ml-auto font-semibold">
            Zero Silhouette Collapse
          </div>
        </div>
      </div>
    </div>
  );
};
