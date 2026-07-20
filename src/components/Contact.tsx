"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
} from "./icons";
import { FujiArt, LanternArt, SideDecor } from "./decor";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Fujiyama+Japanese+Steakhouse+2571+E+County+Road+48+Bushnell+FL+33513";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function InfoCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-paper p-6 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-ink">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-body">{children}</div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-paper py-24 md:py-32">
      <SideDecor side="right" className="-right-12 bottom-10 w-52 md:w-72">
        <FujiArt className="w-full" />
      </SideDecor>
      <SideDecor side="left" className="-left-6 top-24 w-24 md:w-32">
        <LanternArt className="w-full" />
      </SideDecor>
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Centered header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink">
            Visit Us
          </span>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Location &amp; Contact
          </h2>
          <p className="mt-5 text-pretty text-body">
            Find us on County Road 48 in Bushnell — an easy stop off I-75. We
            look forward to cooking for you.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-8 lg:grid-cols-2"
        >
          {/* Info cards + actions */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<MapPinIcon className="h-5 w-5" />} title="Address">
                2571 E County Road 48
                <br />
                Bushnell, FL 33513
              </InfoCard>

              <InfoCard icon={<PhoneIcon className="h-5 w-5" />} title="Phone">
                <a
                  href="tel:+13525691017"
                  className="transition-colors hover:text-ink"
                >
                  (352) 569-1017
                </a>
              </InfoCard>

              <InfoCard
                icon={<ClockIcon className="h-5 w-5" />}
                title="Hours"
                className="sm:col-span-2"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between gap-4">
                    <span>Tuesday – Saturday</span>
                    <span className="whitespace-nowrap">11:00 AM – 9:30 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Sunday</span>
                    <span className="whitespace-nowrap">12:00 PM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Monday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </InfoCard>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/reserve"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
              >
                <CalendarIcon className="h-4 w-4" />
                Reserve a Table
              </Link>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-card"
              >
                <NavigationIcon className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Map card */}
          <div className="flex flex-col rounded-2xl border border-line bg-card p-6">
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-paper text-ink">
                <MapPinIcon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">
                Find Us in Bushnell
              </h3>
              <p className="mt-2 text-sm text-body">
                Tap to view our location on Google Maps
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
              >
                <NavigationIcon className="h-4 w-4" />
                Open in Maps
              </a>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-paper p-4">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
              <div className="text-sm">
                <p className="font-semibold text-ink">
                  Fujiyama Japanese Steakhouse
                </p>
                <p className="text-body">
                  2571 E County Road 48, Bushnell, FL
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
