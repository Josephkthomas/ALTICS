import { useRef, useEffect } from 'react';
import { init, setVisible, cleanup } from './canvasEngine';

export default function NetworkCanvas({ buttonsRef }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const getButtonsRect = () => {
      if (!buttonsRef?.current || !canvas.parentElement) return null;
      const parent = canvas.parentElement.getBoundingClientRect();
      const buttons = buttonsRef.current.getBoundingClientRect();
      return {
        top: buttons.top - parent.top,
        left: buttons.left - parent.left,
        right: buttons.right - parent.left,
        bottom: buttons.bottom - parent.top,
        width: buttons.width,
        height: buttons.height,
      };
    };

    init(canvas, getButtonsRect);

    // Continuous visibility observer (enter + exit, not fire-once)
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [buttonsRef]);

  return (
    <div ref={wrapRef} className="closing-cta__canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
