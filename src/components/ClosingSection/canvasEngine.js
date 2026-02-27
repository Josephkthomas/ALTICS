// ============================================================
// Network Pulse Grid — Pure JS Canvas Animation Engine
// Layers: 1) Dot Grid  2) Sonar Pulses  3) Fiber Traces  4) CTA Junction
// ============================================================

let ctx, canvasEl, dpr;
let width = 0, height = 0;
let gridSpacing = 32;
let dots = [];
let rafId = null;
let visible = false;
let getButtonsRectFn = null;
let resizeTimer = null;
let onResizeBound = null;

// --- Layer 2: Pulses ---
let pulses = [];
let lastPulseTime = 0;
const PULSE_INTERVAL = 2200;
const MAX_PULSES = 3;
const PULSE_SPEED = 80;        // px/sec
const PULSE_RING_WIDTH = 20;   // px — dots within this of wavefront brighten
const PULSE_BRIGHTNESS = 0.35;

// --- Layer 3: Fiber Traces ---
const TRACE_COUNT = 5;
const TRACE_TAIL_LEN = 90;
let traces = [];

// --- Layer 4: CTA Junction ---
let junctionPaths = null;     // { top: [{x,y}], bottom: [{x,y}] }
let junctionTraces = [];
const JUNCTION_TRACES_PER_BRANCH = 6;   // 6 top + 6 bottom = 12 uniform streams
const JUNCTION_TAIL_LEN = 70;           // compact signal packets
const JUNCTION_SPEED = 2.0;             // single uniform speed for all traces

// ============================================================
// GRID
// ============================================================

function snapToGrid(v) {
  return Math.round(v / gridSpacing) * gridSpacing + gridSpacing / 2;
}

function buildGrid() {
  const isMobile = width < 768;
  gridSpacing = isMobile ? 24 : 32;

  dots = [];
  const cols = Math.ceil(width / gridSpacing) + 1;
  const rows = Math.ceil(height / gridSpacing) + 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({
        x: gridSpacing / 2 + c * gridSpacing,
        y: gridSpacing / 2 + r * gridSpacing,
        baseAlpha: 0.14,
        alpha: 0.14,
        extraRadius: 0,
      });
    }
  }
}

function resetDots() {
  for (const d of dots) {
    d.alpha = d.baseAlpha;
    d.extraRadius = 0;
  }
}

function drawDots() {
  for (const d of dots) {
    ctx.beginPath();
    ctx.arc(d.x, d.y, (1.8 + d.extraRadius), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${d.alpha})`;
    ctx.fill();
  }
}

// ============================================================
// PULSES
// ============================================================

function spawnPulse(ts) {
  if (pulses.length >= MAX_PULSES || dots.length === 0) return;
  const origin = dots[Math.floor(Math.random() * dots.length)];
  pulses.push({
    cx: origin.x,
    cy: origin.y,
    radius: 0,
    maxRadius: 120 + Math.random() * 60,
    startTime: ts,
  });
}

function updatePulses(ts) {
  if (ts - lastPulseTime > PULSE_INTERVAL) {
    spawnPulse(ts);
    lastPulseTime = ts;
  }

  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    p.radius = ((ts - p.startTime) / 1000) * PULSE_SPEED;

    if (p.radius > p.maxRadius) {
      pulses.splice(i, 1);
      continue;
    }

    const fade = 1 - p.radius / p.maxRadius;

    // Brighten dots near the wavefront
    for (const d of dots) {
      const dx = d.x - p.cx;
      const dy = d.y - p.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ringDist = Math.abs(dist - p.radius);
      if (ringDist < PULSE_RING_WIDTH) {
        const intensity = 1 - ringDist / PULSE_RING_WIDTH;
        const boost = intensity * fade * PULSE_BRIGHTNESS;
        d.alpha = Math.min(1, Math.max(d.alpha, d.baseAlpha + boost));
        if (boost > 0.1) d.extraRadius = Math.max(d.extraRadius, boost * 1.5);
      }
    }
  }
}

function drawPulses() {
  for (const p of pulses) {
    const fade = 1 - p.radius / p.maxRadius;
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, p.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${0.04 * fade})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// ============================================================
// FIBER TRACES
// ============================================================

function buildTracePath(canvasW, canvasH) {
  const cols = Math.ceil(canvasW / gridSpacing) + 2;
  const maxRow = Math.floor(canvasH / gridSpacing);
  let row = Math.floor(Math.random() * maxRow);

  const numTurns = 2 + Math.floor(Math.random() * 2); // 2-3
  const turnCols = [];
  for (let t = 0; t < numTurns; t++) {
    turnCols.push(Math.floor(cols * (0.15 + Math.random() * 0.7)));
  }
  turnCols.sort((a, b) => a - b);

  const waypoints = [];
  let turnIdx = 0;

  for (let c = -1; c < cols; c++) {
    const x = gridSpacing / 2 + c * gridSpacing;
    const y = gridSpacing / 2 + row * gridSpacing;
    waypoints.push({ x, y });

    if (turnIdx < turnCols.length && c === turnCols[turnIdx]) {
      // Vertical step: 1-2 rows up or down
      const dir = Math.random() < 0.5 ? -1 : 1;
      const shift = 1 + Math.floor(Math.random() * 2);
      const newRow = Math.max(0, Math.min(maxRow, row + dir * shift));
      const step = newRow > row ? 1 : -1;
      for (let r = row + step; step > 0 ? r <= newRow : r >= newRow; r += step) {
        waypoints.push({ x, y: gridSpacing / 2 + r * gridSpacing });
      }
      row = newRow;
      turnIdx++;
    }
  }

  return waypoints;
}

function createTrace() {
  return {
    waypoints: buildTracePath(width, height),
    cursor: 0,
    speed: 1.6 + Math.random() * 0.4,
    trail: [],
  };
}

function initTraces() {
  traces = [];
  for (let i = 0; i < TRACE_COUNT; i++) {
    const t = createTrace();
    // Stagger start positions so they don't all begin at the left edge
    t.cursor = Math.random() * t.waypoints.length * 0.5;
    traces.push(t);
  }
}

function interpolateWaypoints(wps, cursor) {
  const idx = Math.floor(cursor);
  if (idx < 0) return wps[0];
  if (idx >= wps.length - 1) return wps[wps.length - 1];
  const frac = cursor - idx;
  return {
    x: wps[idx].x + (wps[idx + 1].x - wps[idx].x) * frac,
    y: wps[idx].y + (wps[idx + 1].y - wps[idx].y) * frac,
  };
}

function updateTraces() {
  for (const t of traces) {
    t.cursor += t.speed / gridSpacing * 2;
    const pos = interpolateWaypoints(t.waypoints, t.cursor);
    t.trail.push(pos);
    if (t.trail.length > TRACE_TAIL_LEN) t.trail.shift();

    // Respawn when head exits right
    if (t.cursor >= t.waypoints.length) {
      const nt = createTrace();
      t.waypoints = nt.waypoints;
      t.cursor = 0;
      t.speed = nt.speed;
      t.trail = [];
    }
  }
}

function drawTraces() {
  for (const t of traces) {
    const len = t.trail.length;
    if (len < 2) continue;

    // Draw tail segments
    for (let i = 1; i < len; i++) {
      const ratio = i / len;
      const alpha = ratio * ratio * 0.1;
      const w = 0.3 + ratio * 0.5;
      ctx.beginPath();
      ctx.moveTo(t.trail[i - 1].x, t.trail[i - 1].y);
      ctx.lineTo(t.trail[i].x, t.trail[i].y);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Head glow
    const head = t.trail[len - 1];
    const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
    grd.addColorStop(0, 'rgba(255,255,255,0.25)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Head dot
    ctx.beginPath();
    ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();
  }
}

// ============================================================
// CTA JUNCTION — Split-Merge Flow
// ============================================================

function buildJunctionWaypoints(branch, btnRect) {
  if (!btnRect) return null;

  // Use exact button geometry — no grid snapping for precise alignment
  const centerY = btnRect.top + btnRect.height / 2;
  const splitX = btnRect.left - gridSpacing * 1.5;
  const mergeX = btnRect.right + gridSpacing;  // converge right after Explore Solutions

  const branchY = branch === 'top'
    ? btnRect.top - gridSpacing
    : btnRect.bottom + gridSpacing;

  const waypoints = [];
  const step = gridSpacing;  // waypoint density

  // 1. Entry: left edge → split point (straight horizontal)
  for (let x = -step; x <= splitX; x += step) {
    waypoints.push({ x, y: centerY });
  }
  waypoints.push({ x: splitX, y: centerY }); // exact split point

  // 2. Vertical split: centerY → branchY
  const splitSteps = Math.max(1, Math.round(Math.abs(branchY - centerY) / step));
  for (let i = 1; i <= splitSteps; i++) {
    const t = i / splitSteps;
    waypoints.push({ x: splitX, y: centerY + (branchY - centerY) * t });
  }

  // 3. Horizontal bypass: splitX → mergeX along branchY
  for (let x = splitX + step; x < mergeX; x += step) {
    waypoints.push({ x, y: branchY });
  }
  waypoints.push({ x: mergeX, y: branchY }); // exact merge point

  // 4. Vertical merge: branchY → centerY
  for (let i = 1; i <= splitSteps; i++) {
    const t = i / splitSteps;
    waypoints.push({ x: mergeX, y: branchY + (centerY - branchY) * t });
  }

  // 5. Exit: mergeX → right edge (straight horizontal)
  for (let x = mergeX + step; x <= width + step; x += step) {
    waypoints.push({ x, y: centerY });
  }

  return waypoints;
}

function calcJunction() {
  const rect = getButtonsRectFn?.();
  if (!rect || rect.width === 0) {
    junctionPaths = null;
    junctionTraces = [];
    return;
  }

  const topWps = buildJunctionWaypoints('top', rect);
  const bottomWps = buildJunctionWaypoints('bottom', rect);

  if (!topWps || !bottomWps) {
    junctionPaths = null;
    junctionTraces = [];
    return;
  }

  junctionPaths = { top: topWps, bottom: bottomWps };

  // Create evenly-spaced, uniform-speed streams for each branch
  junctionTraces = [];
  for (let i = 0; i < JUNCTION_TRACES_PER_BRANCH; i++) {
    const offset = (i / JUNCTION_TRACES_PER_BRANCH) * topWps.length;

    junctionTraces.push({
      waypoints: topWps,
      cursor: offset,
      trail: [],
      speed: JUNCTION_SPEED,
    });
    junctionTraces.push({
      waypoints: bottomWps,
      cursor: offset,
      trail: [],
      speed: JUNCTION_SPEED,
    });
  }
}

function updateJunction() {
  for (const jt of junctionTraces) {
    jt.cursor += jt.speed / gridSpacing * 2;
    const pos = interpolateWaypoints(jt.waypoints, jt.cursor);
    jt.trail.push(pos);
    if (jt.trail.length > JUNCTION_TAIL_LEN) jt.trail.shift();

    // Loop continuously: respawn at left edge
    if (jt.cursor >= jt.waypoints.length) {
      jt.cursor = 0;
      jt.trail = [];
    }
  }
}

function drawJunction() {
  if (!junctionPaths) return;

  for (const jt of junctionTraces) {
    const len = jt.trail.length;
    if (len < 2) continue;

    // Draw tail — bright but compact for dense stream feel
    for (let i = 1; i < len; i++) {
      const ratio = i / len;
      const alpha = ratio * ratio * 0.35;
      const w = 0.4 + ratio * 1.2;
      ctx.beginPath();
      ctx.moveTo(jt.trail[i - 1].x, jt.trail[i - 1].y);
      ctx.lineTo(jt.trail[i].x, jt.trail[i].y);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Head glow — tight and punchy
    const head = jt.trail[len - 1];
    const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
    grd.addColorStop(0, 'rgba(255,255,255,0.6)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Head dot
    ctx.beginPath();
    ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  }
}

// ============================================================
// MAIN LOOP
// ============================================================

function draw(ts) {
  rafId = requestAnimationFrame(draw);

  if (!visible) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.scale(dpr, dpr);

  resetDots();
  updatePulses(ts);
  drawDots();
  drawPulses();

  updateTraces();
  drawTraces();

  updateJunction();
  drawJunction();
}

// ============================================================
// RESIZE
// ============================================================

function resize() {
  if (!canvasEl || !canvasEl.parentElement) return;

  dpr = window.devicePixelRatio || 1;
  const rect = canvasEl.parentElement.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  canvasEl.width = width * dpr;
  canvasEl.height = height * dpr;
  canvasEl.style.width = width + 'px';
  canvasEl.style.height = height + 'px';

  buildGrid();
  initTraces();
  calcJunction();
}

// ============================================================
// PUBLIC API
// ============================================================

export function init(canvas, getButtonsRect) {
  canvasEl = canvas;
  ctx = canvas.getContext('2d');
  getButtonsRectFn = getButtonsRect;

  resize();
  rafId = requestAnimationFrame(draw);

  onResizeBound = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  };
  window.addEventListener('resize', onResizeBound);
}

export function setVisible(v) {
  visible = v;
  // Recalculate junction when becoming visible (buttons may have moved)
  if (v && getButtonsRectFn) calcJunction();
}

export function cleanup() {
  if (rafId) cancelAnimationFrame(rafId);
  if (onResizeBound) window.removeEventListener('resize', onResizeBound);
  clearTimeout(resizeTimer);
  // Reset state
  dots = [];
  pulses = [];
  traces = [];
  junctionPaths = null;
  junctionTraces = [];
  rafId = null;
  canvasEl = null;
  ctx = null;
}
