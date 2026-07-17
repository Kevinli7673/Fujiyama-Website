import Hero from "../components/Hero";
import Story from "../components/Story";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import { getGoogleRating } from "../lib/rating";

export default async function Home() {
  const googleRating = await getGoogleRating();

  return (
    <main>
      <Hero googleRating={googleRating} />
      <Story />
      <Menu />
      <Contact />
    </main>
  );
}
