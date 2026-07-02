import bgImage from "../assets/hero-bg.jpg";
import Nav from "./Nav";

function Hero() {
  return (
    <section
      className="relative flex flex-col"
      style={{
        minHeight: "100svh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 11.5%, rgba(90,89,89,0.3) 84%)",
        }}
        aria-hidden="true"
      />

      {/* Nav */}
      <Nav />

      {/* Main content — flex column, centered, fills remaining space */}
      <div
        className="relative z-10 flex flex-col items-center flex-1"
        style={{ paddingTop: "clamp(64px, 6.15vw, 157px)" }}
      >
        {/* Spacer pushing title to ~30% of viewport */}
        <div style={{ flex: "0 0 clamp(3rem, 11svh, 14rem)" }} />

        {/* H1 */}
        <h1
          className="text-center text-white px-4"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontWeight: 400,
            fontSize: "clamp(2.25rem, 5vw, 8rem)",
            textWrap: "balance",
          }}
        >
          Fujiyama Japanese Steakhouse
        </h1>

        {/* Spacer between title and buttons (~48% of viewport) */}
        <div style={{ flex: "0 0 clamp(1.5rem, 6svh, 6rem)" }} />

        {/* Button row */}
        <div
          className="hero-buttons flex flex-row items-center"
          style={{ gap: "clamp(1.5rem, 5.4vw, 8.625rem)" }}
        >
          <a
            href="#"
            className="hero-btn-reserve flex items-center justify-center text-white font-semibold transition-colors"
            style={{
              fontFamily: '"Instrument Sans", ui-sans-serif, sans-serif',
              fontWeight: 600,
              fontSize: "clamp(1.125rem, 1.4vw, 2.25rem)",
              borderRadius: "30px",
              paddingTop: "clamp(0.75rem, 2.15vw, 3.44rem)",
              paddingBottom: "clamp(0.75rem, 2.15vw, 3.44rem)",
              paddingLeft: "clamp(1.5rem, 3.8vw, 6.09rem)",
              paddingRight: "clamp(1.5rem, 3.8vw, 6.09rem)",
            }}
          >
            Reserve a Table
          </a>

          <a
            href="#"
            className="hero-btn-menu flex items-center justify-center text-white transition-colors"
            style={{
              fontFamily: '"Instrument Sans", ui-sans-serif, sans-serif',
              fontWeight: 400,
              fontSize: "clamp(1.125rem, 1.5625vw, 2.5rem)",
              border: "3px solid white",
              borderRadius: "40px",
              paddingTop: "clamp(0.75rem, 2.15vw, 3.44rem)",
              paddingBottom: "clamp(0.75rem, 2.15vw, 3.44rem)",
              paddingLeft: "clamp(1.5rem, 3.8vw, 6.09rem)",
              paddingRight: "clamp(1.5rem, 3.8vw, 6.09rem)",
            }}
          >
            View Menu
          </a>
        </div>

        {/* Spacer between buttons and subtitle (~67% of viewport) */}
        <div style={{ flex: "0 0 clamp(1.5rem, 8svh, 8rem)" }} />

        {/* Subtitle */}
        <p
          className="text-center text-white"
          style={{
            fontFamily: '"Instrument Sans", ui-sans-serif, sans-serif',
            fontWeight: 500,
            fontSize: "clamp(1.25rem, 1.875vw, 3rem)",
          }}
        >
          Hibachi · Sushi
        </p>

        {/* Flexible spacer to push scroll strip to the bottom */}
        <div style={{ flex: 1 }} />

        {/* Scroll strip */}
        <div
          className="w-full flex flex-col items-center justify-center"
          style={{
            background: "rgba(217,217,217,0.3)",
            height: "clamp(90px, 9vw, 230px)",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.125rem, 1.5625vw, 2.5rem)",
              color: "white",
            }}
          >
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 14"
            fill="none"
            aria-hidden="true"
            style={{
              width: "clamp(16px, 1.5vw, 28px)",
              height: "clamp(10px, 1vw, 18px)",
              marginTop: "clamp(0.25rem, 0.4vw, 0.5rem)",
            }}
          >
            <path
              d="M2 2L12 12L22 2"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
