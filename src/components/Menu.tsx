"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import lunch from "../assets/reviews/hibachi-steak-shrimp.jpg";
import dinner from "../assets/reviews/sushi-sashimi-combo.jpg";
import { ClockIcon } from "./icons";

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
    <section id="menu" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
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
              className="overflow-hidden rounded-2xl bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
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
      </div>
    </section>
  );
}

export default Menu;
