import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

const SITE_URL = "https://fujiyamasteakhouse.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fujiyama Japanese Steakhouse — Hibachi & Sushi in Bushnell, FL",
    template: "%s | Fujiyama Japanese Steakhouse",
  },
  description:
    "Family-owned Japanese steakhouse in Bushnell, Florida since 2016. Hibachi grilled to order, hand-rolled sushi, and fresh sashimi. Open Tuesday–Sunday.",
  keywords: [
    "Fujiyama",
    "Japanese steakhouse",
    "hibachi",
    "sushi",
    "Bushnell FL",
    "Japanese restaurant Bushnell",
    "sushi near me",
    "hibachi near me",
    "Sumter County restaurant",
  ],
  authors: [{ name: "Fujiyama Japanese Steakhouse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Fujiyama Japanese Steakhouse",
    title: "Fujiyama Japanese Steakhouse — Hibachi & Sushi in Bushnell, FL",
    description:
      "Family-owned Japanese steakhouse in Bushnell, Florida since 2016. Hibachi grilled to order, hand-rolled sushi, and fresh sashimi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fujiyama Japanese Steakhouse — Hibachi & Sushi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fujiyama Japanese Steakhouse — Hibachi & Sushi in Bushnell, FL",
    description:
      "Family-owned Japanese steakhouse in Bushnell, FL. Hibachi, sushi & sashimi since 2016.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="bg-white" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
