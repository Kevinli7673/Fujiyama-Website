"use client";
import Hero from "../components/Hero";
import Story from "../components/Story";
import ScrollOverlay from "../components/ScrollOverlay";
import bgImage from "../assets/hero-bg.jpg";

export default function Home() {
  return (
    <main>
      <button onClick={async () => {
        await fetch("/api/emails", {method: "POST"})
        }
      }>
        Send Email
      </button>
      
    </main>
  );
}
