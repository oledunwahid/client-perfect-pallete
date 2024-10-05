import { useEffect, useState } from "react";
import axios from "axios";

const useFetchOrders = (selectedStatus) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          status: selectedStatus,
        },
      });
      setOrders(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  return { orders, loading, error, refetch: fetchOrders };
};

export default useFetchOrders;
