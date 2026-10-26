import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Explore } from "./components/explore";
import { Gallery } from "./components/gallery";
import { Footer } from "./components/footer";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <div>
      <Header params={params} />
      <main className="w-full bg-zinc-950">
        <div className="flex flex-col w-full">
          <Hero params={params} />
          <Explore params={params} />
          <Gallery params={params} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
