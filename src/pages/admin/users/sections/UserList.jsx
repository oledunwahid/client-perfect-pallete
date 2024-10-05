import DeleteModal from "../../../../components/common/cards/DeleteModal";
import EditModal from "../../../../components/common/cards/EditModal";
import useFetchUsers from "../../../../hooks/useFetchUsers";
import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import AddModal from "../../../../components/common/cards/AddModal";
import { toast } from "react-toastify";
import DataTable from "../../../../components/common/tables/DataTable";

const UserList = () => {
  const { users, loading, error, refetch } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleAddUser = async (newUser) => {
    try {
      const userWithRole = { ...newUser, role: "admin" };

      const response = await axiosInstance.post(
        "/auth/register",
        userWithRole,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setAddModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      const response = await axiosInstance.put(
        `/users/${selectedUser.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: (params) => {
        const role = params.value;
        return role === "admin"
          ? "Admin"
          : role === "user"
          ? "Customer"
          : "Unknown";
      },
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-beige text-black px-4 py-2 rounded-md"
      >
        Add User
      </button>
      <DataTable
        rows={users}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: false,
          },
        ]}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedUser || {}}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedUser?.name || "User"}
      />
    </div>
  );
};

export default UserList;
