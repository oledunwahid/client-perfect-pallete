const PackageCard = ({ packageData, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200">
      <img
        src={packageData.image}
        alt={packageData.title}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h2 className="text-xl font-semibold mb-2">{packageData.title}</h2>
      <p className="text-gray-600 mb-2">{packageData.description}</p>
      <p className="font-bold text-lg mb-2">Price: ${packageData.price}</p>
      <p className="text-gray-500 mb-4">Stock: {packageData.stock}</p>
      <div className="flex justify-between">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
