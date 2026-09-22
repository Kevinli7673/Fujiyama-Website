import Hero from "../components/Hero";
import Story from "../components/Story";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import StickyActions from "../components/StickyActions";
import { getGoogleRating } from "../lib/rating";

function RestaurantJsonLd({ rating }: { rating: { rating: number; count: number } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Fujiyama Japanese Steakhouse",
    image: "https://fujiyamasteakhouse.com/og-image.jpg",
    url: "https://fujiyamasteakhouse.com",
    telephone: "+1-352-569-1017",
    priceRange: "$$",
    servesCuisine: ["Japanese", "Sushi", "Hibachi", "Steakhouse"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "2571 E County Road 48",
      addressLocality: "Bushnell",
      addressRegion: "FL",
      postalCode: "33513",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6653,
      longitude: -82.0829,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "21:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.rating,
      reviewCount: rating.count,
      bestRating: 5,
    },
    hasMenu: "https://fujiyamasteakhouse.com/menu",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function Home() {
  const googleRating = await getGoogleRating();

  return (
    <>
      <RestaurantJsonLd rating={googleRating} />
      <main>
        <StickyActions />
        <Hero googleRating={googleRating} />
        <Story />
        <Menu />
        <Contact />
      </main>
    </>
  );
}
