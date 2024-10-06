import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { clearCart } from "../../../../features/cart/cartSlice";

const PaymentMethod = ({ setActiveTab, setIsOrderCreated }) => {
  const user = useSelector((state) => state.user.User);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user.name || "");
  const [address, setAddress] = useState(user.address || "");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add items to the cart before creating an order."
      );
      return;
    }

    if (!fullName || !address) {
      toast.error("Please fill in both your full name and address.");
      return;
    }

    const orderDetails = cartItems.map((item) => ({
      packageId: item.id,
      qty: item.quantity,
      price: item.price,
    }));

    const orderData = {
      userId: user.id,
      shippingName: fullName,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      qty: cartItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: cartItems
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2),
      orderDetails: orderDetails,
    };

    try {
      const response = await axiosInstance.post("/orders", orderData);
      toast.success(response.data.message);
      dispatch(clearCart());
      setIsOrderCreated(true);
      setActiveTab(2);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      setIsOrderCreated(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Payment Method & Shipping Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block">Full Name:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block">Address:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block">Payment Method:</label>
          <select
            className="border rounded w-full py-2 px-3"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-navy text-white py-2 px-4 rounded-md hover:bg-teal transition duration-300"
          disabled={cartItems.length === 0}
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;
