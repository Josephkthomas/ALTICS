import { useState, useEffect, useCallback, useRef } from 'react';

export default function useProblemCycle({ cycleDuration = 6000, totalItems = 4, autoStart = false }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(!autoStart);

    const startTimeRef = useRef(null);
    const progressSnapshotRef = useRef(0);
    const requestRef = useRef(null);
    const progressRef = useRef(0);
    const lastUpdateRef = useRef(0);

    const goTo = useCallback((index) => {
        setActiveIndex(index);
        setProgress(0);
        progressRef.current = 0;
        progressSnapshotRef.current = 0;
        startTimeRef.current = performance.now();
    }, []);

    const next = useCallback(() => {
        goTo((activeIndex + 1) % totalItems);
    }, [activeIndex, totalItems, goTo]);

    const prev = useCallback(() => {
        goTo((activeIndex - 1 + totalItems) % totalItems);
    }, [activeIndex, totalItems, goTo]);

    const pause = useCallback(() => {
        // Snapshot current progress before pausing
        progressSnapshotRef.current = progressRef.current;
        setIsPaused(true);
    }, []);

    const resume = useCallback(() => {
        if (!isPaused) return;
        startTimeRef.current = performance.now();
        setIsPaused(false);
    }, [isPaused]);

    useEffect(() => {
        if (isPaused) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        const animate = (time) => {
            if (!startTimeRef.current) startTimeRef.current = time;

            const deltaTime = time - startTimeRef.current;
            const totalProgress = progressSnapshotRef.current + (deltaTime / cycleDuration);

            if (totalProgress >= 1) {
                next();
            } else {
                progressRef.current = totalProgress;
                // Throttle React state updates to ~20fps for timer ring
                if (time - lastUpdateRef.current > 50) {
                    setProgress(totalProgress);
                    lastUpdateRef.current = time;
                }
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPaused, cycleDuration, next]);

    // When autoStart changes (like when scrolled into view)
    useEffect(() => {
        if (autoStart) {
            setIsPaused(false);
            startTimeRef.current = performance.now();
            progressSnapshotRef.current = 0;
            progressRef.current = 0;
            setProgress(0);
        } else {
            setIsPaused(true);
        }
    }, [autoStart]);

    return { activeIndex, progress, goTo, next, prev, pause, resume };
}
