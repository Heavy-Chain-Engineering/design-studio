import React, { useState } from 'react';
import { CandidateId, LogoParams } from '../../types';
import { LogoRenderer } from '../logos/LogoRenderer';

interface QuadrantPhysicalEmplacementProps {
  candidate: CandidateId;
  params: LogoParams;
}

export const QuadrantPhysicalEmplacement: React.FC<QuadrantPhysicalEmplacementProps> = ({
  candidate,
  params,
}) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'titanium'>('certificate');

  return (
    <div className="flex flex-col h-full bg-base-200/40 rounded-xl border border-base-300 overflow-hidden shadow-xl">
      {/* Quadrant Header */}
      <div className="px-4 py-2.5 bg-base-300/80 border-b border-base-300 flex items-center justify-between text-base-content">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-base-content uppercase">
            Q3: Physical Emplacement & Defensible Certification
          </h3>
        </div>

        {/* Tab switch between Cotton Certificate and Titanium Hardware Plate */}
        <div className="flex items-center space-x-1 bg-base-300/60 p-0.5 rounded-lg border border-base-300">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
              activeTab === 'certificate'
                ? 'bg-primary text-primary-content font-semibold'
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
            Bond Certificate
          </button>
          <button
            onClick={() => setActiveTab('titanium')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all ${
              activeTab === 'titanium'
                ? 'bg-primary text-primary-content font-semibold'
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
            Surgical Titanium
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-center bg-base-300/30">
        {activeTab === 'certificate' ? (
          /* =============================================================== */
          /* 1. HEAVY COTTON BOND CERTIFICATE WITH GOLD FOIL EMBOSSING       */
          /* =============================================================== */
          <div className="cotton-bond-texture rounded-lg border-2 border-[#D9CEBF] p-6 text-slate-800 relative overflow-hidden transition-all">
            {/* Guilloche Security Border */}
            <div className="absolute inset-1.5 border border-[#C5B59E] pointer-events-none rounded" />
            <div className="absolute inset-2.5 border border-[#E0D5C3] pointer-events-none rounded" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Header Text */}
              <div className="text-[9px] font-mono tracking-[0.25em] text-[#8C7654] uppercase font-bold">
                HEAVY CHAIN DESIGN STUDIO • ATELIER REGISTRY
              </div>
              <h4 className="font-display text-lg font-bold text-[#2A241C] tracking-wide mt-1">
                RATIFIED SPECIFICATION & PROOF
              </h4>
              <div className="text-[10px] font-sans text-[#6B5A42] italic">
                Master Architectural Blueprint • Verification of Structural Gravitas
              </div>

              {/* The Gold Foil Embossed Logo Mark */}
              <div className="my-4 relative group flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 bg-gradient-to-br from-[#FFF9E6] to-[#F0DFC0] shadow-inner flex items-center justify-center p-2 relative">
                  <div className="absolute inset-0 rounded-full border border-amber-600/20" />
                  {/* Subtle foil shimmering effect */}
                  <div className="gold-foil-emboss transition-transform group-hover:scale-105 duration-300">
                    <LogoRenderer candidate={candidate} params={params} size={70} />
                  </div>
                </div>
                <span className="mt-1 text-[8px] font-mono tracking-widest text-[#94763F] uppercase font-bold">
                  ★ ARCHITECTURAL SEAL OF INTEGRITY ★
                </span>
              </div>

              {/* Body Text */}
              <div className="text-[10px] font-serif text-[#3D352A] max-w-sm leading-relaxed border-t border-[#D9CEBF] pt-2">
                This document certifies that the vector geometry, baseline alignment, and optical balance have been verified under master-craftsman standards.
              </div>

              {/* Signatures & Reference */}
              <div className="w-full flex items-end justify-between mt-4 pt-2 border-t border-[#E8DFD3] text-[9px] font-mono text-[#73634E]">
                <div className="text-left">
                  <span className="block text-[8px] text-[#A6947D]">ATELIER REGISTRY ID</span>
                  <span className="font-bold text-[#3B3020]">HC-ATELIER-01</span>
                </div>
                <div className="text-center italic font-serif text-[#8C4A27] text-xs">
                  Renzo Piano Atelier Workshop
                </div>
                <div className="text-right">
                  <span className="block text-[8px] text-[#A6947D]">DATE OF RATIFICATION</span>
                  <span className="font-bold text-[#3B3020]">05 OCT 2026</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =============================================================== */
          /* 2. SURGICAL STAINLESS STEEL / TITANIUM NAMEPLATE                */
          /* =============================================================== */
          <div className="brushed-steel rounded-lg border border-slate-600 p-6 text-slate-200 relative overflow-hidden transition-all shadow-2xl">
            {/* Hex Machine Screws in 4 corners */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-800 rotate-45" />
            </div>
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-800 -rotate-12" />
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-800 rotate-90" />
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-700 shadow-inner flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-800 -rotate-45" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-6 px-3">
              {/* Laser-Annealed Logo Mark */}
              <div className="flex flex-col items-center">
                <div className="p-3 bg-black/40 rounded-lg border border-white/10 shadow-inner">
                  {/* Etched mark rendered in high-contrast laser monochrome */}
                  <LogoRenderer
                    candidate={candidate}
                    params={params}
                    size={80}
                    monochrome="white"
                  />
                </div>
                <span className="mt-1 text-[8px] font-mono tracking-wider text-slate-400">
                  LASER ETCH DEPTH: 0.05mm
                </span>
              </div>

              {/* Hardware Specification Engraving */}
              <div className="flex-1 font-mono text-[10px] space-y-1.5 border-l border-slate-500/40 pl-5">
                <div className="text-xs font-bold text-slate-100 tracking-wider">
                  HEAVY CHAIN HARDWARE PLINTH
                </div>
                <div className="text-slate-400">
                  CHASSIS: <span className="text-white">TECTONIC-CORE-V2</span>
                </div>
                <div className="text-slate-400">
                  SERIAL: <span className="text-white">HC-8849-01-A</span>
                </div>
                <div className="text-slate-400">
                  STANDARDS: <span className="text-white">ISO 128 • MIL-STD-130</span>
                </div>
                <div className="text-slate-400">
                  ALLOY: <span className="text-amber-400 font-semibold">316L STAINLESS STEEL</span>
                </div>

                {/* Simulated UDI 2D Barcode */}
                <div className="pt-2 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white p-0.5 rounded flex flex-wrap gap-0.5">
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-transparent" />
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-transparent" />
                    <div className="w-1.5 h-1.5 bg-black" />
                    <div className="w-1.5 h-1.5 bg-black" />
                  </div>
                  <div className="text-[8px] text-slate-400">
                    <div>CE 0123</div>
                    <div>FDA REG: 30048123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-[11px] text-slate-500 font-mono text-center">
          Proves tactile institutional dignity in physical certification bonds and surgical metal etching.
        </p>
      </div>
    </div>
  );
};
