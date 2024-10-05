const ModalOrderDetail = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-1/2 max-h-3/4 overflow-y-auto p-6 shadow-lg">
        <h2 className="font-bold text-xl mb-4">Order Details</h2>

        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.user.name}
          </p>
          <p>
            <strong>Quantity:</strong> {order.qty}
          </p>
          <p>
            <strong>Total Price:</strong> {order.totalPrice}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Purchased Packages:</h3>
        <ul className="list-disc pl-5">
          {order.orderDetails.map((detail) => (
            <li key={detail.id} className="mb-2">
              <p>
                <strong>Package Name:</strong> {detail.package.title}
              </p>
              <p>
                <strong>Desc:</strong> {detail.package.description}
              </p>
              <p>
                <strong>Desc:</strong> {detail.package.price}
              </p>
              <p>
                <strong>Quantity:</strong> {detail.qty}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderDetail;
