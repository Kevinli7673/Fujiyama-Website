import Hero from "../components/Hero";
import Story from "../components/Story";
import ScrollOverlay from "../components/ScrollOverlay";
import bgImage from "../assets/hero-bg.jpg";

export default function Home() {
  return (
    <main>
      {/* Fixed background — stays put while the sections scroll over it */}
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Lightens with scroll progress, sits on top of the bg image */}
      <ScrollOverlay />
      <Hero />
      <Story />
    </main>
  );
}
