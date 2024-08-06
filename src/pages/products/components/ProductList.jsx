import React from "react";
import ProductCard from "../../../components/product/ProductCard";
import autumnPaletteImage from "../../../assets/background/autumn-palette.png";

const ProductList = () => {
  const products = [
    {
      title: "SPICE BLUSH",
      description: "Our bestselling blush palette with warm, spicy tones.",
      imageUrl: autumnPaletteImage,
    },
    {
      title: "Eyeshadow Palette",
      description: "Versatile eyeshadow palette with autumn-inspired colors.",
      imageUrl: autumnPaletteImage,
    },
    {
      title: "Lip Collection",
      description: "Set of lip colors perfect for the fall season.",
      imageUrl: autumnPaletteImage,
    },
    {
      title: "Foundation",
      description: "Long-lasting foundation with a natural finish.",
      imageUrl: autumnPaletteImage,
    },
    {
      title: "Brush Set",
      description: "Professional makeup brush set for flawless application.",
      imageUrl: autumnPaletteImage,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          description={product.description}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProductList;
