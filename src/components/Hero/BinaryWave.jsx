import { useEffect, useRef } from 'react';

const DEFAULTS = {
  fontSize: 11,
  colSpacing: 18,
  colSpacingMobile: 22,
  digitColor: 'rgba(26,22,18,0.18)',
  waveAmplitude: 0.12,       // how much the boundary undulates
  flipChance: 0.012,
  speed: 0.013,
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 500,
  ellipseRx: 0.48,           // horizontal radius (fraction of half-width)
  ellipseRy: 0.30,           // vertical radius (fraction of half-height)
};

export default function BinaryWave(props) {
  const config = { ...DEFAULTS, ...props };
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const phaseRef = useRef(null);
  const digitsRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function calcGrid() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      const isMobile = w < 768;
      const colPx = isMobile ? config.colSpacingMobile : config.colSpacing;
      const rowPx = Math.round(config.fontSize * 1.636);
      const cols = Math.floor(w / colPx);
      const rows = Math.floor(h / rowPx);
      return { cols, rows, colPx, rowPx, dpr, width: w, height: h };
    }

    function initGrid(cols, rows) {
      const grid = [];
      for (let c = 0; c < cols; c++) {
        const col = [];
        for (let r = 0; r < rows; r++) {
          col.push(Math.random() < 0.5 ? 0 : 1);
        }
        grid.push(col);
      }
      return grid;
    }

    function initPhases(cols) {
      const phases = [];
      for (let c = 0; c < cols; c++) {
        phases.push(Math.random() * Math.PI * 2);
      }
      return phases;
    }

    function resize() {
      const g = calcGrid();
      gridRef.current = g;

      canvas.width = g.width * g.dpr;
      canvas.height = g.height * g.dpr;
      canvas.style.width = g.width + 'px';
      canvas.style.height = g.height + 'px';

      const oldPhases = phaseRef.current;
      if (!oldPhases || oldPhases.length !== g.cols) {
        const newPhases = initPhases(g.cols);
        if (oldPhases) {
          for (let i = 0; i < Math.min(oldPhases.length, g.cols); i++) {
            newPhases[i] = oldPhases[i];
          }
        }
        phaseRef.current = newPhases;
      }

      digitsRef.current = initGrid(g.cols, g.rows);
    }

    function draw() {
      const g = gridRef.current;
      if (!g) return;

      tRef.current += config.speed;
      const t = tRef.current;
      const phases = phaseRef.current;
      const digits = digitsRef.current;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(g.dpr, g.dpr);
      ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = config.digitColor;

      const centerX = g.width / 2;
      const centerY = g.height / 2;
      const halfW = g.width / 2;
      const halfH = g.height / 2;
      const rx = config.ellipseRx;
      const ryBase = halfH * config.ellipseRy;

      for (let c = 0; c < g.cols; c++) {
        const colX = c * g.colPx + g.colPx / 2;

        // Normalized horizontal distance from center (-1 to 1)
        const nx = (colX - centerX) / halfW;

        // Ellipse boundary: how much vertical clearance at this column
        const ellipseVal = 1 - (nx * nx) / (rx * rx);
        const baseClearY = ellipseVal > 0 ? Math.sqrt(ellipseVal) * ryBase : 0;

        // Sine wave modulates the boundary for organic movement
        const waveOffset = (Math.sin(t + phases[c]) + 1) / 2;
        const modulation = waveOffset * config.waveAmplitude * halfH;
        const clearY = baseClearY + modulation;

        // Convert to row indices
        const centerRow = Math.floor(g.rows / 2);
        const topBoundary = Math.max(0, Math.floor((centerY - clearY) / g.rowPx));
        const bottomBoundary = Math.min(g.rows - 1, Math.ceil((centerY + clearY) / g.rowPx));

        // Draw top portion (row 0 down to topBoundary)
        for (let r = 0; r < topBoundary; r++) {
          if (Math.random() < config.flipChance) {
            digits[c][r] ^= 1;
          }
          const x = colX;
          const y = r * g.rowPx + g.rowPx / 2;
          ctx.fillText(digits[c][r], x, y);
        }

        // Draw bottom portion (bottomBoundary to last row)
        for (let r = bottomBoundary + 1; r < g.rows; r++) {
          if (Math.random() < config.flipChance) {
            digits[c][r] ^= 1;
          }
          const x = colX;
          const y = r * g.rowPx + g.rowPx / 2;
          ctx.fillText(digits[c][r], x, y);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      className="binary-canvas-ellipse"
      aria-hidden="true"
    />
  );
}
