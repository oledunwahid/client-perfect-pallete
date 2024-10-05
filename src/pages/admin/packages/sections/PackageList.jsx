import DeleteModal from "../../../../components/common/cards/DeleteModal";
import EditModal from "../../../../components/common/cards/EditModal";
import useFetchPackages from "../../../../hooks/useFetchPackages";
import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import AddModal from "../../../../components/common/cards/AddModal";
import { toast } from "react-toastify";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router-dom";

const PackageList = () => {
  const { packages, loading, error, refetch } = useFetchPackages();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddPackage = async (newPackage) => {
    try {
      const response = await axiosInstance.post("/packages", newPackage, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch();
      setAddModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add package:", error);
      toast.error(error.response?.data?.message || "Failed to add package");
    }
  };

  const handleEdit = (pkg) => {
    navigate(`/admin/packages/${pkg.id}`);
  };

  const handleDelete = (pkg) => {
    setSelectedPackage(pkg);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = async (updatedPackage) => {
    try {
      const response = await axiosInstance.put(
        `/packages/${selectedPackage.id}`,
        updatedPackage,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error(error.response?.data?.message || "Failed to update package");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(
        `/packages/${selectedPackage.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete package:", error);
      toast.error(error.response?.data?.message || "Failed to delete package");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4">Package List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-beige text-black px-4 py-2 rounded-md"
      >
        Add Package
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              onEdit={() => handleEdit(pkg)}
              onDelete={() => handleDelete(pkg)}
            />
          ))
        )}
      </div>
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddPackage}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
          { name: "image", label: "Image URL", type: "text", required: true },
          { name: "price", label: "Price", type: "text", required: true }, // String price
          { name: "stock", label: "Stock", type: "number", required: true },
        ]}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedPackage || {}}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
          { name: "image", label: "Image URL", type: "text", required: true },
          { name: "price", label: "Price", type: "text", required: true },
          { name: "stock", label: "Stock", type: "number", required: true },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedPackage?.title || "Package"}
      />
    </div>
  );
};

export default PackageList;
