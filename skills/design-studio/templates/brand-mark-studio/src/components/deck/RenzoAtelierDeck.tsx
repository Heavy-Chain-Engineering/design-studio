import React, { useEffect, useState, useRef } from 'react';
import { CandidateId, DeckPosition, LogoParams } from '../../types';
import {
  Sun,
  Moon,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  PanelRightClose,
  PanelRightOpen,
  Check,
  Link as LinkIcon,
} from 'lucide-react';

interface RenzoAtelierDeckProps {
  candidate: CandidateId;
  onSelectCandidate: (id: CandidateId) => void;
  params: LogoParams;
  onUpdateParams: (candidate: CandidateId, newParams: any) => void;
  onResetParams: (candidate: CandidateId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  position: DeckPosition;
  onPositionChange: (pos: DeckPosition) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const RenzoAtelierDeck: React.FC<RenzoAtelierDeckProps> = ({
  candidate,
  onSelectCandidate,
  params,
  onUpdateParams,
  onResetParams,
  isDark,
  onToggleTheme,
  position,
  onPositionChange,
  isOpen,
  onToggleOpen,
  isMinimized,
  onToggleMinimize,
}) => {
  const isDockedRight = position === 'docked-right';
  const deckRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Global Keyboard shortcut listener (` or Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '`' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd')
      ) {
        e.preventDefault();
        onToggleOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleOpen]);

  // Reset custom drag coordinates when switching position preset
  const handlePositionChange = (newPos: DeckPosition) => {
    setCoords(null);
    onPositionChange(newPos);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // Pointer drag tracking for floating mode
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDockedRight || e.button !== 0) return;

    // Do not initiate drag if user interacted with a control
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('.dropdown') ||
      target.closest('a')
    ) {
      return;
    }

    if (!deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: rect.left,
      startY: rect.top,
    };
    setIsDragging(true);

    const onPointerMove = (ev: PointerEvent) => {
      if (!dragStartRef.current || !deckRef.current) return;
      const dx = ev.clientX - dragStartRef.current.mouseX;
      const dy = ev.clientY - dragStartRef.current.mouseY;
      let newX = dragStartRef.current.startX + dx;
      let newY = dragStartRef.current.startY + dy;

      // Clamping within viewport boundaries
      const deckW = deckRef.current.offsetWidth || 384;
      const deckH = deckRef.current.offsetHeight || 500;
      const minX = 8;
      const maxX = Math.max(8, window.innerWidth - deckW - 8);
      const minY = 8;
      const maxY = Math.max(8, window.innerHeight - deckH - 8);

      newX = Math.min(Math.max(minX, newX), maxX);
      newY = Math.min(Math.max(minY, newY), maxY);

      setCoords({ x: newX, y: newY });
    };

    const onPointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-4 py-2.5 btn btn-primary rounded-full shadow-2xl font-mono text-xs border border-primary-content/20"
        title="Open Renzo Atelier Console (Press `)"
      >
        <img src="/heavy-chain-logo.svg" alt="Heavy Chain" className="w-4 h-4 object-contain shrink-0" />
        <Sparkles size={16} />
        <span>Renzo Atelier Deck</span>
        <span className="badge badge-sm bg-primary-content/20 text-primary-content border-none font-mono ml-1">
          `
        </span>
      </button>
    );
  }

  // Position classes (when not manually dragged)
  const defaultPositionClasses = {
    'docked-right': isMinimized
      ? 'fixed top-0 right-0 w-96 rounded-b-xl border-l border-b border-base-300 shadow-xl'
      : 'fixed top-0 right-0 w-96 h-screen rounded-none border-l border-t-0 border-r-0 border-b-0 border-base-300 shadow-2xl',
    'bottom-right': 'fixed bottom-4 right-4 w-96 max-h-[85vh] rounded-2xl border border-base-300 shadow-2xl',
    'top-right': 'fixed top-4 right-4 w-96 max-h-[85vh] rounded-2xl border border-base-300 shadow-2xl',
    'bottom-left': 'fixed bottom-4 left-4 w-96 max-h-[85vh] rounded-2xl border border-base-300 shadow-2xl',
    'top-left': 'fixed top-4 left-4 w-96 max-h-[85vh] rounded-2xl border border-base-300 shadow-2xl',
  }[position];

  const positionClass =
    !isDockedRight && coords !== null
      ? 'fixed w-96 max-h-[85vh] rounded-2xl border border-base-300 shadow-2xl'
      : defaultPositionClasses;

  return (
    <div
      ref={deckRef}
      style={
        !isDockedRight && coords !== null
          ? { left: `${coords.x}px`, top: `${coords.y}px`, right: 'auto', bottom: 'auto' }
          : undefined
      }
      className={`${positionClass} z-50 flex flex-col bg-base-200/95 backdrop-blur-md text-base-content overflow-hidden select-none ${
        isDragging || coords !== null ? 'transition-none' : 'transition-all duration-300'
      }`}
    >
      {/* Deck Header (Draggable Handle in floating mode) */}
      <div
        onPointerDown={!isDockedRight ? handlePointerDown : undefined}
        className={`px-4 py-3 bg-base-300/80 border-b border-base-300 flex items-center justify-between shrink-0 select-none ${
          !isDockedRight ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        title={!isDockedRight ? 'Click and drag to reposition deck' : undefined}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          {!isDockedRight && (
            <span
              className="text-base-content/40 hover:text-base-content/75 text-xs font-mono select-none tracking-tighter"
              aria-hidden="true"
            >
              ⋮⋮
            </span>
          )}
          <img src="/heavy-chain-logo.svg" alt="Heavy Chain" className="w-4 h-4 object-contain shrink-0" />
          <span className="text-base-content font-bold font-mono text-xs tracking-wider uppercase whitespace-nowrap">
            Renzo Atelier
          </span>
          <span className="badge badge-ghost badge-xs text-[9px] font-mono font-semibold px-1">
            {isDockedRight ? 'Docked' : 'Floating'}
          </span>
        </div>

        {/* Header Tools: Exactly 3 essential icon buttons */}
        <div className="flex items-center gap-1.5 text-base-content">
          {/* 1) Dock / Undock Sidebar Toggle */}
          <button
            type="button"
            onClick={() => handlePositionChange(isDockedRight ? 'bottom-right' : 'docked-right')}
            title={
              isDockedRight
                ? 'Float window (detach from sidebar)'
                : 'Dock to right sidebar and push page content left'
            }
            className={`p-1.5 rounded-lg transition-colors text-xs flex items-center justify-center ${
              isDockedRight
                ? 'bg-primary text-primary-content font-bold'
                : 'bg-base-content/10 hover:bg-base-content/20 text-base-content'
            }`}
            aria-label={isDockedRight ? 'Float window' : 'Dock to sidebar'}
          >
            {isDockedRight ? <PanelRightClose size={14} /> : <PanelRightOpen size={14} />}
          </button>

          {/* 2) High-Contrast Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-1.5 rounded-lg bg-base-content/10 hover:bg-base-content/20 text-base-content transition-colors text-xs flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={14} className="text-amber-400" />
            ) : (
              <Moon size={14} className="text-slate-700" />
            )}
          </button>

          {/* 3) Minimize / Maximize */}
          <button
            type="button"
            onClick={onToggleMinimize}
            title={isMinimized ? 'Expand Deck (` key)' : 'Minimize Deck (` key)'}
            className="p-1.5 rounded-lg bg-base-content/10 hover:bg-base-content/20 text-base-content transition-colors text-xs flex items-center justify-center"
            aria-label={isMinimized ? 'Expand Deck' : 'Minimize Deck'}
          >
            {isMinimized ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-base-content">
          {/* Candidate Switcher */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-base-content/70 block mb-2 font-semibold">
              Select Architectural Direction
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => onSelectCandidate('modular-prism')}
                className={`px-3 py-2 text-left rounded-xl text-xs font-mono transition-all flex items-center justify-between border ${
                  candidate === 'modular-prism'
                    ? 'bg-base-100 border-primary text-base-content font-bold ring-2 ring-primary/20 shadow-xs'
                    : 'bg-base-100/50 border-base-300 text-base-content/80 hover:bg-base-100 hover:text-base-content'
                }`}
              >
                <span>1. Modular Hex Prism</span>
                <span
                  className={
                    candidate === 'modular-prism'
                      ? 'badge badge-primary badge-xs font-mono font-semibold'
                      : 'badge badge-ghost badge-xs font-mono font-semibold text-base-content/80'
                  }
                >
                  Isometric Mass
                </span>
              </button>

              <button
                onClick={() => onSelectCandidate('concentric-aperture')}
                className={`px-3 py-2 text-left rounded-xl text-xs font-mono transition-all flex items-center justify-between border ${
                  candidate === 'concentric-aperture'
                    ? 'bg-base-100 border-primary text-base-content font-bold ring-2 ring-primary/20 shadow-xs'
                    : 'bg-base-100/50 border-base-300 text-base-content/80 hover:bg-base-100 hover:text-base-content'
                }`}
              >
                <span>2. Concentric Aperture</span>
                <span
                  className={
                    candidate === 'concentric-aperture'
                      ? 'badge badge-primary badge-xs font-mono font-semibold'
                      : 'badge badge-ghost badge-xs font-mono font-semibold text-base-content/80'
                  }
                >
                  Golden Ratio
                </span>
              </button>

              <button
                onClick={() => onSelectCandidate('interlocking-trefoil')}
                className={`px-3 py-2 text-left rounded-xl text-xs font-mono transition-all flex items-center justify-between border ${
                  candidate === 'interlocking-trefoil'
                    ? 'bg-base-100 border-primary text-base-content font-bold ring-2 ring-primary/20 shadow-xs'
                    : 'bg-base-100/50 border-base-300 text-base-content/80 hover:bg-base-100 hover:text-base-content'
                }`}
              >
                <span>3. Interlocking Trefoil</span>
                <span
                  className={
                    candidate === 'interlocking-trefoil'
                      ? 'badge badge-primary badge-xs font-mono font-semibold'
                      : 'badge badge-ghost badge-xs font-mono font-semibold text-base-content/80'
                  }
                >
                  Topological Knot
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Parameter Tuning Controls for Active Candidate */}
          <div className="border-t border-base-300 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-primary uppercase">
                <Sliders size={13} />
                <span>Live SVG Geometry Tuning</span>
              </div>
              <button
                onClick={() => onResetParams(candidate)}
                className="btn btn-ghost btn-xs text-base-content/60 hover:text-base-content flex items-center space-x-1"
                title="Reset parameters to Renzo default specs"
              >
                <RotateCcw size={10} />
                <span>Reset</span>
              </button>
            </div>

            {/* Candidate 1 Controls: Modular Hex Prism */}
            {candidate === 'modular-prism' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Prism Height</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['modular-prism'].prismHeight}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={params['modular-prism'].prismHeight}
                    onChange={(e) =>
                      onUpdateParams('modular-prism', { prismHeight: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Facet Gap</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['modular-prism'].facetGap}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={params['modular-prism'].facetGap}
                    onChange={(e) =>
                      onUpdateParams('modular-prism', { facetGap: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Bevel Center Depth</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['modular-prism'].bevelDepth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    value={params['modular-prism'].bevelDepth}
                    onChange={(e) =>
                      onUpdateParams('modular-prism', { bevelDepth: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Gold Warmth / Temperature</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['modular-prism'].goldWarmth}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params['modular-prism'].goldWarmth}
                    onChange={(e) =>
                      onUpdateParams('modular-prism', { goldWarmth: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>
              </div>
            )}

            {/* Candidate 2 Controls: Concentric Aperture */}
            {candidate === 'concentric-aperture' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Aperture Void Radius</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['concentric-aperture'].apertureRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={params['concentric-aperture'].apertureRadius}
                    onChange={(e) =>
                      onUpdateParams('concentric-aperture', { apertureRadius: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Blade Iris Rotation</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['concentric-aperture'].bladeRotation}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={params['concentric-aperture'].bladeRotation}
                    onChange={(e) =>
                      onUpdateParams('concentric-aperture', { bladeRotation: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Blade Curvature Tension</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['concentric-aperture'].bladeTension}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={params['concentric-aperture'].bladeTension}
                    onChange={(e) =>
                      onUpdateParams('concentric-aperture', { bladeTension: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Gold Warmth</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['concentric-aperture'].goldWarmth}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params['concentric-aperture'].goldWarmth}
                    onChange={(e) =>
                      onUpdateParams('concentric-aperture', { goldWarmth: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>
              </div>
            )}

            {/* Candidate 3 Controls: Interlocking Trefoil */}
            {candidate === 'interlocking-trefoil' && (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Trefoil Loop Span</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['interlocking-trefoil'].loopSpan}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="120"
                    value={params['interlocking-trefoil'].loopSpan}
                    onChange={(e) =>
                      onUpdateParams('interlocking-trefoil', { loopSpan: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Strand Tube Thickness</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['interlocking-trefoil'].strandThickness}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={params['interlocking-trefoil'].strandThickness}
                    onChange={(e) =>
                      onUpdateParams('interlocking-trefoil', { strandThickness: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Loop Dynamic Tension</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['interlocking-trefoil'].loopTension}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.4"
                    step="0.05"
                    value={params['interlocking-trefoil'].loopTension}
                    onChange={(e) =>
                      onUpdateParams('interlocking-trefoil', { loopTension: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-base-content/80 mb-2">
                    <span>Gold Warmth</span>
                    <span className="badge badge-secondary badge-sm rounded font-mono font-bold tabular-nums min-w-[2.75rem] justify-center shadow-2xs">
                      {params['interlocking-trefoil'].goldWarmth}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params['interlocking-trefoil'].goldWarmth}
                    onChange={(e) =>
                      onUpdateParams('interlocking-trefoil', { goldWarmth: Number(e.target.value) })
                    }
                    className="range range-primary range-xs w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Hotkey info footer */}
          <div className="pt-2 border-t border-base-300 flex items-center justify-between text-[10px] font-mono text-base-content/50">
            <span>Toggle Deck:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-base-300 border border-base-content/20 text-base-content font-mono">
              ` (Backtick)
            </kbd>
          </div>
        </div>

        {/* Dedicated Sleek Footer Bar: Quick Docking & Link Sharing */}
        <div className="px-4 py-2.5 bg-base-300/60 border-t border-base-300 flex items-center justify-between text-[10px] font-mono text-base-content/70 shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-base-content/60 mr-0.5">Dock:</span>
            {(['TL', 'TR', 'BL', 'BR'] as const).map((posKey) => {
              const mapPos: Record<string, DeckPosition> = {
                TL: 'top-left',
                TR: 'top-right',
                BL: 'bottom-left',
                BR: 'bottom-right',
              };
              const targetPos = mapPos[posKey];
              const isCurrent = position === targetPos;
              return (
                <button
                  key={posKey}
                  type="button"
                  onClick={() => handlePositionChange(targetPos)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    isCurrent
                      ? 'bg-primary text-primary-content font-bold'
                      : 'bg-base-content/10 hover:bg-base-content/20 text-base-content'
                  }`}
                  title={`Dock to ${targetPos}`}
                >
                  {posKey}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handlePositionChange('docked-right')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                position === 'docked-right'
                  ? 'bg-primary text-primary-content font-bold'
                  : 'bg-base-content/10 hover:bg-base-content/20 text-base-content'
              }`}
              title="Dock flush to right sidebar and push content left"
            >
              Dock Right
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-base-content/10 hover:bg-base-content/20 text-base-content font-medium transition-colors"
            title="Copy current review URL with active parameters"
          >
            {copied ? (
              <>
                <Check size={11} className="text-primary" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon size={11} />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>
      </>
    )}

    {/* Collapsed Hint Bar */}
    {isMinimized && (
      <button
        type="button"
        onClick={onToggleMinimize}
        className="w-full px-4 py-2.5 text-[10px] font-mono text-base-content/70 flex items-center justify-between cursor-pointer hover:bg-base-content/5 text-left transition-colors"
      >
        <span>
          Active:{' '}
          <span className="font-semibold text-base-content">
            {candidate === 'modular-prism'
              ? '1. Modular Hex Prism'
              : candidate === 'concentric-aperture'
              ? '2. Concentric Aperture'
              : '3. Interlocking Trefoil'}
          </span>
        </span>
        <span className="text-primary font-medium">Press ` to expand</span>
      </button>
    )}
    </div>
  );
};

