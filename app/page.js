import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Explore } from "./components/explore";
import { Gallery } from "./components/gallery";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="w-full bg-zinc-950">
        <div className="flex flex-col w-full">
          <Hero />
          <Explore />
          <Gallery />
        </div>
      </main>
      <Footer />
    </div>
  );
}
