import React from 'react';
import { CandidateId, LogoParams } from '../../types';
import { LogoLockup } from '../logos/LogoLockup';
import { ArrowRight } from 'lucide-react';

interface ComparativeOverviewProps {
  candidate?: CandidateId;
  params: LogoParams;
  onSelectCandidate: (id: CandidateId) => void;
  isDark: boolean;
}

export const ComparativeOverview: React.FC<ComparativeOverviewProps> = ({
  candidate,
  params,
  onSelectCandidate,
  isDark,
}) => {
  const directions: {
    id: CandidateId;
    title: string;
    codename: string;
    metaphor: string;
    description: string;
  }[] = [
    {
      id: 'modular-prism',
      title: 'Candidate 1',
      codename: 'The Modular Hex Prism',
      metaphor: 'Isometric Tectonic Mass',
      description:
        'Three precision-ground isometric facets converging along an axonometric axis. Pure geometric mass, balanced negative space, and disciplined architectural baselines.',
    },
    {
      id: 'concentric-aperture',
      title: 'Candidate 2',
      codename: 'The Concentric Aperture',
      metaphor: 'Golden Ratio Iris Geometry',
      description:
        'Mathematical logarithmic arcs nested along golden-ratio radii. Rotational momentum with balanced negative-space void for extreme contrast at micro-scales.',
    },
    {
      id: 'interlocking-trefoil',
      title: 'Candidate 3',
      codename: 'The Interlocking Trefoil',
      metaphor: 'Continuous Knot Topology',
      description:
        'Three continuous geometric loops in dynamic equilibrium. High structural tension, balanced mathematical clearspace, and instant recognition across viewports.',
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="p-4 bg-base-200 text-base-content rounded-xl border border-base-300 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold font-sans flex items-center space-x-2 text-base-content">
              <span>Architectural Triptych: Phase 2 Contenders</span>
            </h2>
            <p className="text-xs font-mono text-base-content/70 mt-0.5">
              Side-by-side comparative inspection under identical optical conditions. Select any candidate to tune live parameters in the Renzo Atelier Deck.
            </p>
          </div>
          <span className="badge badge-primary badge-outline text-[10px] font-mono px-2 py-0.5 shrink-0 self-start sm:self-auto">
            3 Contenders
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {directions.map((d) => {
          const isSelected = candidate === d.id;
          return (
            <div
              key={d.id}
              onClick={() => onSelectCandidate(d.id)}
              className={`card bg-base-100 border border-base-300 shadow-md hover:border-primary hover:shadow-xl transition-all duration-300 p-6 text-base-content cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected ? 'ring-2 ring-primary border-primary' : ''
              }`}
            >
              {/* Top Indicator */}
              <div>
                <div className="flex flex-col gap-1.5 mb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge badge-primary badge-sm font-mono font-bold">
                      {d.title}
                    </span>
                    <span className="text-[10px] font-mono text-base-content/60 uppercase tracking-wider truncate">
                      {d.codename}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-base-content/70 italic">
                    {d.metaphor}
                  </div>
                </div>

                {/* Logo Presentation Showcase */}
                <div className="my-5 py-6 px-4 bg-base-200/80 rounded-xl border border-base-300 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <LogoLockup
                    candidate={d.id}
                    params={params}
                    size="md"
                    variant="stacked"
                    isDark={isDark}
                  />
                </div>

                <p className="text-xs text-base-content/80 font-sans leading-relaxed">
                  {d.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-6 pt-4 border-t border-base-300 flex items-center justify-between text-xs font-mono text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>{isSelected ? 'Currently Selected' : 'Inspect in Studio & Tune'}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
