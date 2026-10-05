import React from 'react';
import { CandidateId, LogoParams } from '../../types';
import { QuadrantAppHeader } from './QuadrantAppHeader';
import { QuadrantScalabilityMatrix } from './QuadrantScalabilityMatrix';
import { QuadrantPhysicalEmplacement } from './QuadrantPhysicalEmplacement';
import { QuadrantMonochromeWatermark } from './QuadrantMonochromeWatermark';

interface TestingBenchProps {
  candidate: CandidateId;
  params: LogoParams;
}

export const TestingBench: React.FC<TestingBenchProps> = ({ candidate, params }) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Bench Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-base-200/80 rounded-xl border border-base-300 text-base-content">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h2 className="text-lg font-bold font-display text-base-content">
              4-Quadrant In-Situ Testing Bench
            </h2>
          </div>
          <p className="text-xs font-mono text-base-content/70 mt-0.5">
            Rigorous logo stress testing across real software, micro-favicons, physical certificates, and 1-bit legal filings.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-base-content/70">
          <span className="px-2 py-1 rounded bg-base-300 border border-base-300 text-base-content/80">
            Pass Threshold: 100% Legibility
          </span>
        </div>
      </div>

      {/* 2x2 Grid of In-Situ Proofs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Quadrant 1: Live In-Situ Application Header */}
        <div className="h-full">
          <QuadrantAppHeader candidate={candidate} params={params} />
        </div>

        {/* Quadrant 2: App Icon & Favicon Scalability Matrix */}
        <div className="h-full">
          <QuadrantScalabilityMatrix candidate={candidate} params={params} />
        </div>

        {/* Quadrant 3: Physical Emplacement & Defensible Certification */}
        <div className="h-full">
          <QuadrantPhysicalEmplacement candidate={candidate} params={params} />
        </div>

        {/* Quadrant 4: Monochromatic Watermark & Engraving */}
        <div className="h-full">
          <QuadrantMonochromeWatermark candidate={candidate} params={params} />
        </div>
      </div>
    </div>
  );
};
