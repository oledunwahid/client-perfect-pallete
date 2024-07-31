import Categories from "./sections/Categories";
import Hero from "./sections/Hero";
import HeroCard from "./components/HeroCard";

function Home() {
  return (
    <>
      <Hero />
      <div className="bg-beige container mx-auto px-4 py-12">
        <HeroCard />
      </div>
      <Categories />
    </>
  );
}

export default Home;
