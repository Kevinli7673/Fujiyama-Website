"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "./Nav";
import bgImage from "../assets/hero-bg.jpg";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
} from "./icons";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

function Hero() {
  // Fade the scroll hint out over the first 300px of scrolling
  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex min-h-svh flex-col">
      {/* Background photo + dark overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Nav />

      {/* Centered hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-ink"
        >
          <StarIcon className="h-3.5 w-3.5" />
          Family Owned · Est. 2016
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mt-6 max-w-4xl text-balance text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Fujiyama Japanese Steakhouse
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-5 max-w-2xl text-pretty text-base text-white/85 md:text-lg"
        >
          Hibachi cooked fresh, hand-rolled sushi, and nearly a decade of
          family tradition in the heart of Bushnell, Florida.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4" />
            2571 E County Road 48, Bushnell, FL
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            Open Tue–Sun
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <a
            href="tel:+13525691017"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-neutral-200 sm:w-auto"
          >
            <CalendarIcon className="h-4 w-4" />
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            View Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll hint — fades out as the user scrolls */}
      <motion.a
        href="#story"
        aria-label="Scroll to Our Story"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80"
        style={{ opacity: scrollHintOpacity }}
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDownIcon className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}

export default Hero;
