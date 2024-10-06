import React from "react";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <section className="bg-beige py-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-2 font-playfair text-center">
          Winter Personalized Color Analysis Cosmetics
        </h1>

        <p className="text-center text-lg text-gray-700 font-playfair mb-3">
          True Winter is cool and bright. The True Winter colour palette
          contains cool, highly-contrasting colours, which play at the extremes
          of light, dark and bright.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Products;
