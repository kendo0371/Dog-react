import { BigStar, Down } from "./icons/icons";
import Image from "next/image";
import Form from "next/form";
import Link from "next/link";
import { hrefWith, HiddenParams } from "./url";

const dogBreeds = [
  { name: "Labradoodle", value: "labradoodle" },
  { name: "Malamute", value: "malamute" },
  { name: "Husky", value: "husky" },
  { name: "Shiba Inu", value: "shiba" },
  { name: "Samoyed", value: "samoyed" },
];

const defaultBreeds = ["labradoodle", "malamute", "husky"];

function breedName(value) {
  const breed = dogBreeds.find((b) => b.value === value);
  return breed ? breed.name : value;
}

const profiles = [
  {
    name: "Barnaby",
    old: "2 Years",
    desc: "Loves open fields & warm nap spots",
    characters: ["Affectionate", "Alert", "Smart"],
  },
  {
    name: "Milo",
    old: "1.5 Years",
    desc: "Curious couch companion & snore champion",
    characters: ["Quiet", "Loving", "Easygoing"],
  },
  {
    name: "Archie",
    old: "3 Years",
    desc: "Radiant park sprinter & swimming enthusiast",
    characters: ["Gentle", "Devoted", "Joyous"],
  },
];

async function randomImage(breed) {
  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const result = await res.json();
  return result.message;
}

async function loadCards(breed) {
  if (breed === "all") {
    const links = await Promise.all(defaultBreeds.map(randomImage));
    return links.map((link, i) => ({
      link,
      title: breedName(defaultBreeds[i]),
    }));
  }

  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`);
  const result = await res.json();
  if (result.status !== "success") return [];
  return result.message.map((link) => ({ link, title: breedName(breed) }));
}

export async function Explore({ params }) {
  // ?breed=husky гэвэл Husky, байхгүй бол "all"
  const selectedBreed = params.breed ?? "all";
  const cards = await loadCards(selectedBreed);
  const shownDogs = cards.map((card, i) => ({ ...profiles[i], ...card }));

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
            {}
            <Form
              action="/"
              scroll={false}
              className="flex flex-wrap items-center gap-2">
              <HiddenParams params={params} skip="breed" />
              <Option value={selectedBreed} />

              <button
                className="px-6 py-1 rounded-full bg-amber-500 text-amber-950 font-semibold text-xs hover:brightness-105 transition-all"
                type="submit">
                Show Dogs
              </button>
            </Form>
          </div>
        </div>

        <BreedButtons selectedBreed={selectedBreed} params={params} />

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
          <Dogs dogs={shownDogs} />
        </div>
      </div>
    </section>
  );
}

function Option({ value }) {
  return (
    <div className="relative">
      <select
        aria-label="Select dog breed"
        className="appearance-none bg-zinc-800 text-stone-200 font-semibold text-xs rounded-full pl-4 pr-10 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
        id="breedSelect"
        name="breed"
        key={value}
        defaultValue={value}>
        <option value="all">ALL Breeds</option>
        {dogBreeds.map((breed) => (
          <option key={breed.value} value={breed.value}>
            {breed.name}
          </option>
        ))}
        {/* baihgui ym haiwal nemj haruulna */}
        {value !== "all" && !dogBreeds.some((b) => b.value === value) && (
          <option value={value}>{breedName(value)}</option>
        )}
      </select>

      <Down />
    </div>
  );
}

const activeButton =
  "px-4 py-1 rounded-full bg-amber-500 text-amber-950 font-semibold text-xs whitespace-nowrap shadow-sm";
const inactiveButton =
  "px-4 py-1 rounded-full bg-zinc-900 text-stone-300 hover:text-stone-200 hover:bg-zinc-800 font-semibold text-xs whitespace-nowrap transition-colors";

function BreedButtons({ selectedBreed, params }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <Link
        className={selectedBreed === "all" ? activeButton : inactiveButton}
        href={hrefWith(params, { breed: "all" })}
        scroll={false}>
        All Breeds
      </Link>

      {dogBreeds.map((dogBreed) => (
        <BreedButton
          breed={dogBreed}
          key={dogBreed.value}
          active={selectedBreed === dogBreed.value}
          href={hrefWith(params, { breed: dogBreed.value })}
        />
      ))}
    </div>
  );
}

function BreedButton({ breed, active, href }) {
  return (
    <Link
      className={active ? activeButton : inactiveButton}
      href={href}
      scroll={false}>
      {breed.name}
    </Link>
  );
}

function Dogs({ dogs }) {
  return (
    <>
      {dogs.map((dog, i) => (
        <Dog dog={dog} key={i} />
      ))}
    </>
  );
}

function Dog({ dog }) {
  return (
    <div className="group flex flex-col bg-zinc-900 rounded-3xl p-4 shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-zinc-700">
        {/* zurag irtel saaral */}
        {dog.link && (
          <Image
            alt={dog.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            src={dog.link}
          />
        )}

        <div className="absolute top-2 left-2 px-4 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-stone-200 font-semibold text-xs capitalize">
          {dog.title}
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xl text-stone-200 capitalize">
            {dog.name ?? dog.title}
          </h4>

          {dog.old && (
            <span className="text-amber-300 font-semibold text-xs">
              {dog.old} Old
            </span>
          )}
        </div>

        <p className="font-normal text-sm leading-5 text-stone-300">
          {dog.desc}
        </p>

        <div className="flex flex-wrap gap-1 pt-1">
          {dog.characters?.map((character) => (
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
