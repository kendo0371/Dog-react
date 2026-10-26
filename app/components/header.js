import Image from "next/image";
import Form from "next/form";
import Link from "next/link";
import logo from "./images/logo.png";
import { MoonIcon, SearchIcon, SunIcon } from "./icons/icons";
import { hrefWith, HiddenParams } from "./url";

export function Header({ params }) {
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
          <SearchBox params={params} />

          {}
          <button
            aria-label="Toggle color mode"
            className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-amber-300 hover:bg-zinc-800 transition-colors"
            id="themeToggle"
            type="button">
            {/**/}
            <span className="hidden dark:block">
              <MoonIcon />
            </span>
            <span className="dark:hidden">
              <SunIcon />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Navigation() {
  const items = [
    { title: "Discover", link: "#discover", active: true },
    { title: "Breeds", link: "#breeds" },
    { title: "Gallery", link: "#gallery" },
  ];

  return (
    <nav className="flex items-center gap-2 md:gap-4">
      {items.map((item) => (
        <NavItem
          key={item.link}
          title={item.title}
          link={item.link}
          active={item.active}
        />
      ))}
    </nav>
  );
}

function NavItem({ title, link, active }) {
  return (
    <a
      href={link}
      data-active={active ? "" : undefined}
      className="nav-link font-semibold text-sm text-stone-300 hover:text-stone-200 transition-colors px-4 py-1 rounded-full hidden md:block data-active:bg-amber-500 data-active:text-amber-950 data-active:hover:text-amber-100">
      {title}
    </a>
  );
}

async function SearchBox({ params }) {
  const q = params.q;
  const search = (q ?? "").toLowerCase().trim();

  let matches = [];
  if (search !== "") {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const result = await res.json();
    matches = Object.keys(result.message)
      .filter((breed) => breed.includes(search))
      .slice(0, 8);
  }

  return (
    <details className="md:hidden" open={q !== undefined}>
      <summary
        aria-label="Search breeds"
        className="list-none w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-amber-300 hover:bg-zinc-800 transition-colors cursor-pointer">
        <SearchIcon />
      </summary>

      <div className="absolute top-full left-0 right-0 bg-zinc-900 p-4 shadow-lg">
        <Form action="/" scroll={false}>
          {}
          <HiddenParams params={params} skip="q" />
          <input
            name="q"
            type="text"
            placeholder="Search breeds"
            defaultValue={q}
            className="w-full bg-zinc-800 text-stone-200 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-amber-500"
          />
        </Form>

        <div className="flex flex-wrap gap-2 mt-3">
          {search !== "" && matches.length === 0 && (
            <span className="text-stone-300 text-sm">No breeds found</span>
          )}

          {matches.map((breed) => (
            <Link
              key={breed}
              href={hrefWith(params, { breed, q: undefined }) + "#breeds"}
              className="bg-zinc-800 text-stone-200 hover:bg-zinc-700 px-4 py-2 rounded-full capitalize text-sm">
              {breed}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
