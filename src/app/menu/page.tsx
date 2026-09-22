"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneIcon, ClockIcon } from "@/components/icons";
import { FujiArt, LanternArt, SideDecor, SeigaihaArt } from "@/components/decor";
import LineSidebar from "@/components/LineSidebar";
import SpotlightCard from "@/components/SpotlightCard";

import heroImg from "@/assets/hero-bg.jpg";
import signatureImg from "@/assets/reviews/specialty-rolls.jpg";
import hibachiImg from "@/assets/reviews/hibachi-steak-shrimp.jpg";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  },
});

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MenuItem = {
  name: string;
  description?: string;
  price: string;
};

type MenuEntry = MenuItem | { heading: string };

type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  icon: string;
  items: MenuEntry[];
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories: MenuCategory[] = [
  {
    id: "soup-salad",
    title: "Soup & Salad",
    icon: "/icons/menu/soup-salad.svg",
    items: [
      { name: "Miso Soup", price: "$2.50" },
      { name: "Mushroom Soup", price: "$2.50" },
      { name: "House Salad", price: "$3.50" },
      { name: "Avocado Salad", price: "$4.50" },
      { name: "Seaweed Salad", price: "$5.75" },
      { name: "Kani Salad", price: "$5.75" },
      { name: "Seafood Salad", price: "$6.75" },
    ],
  },
  {
    id: "kitchen-appetizers",
    title: "Kitchen Appetizers",
    note: "* Contains raw or undercooked ingredients",
    icon: "/icons/menu/kitchen-appetizers.svg",
    items: [
      { name: "Haru Maki", price: "$4.95" },
      { name: "Edamame", price: "$4.95" },
      { name: "Shumai", description: "Shrimp dumpling", price: "$5.95" },
      { name: "Gyoza", description: "Pork or veg", price: "$5.95" },
      { name: "Vegetable Tempura Appetizer", price: "$4.95" },
      { name: "Calamari", price: "$7.95" },
      { name: "Jalapeno Don", price: "$7.95" },
      { name: "Pazu Yellowtail *", description: "Sushi", price: "$11.95" },
    ],
  },
  {
    id: "sushi-sashimi-alacarte",
    title: "Sushi & Sashimi A La Carte",
    subtitle: "2 pieces — served nigiri or sashimi style",
    note: "* Contains raw or undercooked ingredients",
    icon: "/icons/menu/sushi-sashimi-alacarte.svg",
    items: [
      { name: "Tuna (Maguro) *", price: "$5.50" },
      { name: "Salmon (Sake) *", price: "$5.50" },
      { name: "Yellowtail (Hamachi) *", price: "$7.00" },
      { name: "Eel (Unagi)", price: "$6.00" },
      { name: "Mackerel (Saba)", price: "$5.00" },
      { name: "Shrimp (Ebi)", price: "$5.00" },
      { name: "Scallop (Hokkigai) *", price: "$6.50" },
      { name: "Krab Stick (Kani)", price: "$5.00" },
    ],
  },
  {
    id: "sushi-bar-entrees",
    title: "Sushi Bar Entrees",
    subtitle: "Served with soup or house salad",
    note: "* Contains raw or undercooked ingredients",
    icon: "/icons/menu/sushi-bar-entrees.svg",
    items: [
      {
        name: "Tuna Combo *",
        description: "2 tuna sushi, 2 tuna sashimi & 1 tuna roll",
        price: "$17.99",
      },
      {
        name: "Salmon Combo *",
        description: "2 salmon sashimi, 2 salmon sushi & 1 salmon roll",
        price: "$17.99",
      },
      {
        name: "Yellowtail Combo *",
        description:
          "2 yellowtail sushi, 2 yellowtail sashimi & 1 yellowtail roll",
        price: "$20.99",
      },
      {
        name: "Trio Combo *",
        description: "2 tuna sushi, 2 salmon sushi & 2 yellowtail sushi",
        price: "$19.99",
      },
      {
        name: "Sushi Combo *",
        description: "Chef's choice of 9 sushi & 1 California roll",
        price: "$23.99",
      },
      {
        name: "Sashimi Combo",
        description: "Chef's choice, 15 pieces",
        price: "$27.99",
      },
      {
        name: "Sushi & Sashimi Combo",
        description: "5 pcs sushi, 9 pcs sashimi & 1 tuna roll",
        price: "$28.99",
      },
      {
        name: "Love Boat (For 2) *",
        description: "10 pcs sushi, 12 pcs sashimi & 2 rolls",
        price: "$64.99",
      },
    ],
  },
  {
    id: "sushi-roll-handroll",
    title: "Sushi Roll & Hand Roll",
    subtitle: "Classic rolls, cut to order",
    note: "* Contains raw or undercooked ingredients",
    icon: "/icons/menu/sushi-roll-handroll.svg",
    items: [
      { name: "Tuna Roll", price: "$5.75" },
      { name: "Salmon Roll", price: "$6.70" },
      { name: "Yellowtail Roll", price: "$7.00" },
      { name: "California Roll", price: "$5.75" },
      { name: "Salmon Skin Roll", price: "$5.00" },
      { name: "Avocado Skin Roll", price: "$5.00" },
      { name: "Cucumber Roll", price: "$5.00" },
      { name: "Sweet Potato Roll", price: "$5.00" },
      { name: "Shrimp Tempura Roll", price: "$6.25" },
      { name: "Alaskan Roll", price: "$6.25" },
      { name: "Eel & Avocado Roll", price: "$6.70" },
      { name: "Eel & Cucumber Roll", price: "$6.70" },
      { name: "Spicy Tuna Roll *", price: "$5.75" },
      { name: "Spicy Salmon Roll *", price: "$5.75" },
      { name: "Spicy Yellowtail Roll *", price: "$6.25" },
      { name: "Spicy Shrimp Roll", price: "$5.75" },
      { name: "Spicy Krab Roll", price: "$5.75" },
    ],
  },
  {
    id: "signature-roll",
    title: "Fujiyama Signature Roll",
    subtitle: "Our chef's original creations",
    note: "* Contains raw or undercooked ingredients",
    icon: "/icons/menu/signature-roll.svg",
    items: [
      {
        name: "Da Bomb",
        description:
          "Shrimp tempura, avocado, spicy mayo and krab stick tobiko on top",
        price: "$10.99",
      },
      {
        name: "Dragon",
        description: "Eel, cucumber inside, sliced avocado on top",
        price: "$11.99",
      },
      {
        name: "Crispy Eel",
        description: "Eel, cucumber, avocado inside, deep fried & topped",
        price: "$11.99",
      },
      {
        name: "Seafood *",
        description: "Spicy tuna, spicy salmon inside, spicy krab on top",
        price: "$12.99",
      },
      {
        name: "Philadelphia *",
        description:
          "Smoked salmon & cream cheese inside, topped w. spicy tuna & crunchy tempura flakes",
        price: "$12.99",
      },
      {
        name: "Rainbow *",
        description:
          "Krab, avocado, cucumber inside, tuna, salmon & white fish on top",
        price: "$11.99",
      },
      {
        name: "Boston",
        description:
          "Shrimp tempura & cucumber inside, topped w. smoked salmon & lemon",
        price: "$12.99",
      },
      {
        name: "King",
        description:
          "Eel & cucumber inside, topped w. spicy tuna & flying fish roe",
        price: "$12.99",
      },
      {
        name: "Alligator",
        description: "Shrimp tempura inside, eel & avocado on top",
        price: "$12.99",
      },
      {
        name: "American Dream Roll",
        description:
          "Shrimp tempura, avocado, cucumber inside, spicy krab meat on top",
        price: "$12.99",
      },
      {
        name: "Mango Angel Roll",
        description:
          "Shrimp tempura, spicy krab, cucumber inside, sliced fresh mango on top",
        price: "$12.99",
      },
      {
        name: "Lobster Roll",
        description:
          "Spicy crunchy lobster, cucumber, lettuce & avocado, wrapped in soy paper",
        price: "$13.99",
      },
      {
        name: "Tiger",
        description:
          "Steamed shrimp, krab, avocado inside, seared salmon on top",
        price: "$13.99",
      },
      {
        name: "Out of Control",
        description:
          "Tuna, salmon, yellowtail, avocado, seared tuna, salmon & yellowtail on top",
        price: "$14.99",
      },
      {
        name: "Flying Dragon",
        description:
          "Shrimp tempura, avocado inside, topped w. lobster salad & cocktail shrimp",
        price: "$14.99",
      },
      {
        name: "Sweet Heart *",
        description:
          "Tuna, krab, cream cheese, fresh egg, crunchy wrap w. soy paper",
        price: "$13.99",
      },
      {
        name: "Spider Man",
        description:
          "Soft shell crab, spicy tuna, avocado, roll w. soy paper",
        price: "$14.99",
      },
      {
        name: "Lobster Rainbow Roll *",
        description:
          "Spicy crunchy lobster, krab cream cheese inside, tuna, salmon, white fish & avocado on top",
        price: "$14.99",
      },
      {
        name: "Sex on the Beach Roll *",
        description:
          "Shrimp tempura, spicy salmon with soy paper wrap, topped w. tuna, salmon & avocado",
        price: "$14.99",
      },
      {
        name: "Godzilla Roll",
        description:
          "Cream cheese, spicy salmon, crabmeat, avocado, whole roll deep fried, topped with spicy krab meat & chef's sauce",
        price: "$13.99",
      },
      {
        name: "Hawaiian Roll",
        description:
          "Shrimp tempura, cucumber inside, mango & avocado on top w. soy paper",
        price: "$14.99",
      },
      {
        name: "Manhattan *",
        description: "Shrimp tempura, cucumber inside, spicy tuna on top",
        price: "$14.99",
      },
      {
        name: "Fuji Roll *",
        description:
          "Shrimp tempura, cream cheese inside, topped w. tuna, salmon, white fish & avocado",
        price: "$14.99",
      },
      {
        name: "Ocean Roll *",
        description:
          "Spicy tuna, cream cheese inside, tuna & avocado on top",
        price: "$14.99",
      },
      {
        name: "Akita Roll *",
        description:
          "Spicy salmon, avocado, cream cheese inside, salmon & bonito flakes on top",
        price: "$14.99",
      },
    ],
  },
  {
    id: "hibachi-dinner",
    title: "Hibachi Dinner",
    subtitle: "Served w. soup or house salad, rice or noodle & vegetable",
    icon: "/icons/menu/hibachi-dinner.svg",
    items: [
      { name: "Hibachi Vegetable", price: "$14.95" },
      { name: "Hibachi Chicken", price: "$16.95" },
      { name: "Salmon", price: "$19.95" },
      { name: "Jumbo Shrimp", price: "$20.95" },
      { name: "Scallop", price: "$24.95" },
      { name: "New York Steak", price: "$24.95" },
      { name: "Filet Mignon", price: "$26.95" },
    ],
  },
  {
    id: "combination",
    title: "Combination",
    subtitle: "Served w. soup or house salad, rice or noodle & vegetable",
    icon: "/icons/menu/combination.svg",
    items: [
      { name: "Chicken & Shrimp", price: "$22.95" },
      { name: "New York Steak & Chicken", price: "$23.95" },
      { name: "New York Steak & Shrimp", price: "$24.95" },
      { name: "Scallop & Shrimp", price: "$26.95" },
      { name: "Filet Mignon & Chicken", price: "$26.95" },
      { name: "Filet Mignon & Shrimp", price: "$26.95" },
      { name: "Scallop & Chicken", price: "$26.95" },
      { name: "Filet Mignon & Scallop", price: "$29.95" },
      { name: "Lobster & Chicken", price: "$29.95" },
      { name: "Lobster & Shrimp", price: "$30.95" },
      { name: "Lobster & Steak", price: "$31.95" },
      { name: "Lobster & Filet Mignon", price: "$33.95" },
      {
        name: "Fujiyama Dinner",
        description: "Lobster, filet mignon, chicken & shrimp",
        price: "$44.95",
      },
    ],
  },
  {
    id: "kids-menu",
    title: "Kid's Menu Hibachi",
    subtitle: "For kids 10 & under, served with fried rice",
    icon: "/icons/menu/kids-menu.svg",
    items: [
      { name: "Chicken Plate", price: "$11.95" },
      { name: "Shrimp Plate", price: "$12.95" },
      { name: "Steak Plate", price: "$13.95" },
      { name: "Salmon Plate", price: "$13.95" },
    ],
  },
  {
    id: "side-order",
    title: "Side Order",
    icon: "/icons/menu/side-order.svg",
    items: [
      { name: "Fried Rice", price: "$5.00" },
      { name: "Vegetable", price: "$7.00" },
      { name: "Noodle", price: "$5.00" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    icon: "/icons/menu/desserts.svg",
    items: [
      { name: "Ice Cream", price: "$4.25" },
      { name: "Fried Cheese Cake", price: "$6.25" },
      { name: "Ice Cream Tempura", price: "$5.25" },
      { name: "Tempura Banana", price: "$5.25" },
    ],
  },
  {
    id: "beer",
    title: "Beer",
    subtitle: "Bottled & imported, ice cold",
    icon: "/icons/menu/beer.svg",
    items: [
      { name: "Bud Light", price: "$4.00" },
      { name: "Budweiser", price: "$4.00" },
      { name: "Coors Light", price: "$4.00" },
      { name: "Samuel Adams", price: "$4.00" },
      { name: "Miller Lite", price: "$4.00" },
      { name: "Yuengling", price: "$4.00" },
      { name: "Corona", price: "$5.00" },
      { name: "Heineken", price: "$5.00" },
      { name: "Tsingtao", price: "$5.00" },
      { name: "Kirin Ichiban", price: "$5.00" },
      { name: "Michelob Ultra", price: "$4.00" },
    ],
  },
  {
    id: "wine",
    title: "Wine",
    subtitle: "By the glass",
    icon: "/icons/menu/wine.svg",
    items: [
      { heading: "White Wine" },
      { name: "Chardonnay", price: "$6.00" },
      { name: "Pinot Grigio", price: "$6.00" },
      { name: "White Zinfandel", price: "$6.00" },
      { name: "Plum Wine", price: "$6.00" },
      { heading: "Red Wine" },
      { name: "Merlot", price: "$6.00" },
      { name: "Cabernet Sauvignon", price: "$6.00" },
    ],
  },
  {
    id: "sake",
    title: "Sake",
    icon: "/icons/menu/sake.svg",
    items: [
      { name: "Hot Sake", description: "Small / Large", price: "$4.50 / $9.00" },
      { name: "Junmai Daiginjo Platinum", price: "$15.00" },
      { name: "Ryo", price: "$17.00" },
      { name: "Hana Awaka", description: "Sparkling", price: "$12.00" },
      { name: "Ozeki Draft Sake", price: "$12.00" },
      { name: "Nigori Cloudy Sake", price: "$15.00" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Semantic grouping                                                  */
/* ------------------------------------------------------------------ */

const FEATURED_IDS = new Set(["signature-roll", "hibachi-dinner"]);
const DRINK_IDS = new Set(["beer", "wine", "sake"]);

type MenuGroup = {
  label: string;
  ids: string[];
};

const menuGroups: MenuGroup[] = [
  { label: "Starters", ids: ["soup-salad", "kitchen-appetizers"] },
  {
    label: "Sushi",
    ids: [
      "sushi-sashimi-alacarte",
      "sushi-bar-entrees",
      "sushi-roll-handroll",
      "signature-roll",
    ],
  },
  {
    label: "From the Grill",
    ids: ["hibachi-dinner", "combination", "kids-menu"],
  },
  { label: "Sides & Sweets", ids: ["side-order", "desserts"] },
];

const drinkCategories = categories.filter((c) => DRINK_IDS.has(c.id));
const allSidebarItems = categories.map((c) => c.title);

const featuredImages: Record<string, { src: typeof signatureImg; alt: string }> = {
  "signature-roll": { src: signatureImg, alt: "Fujiyama signature sushi rolls" },
  "hibachi-dinner": { src: hibachiImg, alt: "Hibachi steak and shrimp" },
};

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <p className="font-medium text-ink">{item.name}</p>
        <span className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-line/50" />
        <p className="shrink-0 whitespace-nowrap font-semibold text-primary">
          {item.price}
        </p>
      </div>
      {item.description && (
        <p className="mt-0.5 text-sm text-body">{item.description}</p>
      )}
    </div>
  );
}

function renderEntries(entries: MenuEntry[]) {
  const nodes: ReactNode[] = [];
  let pendingHeading: string | null = null;

  entries.forEach((entry, i) => {
    if ("heading" in entry) {
      pendingHeading = entry.heading;
      return;
    }
    if (pendingHeading) {
      nodes.push(
        <div key={i} className="break-inside-avoid">
          <p className="mb-2 mt-2 text-xs font-medium uppercase tracking-widest text-body/70">
            {pendingHeading}
          </p>
          <ItemRow item={entry} />
        </div>,
      );
      pendingHeading = null;
    } else {
      nodes.push(
        <div key={i} className="break-inside-avoid">
          <ItemRow item={entry} />
        </div>,
      );
    }
  });

  return nodes;
}

function StandardCard({ category }: { category: MenuCategory }) {
  return (
    <motion.div
      id={category.id}
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-28 rounded-2xl border border-line bg-white p-7 md:p-10"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.icon}
          alt=""
          className="size-6 opacity-60"
        />
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-ink md:text-[28px]">
            {category.title}
          </h3>
          {category.subtitle && (
            <p className="mt-0.5 text-sm italic text-body">
              {category.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 columns-1 gap-x-12 sm:columns-2">
        {renderEntries(category.items)}
      </div>

      {category.note && (
        <p className="mt-2 text-xs text-body">{category.note}</p>
      )}
    </motion.div>
  );
}

function FeaturedCard({ category }: { category: MenuCategory }) {
  const img = featuredImages[category.id];
  return (
    <motion.div
      id={category.id}
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-28"
    >
      <SpotlightCard
        className="overflow-hidden rounded-2xl border border-line bg-card"
        spotlightColor="rgba(177, 53, 39, 0.08)"
      >
        {img && (
          <div className="relative aspect-[2/1] w-full overflow-hidden md:aspect-[3/1]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        <div className="p-7 md:p-10">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-ink md:text-[28px]">
              {category.title}
            </h3>
            {category.subtitle && (
              <p className="mt-0.5 text-sm italic text-body">
                {category.subtitle}
              </p>
            )}
          </div>

          <div className="mt-7 columns-1 gap-x-12 sm:columns-2">
            {renderEntries(category.items)}
          </div>

          {category.note && (
            <p className="mt-2 text-xs text-body">{category.note}</p>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function DrinkItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="mb-3">
      <div className="flex items-baseline gap-2">
        <p className="font-medium text-paper/90">{item.name}</p>
        <span className="min-w-3 flex-1 translate-y-[-3px] border-b border-dotted border-paper/20" />
        <p className="shrink-0 whitespace-nowrap font-semibold text-paper">
          {item.price}
        </p>
      </div>
      {item.description && (
        <p className="mt-0.5 text-sm text-paper/50">{item.description}</p>
      )}
    </div>
  );
}

function DrinksSection() {
  return (
    <motion.section
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="scroll-mt-28 rounded-2xl bg-[#3a332d] px-7 py-10 md:px-10 md:py-12"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-medium tracking-tight text-paper md:text-4xl">
          Drinks
        </h2>
        <p className="mt-2 text-sm text-paper/60">Beer, wine & sake</p>
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {drinkCategories.map((cat) => (
          <div key={cat.id} id={cat.id} className="scroll-mt-28">
            <div className="mb-5 flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.icon}
                alt=""
                className="size-5 brightness-0 invert opacity-50"
              />
              <h3 className="text-lg font-medium text-paper">{cat.title}</h3>
            </div>
            {cat.subtitle && (
              <p className="-mt-3 mb-5 text-xs italic text-paper/50">
                {cat.subtitle}
              </p>
            )}
            {cat.items.map((entry, i) => {
              if ("heading" in entry) {
                return (
                  <p
                    key={i}
                    className="mb-2 mt-4 text-xs font-medium uppercase tracking-widest text-paper/50"
                  >
                    {entry.heading}
                  </p>
                );
              }
              return <DrinkItemRow key={i} item={entry} />;
            })}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line/60" />
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-body/60">
        {label}
      </span>
      <span className="h-px flex-1 bg-line/60" />
    </div>
  );
}

function MobileNav() {
  return (
    <div className="relative -mx-6 mb-8 xl:hidden md:-mx-8">
      <div className="flex gap-2 overflow-x-auto px-6 pb-3 md:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() =>
              document
                .getElementById(c.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-body whitespace-nowrap transition-colors hover:bg-card hover:text-ink"
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MenuPage() {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <main>
      {/* ---- Header ---- */}
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
              富
            </span>
            <span className="text-xl font-semibold tracking-tight text-ink">
              Fujiyama
            </span>
          </Link>
          <div className="flex items-center gap-3.5">
            <a
              href="tel:+13525691017"
              className="hidden items-center gap-2 rounded-full border border-line px-4.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-card sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" />
              (352) 569-1017
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* ---- Hero — dark photo background ---- */}
      <section className="relative overflow-hidden bg-ink py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80" />
        </div>
        <SideDecor side="right" className="-right-10 top-16 w-40 md:w-56">
          <FujiArt className="w-full text-paper/10" />
        </SideDecor>
        <SideDecor side="left" className="-left-8 top-16 w-24 md:w-32">
          <LanternArt className="w-full text-paper/10" />
        </SideDecor>
        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-8">
          <motion.span
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-paper backdrop-blur-sm"
          >
            Hibachi &amp; Sushi
          </motion.span>
          <motion.h1
            variants={fadeUp(0.1)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-5xl font-medium tracking-tight text-paper md:text-6xl"
          >
            Our Menu
          </motion.h1>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="visible"
            className="mt-5 text-pretty text-lg text-paper/80"
          >
            Hibachi grilled to order, sushi rolled fresh, and everything made
            the same way we&apos;ve made it since 2016.
          </motion.p>
        </div>
      </section>

      {/* ---- Menu body ---- */}
      <section className="bg-paper pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto grid max-w-[100rem] gap-16 px-6 md:px-8 xl:grid-cols-[16rem_minmax(0,1fr)_16rem]">
          {/* Left sidebar — desktop only */}
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <LineSidebar
                items={allSidebarItems}
                accentColor="var(--color-primary)"
                textColor="var(--color-body)"
                markerColor="var(--color-line)"
                showMarker
                showIndex={false}
                proximityRadius={40}
                maxShift={10}
                itemGap={14}
                fontSize={0.95}
                markerLength={36}
                smoothing={60}
                onItemClick={(index) => {
                  document
                    .getElementById(categories[index].id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>
          </aside>

          {/* Center content */}
          <div className="mx-auto w-full max-w-6xl">
            {/* Mobile horizontal nav */}
            <MobileNav />

            {/* Grouped food sections */}
            {menuGroups.map((group, gi) => (
              <div key={group.label}>
                {gi > 0 && (
                  <div className="my-12 md:my-16">
                    <SectionDivider label={group.label} />
                  </div>
                )}
                {gi === 0 && (
                  <div className="mb-6">
                    <SectionDivider label={group.label} />
                  </div>
                )}
                <div className="grid gap-6">
                  {group.ids.map((id) => {
                    const cat = categoryMap[id];
                    if (!cat) return null;
                    if (FEATURED_IDS.has(id)) {
                      return <FeaturedCard key={id} category={cat} />;
                    }
                    return <StandardCard key={id} category={cat} />;
                  })}
                </div>
              </div>
            ))}

            {/* Drinks band */}
            <div className="my-12 md:my-16">
              <DrinksSection />
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-line bg-card p-6">
                <h3 className="text-sm font-semibold text-ink">
                  Call to Order
                </h3>
                <a
                  href="tel:+13525691017"
                  className="mt-3 flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  <PhoneIcon className="h-4 w-4" />
                  (352) 569-1017
                </a>
                <div className="mt-4 border-t border-line pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-body">
                    <ClockIcon className="h-3.5 w-3.5" />
                    Hours
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-body">
                    <div className="flex justify-between">
                      <span>Tue – Sat</span>
                      <span>11 AM – 9:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>12 PM – 9 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday</span>
                      <span className="text-body/60">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <SeigaihaArt className="h-auto w-20 text-ink/8" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
