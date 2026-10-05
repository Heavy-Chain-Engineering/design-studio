import React from 'react';
import { CandidateId, LogoParams } from '../../types';
import { LogoRenderer } from '../logos/LogoRenderer';

interface QuadrantMonochromeWatermarkProps {
  candidate: CandidateId;
  params: LogoParams;
}

export const QuadrantMonochromeWatermark: React.FC<QuadrantMonochromeWatermarkProps> = ({
  candidate,
  params,
}) => {
  return (
    <div className="flex flex-col h-full bg-base-200/40 rounded-xl border border-base-300 overflow-hidden shadow-xl">
      {/* Quadrant Header */}
      <div className="px-4 py-2.5 bg-base-300/80 border-b border-base-300 flex items-center justify-between text-base-content">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-base-content uppercase">
            Q4: 1-Bit Monochromatic Watermark & Engraving
          </h3>
        </div>
        <span className="text-[10px] font-mono text-base-content/60">FDA & PATENT FILING TEST</span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Split Contrast Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {/* Panel A: 1-Bit Pure Black on White */}
          <div className="bg-white rounded-lg p-4 border border-slate-300 flex flex-col items-center justify-between text-black shadow-sm">
            <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-600 border-b border-slate-200 pb-1 mb-2">
              <span>USPTO / FDA 510(k)</span>
              <span className="font-bold">1-BIT PURE BLACK</span>
            </div>

            <div className="flex-1 flex items-center justify-center py-2">
              <LogoRenderer
                candidate={candidate}
                params={params}
                size={110}
                monochrome="black"
              />
            </div>

            <div className="text-[9px] font-mono text-center text-slate-600 border-t border-slate-200 pt-1 w-full">
              Thermal / Xerox Copier Safe • 0% Grayscale
            </div>
          </div>

          {/* Panel B: 1-Bit Pure White on Black */}
          <div className="bg-black rounded-lg p-4 border border-slate-800 flex flex-col items-center justify-between text-white shadow-sm">
            <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-slate-800 pb-1 mb-2">
              <span>SILKSCREEN / REVERSE</span>
              <span className="font-bold">1-BIT PURE WHITE</span>
            </div>

            <div className="flex-1 flex items-center justify-center py-2">
              <LogoRenderer
                candidate={candidate}
                params={params}
                size={110}
                monochrome="white"
              />
            </div>

            <div className="text-[9px] font-mono text-center text-slate-400 border-t border-slate-800 pt-1 w-full">
              Carbon Stencil & Mold Casting Safe
            </div>
          </div>
        </div>

        {/* Thermal Barcode & Label Sim */}
        <div className="bg-base-300/60 p-2.5 rounded-lg border border-base-300 flex items-center justify-between text-[10px] font-mono text-base-content/70">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>Passes FDA 21 CFR Part 801 Labeling Legibility Standard</span>
          </div>
          <span className="text-base-content/50">Zero Halftone Distortion</span>
        </div>
      </div>
    </div>
  );
};
