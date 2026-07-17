"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import sushi from "../assets/sushi.png";
import hibachi from "../assets/reviews/hibachi-shrimp-rice.jpg";
import sashimi from "../assets/reviews/sashimi.jpg";
import specialtyRolls from "../assets/reviews/specialty-rolls.jpg";
import { FishIcon, FlameIcon, HeartIcon, UsersIcon } from "./icons";

const features = [
  {
    icon: FlameIcon,
    title: "Hibachi Grill",
    description: "Classic hibachi favorites, cooked fresh off the grill",
  },
  {
    icon: FishIcon,
    title: "Hand-Rolled Sushi",
    description: "Fresh ingredients, rolled to order every single day",
  },
  {
    icon: UsersIcon,
    title: "Family Owned",
    description: "Opened and run by the same family since 2016",
  },
  {
    icon: HeartIcon,
    title: "Made with Care",
    description: "Built on hard work — and you can taste it",
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

function Story() {
  return (
    <section id="story" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:px-8 lg:grid-cols-2">
        {/* Text column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink">
            Est. 2016
          </span>

          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            A Family Tradition in Bushnell
          </h2>

          <p className="mt-6 text-pretty leading-relaxed text-body">
            Fujiyama was opened in 2016 by a family who came here with recipes,
            long hours, and a belief that good food speaks for itself. Nearly a
            decade later, it&apos;s still family run and still made the same
            way.
          </p>

          <p className="mt-4 text-pretty leading-relaxed text-body">
            Fresh ingredients, hand-rolled sushi, and hibachi cooked with care.
            We built this place on hard work, and you can taste it in every
            dish.
          </p>

          {/* Feature cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl bg-card p-6">
                <Icon className="h-6 w-6 text-ink" />
                <h3 className="mt-4 text-sm font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Staggered photo collage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <Image
              src={sushi}
              alt="Hand-rolled sushi at Fujiyama"
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
            <Image
              src={sashimi}
              alt="Fresh-cut salmon and tuna sashimi"
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="mt-12 space-y-4">
            <Image
              src={hibachi}
              alt="Hibachi shrimp with fried rice and vegetables"
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
            <Image
              src={specialtyRolls}
              alt="Specialty sushi rolls drizzled with sauce"
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Story;
