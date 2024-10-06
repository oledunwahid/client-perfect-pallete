import EditModal from "../../../../components/common/cards/EditModal";
import useFetchOrders from "../../../../hooks/useFetchOrders";
import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";
import DataTable from "../../../../components/common/tables/DataTable";
import ModalOrderDetail from "../../../../components/modals/ModalOrderDetail";
import { useLocation } from "react-router-dom";

const OrderList = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const { orders, loading, error, refetch } = useFetchOrders(selectedStatus);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const location = useLocation();

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleEditSubmit = async (updatedOrder) => {
    try {
      const response = await axiosInstance.put(
        `/orders/${selectedOrder.id}`,
        updatedOrder,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(error.response?.data?.message || "Failed to update order");
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    refetch();
    s;
  };

  const columns = [
    { field: "id", headerName: "Order ID", width: 100 },
    {
      field: "user",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        return params.row.user ? params.row.user.name : "N/A";
      },
    },
    { field: "qty", headerName: "Quantity", width: 120 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "paymentMethod", headerName: "Payment Method", width: 180 },
    { field: "shippingName", headerName: "Shipping Name", width: 180 },
    { field: "shippingAddress", headerName: "Shipping Address", width: 180 },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleShowDetail(params.row)}
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          View Details
        </button>
      ),
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order List</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="new order">New Order</option>
          <option value="shipped">Shipped</option>
          <option value="arrived">Arrived</option>
        </select>
      </div>

      <DataTable
        rows={orders}
        columns={columns}
        loading={loading}
        onEdit={location.pathname !== "/admin/dashboard" ? handleEdit : null}
      />

      {location.pathname !== "/admin/dashboard" && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          initialData={selectedOrder || {}}
          fields={[
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { value: "new order", label: "New Order" },
                { value: "shipped", label: "Shipped" },
                { value: "arrived", label: "Arrived" },
              ],
              required: true,
            },
          ]}
        />
      )}

      <ModalOrderDetail
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
