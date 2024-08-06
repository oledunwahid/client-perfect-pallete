import ProductsAutumn from "./sections/ProductsAutumn";
import ProductsSpring from "./sections/ProductsSpring";
import ProductsWinter from "./sections/ProductsWinter";
import ProductsSummer from "./sections/ProductsSummer";

function Home() {
  return (
    <div className="pt-16">
      <ProductsAutumn />
      <ProductsSpring />
      <ProductsWinter />
      <ProductsSummer />
    </div>
  );
}

export default Home;
