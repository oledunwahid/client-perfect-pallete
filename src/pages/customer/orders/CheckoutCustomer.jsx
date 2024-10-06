import { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "./sections/OrderDetails";
import PaymentMethod from "./sections/PaymentMethod";
import ConfirmOrder from "./sections/ConfirmOrder";

const CheckoutCustomer = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const [activeTab, setActiveTab] = useState(0);
  const [isOrderCreated, setIsOrderCreated] = useState(false); // Track if order has been created

  const handleNext = () => {
    if (activeTab === 1 && !isOrderCreated) {
      return;
    }
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handleBack = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="flex mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === 0 ? "bg-teal text-white" : "bg-gray-200"
          }`}
          disabled
        >
          Detail Order
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === 1 ? "bg-teal text-white" : "bg-gray-200"
          }`}
          disabled
        >
          Payment Method & Shipping Info
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === 2 ? "bg-teal text-white" : "bg-gray-200"
          }`}
          disabled
        >
          Confirm Order
        </button>
      </div>

      {activeTab === 0 && (
        <OrderDetails cartItems={cartItems} totalAmount={totalAmount} />
      )}

      {activeTab === 1 && (
        <PaymentMethod
          setActiveTab={setActiveTab}
          setIsOrderCreated={setIsOrderCreated}
        />
      )}

      {activeTab === 2 && <ConfirmOrder />}

      <div className="flex justify-between mt-8">
        {activeTab > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black py-2 px-4 rounded-md"
          >
            Back
          </button>
        )}

        {activeTab < 2 && (
          <button
            onClick={handleNext}
            className={`bg-navy text-white py-2 px-4 rounded-md hover:bg-teal transition duration-300 ${
              activeTab === 1 && !isOrderCreated
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={activeTab === 1 && !isOrderCreated} // Disable Next if order isn't created
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutCustomer;
