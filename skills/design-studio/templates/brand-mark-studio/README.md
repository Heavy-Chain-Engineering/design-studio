# Heavy Chain Brand Mark & Identity Design Studio Chassis

Production-verified interactive studio chassis for vector logo marks, brand identity systems, and graphic emblems. Engineered under Master Architect Renzo for the Heavy Chain Design Studio.

---

## ⚡ 1-Command Instantiation

### Scenario A: Standalone Greenfield Studio
To spin up a new standalone design studio project in one command:

```bash
# From within the installed skill directory:
cp -R templates/brand-mark-studio my-new-studio && cd my-new-studio && npm install && npm run dev
```

### Scenario B: Existing Host Codebase (Mandatory `.studio/` Isolation)
When operating inside an existing project with its own `package.json`, `Cargo.toml`, or source tree, Renzo asks upfront for consent and scaffolds into `.studio/` to avoid dependency/lockfile collisions:

```bash
# From within the installed skill directory:
cp -R templates/brand-mark-studio .studio && cd .studio && npm install && npm run dev
```

The studio will be immediately live with full hot-reloading at `http://localhost:7328` (or the next available port). When the design is locked, Renzo asks where you want the final assets exported (e.g. `public/`, `src/assets/`, or a custom path).

---

## 🏛️ Studio Architecture & Surfaces

This chassis provides 1,500+ lines of production-verified TypeScript/React and DaisyUI code across three core proofing surfaces:

### 1. Master Drafting Table (`MasterDraftingTable.tsx`)
- **Mathematical Blueprint Grid**: Subline (20px) and major line (100px) blueprint mesh with dark/light mode parity.
- **Precision Construction Overlays**:
  - **Center Crosshairs**: Heavy Chain Primary (`rgba(30, 58, 138, 0.45)` in light, `rgba(99, 179, 237, 0.5)` in dark).
  - **Golden Ratio Circles ($\phi = 1.618$)**: Warm Amber (`rgba(214, 141, 22, 0.5)` in light, `rgba(227, 165, 46, 0.5)` in dark).
  - **Angle Vector Rays (30°, 45°, 60°, 75°)**: Structural Ledger Slate (`rgba(15, 23, 42, 0.3)` in light, `rgba(247, 250, 252, 0.3)` in dark).
  - **Clearspace Boundaries (1X Margin)**: Accent Amber Ink (`rgba(122, 76, 5, 0.4)` in light, `rgba(240, 188, 85, 0.4)` in dark).
  - **Monospace Technical Coordinate Overlays**: Origin `(0,0)`, vector units, optical centroid, and standard markings.
- **Live Lockup Switching**: Switch between Horizontal, Stacked, and Mark-Only lockups.
- **1-Click Vector Export**: Copy clean sanitized SVG code directly to clipboard or trigger native `.svg` asset downloads.

### 2. Four-Quadrant In-Situ Testing Bench (`TestingBench.tsx`)
- **Quadrant 1: Institutional Application Header (`QuadrantAppHeader.tsx`)**  
  Proves brand hierarchy inside real software navigation bars, enterprise status chips, and breadcrumbs.
- **Quadrant 2: Scalability Matrix (`QuadrantScalabilityMatrix.tsx`)**  
  Tests legibility, optical weight, and detail retention across 8 physical scales: `12px` (micro favicon), `16px`, `24px` (nav/tab), `32px`, `48px`, `64px`, `128px`, and `256px` (hero/billboard).
- **Quadrant 3: Physical Emplacement (`QuadrantPhysicalEmplacement.tsx`)**  
  Simulates physical manufacturing reality:
  - **Archival Cotton Bond Paper**: Debossed letterpress with gold foil leaf embossing.
  - **Industrial Brushed Stainless Steel**: Laser-etched metallic plinth with ambient lighting relief.
- **Quadrant 4: Monochrome & Watermark Invertibility (`QuadrantMonochromeWatermark.tsx`)**  
  Asserts contrast and silhouette clarity on high-contrast white and dark obsidian plates, plus semi-transparent watermark backgrounds.

### 3. Comparative Triptych (`ComparativeOverview.tsx`)
Side-by-side comparative contact sheet presenting 3 polarized architectural directions with explicit rationale, structural pillars, and instant candidate selection.

### 4. Renzo Atelier Deck (`RenzoAtelierDeck.tsx`)
- **Draggable & Multi-Dockable HUD Console**:
  - `docked-right`: Clean, content-pushing sidebar.
  - `bottom-right`, `bottom-left`, `top-right`, `top-left`: Draggable floating glassmorphism widget.
- **DaisyUI Semantic Palette Tokens**: Full WCAG AA contrast parity in `hc-light` and `hc-dark` themes.
- **Live Parametric Geometry Tuning**: Real-time slider controls bound to active SVG geometry parameters.
- **Global Keybinding**: Press backtick (`` ` ``) or `Ctrl+Shift+D` to toggle deck visibility.

---

## 🎨 How to Customize for a New Project

To adapt this chassis to a new brand mark:

1. **Define Candidate IDs & Parameters (`src/types.ts`)**:
   ```typescript
   export type CandidateId = 'direction-1' | 'direction-2' | 'direction-3';

   export interface LogoParams {
     'direction-1': { ... };
     'direction-2': { ... };
     'direction-3': { ... };
   }
   ```

2. **Drop Mark SVG Components into `src/components/logos/`**:
   - Implement your mark components accepting parametric props.
   - Wire them into `LogoRenderer.tsx` and `LogoLockup.tsx`.

3. **Update Rationale in `MasterDraftingTable.tsx` & `ComparativeOverview.tsx`**:
   - Update `candidateMeta` titles, subtitles, and structural flank descriptions.

4. **Verify Build**:
   ```bash
   npm run build
   ```
