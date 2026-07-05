"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sushi from "../assets/sushi.png";

function Story() {
    const sectionRef = useRef(null);

    // 0 when the section's top enters the viewport bottom → 1 when the section fills the viewport
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    // Image reveal: fade in + wipe open from the left across the full entry scroll
    const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const imageClip = useTransform(
        scrollYProgress,
        [0, 1],
        ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
    );

    return (
        // Transparent section — the page's fixed background shows through behind the card
        <section
            id="story"
            ref={sectionRef}
            className="flex items-center justify-center"
            style={{
                minHeight: "100svh",
                padding: "clamp(1rem, 7.8vw, 12.5rem)",
            }}
        >
            {/* Step 2: frosted-glass card — translucent bg + blur, NOT opacity */}
            <div
                className="flex w-full max-w-[1150px] flex-col items-center gap-10 rounded-3xl bg-[#faf7f2]/70 backdrop-blur-[17.5px] lg:flex-row lg:items-center lg:justify-between lg:gap-0"
                style={{
                    padding:
                        "clamp(1.5rem, 3vw, 4rem) clamp(1.25rem, 2.5vw, 3.5rem)",
                }}
            >
                {/* Step 3: text column — 46% of card on desktop, full width stacked on mobile */}
                <div
                    className="flex flex-col lg:w-[46%]"
                    style={{ gap: "clamp(1.25rem, 1.8vw, 2.5rem)" }}
                >
                    <h2
                        className="text-black"
                        style={{
                            fontFamily: "var(--font-instrument-serif), Georgia, serif",
                            fontWeight: 400,
                            fontSize: "clamp(2rem, 2.8vw, 4rem)",
                        }}
                    >
                        Our Story
                    </h2>
                    <p
                        className="text-[#5a564f]"
                        style={{
                            fontFamily: "var(--font-instrument-sans), ui-sans-serif, sans-serif",
                            fontSize: "clamp(1.0625rem, 1.25vw, 1.5rem)",
                            lineHeight: 1.6,
                        }}
                    >
                        Fujiyama was opened in 2016 by a family who came here with recipes, long hours, and a belief that good food speaks
                        for itself. Nearly a decade later, it&apos;s still family run and still made the same way: fresh ingredients, hand-rolled
                        sushi, and hibachi cooked with care. We built this place on hard work, and you can taste it.
                    </p>

                    {/* View Menu button — copied from Hero, white → red */}
                    <a
                        href="#"
                        className="flex items-center justify-center self-start text-[#c0272d] transition-colors hover:bg-[#c0272d]/10"
                        style={{
                            fontFamily: "var(--font-instrument-sans), ui-sans-serif, sans-serif",
                            fontWeight: 400,
                            fontSize: "clamp(1rem, 1.15vw, 1.375rem)",
                            border: "3px solid #c0272d",
                            borderRadius: "40px",
                            paddingTop: "clamp(0.625rem, 1vw, 1.25rem)",
                            paddingBottom: "clamp(0.625rem, 1vw, 1.25rem)",
                            paddingLeft: "clamp(1.5rem, 2.3vw, 3rem)",
                            paddingRight: "clamp(1.5rem, 2.3vw, 3rem)",
                        }}
                    >
                        View Menu
                    </a>
                </div>

                {/* Step 4: image — scroll-linked reveal (fade + left-to-right wipe) */}
                <motion.div
                    className="w-full lg:w-[45%]"
                    style={{ opacity: imageOpacity, clipPath: imageClip }}
                >
                    <Image
                        src={sushi}
                        alt="Hand-rolled sushi at Fujiyama"
                        className="h-auto w-full rounded-3xl object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default Story
