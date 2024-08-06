import React from "react";
import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <section className="bg-beige py-16">
      <div className=" container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8 font-playfair text-center">
          Autumn Personalized Color Analysis Cosmetics
        </h1>
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
