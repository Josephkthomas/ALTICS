import { useEffect, useRef } from 'react';

export function useReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        const currentRef = ref.current;

        // If it's a ref to a single DOM element
        if (currentRef && currentRef.nodeType === 1) {
            // It might be the group container or a single reveal element
            if (currentRef.classList.contains('reveal')) {
                observer.observe(currentRef);
            } else {
                // Find all internal reveals
                const reveals = currentRef.querySelectorAll('.reveal');
                reveals.forEach((el) => observer.observe(el));
            }
        }

        return () => {
            if (currentRef && currentRef.nodeType === 1) {
                if (currentRef.classList.contains('reveal')) {
                    observer.unobserve(currentRef);
                } else {
                    const reveals = currentRef.querySelectorAll('.reveal');
                    reveals.forEach((el) => observer.unobserve(el));
                }
            }
        };
    }, []);

    return ref;
}
