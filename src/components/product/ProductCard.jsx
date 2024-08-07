import React from "react";

const ProductCard = ({ title, description, imageUrl, price }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-lg">
      <div className="absolute top-0 right-0 bg-gray-800 text-white px-3 py-1 rounded-bl-lg z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        ${price}
      </div>
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 transition-colors duration-300 group-hover:text-gray-600">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 transition-all duration-300 group-hover:text-gray-500 group-hover:translate-x-1">
          {description}
        </p>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700 hover:shadow-md transform group-hover:translate-y-[-2px]">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
