import React, { useState, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaTimes,
  FaBox,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const TrackOrderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const modalRef = useRef(null);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Simulasi pelacakan pesanan
    // Dalam implementasi nyata, Anda akan menghubungi API untuk mendapatkan status pesanan
    const fakeStatuses = ["processing", "shipped", "delivered"];
    const randomStatus =
      fakeStatuses[Math.floor(Math.random() * fakeStatuses.length)];
    setOrderStatus(randomStatus);
  };

  const renderOrderStatus = () => {
    switch (orderStatus) {
      case "processing":
        return (
          <div className="flex items-center text-yellow-500">
            <FaBox className="mr-2" />
            <span>Your order is being processed</span>
          </div>
        );
      case "shipped":
        return (
          <div className="flex items-center text-blue-500">
            <FaTruck className="mr-2" />
            <span>Your order has been shipped</span>
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center text-green-500">
            <FaCheckCircle className="mr-2" />
            <span>Your order has been delivered</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={toggleModal}
        className="flex items-center text-navy hover:text-teal transition duration-300"
      >
        <FaMapMarkerAlt className="mr-2" />
        <span>Track Order</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Track Your Order</h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleTrackOrder}>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-teal transition duration-300"
              >
                Track Order
              </button>
            </form>
            {orderStatus && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Order Status:</h4>
                {renderOrderStatus()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderModal;
