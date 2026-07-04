function Nav() {
  return (
    <header
      className="fixed top-0 left-0 w-full flex justify-between items-center z-10 backdrop-blur-md"
      style={{
        height: "clamp(64px, 6.15vw, 157px)",
        paddingLeft: "clamp(1rem, 2.4vw, 3.8rem)",
        paddingRight: "clamp(1rem, 2.4vw, 3.8rem)",
        background:
          "linear-gradient(to right, rgba(110,149,182,0.2) 0%, rgba(166,166,166,0.2) 52.9%, rgba(127,157,192,0.2) 98.6%)",
      }}
    >
      <nav>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 1.875vw, 3rem)",
            color: "white",
            fontWeight: 400,
          }}
        >
          Fujiyama
        </span>
      </nav>
      <a
        href="tel:+13525691017"
        style={{
          fontFamily: "var(--font-instrument-sans), ui-sans-serif, sans-serif",
          fontSize: "clamp(1.125rem, 1.5625vw, 2.5rem)",
          color: "white",
          textDecoration: "underline",
          fontWeight: 400,
        }}
      >
        (352) 569-1017
      </a>
    </header>
  );
}

export default Nav;
