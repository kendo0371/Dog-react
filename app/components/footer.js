import { UpArrow } from "./icons/icons";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 mt-10 py-6">
      <div className="w-full px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-normal text-sm leading-5 text-stone-300 text-center md:text-left">
          Crafted with warmth for dog lovers everywhere.
        </p>
        <div className="flex items-center gap-6">
          <a
            className="font-semibold text-xs text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1"
            href="#">
            Back to Top
            <UpArrow />
          </a>
          <span className="font-normal text-sm leading-5 text-stone-400">
            © Dog Explorer
          </span>
        </div>
      </div>
    </footer>
  );
}
