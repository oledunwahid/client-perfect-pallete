const ProductCard = ({ productData, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold">{productData.name}</h2>
      <img
        src={productData.image}
        alt={productData.name}
        className="h-32 w-full object-cover rounded-md mb-2"
      />
      <p className="text-gray-600 mb-2">{productData.description}</p>
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
