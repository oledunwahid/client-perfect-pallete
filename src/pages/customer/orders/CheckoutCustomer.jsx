import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "./sections/OrderDetails";
import PaymentMethod from "./sections/PaymentMethod";
import ConfirmOrder from "./sections/ConfirmOrder";

const CheckoutTab = ({ title, isActive }) => (
  <button
    className={`py-2 px-4 transition-colors duration-300 ${
      isActive ? "bg-teal text-white" : "bg-gray-200 text-gray-700"
    }`}
    disabled
  >
    {title}
  </button>
);

const CheckoutCustomer = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [activeTab, setActiveTab] = useState(0);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  const totalAmount = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
    [cartItems]
  );

  const handleNavigation = (direction) => {
    setActiveTab((prevTab) => prevTab + direction);
  };

  const tabs = [
    { title: "Detail Order", component: OrderDetails },
    { title: "Payment Method & Shipping Info", component: PaymentMethod },
    { title: "Confirm Order", component: ConfirmOrder },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <section className="bg-beige font-playfair min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="flex mb-8 justify-center">
          {tabs.map((tab, index) => (
            <CheckoutTab
              key={index}
              title={tab.title}
              isActive={activeTab === index}
            />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <ActiveComponent
            cartItems={cartItems}
            totalAmount={totalAmount}
            setActiveTab={setActiveTab}
            setIsOrderCreated={setIsOrderCreated}
          />
        </div>

        <div className="flex justify-between mt-8">
          {activeTab > 0 && (
            <button
              onClick={() => handleNavigation(-1)}
              className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Back
            </button>
          )}

          {activeTab < 2 && (
            <button
              onClick={() => handleNavigation(1)}
              className={`bg-navy text-white py-2 px-6 rounded-md hover:bg-teal transition duration-300 ${
                activeTab === 1 && !isOrderCreated
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={activeTab === 1 && !isOrderCreated}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutCustomer;
