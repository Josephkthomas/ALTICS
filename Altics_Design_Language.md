# Altics Monitoring — Unified Design Language Reference
**Document Type:** Design System & Reference Specification  
**Version:** 1.0  
**Date:** February 2026  
**Status:** Foundation — locked before PRD generation begins

---

## PART 1: BRAND SOUL

### The Core Idea: "Precision Warmth"

Altics Monitoring exists in a category where problems are invisible until they become crises. A fibre link degrades silently. An intruder approaches a perimeter undetected. A network accumulates faults that nobody sees until the outage is already happening. The brand's job is to make the invisible visible — and to do it with the authority of a company that has been watching when nobody else was.

**The emotional positioning:** Confident, calm, precise. The feeling of a control room that never panics because it never gets surprised. Warm enough to feel human. Technical enough to feel trustworthy.

**What this is NOT:** Cold, corporate, defensive, generic enterprise blue. Altics stands apart from every competitor precisely because it doesn't look like them.

---

### The Narrative Thread (Runs Through Every Page)

The single most powerful copy device on this site is the "invisible problem" narrative. Altics' products solve problems that decision-makers don't think about until the moment of failure. Every page, every section, every headline should carry a version of this tension:

> *"You don't think about your fibre network — until it goes dark."*  
> *"You don't think about your perimeter — until something crosses it."*  
> *"You don't think about your sensors — until the data stops arriving."*  
> *"You don't think about your network topology — until the root cause is a mystery."*

The resolution is always Altics: the system that was watching before you needed it to be.

**Copy voice:** Authoritative, direct, specific. No generic SaaS language ("unlock", "leverage", "seamless", "powerful"). Instead: precise technical language that respects the intelligence of the buyer. Short sentences. Active verbs. Real numbers.

---

## PART 2: VISUAL IDENTITY SYSTEM

### 2.1 Colour Palette

The "Signal Cream" palette is the single most distinctive brand decision on this site. No competitor in the fibre optic or network monitoring space uses a warm cream canvas. This is intentional and non-negotiable.

| Token | Hex | RGB | Role |
|---|---|---|---|
| `--color-bg` | `#F7F3EC` | 247, 243, 236 | Main page canvas — warm cream |
| `--color-surface` | `#FFFFFF` | 255, 255, 255 | Cards, bento cells, elevated surfaces |
| `--color-surface-tint` | `#FDFBF7` | 253, 251, 247 | Subtle alternative surface — barely-there warmth |
| `--color-text-primary` | `#1A1612` | 26, 22, 18 | Near-black with warm undertone — NOT pure black |
| `--color-text-secondary` | `#7A7067` | 122, 112, 103 | Supporting copy, labels, captions |
| `--color-text-tertiary` | `#B5AFA8` | 181, 175, 168 | Placeholder text, disabled states |
| `--color-accent-orange` | `#E8622A` | 232, 98, 42 | Primary CTA, active states, key highlights |
| `--color-accent-amber` | `#D4A843` | 212, 168, 67 | Stat callouts, secondary icons, data accents |
| `--color-accent-orange-light` | `#FDF0EA` | 253, 240, 234 | Orange tint for hover backgrounds, tag fills |
| `--color-inversion-bg` | `#111008` | 17, 16, 8 | Dark section background (How It Works) |
| `--color-inversion-surface` | `#1C1B14` | 28, 27, 20 | Cards within dark sections |
| `--color-inversion-text` | `#F0EDE6` | 240, 237, 230 | Text on dark sections — warm white, not pure |
| `--color-border` | `rgba(26,22,18,0.08)` | — | Subtle warm-tinted separators, card outlines |
| `--color-border-strong` | `rgba(26,22,18,0.16)` | — | Stronger dividers, focused states |
| `--color-orange-glow` | `rgba(232,98,42,0.15)` | — | Hover glow on cards, active state shadow |

**Colour usage rules:**
- Orange (`#E8622A`) appears on a maximum of **one element per viewport** at any time outside of the CTA band. Overuse kills its power.
- Amber (`#D4A843`) is exclusively for data — statistics, metric callouts, sensor readings. Never use it for decorative purposes.
- The dark inversion block (`#111008`) appears **once** on the Home page (How It Works section). Product pages may each have one inversion section. Never stack two dark sections.
- Pure black (`#000000`) and pure white (`#FFFFFF`) are never used for backgrounds. Always use the warm-tinted equivalents.

---

### 2.2 Typography System

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Instrument+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Font | Weight | Size (Desktop) | Size (Mobile) | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Display / Hero | Syne | 800 | 80–96px | 48–56px | -0.02em | 1.05 |
| Section Title | Syne | 700 | 48–64px | 32–40px | -0.015em | 1.1 |
| Card Title | Syne | 700 | 24–32px | 20–24px | -0.01em | 1.2 |
| Eyebrow / Label | Syne | 600 | 11–13px | 11px | 0.08em (uppercase) | 1.4 |
| Body Copy | Instrument Sans | 400 | 16–17px | 15px | 0 | 1.7 |
| Body Emphasis | Instrument Sans | 500 | 16–17px | 15px | 0 | 1.7 |
| Data / Stat | JetBrains Mono | 500 | 14–20px | 13–16px | -0.01em | 1.4 |
| Stat Hero | JetBrains Mono | 500 | 56–72px | 40–48px | -0.02em | 1.0 |
| Button | Instrument Sans | 500 | 14–15px | 14px | 0.02em | 1 |

**Typography rules:**
- Syne is used **only** for display text, section titles, card titles, and eyebrow labels. Never for body copy.
- JetBrains Mono is used **only** for numerical data, technical readouts, and stat callouts. Never for body copy or headlines.
- Eyebrow labels are always uppercase with `0.08em` letter-spacing. Format: `— EYEBROW LABEL` with an em-dash prefix.
- Headlines never exceed two lines on desktop. If copy is too long, it must be edited, not allowed to wrap to three lines.
- Body copy paragraphs are capped at `65ch` max-width to maintain readability at large viewport widths.

---

### 2.3 Spacing & Layout System

```css
:root {
  /* Section rhythm */
  --space-section: 120px;        /* Between major sections (desktop) */
  --space-section-mobile: 80px;  /* Between major sections (mobile) */
  --space-block: 64px;           /* Between blocks within a section */
  --space-block-mobile: 40px;
  --space-element: 32px;         /* Between related elements */
  --space-tight: 16px;           /* Within components */
  --space-micro: 8px;            /* Fine-grained spacing */

  /* Layout */
  --max-width: 1280px;           /* Page content max-width */
  --grid-gutter: 20px;           /* Bento grid gap */
  --section-gutter: 32px;        /* Section-level gap */
  --page-padding: 40px;          /* Horizontal page padding (desktop) */
  --page-padding-mobile: 20px;

  /* Radius */
  --radius-card: 24px;           /* Bento cards, product cards */
  --radius-button: 8px;          /* All buttons */
  --radius-tag: 100px;           /* Pill tags, eyebrow labels */
  --radius-input: 10px;          /* Form inputs */
  --radius-small: 12px;          /* Small UI elements */
}
```

**Grid system:**
- 12-column grid at desktop (>1280px)
- 8-column grid at tablet (768–1280px)
- 4-column grid at mobile (<768px)
- All sections are centred within `--max-width: 1280px`
- Full-bleed sections (CTA band, dark inversion) extend edge-to-edge but contain content within max-width

---

### 2.4 Elevation & Surface System

Cards and surfaces are differentiated through a combination of background colour and subtle border — not heavy drop shadows.

```css
/* Card base — white surface on cream background */
.card {
  background: var(--color-surface);          /* #FFFFFF */
  border: 1px solid var(--color-border);     /* rgba(26,22,18,0.08) */
  border-radius: var(--radius-card);         /* 24px */
}

/* Card hover state */
.card:hover {
  border-color: var(--color-accent-orange);
  box-shadow: 0 0 0 1px var(--color-accent-orange),
              0 8px 32px var(--color-orange-glow);
  transform: translateY(-4px);
  transition: all 200ms ease;
}

/* Tinted surface variant (subtle alternative to white) */
.card--tinted {
  background: var(--color-surface-tint);    /* #FDFBF7 */
}

/* Dark inversion card */
.card--dark {
  background: var(--color-inversion-surface); /* #1C1B14 */
  border-color: rgba(240,237,230,0.08);
}
```

---

## PART 3: MOTION & ANIMATION SYSTEM

### 3.1 Core Principles

Every animation on this site must pass the following test:
> *"Does this motion communicate state, progress, or reveal — or is it purely decorative?"*

If the answer is "purely decorative," the animation is cut. Motion is information, not embellishment.

### 3.2 Animation Token Library

```css
:root {
  /* Timing */
  --duration-instant:   100ms;
  --duration-fast:      200ms;
  --duration-normal:    400ms;
  --duration-slow:      600ms;
  --duration-xslow:     1200ms;

  /* Easing */
  --ease-out:       cubic-bezier(0.16, 1, 0.3, 1);   /* Primary ease — snappy, organic */
  --ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);    /* Transitions between states */
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot for emphasis */
  --ease-linear:    linear;                            /* Progress bars, count-ups */

  /* Stagger */
  --stagger-sibling: 80ms;    /* Between sibling elements in a grid */
  --stagger-list:    60ms;    /* Between list items */
}
```

### 3.3 Scroll Entry Animation (Universal)

Every section and card uses this entry pattern when crossing the IntersectionObserver threshold:

```css
/* Default hidden state */
.reveal {
  opacity: 0;
  transform: translateY(24px);
}

/* Revealed state — added by IntersectionObserver */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
}

/* Staggered children */
.reveal-group .reveal:nth-child(1) { transition-delay: 0ms; }
.reveal-group .reveal:nth-child(2) { transition-delay: var(--stagger-sibling); }
.reveal-group .reveal:nth-child(3) { transition-delay: calc(var(--stagger-sibling) * 2); }
.reveal-group .reveal:nth-child(4) { transition-delay: calc(var(--stagger-sibling) * 3); }
```

**IntersectionObserver config:**
```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Fire once only
      }
    });
  },
  { threshold: 0.15 } // Trigger at 15% visibility
);
```

### 3.4 Hover States

```css
/* Standard card hover */
.card {
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px var(--color-orange-glow);
  border-color: var(--color-accent-orange);
}

/* Button hover */
.btn-primary:hover {
  background: #D45520; /* Darker orange */
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(232,98,42,0.3);
}
```

### 3.5 SVG Animation Patterns

**Path-draw animation (fiber traces, flow diagrams):**
```css
/* Step 1: Measure path length in JavaScript
   const path = document.querySelector('.fiber-path');
   const length = path.getTotalLength(); */

.fiber-path {
  stroke-dasharray: var(--path-length);   /* Set via JS */
  stroke-dashoffset: var(--path-length);  /* Starts hidden */
  transition: stroke-dashoffset 1.2s var(--ease-out);
}

.fiber-path.is-visible {
  stroke-dashoffset: 0; /* Draws to completion */
}
```

**Node pulse animation (network/sensor indicators):**
```css
@keyframes node-pulse {
  0%   { transform: scale(1);   opacity: 1; }
  50%  { transform: scale(1.4); opacity: 0.6; }
  100% { transform: scale(1);   opacity: 1; }
}

.sensor-node {
  animation: node-pulse 2.4s var(--ease-in-out) infinite;
}
/* Stagger node pulses by offsetting animation-delay per node */
```

**Count-up animation (stats):**
```javascript
function countUp(element, target, duration = 1200) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    element.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target;
  };
  requestAnimationFrame(update);
}
```

### 3.6 Accessibility
All animations must respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .card, .btn-primary, .fiber-path, .sensor-node {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
    stroke-dashoffset: 0 !important;
  }
}
```

---

## PART 4: COMPONENT PATTERNS (Derived from Reference Sites)

### 4.1 Eyebrow Label
*Source: Gradient Labs — section categorisation pattern*

A small uppercase label that precedes every section title. Anchors the reader before the headline lands.

```
— PRODUCT OVERVIEW          (text: --color-text-secondary, font: Syne 600, 12px)
```

Format rules:
- Always prefixed with `—` (em-dash) + single space
- Always uppercase
- Never more than 3–4 words
- Used at the start of every major section

---

### 4.2 The Problem Narrative Scroll Sequence
*Source: Maze — numbered scroll sequence with node progression*  
*Adaptation: Warm cream palette, orange active node, product-specific pain points*

**Structure:**
- Three numbered steps (01 / 02 / 03) stacked vertically
- A thin vertical connector line runs between nodes on the left
- As each section enters the viewport, its node lights up orange (`#E8622A`)
- The connector line between activated nodes fills in orange progressively
- Left column: bold problem statement (Syne 700, 40–48px)
- Right column: animated SVG proof visual (unique per step)

**The three pain points for Altics (Home page):**
```
01 — "Your network is failing right now. You just don't know it yet."
     Proof visual: Animated OTDR trace showing a degrading signal — 
     the fault marker appearing mid-line, blinking amber

02 — "Your perimeter was crossed last night. Your log shows nothing."
     Proof visual: Perimeter map SVG — a breach zone illuminating red, 
     radiating an alert pulse outward

03 — "By the time your team responds, the damage is already done."
     Proof visual: Timeline animation — fault event → alert → 
     response gap visualised as wasted time in red
```

**Node interaction spec:**
```javascript
// Each step section gets an IntersectionObserver
// When 40% of the step is visible:
// 1. Node circle fills orange (transition: 300ms)
// 2. Connector line above it fills orange (stroke-dashoffset: 600ms)
// 3. Step number and headline fade/translate in (400ms, ease-out)
// 4. Right-side SVG proof triggers its own entry animation
```

---

### 4.3 Bento Grid Cards
*Source: Gradient Labs — varied-size card grid on white/cream*  
*Adaptation: Orange hover states, animated SVG content, cream canvas*

**Card anatomy:**
```
┌─────────────────────────────────────┐
│  — EYEBROW LABEL          [icon]    │  ← Syne 600, 12px, secondary text
│                                     │
│  Card Headline                      │  ← Syne 700, 24–28px
│  in one or two lines                │
│                                     │
│  Supporting description that        │  ← Instrument Sans, 15px, secondary
│  explains the value briefly.        │
│                                     │
│  ┌─────────────────────────────┐    │
│  │   [Animated SVG Visual]     │    │  ← Product-specific animation
│  └─────────────────────────────┘    │
│                                     │
│  Learn more →                       │  ← Instrument Sans 500, orange
└─────────────────────────────────────┘
```

**Hover state:** Border turns orange, card lifts 4px, orange glow radiates from border.

---

### 4.4 Stat Callout
*Source: Zerohash — large mono stat grid | Gradient Labs — amber callout cards*  
*Adaptation: JetBrains Mono for numbers, Syne for labels, amber accent*

```
┌────────────────────┐
│  99.3%             │  ← JetBrains Mono 500, 56px, --color-accent-amber
│  Network uptime    │  ← Instrument Sans 400, 14px, --color-text-secondary
└────────────────────┘
```

Count-up animation triggers on scroll entry. Number increments from 0 to final value over 1.2s with ease-out cubic.

---

### 4.5 Section Pause (Narrative Beat)
*Source: Maze — sparse centre-aligned question used as scroll pause*  
*Adaptation: Warm cream, orange accent word, Syne display weight*

A full-width section with a single large question, centred, no decoration:

```
What if your infrastructure could
diagnose itself before you knew
something was wrong?
```

Typography: Syne 700, 48–56px, `--color-text-primary`, centred, max-width 720px.
One word or phrase in `--color-accent-orange`.
No background change. No card. Just the question, the cream, and space.

---

### 4.6 ASCII / Code Texture Strip
*Source: Hiro — monospaced texture strip as section separator*  
*Adaptation: Altics-specific technical data rendered as texture*

A full-width horizontal band, ~40px tall, filled with scrolling or static JetBrains Mono characters representing real-looking network data:

```
...OTDR_SCAN 00:00:04.221 LOSS:-0.18dB REFL:+0.02dB PORT:A4 LINK:OK...FAULT_ID:null...
```

Colour: `--color-text-tertiary` (`#B5AFA8`) on `--color-bg`. Extremely subtle.
Used once on the Home page between the Hero and the logo ticker.
Can repeat on product pages as a thematic brand marker.

---

### 4.7 Dark Inversion Section (How It Works)
*Source: Hiro — single dark block contrast rhythm*  
*Adaptation: Altics flow diagram, warm dark (not cold black)*

Background: `#111008`. The only true dark section on the page.
All text switches to `--color-inversion-text` (`#F0EDE6`).
Eyebrow label in `--color-accent-amber`.
SVG flow diagram uses amber and orange strokes on dark.

**Flow diagram structure (Home page):**
```
[Signal Captured] ──── [Transmitted] ──── [Analysed] ──── [You're Alerted]
     Fiber/IoT              Network           Nova              Mobile/NOC
     sensor icon            line icon         Context icon      alert icon
```

Each node draws in sequence via stroke-dashoffset as the user scrolls.
Connection lines draw between nodes after each node appears.
Timing: 400ms per node, 300ms per connection, 200ms stagger.

---

### 4.8 CTA Footer Band
*Source: Gradient Labs — full-bleed orange CTA block*  
*Adaptation: Altics copy, two-button layout, cream/white on orange*

Background: `#E8622A`. Full-bleed, edge-to-edge.
Primary headline: Syne 800, 48–56px, `#FFFFFF`.
Sub-copy: Instrument Sans 400, 17px, `rgba(255,255,255,0.8)`.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   Your infrastructure is running right now.          │
│   Is anyone watching it?                             │
│                                                      │
│   [ Schedule a Demo ]    [ Explore Solutions ]       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Button styles on orange background:
- Primary: White fill, `#E8622A` text, `--radius-button`
- Secondary: Transparent, white border, white text, `--radius-button`

---

### 4.9 Navigation Bar
*Source: Synthesised from all references — minimal, sticky*

**Default state:** Transparent background, `--color-text-primary` links, cream or transparent fill.
**Scrolled state:** `rgba(247,243,236,0.92)` with `backdrop-filter: blur(12px)`, subtle bottom border.

```
Altics Monitoring    Products    Solutions    About    Contact    [ Book a Demo ]
```

- Logo: Syne 700, 18px
- Nav links: Instrument Sans 500, 14px, `--color-text-primary`
- CTA button: Orange fill, white text, `--radius-button`, 14px Instrument Sans
- Mobile: Hamburger → full-screen overlay, cream background, large nav links

---

## PART 5: PAGE-BY-PAGE SECTION ARCHITECTURE

### Home Page (/)
```
1. Navbar (transparent → sticky)
2. Hero — [120px padding top]
   - Eyebrow: — INTELLIGENT MONITORING
   - Headline: "Zero blind spots. Zero downtime."
   - Sub: 2-line Instrument Sans description
   - CTA buttons: Primary + Secondary
   - Hero visual: Animated SVG fiber network mesh (ambient, right-aligned)
3. ASCII texture strip (full-bleed)
4. Logo ticker — client/partner logos
5. Section pause: "What if your infrastructure could diagnose itself?"
6. Problem narrative — 01 / 02 / 03 scroll sequence
7. Products bento grid — 4 animated product cards [PRD separate]
8. Stats strip — 4 key metrics in JetBrains Mono
9. How It Works — dark inversion, SVG flow diagram
10. Testimonials — 2–3 editorial quotes
11. CTA band — orange full-bleed
12. Footer — dark (#111008), link grid
```

### Services Page (/services)
```
1. Navbar
2. Page hero — smaller than Home, left-aligned
3. Products overview — tabbed or 4-card grid (Zerohash tab pattern)
4. Per-product deep-dive — alternating left/right layout, proof visual each
5. CTA band
6. Footer
```

### Product Pages (/rftm, /pids, /iot, /nova-context)
```
1. Navbar
2. Product hero — headline, 1-line description, product-specific SVG
3. "The problem it solves" — single problem narrative (one step, not three)
4. Features — bento grid of 3–4 feature cards
5. How it works — dark inversion, product-specific SVG flow
6. Technical specs — monospaced data table
7. CTA band
8. Footer
```

---

## PART 6: WHAT EACH REFERENCE CONTRIBUTES (Master Map)

| Pattern | From | Used On | What It Does |
|---|---|---|---|
| Numbered scroll sequence | Maze | Home (problem narrative) | Creates narrative momentum, forces attention |
| Left/right proof layout | Maze | Problem narrative, product pages | Pairs claim with visual evidence |
| Sparse pause section | Maze | Home (between ticker and narrative) | Gives the reader a moment to sit with the tension |
| SVG self-drawing flow diagram | Maze | Home + each product page | Shows process unfolding, not just stating it |
| Bento grid cards | Gradient Labs | Home (products), Services | Visual hierarchy without a rigid table |
| Warm stat callout | Gradient Labs | Stats strip | Makes numbers feel alive, not listed |
| Orange CTA band | Gradient Labs | All pages | High-contrast close that demands action |
| Editorial hero scale | Hiro | All hero sections | Authority through scale — feels like a statement |
| ASCII texture strip | Hiro | Home (below hero) | Signals technical depth, brand signature |
| Section breathing room | Hiro | All pages | Gravitas through space, not decoration |
| Mono stat grid | Zerohash | Stats strip | Technical credibility — data readout aesthetic |
| Tabbed product section | Zerohash | Services page | Organises 4 products without overwhelming |
| Narrative beat question | Original | Home (multiple) | The "invisible problem" hook — Altics-specific |

---

## PART 7: THINGS THIS DESIGN NEVER DOES

To maintain coherence, the following are explicitly prohibited across all pages and components:

- ❌ Pure black (`#000000`) or pure white (`#FFFFFF`) backgrounds
- ❌ Blue, navy, or purple in any form — these are competitor colours
- ❌ Drop shadows heavier than `0 8px 32px rgba(x,x,x,0.08)`
- ❌ More than one orange element per viewport (outside the CTA band)
- ❌ Decorative animations — every motion must communicate something
- ❌ Generic SaaS copy ("unlock", "leverage", "seamless", "powerful", "next-gen")
- ❌ More than two dark sections on any single page
- ❌ Carousel or auto-playing sliders of any kind
- ❌ Photography — product is abstract; SVG diagrams and data visualisations only
- ❌ Gradients on backgrounds — flat colour surfaces only; gradients only within SVG elements
- ❌ Border radius above 24px or below 8px on any interactive element
- ❌ Font sizes between 20px and 32px for display text (jump from body to headline scale)

---

*Design Language Version: 1.0 | Project: Altics Monitoring Website | Last Updated: Feb 2026*  
*This document is the source of truth for all visual and interaction decisions.*  
*All PRDs must reference this document. No PRD may contradict it without a version update here first.*
