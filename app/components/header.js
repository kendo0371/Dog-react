import Image from "next/image";
import logo from "./images/logo.png";
import { MoonIcon } from "./icons/moon";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-zinc-900/90 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(18,20,19,0.7)]">
      <div className="w-full px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-2 sm:h-16 sm:py-0">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-2xl">
            <Image className="w-8" src={logo} alt="logo" />
          </span>
          <span className="font-bold text-xl text-stone-200 tracking-tight">
            Dog Explorer
          </span>
        </div>

        <Navigation />

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle color mode"
            className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-amber-300 hover:bg-zinc-800 transition-colors"
            type="button">
            <MoonIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

function Navigation() {
  return (
    <nav className="flex items-center gap-2 md:gap-4">
      <NavItem title="Discover" link="#discover" active />
      <NavItem title="Breeds" link="#Breeds" />
      <NavItem title="Gallery" link="#gallery" />
    </nav>
  );
}

function NavItem({ title, link, active }) {
  if (active) {
    return (
      <a
        aria-current="page"
        href={link}
        className="transition-colors bg-amber-500 text-amber-950 font-semibold text-sm hover:text-base hover:text-amber-100 rounded-full px-4 py-1">
        {title}
      </a>
    );
  }
  return (
    <a
      href={link}
      className="font-semibold text-sm text-stone-300 hover:text-stone-200 transition-colors px-4 py-1 rounded-full">
      {title}
    </a>
  );
}
