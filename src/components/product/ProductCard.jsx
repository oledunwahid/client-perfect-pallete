import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
        <p className="text-teal text-sm mb-4">{description}</p>
        <button className="bg-navy text-white px-4 py-2 rounded-md hover:bg-teal transition duration-300 flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
