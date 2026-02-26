**PRD: Hero Section — Four-Product Illustration Grid**

*Altics Monitoring Website Rebuild  ·  February 2026*

| Feature ID | Page | Priority | Status |
| :---- | :---- | :---- | :---- |
| ALT-001 | / (Home) | P0 | Draft — Feb 2026 |

| Complexity | Primary Model | Thinking Level |
| :---- | :---- | :---- |
| High | Gemini 3.1 Pro (Antigravity) | HIGH |

# **1\. OVERVIEW**

This PRD defines the implementation of the Home page Hero section for the Altics Monitoring website. The hero comprises two equal halves: a left column of headline copy and CTAs, and a right column containing a 2×2 grid of four SVG illustrations — one per product line (RFTM, Nova Context, PIDS, IoT Monitoring). Each illustration is a geometric, abstract technical drawing in the "Signal Cream" design language, animated with a single meaningful motion that communicates the core concept of that product. The overall goal is to establish emotional authority in under three seconds: a company that watches, with precision, what others miss.

# **2\. DESIGN BRIEF**

## **2.1  Visual Description**

The hero section sits at full viewport height on desktop. The page background is **\--color-bg (\#F7F3EC)** — warm cream throughout. No card containers, no dark panels; both columns integrate directly with the canvas.

Left column (50% width): eyebrow label in Syne 600 12px uppercase with em-dash prefix, followed by the hero headline in Syne 800 at 72–80px, line-height 1.05, letter-spacing –0.02em. The word "Zero" on the second line is rendered in **\--color-accent-orange (\#E8622A)**. Two CTA buttons sit below a 16px Instrument Sans subheading. Primary button is solid orange; secondary is transparent with a warm border.

Right column (50% width): four cells in a strict 2×2 grid, separated only by hairline borders in **\--color-border (rgba(26,22,18,0.08))**. Each cell is square (1:1 aspect ratio). Each contains one SVG illustration. No card backgrounds, no shadows — the illustrations sit directly on cream. A product label (Syne 600, 10px, uppercase, tertiary text colour) is positioned at the bottom-centre of each cell.

## **2.2  The Four Illustrations**

### **RFTM (top-left) — OTDR Waveform**

A horizontal signal trace draws from left to right across the cell. The baseline is flat at mid-height, with amplitude reference grid lines at three levels. At the midpoint, a fault spike — a sharp upward deviation in orange — appears after the trace reaches that position. A monospaced "FAULT" label in a minimal orange pill blinks in at the spike peak. The trace then continues flatly to the right edge. The full sequence resets and repeats on a 2-second loop.

Animation: *stroke-dashoffset draw (600 → 0\) over 2s, cubic-bezier(0.4,0,0.2,1). Spike opacity 0→1 at 45% of loop, holds to 80%, fades. FAULT label syncs to spike.*

### **Nova Context (top-right) — Topology Radar**

A circular boundary contains a sparse network topology graph: one central node, three outer nodes, two mid-layer nodes, connected by five edges. A radar sweep — an orange-tinted wedge with a leading-edge line — rotates continuously clockwise at 8 seconds per revolution, clipped to the circular boundary. Nodes draw in sequentially on page load (opacity 0→1, scale 0.5→1, 80ms stagger). Edges draw in via stroke-dashoffset after nodes appear.

Animation: *Sweep: transform rotate(0→360deg), 8s linear infinite. Node entry: scale \+ opacity, 400ms ease-out, staggered. Edge draw: stroke-dashoffset, 600ms ease-out, staggered.*

### **PIDS (bottom-left) — Perimeter Comet**

A hexagonal boundary represents the protected perimeter. Six dashed lines converge from each vertex to a central dot — the protected asset. Three overlapping polygon stroke layers travel continuously around the perimeter boundary clockwise: the head layer is 2.5px orange at full opacity; the mid-tail is 1.8px at 45% opacity; the far tail is 1px at 18% opacity. Together they form a comet with a weighted head and fading trail. One full loop takes 4 seconds. The central asset dot is static.

Animation: *SVG \<animate\> on stroke-dashoffset, from 0 to –456, 4s linear infinite. Three layers offset by their dash-head length to create the comet taper.*

### **IoT Monitoring (bottom-right) — Sensor Wave**

Seven overlapping circles: six arranged in a hexagonal ring plus one centre. Each outer circle represents a sensor node in a distributed network. The six outer circles activate in clockwise sequence — one at a time — each briefly filling with an amber tint and glowing with a soft drop-shadow. The wave completes a full clockwise rotation every 7 seconds (each node active for a 7s window, staggered at 1.17s intervals). The centre circle is static and slightly heavier in stroke weight.

Animation: *CSS keyframes: fill and stroke transition from transparent to rgba(212,168,67,0.12) and \--color-accent-amber. Each circle on its own animation-delay offset. 7s duration per cycle.*

## **2.3  Interaction Behaviour**

| State | Behaviour |
| :---- | :---- |
| Page load | Nova node/edge draw-in fires immediately. All other animations begin simultaneously on load. |
| Scroll | Hero is above-the-fold — no scroll trigger needed. All animations run from paint. |
| Hover (cell) | Cell label transitions from \--color-text-tertiary to \--color-text-secondary over 400ms. No other hover state — the illustrations are ambient, not interactive. |
| Mobile (\<768px) | Grid collapses: illustrations stack below the copy block in a 2×2 grid at reduced size (cells \~120px). Animations continue unchanged. |
| Reduced motion | All animations disabled. Illustrations render in their final/revealed state with no motion. |

## **2.4  Reference Inspirations**

| Reference | Pattern and adaptation |
| :---- | :---- |
| Shared reference image | Geometric technical illustrations — warm grey canvas, thin line weight, single accent colour. Adapted: cream canvas, orange/amber accents, product-specific geometry. |
| Darktrace (darktrace.com) | Ambient animated visual communicates "intelligence is watching" without explaining mechanism. Adapted: four distinct product symbols replace one abstract mesh. |
| Hiro (hiro.fm) | Editorial scale and breathing room in hero — visual carries weight without text clutter. Adapted: illustrations replace photography. |
| Gradient Labs | Bento card grid with product-specific visual in each cell. Adapted: no card containers, illustrations integrate directly with canvas. |

## **2.5  Responsive Behaviour**

| Breakpoint | Layout |
| :---- | :---- |
| Desktop (\>1280px) | Two-column, 50/50 split. Copy left, illustration grid right. Grid cells \~220px square. |
| Tablet (768–1280px) | Two-column, 45/55 split. Headline reduces to 52px. Grid cells scale proportionally. |
| Mobile (\<768px) | Single column. Copy first, grid below. Grid maintains 2×2 at full container width. Cell labels hidden below 400px. |

# **3\. COMPONENT ARCHITECTURE**

## **3.1  File Structure**

src/

  components/

    Hero/

      index.jsx                 — Re-export

      Hero.jsx                  — Main section layout (copy \+ grid)

      HeroGrid.jsx              — 2×2 grid container \+ cell wrappers

      illustrations/

        RFTMIllustration.jsx     — OTDR waveform SVG \+ animation

        NovaIllustration.jsx     — Topology radar SVG \+ animation

        PIDSIllustration.jsx     — Perimeter comet SVG \+ animation

        IoTIllustration.jsx      — Sensor wave SVG \+ animation

      Hero.css                  — Grid layout, cell sizing, responsive

## **3.2  Component Breakdown**

| Component | Purpose and props |
| :---- | :---- |
| Hero.jsx | Section container. Renders HeroCopy (left) and HeroGrid (right) in a CSS grid. Props: none (static content). |
| HeroGrid.jsx | Renders four cells with hairline separators. Maps illustration components to positions. Props: none. |
| RFTMIllustration.jsx | Self-contained SVG. All animation via CSS keyframes defined in component scope or Hero.css. No props required. Manages its own animation loop. |
| NovaIllustration.jsx | Self-contained SVG with clipPath, linearGradient, and CSS transform-origin set to SVG centre. No props. |
| PIDSIllustration.jsx | Self-contained SVG using SVG \<animate\> elements (not CSS) for the comet — dashoffset animation is more reliable cross-browser on polygon paths than CSS. |
| IoTIllustration.jsx | Self-contained SVG. CSS keyframes with animation-delay offsets per circle class. No JS required. |

## **3.3  Design Tokens Used**

| Token | Value and usage |
| :---- | :---- |
| \--color-bg | \#F7F3EC — page canvas and cell backgrounds |
| \--color-surface | \#FFFFFF — not used in hero (no card containers) |
| \--color-text-primary | \#1A1612 — headline, body copy |
| \--color-text-secondary | \#7A7067 — subheading, secondary copy, hover cell label |
| \--color-text-tertiary | \#B5AFA8 — default cell labels, illustration strokes |
| \--color-accent-orange | \#E8622A — CTA button, illustration accents, RFTM fault, PIDS comet head, Nova sweep |
| \--color-accent-amber | \#D4A843 — IoT active node fill/stroke |
| \--color-border | rgba(26,22,18,0.08) — hairline cell separators |
| \--radius-button | 8px — CTA buttons |
| \--duration-fast | 200ms — hover transitions |
| \--duration-normal | 400ms — node entry animations |
| \--ease-out | cubic-bezier(0.16,1,0.3,1) — entry animations |

# **4\. GEMINI 3.1 PRO PROMPT STRATEGIES**

**⚠  Latency warning:** All prompts below are HIGH thinking level. Allow 2–5 minutes per prompt in Antigravity. Do not interrupt or re-prompt during thinking. If output is truncated, continue with: "Please complete the component from where you stopped." Temperature must remain at 1.0 — never lower it.

  **GEMINI PROMPT: RFTMIllustration.jsx — OTDR Waveform**

**Thinking Level: HIGH    Expected Output:** Single self-contained React JSX file

\<role\>

You are an expert front-end engineer and SVG animation specialist.

You build production-ready, self-contained React components.

\</role\>

\<design\_system\>

Background: \#F7F3EC (warm cream — the SVG viewBox background)

Primary stroke: rgba(26,22,18,0.18) — all static geometry

Accent orange: \#E8622A — fault spike, FAULT label, glow

Grid lines: rgba(26,22,18,0.05) and rgba(26,22,18,0.08)

Endpoint dots: rgba(26,22,18,0.2)

Font for FAULT label: JetBrains Mono, 7px, loaded via Google Fonts

ViewBox: 0 0 200 200

\</design\_system\>

\<constraints\>

\- Use only CSS keyframes inside a \<style\> block within the JSX (no GSAP, no Framer)

\- All animations must respect prefers-reduced-motion media query

\- All SVG IDs must be namespaced: rftm-\* to avoid conflicts when four SVGs coexist

\- No placeholder comments. No TODO items. Production-ready output only.

\- The component is a default export named RFTMIllustration

\- No props required — fully self-contained

\- viewBox must be explicitly set

\</constraints\>

\<task\>

Build a React SVG component that renders an OTDR signal waveform.

STATIC GEOMETRY:

\- Three horizontal amplitude reference lines at y=70, y=100, y=130

  (y=100 slightly heavier: opacity 0.08, others 0.05)

\- Three short vertical tick marks at x=60, x=100, x=140 crossing y=100

  (height: y=96 to y=104, stroke rgba(26,22,18,0.15))

\- Endpoint dots at (20,100) and (180,100), radius 2.5

ANIMATION SEQUENCE (2-second loop, repeats infinitely):

  0s–2s:   Baseline trace draws left-to-right via stroke-dashoffset 600→0

           Path: M20,100 L95,100 (left segment, before fault point)

           Easing: cubic-bezier(0.4,0,0.2,1)

  0.9s:    Fault spike becomes visible (opacity 0→1 at 45% of 2s loop)

           Spike path: M95,100 L103,68 L111,100

           Stroke: \#E8622A, width 1.5px, with a second copy at 5px / opacity 0.15 for glow

           Orange dot at spike peak: cx=103, cy=68, r=3

  0.9s:    Post-spike trace continuation (M111,100 L180,100) also appears

           Stroke: rgba(26,22,18,0.18), width 1.2px

  1.0s:    FAULT pill label fades in

           Rectangle: x=84 y=50 width=38 height=13 rx=3

           Fill: rgba(232,98,42,0.1), Stroke: rgba(232,98,42,0.3) width 0.8

           Text: "FAULT" centred at (103,60), JetBrains Mono 7px, fill \#E8622A

  1.6s:    Spike and FAULT label begin fading out (opacity → 0\)

  2.0s:    Full reset, loop begins again

All timing must be expressed as animation keyframe percentages of the 2s duration.

\</task\>

\<output\_format\>

Return a single complete RFTMIllustration.jsx file.

No explanatory prose. No placeholder comments.

Must render correctly in React 18 with Tailwind CSS core utilities.

\</output\_format\>

  **GEMINI PROMPT: NovaIllustration.jsx — Topology Radar**

**Thinking Level: HIGH    Expected Output:** Single self-contained React JSX file

\<role\>

You are an expert front-end engineer and SVG animation specialist.

\</role\>

\<design\_system\>

Background: \#F7F3EC

Boundary / guide circles: rgba(26,22,18,0.1) and rgba(26,22,18,0.06)

Topology edges: rgba(26,22,18,0.16)

Core node: rgba(26,22,18,0.12) fill, rgba(26,22,18,0.3) stroke

Outer nodes: rgba(26,22,18,0.08) fill, rgba(26,22,18,0.22) stroke

Mid nodes: rgba(26,22,18,0.06) fill, rgba(26,22,18,0.16) stroke

Sweep fill gradient: \#E8622A, from opacity 0 (left) to 0.25 (right)

Sweep leading edge: \#E8622A, opacity 0.45

ViewBox: 0 0 200 200, centre at (100,100)

\</design\_system\>

\<constraints\>

\- Sweep rotation must use CSS transform with transform-origin: 100px 100px

\- Sweep must be clipped to the circular boundary (clipPath id: nova-clip)

\- All IDs namespaced: nova-\*

\- prefers-reduced-motion: disable all animations, render in final visible state

\- Default export: NovaIllustration

\- No props required

\</constraints\>

\<task\>

Build a React SVG component rendering a network topology graph with a radar sweep.

STATIC GEOMETRY:

\- Outer boundary circle: cx=100 cy=100 r=72

\- Two inner guide circles: r=48, r=24 (very faint, opacity 0.06)

\- Five topology edges (lines, drawn in via animation):

    (100,100)→(100,28)   (100,100)→(162,136)   (100,100)→(38,136)

    (100,28)→(162,136)   (100,28)→(38,136)

\- Six nodes:

    Core:  cx=100 cy=100 r=5 (plus inner dot r=2)

    Outer: cx=100 cy=28 r=4,  cx=162 cy=136 r=4,  cx=38 cy=136 r=4

    Mid:   cx=131 cy=64 r=3,  cx=69 cy=64 r=3

RADAR SWEEP:

\- A wedge path: M100 100 L100 28 A72 72 0 0 1 161 136 Z

\- Filled with a radial-ish gradient from orange opacity 0 → 0.25

\- A leading-edge line from (100,100) to (100,28)

\- The sweep group rotates 0→360deg around (100,100), 8s linear infinite

\- Clipped to nova-clip (the r=72 circle)

ON-LOAD ENTRY ANIMATIONS (fire once, not on loop):

\- Nodes: opacity 0→1, scale 0.5→1 from their own centre, 400ms ease-out

  Stagger: 0ms, 100ms, 200ms, 300ms, 400ms, 500ms

\- Edges: stroke-dasharray 200, dashoffset 200→0, 600ms ease-out

  Stagger: 200ms, 350ms, 500ms, 650ms, 800ms

\- Sweep begins immediately with no entry delay

All node scale transforms must use transform-box: fill-box and transform-origin: center.

\</task\>

\<output\_format\>

Single complete NovaIllustration.jsx. No prose. No placeholders.

\</output\_format\>

  **GEMINI PROMPT: PIDSIllustration.jsx — Perimeter Comet**

**Thinking Level: HIGH    Expected Output:** Single self-contained React JSX file

\<role\>

You are an expert front-end engineer and SVG animation specialist.

\</role\>

\<design\_system\>

Background: \#F7F3EC

Hex perimeter base: rgba(26,22,18,0.1), stroke-width 1

Inner convergence lines: rgba(26,22,18,0.05), dashed (2 4\)

Inner hex: rgba(26,22,18,0.07)

Vertex dots: rgba(26,22,18,0.15)

Centre dot (outer): rgba(26,22,18,0.06) fill, rgba(26,22,18,0.18) stroke

Centre dot (inner): rgba(26,22,18,0.3)

Comet head: \#E8622A, stroke-width 2.5, opacity 1.0

Comet mid-tail: \#E8622A, stroke-width 1.8, opacity 0.45

Comet far-tail: \#E8622A, stroke-width 1.0, opacity 0.18

ViewBox: 0 0 200 200

\</design\_system\>

\<constraints\>

\- Use SVG \<animate\> elements (not CSS) for the comet dashoffset animation.

  CSS transitions on polygon stroke-dashoffset are unreliable cross-browser.

\- The comet is three overlapping \<polygon\> elements with identical points,

  each with a different stroke-width, opacity, and stroke-dasharray to create

  the head-bright / tail-fade comet effect.

\- Perimeter path total length is approximately 456px.

  Confirm: hexagon with vertices at 100,24 / 166,62 / 166,138 / 100,176 / 34,138 / 34,62

  Each side ≈ 76px × 6 sides \= 456px total.

\- Comet head dash: dasharray="12 1000", animates dashoffset 0 → –456, 4s linear infinite

\- Comet mid-tail: dasharray="20 1000", dashoffset starts at 12, animates 12 → –444

\- Comet far-tail: dasharray="28 1000", dashoffset starts at 28, animates 28 → –428

\- All three \<animate\> elements use dur="4s" repeatCount="indefinite" calcMode="linear"

\- All IDs namespaced: pids-\*

\- prefers-reduced-motion: hide comet layers, show only static geometry

\- Default export: PIDSIllustration. No props.

\</constraints\>

\<task\>

Build a React SVG component rendering a hexagonal perimeter with a comet patrol.

STATIC GEOMETRY:

\- Outer hex: points="100,24 166,62 166,138 100,176 34,138 34,62"

  fill none, stroke rgba(26,22,18,0.1), stroke-width 1

\- Six dashed lines from each vertex to centre (100,100):

  stroke rgba(26,22,18,0.05), stroke-dasharray="2 4", width 1

\- Inner hex: points="100,52 133,70 133,108 100,126 67,108 67,70"

  stroke rgba(26,22,18,0.07), fill none

\- Six vertex dots: r=2, fill rgba(26,22,18,0.15)

\- Centre marker: outer circle r=5, inner dot r=2

COMET LAYERS (three polygons, same points as outer hex):

  Layer 1 — Head:     stroke-width 2.5, opacity 1.0,  dasharray "12 1000"

                       animate dashoffset: 0 → –456, 4s

  Layer 2 — Mid tail: stroke-width 1.8, opacity 0.45, dasharray "20 1000"

                       animate dashoffset: 12 → –444, 4s

  Layer 3 — Far tail: stroke-width 1.0, opacity 0.18, dasharray "28 1000"

                       animate dashoffset: 28 → –428, 4s

The three layers must be rendered ABOVE the static geometry.

All three animate simultaneously (no stagger between them).

\</task\>

\<output\_format\>

Single complete PIDSIllustration.jsx. No prose. No placeholders.

\</output\_format\>

  **GEMINI PROMPT: IoTIllustration.jsx — Sensor Wave**

**Thinking Level: MEDIUM    Expected Output:** Single self-contained React JSX file

\<role\>

You are an expert front-end engineer and SVG animation specialist.

\</role\>

\<design\_system\>

Background: \#F7F3EC

Default circle: fill rgba(26,22,18,0), stroke rgba(26,22,18,0.13), width 1

Centre circle: stroke rgba(26,22,18,0.18), width 1.2 (no fill)

Node dots: r=2, fill rgba(26,22,18,0.15)

Centre dot: r=3, fill rgba(26,22,18,0.22)

Active state: fill rgba(212,168,67,0.12), stroke \#D4A843, width 1.5

              filter: drop-shadow(0 0 6px rgba(212,168,67,0.35))

ViewBox: 0 0 200 200

\</design\_system\>

\<constraints\>

\- CSS keyframes only. No JS animation.

\- Each outer circle gets its own class: iot-c1 through iot-c6

\- Each class has animation-delay to create the clockwise wave

\- All IDs namespaced: iot-\*

\- prefers-reduced-motion: no animation, all circles in default state

\- Default export: IoTIllustration. No props.

\</constraints\>

\<task\>

Build a React SVG component with 7 overlapping circles (6 outer ring \+ 1 centre).

CIRCLE POSITIONS (outer ring, clockwise from top):

  c1 — top:        cx=100 cy=58  r=34

  c2 — top-right:  cx=140 cy=81  r=34

  c3 — bot-right:  cx=140 cy=127 r=34

  c4 — bottom:     cx=100 cy=150 r=34

  c5 — bot-left:   cx=60  cy=127 r=34

  c6 — top-left:   cx=60  cy=81  r=34

  centre:          cx=100 cy=104 r=34

CLOCKWISE WAVE ANIMATION:

\- Keyframe "iot-active" (7s duration per circle):

    0%, 100%:   default state (fill transparent, stroke default)

    15%, 30%:   active state (fill amber tint, stroke amber, drop-shadow)

    All transitions between states: 400ms ease

\- animation-delay offsets for clockwise sequence (6 circles, 7s/6 \= 1.167s apart):

    c1: 0.000s   c2: 1.167s   c3: 2.333s

    c4: 3.500s   c5: 4.667s   c6: 5.833s

\- The centre circle does NOT animate — it is the static hub.

Node dots at each circle centre and one at the hub.

\</task\>

\<output\_format\>

Single complete IoTIllustration.jsx. No prose. No placeholders.

\</output\_format\>

  **GEMINI PROMPT: Hero.jsx \+ HeroGrid.jsx — Section Layout**

**Thinking Level: MEDIUM    Expected Output:** Two React JSX files

\<role\>

You are an expert React and CSS front-end engineer.

\</role\>

\<design\_system\>

\--color-bg: \#F7F3EC

\--color-text-primary: \#1A1612

\--color-text-secondary: \#7A7067

\--color-text-tertiary: \#B5AFA8

\--color-accent-orange: \#E8622A

\--color-border: rgba(26,22,18,0.08)

\--max-width: 1280px

\--page-padding: 40px (desktop) / 20px (mobile)

Font: Syne (eyebrow, headline) | Instrument Sans (body, button) | JetBrains Mono (stats)

Loaded via Google Fonts CDN in index.html

\</design\_system\>

\<constraints\>

\- Use only Tailwind CSS core utility classes for layout. No custom CSS classes

  except for Hero.css which handles grid/cell sizing and responsive overrides.

\- Import the four illustration components:

    import RFTMIllustration from "./illustrations/RFTMIllustration"

    import NovaIllustration from "./illustrations/NovaIllustration"

    import PIDSIllustration from "./illustrations/PIDSIllustration"

    import IoTIllustration  from "./illustrations/IoTIllustration"

\- No form tags. Use button elements with onClick handlers.

\- Default exports: Hero and HeroGrid.

\- No props required on Hero.

\</constraints\>

\<task\>

Build Hero.jsx and HeroGrid.jsx.

HERO.JSX:

A full-viewport-height section (min-h-screen) with background \#F7F3EC.

Content centred within max-width 1280px with 40px horizontal padding.

Two columns via CSS grid (50/50), gap 80px, vertically centred.

LEFT COLUMN — HeroCopy:

\- Eyebrow: "— INTELLIGENT MONITORING"

  Syne 600, 11px, uppercase, letter-spacing 0.08em, color \#B5AFA8

  Margin-bottom 28px

\- Headline: "Zero blind spots." (line 1\) \+ "Zero downtime." (line 2\)

  Syne 800, clamp(48px, 5vw, 80px), line-height 1.05, letter-spacing –0.02em

  Second "Zero" wrapped in a span with color \#E8622A

\- Subheading (16px, Instrument Sans 400, \#7A7067, line-height 1.75, max-width 400px):

  "Four systems. One unified view. Fibre, perimeter, sensors, and network

   topology — monitored continuously, so nothing goes undetected."

\- CTA row (flex, gap 12px, margin-top 44px):

    Primary: "Schedule a Demo" — bg \#E8622A, white text, 14px, border-radius 8px,

             padding 13px 26px, hover: translateY(–2px), box-shadow

    Secondary: "Explore Solutions" — transparent, border rgba(26,22,18,0.08),

               color \#7A7067, same sizing, hover: border darkens, text darkens

RIGHT COLUMN — HeroGrid.jsx:

\- 2×2 CSS grid, gap 0

\- Each cell: aspect-ratio 1/1, overflow hidden, position relative

\- Hairline borders between cells:

    Cell 1 (top-left):  border-right and border-bottom: 1px solid rgba(26,22,18,0.08)

    Cell 2 (top-right): border-bottom only

    Cell 3 (bot-left):  border-right only

    Cell 4 (bot-right): no border

\- Each cell contains its illustration SVG (fills 100% of cell)

  and a .cell-label element positioned absolute bottom-14px, text-centre

  Syne 600, 10px, uppercase, letter-spacing 0.08em, color \#B5AFA8

  Hover: color transitions to \#7A7067 (400ms ease)

\- Cell order: RFTM (top-left), Nova Context (top-right),

              PIDS (bot-left), IoT Monitoring (bot-right)

RESPONSIVE (in Hero.css):

  \>1280px: two-column grid as described

  768–1280px: two-column, headline font-size 52px

  \<768px: single column, copy first, grid below at full container width

\</task\>

\<output\_format\>

Return both files separated by a clear comment banner.

File 1: Hero.jsx (complete)

File 2: HeroGrid.jsx (complete)

No prose. No placeholders.

\</output\_format\>

# **5\. CLAUDE CODE (OPUS 4.6) IMPLEMENTATION NOTES**

## **5.1  Architecture Decisions**

Claude Code owns the structural decisions before Gemini generates any component files:

* Confirm React Router is configured with a route at / pointing to a Home page component that renders \<Hero /\> as the first child, above all other home sections.

* Confirm Google Fonts CDN import for Syne, Instrument Sans, and JetBrains Mono exists in index.html before the first Gemini component is scaffolded. Gemini components will reference these fonts without importing them.

* Create the full file structure at src/components/Hero/ before any Gemini output is committed. Empty files with correct names prevent import errors during incremental development.

* Confirm that Tailwind CSS core utilities are available globally (CDN or PostCSS build). Gemini will use utility classes for layout; do not add a Tailwind compiler requirement if the project uses CDN-only.

## **5.2  Integration Points**

| Integration | Detail |
| :---- | :---- |
| Home page (src/pages/Home.jsx) | Hero must be the first section rendered. It accepts no props and manages no shared state. |
| Navigation (Navbar.jsx) | Navbar overlays the Hero — it must be positioned absolute/fixed with z-index above the hero. The hero's copy column must not be obscured by the navbar height at desktop; add padding-top equal to navbar height (\~72px). |
| Design token CSS variables | All colour tokens must be defined in src/styles/tokens.css (or equivalent global CSS) before Hero renders. Gemini components reference these variables directly. |
| Scroll triggers | Hero animations are not scroll-triggered — they fire on load. The IntersectionObserver pattern used by other sections does NOT apply here. |

## **5.3  Consistency Requirements**

* Button border-radius: exactly 8px (**\--radius-button**). Must match all other CTAs across the site.

* Font loading: same Google Fonts CDN string used globally. No per-component font imports.

* Colour values: reference CSS variables, never hardcode hex values in JSX style props.

* Animation timing tokens: \--duration-fast (200ms), \--duration-normal (400ms), \--ease-out must be defined in tokens.css and used in Hero.css rather than inlined.

* The 2×2 grid hairline separators must use \--color-border, not a hardcoded rgba value.

## **5.4  Suggested Implementation Order**

1. Set up route at / and create empty Home.jsx that renders \<Hero /\>.

2. Verify Google Fonts CDN string is in index.html. Confirm Syne, Instrument Sans, JetBrains Mono load correctly in browser.

3. Create all Hero/ file stubs (empty files with correct exports).

4. Run Gemini prompt: Hero.jsx \+ HeroGrid.jsx layout. Commit output.

5. Run Gemini prompt: RFTMIllustration.jsx. Review animation in browser. Commit.

6. Run Gemini prompt: NovaIllustration.jsx. Review sweep \+ node entry. Commit.

7. Run Gemini prompt: PIDSIllustration.jsx. Review comet loop, verify all three layers visible. Commit.

8. Run Gemini prompt: IoTIllustration.jsx. Review clockwise wave, verify stagger timing. Commit.

9. Run all four illustrations simultaneously in the 2×2 grid. Verify no ID conflicts (all IDs namespaced). Verify no animation jank at 60fps.

10. Test responsive breakpoints: 1280px, 768px, 375px.

11. Test prefers-reduced-motion in browser devtools — confirm all animation stops.

12. Cross-browser: Chrome, Firefox, Safari, Edge.

# **6\. CONTENT REQUIREMENTS**

## **6.1  Copy Blocks**

| Element | Copy |
| :---- | :---- |
| Eyebrow label | — INTELLIGENT MONITORING |
| Headline line 1 | Zero blind spots. |
| Headline line 2 | Zero downtime. |
| Accented word | "Zero" on line 2 renders in \--color-accent-orange |
| Subheading | Four systems. One unified view. Fibre, perimeter, sensors, and network topology — monitored continuously, so nothing goes undetected. |
| Primary CTA | Schedule a Demo |
| Secondary CTA | Explore Solutions |
| Cell label 1 | RFTM |
| Cell label 2 | Nova Context |
| Cell label 3 | PIDS |
| Cell label 4 | IoT Monitoring |

## **6.2  Data / Statistics**

No statistics appear in the Hero section. Stats are reserved for the Stats Strip section (ALT-005), which uses JetBrains Mono count-up animations. The Hero carries only conceptual copy.

# **7\. ACCEPTANCE CRITERIA**

The feature is shippable when ALL criteria below are satisfied:

### **Visual**

* ☐  Hero section fills full viewport height on desktop without scrolling required to see all four cells and both CTAs.

* ☐  Two columns are equal width (50/50) at desktop breakpoint. Illustration grid is right-aligned.

* ☐  No card containers, shadows, or dark backgrounds visible in hero section — illustrations integrate directly with \#F7F3EC canvas.

* ☐  Hairline separators between cells are visible but subtle — they should divide without boxing.

* ☐  Cell labels appear at bottom-centre of each cell in tertiary text colour.

### **Animation**

* ☐  RFTM: trace draws left-to-right, fault spike appears at midpoint in orange, FAULT label blinks, sequence resets cleanly with no visual jump.

* ☐  Nova: radar sweep rotates continuously at constant speed. Nodes and edges draw in once on load and do not repeat.

* ☐  PIDS: three-layer comet travels continuously clockwise around the full hexagonal perimeter. The head is visibly brighter/heavier than the tail.

* ☐  IoT: six outer circles activate in clockwise sequence, one at a time, with amber glow. No two adjacent circles are active simultaneously.

* ☐  All four animations run simultaneously without performance degradation. Target: 60fps on mid-range hardware.

* ☐  No ID conflicts between the four SVGs when rendered together in the same DOM.

### **Responsive**

* ☐  At 768px breakpoint: layout switches to single column. Copy above, grid below.

* ☐  Grid maintains 2×2 layout at all breakpoints (never collapses to 1×4 or 4×1).

* ☐  All text remains legible at mobile breakpoints — no overflow or truncation.

### **Accessibility**

* ☐  All animations fully disabled when prefers-reduced-motion: reduce is active.

* ☐  In reduced-motion state, all four illustrations render in their final/visible state (not blank).

* ☐  CTA buttons are keyboard-navigable (tab order correct, visible focus state).

* ☐  Headline text achieves minimum 4.5:1 contrast ratio against \#F7F3EC background.

### **Performance**

* ☐  No single SVG illustration file exceeds 15KB.

* ☐  Hero section renders first meaningful paint under 1.2s on a standard broadband connection.

* ☐  No animation library dependencies (GSAP, Framer Motion, Lottie) — CSS keyframes and SVG animate elements only.

### **Cross-Browser**

* ☐  Verified in Chrome (latest), Firefox (latest), Safari 16+, Edge (latest).

* ☐  SVG \<animate\> elements for PIDS comet confirmed working in all target browsers.

* ☐  CSS transform-origin on SVG elements (Nova sweep, node scale) confirmed working in Safari.

# **8\. OUT OF SCOPE**

This PRD does not cover:

* Navbar / navigation component (separate PRD — ALT-008).

* Scroll-down indicator or arrow below the hero section.

* Any hero section A/B testing or variant copy.

* Video background or Lottie animation variants.

* Contact form or lead capture within the hero.

* Localisation or multi-language copy variants.

* Any section below the hero — ASCII texture strip, logo ticker, problem narrative, products bento, stats strip, How It Works, CTA band, footer.

# **9\. OPEN QUESTIONS**

| \# | Question | Owner | Resolved? |
| :---- | :---- | :---- | :---- |
| 1 | Should the secondary CTA ("Explore Solutions") link to /services or scroll to the Products bento grid on the same page? | Product Owner | **No** |
| 2 | Should cell labels be visible on mobile at \<400px, or hidden to reduce noise? | Design | **No** |
| 3 | Is the navbar height confirmed at 72px? Hero copy column needs this value for padding-top to avoid overlap. | Claude Code | **No** |
| 4 | Are there confirmed client/partner logos for the logo ticker (next section)? Not needed for this PRD but affects overall hero bottom spacing. | Product Owner | **No** |

*PRD Version 1.0  ·  ALT-001  ·  Project: Altics Monitoring Website  ·  February 2026*  
*Primary model: Gemini 3.1 Pro (Antigravity)  ·  Architecture: Claude Code (Opus 4.6)  ·  Status: Draft*