
"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    end: string;
    duration?: number;
}

export default function CountUp({ end, duration = 2000 }: CountUpProps) {
    const [display, setDisplay] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animateCount();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const animateCount = () => {
        // Extract numeric value and suffix (e.g., "3+" → 3 and "+", "100%" → 100 and "%")
        const match = end.match(/^([+]?)(\d+)(.*)$/);
        if (!match) {
            setDisplay(end);
            return;
        }

        const prefix = match[1];
        const numericTarget = parseInt(match[2]);
        const suffix = match[3];

        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);

            if (progress < 1) {
                setDisplay(`${prefix}${current}${suffix}`);
                requestAnimationFrame(tick);
            } else {
                setDisplay(end);
            }
        };

        requestAnimationFrame(tick);
    };

    return <span ref={ref}>{display}</span>;
}
