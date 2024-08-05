import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

const CartModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Contoh data cart, ganti dengan data sebenarnya dari state atau context
  const cartItems = [
    { id: 1, name: "Product 1", price: 10.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 15.99, quantity: 1 },
  ];

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={toggleModal}
        className="flex items-center text-navy hover:text-teal transition duration-300"
      >
        <FaShoppingCart className="mr-2" />
        <span>Cart ({cartItems.length})</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            {cartItems.length > 0 ? (
              <>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      $
                      {cartItems
                        .reduce(
                          (total, item) => total + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-teal transition duration-300">
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
