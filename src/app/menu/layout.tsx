import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full menu for Fujiyama Japanese Steakhouse — hibachi dinners, signature sushi rolls, sashimi combos, appetizers, kids plates, beer, wine & sake. Bushnell, FL.",
  alternates: {
    canonical: "https://fujiyamasteakhouse.com/menu",
  },
  openGraph: {
    title: "Menu — Fujiyama Japanese Steakhouse",
    description:
      "Hibachi dinners, signature sushi rolls, sashimi combos, and more. View our full menu.",
    url: "https://fujiyamasteakhouse.com/menu",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
