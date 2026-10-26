import { Recycle } from "./icons/icons";
import Image from "next/image";
import Link from "next/link";
import { hrefWith } from "./url";

async function fetchDogs(count) {
  const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
  const result = await res.json();

  return result.message.map((link) => ({
    link,
    title: link.split("/")[4].replace("-", " "),
  }));
}

export async function Gallery({ params }) {
  // ?pups=16 гэвэл 16 нохой харуулна. "Show More Pups" дарах бүрт 8-аар нэмэгдэнэ.
  const pups = Math.min(Number(params.pups ?? 8), 48);
  const dogs = await fetchDogs(pups);

  return (
    <section
      className="bg-zinc-950 font-sans text-base text-stone-200 w-full px-4 lg:px-8 py-10"
      id="gallery">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 items-center">
        <div className="text-center flex flex-col items-center gap-1 max-w-xl">
          <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-zinc-800 text-amber-300 font-semibold text-xs">
            <span>📸</span>

            <span>Community Snaps</span>
          </div>

          <h2 className="font-bold text-3xl leading-tight text-stone-200 tracking-tight">
            More Dogs to Love
          </h2>

          <p className="font-normal text-base leading-6 text-stone-300">
            A lively collection of everyday wagging tails, sweet snouts, and
            happy smiles.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
          <Dogs dogs={dogs} />
        </div>

        <div className="pt-4">
          <Link
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-zinc-900 text-stone-200 font-semibold text-sm hover:bg-zinc-800 transition-transform active:scale-95 shadow-md"
            href={hrefWith(params, { pups: pups + 8 })}
            scroll={false}>
            <span>🐾</span>

            <span>Show More Pups</span>

            <Recycle />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Dogs({ dogs }) {
  return (
    <>
      {dogs.map((dog, i) => (
        <Dog dog={dog} key={dog.link + i} />
      ))}
    </>
  );
}

function Dog({ dog }) {
  return (
    <div className="group relative h-80 rounded-3xl overflow-hidden bg-zinc-900 shadow-md">
      <Image
        alt={dog.title}
        src={dog.link}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <div>
          <p className="text-stone-200 font-semibold text-sm capitalize">
            {dog.title}
          </p>
          <p className="text-amber-300 font-semibold text-xs">{dog.moment}</p>
        </div>
      </div>
    </div>
  );
}
