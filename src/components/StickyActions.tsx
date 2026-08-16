"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { CalendarIcon, MenuListIcon } from "./icons";

function StickyActions() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 400);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed right-6 top-6 z-50 flex items-center gap-3"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-lg backdrop-blur-sm transition-colors hover:bg-card"
          >
            <MenuListIcon className="h-4 w-4" />
            Menu
          </Link>
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-neutral-700"
          >
            <CalendarIcon className="h-4 w-4" />
            Reserve
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyActions;
