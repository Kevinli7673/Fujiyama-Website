"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import lunch from "../assets/reviews/hibachi-steak-shrimp.jpg";
import dinner from "../assets/reviews/sushi-sashimi-combo.jpg";
import { ClockIcon } from "./icons";
import { FanArt, SeigaihaArt, SideDecor } from "./decor";
import TiltedCard from "./TiltedCard";

const highlights = [
  {
    label: "Lunch",
    hours: "Tue–Sat · 11:00 AM – 3:00 PM",
    title: "Hibachi Steak & Shrimp",
    description:
      "Grilled steak and shrimp served with fried rice and fresh vegetables — a Fujiyama lunch favorite, cooked fresh in our kitchen.",
    image: lunch,
    alt: "Hibachi steak and shrimp with fried rice and vegetables",
  },
  {
    label: "Dinner",
    hours: null,
    title: "Sushi & Sashimi Combo",
    description:
      "Hand-rolled sushi and fresh-cut sashimi, prepared to order by our sushi chefs. The perfect way to end the day.",
    image: dinner,
    alt: "Sushi rolls and sashimi combo platter",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-card py-24 md:py-32">
      <SideDecor side="left" className="-left-14 bottom-16 w-48 md:w-64">
        <SeigaihaArt className="w-full" />
      </SideDecor>
      <SideDecor side="right" className="-right-10 top-20 w-36 md:w-48">
        <FanArt className="w-full" />
      </SideDecor>
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink">
            Menu Highlights
          </span>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            From Lunch to Dinner
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-body">
            Whether you stop in for a quick hibachi lunch or settle in for
            sushi at dinner, everything is made fresh when you order it.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {highlights.map(({ label, hours, title, description, image, alt }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="overflow-hidden rounded-2xl bg-paper"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <TiltedCard
                  imageSrc={image.src}
                  altText={alt}
                  captionText={title}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={8}
                  scaleOnHover={1.04}
                  showMobileWarning={false}
                  showTooltip={false}
                  borderRadius="0px"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-ink">
                  {label}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {title}
                </h3>
                {hours && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    <ClockIcon className="h-4 w-4" />
                    {hours}
                  </p>
                )}
                <p className="mt-2.5 text-sm leading-relaxed text-body">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Menu;
