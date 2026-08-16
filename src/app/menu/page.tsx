"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneIcon } from "@/components/icons";
import { FujiArt, LanternArt, SideDecor } from "@/components/decor";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

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
    subtitle: "Served w. soup or house salad, rice or noodle",
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

function CategoryCard({ category }: { category: MenuCategory }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-3xl border border-line bg-white p-7 md:p-11"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-accent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={category.icon} alt="" className="size-[22px]" />
        </span>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-[28px]">
            {category.title}
          </h3>
          {category.subtitle && (
            <p className="mt-0.5 text-sm text-body">{category.subtitle}</p>
          )}
        </div>
      </div>

      <div className="mt-7 columns-1 gap-x-12 sm:columns-2">
        {category.items.map((item, i) =>
          "heading" in item ? (
            <p
              key={i}
              className="mb-2 break-inside-avoid text-xs font-semibold uppercase tracking-wide text-body"
            >
              {item.heading}
            </p>
          ) : (
            <div
              key={i}
              className="mb-[18px] flex items-start justify-between gap-4 break-inside-avoid"
            >
              <div>
                <p className="font-semibold text-ink">{item.name}</p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-body">
                    {item.description}
                  </p>
                )}
              </div>
              <p className="shrink-0 whitespace-nowrap font-semibold text-primary">
                {item.price}
              </p>
            </div>
          ),
        )}
      </div>

      {category.note && (
        <p className="mt-2 text-xs text-body">{category.note}</p>
      )}
    </motion.div>
  );
}

export default function MenuPage() {
  return (
    <main>
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
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-accent pb-10 pt-20 md:pb-14 md:pt-28">
        <SideDecor side="right" className="-right-10 top-16 w-40 md:w-56">
          <FujiArt className="w-full" />
        </SideDecor>
        <SideDecor side="left" className="-left-8 top-16 w-24 md:w-32">
          <LanternArt className="w-full" />
        </SideDecor>
        <div className="relative mx-auto max-w-2xl px-6 text-center md:px-8">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-ink md:text-6xl">
            Our Menu
          </h1>
          <p className="mt-5 text-pretty text-lg text-body">
            Hibachi grilled to order, sushi rolled fresh, and everything made
            the same way we&apos;ve made it since 2016.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:px-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
