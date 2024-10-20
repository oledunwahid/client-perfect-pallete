const OrderCard = ({ order }) => {
  return (
    <div className="font-playfair bg-white shadow-md rounded-lg overflow-hidden mb-6 transition duration-300 ease-in-out hover:shadow-xl">
      <div className="bg-gradient-to-r from-teal to-navy p-4 text-white">
        <h2 className="text-2xl font-bold">Order #{order.id}</h2>
        <p className="text-sm opacity-75">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === "Completed"
                ? "bg-green-100 text-green-800"
                : order.status === "Processing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </span>
          <p className="text-2xl font-bold text-gray-800">
            ${parseFloat(order.totalPrice).toFixed(2)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Shipping Details
            </h3>
            <p className="text-gray-600">{order.shippingName}</p>
            <p className="text-gray-600">{order.shippingAddress}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Payment Information
            </h3>
            <p className="text-gray-600">Method: {order.paymentMethod}</p>
            <p className="text-gray-600">Total Items: {order.qty}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Order Items
        </h3>
        <ul className="space-y-4">
          {order.orderDetails.map((detail) => (
            <li
              key={detail.id}
              className="flex items-center bg-gray-50 rounded-lg p-4"
            >
              <img
                src={detail.package.image}
                alt={detail.package.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-gray-800">
                  {detail.package.title}
                </h4>
                <p className="text-gray-600">Package ID: {detail.packageId}</p>
                <p className="text-gray-600">Quantity: {detail.qty}</p>
              </div>
              <p className="text-xl font-bold text-gray-800">
                ${parseFloat(detail.package.price).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
