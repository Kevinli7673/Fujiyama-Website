"use client";

import { useEffect, useState } from "react";

const START_OPACITY = 0.3; // darkness at the top (matches the old hero overlay)
const END_OPACITY = 0.15; // darkness floor at the bottom — never fully clear

function ScrollOverlay() {
    const [progress, setProgress] = useState(0); // 0 at top → 1 at bottom

    useEffect(() => {
        const onScroll = () => {
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        };

        onScroll(); // set correct value if the page loads mid-scroll
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none"
            aria-hidden="true"
            style={{
                // interpolate: START at top → END at bottom, always > 0
                backgroundColor: `rgba(0, 0, 0, ${
                    START_OPACITY - progress * (START_OPACITY - END_OPACITY)
                })`,
            }}
        />
    );
}

export default ScrollOverlay;
