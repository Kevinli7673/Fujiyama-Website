import { PhoneIcon } from "./icons";

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/50 to-transparent">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
        <span className="text-xl font-semibold tracking-tight text-paper">
          Fujiyama
        </span>
        <a
          href="tel:+13525691017"
          className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
        >
          <PhoneIcon className="h-4 w-4" />
          (352) 569-1017
        </a>
      </div>
    </header>
  );
}

export default Nav;
