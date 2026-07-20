"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import CornerOrnament from "@/components/CornerOrnament";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

/** Generate 15-minute slots between two times (24h, in minutes from midnight). */
function makeSlots(start: number, end: number) {
  const slots: string[] = [];
  for (let m = start; m <= end; m += 15) {
    const h24 = Math.floor(m / 60);
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const mm = String(m % 60).padStart(2, "0");
    const ampm = h24 < 12 ? "AM" : "PM";
    slots.push(`${String(h12).padStart(2, "0")}:${mm} ${ampm}`);
  }
  return slots;
}

const TIME_SLOTS = [
  ...makeSlots(11 * 60, 13 * 60 + 30), // lunch: 11:00 AM – 1:30 PM
  ...makeSlots(17 * 60, 20 * 60 + 30), // dinner: 5:00 PM – 8:30 PM
];

const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

function guestsLabel(partySize: string) {
  return partySize === "1" ? "1 guest" : `${partySize} guests`;
}

export default function ReservePage() {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [partySize, setPartySize] = React.useState("2");
  const [selection, setSelection] = React.useState<{
    date?: Date;
    time?: string;
  }>({});
  const [confirmed, setConfirmed] = React.useState<{
    date?: Date;
    time?: string;
  } | null>(null);

  const contactMissing = email.trim() === "" || phone.trim() === "";

  const summary =
    selection.date && selection.time
      ? `${selection.date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })} · ${selection.time} · ${guestsLabel(partySize)}`
      : undefined;

  return (
    <main className="flex min-h-svh flex-col bg-white">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink"
          >
            {/* Hanko-style stamp mark */}
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white transition-transform group-hover:-rotate-6">
              富
            </span>
            Fujiyama
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:+13525691017"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4 text-primary" />
              (352) 569-1017
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <section className="relative flex flex-1 overflow-hidden">
        {/* Soft warm wash behind the header */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent to-transparent"
        />
        {/* Decorative corner waves */}
        <CornerOrnament corner="top-right" />
        <CornerOrnament corner="bottom-left" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-5 md:px-8">
          {/* Centered header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Reserve a Table
            </h1>
            <p className="mt-1.5 text-pretty text-sm text-body">
              Pick a date and time, tell us how to reach you, and we&apos;ll
              have your table waiting.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {confirmed ? (
              /* ---------- Success state ---------- */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mx-auto mt-10 max-w-xl"
              >
                <div className="rounded-2xl border border-line bg-card p-10 text-center">
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 22,
                      delay: 0.15,
                    }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white"
                  >
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </motion.span>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                    Reservation requested
                  </h2>
                  <p className="mt-3 text-body">
                    {confirmed.date?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    at {confirmed.time} · {guestsLabel(partySize)}
                  </p>
                  <p className="mt-1 text-sm text-body">
                    We&apos;ll confirm at {email} or {phone}.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => setConfirmed(null)}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
                    >
                      Make another reservation
                    </button>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-card"
                    >
                      Back to home
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ---------- Booking form ---------- */
              <motion.div
                key="form"
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-5 grid items-start gap-6 lg:grid-cols-[1fr_320px]"
              >
                {/* Scheduler card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.1}
                  className="rounded-2xl border border-line bg-white p-1 sm:p-2"
                >
                  <CalendarScheduler
                    title=""
                    timeSlots={TIME_SLOTS}
                    confirmDisabled={contactMissing}
                    summary={summary}
                    onChange={setSelection}
                    onConfirm={(val) => setConfirmed(val)}
                  >
                    <div className="grid gap-3 p-4 pt-0">
                      {/* Party size */}
                      <div className="grid gap-1.5">
                        <Label>Party size</Label>
                        <div className="flex flex-wrap gap-2">
                          {PARTY_SIZES.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setPartySize(size)}
                              className={cn(
                                "h-8 min-w-10 rounded-lg border px-2 text-xs font-medium transition-[transform,color,background-color] active:scale-95",
                                partySize === size
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-input bg-background text-foreground hover:bg-accent",
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1.5">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="phone">Phone number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(352) 555-0123"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-1.5 sm:col-span-2 lg:col-span-1">
                          <Label htmlFor="notes">Additional notes</Label>
                          <textarea
                            id="notes"
                            rows={1}
                            placeholder="Allergies, occasions, seating…"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={cn(
                              "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
                            )}
                          />
                        </div>
                      </div>
                      {contactMissing && (
                        <p className="text-xs text-muted-foreground">
                          Enter your email and phone number to confirm.
                        </p>
                      )}
                    </div>
                  </CalendarScheduler>
                </motion.div>

                {/* Sidebar */}
                <div className="grid gap-4">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    className="rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                        <ClockIcon className="h-5 w-5" />
                      </span>
                      <h3 className="text-sm font-semibold text-ink">Hours</h3>
                    </div>
                    <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-body">
                      <div className="flex justify-between gap-4">
                        <span>Tuesday – Saturday</span>
                        <span className="whitespace-nowrap">
                          11:00 AM – 9:30 PM
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Sunday</span>
                        <span className="whitespace-nowrap">
                          12:00 PM – 9:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Monday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                        <MapPinIcon className="h-5 w-5" />
                      </span>
                      <h3 className="text-sm font-semibold text-ink">
                        Address
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-body">
                      2571 E County Road 48
                      <br />
                      Bushnell, FL 33513
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                    className="rounded-xl bg-accent p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
                        <PhoneIcon className="h-5 w-5" />
                      </span>
                      <h3 className="text-sm font-semibold text-ink">
                        Prefer to call?
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-body">
                      Larger parties or same-day requests? Give us a ring and
                      we&apos;ll sort it out.
                    </p>
                    <a
                      href="tel:+13525691017"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      (352) 569-1017
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
