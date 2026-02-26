import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export function CountUp({ target, duration = 1200, suffix = '', prefix = '' }) {
  const [ref, triggered] = useIntersectionObserver(0.15);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [triggered, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{typeof target === 'number' && target >= 1000 ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

export default CountUp;
