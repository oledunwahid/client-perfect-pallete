const ModalOrderDetail = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-1/2 max-h-96 p-6 shadow-xl overflow-y-auto">
        <h2
          id="modal-title"
          className="text-2xl font-bold mb-4 text-gray-800 text-center"
        >
          Order Details
        </h2>

        <div className="space-y-4">
          <div className="text-left">
            <p className="text-sm text-gray-500">
              <strong>Order ID:</strong>{" "}
              <span className="text-gray-800">{order.id}</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Customer:</strong>{" "}
              <span className="text-gray-800">{order.user?.name || "N/A"}</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Quantity:</strong>{" "}
              <span className="text-gray-800">{order.qty}</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Total Price:</strong>{" "}
              <span className="text-gray-800">${order.totalPrice}</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Status:</strong>{" "}
              <span className="text-gray-800">{order.status}</span>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Payment Method:</strong>{" "}
              <span className="text-gray-800">{order.paymentMethod}</span>
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-700">
          Purchased Packages:
        </h3>
        <ul className="list-none space-y-4 mb-6">
          {order.orderDetails.map((detail) => (
            <li
              key={detail.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <p className="text-sm text-gray-500">
                <strong>Package Name:</strong>{" "}
                <span className="text-gray-800">
                  {detail.package?.title || "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Description:</strong>{" "}
                <span className="text-gray-800">
                  {detail.package?.description || "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Price:</strong>{" "}
                <span className="text-gray-800">
                  ${detail.package?.price || "N/A"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Quantity:</strong>{" "}
                <span className="text-gray-800">{detail.qty}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderDetail;
