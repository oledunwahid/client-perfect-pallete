import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchOrders from "../../../hooks/useFetchOrders";
import OrderCard from "./sections/OrderCard";

const OrdersInformation = () => {
  const user = useSelector((state) => state.user.User);
  const [selectedStatus, setSelectedStatus] = useState("new order");

  const { orders, loading, error } = useFetchOrders(selectedStatus, user.id);

  const handleTabChange = (status) => {
    setSelectedStatus(status);
  };

  const renderContent = () => {
    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    if (orders.length === 0) {
      return (
        <p className="text-gray-600">
          No orders with status "{selectedStatus}".
        </p>
      );
    }

    return (
      <div className="grid gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-beige">
      <div className="py-20 px-4 max-w-3xl mx-auto">
        <h1 className="font-playfair text-3xl font-bold mb-6 text-center">
          Orders Information
        </h1>
        <div className="font-playfair flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-md transition duration-300 transform ${
              selectedStatus === "new order"
                ? "bg-teal text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabChange("new order")}
          >
            New Orders
          </button>
          <button
            className={`py-2 px-4 rounded-md transition duration-300 transform ${
              selectedStatus === "shipped"
                ? "bg-teal text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabChange("shipped")}
          >
            Shipped
          </button>
          <button
            className={`py-2 px-4 rounded-md transition duration-300 transform ${
              selectedStatus === "arrived"
                ? "bg-teal text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabChange("arrived")}
          >
            Arrived
          </button>
        </div>
        <div className="orders-list">{renderContent()}</div>
      </div>
    </section>
  );
};

export default OrdersInformation;
