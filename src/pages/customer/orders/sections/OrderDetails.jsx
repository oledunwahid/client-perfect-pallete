const OrderDetails = ({ cartItems, totalAmount }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Order Details</h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-3 flex justify-between">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${Math.floor(item.price).toFixed(2)}
              </p>
            </div>
            <p className="font-medium">
              ${Math.floor(item.quantity * item.price).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
