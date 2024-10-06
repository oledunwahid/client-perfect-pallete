const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 transition transform hover:scale-105">
      <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
      <p className="text-gray-700">
        <strong>Qty:</strong> {order.qty}
      </p>
      <p className="text-gray-700">
        <strong>Total Price:</strong> {order.totalPrice}
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {order.status}
      </p>
      <p className="text-gray-700">
        <strong>Payment Method:</strong> {order.paymentMethod}
      </p>
      <p className="text-gray-700">
        <strong>Shipping Name:</strong> {order.shippingName}
      </p>
      <p className="text-gray-700">
        <strong>Shipping Address:</strong> {order.shippingAddress}
      </p>
      <h3 className="text-md font-semibold mt-4">Order Details:</h3>
      <ul className="mt-2">
        {order.orderDetails.map((detail) => (
          <li key={detail.id} className="border-b py-2 last:border-b-0">
            <strong>Package Title:</strong> {detail.package.title} <br />
            <strong>Package ID:</strong> {detail.packageId} <br />
            <strong>Quantity:</strong> {detail.qty} <br />
            <strong>Package Price:</strong> {detail.package.price} <br />
            <img
              src={detail.package.image}
              alt={detail.package.title}
              className="w-20 h-20 object-cover mt-2 rounded-md"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
