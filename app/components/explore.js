import { BigStar } from "./icons/bigStar";
import { Down } from "./icons/down";
import Image from "next/image";

export function Explore() {
  return (
    <section
      className="bg-zinc-950 font-sans text-base text-stone-200 w-full px-4 lg:px-8 py-10"
      id="breeds">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col items-start gap-1 max-w-2xl">
            <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-zinc-800 text-amber-300 font-semibold text-xs">
              <span>🐾</span>
              <span>BREED COMPENDIUM</span>
            </div>

            <h2 className="font-bold text-3xl leading-tight text-stone-200 tracking-tight">
              Find Your Favorite Breed
            </h2>

            <p className="font-normal text-base leading-6 text-stone-300">
              Choose from hundreds of friendly breeds and see happy pups ready
              to brighten your day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-zinc-900 p-1 rounded-full shadow-sm">
            <Option />

            <button
              className="px-6 py-1 rounded-full bg-amber-500 text-amber-950 font-semibold text-xs hover:brightness-105 transition-all"
              type="button">
              Show Dogs
            </button>
          </div>
        </div>

        <BreedButtons />

        <div className="w-full bg-zinc-900 p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
              <BigStar />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-xl text-stone-200">
                  Pembroke Welsh Corgi
                </h3>

                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-amber-950 font-semibold text-xs">
                  Top Pick
                </span>

                <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-stone-300 font-semibold text-xs">
                  Great with Kids
                </span>
              </div>

              <p className="font-normal text-sm leading-5 text-stone-300 mt-0.5">
                Playful &amp; Bold • Herding Group • Adaptable Companion
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 z-10 w-full md:w-auto justify-end">
            <div className="hidden sm:flex items-center gap-2 text-stone-300 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>High Trainability</span>
            </div>
            <button
              className="px-4 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-zinc-700 font-semibold text-xs transition-colors"
              type="button">
              Read Breed Guide
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <Dogs />
        </div>
      </div>
    </section>
  );
}

function Option() {
  return (
    <div className="relative">
      <select
        aria-label="Select dog breed"
        className="appearance-none bg-zinc-800 text-stone-200 font-semibold text-xs rounded-full pl-4 pr-10 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
        id="breedSelect">
        <option defaultValue="corgi">Pembroke Welsh Corgi</option>
        <option value="golden">Golden Retriever</option>
        <option value="frenchie">French Bulldog</option>
        <option value="shiba">Shiba Inu</option>
        <option value="samoyed">Samoyed</option>
      </select>

      <Down />
    </div>
  );
}

function BreedButtons() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <button
        className="px-4 py-1 rounded-full bg-amber-500 text-amber-950 font-semibold text-xs whitespace-nowrap shadow-sm"
        type="button">
        All Breeds
      </button>

      <BreedButton title="Pembroke Welsh Corgi" />

      <BreedButton title="Golden Retriever" />

      <BreedButton title="French Bulldog" />

      <BreedButton title="Shiba Inu" />

      <BreedButton title="Samoyed" />
    </div>
  );
}

function BreedButton({ title }) {
  return (
    <button
      className="px-4 py-1 rounded-full bg-zinc-900 text-stone-300 hover:text-stone-200 hover:bg-zinc-800 font-semibold text-xs whitespace-nowrap transition-colors"
      type="button">
      {title}
    </button>
  );
}

function Dogs() {
  return (
    <>
      <Dog
        link="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80"
        title="Pembroke Welsh Corgi"
        name="Barnaby"
        old="2 Years"
        desc="Loves open fields & warm nap spots"
        characters={["Affectionate", "Alert", "Smart"]}
      />

      <Dog
        link="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
        title="French Bulldog"
        name="Milo"
        old="1.5 Years"
        desc="Curious couch companion & snore champion"
        characters={["Quiet", "Loving", "Easygoing"]}
      />

      <Dog
        link="https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
        title="Golden Retriever"
        name="Archie"
        old="3 Years"
        desc="Radiant park sprinter & swimming enthusiast"
        characters={["Gentle", "Devoted", "Joyous"]}
      />
    </>
  );
}

function Dog({ link, title, name, old, desc, characters }) {
  return (
    <div className="group flex flex-col bg-zinc-900 rounded-3xl p-4 shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-zinc-700">
        <Image
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          src={link}
        />

        <div className="absolute top-2 left-2 px-4 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-stone-200 font-semibold text-xs">
          {title}
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xl text-stone-200">{name}</h4>

          <span className="text-amber-300 font-semibold text-xs">
            {old} Old
          </span>
        </div>

        <p className="font-normal text-sm leading-5 text-stone-300">{desc}</p>

        <div className="flex flex-wrap gap-1 pt-1">
          {characters.map((character) => (
            <Character key={character} title={character} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Character({ title }) {
  return (
    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-stone-300 font-semibold text-xs">
      {title}
    </span>
  );
}
