import React, { useState, useEffect } from 'react';
import { CandidateId, DeckPosition, LogoParams } from './types';
import { MasterDraftingTable } from './components/bench/MasterDraftingTable';
import { TestingBench } from './components/bench/TestingBench';
import { ComparativeOverview } from './components/bench/ComparativeOverview';
import { RenzoAtelierDeck } from './components/deck/RenzoAtelierDeck';
import { Compass, LayoutGrid, Eye, ShieldCheck } from 'lucide-react';

const DEFAULT_PARAMS: LogoParams = {
  'modular-prism': {
    facetGap: 4,
    prismHeight: 90,
    bevelDepth: 6,
    goldWarmth: 55,
  },
  'concentric-aperture': {
    apertureRadius: 28,
    bladeRotation: 15,
    bladeTension: 1.0,
    goldWarmth: 55,
  },
  'interlocking-trefoil': {
    loopSpan: 88,
    strandThickness: 22,
    loopTension: 1.05,
    goldWarmth: 55,
  },
};

export const App: React.FC = () => {
  // Read initial candidate & view from URL query params
  const [candidate, setCandidate] = useState<CandidateId>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const c = searchParams.get('candidate');
    if (c === 'concentric-aperture' || c === 'aperture') return 'concentric-aperture';
    if (c === 'interlocking-trefoil' || c === 'trefoil') return 'interlocking-trefoil';
    return 'modular-prism';
  });

  const [activeTab, setActiveTab] = useState<'drafting' | 'bench' | 'triptych'>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const v = searchParams.get('view');
    if (v === 'bench' || v === 'triptych' || v === 'drafting') {
      return v;
    }
    return 'drafting';
  });

  // Docking position state: 'docked-right' (content-pushing) vs floating corners
  const [deckPosition, setDeckPosition] = useState<DeckPosition>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pos = searchParams.get('deckPos');
    if (
      pos === 'docked-right' ||
      pos === 'bottom-right' ||
      pos === 'top-right' ||
      pos === 'bottom-left' ||
      pos === 'top-left'
    ) {
      return pos;
    }
    return 'bottom-right';
  });

  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(true);
  const [isDeckMinimized, setIsDeckMinimized] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get('theme');
    if (t === 'light' || t === 'hc-light') return false;
    if (t === 'dark' || t === 'hc-dark') return true;
    return false; // Default to light mode for initial high-contrast verification
  });
  const [params, setParams] = useState<LogoParams>(DEFAULT_PARAMS);

  // Sync dark class and data-theme on root document for DaisyUI
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'hc-dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'hc-light');
    }
  }, [isDark]);

  // Sync URL query params
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('candidate', candidate);
    url.searchParams.set('view', activeTab);
    url.searchParams.set('deckPos', deckPosition);
    url.searchParams.set('theme', isDark ? 'hc-dark' : 'hc-light');
    window.history.replaceState({}, '', url.toString());
  }, [candidate, activeTab, deckPosition, isDark]);

  const handleUpdateParams = (candidateId: CandidateId, newValues: any) => {
    setParams((prev) => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        ...newValues,
      },
    }));
  };

  const handleResetParams = (candidateId: CandidateId) => {
    setParams((prev) => ({
      ...prev,
      [candidateId]: { ...DEFAULT_PARAMS[candidateId] },
    }));
  };

  // Rule 11: When docked-right is active, open, and not minimized,
  // apply 384px (w-96) right margin to push page content smoothly left
  const isContentPushed = deckPosition === 'docked-right' && isDeckOpen && !isDeckMinimized;

  return (
    <div className="min-h-screen transition-colors duration-200 bg-base-100 text-base-content">
      {/* 
        Rule 11 Dual-Docking Content Container:
        When docked-right is active, this wrapper transitions its marginRight to 384px (24rem / w-96),
        smoothly contracting and pushing the entire page layout to the left so no design element is occluded.
      */}
      <div
        className="transition-[margin] duration-300 ease-in-out min-h-screen flex flex-col"
        style={{
          marginRight: isContentPushed ? '384px' : '0px',
        }}
      >
        {/* Studio Top Navigation Bar */}
        <header className="sticky top-0 z-40 px-6 py-3.5 border-b border-base-300 bg-base-100/90 backdrop-blur-md transition-colors text-base-content shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Brand Identity / Atelier Header */}
            <div className="flex items-center space-x-3">
              <img src="/heavy-chain-logo.svg" alt="Heavy Chain" className="w-9 h-9 object-contain" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-sans font-extrabold tracking-wider text-base text-primary">
                    RENZO ATELIER
                  </span>
                  <span className="badge badge-outline badge-primary font-mono text-[10px] font-semibold">
                    HEAVY CHAIN DESIGN STUDIO
                  </span>
                </div>
                <div className="text-[11px] font-mono text-base-content/60 flex items-center space-x-2">
                  <span>Brand Mark Proofing Chassis</span>
                  <span>•</span>
                  <span className="text-primary font-medium">Phase 2: Architectural Mark Iteration</span>
                </div>
              </div>
            </div>

            {/* View Mode Navigation Tabs */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-base-200 border border-base-300">
              <button
                onClick={() => setActiveTab('drafting')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeTab === 'drafting'
                    ? 'bg-primary text-primary-content font-bold shadow-md'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/50'
                }`}
              >
                <Compass size={14} />
                <span>Master Drafting Table</span>
              </button>

              <button
                onClick={() => setActiveTab('bench')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeTab === 'bench'
                    ? 'bg-primary text-primary-content font-bold shadow-md'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/50'
                }`}
              >
                <LayoutGrid size={14} />
                <span>4-Quadrant In-Situ Bench</span>
              </button>

              <button
                onClick={() => setActiveTab('triptych')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeTab === 'triptych'
                    ? 'bg-primary text-primary-content font-bold shadow-md'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/50'
                }`}
              >
                <Eye size={14} />
                <span>Comparative Triptych</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          {activeTab === 'drafting' && (
            <MasterDraftingTable
              candidate={candidate}
              params={params}
              isDark={isDark}
            />
          )}

          {activeTab === 'bench' && (
            <TestingBench
              candidate={candidate}
              params={params}
            />
          )}

          {activeTab === 'triptych' && (
            <ComparativeOverview
              candidate={candidate}
              params={params}
              onSelectCandidate={(id) => {
                setCandidate(id);
                setActiveTab('drafting');
              }}
              isDark={isDark}
            />
          )}
        </main>

        {/* Studio Footer */}
        <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-base-300 text-center text-xs font-mono text-base-content/60 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={14} className="text-primary" />
            <span>HEAVY CHAIN DESIGN STUDIO • ARCHITECTURAL IDENTITY SYSTEM</span>
          </div>
          <div>
            <span>Engineered under Master Architect Renzo • Heavy Chain</span>
          </div>
          <div className="text-[11px] text-base-content/50">
            Press <kbd className="px-1.5 py-0.5 rounded bg-base-200 border border-base-300 text-base-content font-mono">`</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-base-200 border border-base-300 text-base-content font-mono">Ctrl+Shift+D</kbd> for Deck
          </div>
        </footer>
      </div>

      {/* Floating / Content-Pushing Renzo Atelier Deck Console */}
      <RenzoAtelierDeck
        candidate={candidate}
        onSelectCandidate={setCandidate}
        params={params}
        onUpdateParams={handleUpdateParams}
        onResetParams={handleResetParams}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        position={deckPosition}
        onPositionChange={setDeckPosition}
        isOpen={isDeckOpen}
        onToggleOpen={() => setIsDeckOpen(!isDeckOpen)}
        isMinimized={isDeckMinimized}
        onToggleMinimize={() => setIsDeckMinimized(!isDeckMinimized)}
      />
    </div>
  );
};
